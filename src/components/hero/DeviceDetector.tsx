"use client";

import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/animation";
import { useHeroMotionStore } from "@/store/useHeroMotionStore";

export function DeviceDetector() {
  const setReducedMotion = useHeroMotionStore((s) => s.setReducedMotion);

  useEffect(() => {
    const updateFlags = () => {
      setReducedMotion(prefersReducedMotion());
    };

    updateFlags();

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    motionQuery.addEventListener("change", updateFlags);

    return () => {
      motionQuery.removeEventListener("change", updateFlags);
    };
  }, [setReducedMotion]);

  return null;
}
