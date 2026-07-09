"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LogoIcon } from "@/components/hero/LogoIcon";
import { StaggeredMenu } from "@/components/hero/StaggeredMenu";
import { cinematicEase } from "@/lib/animation";
import { cn } from "@/lib/cn";

const NAV_LINKS = [
  { label: "Business", href: "#business" },
  { label: "Expertise", href: "#expertise" },
  { label: "Intelligence", href: "#intelligence" },
  { label: "Solutions", href: "#solutions" },
  { label: "Family", href: "#family-office" },
  { label: "Contact", href: "#contact" },
] as const;

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateScrolled = () => setIsScrolled(window.scrollY > 80);

    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
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
          "relative mx-auto grid max-w-[1600px] grid-cols-[1fr_auto] items-center rounded-full border px-4 py-3 transition-all duration-500 md:px-6 min-[920px]:grid-cols-[1fr_auto_1fr]",
          isScrolled
            ? "border-white/70 bg-white/78 shadow-xl shadow-graphite/5 backdrop-blur-xl"
            : "border-white/24 bg-black/42 shadow-xl shadow-black/35 backdrop-blur-2xl",
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
                "block text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors",
                isScrolled || isMobileMenuOpen ? "text-graphite" : "text-[#f4fbff]",
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
                  "text-[8px] uppercase tracking-[0.13em] transition-colors duration-300 xl:text-[9px] xl:tracking-nav",
                  isScrolled ? "text-graphite/52 hover:text-graphite" : "text-[#dff7ff] hover:text-[#ff7a1a]",
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
            menuButtonColor={isScrolled || isMobileMenuOpen ? "#1E2328" : "#ffffff"}
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
