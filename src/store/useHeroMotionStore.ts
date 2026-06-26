import { create } from "zustand";

type HeroMotionState = {
  normalizedX: number;
  normalizedY: number;
  isMobile: boolean;
  reducedMotion: boolean;
  setPointer: (x: number, y: number) => void;
  setDeviceFlags: (flags: { isMobile: boolean; reducedMotion: boolean }) => void;
};

export const useHeroMotionStore = create<HeroMotionState>((set) => ({
  normalizedX: 0,
  normalizedY: 0,
  isMobile: false,
  reducedMotion: false,
  setPointer: (normalizedX, normalizedY) => set({ normalizedX, normalizedY }),
  setDeviceFlags: (flags) => set(flags),
}));
