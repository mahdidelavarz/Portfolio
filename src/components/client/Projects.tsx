import Image from "next/image";
import { LucideExternalLink, LucideGithub } from "@/icons/icons";
import SectionHeader from "@/components/SectionHeader";

const projects = [
  {
    id: 1,
    title: "NeoVault",
    subtitle: "Self-hosted knowledge and productivity system",
    description:
      "A self-hosted full-stack workspace for organizing links, notes, code snippets, and API requests with hierarchical collections, PostgreSQL search, and offline-capable access.",
    technologies: ["Next.js 16", "TypeScript", "PostgreSQL", "Docker"],
    category: "Full Stack",
    year: "2026",
    image: "/neovault.webp",
    color: "from-purple-500 to-fuchsia-500",
    liveUrl: "https://neovault.ir",
    githubUrl: "https://github.com/mahdidelavarz/linkvault",
    features: [
      "Frontend, API, database & deployment ownership",
      "PostgreSQL full-text search & hierarchy",
      "Offline PWA with queued sync",
    ],
  },
  {
    id: 2,
    title: "AranazShop",
    subtitle: "Full-stack Persian e-commerce platform",
    description:
      "A full-stack RTL storefront and admin system covering catalog discovery, purchasing, and operational order management.",
    technologies: ["Next.js 16", "TypeScript", "Express", "PostgreSQL"],
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
    id: 3,
    title: "FrontForge",
    subtitle: "Frontend architecture decision engine",
    description:
      "A client-side planning tool that guides frontend architecture decisions, flags conflicting choices, previews design-system configuration, and exports a project blueprint.",
    technologies: ["Next.js 16", "TypeScript", "Zustand", "JSZip"],
    category: "Developer Tool",
    year: "2026",
    image: "/frontForge.png",
    color: "from-indigo-500 to-cyan-500",
    githubUrl: "https://github.com/mahdidelavarz/FrontForge",
    features: [
      "Guided architecture decision workflow",
      "Conflict detection & live design-system preview",
      "Generated project files and ZIP export",
    ],
  },
  {
    id: 4,
    title: "Portfolio Website",
    subtitle: "Engineering-focused personal portfolio",
    description:
      "A Next.js App Router portfolio with technical SEO, structured metadata, sitemap generation, and a responsive dark interface.",
    technologies: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS 4"],
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

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/40 hover:border-cyan-400/30 transition-colors duration-300">
      <div className="relative aspect-[16/9] bg-slate-900">
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover object-top"
        />
        <span className="absolute left-3 top-3 rounded-full bg-slate-950/80 px-3 py-1 text-xs font-medium text-slate-200">
          {project.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6 text-left">
        <h3 className="text-xl md:text-2xl font-bold text-white">
          {project.title}
        </h3>
        <p className="mt-1 text-sm font-medium text-cyan-400">
          {project.subtitle}
        </p>
        <p className="mt-3 text-sm md:text-base leading-relaxed text-slate-300">
          {project.description}
        </p>

        <ul className="mt-4 space-y-1.5 text-sm text-slate-300">
          {project.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-lg bg-slate-700/50 px-2.5 py-1 text-xs font-medium text-slate-300"
            >
              {technology}
            </span>
          ))}
        </div>

        <div className="mt-auto flex gap-3 pt-5">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:from-cyan-500 hover:to-blue-500"
            >
              Live demo <LucideExternalLink className="h-4 w-4" />
            </a>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-500 px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-slate-700/50 hover:text-white"
          >
            Source <LucideGithub className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <div className="relative py-20 md:py-28 bg-gradient-to-br from-blue-950 via-gray-950 to-blue-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Projects"
          title="Featured Projects"
          subtitle="Selected full-stack products and frontend engineering tools"
        />
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
