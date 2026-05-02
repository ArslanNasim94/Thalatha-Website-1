"use client";

import { NAV_LINKS } from "@/lib/constants";

const SOCIAL = [
  {
    label: "Twitter",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2H21l-6.52 7.45L22 22h-6.812l-4.733-6.18L4.99 22H2.232l6.97-7.96L2 2h6.96l4.28 5.66L18.244 2zm-2.39 18.36h1.5L7.273 3.55H5.66l10.193 16.81z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.55v14H.22V8zm7.55 0h4.36v1.92h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.47 3.04 5.47 6.99V22h-4.55v-6.21c0-1.48-.03-3.39-2.07-3.39-2.07 0-2.39 1.62-2.39 3.29V22H7.77V8z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <footer className="relative isolate overflow-hidden border-t border-white/5">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#A78BFA]/60 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-center md:justify-between md:text-left">
          {/* Logo */}
          <a
            href="#top"
            onClick={(e) => handleAnchor(e, "top")}
            className="group flex items-center gap-2.5"
            data-cursor="hover"
          >
            <span className="relative inline-flex h-7 w-7 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#5B3FBF] to-[#A78BFA] opacity-50 blur-md transition-opacity group-hover:opacity-90" />
              <svg viewBox="0 0 32 32" className="relative h-7 w-7" fill="none">
                <circle cx="16" cy="16" r="14" stroke="url(#fl-grad)" strokeWidth="1.5" />
                <path
                  d="M9 17l7-7 7 7v6a1 1 0 0 1-1 1h-4v-5h-4v5h-4a1 1 0 0 1-1-1v-6Z"
                  stroke="#F5F3FF"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                  fill="rgba(139,92,246,0.18)"
                />
                <defs>
                  <linearGradient id="fl-grad" x1="0" y1="0" x2="32" y2="32">
                    <stop offset="0%" stopColor="#5B3FBF" />
                    <stop offset="100%" stopColor="#A78BFA" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <span className="text-base font-semibold tracking-tight text-white">
              Thalatha
            </span>
          </a>

          {/* Nav */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {NAV_LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => handleAnchor(e, l.id)}
                data-cursor="hover"
                className="text-sm text-text-secondary transition-colors hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-2">
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                data-cursor="hover"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.02] text-text-secondary transition-colors hover:border-[#8B5CF6]/40 hover:bg-[#5B3FBF]/15 hover:text-white"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-center text-xs text-text-secondary md:flex-row md:text-left">
          <div>© 2026 Thalatha. All rights reserved.</div>
          <div className="flex items-center gap-1.5">
            <span>Powered by</span>
            <a
              href="https://nizek.com"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="font-medium text-text-primary transition-colors hover:text-[#A78BFA]"
            >
              Nizek.com
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" data-cursor="hover" className="hover:text-white">
              Privacy
            </a>
            <a href="#" data-cursor="hover" className="hover:text-white">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
