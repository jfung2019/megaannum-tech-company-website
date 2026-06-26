"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LogoIcon } from "@/components/hero/LogoIcon";
import { cinematicEase } from "@/lib/animation";
const NAV_LINKS = [
  { label: "Company", href: "#company" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Platform", href: "#platform" },
  { label: "Intelligence Lab", href: "#intelligence-lab" },
  { label: "Insights", href: "#insights" },
  { label: "Contact", href: "#contact" },
] as const;

function useNycTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const format = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString("en-US", {
        timeZone: "America/New_York",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setTime(formatted);
    };

    format();
    const interval = window.setInterval(format, 30000);
    return () => window.clearInterval(interval);
  }, []);

  return time;
}

export function Navbar() {
  const nycTime = useNycTime();

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-30"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: cinematicEase, delay: 0.2 }}
    >
      <nav
        className="relative mx-auto grid max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center px-6 py-4 md:px-10 lg:py-5"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <LogoIcon className="h-7 w-7" />
          <div>
            <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
              MEGAANNUM
            </span>
            <span className="hidden text-[7px] uppercase tracking-[0.22em] text-white/42 sm:block">
              Intelligence for Capital
            </span>
          </div>
        </Link>

        {/* Center nav */}
        <ul className="hidden items-center justify-center gap-5 lg:flex xl:gap-7">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[9px] uppercase tracking-nav text-white/48 transition-colors duration-300 hover:text-white/85"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right utilities */}
        <div className="flex items-center justify-end gap-4">
          {nycTime ? (
            <span className="hidden text-[9px] uppercase tracking-nav text-white/45 md:block">
              ( NYC ) {nycTime}
            </span>
          ) : null}
          <button
            type="button"
            className="flex flex-col gap-1 p-1"
            aria-label="Open menu"
          >
            <span className="block h-px w-4 bg-white/60" />
            <span className="block h-px w-4 bg-white/60" />
          </button>
        </div>
      </nav>
    </motion.header>
  );
}
