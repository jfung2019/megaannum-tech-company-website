"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMemo, useRef } from "react";
import {
  AdditiveBlending,
  BufferGeometry,
  Float32BufferAttribute,
  MathUtils,
  type Group,
  type Mesh,
  type Points,
} from "three";

gsap.registerPlugin(ScrollTrigger);

const businessPlatforms = [
  {
    acronym: "MAATS",
    name: "Megaannum Generative AI Algorithmic Treasury System",
    description:
      "A treasury intelligence platform designed for real-time visibility, liquidity control, risk alerts, and strategic cash management.",
  },
  {
    acronym: "MATS",
    name: "Megaannum Algorithmic Trading System",
    description:
      "An algorithmic trading intelligence system built to translate strategy into disciplined, data-driven execution.",
  },
];

const expertise = [
  {
    label: "Our Background",
    title: "Built With Leading AI Research Expertise",
    body:
      "In partnership with top AI laboratories from The Chinese University of Hong Kong and Shanghai Fudan University, MAATS is developed by leading AI and data scientists to support optimal treasury and financial strategy execution.",
  },
  {
    label: "Our Partnership",
    title: "Real-Time Financial Data Collaboration",
    body:
      "Megaannum is in advanced discussions with LSEG, owner of Reuters, to pair MAATS with real-time financial data and enhance AI-driven analytics. In return, MAATS can contribute new generative AI data to strengthen market insight and predictive strategy.",
  },
  {
    label: "Professionalism & Expertise",
    title: "Multidisciplinary Financial Intelligence",
    body:
      "Our experts bring deep industry insight and technical experience across finance, accounting, trading, engineering, and AI, driving MAATS with accuracy, adaptability, and innovation.",
  },
];

const expertRoles = [
  {
    role: "Accounting Experts",
    eyebrow: "MEGA Generative AI",
    body:
      "Our accounting experts use AI-powered analytics to streamline financial reporting, optimize cash flow, and support compliance while training MAATS with strategic financial insight.",
  },
  {
    role: "Traders & Portfolio Managers",
    eyebrow: "Trading Strategy",
    body:
      "Our traders and portfolio managers apply AI analytics to optimize liquidity, manage risk, and maximize yield while training MATS with practical market strategies.",
  },
  {
    role: "AI Experts",
    eyebrow: "Model Intelligence",
    body:
      "Our AI experts develop and refine machine learning algorithms to continuously enhance MAATS and MATS with adaptive, high-performance models.",
  },
  {
    role: "Engineers",
    eyebrow: "System Infrastructure",
    body:
      "Our engineers build and maintain the infrastructure behind MAATS and MATS, translating financial strategies into efficient automated systems.",
  },
];

const familyOfficeSolutions = [
  {
    title: "Data Analytics",
    body:
      "In-house AI-driven insights and predictive analytics to optimize cash management and trading strategies.",
  },
  {
    title: "Family Office Management",
    body:
      "Centralized visibility and control for ultra-high-net-worth families, streamlining cash, investments, and risk into one platform.",
  },
  {
    title: "Connectivity",
    body:
      "Integrates with banks, financial firms, and market data providers to support multifaceted financial management.",
  },
  {
    title: "Financial Risk Management",
    body:
      "Advanced stress testing and proactive risk alerts powered by proprietary AI models and real-time market data.",
  },
];

const familyOfficeDetails = [
  {
    number: "01",
    title: "Risk Management",
    body:
      "Multi-dimensional risk framework covering market, credit, liquidity, and concentration risks, including VaR/CVaR, correlation matrix, counterparty scoring, liquidity stress testing, and AI-driven hedging recommendations.",
  },
  {
    number: "02",
    title: "AI-Powered Treasury Alert Function",
    body:
      "MAATS acts as a real-time treasury sentinel, pre-analysing risks, detecting market, FX, credit, counterparty, and fraud events, and providing actionable prevention options.",
  },
  {
    number: "03",
    title: "Investment Management",
    body:
      "Unified portfolio dashboard with asset allocation, valuation metrics, position-level performance tracking, and support for multi-asset investment analysis.",
  },
  {
    number: "04",
    title: "Cash & Liquidity Management",
    body:
      "Real-time visibility and liquidity control with flexible dashboards, automated reconciliation, and complete views of prior-day and intraday transactions.",
  },
  {
    number: "05",
    title: "Scenario Analysis & Stress Testing",
    body:
      "Advanced scenario analysis that evaluates market conditions and simulates financial risks to optimize resilience and align with client objectives.",
  },
];

function DataCoreVisual() {
  const group = useRef<Group>(null);
  const orb = useRef<Mesh>(null);

  const pointsGeometry = useMemo(() => {
    const positions: number[] = [];
    const colors: number[] = [];

    for (let i = 0; i < 320; i += 1) {
      const radius = 0.55 + Math.random() * 1.25;
      const angle = Math.random() * Math.PI * 2;
      const y = MathUtils.randFloatSpread(1.6);
      positions.push(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
      colors.push(0.42, 0.78 + Math.random() * 0.2, 1);
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
    geometry.setAttribute("color", new Float32BufferAttribute(colors, 3));
    return geometry;
  }, []);

  useFrame(({ clock }, delta) => {
    const elapsed = clock.getElapsedTime();

    if (group.current) {
      group.current.rotation.y += delta * 0.18;
      group.current.rotation.x = Math.sin(elapsed * 0.42) * 0.08;
    }

    if (orb.current) {
      orb.current.scale.setScalar(1 + Math.sin(elapsed * 1.7) * 0.04);
    }
  });

  return (
    <group ref={group}>
      <mesh ref={orb}>
        <icosahedronGeometry args={[0.82, 4]} />
        <meshBasicMaterial
          color="#8fd8ff"
          transparent
          opacity={0.22}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </mesh>
      <mesh scale={[1.85, 1.85, 1.85]}>
        <torusGeometry args={[0.78, 0.008, 12, 96]} />
        <meshBasicMaterial color="#d8f4ff" transparent opacity={0.36} depthWrite={false} />
      </mesh>
      <mesh rotation={[Math.PI / 2.8, 0, 0]} scale={[2.12, 2.12, 2.12]}>
        <torusGeometry args={[0.78, 0.006, 12, 96]} />
        <meshBasicMaterial color="#5bb6ff" transparent opacity={0.28} depthWrite={false} />
      </mesh>
      <points geometry={pointsGeometry}>
        <pointsMaterial
          size={0.024}
          vertexColors
          transparent
          opacity={0.72}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </points>
    </group>
  );
}

function TreasuryNetworkVisual() {
  const group = useRef<Group>(null);
  const points = useRef<Points>(null);

  const geometry = useMemo(() => {
    const positions: number[] = [];
    const colors: number[] = [];

    for (let i = 0; i < 180; i += 1) {
      const angle = (i / 180) * Math.PI * 2;
      const layer = i % 5;
      const radius = 0.5 + layer * 0.28 + Math.sin(i * 1.7) * 0.08;
      positions.push(Math.cos(angle) * radius, Math.sin(i * 0.43) * 0.72, Math.sin(angle) * radius);
      colors.push(0.72, 0.92, 1);
    }

    const bufferGeometry = new BufferGeometry();
    bufferGeometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
    bufferGeometry.setAttribute("color", new Float32BufferAttribute(colors, 3));
    return bufferGeometry;
  }, []);

  useFrame(({ clock }, delta) => {
    if (group.current) {
      group.current.rotation.y -= delta * 0.12;
      group.current.position.y = Math.sin(clock.getElapsedTime() * 0.8) * 0.04;
    }

    if (points.current) {
      points.current.rotation.z += delta * 0.04;
    }
  });

  return (
    <group ref={group}>
      <points ref={points} geometry={geometry}>
        <pointsMaterial
          size={0.035}
          vertexColors
          transparent
          opacity={0.76}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </points>
      {[0, 1, 2].map((index) => (
        <mesh key={index} rotation={[Math.PI / 2, 0, index * 0.72]}>
          <torusGeometry args={[0.72 + index * 0.26, 0.004, 8, 96]} />
          <meshBasicMaterial color={index === 1 ? "#8fd8ff" : "#ffffff"} transparent opacity={0.22} />
        </mesh>
      ))}
    </group>
  );
}

function SectionCanvas({ variant }: { variant: "core" | "network" }) {
  return (
    <Canvas camera={{ position: [0, 0, 4.2], fov: 42 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={1.2} />
      <pointLight color="#8fd8ff" intensity={1.6} position={[1.4, 1.4, 2.8]} distance={5} />
      {variant === "core" ? <DataCoreVisual /> : <TreasuryNetworkVisual />}
    </Canvas>
  );
}

function SectionHeader({
  eyebrow,
  title,
  body,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  body?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="section-eyebrow text-[11px] font-semibold uppercase tracking-[0.32em] text-accent">
        {eyebrow}
      </p>
      <h2 className="section-title mt-4 text-4xl font-black tracking-[-0.04em] text-graphite md:text-6xl">
        {title}
      </h2>
      {body ? (
        <p className="section-copy mt-6 text-base leading-8 text-graphite/70 md:text-lg">{body}</p>
      ) : null}
    </div>
  );
}

function OurBusinessSection() {
  return (
    <section
      id="business"
      className="content-section relative scroll-mt-24 overflow-hidden bg-[#f4f7fa] px-6 py-28 md:px-10 md:py-36"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/70 to-transparent" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <SectionHeader
            eyebrow="Our Business"
            title="Algorithmic intelligence for the next era of finance."
            body="We deliver next-generation fintech solutions through proprietary AI systems designed to generate real-time, algorithmic insights tailored to each client’s financial strategy."
          />
          <p className="section-copy mt-8 max-w-2xl text-xl font-semibold leading-9 text-graphite">
            Experience the power of precision, speed, and intelligence, engineered for the next era of finance.
          </p>
        </div>

        <div className="section-visual relative min-h-[520px] overflow-hidden rounded-[2rem] border border-white/70 bg-[#071018] p-6 shadow-2xl shadow-sky-950/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(143,216,255,0.32),transparent_46%),linear-gradient(180deg,rgba(255,255,255,0.08),transparent)]" />
          <div className="relative h-72">
            <SectionCanvas variant="core" />
          </div>
          <div className="relative grid gap-4">
            {businessPlatforms.map((platform) => (
              <div
                key={platform.acronym}
                className="motion-card rounded-3xl border border-white/12 bg-white/[0.07] p-5 backdrop-blur"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-2xl font-black tracking-[-0.05em] text-white">{platform.acronym}</p>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-sky-200/70">Proprietary System</p>
                </div>
                <h3 className="mt-3 text-sm font-semibold text-sky-100">{platform.name}</h3>
                <p className="mt-3 text-sm leading-6 text-white/58">{platform.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TeamExpertiseSection() {
  return (
    <section id="expertise" className="content-section scroll-mt-24 bg-off-white px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Team Expertise"
          title="Research depth, market connectivity, and execution discipline."
          body="MAATS and MATS are shaped by a multidisciplinary team spanning AI research, treasury strategy, trading, portfolio management, accounting, and software engineering."
          align="center"
        />
        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {expertise.map((item, index) => (
            <article
              key={item.title}
              className="motion-card group rounded-[1.75rem] border border-graphite/10 bg-white p-7 shadow-xl shadow-graphite/5"
            >
              <p className="text-5xl font-black tracking-[-0.08em] text-sky-100">0{index + 1}</p>
              <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.28em] text-accent">{item.label}</p>
              <h3 className="mt-4 text-2xl font-black tracking-[-0.04em] text-graphite">{item.title}</h3>
              <p className="mt-5 text-sm leading-7 text-graphite/68">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExpertRolesSection() {
  return (
    <section
      id="intelligence"
      className="content-section relative scroll-mt-24 overflow-hidden bg-[#081018] px-6 py-28 text-white md:px-10 md:py-36"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(143,216,255,0.16),transparent_36%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.09),transparent_34%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="section-eyebrow text-[11px] font-semibold uppercase tracking-[0.32em] text-accent">
            Experts Behind The Systems
          </p>
          <h2 className="section-title mt-4 text-4xl font-black tracking-[-0.04em] text-accent md:text-6xl">
            Human expertise trains the intelligence layer.
          </h2>
          <p className="section-copy mt-6 text-base leading-8 text-white/62 md:text-lg">
            The systems are not generic automation. They are trained and refined by specialists who understand finance,
            risk, execution, accounting, and infrastructure.
          </p>
        </div>
        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {expertRoles.map((item) => (
            <article
              key={item.role}
              className="motion-card rounded-[1.75rem] border border-white/12 bg-white/[0.06] p-7 backdrop-blur"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-sky-300">{item.eyebrow}</p>
              <h3 className="mt-4 text-3xl font-black tracking-[-0.05em] text-white">{item.role}</h3>
              <p className="mt-5 text-sm leading-7 text-white/62">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FamilyOfficeSolutionsSection() {
  return (
    <section id="solutions" className="content-section scroll-mt-24 bg-[#f4f7fa] px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="section-visual sticky top-24 hidden h-[560px] overflow-hidden rounded-[2rem] border border-white/70 bg-[#071018] shadow-2xl shadow-sky-950/20 lg:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(143,216,255,0.28),transparent_44%)]" />
          <SectionCanvas variant="network" />
        </div>
        <div>
          <SectionHeader
            eyebrow="Family Office Solutions"
            title="A command layer for wealth, liquidity, and risk."
            body="MAATS gives family offices centralized visibility and AI-driven control across cash, investments, data connectivity, and risk management."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {familyOfficeSolutions.map((solution, index) => (
              <article
                key={solution.title}
                className="motion-card min-h-64 rounded-[1.75rem] border border-white/80 bg-white p-7 shadow-xl shadow-graphite/5"
              >
                <p className="text-5xl font-black tracking-[-0.08em] text-sky-100">0{index + 1}</p>
                <h3 className="mt-8 text-2xl font-black tracking-[-0.04em] text-graphite">{solution.title}</h3>
                <p className="mt-4 text-sm leading-7 text-graphite/68">{solution.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FamilyOfficeDetailSection() {
  return (
    <section id="family-office" className="content-section scroll-mt-24 bg-off-white px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <SectionHeader
            eyebrow="Family Office Management"
            title="Real-time visibility for sophisticated capital decisions."
            body="MAATS empowers clients with real-time visibility and reporting to optimize cash management, enhance liquidity control, and support compliance."
          />
          <div className="motion-card rounded-[2rem] border border-graphite/10 bg-white p-8 shadow-xl shadow-graphite/5">
            <p className="text-lg leading-9 text-graphite/75">
              MAATS optimizes asset allocation by using predictive AI models to assess risk, return potential,
              and market conditions across equities, bonds, FX, commodities, and other asset classes while
              aligning with each client’s strategic objectives and liquidity needs.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {familyOfficeDetails.map((item, index) => (
            <article
              key={item.title}
              className={`motion-card rounded-[1.75rem] border border-graphite/10 bg-white p-7 shadow-xl shadow-graphite/5 ${
                index === 3 || index === 4 ? "lg:col-span-1" : ""
              }`}
            >
              <p className="text-5xl font-black tracking-[-0.08em] text-sky-100">{item.number}</p>
              <h3 className="mt-6 text-xl font-black tracking-[-0.04em] text-graphite">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-graphite/68">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCtaSection() {
  return (
    <section id="contact" className="content-section scroll-mt-24 bg-[#05080c] px-6 py-24 text-white md:px-10">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-accent/30 bg-white/[0.06] p-8 text-center shadow-[0_0_80px_rgba(236,113,26,0.16)] backdrop-blur md:p-14">
        <p className="section-eyebrow text-[11px] font-semibold uppercase tracking-[0.32em] text-accent">
          Generative AI Solutions
        </p>
        <h2 className="section-title mt-4 text-4xl font-black tracking-[-0.04em] md:text-6xl">
          Built for finance teams that need speed, precision, and control.
        </h2>
        <p className="section-copy mx-auto mt-6 max-w-2xl text-base leading-8 text-white/62">
          Megaannum combines proprietary AI, financial expertise, and scalable engineering to deliver the next
          generation of treasury, trading, and family office intelligence.
        </p>
      </div>
    </section>
  );
}

export function SiteSections() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;

      const sections = gsap.utils.toArray<HTMLElement>(".content-section");

      sections.forEach((section) => {
        gsap.from(section.querySelectorAll(".section-eyebrow, .section-title, .section-copy"), {
          y: 28,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: section,
            start: "top 76%",
          },
        });

        gsap.from(section.querySelectorAll(".motion-card"), {
          y: 36,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: section,
            start: "top 68%",
          },
        });

        const visual = section.querySelector(".section-visual");
        if (visual) {
          gsap.to(visual, {
            yPercent: -5,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          });
        }
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative">
      <OurBusinessSection />
      <TeamExpertiseSection />
      <ExpertRolesSection />
      <FamilyOfficeSolutionsSection />
      <FamilyOfficeDetailSection />
      <FinalCtaSection />
    </div>
  );
}
