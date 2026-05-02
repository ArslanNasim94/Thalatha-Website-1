import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#0A0812",
          surface: "#120E1E",
        },
        brand: {
          deep: "#4C35A0",
          purple: "#5B3FBF",
          mid: "#7c5cbf",
          light: "#8B5CF6",
          pale: "#A78BFA",
        },
        text: {
          primary: "#F5F3FF",
          secondary: "#A99CC2",
        },
        gold: "#E8C97A",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-dm-sans)", "var(--font-inter)", "sans-serif"],
      },
      animation: {
        "pulse-dot": "pulseDot 2s ease-in-out infinite",
        "shimmer": "shimmer 2.4s linear infinite",
        "float-slow": "floatSlow 6s ease-in-out infinite",
      },
      keyframes: {
        pulseDot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(1.3)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-120%) skewX(-12deg)" },
          "100%": { transform: "translateX(220%) skewX(-12deg)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      boxShadow: {
        glow: "0 0 60px rgba(139, 92, 246, 0.35)",
        "glow-soft": "0 0 30px rgba(139, 92, 246, 0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
