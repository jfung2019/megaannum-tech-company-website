"use client";

import Spline from "@splinetool/react-spline";
import type { Application } from "@splinetool/runtime";
import { useCallback, useEffect, useRef } from "react";
import { damp } from "@/lib/mouse";
import { useHeroMotionStore } from "@/store/useHeroMotionStore";

const SPLINE_URL = process.env.NEXT_PUBLIC_SPLINE_HERO_URL;

type SplineHeroProps = {
  onLoadError?: () => void;
};

export default function SplineHero({ onLoadError }: SplineHeroProps) {
  const rafRef = useRef<number>(0);
  const rotation = useRef({ headX: 0, headY: 0, torsoX: 0, torsoY: 0 });
  const appRef = useRef<Application | null>(null);

  const tick = useCallback(() => {
    const app = appRef.current;
    if (!app) {
      rafRef.current = requestAnimationFrame(tick);
      return;
    }

    const { normalizedX, normalizedY, reducedMotion } = useHeroMotionStore.getState();

    if (!reducedMotion) {
      const targetHeadX = normalizedX * 0.08;
      const targetHeadY = normalizedY * 0.06;
      const targetTorsoX = normalizedX * 0.015;
      const targetTorsoY = normalizedY * 0.012;

      rotation.current.headX = damp(rotation.current.headX, targetHeadX, 0.06);
      rotation.current.headY = damp(rotation.current.headY, targetHeadY, 0.06);
      rotation.current.torsoX = damp(rotation.current.torsoX, targetTorsoX, 0.04);
      rotation.current.torsoY = damp(rotation.current.torsoY, targetTorsoY, 0.04);

      const head = app.findObjectByName("Head");
      const torso = app.findObjectByName("Torso");

      if (head) {
        head.rotation.y = rotation.current.headX;
        head.rotation.x = rotation.current.headY;
      }

      if (torso) {
        torso.rotation.y = rotation.current.torsoX;
        torso.rotation.x = rotation.current.torsoY;
      }
    }

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const onLoad = useCallback(
    (app: Application) => {
      appRef.current = app;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(tick);
    },
    [tick],
  );

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
      appRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!SPLINE_URL) {
      onLoadError?.();
    }
  }, [onLoadError]);

  if (!SPLINE_URL) {
    return null;
  }

  return (
    <Spline
      scene={SPLINE_URL}
      onLoad={onLoad}
      onError={() => onLoadError?.()}
      className="h-full w-full max-w-[min(900px,90vw)] [&>canvas]:!h-full [&>canvas]:!w-full"
    />
  );
}
