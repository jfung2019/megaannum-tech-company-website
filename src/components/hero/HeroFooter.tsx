"use client";

import { motion } from "framer-motion";
import { cinematicEase } from "@/lib/animation";
import { useHeroMotionStore } from "@/store/useHeroMotionStore";

function ScrollMouseIcon({ isAnimating }: { isAnimating: boolean }) {
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
        animate={isAnimating ? { y: [0, 4, 0], opacity: [0.4, 0.8, 0.4] } : { y: 0, opacity: 0.4 }}
        transition={isAnimating ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : { duration: 0.25 }}
      />
    </svg>
  );
}

export function HeroFooter() {
  const isHeroInView = useHeroMotionStore((s) => s.isHeroInView);

  return (
    <motion.footer
      className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex justify-center px-6 pb-5 md:px-10 md:pb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: cinematicEase, delay: 1 }}
    >
      <div className="flex flex-col items-center gap-1.5 text-white/42">
        <ScrollMouseIcon isAnimating={isHeroInView} />
        <span className="text-[8px] uppercase tracking-[0.2em]">Scroll to Explore</span>
      </div>
    </motion.footer>
  );
}
