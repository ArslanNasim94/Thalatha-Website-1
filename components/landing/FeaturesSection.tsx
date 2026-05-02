"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { FEATURES } from "@/lib/constants";
import FeatureIconSVG from "./FeatureIcon";

function MagneticCard({
  index,
  feature,
}: {
  index: number;
  feature: (typeof FEATURES)[number];
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), {
    stiffness: 200,
    damping: 20,
  });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(x);
    my.set(y);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      className="feature-card group relative"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] p-7 backdrop-blur-md transition-[border-color,box-shadow,background] duration-500 group-hover:border-[#8B5CF6]/50 group-hover:bg-white/[0.04] group-hover:shadow-[0_0_60px_rgba(139,92,246,0.18)] sm:p-8"
      >
        {/* Corner gradient accent */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#8B5CF6]/10 blur-3xl transition-opacity duration-500 group-hover:bg-[#A78BFA]/25" />

        <div
          className="relative mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-[#8B5CF6]/30 bg-gradient-to-br from-[#5B3FBF]/30 to-[#1a1030]/40"
          style={{ transform: "translateZ(40px)" }}
        >
          <FeatureIconSVG name={feature.icon} />
        </div>

        <h3
          className="mb-2 font-display text-xl font-semibold tracking-tight text-white sm:text-[1.35rem]"
          style={{ transform: "translateZ(20px)" }}
        >
          {feature.title}
        </h3>
        <p
          className="text-[0.95rem] leading-relaxed text-text-secondary"
          style={{ transform: "translateZ(15px)" }}
        >
          {feature.desc}
        </p>

        {/* Arrow */}
        <div
          className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-[#A78BFA]/80 transition-colors group-hover:text-[#A78BFA]"
          style={{ transform: "translateZ(20px)" }}
        >
          <span>Learn more</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            className="transition-transform duration-500 group-hover:translate-x-1"
          >
            <path
              d="M5 12h14m0 0l-5-5m5 5l-5 5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Inner highlight */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/5" />
      </motion.div>
    </motion.div>
  );
}

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative isolate overflow-hidden py-28 sm:py-36"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-0 h-[40rem] w-[40rem] rounded-full bg-[#5B3FBF]/[0.07] blur-[120px]" />
        <div className="absolute -right-32 bottom-0 h-[40rem] w-[40rem] rounded-full bg-[#A78BFA]/[0.06] blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#A78BFA]" />
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-text-secondary">
              Features
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.02em]"
          >
            Built for the way <br className="hidden sm:block" />
            <span className="heading-gradient">you live & work</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mx-auto mt-5 max-w-xl text-base text-text-secondary md:text-lg"
          >
            Six thoughtful capabilities that turn any home request into a confident
            decision — in minutes, not days.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <MagneticCard key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
