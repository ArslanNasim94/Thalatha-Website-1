"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const okPointer = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (min-width: 1024px)"
    ).matches;
    if (reduced || !okPointer) return;
    setEnabled(true);

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.14;
      ringY += (mouseY - ringY) * 0.14;
      ring.style.transform = `translate3d(${ringX - 20}px, ${ringY - 20}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    const interactiveSelector = 'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]';
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest?.(interactiveSelector)) {
        ring.classList.add("is-hover");
        dot.classList.add("is-hover");
      }
    };
    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest?.(interactiveSelector)) {
        ring.classList.remove("is-hover");
        dot.classList.remove("is-hover");
      }
    };
    const onLeave = () => {
      ring.style.opacity = "0";
      dot.style.opacity = "0";
    };
    const onEnter = () => {
      ring.style.opacity = "1";
      dot.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-[#A78BFA] mix-blend-difference transition-[opacity,width,height] duration-200"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[9998] h-10 w-10 rounded-full border border-[#8B5CF6]/70 transition-[opacity,width,height,background] duration-200"
        style={{ willChange: "transform" }}
      />
      <style jsx global>{`
        .custom-cursor.is-hover.h-2 {
          width: 40px;
          height: 40px;
          margin-left: -16px;
          margin-top: -16px;
          background: rgba(139, 92, 246, 0.2);
          border: 1px solid rgba(167, 139, 250, 0.6);
          mix-blend-mode: normal;
        }
        .custom-cursor.is-hover.h-10 {
          opacity: 0 !important;
        }
      `}</style>
    </>
  );
}
