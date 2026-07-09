"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cinematicEase } from "@/lib/animation";
import { cn } from "@/lib/cn";

const SECTIONS = [
  { id: "intro", label: "Intro" },
  { id: "business", label: "Business" },
  { id: "expertise", label: "Expertise" },
  { id: "intelligence", label: "Intelligence" },
  { id: "solutions", label: "Solutions" },
  { id: "family-office", label: "Family Office" },
  { id: "contact", label: "Contact" },
] as const;

export function ScrollSpyNav() {
  const [activeSection, setActiveSection] = useState<(typeof SECTIONS)[number]["id"]>("intro");
  const isDarkSection = activeSection === "intro" || activeSection === "intelligence" || activeSection === "contact";

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((section) => {
      const element = document.getElementById(section.id);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(section.id);
          }
        },
        {
          rootMargin: "-42% 0px -48% 0px",
          threshold: 0,
        },
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  return (
    <motion.nav
      className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: cinematicEase, delay: 0.8 }}
      aria-label="Section navigation"
    >
      <div
        className={cn(
          "relative flex flex-col items-end gap-2.5 rounded-[1.65rem] border px-3 py-3.5 shadow-xl backdrop-blur-2xl transition-colors duration-500",
          isDarkSection
            ? "border-white/28 bg-black/68 shadow-black/45"
            : "border-graphite/10 bg-white/72 shadow-graphite/20",
        )}
      >
        <div
          className={cn(
            "absolute bottom-5 right-[14px] top-5 w-px transition-colors duration-500",
            isDarkSection ? "bg-white/24" : "bg-graphite/14",
          )}
          aria-hidden
        />

        {SECTIONS.map((section) => {
          const isActive = section.id === activeSection;

          return (
            <Link key={section.id} href={`#${section.id}`} className="relative flex items-center gap-2.5">
              <span
                className={cn(
                  "text-[7px] font-semibold uppercase tracking-[0.16em] transition-colors",
                  isActive
                    ? "text-[#ff7a1a]"
                    : isDarkSection
                      ? "text-[#dff7ff]/70 hover:text-white"
                      : "text-graphite/48 hover:text-graphite",
                )}
              >
                {section.label}
              </span>
              <span
                className={cn(
                  "relative z-10 block h-1.5 w-1.5 rounded-full border",
                  isActive
                    ? "border-[#ff7a1a] bg-[#ff7a1a] shadow-[0_0_16px_rgba(255,122,26,0.8)]"
                    : isDarkSection
                      ? "border-[#dff7ff]/70 bg-[#dff7ff]/70"
                      : "border-graphite/24 bg-graphite/28",
                )}
                aria-hidden
              />
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
