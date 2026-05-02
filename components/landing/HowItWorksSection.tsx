"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { STEPS } from "@/lib/constants";

function StepIllustration({ kind }: { kind: string }) {
  if (kind === "record") {
    return (
      <svg viewBox="0 0 320 360" className="h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="rec-frame" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b2870" />
            <stop offset="100%" stopColor="#1a1030" />
          </linearGradient>
          <linearGradient id="rec-screen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5B3FBF" />
            <stop offset="100%" stopColor="#0A0812" />
          </linearGradient>
        </defs>
        <rect x="80" y="20" width="160" height="320" rx="32" fill="url(#rec-frame)" stroke="rgba(255,255,255,0.1)" />
        <rect x="92" y="34" width="136" height="292" rx="22" fill="url(#rec-screen)" />
        <rect x="148" y="38" width="44" height="10" rx="5" fill="#000" />

        {/* viewfinder grid */}
        <g stroke="rgba(255,255,255,0.18)" strokeWidth="1">
          <line x1="120" y1="120" x2="200" y2="120" />
          <line x1="120" y1="180" x2="200" y2="180" />
          <line x1="140" y1="80" x2="140" y2="240" />
          <line x1="180" y1="80" x2="180" y2="240" />
        </g>

        {/* center pipe icon */}
        <g transform="translate(160 160)" stroke="#A78BFA" strokeWidth="2.5" fill="none" strokeLinecap="round">
          <path d="M-20 0h12a8 8 0 0 1 8 8v12">
            <animate attributeName="stroke-dasharray" values="0,80;80,0" dur="2s" repeatCount="indefinite" />
          </path>
          <circle cx="0" cy="20" r="6" />
        </g>

        {/* record dot */}
        <g>
          <circle cx="160" cy="290" r="14" fill="#ef4444">
            <animate attributeName="r" values="13;15;13" dur="1s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.6;1" dur="1s" repeatCount="indefinite" />
          </circle>
          <circle cx="160" cy="290" r="20" fill="none" stroke="#fff" strokeWidth="2" />
        </g>

        {/* timer */}
        <text x="160" y="74" textAnchor="middle" fill="#A78BFA" fontSize="12" fontFamily="monospace">
          ● REC 00:07
        </text>
      </svg>
    );
  }

  if (kind === "receive") {
    return (
      <svg viewBox="0 0 320 360" className="h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="recv-card" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#221540" />
            <stop offset="100%" stopColor="#120e1e" />
          </linearGradient>
        </defs>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${30 + i * 8} ${50 + i * 60})`}>
            <rect width="240" height="76" rx="14" fill="url(#recv-card)" stroke="rgba(139,92,246,0.35)" />
            <circle cx="32" cy="38" r="18" fill="#5B3FBF" opacity="0.4" />
            <text x="32" y="42" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="600">
              {["JP", "MK", "AS"][i]}
            </text>
            <rect x="60" y="22" width="120" height="9" rx="4" fill="#A78BFA" opacity="0.6" />
            <rect x="60" y="38" width="160" height="7" rx="3" fill="#A99CC2" opacity="0.5" />
            <rect x="60" y="50" width="80" height="7" rx="3" fill="#A99CC2" opacity="0.4" />
            <text x="216" y="30" textAnchor="end" fill="#E8C97A" fontSize="13" fontWeight="600">
              ${85 + i * 15}
            </text>
            <g transform="translate(180 56)" fill="#E8C97A">
              {Array.from({ length: 5 }).map((_, j) => (
                <path
                  key={j}
                  d="M0 0 L1.5 4 L6 4.5 L2.5 7 L3.5 11 L0 9 L-3.5 11 L-2.5 7 L-6 4.5 L-1.5 4 Z"
                  transform={`translate(${j * 8} 0) scale(0.7)`}
                />
              ))}
            </g>
          </g>
        ))}
      </svg>
    );
  }

  // connect
  return (
    <svg viewBox="0 0 320 360" className="h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="conn-bg" cx="0.5" cy="0.5">
          <stop offset="0%" stopColor="#5B3FBF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#5B3FBF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="160" cy="180" r="150" fill="url(#conn-bg)" />

      {/* whatsapp circle */}
      <g transform="translate(160 180)">
        <circle r="60" fill="#25D366" opacity="0.95" />
        <path
          d="M-22 18c8 6 18 6 26-2 4-4 4-12-2-18-2-2-2-6 0-8 2-2 2-6 0-8s-6-2-8 0c-12 4-22 14-26 26-2 8 2 14 10 10z"
          fill="#fff"
          transform="translate(0 0)"
        />
      </g>

      {/* checkmarks orbiting */}
      {[
        { cx: 80, cy: 100, d: 0 },
        { cx: 240, cy: 100, d: 0.4 },
        { cx: 240, cy: 260, d: 0.8 },
        { cx: 80, cy: 260, d: 1.2 },
      ].map((p, i) => (
        <g key={i} transform={`translate(${p.cx} ${p.cy})`}>
          <circle r="20" fill="#1a1030" stroke="#A78BFA" strokeWidth="1.5" />
          <path
            d="M-7 0l5 5 9-10"
            stroke="#A78BFA"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          >
            <animate
              attributeName="stroke-dasharray"
              values="0,30;30,0;30,0"
              dur="3s"
              begin={`${p.d}s`}
              repeatCount="indefinite"
            />
          </path>
          <line
            x1="0"
            y1="0"
            x2={160 - p.cx}
            y2={180 - p.cy}
            stroke="#A78BFA"
            strokeWidth="1"
            strokeDasharray="3 4"
            opacity="0.4"
          />
        </g>
      ))}
    </svg>
  );
}

export default function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<SVGRectElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (reduced || isMobile) return;

    gsap.registerPlugin(ScrollTrigger);

    const track = trackRef.current;
    const container = containerRef.current;

    const ctx = gsap.context(() => {
      const trackWidth = track.scrollWidth;
      const distance = trackWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => "+=" + (distance + window.innerHeight * 0.4),
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.setAttribute(
                "width",
                String(self.progress * 100) + "%"
              );
            }
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section id="how" className="relative">
      <div
        ref={containerRef}
        className="relative h-[100svh] overflow-hidden md:h-screen"
      >
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-40" />
        <div className="vignette" />

        {/* Heading overlay (only on first viewport / mobile) */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col px-6 pt-28 md:pt-32">
          <div className="mb-8 max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#A78BFA]" />
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-text-secondary">
                How it works
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.9rem,4.2vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
              Three steps. <span className="heading-gradient">Zero friction.</span>
            </h2>
          </div>

          {/* Progress line */}
          <div className="relative mb-10 h-[2px] w-full overflow-hidden rounded-full bg-white/5">
            <svg className="h-full w-full" preserveAspectRatio="none">
              <rect
                ref={progressRef}
                x="0"
                y="0"
                height="2"
                width="0%"
                fill="url(#prog-grad)"
              />
              <defs>
                <linearGradient id="prog-grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#5B3FBF" />
                  <stop offset="100%" stopColor="#A78BFA" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="relative flex-1 overflow-visible">
            <div
              ref={trackRef}
              className="flex h-full items-center gap-10 will-change-transform md:gap-20"
              style={{ width: "max-content" }}
            >
              {STEPS.map((step) => (
                <div
                  key={step.n}
                  className="flex h-full w-[88vw] max-w-[1000px] flex-shrink-0 items-center gap-8 md:w-[80vw] md:gap-16"
                >
                  <div className="flex w-1/2 flex-col gap-5">
                    {/* Step number circle */}
                    <div className="relative inline-flex h-20 w-20 items-center justify-center">
                      <svg viewBox="0 0 80 80" className="absolute inset-0">
                        <circle
                          cx="40"
                          cy="40"
                          r="36"
                          fill="none"
                          stroke="rgba(139,92,246,0.2)"
                          strokeWidth="1"
                        />
                        <circle
                          cx="40"
                          cy="40"
                          r="36"
                          fill="none"
                          stroke="url(#circ-grad)"
                          strokeWidth="2"
                          strokeDasharray="226"
                          strokeDashoffset="226"
                          strokeLinecap="round"
                          transform="rotate(-90 40 40)"
                        >
                          <animate
                            attributeName="stroke-dashoffset"
                            from="226"
                            to="0"
                            dur="1.4s"
                            fill="freeze"
                            begin="indefinite"
                          />
                        </circle>
                        <defs>
                          <linearGradient id="circ-grad" x1="0" y1="0" x2="80" y2="80">
                            <stop offset="0%" stopColor="#A78BFA" />
                            <stop offset="100%" stopColor="#5B3FBF" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <span className="font-display text-3xl font-semibold text-white">
                        {step.n.toString().padStart(2, "0")}
                      </span>
                    </div>

                    <div className="text-xs font-medium uppercase tracking-[0.22em] text-[#A78BFA]">
                      Step {step.n} — {step.title}
                    </div>

                    <h3 className="font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.01em] text-white">
                      {step.head}
                    </h3>
                    <p className="max-w-md text-base leading-relaxed text-text-secondary md:text-lg">
                      {step.body}
                    </p>
                  </div>

                  <div className="relative flex w-1/2 items-center justify-center">
                    <div className="relative h-[420px] w-[320px] sm:h-[460px] sm:w-[360px]">
                      <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-[#5B3FBF]/20 to-[#0A0812]/0 blur-2xl" />
                      <div className="relative h-full w-full">
                        <StepIllustration kind={step.illustration} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
