"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { TESTIMONIALS } from "@/lib/constants";

function ParticleField() {
  const ref = useRef<THREE.Points | null>(null);
  const COUNT = 280;

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const velocities = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      velocities[i * 3] = (Math.random() - 0.5) * 0.0015;
      velocities[i * 3 + 1] = 0.003 + Math.random() * 0.004;
      velocities[i * 3 + 2] = 0;
    }
    return { positions, velocities };
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    const geom = ref.current.geometry;
    const arr = geom.attributes.position.array as Float32Array;
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3] += velocities[i * 3];
      arr[i * 3 + 1] += velocities[i * 3 + 1];
      if (arr[i * 3 + 1] > 5) {
        arr[i * 3 + 1] = -5;
        arr[i * 3] = (Math.random() - 0.5) * 14;
      }
    }
    geom.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={COUNT}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#A78BFA"
        size={0.04}
        transparent
        opacity={0.55}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

function ParticleCanvas() {
  return (
    <Canvas
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0, 8], fov: 60 }}
      dpr={[1, 1.5]}
    >
      <ParticleField />
    </Canvas>
  );
}

const ParticleCanvasNoSSR = dynamic(
  () => Promise.resolve({ default: ParticleCanvas }),
  { ssr: false }
);

function Stars({ count, animateIn }: { count: number; animateIn: boolean }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.svg
          key={i}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill={i < count ? "#E8C97A" : "rgba(255,255,255,0.1)"}
          initial={{ scale: 0, opacity: 0 }}
          animate={animateIn ? { scale: [0, 1.3, 1], opacity: [0, 1, 1] } : { scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <path d="M12 2l2.39 7.36H22l-6.19 4.5L18.2 21 12 16.5 5.8 21l2.39-7.14L2 9.36h7.61L12 2z" />
        </motion.svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [enableWebGL, setEnableWebGL] = useState(false);
  const [translateZ, setTranslateZ] = useState(420);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inViewRef = useRef(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    setEnableWebGL(!reduced && !isMobile);

    const computeZ = () => {
      const w = window.innerWidth;
      if (w < 1024) setTranslateZ(320);
      else if (w < 1280) setTranslateZ(380);
      else setTranslateZ(440);
    };
    computeZ();
    window.addEventListener("resize", computeZ);
    return () => window.removeEventListener("resize", computeZ);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          inViewRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.3 }
    );
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (!inViewRef.current) return;
      setActive((p) => (p + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, []);

  const angleStep = 360 / TESTIMONIALS.length;
  const rotationY = -active * angleStep;

  return (
    <section
      id="testimonials"
      ref={containerRef}
      className="relative isolate overflow-hidden py-28 sm:py-36"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-80">
        {enableWebGL && <ParticleCanvasNoSSR />}
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(91,63,191,0.12),transparent_70%)]" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#A78BFA]" />
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-text-secondary">
              Testimonials
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.02em]"
          >
            Loved by homeowners <br className="hidden sm:block" />
            <span className="heading-gradient">and providers alike.</span>
          </motion.h2>
        </div>

        {/* Desktop carousel */}
        <div
          className="relative mx-auto hidden h-[440px] max-w-5xl md:block lg:h-[480px]"
          style={{ perspective: 1400 }}
        >
          <motion.div
            animate={{ rotateY: rotationY }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-full w-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            {TESTIMONIALS.map((t, i) => {
              const isActive = i === active;
              const cardRotation = i * angleStep;
              return (
                <div
                  key={t.name}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    transform: `rotateY(${cardRotation}deg) translateZ(${translateZ}px)`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <motion.article
                    animate={{
                      scale: isActive ? 1 : 0.85,
                      opacity: isActive ? 1 : 0.35,
                    }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className={`relative w-[min(86vw,360px)] rounded-3xl border border-white/10 bg-[rgba(18,14,30,0.85)] p-7 backdrop-blur-md md:w-[400px] md:p-8 lg:w-[460px] ${
                      isActive ? "shadow-[0_0_60px_rgba(139,92,246,0.25)]" : ""
                    }`}
                  >
                    <div className="absolute -top-3 right-6 grid h-12 w-12 place-items-center rounded-full border border-[#8B5CF6]/40 bg-[rgba(91,63,191,0.5)] text-[#A78BFA]">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9.5 7H6a3 3 0 0 0-3 3v3a3 3 0 0 0 3 3h2v3l4-3v-9zM21.5 7H18a3 3 0 0 0-3 3v3a3 3 0 0 0 3 3h2v3l4-3v-9z" />
                      </svg>
                    </div>

                    <Stars count={t.rating} animateIn={isActive} />

                    <p className="mt-5 text-base leading-relaxed text-text-primary">
                      &ldquo;{t.text}&rdquo;
                    </p>

                    <div className="mt-7 flex items-center gap-3 border-t border-white/5 pt-5">
                      <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-[#5B3FBF] to-[#A78BFA] text-sm font-semibold text-white">
                        {t.initials}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{t.name}</div>
                        <div className="text-xs text-text-secondary">{t.role}</div>
                      </div>
                    </div>
                  </motion.article>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Mobile swipe carousel */}
        <div className="md:hidden">
          <div
            className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4"
            data-lenis-prevent
          >
            {TESTIMONIALS.map((t) => (
              <article
                key={t.name}
                className="relative w-[85%] flex-shrink-0 snap-center rounded-3xl border border-white/10 bg-[rgba(18,14,30,0.85)] p-7 backdrop-blur-md"
              >
                <Stars count={t.rating} animateIn />
                <p className="mt-4 text-[15px] leading-relaxed text-text-primary">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-white/5 pt-4">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[#5B3FBF] to-[#A78BFA] text-xs font-semibold text-white">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-text-secondary">{t.role}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="mt-10 flex justify-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              data-cursor="hover"
              onClick={() => setActive(i)}
              aria-label={`Show testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === active
                  ? "w-10 bg-gradient-to-r from-[#5B3FBF] to-[#A78BFA]"
                  : "w-4 bg-white/15 hover:bg-white/25"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
