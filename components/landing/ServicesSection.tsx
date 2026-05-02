"use client";

import gsap from "gsap";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SERVICES } from "@/lib/constants";

type RingProps = {
  items: ReadonlyArray<string>;
  radius: number;
  duration: number;
  direction: 1 | -1;
  size?: "sm" | "lg";
  setHovering: (v: boolean) => void;
};

function OrbitRing({
  items,
  radius,
  duration,
  direction,
  size = "sm",
  setHovering,
}: RingProps) {
  const ringRef = useRef<HTMLDivElement | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!ringRef.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    tweenRef.current = gsap.to(ringRef.current, {
      rotation: 360 * direction,
      repeat: -1,
      duration,
      ease: "none",
      transformOrigin: "50% 50%",
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, [duration, direction]);

  const onPillEnter = () => {
    setHovering(true);
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 0, duration: 0.6 });
    }
  };
  const onPillLeave = () => {
    setHovering(false);
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 1, duration: 0.8 });
    }
  };

  return (
    <div
      ref={ringRef}
      className="absolute inset-0"
      style={{ willChange: "transform" }}
    >
      {items.map((label, i) => {
        const angle = (360 / items.length) * i;
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;
        return (
          <button
            key={label}
            onMouseEnter={onPillEnter}
            onMouseLeave={onPillLeave}
            data-cursor="hover"
            className="orbit-pill group absolute left-1/2 top-1/2 origin-center select-none"
            style={{
              transform: `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(${-angle * direction}deg)`,
            }}
          >
            <span
              className={`relative inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-[rgba(18,14,30,0.85)] px-4 py-2 text-sm font-medium text-text-primary backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-[#A78BFA]/70 group-hover:bg-[rgba(91,63,191,0.4)] group-hover:shadow-[0_0_30px_rgba(167,139,250,0.4)] ${
                size === "lg" ? "px-5 py-2.5" : ""
              }`}
              style={{ transform: `rotate(${360 * direction}deg)` }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#A78BFA] transition-transform group-hover:scale-150" />
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function CenterMark({ pulse }: { pulse: boolean }) {
  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="relative grid h-28 w-28 place-items-center">
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-tr from-[#5B3FBF]/40 to-[#A78BFA]/40 blur-2xl transition-opacity ${
            pulse ? "opacity-100" : "opacity-70"
          }`}
        />
        <div className="absolute inset-2 rounded-full border border-white/10 bg-[rgba(18,14,30,0.9)]" />
        <div className="absolute inset-2 rounded-full border border-[#A78BFA]/30 animate-pulse" />
        <svg viewBox="0 0 64 64" className="relative h-12 w-12" fill="none">
          <defs>
            <linearGradient id="ctr-grad" x1="0" y1="0" x2="64" y2="64">
              <stop offset="0%" stopColor="#A78BFA" />
              <stop offset="100%" stopColor="#5B3FBF" />
            </linearGradient>
          </defs>
          <path
            d="M14 32l18-18 18 18v16a4 4 0 0 1-4 4H38v-12h-12v12H18a4 4 0 0 1-4-4V32z"
            stroke="url(#ctr-grad)"
            strokeWidth="2"
            strokeLinejoin="round"
            fill="rgba(139,92,246,0.18)"
          />
        </svg>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const [hovering, setHovering] = useState(false);
  const [size, setSize] = useState<{ inner: number; outer: number; canvas: number }>(
    { inner: 160, outer: 280, canvas: 720 }
  );

  useEffect(() => {
    const compute = () => {
      const w = Math.min(window.innerWidth, document.documentElement.clientWidth);
      // canvas should leave 24px breathing room on each side
      const maxCanvas = Math.max(280, w - 48);
      if (w < 640) {
        const canvas = Math.min(420, maxCanvas);
        setSize({ inner: canvas * 0.24, outer: canvas * 0.42, canvas });
      } else if (w < 1024) {
        const canvas = Math.min(560, maxCanvas);
        setSize({ inner: canvas * 0.23, outer: canvas * 0.4, canvas });
      } else {
        const canvas = Math.min(760, maxCanvas);
        setSize({ inner: canvas * 0.24, outer: canvas * 0.42, canvas });
      }
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const inner = SERVICES.slice(0, 5);
  const outer = SERVICES.slice(5);

  return (
    <section
      id="services"
      className="relative isolate overflow-hidden py-28 sm:py-36"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 dot-grid opacity-30" />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5B3FBF]/[0.08] blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#A78BFA]" />
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-text-secondary">
              Services
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.02em]"
          >
            Every service, <br className="hidden sm:block" />
            <span className="heading-gradient">in one orbit.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mx-auto mt-5 max-w-xl text-base text-text-secondary md:text-lg"
          >
            From plumbing emergencies to TV mounting — Thalatha covers it all with
            verified specialists nearby.
          </motion.p>
        </div>

        {/* Desktop / tablet: orbit */}
        <div className="hidden sm:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto"
            style={{ width: size.canvas, height: size.canvas, maxWidth: "100%" }}
          >
            {/* concentric guide rings */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06]"
              style={{ width: size.inner * 2, height: size.inner * 2 }}
            />
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06]"
              style={{ width: size.outer * 2, height: size.outer * 2 }}
            />

            <CenterMark pulse={hovering} />

            <OrbitRing
              items={inner}
              radius={size.inner}
              duration={20}
              direction={1}
              setHovering={setHovering}
            />
            <OrbitRing
              items={outer}
              radius={size.outer}
              duration={35}
              direction={-1}
              size="lg"
              setHovering={setHovering}
            />
          </motion.div>
        </div>

        {/* Mobile: horizontal scroll pills */}
        <div className="-mx-6 overflow-x-auto px-6 sm:hidden" data-lenis-prevent>
          <div className="flex gap-3 whitespace-nowrap pb-2">
            {SERVICES.map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[rgba(18,14,30,0.85)] px-4 py-2 text-sm font-medium"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#A78BFA]" />
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
