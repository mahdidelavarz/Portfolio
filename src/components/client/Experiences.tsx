import {
  SolarBuildingsBoldIcon,
  SolarCalendarBold,
  SolarCheckCircleBold,
  SolarCodeBold,
  SolarMapPoindBold,
  SolarRocketBold,
} from "@/icons/icons";
import SectionHeader from "@/components/SectionHeader";

const EXPERIENCES = [
  {
    id: 0,
    company: "Petco",
    role: "Frontend Developer",
    period: "2024 - Present",
    duration: "2+ Years",
    location: "Tabriz",
    type: "Full-Time",
    icon: SolarBuildingsBoldIcon,
    color: "from-cyan-500 to-blue-600",
    accentColor: "text-cyan-400",
    description:
      "Developing a multi-module enterprise ERP frontend for complex, data-intensive workflows.",
    highlights: [
      "Developed a multi-module enterprise ERP frontend with React and TypeScript, implementing data-intensive interfaces and complex business workflows.",
      "Designed reusable factories and a PageShell architecture, cutting development time by 70%+ for comparable, repetitive CRUD pages by removing duplicate wiring.",
      "Built shared table and form infrastructure for server/client data, filtering, pagination, permissions, and dependent fields.",
      "Replaced nested modals with routed workspaces and implemented revision-based engineering workflows that preserve context and change history.",
    ],
    tags: [
      "PageShell Architecture",
      "Data-Intensive UI",
      "Routed Workspaces",
      "Workflow UI",
      "Server / Client Tables",
      "RTL Enterprise UI",
    ],
  },
  {
    id: 1,
    company: "LoveCode",
    role: "Frontend Developer",
    period: "2023 - 2024",
    duration: "1 Year",
    location: "Remote",
    type: "Full-Time",
    icon: SolarCodeBold,
    color: "from-rose-500 to-pink-600",
    accentColor: "text-rose-400",
    description:
      "Developed responsive, production-ready web applications with React and TypeScript for a range of business needs.",
    highlights: [
      "Built responsive, production-ready interfaces that delivered consistent experiences across desktop, tablet, and mobile devices.",
      "Collaborated closely with designers and backend developers to translate product requirements into polished, reliable features.",
      "Created clean, reusable frontend components that improved maintainability and supported efficient development across projects.",
      "Integrated payment gateways and application APIs, handling user feedback, loading states, and common error scenarios.",
    ],
    tags: [
      "React",
      "TypeScript",
      "Responsive UI",
      "API Integration",
      "Payment Gateways",
      "Team Collaboration",
    ],
  },
  {
    id: 2,
    company: "Freelance",
    role: "Web Developer",
    period: "2020 - 2021",
    duration: "1+ Year",
    location: "Remote",
    type: "Contract",
    icon: SolarRocketBold,
    color: "from-purple-500 to-indigo-600",
    accentColor: "text-purple-400",
    description:
      "Delivered and maintained custom client web applications from initial requirements through launch and ongoing support.",
    highlights: [
      "Implemented responsive frontend interfaces tailored to each client's goals, audience, and visual requirements.",
      "Integrated application APIs and payment flows to support reliable, user-friendly interactions and business operations.",
      "Managed projects from requirements and technical planning through implementation, testing, deployment, and client handoff.",
      "Maintained applications after launch, resolving issues and delivering iterative performance and usability improvements.",
    ],
    tags: [
      "React",
      "Next.js",
      "TypeScript",
      "API Integration",
      "Deployment",
      "Client Projects",
    ],
  },
] as const;

type Experience = (typeof EXPERIENCES)[number];

function ExperienceItem({ experience }: { experience: Experience }) {
  return (
    <li className="relative pl-12 md:pl-16">
      {/* Timeline marker */}
      <div
        className={`absolute left-0 top-1 w-9 h-9 md:w-11 md:h-11 bg-gradient-to-br ${experience.color} rounded-xl flex items-center justify-center ring-4 ring-slate-950`}
      >
        <experience.icon width={20} height={20} className="text-white" />
      </div>

      <article className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-5 md:p-7 hover:border-cyan-400/30 transition-colors duration-300">
        <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white">
              {experience.role}
              <span className={`${experience.accentColor} font-semibold`}>
                {" "}
                · {experience.company}
              </span>
            </h3>
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
          <span className="self-start shrink-0 px-2.5 py-1 border border-slate-600/60 rounded-full text-xs font-medium text-slate-300">
            {experience.type}
          </span>
        </header>

        <p className="text-slate-300 leading-relaxed text-sm md:text-base mb-4">
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
    </li>
  );
}

export default function Experiences() {
  return (
    <div className="relative py-20 md:py-28 bg-gradient-to-bl from-blue-950 via-gray-950 to-blue-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <SectionHeader
          eyebrow="Experience"
          title="Professional Journey"
          subtitle="Frontend experience across enterprise ERP and product delivery"
        />

        <ol className="relative space-y-8 md:space-y-10 before:absolute before:left-[18px] md:before:left-[22px] before:top-2 before:bottom-2 before:w-px before:bg-slate-700/70">
          {EXPERIENCES.map((experience) => (
            <ExperienceItem key={experience.id} experience={experience} />
          ))}
        </ol>
      </div>
    </div>
  );
}
