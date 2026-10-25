"use client";

import {
  SolarAltArrowLeftBold,
  SolarAltArrowRightBold,
  SolarBuildingsBoldIcon,
  SolarCalendarBold,
  SolarCheckCircleBold,
  SolarCodeBold,
  SolarMapPoindBold,
} from "@/icons/icons";
import { useSlider } from "@/lib/useSlider";
import SectionHeader from "@/components/SectionHeader";

const EXPERIENCES = [
  {
    id: 0,
    company: "Pump Turbine Co. (Petco)",
    shortName: "Petco",
    role: "Frontend Developer",
    period: "Aug 2024 – Present",
    duration: "2+ years",
    location: "Tabriz, Iran",
    type: "Full-time",
    icon: SolarBuildingsBoldIcon,
    color: "from-cyan-500 to-blue-600",
    accentColor: "text-cyan-400",
    description:
      "In-house ERP for a pump and turbine manufacturer, covering sales, engineering, planning, finance and office workflows. I started on the legacy system and have been building the new React + TypeScript ERP since November 2024.",
    highlights: [
      "Designed PageShell, a typed, metadata-driven page layer that composes data hooks, forms, server/client tables and pluggable features (uploads, signatures, reports, nested routes). It now powers 57 of the ERP's ~80 pages.",
      "Built the shared data-table system: server-side paging, sorting and filtering, multi-condition search, per-table persisted state, bulk actions, permission-aware row actions and a mobile card view.",
      "Built a multi-tab workspace on React Router with pinned and temporary tabs, drag reordering and persisted state, so users can keep several records open at once.",
      "Implemented the engineering revision flow after the sales-to-engineering handoff: automatic revision numbers, workflow gating and revision-aware part-list edits.",
      "Replaced modal-only admin screens with nested, parent-aware routes, and wrote supporting .NET Core / EF Core endpoints when my features needed them.",
    ],
    tags: [
      "React",
      "TypeScript",
      "TanStack Query",
      "Zustand",
      "React Hook Form",
      "Tailwind CSS 4",
      "RTL UI",
      ".NET Core (supporting)",
    ],
  },
  {
    id: 1,
    company: "LoveCode (web agency)",
    shortName: "LoveCode",
    role: "Frontend Developer",
    period: "Apr 2023 – Sep 2024",
    duration: "1.5 years",
    location: "Remote",
    type: "Contract",
    icon: SolarCodeBold,
    color: "from-rose-500 to-pink-600",
    accentColor: "text-rose-400",
    description:
      "Contract frontend work for a web agency, building websites and web apps for its clients. Most of this work is under NDA, so it isn't listed by name.",
    highlights: [
      "Turned the agency's designs into responsive React + TypeScript frontends for client websites and web apps.",
      "Integrated client REST APIs and payment gateways, including loading, empty and error states.",
      "Worked with the agency's designers and backend developers to ship features on client schedules.",
    ],
    tags: [
      "React",
      "TypeScript",
      "Responsive UI",
      "REST APIs",
      "Payment Gateways",
    ],
  },
] as const;

type Experience = (typeof EXPERIENCES)[number];

function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <article className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-5 md:p-7 text-left">
      <header className="flex items-start gap-4 mb-5">
        <div
          className={`w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br ${experience.color} rounded-xl flex items-center justify-center shrink-0`}
        >
          <experience.icon width={24} height={24} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white">
                {experience.company}
              </h3>
              <p
                className={`text-base md:text-lg font-medium ${experience.accentColor}`}
              >
                {experience.role}
              </p>
            </div>
            <span className="self-start shrink-0 px-2.5 py-1 border border-slate-600/60 rounded-full text-xs font-medium text-slate-300">
              {experience.type}
            </span>
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-400">
            <span className="flex items-center gap-1.5">
              <SolarCalendarBold width={14} height={14} />
              {experience.period} · {experience.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <SolarMapPoindBold width={14} height={14} />
              {experience.location}
            </span>
          </div>
        </div>
      </header>

      <p className="text-slate-300 leading-relaxed text-sm md:text-base mb-5">
        {experience.description}
      </p>

      <ul className="space-y-2.5 mb-5">
        {experience.highlights.map((highlight) => (
          <li
            key={highlight}
            className="flex items-start gap-2.5 text-sm md:text-base text-slate-300 leading-relaxed"
          >
            <SolarCheckCircleBold
              width={16}
              height={16}
              className={`mt-1 shrink-0 ${experience.accentColor}`}
            />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2">
        {experience.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 bg-slate-700/30 border border-slate-600/50 text-xs font-medium text-slate-300 rounded-lg"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

const arrowClass =
  "shrink-0 p-2.5 bg-slate-800/60 border border-slate-700/50 rounded-xl text-slate-300 hover:border-cyan-400/50 hover:text-cyan-400 transition-colors";

export default function Experiences() {
  // Petco (index 0) is shown first; slides only change on user action.
  const { index, setIndex, previous, next, containerProps } = useSlider(
    EXPERIENCES.length,
  );

  return (
    <div className="relative py-20 md:py-28 bg-gradient-to-br from-blue-950 via-gray-950 to-blue-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Experience"
          title="Professional Journey"
          subtitle="Frontend experience across enterprise ERP and product delivery"
        />

        <div
          {...containerProps}
          aria-label="Work experience"
          className="rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
        >
          {/* Company tabs */}
          <div className="flex items-center justify-between gap-2 sm:gap-4 mb-6">
            <button
              type="button"
              onClick={previous}
              className={arrowClass}
              aria-label="Previous experience"
            >
              <SolarAltArrowLeftBold width={20} height={20} />
            </button>

            <div className="flex flex-1 justify-center gap-2 sm:gap-3">
              {EXPERIENCES.map((exp, i) => {
                const active = i === index;
                return (
                  <button
                    key={exp.id}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-current={active}
                    aria-label={exp.shortName}
                    className={`flex items-center gap-2 rounded-xl px-2.5 py-2 sm:px-4 text-sm font-medium transition-all ${
                      active
                        ? "bg-slate-800/80 border border-cyan-400/40 text-white"
                        : "border border-transparent text-slate-400 hover:text-white"
                    }`}
                  >
                    <span
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        active
                          ? `bg-gradient-to-br ${exp.color}`
                          : "bg-slate-700/50"
                      }`}
                    >
                      <exp.icon width={16} height={16} className="text-white" />
                    </span>
                    <span className="hidden sm:inline">{exp.shortName}</span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={next}
              className={arrowClass}
              aria-label="Next experience"
            >
              <SolarAltArrowRightBold width={20} height={20} />
            </button>
          </div>

          <ExperienceCard
            key={EXPERIENCES[index].id}
            experience={EXPERIENCES[index]}
          />

          <p className="mt-4 text-center text-xs text-slate-500">
            {index + 1} / {EXPERIENCES.length}
          </p>
        </div>
      </div>
    </div>
  );
}
