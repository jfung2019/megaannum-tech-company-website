"use client";

import { motion } from "framer-motion";
import { useHeroMotionStore } from "@/store/useHeroMotionStore";

export function AmbientGlow() {
  const reducedMotion = useHeroMotionStore((s) => s.reducedMotion);

  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
      {/* Base cinematic gradient */}
      <div className="hero-scene absolute inset-0" />

      {/* Radial center glow */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 42% at 50% 58%, rgba(242,169,0,0.2) 0%, transparent 68%)",
        }}
        animate={reducedMotion ? undefined : { opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Volumetric orange bloom */}
      <div className="hero-bloom absolute inset-0" />

      {/* Soft floor reflection */}
      <div className="hero-floor absolute inset-x-0 bottom-0 h-[38%]" />

      {/* Film grain haze */}
      <div className="hero-haze absolute inset-0" />

      {/* Edge vignette */}
      <div className="hero-vignette absolute inset-0" />

      {/* Side ambient depth washes */}
      <div
        className="absolute inset-y-0 left-0 w-1/4"
        style={{
          background: "linear-gradient(90deg, rgba(0,0,0,0.72) 0%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-y-0 right-0 w-1/4"
        style={{
          background: "linear-gradient(270deg, rgba(0,0,0,0.72) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}
