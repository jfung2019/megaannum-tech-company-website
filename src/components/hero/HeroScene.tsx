"use client";

import { useState } from "react";
import { AmbientGlow } from "@/components/hero/AmbientGlow";
import { CursorTracker } from "@/components/hero/CursorTracker";
import { DeviceDetector } from "@/components/hero/DeviceDetector";
import { HeroEntity } from "@/components/hero/HeroEntity";
import { HeroFooter } from "@/components/hero/HeroFooter";
import { HeroMobileFallback } from "@/components/hero/HeroMobileFallback";
import { HeroStage } from "@/components/hero/HeroStage";
import { HeroTypography } from "@/components/hero/HeroTypography";
import { Navbar } from "@/components/hero/Navbar";
import { ScrollSpyNav } from "@/components/hero/ScrollSpyNav";
import { useHeroMotionStore } from "@/store/useHeroMotionStore";

export function HeroScene() {
  const isMobile = useHeroMotionStore((s) => s.isMobile);
  const reducedMotion = useHeroMotionStore((s) => s.reducedMotion);
  const [splineFailed, setSplineFailed] = useState(false);

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden bg-[#060606]">
      <DeviceDetector />
      <CursorTracker />
      <AmbientGlow />

      <Navbar />
      <ScrollSpyNav />

      <HeroStage>
        {isMobile || reducedMotion ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <HeroMobileFallback />
          </div>
        ) : (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <div className="relative h-[74vh] w-screen max-w-none [transform:translateZ(20px)]">
              <HeroEntity
                splineFailed={splineFailed}
                onSplineError={() => setSplineFailed(true)}
              />
            </div>
          </div>
        )}

        <HeroTypography />
      </HeroStage>

      <HeroFooter />
    </section>
  );
}
