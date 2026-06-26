"use client";

import { useEffect } from "react";
import { isMobileViewport, prefersReducedMotion } from "@/lib/animation";
import { useHeroMotionStore } from "@/store/useHeroMotionStore";

export function DeviceDetector() {
  const setDeviceFlags = useHeroMotionStore((s) => s.setDeviceFlags);

  useEffect(() => {
    const updateFlags = () => {
      setDeviceFlags({
        isMobile: isMobileViewport(),
        reducedMotion: prefersReducedMotion(),
      });
    };

    updateFlags();

    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    mobileQuery.addEventListener("change", updateFlags);
    motionQuery.addEventListener("change", updateFlags);

    return () => {
      mobileQuery.removeEventListener("change", updateFlags);
      motionQuery.removeEventListener("change", updateFlags);
    };
  }, [setDeviceFlags]);

  return null;
}
