"use client";

import { gsap } from "gsap";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";

export type StaggeredMenuItem = {
  label: string;
  ariaLabel: string;
  link: string;
};

type StaggeredMenuProps = {
  position?: "left" | "right";
  colors?: string[];
  items?: StaggeredMenuItem[];
  displayItemNumbering?: boolean;
  className?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  changeMenuColorOnOpen?: boolean;
  closeOnClickAway?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
};

export function StaggeredMenu({
  position = "right",
  colors = ["#EC721A", "#8fd8ff", "#05080c"],
  items = [],
  displayItemNumbering = true,
  className,
  menuButtonColor = "#fff",
  openMenuButtonColor = "#fff",
  accentColor = "#EC721A",
  changeMenuColorOnOpen = true,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose,
}: StaggeredMenuProps) {
  const [open, setOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [textLines, setTextLines] = useState(["Menu", "Close"]);
  const openRef = useRef(false);
  const panelRef = useRef<HTMLElement>(null);
  const preLayersRef = useRef<HTMLDivElement>(null);
  const preLayerElsRef = useRef<HTMLDivElement[]>([]);
  const plusHRef = useRef<HTMLSpanElement>(null);
  const plusVRef = useRef<HTMLSpanElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const textInnerRef = useRef<HTMLSpanElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const spinTweenRef = useRef<gsap.core.Tween | null>(null);
  const textTweenRef = useRef<gsap.core.Tween | null>(null);
  const colorTweenRef = useRef<gsap.core.Tween | null>(null);
  const busyRef = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!mounted) return undefined;

    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;
      if (!panel || !plusH || !plusV || !icon || !textInner) return;

      const preLayers = preContainer
        ? Array.from(preContainer.querySelectorAll<HTMLDivElement>("[data-menu-prelayer]"))
        : [];
      preLayerElsRef.current = preLayers;

      const offscreen = position === "left" ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen, opacity: 1 });
      gsap.set(plusH, { transformOrigin: "50% 50%", rotate: 0, y: -3 });
      gsap.set(plusV, { transformOrigin: "50% 50%", rotate: 0, y: 3 });
      gsap.set(icon, { transformOrigin: "50% 50%" });
      gsap.set(textInner, { yPercent: 0 });
      if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });

    return () => ctx.revert();
  }, [menuButtonColor, mounted, position]);

  useEffect(() => {
    document.body.style.overflow = open || isClosing ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isClosing, open]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    closeTweenRef.current?.kill();
    closeTweenRef.current = null;

    const itemEls = Array.from(panel.querySelectorAll<HTMLElement>("[data-menu-item-label]"));
    const numberEls = Array.from(panel.querySelectorAll<HTMLElement>("[data-menu-numbered-item]"));
    const offscreen = position === "left" ? -100 : 100;

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length) gsap.set(numberEls, { "--sm-num-opacity": 0 });

    const tl = gsap.timeline({ paused: true });
    layers.forEach((layer, index) => {
      tl.fromTo(
        layer,
        { xPercent: offscreen },
        { xPercent: 0, duration: 0.5, ease: "power4.out" },
        index * 0.07,
      );
    });

    const lastLayerTime = layers.length ? (layers.length - 1) * 0.07 : 0;
    const panelStart = lastLayerTime + (layers.length ? 0.08 : 0);
    const panelDuration = 0.65;
    tl.fromTo(
      panel,
      { xPercent: offscreen },
      { xPercent: 0, duration: panelDuration, ease: "power4.out" },
      panelStart,
    );

    if (itemEls.length) {
      const itemsStart = panelStart + panelDuration * 0.15;
      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          ease: "power4.out",
          stagger: { each: 0.1, from: "start" },
        },
        itemsStart,
      );
      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            "--sm-num-opacity": 1,
            duration: 0.6,
            ease: "power2.out",
            stagger: { each: 0.08, from: "start" },
          },
          itemsStart + 0.1,
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    setIsClosing(false);
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (!tl) {
      busyRef.current = false;
      return;
    }
    tl.eventCallback("onComplete", () => {
      busyRef.current = false;
    });
    tl.play(0);
  }, [buildOpenTimeline]);

  const playClose = useCallback((afterClose?: () => void) => {
    openTlRef.current?.kill();
    openTlRef.current = null;

    const panel = panelRef.current;
    if (!panel) {
      setIsClosing(false);
      afterClose?.();
      return;
    }

    const offscreen = position === "left" ? -100 : 100;
    busyRef.current = true;
    closeTweenRef.current?.kill();
    closeTweenRef.current = gsap.to([...preLayerElsRef.current, panel], {
      xPercent: offscreen,
      duration: 0.32,
      ease: "power3.in",
      overwrite: "auto",
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll<HTMLElement>("[data-menu-item-label]"));
        const numberEls = Array.from(panel.querySelectorAll<HTMLElement>("[data-menu-numbered-item]"));
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
        if (numberEls.length) gsap.set(numberEls, { "--sm-num-opacity": 0 });
        busyRef.current = false;
        setIsClosing(false);
        afterClose?.();
      },
    });
  }, [position]);

  const animateIcon = useCallback((opening: boolean) => {
    const plusH = plusHRef.current;
    const plusV = plusVRef.current;
    if (!plusH || !plusV) return;
    spinTweenRef.current?.kill();
    const duration = opening ? 0.8 : 0.35;
    const ease = opening ? "power4.out" : "power3.inOut";
    spinTweenRef.current = gsap.to(plusH, {
      rotate: opening ? 45 : 0,
      y: opening ? 0 : -3,
      duration,
      ease,
      overwrite: "auto",
    });
    gsap.to(plusV, {
      rotate: opening ? -45 : 0,
      y: opening ? 0 : 3,
      duration,
      ease,
      overwrite: "auto",
    });
  }, []);

  const animateColor = useCallback(
    (opening: boolean) => {
      const button = toggleBtnRef.current;
      if (!button) return;
      colorTweenRef.current?.kill();
      if (!changeMenuColorOnOpen) {
        gsap.set(button, { color: menuButtonColor });
        return;
      }
      colorTweenRef.current = gsap.to(button, {
        color: opening ? openMenuButtonColor : menuButtonColor,
        delay: 0.18,
        duration: 0.3,
        ease: "power2.out",
      });
    },
    [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor],
  );

  const animateText = useCallback((opening: boolean) => {
    const inner = textInnerRef.current;
    if (!inner) return;
    textTweenRef.current?.kill();

    const currentLabel = opening ? "Menu" : "Close";
    const targetLabel = opening ? "Close" : "Menu";
    const sequence = [currentLabel, targetLabel, currentLabel, targetLabel, targetLabel];
    setTextLines(sequence);

    gsap.set(inner, { yPercent: 0 });
    textTweenRef.current = gsap.to(inner, {
      yPercent: -((sequence.length - 1) / sequence.length) * 100,
      duration: 0.78,
      ease: "power4.out",
    });
  }, []);

  const closeMenu = useCallback(() => {
    if (!openRef.current) return;
    openRef.current = false;
    setIsClosing(true);
    setOpen(false);
    playClose(onMenuClose);
    animateIcon(false);
    animateColor(false);
    animateText(false);
  }, [animateColor, animateIcon, animateText, onMenuClose, playClose]);

  const toggleMenu = useCallback(() => {
    if (busyRef.current) return;
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);
    if (target) {
      setIsClosing(false);
      onMenuOpen?.();
      playOpen();
    } else {
      setIsClosing(true);
      playClose(onMenuClose);
    }
    animateIcon(target);
    animateColor(target);
    animateText(target);
  }, [animateColor, animateIcon, animateText, onMenuClose, onMenuOpen, playClose, playOpen]);

  useEffect(() => {
    if (!closeOnClickAway || !open) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(target)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeMenu, closeOnClickAway, open]);

  const visibleLayers = colors.length >= 3
    ? colors.filter((_, index) => index !== Math.floor(colors.length / 2)).slice(0, 3)
    : colors.slice(0, 3);
  const menuChromeVisible = open || isClosing;

  const menuPortal = (
    <>
      <div
        ref={preLayersRef}
        className={cn(
          "pointer-events-none fixed bottom-0 top-0 z-[105] hidden w-full opacity-0 max-[919px]:block sm:w-[min(420px,86vw)]",
          position === "left" ? "left-0" : "right-0",
        )}
        aria-hidden
      >
        {visibleLayers.map((color, index) => (
          <div
            key={`${color}-${index}`}
            data-menu-prelayer
            className={cn("absolute inset-y-0 w-full opacity-0", position === "left" ? "left-0" : "right-0")}
            style={{ background: color }}
          />
        ))}
      </div>

      <aside
        id="mobile-staggered-menu-panel"
        ref={panelRef}
        className={cn(
          "fixed bottom-0 top-0 z-[106] hidden w-full overflow-y-auto bg-[#f7f7f5] px-7 pb-8 pt-28 opacity-0 shadow-2xl shadow-black/30 max-[919px]:block sm:w-[min(420px,86vw)]",
          position === "left" ? "left-0" : "right-0",
        )}
        aria-hidden={!menuChromeVisible}
      >
        <nav aria-label="Mobile navigation">
          <ul
            className="flex list-none flex-col gap-3 p-0"
            role="list"
            data-numbering={displayItemNumbering || undefined}
          >
            {items.map((item, index) => (
              <li key={item.label} className="relative overflow-hidden leading-none">
                <Link
                  href={item.link}
                  aria-label={item.ariaLabel}
                  data-menu-numbered-item={displayItemNumbering || undefined}
                  className="group relative inline-block pr-14 text-[clamp(2.6rem,13vw,4.4rem)] font-black uppercase leading-none tracking-[-0.07em] text-graphite transition-colors duration-300 hover:text-[var(--sm-accent)]"
                  style={{ "--sm-num-opacity": 0, "--sm-accent": accentColor } as React.CSSProperties}
                  onClick={closeMenu}
                >
                  <span data-menu-item-label className="inline-block origin-bottom will-change-transform">
                    {item.label}
                  </span>
                  {displayItemNumbering ? (
                    <span
                      className="absolute right-0 top-[0.18em] text-base font-semibold tracking-normal text-[var(--sm-accent)] opacity-[var(--sm-num-opacity)]"
                      aria-hidden
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {menuChromeVisible ? (
        <button
          type="button"
          className={cn(
            "fixed right-5 top-5 z-[130] hidden bg-transparent p-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-graphite transition-all duration-300 hover:text-[var(--sm-accent)] focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-graphite/50 max-[919px]:inline-flex",
            isClosing && "pointer-events-none translate-x-2 opacity-0",
          )}
          aria-label="Close menu"
          aria-controls="mobile-staggered-menu-panel"
          onClick={closeMenu}
        >
          Close
        </button>
      ) : null}
    </>
  );

  return (
    <div
      className={cn("relative z-[110]", className)}
      style={{ "--sm-accent": accentColor } as React.CSSProperties}
      data-open={open || undefined}
    >
      <button
        ref={toggleBtnRef}
        type="button"
        className={cn(
          "relative z-[110] inline-flex items-center gap-2 overflow-visible p-1 text-[9px] font-semibold uppercase tracking-[0.16em] transition-opacity focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70",
          menuChromeVisible && "pointer-events-none opacity-0",
        )}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-staggered-menu-panel"
        onClick={toggleMenu}
      >
        <span className="relative inline-block h-[1em] min-w-9 overflow-hidden whitespace-nowrap" aria-hidden>
          <span ref={textInnerRef} className="flex flex-col leading-none">
            {textLines.map((line, index) => (
              <span key={`${line}-${index}`} className="block h-[1em] leading-none">
                {line}
              </span>
            ))}
          </span>
        </span>
        <span ref={iconRef} className="relative inline-flex h-4 w-4 items-center justify-center" aria-hidden>
          <span ref={plusHRef} className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 rounded bg-current" />
          <span ref={plusVRef} className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 rounded bg-current" />
        </span>
      </button>
      {mounted ? createPortal(menuPortal, document.body) : null}
    </div>
  );
}

export default StaggeredMenu;
