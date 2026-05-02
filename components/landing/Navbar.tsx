"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);

      const sections = NAV_LINKS.map((l) => document.getElementById(l.id));
      const y = window.scrollY + 140;
      let current = "";
      for (const s of sections) {
        if (s && s.offsetTop <= y) current = s.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    setOpen(false);
    const top = el.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-[100] transition-all duration-300 ${
          scrolled
            ? "border-b border-white/5 bg-[rgba(10,8,18,0.78)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:py-5">
          <a
            href="#top"
            onClick={(e) => handleAnchor(e, "top")}
            className="group flex items-center gap-2.5"
            data-cursor="hover"
          >
            <span className="relative inline-flex h-8 w-8 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#5B3FBF] to-[#A78BFA] opacity-50 blur-md transition-opacity group-hover:opacity-90" />
              <svg viewBox="0 0 32 32" className="relative h-8 w-8" fill="none">
                <circle cx="16" cy="16" r="14" stroke="url(#nav-lg)" strokeWidth="1.5" />
                <path
                  d="M9 17l7-7 7 7v6a1 1 0 0 1-1 1h-4v-5h-4v5h-4a1 1 0 0 1-1-1v-6Z"
                  stroke="#F5F3FF"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                  fill="rgba(139,92,246,0.18)"
                />
                <defs>
                  <linearGradient id="nav-lg" x1="0" y1="0" x2="32" y2="32">
                    <stop offset="0%" stopColor="#5B3FBF" />
                    <stop offset="100%" stopColor="#A78BFA" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <span className="text-lg font-semibold tracking-tight text-white">
              Thalatha
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => handleAnchor(e, l.id)}
                data-cursor="hover"
                className="group relative px-4 py-2 text-sm text-text-secondary transition-colors hover:text-white"
              >
                {l.label}
                <span
                  className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] transition-transform duration-300 ${
                    active === l.id ? "scale-x-100" : "scale-x-0"
                  } group-hover:scale-x-100`}
                />
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a
              href="#download"
              onClick={(e) => handleAnchor(e, "download")}
              data-cursor="hover"
              className="shimmer-btn inline-flex items-center gap-2 rounded-full border border-[#E8C97A]/40 bg-[#E8C97A]/10 px-5 py-2 text-sm font-medium text-[#E8C97A] transition-colors hover:bg-[#E8C97A]/20"
            >
              Download
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 4v12m0 0l-5-5m5 5l5-5M5 20h14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 md:hidden"
          >
            <span
              className={`absolute h-px w-5 bg-white transition-transform ${
                open ? "translate-y-0 rotate-45" : "-translate-y-1.5"
              }`}
            />
            <span
              className={`absolute h-px w-5 bg-white transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute h-px w-5 bg-white transition-transform ${
                open ? "translate-y-0 -rotate-45" : "translate-y-1.5"
              }`}
            />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99] flex flex-col items-center justify-center gap-6 bg-[#0A0812]/95 backdrop-blur-2xl md:hidden"
          >
            {NAV_LINKS.map((l, i) => (
              <motion.a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => handleAnchor(e, l.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.06, duration: 0.4 }}
                className="text-3xl font-semibold tracking-tight text-white"
              >
                {l.label}
              </motion.a>
            ))}
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              href="#download"
              onClick={(e) => handleAnchor(e, "download")}
              className="shimmer-btn mt-4 inline-flex items-center gap-2 rounded-full border border-[#E8C97A]/40 bg-[#E8C97A]/10 px-6 py-3 text-sm font-medium text-[#E8C97A]"
            >
              Download App
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
