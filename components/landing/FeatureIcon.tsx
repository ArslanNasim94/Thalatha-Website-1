"use client";

import type { FeatureIcon } from "@/lib/constants";

const stroke = {
  stroke: "url(#fi-grad)",
  strokeWidth: 1.6,
  fill: "none",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export default function FeatureIconSVG({ name }: { name: FeatureIcon }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width="56"
      height="56"
      className="draw-svg overflow-visible"
      aria-hidden
    >
      <defs>
        <linearGradient id="fi-grad" x1="0" y1="0" x2="64" y2="64">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#5B3FBF" />
        </linearGradient>
      </defs>
      {name === "video" && (
        <>
          <rect x="8" y="18" width="34" height="28" rx="6" {...stroke} style={{ ["--len" as any]: 130 }} />
          <path d="M44 26 L56 20 V44 L44 38 Z" {...stroke} style={{ ["--len" as any]: 90 }} />
          <circle cx="18" cy="26" r="2.5" {...stroke} style={{ ["--len" as any]: 18 }} />
        </>
      )}
      {name === "location" && (
        <>
          <path
            d="M32 10c-9 0-16 7-16 16 0 11 16 28 16 28s16-17 16-28c0-9-7-16-16-16z"
            {...stroke}
            style={{ ["--len" as any]: 130 }}
          />
          <circle cx="32" cy="26" r="6" {...stroke} style={{ ["--len" as any]: 40 }} />
          <path d="M14 52h36" {...stroke} style={{ ["--len" as any]: 36 }} />
        </>
      )}
      {name === "quote" && (
        <>
          <path
            d="M14 14h28a8 8 0 0 1 8 8v16a8 8 0 0 1-8 8H30l-10 10V46h-6a8 8 0 0 1-8-8V22a8 8 0 0 1 8-8z"
            {...stroke}
            style={{ ["--len" as any]: 170 }}
          />
          <path d="M22 28h12M22 36h20" {...stroke} style={{ ["--len" as any]: 32 }} />
        </>
      )}
      {name === "shield" && (
        <>
          <path
            d="M32 6l20 6v16c0 12-8 22-20 28-12-6-20-16-20-28V12l20-6z"
            {...stroke}
            style={{ ["--len" as any]: 150 }}
          />
          <path
            d="M22 32l7 7 13-14"
            {...stroke}
            style={{ ["--len" as any]: 36 }}
          />
        </>
      )}
      {name === "chat" && (
        <>
          <path
            d="M12 16h32a8 8 0 0 1 8 8v14a8 8 0 0 1-8 8H30l-10 8V46h-8a8 8 0 0 1-8-8V24a8 8 0 0 1 8-8z"
            {...stroke}
            style={{ ["--len" as any]: 170 }}
          />
          <circle cx="22" cy="31" r="2" {...stroke} style={{ ["--len" as any]: 14 }} />
          <circle cx="32" cy="31" r="2" {...stroke} style={{ ["--len" as any]: 14 }} />
          <circle cx="42" cy="31" r="2" {...stroke} style={{ ["--len" as any]: 14 }} />
        </>
      )}
      {name === "globe" && (
        <>
          <circle cx="32" cy="32" r="22" {...stroke} style={{ ["--len" as any]: 140 }} />
          <ellipse cx="32" cy="32" rx="22" ry="9" {...stroke} style={{ ["--len" as any]: 100 }} />
          <ellipse cx="32" cy="32" rx="9" ry="22" {...stroke} style={{ ["--len" as any]: 100 }} />
          <path d="M10 32h44M32 10v44" {...stroke} style={{ ["--len" as any]: 88 }} />
        </>
      )}
    </svg>
  );
}
