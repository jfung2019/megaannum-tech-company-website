"use client";

import { ThreePlanesHero } from "@/components/hero/ThreePlanesHero";

export function HeroEntity() {
  return (
    <div className="relative flex h-full w-full items-center justify-center [transform-style:preserve-3d]">
      <div className="relative z-10 h-full w-screen max-w-none [transform:translateZ(40px)]">
        <ThreePlanesHero />
      </div>
    </div>
  );
}
