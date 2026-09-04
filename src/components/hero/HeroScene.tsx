"use client";

import { useEffect, useRef } from "react";
import { AmbientGlow } from "@/components/hero/AmbientGlow";
import { CursorTracker } from "@/components/hero/CursorTracker";
import { DeviceDetector } from "@/components/hero/DeviceDetector";
import { HeroEntity } from "@/components/hero/HeroEntity";
import { HeroFooter } from "@/components/hero/HeroFooter";
import { HeroStage } from "@/components/hero/HeroStage";
import { HeroTypography } from "@/components/hero/HeroTypography";
import { Navbar } from "@/components/hero/Navbar";
import { ScrollSpyNav } from "@/components/hero/ScrollSpyNav";
import { useHeroMotionStore } from "@/store/useHeroMotionStore";

export function HeroScene() {
  const reducedMotion = useHeroMotionStore((s) => s.reducedMotion);
  const setHeroInView = useHeroMotionStore((s) => s.setHeroInView);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroInView(entry.isIntersecting);
      },
      {
        rootMargin: "120px 0px 120px 0px",
        threshold: 0.01,
      },
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      setHeroInView(true);
    };
  }, [setHeroInView]);

  return (
    <section ref={sectionRef} id="intro" className="relative h-[100dvh] w-full overflow-hidden bg-[#060606]">
      <DeviceDetector />
      <CursorTracker />
      <AmbientGlow />

      <Navbar />
      <ScrollSpyNav />

      <HeroStage>
        {reducedMotion ? null : (
          <div className="pointer-events-none absolute inset-0">
            <div className="relative h-full w-screen max-w-none [transform:translateZ(20px)]">
              <HeroEntity />
            </div>
          </div>
        )}

        <HeroTypography />
      </HeroStage>

      <HeroFooter />
    </section>
  );
}
