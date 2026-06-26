"use client";

import { motion } from "framer-motion";
import { cinematicEase } from "@/lib/animation";
import { cn } from "@/lib/cn";

const SECTIONS = [
  { id: "intro", label: "Intro" },
  { id: "capabilities", label: "Capabilities" },
  { id: "platform", label: "Platform" },
  { id: "intelligence", label: "Intelligence" },
  { id: "about", label: "About" },
] as const;

const ACTIVE_SECTION = "intro";

export function ScrollSpyNav() {
  return (
    <motion.nav
      className="pointer-events-none fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 xl:block"
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: cinematicEase, delay: 0.8 }}
      aria-label="Section navigation"
    >
      <div className="relative flex flex-col items-end gap-3 pl-4">
        <div className="absolute bottom-2 left-[3px] top-2 w-px bg-white/12" aria-hidden />

        {SECTIONS.map((section) => {
          const isActive = section.id === ACTIVE_SECTION;

          return (
            <div key={section.id} className="relative flex items-center gap-2.5">
              <span
                className={cn(
                  "text-[7px] uppercase tracking-[0.12em] transition-colors",
                  isActive ? "text-white/72" : "text-white/32",
                )}
              >
                {section.label}
              </span>
              <span
                className={cn(
                  "relative z-10 block h-1.5 w-1.5 rounded-full border",
                  isActive ? "border-accent bg-accent" : "border-white/24 bg-white/20",
                )}
                aria-hidden
              />
            </div>
          );
        })}
      </div>
    </motion.nav>
  );
}
