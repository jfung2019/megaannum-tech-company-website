"use client";

const CAREERS_EMAIL = "careers@megaannum.com";

const openRoles = [
  {
    title: "Quantitative Researcher",
    department: "Quant & Research",
    location: "Hong Kong / Remote",
    type: "Full-time",
    description:
      "Design and validate alpha signals and risk models that feed directly into our trading and treasury systems, working closely with our AI research partners.",
  },
  {
    title: "Treasury Systems Engineer",
    department: "Engineering",
    location: "Hong Kong",
    type: "Full-time",
    description:
      "Build and harden the platform behind our proprietary treasury intelligence system, focused on real-time data pipelines, liquidity visibility, and reliability at scale.",
  },
  {
    title: "AI / ML Engineer",
    department: "AI & Data",
    location: "Hong Kong / Remote",
    type: "Full-time",
    description:
      "Develop and refine the machine learning models that power our trading and treasury intelligence, from research prototypes through to production deployment.",
  },
  {
    title: "Investment Analyst",
    department: "Asset Management",
    location: "Hong Kong",
    type: "Full-time",
    description:
      "Support portfolio construction and due diligence across equities, fixed income, and alternatives, translating market research into actionable investment views.",
  },
];

function ApplyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4 6.5L12 13L20 6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CareersHero() {
  return (
    <section className="relative overflow-hidden bg-[#05080c] px-6 pb-20 pt-40 text-white md:px-10 md:pb-28 md:pt-48">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(236,113,26,0.14),transparent_52%)]" />
      <div className="relative mx-auto max-w-4xl text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent">Careers</p>
        <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] md:text-6xl">Work With Us</h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/62 md:text-lg">
          We&apos;re a multidisciplinary team spanning AI research, treasury strategy, trading, and engineering,
          building the intelligence layer for the next era of finance. If that sounds like your kind of problem,
          we&apos;d like to hear from you.
        </p>
        <a
          href={`mailto:${CAREERS_EMAIL}`}
          aria-label="Email us about careers"
          className="mt-8 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/18 text-white/70 transition-all duration-300 hover:border-accent/60 hover:text-accent hover:shadow-[0_0_24px_rgba(236,113,26,0.35)]"
        >
          <EmailIcon />
        </a>
      </div>
    </section>
  );
}

function OpenRoles() {
  return (
    <section className="bg-off-white px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-5xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent">Open Roles</p>
        <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-graphite md:text-4xl">
          Current opportunities at Megaannum.
        </h2>

        <div className="mt-12 grid gap-5">
          {openRoles.map((role) => (
            <article
              key={role.title}
              className="flex flex-col gap-4 rounded-[1.75rem] border border-graphite/10 bg-white p-7 shadow-xl shadow-graphite/5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-accent">{role.department}</p>
                <h3 className="mt-2 text-xl font-black tracking-[-0.03em] text-graphite">{role.title}</h3>
                <p className="mt-2 text-sm leading-6 text-graphite/68">{role.description}</p>
                <p className="mt-3 text-xs uppercase tracking-wide text-graphite/45">
                  {role.location} · {role.type}
                </p>
              </div>

              <a
                href={`mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(`Application: ${role.title}`)}`}
                className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-graphite/15 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-graphite transition-colors duration-300 hover:border-accent/60 hover:text-accent sm:self-center"
              >
                Apply
                <ApplyIcon />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CareersContent() {
  return (
    <>
      <CareersHero />
      <OpenRoles />
    </>
  );
}
