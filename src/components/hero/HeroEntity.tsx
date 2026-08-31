"use client";

import dynamic from "next/dynamic";
import { ThreePlanesHero } from "@/components/hero/ThreePlanesHero";
import { useHeroMotionStore } from "@/store/useHeroMotionStore";

const SplineHero = dynamic(() => import("@/components/hero/SplineHero"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-64 w-48 animate-pulse rounded-2xl bg-pearl/60" />
    </div>
  ),
});

const HAS_SPLINE_URL = Boolean(process.env.NEXT_PUBLIC_SPLINE_HERO_URL);

type HeroEntityProps = {
  splineFailed: boolean;
  onSplineError: () => void;
};

export function HeroEntity({ splineFailed, onSplineError }: HeroEntityProps) {
  const isMobile = useHeroMotionStore((s) => s.isMobile);
  const reducedMotion = useHeroMotionStore((s) => s.reducedMotion);

  const showSpline = HAS_SPLINE_URL && !isMobile && !reducedMotion && !splineFailed;
  const showPlanes = !reducedMotion && !showSpline;

  return (
    <div className="relative flex h-full w-full items-center justify-center [transform-style:preserve-3d]">
      <div className="relative z-10 h-full w-screen max-w-none [transform:translateZ(40px)]">
        {showSpline ? (
          <SplineHero onLoadError={onSplineError} />
        ) : null}
        {showPlanes ? <ThreePlanesHero /> : null}
      </div>
    </div>
  );
}
