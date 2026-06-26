"use client";

import { motion } from "framer-motion";
import { cinematicEase } from "@/lib/animation";

function ScrollMouseIcon() {
  return (
    <svg width="14" height="22" viewBox="0 0 14 22" fill="none" aria-hidden>
      <rect x="1" y="1" width="12" height="20" rx="6" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1" />
      <motion.rect
        x="6"
        y="5"
        width="2"
        height="4"
        rx="1"
        fill="currentColor"
        fillOpacity="0.4"
        animate={{ y: [0, 4, 0], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

function WaveformIcon() {
  return (
    <svg width="32" height="12" viewBox="0 0 32 12" aria-hidden>
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.rect
          key={i}
          x={i * 4}
          width="2"
          height="8"
          rx="1"
          fill="#EC721A"
          fillOpacity="0.5"
          animate={{ height: [4, 8 + (i % 3) * 2, 4], y: [4, 0, 4] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.1 }}
        />
      ))}
    </svg>
  );
}

export function HeroFooter() {
  return (
    <motion.footer
      className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex items-end justify-between px-6 pb-5 md:px-10 md:pb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: cinematicEase, delay: 1 }}
    >
      {/* Slide counter */}
      <div className="flex items-center gap-3">
        <div className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/20">
          <svg className="absolute inset-0 h-full w-full -rotate-90" aria-hidden>
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              stroke="#EC721A"
              strokeWidth="1"
              strokeOpacity="0.4"
              strokeDasharray="28 72"
            />
          </svg>
          <span className="text-[10px] font-medium tabular-nums text-white/70">01</span>
        </div>
        <div className="hidden items-center gap-1.5 sm:flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`h-1 rounded-full ${i === 0 ? "w-4 bg-accent/70" : "w-1 bg-white/20"}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll prompt */}
      <div className="flex flex-col items-center gap-1.5 text-white/42">
        <ScrollMouseIcon />
        <span className="text-[8px] uppercase tracking-[0.2em]">Scroll to Explore</span>
      </div>

      {/* Sound toggle */}
      <div className="flex items-center gap-2 text-white/45">
        <WaveformIcon />
        <span className="text-[8px] uppercase tracking-[0.18em]">Sound</span>
      </div>
    </motion.footer>
  );
}
