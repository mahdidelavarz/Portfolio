"use client";

import Image from "next/image";
import {
  LucideChevronLeft,
  LucideChevronRight,
  LucideExternalLink,
  LucideGithub,
} from "@/icons/icons";
import { useSlider } from "@/lib/useSlider";
import SectionHeader from "@/components/SectionHeader";

const projects = [
  {
    id: 1,
    title: "TidySense",
    subtitle: "AI-assisted personal planner (Persian, RTL)",
    description:
      "A planner where you describe a goal and the AI drafts a week of tasks and routines. Nothing is saved until you review and apply the draft, and manual planning keeps working when AI is off.",
    technologies: [
      "React 19",
      "TypeScript",
      "TanStack Router & Query",
      "Zustand",
      ".NET 10",
      "PostgreSQL",
    ],
    category: "Full Stack",
    year: "2026",
    image: "/tidysense.webp",
    color: "from-violet-500 to-indigo-500",
    liveUrl: "https://tidysense.ir",
    githubUrl: "https://github.com/mahdidelavarz/tidysense",
    features: [
      "AI-drafted weekly plans with review before apply",
      "Today view with tasks, dependencies & recurring routines",
      "Phone OTP login with cookie-based sessions",
    ],
  },
  {
    id: 2,
    title: "NeoVault",
    subtitle: "Self-hosted knowledge and productivity system",
    description:
      "A self-hosted workspace for organizing links, notes, code snippets and API requests in nested collections, with cross-module search and offline access.",
    technologies: [
      "Next.js 16",
      "TypeScript",
      "Express",
      "PostgreSQL",
      "Docker",
    ],
    category: "Full Stack",
    year: "2026",
    image: "/neovault.webp",
    color: "from-purple-500 to-fuchsia-500",
    liveUrl: "https://neovault.ir",
    githubUrl: "https://github.com/mahdidelavarz/linkvault",
    features: [
      "Frontend, API, database & deployment ownership",
      "Cross-module search on PostgreSQL trigram indexes",
      "Offline PWA with queued sync",
    ],
  },
  {
    id: 3,
    title: "AranazShop",
    subtitle: "Persian e-commerce storefront and admin",
    description:
      "An RTL storefront and admin panel covering catalog browsing, checkout and day-to-day order management.",
    technologies: [
      "Next.js 16",
      "TypeScript",
      "Supabase (PostgreSQL)",
      "Zustand",
    ],
    category: "Full Stack",
    year: "2026",
    image: "/nazishop.webp",
    color: "from-pink-500 to-rose-500",
    liveUrl: "https://aranazshop.ir",
    githubUrl: "https://github.com/mahdidelavarz/nazishop",
    features: [
      "Product variants, search & filtering",
      "Cart, checkout & order tracking",
      "OTP authentication, RBAC & inventory admin",
    ],
  },
  {
    id: 4,
    title: "Portfolio Website",
    subtitle: "Engineering-focused personal portfolio",
    description:
      "This site: a Next.js App Router portfolio with technical SEO, structured metadata, sitemap generation and a responsive dark interface.",
    technologies: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "PostgreSQL (Drizzle)",
    ],
    category: "Frontend",
    year: "2026",
    image: "/portfolio.webp",
    color: "from-cyan-500 to-blue-500",
    liveUrl: "https://mahdidelavar.ir",
    githubUrl: "https://github.com/mahdidelavarz/Portfolio",
    features: [
      "Bilingual engineering Articles section",
      "JavaScript/React challenges with progress tracking",
      "Leaderboard-backed learning experience",
    ],
  },
];

type Project = (typeof projects)[number];

function ProjectDetails({ project }: { project: Project }) {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-slate-700/50 bg-slate-800/50 p-5 sm:p-8 text-left">
      <span className="text-sm font-medium text-slate-400">
        {project.category} · {project.year}
      </span>
      <h3 className="mt-2 text-2xl lg:text-3xl font-bold text-white">
        {project.title}
      </h3>
      <p className="mt-1 text-sm sm:text-base font-medium text-cyan-400">
        {project.subtitle}
      </p>

      <p className="mt-5 text-sm sm:text-base leading-relaxed text-slate-300">
        {project.description}
      </p>

      <h4 className="mt-6 mb-3 text-sm font-semibold uppercase tracking-wider text-slate-300">
        Key Features
      </h4>
      <ul className="space-y-2 text-sm text-slate-300">
        {project.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <span
              className={`mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gradient-to-br ${project.color}`}
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <h4 className="mt-6 mb-3 text-sm font-semibold uppercase tracking-wider text-slate-300">
        Tech Stack
      </h4>
      <div className="flex flex-wrap gap-2">
        {project.technologies.map((technology) => (
          <span
            key={technology}
            className="rounded-lg bg-slate-700/50 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-300"
          >
            {technology}
          </span>
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-3 font-semibold text-white transition hover:from-cyan-500 hover:to-blue-500"
          >
            Live demo <LucideExternalLink className="h-4 w-4" />
          </a>
        )}
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-500 px-6 py-3 font-semibold text-slate-300 transition hover:bg-slate-700/50 hover:text-white"
        >
          Source code <LucideGithub className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

const arrowClass =
  "absolute top-1/2 -translate-y-1/2 rounded-full bg-slate-950/60 p-2 text-white backdrop-blur-md transition hover:bg-slate-950/80";

export default function Projects() {
  // Slides only change on user action (arrows, thumbnails, swipe, arrow keys).
  const { index, setIndex, previous, next, containerProps } = useSlider(
    projects.length,
  );

  return (
    <div className="relative py-20 md:py-28 bg-gradient-to-bl from-blue-950 via-gray-950 to-blue-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Projects"
          title="Featured Projects"
          subtitle="Products I designed, built and deployed end to end"
        />

        <div
          {...containerProps}
          aria-label="Featured projects"
          className="grid gap-6 lg:grid-cols-2 lg:gap-10 rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
        >
          <div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-900">
              {projects.map((project, i) => (
                <Image
                  key={project.id}
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority={i === 0}
                  aria-hidden={i !== index}
                  className={`object-cover object-top transition-opacity duration-500 ${
                    i === index ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
              <button
                type="button"
                onClick={previous}
                className={`${arrowClass} left-3`}
                aria-label="Previous project"
              >
                <LucideChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={next}
                className={`${arrowClass} right-3`}
                aria-label="Next project"
              >
                <LucideChevronRight className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-3">
              {projects.map((project, i) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-current={i === index}
                  aria-label={`Show ${project.title}`}
                  className={`relative h-14 sm:h-16 overflow-hidden rounded-xl border-2 transition ${
                    i === index
                      ? "border-cyan-400"
                      : "border-slate-700 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    sizes="15vw"
                    className="object-cover object-top"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 truncate p-1.5 text-[10px] sm:text-xs font-medium text-white">
                    {project.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <ProjectDetails key={projects[index].id} project={projects[index]} />
        </div>
      </div>
    </div>
  );
}
