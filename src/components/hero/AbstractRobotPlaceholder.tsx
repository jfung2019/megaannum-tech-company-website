"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { damp } from "@/lib/mouse";
import { useHeroMotionStore } from "@/store/useHeroMotionStore";

export function AbstractRobotPlaceholder() {
  const entityRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const rotation = useRef({ headX: 0, headY: 0, bodyX: 0, bodyY: 0 });

  useEffect(() => {
    const tick = () => {
      const { normalizedX, normalizedY, reducedMotion } = useHeroMotionStore.getState();

      if (!reducedMotion) {
        const targetHeadX = normalizedX * 5;
        const targetHeadY = normalizedY * 4;
        const targetBodyX = normalizedX * 1.2;
        const targetBodyY = normalizedY * 0.8;

        rotation.current.headX = damp(rotation.current.headX, targetHeadX, 0.05);
        rotation.current.headY = damp(rotation.current.headY, targetHeadY, 0.05);
        rotation.current.bodyX = damp(rotation.current.bodyX, targetBodyX, 0.04);
        rotation.current.bodyY = damp(rotation.current.bodyY, targetBodyY, 0.04);

        if (headRef.current) {
          headRef.current.style.transform = `rotateY(${rotation.current.headX}deg) rotateX(${-rotation.current.headY}deg)`;
        }
        if (entityRef.current) {
          entityRef.current.style.transform = `rotateY(${rotation.current.bodyX}deg) rotateX(${-rotation.current.bodyY}deg)`;
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <motion.div
      ref={entityRef}
      className="relative mx-auto flex h-full w-full max-w-xs flex-col items-center justify-center [transform-style:preserve-3d]"
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Head */}
      <div
        ref={headRef}
        className="relative z-10 mb-2 h-[4.25rem] w-[3.75rem] md:h-[4.75rem] md:w-[4.25rem]"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute inset-0 rounded-[40%]"
          style={{
            background: "linear-gradient(160deg, rgba(255,255,255,0.92) 0%, rgba(201,205,210,0.35) 100%)",
            border: "1px solid rgba(255,255,255,0.8)",
            boxShadow: "0 8px 32px rgba(30,35,40,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
          }}
        />
        <div className="absolute inset-2 rounded-[38%] border border-accent/10 bg-white/20" />
        <div className="absolute left-1/2 top-1/2 h-7 w-px -translate-x-1/2 -translate-y-1/2 bg-accent/25" />
        <div className="absolute left-1/2 top-1/2 h-px w-7 -translate-x-1/2 -translate-y-1/2 bg-accent/25" />
      </div>

      {/* Torso */}
      <div className="relative h-36 w-28 md:h-40 md:w-32">
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(233,231,226,0.5) 60%, rgba(201,205,210,0.2) 100%)",
            border: "1px solid rgba(255,255,255,0.7)",
            boxShadow: "0 16px 48px rgba(30,35,40,0.1), inset 0 1px 0 rgba(255,255,255,0.8)",
          }}
        />
        <svg className="absolute inset-0 h-full w-full opacity-20" aria-hidden>
          {Array.from({ length: 3 }).map((_, row) =>
            Array.from({ length: 3 }).map((_, col) => (
              <rect
                key={`${row}-${col}`}
                x={28 + col * 28}
                y={24 + row * 28}
                width="20"
                height="20"
                fill="none"
                stroke="#EC721A"
                strokeWidth="0.4"
              />
            )),
          )}
        </svg>
        {[
          { top: "38%", left: "46%" },
          { top: "55%", left: "50%" },
          { top: "68%", left: "42%" },
        ].map((pos, index) => (
          <motion.div
            key={index}
            className="absolute h-1 w-1 rounded-full bg-accent-glow"
            style={pos}
            animate={{ opacity: [0.25, 0.75, 0.25] }}
            transition={{ duration: 3.5 + index, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Arms */}
      <motion.div
        className="absolute -left-9 top-[5.5rem] h-[5.5rem] w-2.5 rounded-full md:-left-10 md:top-24 md:h-24"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.8), rgba(201,205,210,0.3))",
          border: "1px solid rgba(255,255,255,0.6)",
          boxShadow: "0 4px 16px rgba(30,35,40,0.06)",
        }}
        animate={{ rotate: [-2, 1.5, -2] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-9 top-[5.5rem] h-[5.5rem] w-2.5 rounded-full md:-right-10 md:top-24 md:h-24"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.8), rgba(201,205,210,0.3))",
          border: "1px solid rgba(255,255,255,0.6)",
          boxShadow: "0 4px 16px rgba(30,35,40,0.06)",
        }}
        animate={{ rotate: [2, -1.5, 2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      />

      {/* Floor glow */}
      <div
        className="absolute -bottom-4 h-8 w-32 rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(236,113,26,0.18) 0%, transparent 70%)",
        }}
        aria-hidden
      />
    </motion.div>
  );
}
