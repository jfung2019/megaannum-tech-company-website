"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LogoIcon } from "@/components/hero/LogoIcon";
import { StaggeredMenu } from "@/components/hero/StaggeredMenu";
import { cinematicEase } from "@/lib/animation";
import { cn } from "@/lib/cn";

const NAV_LINKS = [
  { label: "Business", href: "/#business" },
  { label: "Expertise", href: "/#expertise" },
  { label: "Intelligence", href: "/#intelligence" },
  { label: "Solutions", href: "/#solutions" },
  { label: "Family", href: "/#family-office" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/#contact" },
] as const;

export function Navbar() {
  const [isOnHero, setIsOnHero] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const intro = document.getElementById("intro");
    if (!intro) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsOnHero(entry.isIntersecting);
      },
      {
        threshold: 0.15,
        rootMargin: "-80px 0px 0px 0px",
      },
    );

    observer.observe(intro);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-[100] px-3 pt-3 md:px-6"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: cinematicEase, delay: 0.2 }}
    >
      <nav
        className={cn(
          "relative mx-auto grid max-w-[1600px] grid-cols-[1fr_auto] items-center rounded-full border px-4 py-3 shadow-xl backdrop-blur-2xl transition-all duration-500 md:px-6 min-[920px]:grid-cols-[1fr_auto_1fr]",
          isOnHero
            ? "border-white/24 bg-[#0a0c0e]/82 shadow-black/40"
            : "border-white/70 bg-white/85 shadow-graphite/5",
          isMobileMenuOpen && "max-[919px]:pointer-events-none max-[919px]:opacity-0",
        )}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <LogoIcon className="h-7 w-7" />
          <div>
            <span
              className={cn(
                "block text-[11px] font-bold uppercase tracking-[0.18em] transition-colors duration-300",
                isOnHero ? "text-white" : "text-graphite",
              )}
            >
              MEGAANNUM
            </span>
          </div>
        </Link>

        {/* Center nav */}
        <ul className="hidden items-center justify-center gap-3 min-[920px]:col-start-2 min-[920px]:row-start-1 min-[920px]:flex xl:gap-6">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "text-[8px] font-semibold uppercase tracking-[0.13em] transition-colors duration-300 xl:text-[9px] xl:tracking-nav",
                  isOnHero
                    ? "text-[#f4fbff] hover:text-accent"
                    : "text-graphite/60 hover:text-graphite",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile menu */}
        <div className="col-start-2 row-start-1 flex items-center justify-end gap-4 min-[920px]:col-start-3">
          <StaggeredMenu
            className="min-[920px]:hidden"
            items={NAV_LINKS.map((link) => ({
              label: link.label,
              ariaLabel: `Go to ${link.label}`,
              link: link.href,
            }))}
            colors={["#EC721A", "#8fd8ff", "#05080c"]}
            menuButtonColor={isOnHero ? "#ffffff" : "#1E2328"}
            openMenuButtonColor="#1E2328"
            accentColor="#EC721A"
            onMenuOpen={() => setIsMobileMenuOpen(true)}
            onMenuClose={() => setIsMobileMenuOpen(false)}
          />
        </div>
      </nav>
    </motion.header>
  );
}
