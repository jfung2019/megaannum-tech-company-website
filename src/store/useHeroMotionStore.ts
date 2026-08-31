import { create } from "zustand";

type HeroMotionState = {
  normalizedX: number;
  normalizedY: number;
  isMobile: boolean;
  isHeroInView: boolean;
  reducedMotion: boolean;
  setPointer: (x: number, y: number) => void;
  setDeviceFlags: (flags: { isMobile: boolean; reducedMotion: boolean }) => void;
  setHeroInView: (isHeroInView: boolean) => void;
};

export const useHeroMotionStore = create<HeroMotionState>((set) => ({
  normalizedX: 0,
  normalizedY: 0,
  isMobile: false,
  isHeroInView: true,
  reducedMotion: false,
  setPointer: (normalizedX, normalizedY) => set({ normalizedX, normalizedY }),
  setDeviceFlags: (flags) => set(flags),
  setHeroInView: (isHeroInView) => set({ isHeroInView }),
}));
