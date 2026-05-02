"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { BRAND, SCREENSHOTS } from "@/lib/constants";
import { scrambleChars } from "@/lib/animations";

function LiquidBlob({ pointer }: { pointer: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh | null>(null);
  const targetRot = useRef({ x: 0, y: 0 });

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    targetRot.current.x = pointer.y * 0.4;
    targetRot.current.y = pointer.x * 0.4;
    meshRef.current.rotation.x +=
      (targetRot.current.x - meshRef.current.rotation.x) * 0.05;
    meshRef.current.rotation.y +=
      (targetRot.current.y - meshRef.current.rotation.y) * 0.05 + delta * 0.05;
  });

  return (
    <Float floatIntensity={1.0} rotationIntensity={0.4} speed={1.2}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[2.5, 128, 128]} />
        <MeshDistortMaterial
          color="#5B3FBF"
          emissive={new THREE.Color("#2D1B69")}
          emissiveIntensity={0.6}
          distort={0.55}
          speed={1.3}
          roughness={0}
          metalness={0.4}
        />
      </mesh>
    </Float>
  );
}

function HeroCanvas() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setPointer({ x, y: -y });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <Canvas
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 5], fov: 50 }}
    >
      <ambientLight intensity={0.35} />
      <pointLight position={[5, 5, 5]} intensity={2.2} color="#8B5CF6" />
      <pointLight position={[-5, -3, 2]} intensity={1.4} color="#A78BFA" />
      <LiquidBlob pointer={pointer} />
    </Canvas>
  );
}

const HeroCanvasNoSSR = dynamic(
  () => Promise.resolve({ default: HeroCanvas }),
  { ssr: false }
);

function ScrambleText({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const [display, setDisplay] = useState<string[]>(() =>
    text.split("").map((c) => (c === " " || c === "\n" ? c : ""))
  );

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(text.split(""));
      return;
    }

    const chars = text.split("");
    const result: string[] = chars.map((c) => (c === " " || c === "\n" ? c : ""));
    const timers: number[] = [];

    chars.forEach((finalChar, i) => {
      if (finalChar === " " || finalChar === "\n") {
        result[i] = finalChar;
        return;
      }
      let cycles = 0;
      const start = window.setTimeout(() => {
        const interval = window.setInterval(() => {
          cycles++;
          if (cycles >= 8) {
            window.clearInterval(interval);
            result[i] = finalChar;
            setDisplay([...result]);
            return;
          }
          result[i] = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          setDisplay([...result]);
        }, 40);
        timers.push(interval);
      }, delay + i * 60);
      timers.push(start);
    });

    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [text, delay]);

  return (
    <span className={className} aria-label={text}>
      {display.map((c, i) =>
        c === "\n" ? <br key={i} /> : <span key={i}>{c || "\u00A0"}</span>
      )}
    </span>
  );
}

function CountUp({
  to,
  decimals = 0,
  suffix = "",
  duration = 1800,
}: {
  to: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3);
              setVal(to * eased);
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref}>
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

function PhoneMockup() {
  return (
    <div className="relative">
      <motion.div
        initial={{ y: 120, opacity: 0, rotateX: 25 }}
        animate={{ y: 0, opacity: 1, rotateX: 0 }}
        transition={{ type: "spring", stiffness: 60, damping: 18, delay: 0.8 }}
        className="relative"
        style={{ perspective: 1200 }}
      >
        <div
          className="relative animate-float-slow"
          style={{
            filter:
              "drop-shadow(0 40px 80px rgba(91,63,191,0.55)) drop-shadow(0 20px 40px rgba(0,0,0,0.6))",
          }}
        >
          <PhoneFrame imageUrl={SCREENSHOTS[0]} />

          {/* Floating decorative pills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.7 }}
            className="absolute -left-10 top-24 hidden items-center gap-2 rounded-2xl border border-white/10 bg-[rgba(18,14,30,0.85)] px-3 py-2 backdrop-blur-md sm:flex"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-[#5B3FBF]/30 text-[#A78BFA]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 7h14M5 12h14M5 17h10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <div className="text-xs leading-tight">
              <div className="font-medium text-white">Quote received</div>
              <div className="text-text-secondary">From John&rsquo;s Plumbing</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.85, duration: 0.7 }}
            className="absolute -right-10 bottom-24 hidden items-center gap-2 rounded-2xl border border-white/10 bg-[rgba(18,14,30,0.85)] px-3 py-2 backdrop-blur-md sm:flex"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-[#E8C97A]/15 text-[#E8C97A]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2l2.39 7.36H22l-6.19 4.5L18.2 21 12 16.5 5.8 21l2.39-7.14L2 9.36h7.61L12 2z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <div className="text-xs leading-tight">
              <div className="font-medium text-white">4.9 rating</div>
              <div className="text-text-secondary">Verified provider</div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

function PhoneFrame({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="relative mx-auto h-[480px] w-[240px] rounded-[40px] border-[8px] border-[#1a1030] bg-[#1a1030] shadow-2xl sm:h-[540px] sm:w-[270px] md:h-[580px] md:w-[290px] lg:h-[620px] lg:w-[310px]">
      <div className="absolute left-1/2 top-2 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-black/95" />
      <div className="absolute bottom-2 left-1/2 z-10 h-1 w-24 -translate-x-1/2 rounded-full bg-white/30" />
      <div className="relative h-full w-full overflow-hidden rounded-[34px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt="Thalatha app screenshot"
          loading="eager"
          className="h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#5B3FBF]/10 via-transparent to-[#A78BFA]/10" />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [allowWebGL, setAllowWebGL] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    setAllowWebGL(!reduced && !isMobile);
  }, []);

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] w-full items-center overflow-hidden pt-24 sm:pt-28 lg:pt-24"
    >
      {/* WebGL layer */}
      <div className="absolute inset-0 -z-10">
        {allowWebGL ? (
          <HeroCanvasNoSSR />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(139,92,246,0.35),transparent_60%),radial-gradient(ellipse_at_70%_60%,rgba(91,63,191,0.45),transparent_55%)]">
            <div className="absolute -left-20 top-1/4 h-72 w-72 animate-pulse rounded-full bg-[#5B3FBF]/30 blur-3xl" />
            <div className="absolute -right-20 bottom-1/4 h-72 w-72 animate-pulse rounded-full bg-[#A78BFA]/30 blur-3xl" />
          </div>
        )}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 0%, transparent 30%, rgba(10,8,18,0.6) 75%, rgba(10,8,18,0.97) 100%)",
          }}
        />
      </div>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 pb-24 sm:gap-12 lg:grid-cols-2 lg:gap-8 lg:pb-20">
        {/* LEFT */}
        <div className="relative z-10 flex flex-col gap-7">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 backdrop-blur-md"
          >
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-[#A78BFA] opacity-70 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#A78BFA]" />
            </span>
            <span className="text-xs font-medium tracking-wide text-text-secondary">
              Trusted by 50,000+ Users
            </span>
          </motion.div>

          <h1 className="font-display text-[clamp(2.2rem,6.4vw,5.4rem)] font-semibold leading-[1.04] tracking-[-0.02em] [text-wrap:balance]">
            <span className="block text-white">
              <ScrambleText text="Premium Home" delay={300} />
            </span>
            <span className="block">
              <ScrambleText
                text="Services Made Simple"
                delay={900}
                className="heading-gradient"
              />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.7 }}
            className="max-w-xl text-base text-text-secondary md:text-lg"
          >
            {BRAND.subtagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.85, duration: 0.7 }}
            className="flex flex-wrap items-center gap-3"
          >
            <a
              href={BRAND.appStore}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="shimmer-btn group inline-flex items-center gap-3 rounded-2xl border border-[#E8C97A]/40 bg-[#E8C97A]/10 px-5 py-3 text-sm font-medium text-[#E8C97A] transition-colors hover:bg-[#E8C97A]/20"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.6 12.7c0-2.7 2.2-4 2.3-4-1.3-1.8-3.2-2.1-3.9-2.1-1.7-.2-3.2.9-4.1.9-.9 0-2.2-.9-3.6-.9-1.9 0-3.6 1.1-4.6 2.7-1.9 3.4-.5 8.4 1.4 11.1.9 1.3 2 2.8 3.4 2.7 1.4 0 1.9-.9 3.5-.9 1.6 0 2.1.9 3.5.9 1.5 0 2.4-1.3 3.3-2.6.6-.9 1-1.8 1.4-2.7-.1-.1-2.6-1-2.6-4.1zM14.7 4.6c.7-.9 1.2-2.2 1.1-3.4-1 0-2.3.6-3 1.5-.6.8-1.2 2-1 3.2 1.1.1 2.2-.5 2.9-1.3z" />
              </svg>
              <div className="flex flex-col leading-tight">
                <span className="text-[10px] uppercase tracking-wider text-[#E8C97A]/80">
                  Download on
                </span>
                <span className="text-base font-semibold">App Store</span>
              </div>
            </a>

            <a
              href={BRAND.playStore}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="shimmer-btn group inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/10"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3.6 2.7C3.2 3.1 3 3.7 3 4.5v15c0 .8.2 1.4.6 1.8L13 12 3.6 2.7zM14.5 13.4l2.6 2.6-12.4 7c-.5.3-1 .3-1.5 0l11.3-9.6zM18.7 11.2l3.1 1.7c1 .6 1 2.2 0 2.8l-3.1 1.7-2.9-2.9 2.9-3.3zM4.7 1.1c.5-.3 1-.3 1.5 0l12.4 7-2.6 2.6-11.3-9.6z"
                  fill="currentColor"
                />
              </svg>
              <div className="flex flex-col leading-tight">
                <span className="text-[10px] uppercase tracking-wider text-white/70">
                  Get it on
                </span>
                <span className="text-base font-semibold">Google Play</span>
              </div>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.05, duration: 0.7 }}
            className="mt-2 grid max-w-xl grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4"
          >
            <Stat label="Happy Users" to={50} suffix="K+" />
            <Stat label="Providers" to={10} suffix="K+" />
            <Stat label="Services" to={100} suffix="K+" />
            <Stat label="Rating" to={4.9} suffix="★" decimals={1} />
          </motion.div>
        </div>

        {/* RIGHT */}
        <div className="relative z-10 flex items-center justify-center lg:justify-end">
          <PhoneMockup />
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.4, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-text-secondary lg:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="relative inline-flex h-8 w-5 justify-center overflow-hidden rounded-full border border-white/15">
          <motion.span
            animate={{ y: [-8, 18] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="mt-2 h-2 w-1 rounded-full bg-[#A78BFA]"
          />
        </span>
      </motion.div>
    </section>
  );
}

function Stat({
  to,
  suffix,
  label,
  decimals = 0,
}: {
  to: number;
  suffix: string;
  label: string;
  decimals?: number;
}) {
  return (
    <div>
      <div className="font-display text-2xl font-semibold leading-none text-white sm:text-3xl">
        <CountUp to={to} decimals={decimals} suffix={suffix} />
      </div>
      <div className="mt-1.5 text-xs uppercase tracking-wider text-text-secondary">
        {label}
      </div>
    </div>
  );
}
