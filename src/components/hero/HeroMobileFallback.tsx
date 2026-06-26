"use client";

import { motion } from "framer-motion";
import { AbstractRobotPlaceholder } from "@/components/hero/AbstractRobotPlaceholder";

export function HeroMobileFallback() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <motion.div
        className="relative z-10 h-[48vh] w-full max-w-xs"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <AbstractRobotPlaceholder />
      </motion.div>
    </div>
  );
}
