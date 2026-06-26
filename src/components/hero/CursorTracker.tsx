"use client";

import { useEffect } from "react";
import { normalizePointer } from "@/lib/mouse";
import { useHeroMotionStore } from "@/store/useHeroMotionStore";

export function CursorTracker() {
  const setPointer = useHeroMotionStore((s) => s.setPointer);

  useEffect(() => {
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
  }, [setPointer]);

  return null;
}
