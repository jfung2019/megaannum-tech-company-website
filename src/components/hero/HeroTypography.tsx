"use client";

import { motion } from "framer-motion";
import { cinematicEase } from "@/lib/animation";

export function HeroTypography() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-[7vh] z-20 flex flex-col items-center px-6 text-center md:bottom-[8vh]"
      style={{ transform: "translateZ(80px)" }}
    >
      <motion.p
        className="mb-4 text-[9px] uppercase tracking-tagline text-accent/90 md:mb-5 md:text-[10px]"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: cinematicEase, delay: 0.35 }}
      >
        AI Integrated. Impact Multiplied.
      </motion.p>

      <motion.h1
        className="font-black leading-[0.82] tracking-[0.02em]"
        initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.4, ease: cinematicEase, delay: 0.5 }}
      >
        <span
          className="block text-[clamp(2.8rem,8vw,6.6rem)] text-white"
          style={{ textShadow: "0 4px 42px rgba(0,0,0,0.9)" }}
        >
          INTELLIGENCE
        </span>
        <span
          className="block text-[clamp(2.8rem,8vw,6.6rem)] text-accent"
          style={{ textShadow: "0 0 42px rgba(236,113,26,0.42)" }}
        >
          INTEGRATED.
        </span>
      </motion.h1>

      <motion.p
        className="mt-4 max-w-md text-[9px] uppercase tracking-sub text-white/52 md:mt-5 md:text-[10px]"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: cinematicEase, delay: 0.9 }}
      >
        One AI. Limitless Applications.
      </motion.p>
    </div>
  );
}
