"use client";

import type { ReactNode } from "react";

type HeroStageProps = {
  children: ReactNode;
};

export function HeroStage({ children }: HeroStageProps) {
  return (
    <div
      className="absolute inset-0 z-[4]"
      style={{
        perspective: "1600px",
        perspectiveOrigin: "50% 40%",
      }}
    >
      <div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </div>
    </div>
  );
}
