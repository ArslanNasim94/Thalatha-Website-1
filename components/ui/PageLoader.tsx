"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function PageLoader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add("is-loading");
    const t = setTimeout(() => {
      setShow(false);
      document.documentElement.classList.remove("is-loading");
    }, 1100);
    return () => {
      clearTimeout(t);
      document.documentElement.classList.remove("is-loading");
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#0A0812]"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [0.8, 1.04, 1],
              opacity: [0, 1, 1, 0],
            }}
            transition={{ duration: 1.0, times: [0, 0.4, 0.7, 1], ease: "easeOut" }}
            className="flex items-center gap-3"
          >
            <span className="relative inline-flex h-8 w-8 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#5B3FBF] to-[#A78BFA] blur-md opacity-70" />
              <svg viewBox="0 0 32 32" className="relative h-8 w-8" fill="none">
                <circle cx="16" cy="16" r="14" stroke="url(#lg)" strokeWidth="1.5" />
                <path
                  d="M9 17l7-7 7 7v6a1 1 0 0 1-1 1h-4v-5h-4v5h-4a1 1 0 0 1-1-1v-6Z"
                  stroke="#F5F3FF"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                  fill="rgba(139,92,246,0.15)"
                />
                <defs>
                  <linearGradient id="lg" x1="0" y1="0" x2="32" y2="32">
                    <stop offset="0%" stopColor="#5B3FBF" />
                    <stop offset="100%" stopColor="#A78BFA" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <span className="text-2xl font-semibold tracking-tight text-white">
              Thalatha
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
