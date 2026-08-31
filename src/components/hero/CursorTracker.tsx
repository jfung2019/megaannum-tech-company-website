"use client";

import { useEffect } from "react";
import { normalizePointer } from "@/lib/mouse";
import { useHeroMotionStore } from "@/store/useHeroMotionStore";

export function CursorTracker() {
  const isHeroInView = useHeroMotionStore((s) => s.isHeroInView);
  const setPointer = useHeroMotionStore((s) => s.setPointer);

  useEffect(() => {
    if (!isHeroInView) return;

    const onMove = (event: PointerEvent) => {
      const { normalizedX, normalizedY } = normalizePointer(
        event.clientX,
        event.clientY,
        window.innerWidth,
        window.innerHeight,
      );
      setPointer(normalizedX, normalizedY);
      document.documentElement.style.setProperty("--pointer-x", String(normalizedX));
      document.documentElement.style.setProperty("--pointer-y", String(normalizedY));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [isHeroInView, setPointer]);

  return null;
}
