import { create } from "zustand";

type HeroMotionState = {
  normalizedX: number;
  normalizedY: number;
  isHeroInView: boolean;
  reducedMotion: boolean;
  setPointer: (x: number, y: number) => void;
  setReducedMotion: (reducedMotion: boolean) => void;
  setHeroInView: (isHeroInView: boolean) => void;
};

export const useHeroMotionStore = create<HeroMotionState>((set) => ({
  normalizedX: 0,
  normalizedY: 0,
  isHeroInView: true,
  reducedMotion: false,
  setPointer: (normalizedX, normalizedY) => set({ normalizedX, normalizedY }),
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),
  setHeroInView: (isHeroInView) => set({ isHeroInView }),
}));
