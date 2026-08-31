"use client";

import { motion } from "framer-motion";
import { cinematicEase } from "@/lib/animation";
import { cn } from "@/lib/cn";

type PanelStat = {
  label: string;
  value: string;
};

type PanelChart = "line" | "wave" | "map" | "graph";

type DataPanel = {
  id: string;
  title: string;
  eyebrow: string;
  chart: PanelChart;
  stats: PanelStat[];
  side: "core" | "impact";
  className: string;
};

const CORE_PANELS: DataPanel[] = [
  {
    id: "finance",
    title: "Finance",
    eyebrow: "Capital Optimization",
    chart: "line",
    stats: [
      { label: "AUM", value: "$48.6B" },
      { label: "Return YTD", value: "8.47%" },
      { label: "Risk Level", value: "Moderate" },
    ],
    side: "core",
    className: "left-[2%] top-[16%] w-[13.5rem] xl:w-60",
  },
  {
    id: "hedge-fund",
    title: "Hedge Fund",
    eyebrow: "Performance Overview",
    chart: "line",
    stats: [
      { label: "YTD Return", value: "15.6%" },
      { label: "AUM", value: "$12.8B" },
      { label: "Sharpe Ratio", value: "1.42" },
    ],
    side: "core",
    className: "left-[19%] top-[8%] w-[12rem] xl:w-52",
  },
  {
    id: "quant",
    title: "Quant",
    eyebrow: "Alpha Signals",
    chart: "wave",
    stats: [
      { label: "Momentum", value: "0.76" },
      { label: "Sentiment", value: "0.71" },
      { label: "Value", value: "0.62" },
    ],
    side: "core",
    className: "left-[3%] top-[46%] w-[12rem] xl:w-52",
  },
  {
    id: "treasury",
    title: "Treasury",
    eyebrow: "Liquidity Intelligence",
    chart: "map",
    stats: [
      { label: "Cash Position", value: "$2.45B" },
      { label: "Cash Flow (30D)", value: "+$320M" },
    ],
    side: "core",
    className: "left-[18.5%] top-[38%] w-[13.5rem] xl:w-60",
  },
];

const IMPACT_PANELS: DataPanel[] = [
  {
    id: "ngo",
    title: "NGO",
    eyebrow: "Impact Analytics",
    chart: "map",
    stats: [
      { label: "Projects", value: "128" },
      { label: "Countries", value: "32" },
    ],
    side: "impact",
    className: "right-[3%] top-[13%] w-[11.5rem] xl:w-48",
  },
  {
    id: "medical",
    title: "Medical",
    eyebrow: "Health Intelligence",
    chart: "graph",
    stats: [
      { label: "Early Detection", value: "89%" },
      { label: "Patient Outcomes", value: "+32%" },
    ],
    side: "impact",
    className: "right-[19%] top-[22%] w-[11rem] xl:w-44",
  },
  {
    id: "data",
    title: "Data",
    eyebrow: "Data Infrastructure",
    chart: "graph",
    stats: [
      { label: "Data Sources", value: "2,846" },
      { label: "Uptime", value: "99.9%" },
    ],
    side: "impact",
    className: "right-[9%] top-[44%] w-[11.5rem] xl:w-48",
  },
  {
    id: "ai",
    title: "AI",
    eyebrow: "Model Intelligence",
    chart: "graph",
    stats: [
      { label: "Models", value: "36" },
      { label: "Accuracy", value: "92.6%" },
    ],
    side: "impact",
    className: "right-[18%] top-[53%] w-[11rem] xl:w-44",
  },
];

const ALL_PANELS = [...CORE_PANELS, ...IMPACT_PANELS];

function MiniChart({ chart, muted }: { chart: PanelChart; muted: boolean }) {
  const stroke = muted ? "rgba(255,255,255,0.32)" : "#EC721A";

  if (chart === "line") {
    return (
      <svg viewBox="0 0 96 28" className="h-7 w-full" aria-hidden>
        <polyline
          points="0,22 14,18 26,20 38,10 50,14 64,6 76,9 96,2"
          fill="none"
          stroke={stroke}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (chart === "wave") {
    return (
      <svg viewBox="0 0 96 28" className="h-7 w-full" aria-hidden>
        <path
          d="M0 16 C 8 6, 16 26, 24 16 S 40 6, 48 16 S 64 26, 72 16 S 88 6, 96 16"
          fill="none"
          stroke={stroke}
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (chart === "map") {
    const dots = [
      [4, 10], [10, 6], [16, 12], [22, 8], [28, 14], [34, 6], [40, 10],
      [46, 16], [52, 8], [58, 12], [64, 6], [70, 14], [76, 10], [82, 16],
      [8, 18], [20, 20], [32, 18], [44, 20], [56, 18], [68, 20], [80, 18],
    ];
    return (
      <svg viewBox="0 0 88 24" className="h-6 w-full" aria-hidden>
        {dots.map(([x, y], index) => (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r={index % 3 === 0 ? 1.4 : 1}
            fill={stroke}
            fillOpacity={index % 3 === 0 ? 0.85 : 0.4}
          />
        ))}
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 88 24" className="h-6 w-full" aria-hidden>
      <line x1="10" y1="6" x2="34" y2="16" stroke={stroke} strokeWidth="0.8" strokeOpacity="0.5" />
      <line x1="34" y1="16" x2="60" y2="8" stroke={stroke} strokeWidth="0.8" strokeOpacity="0.5" />
      <line x1="34" y1="16" x2="54" y2="20" stroke={stroke} strokeWidth="0.8" strokeOpacity="0.5" />
      <line x1="60" y1="8" x2="80" y2="14" stroke={stroke} strokeWidth="0.8" strokeOpacity="0.5" />
      {[[10, 6], [34, 16], [60, 8], [54, 20], [80, 14]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="2" fill={stroke} />
      ))}
    </svg>
  );
}

function DataPanelCard({ panel, index }: { panel: DataPanel; index: number }) {
  const muted = panel.side === "impact";

  return (
    <motion.div
      className={cn(
        "absolute rounded-xl border backdrop-blur-md",
        muted
          ? "border-white/8 bg-black/25 px-3 py-2.5 opacity-80"
          : "border-white/14 bg-black/38 px-3.5 py-3 shadow-[0_18px_46px_rgba(0,0,0,0.5)]",
        panel.className,
      )}
      initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
      animate={{ opacity: muted ? 0.8 : 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1.1, ease: cinematicEase, delay: 0.55 + index * 0.08 }}
    >
      <p
        className={cn(
          "mb-1 text-[6.5px] uppercase tracking-nav xl:text-[7px]",
          muted ? "text-white/35" : "text-accent/80",
        )}
      >
        {panel.eyebrow}
      </p>
      <h3
        className={cn(
          "mb-2 text-[10px] font-bold uppercase tracking-wide xl:text-[11px]",
          muted ? "text-white/75" : "text-white",
        )}
      >
        {panel.title}
      </h3>

      <MiniChart chart={panel.chart} muted={muted} />

      <dl className="mt-2 flex flex-col gap-1">
        {panel.stats.map((stat) => (
          <div key={stat.label} className="flex items-baseline justify-between gap-2">
            <dt className={cn("text-[6.5px] uppercase tracking-wide xl:text-[7px]", muted ? "text-white/35" : "text-white/45")}>
              {stat.label}
            </dt>
            <dd
              className={cn(
                "text-[8px] font-semibold tabular-nums xl:text-[9px]",
                muted ? "text-white/70" : "text-white/92",
              )}
            >
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </motion.div>
  );
}

export function HeroDataPanels() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[20] hidden xl:block" aria-hidden>
      {ALL_PANELS.map((panel, index) => (
        <DataPanelCard key={panel.id} panel={panel} index={index} />
      ))}
    </div>
  );
}
