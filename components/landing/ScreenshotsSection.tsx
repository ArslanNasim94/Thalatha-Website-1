"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { SCREENSHOTS } from "@/lib/constants";

function PhoneFrame({
  src,
  height = 580,
  width = 290,
  delay = 0,
  className = "",
}: {
  src: string;
  height?: number;
  width?: number;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-[40px] border-[10px] border-[#1a1030] bg-[#1a1030] shadow-2xl ${className}`}
      style={{
        width,
        height,
        animation: `floatSlow 6s ease-in-out ${delay}s infinite`,
        filter: "drop-shadow(0 30px 60px rgba(91,63,191,0.45))",
      }}
    >
      <div className="absolute left-1/2 top-2 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-black/95" />
      <div className="absolute bottom-2 left-1/2 z-10 h-1 w-24 -translate-x-1/2 rounded-full bg-white/30" />
      <div className="relative h-full w-full overflow-hidden rounded-[30px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt="Thalatha app screenshot"
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#5B3FBF]/10 via-transparent to-[#A78BFA]/10" />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
      </div>
    </div>
  );
}

export default function ScreenshotsSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const left = containerRef.current!.querySelector(".phone-left");
      const center = containerRef.current!.querySelector(".phone-center");
      const right = containerRef.current!.querySelector(".phone-right");

      gsap.fromTo(
        left,
        { x: -240, opacity: 0, rotateY: -25 },
        {
          x: 0,
          opacity: 1,
          rotateY: -15,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
        }
      );
      gsap.fromTo(
        center,
        { y: 140, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
        }
      );
      gsap.fromTo(
        right,
        { x: 240, opacity: 0, rotateY: 25 },
        {
          x: 0,
          opacity: 1,
          rotateY: 15,
          duration: 1.2,
          delay: 0.05,
          ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative isolate overflow-hidden py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-[#5B3FBF]/[0.1] blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#A78BFA]" />
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-text-secondary">
              The App
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.02em]"
          >
            Crafted for delight, <br className="hidden sm:block" />
            <span className="heading-gradient">designed for trust.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mx-auto mt-5 max-w-xl text-base text-text-secondary md:text-lg"
          >
            Every interaction tuned to feel premium. Every screen tested with real
            homeowners and providers.
          </motion.p>
        </div>

        <div
          ref={containerRef}
          className="relative flex items-end justify-center gap-4 sm:gap-8"
          style={{ perspective: 1600 }}
        >
          {/* Mobile: only center phone */}
          <div className="block sm:hidden">
            <PhoneFrame src={SCREENSHOTS[0]} height={520} width={260} delay={0} />
          </div>

          {/* Desktop: V-formation */}
          <div
            className="phone-left hidden sm:block"
            style={{
              transformStyle: "preserve-3d",
              transform: "rotateY(-15deg) translateY(60px)",
            }}
          >
            <PhoneFrame src={SCREENSHOTS[1]} height={500} width={250} delay={0} />
          </div>

          <div className="phone-center hidden sm:block">
            <PhoneFrame src={SCREENSHOTS[0]} height={580} width={290} delay={0.5} />
          </div>

          <div
            className="phone-right hidden sm:block"
            style={{
              transformStyle: "preserve-3d",
              transform: "rotateY(15deg) translateY(60px)",
            }}
          >
            <PhoneFrame src={SCREENSHOTS[2]} height={500} width={250} delay={1.0} />
          </div>
        </div>
      </div>
    </section>
  );
}
