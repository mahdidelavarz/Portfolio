"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  LucideChevronLeft,
  LucideChevronRight,
  LucideExternalLink,
  LucideGithub,
} from "@/icons/icons";

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
    image: "/neovault.png",
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
    image: "/nazishop.png",
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
    image: "/portfolio.png",
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

function Projects() {
  const [selectedProject, setSelectedProject] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  const currentProject = projects[selectedProject];

  const selectProject = (index: number) => {
    if (index === selectedProject || isTransitioning) return;
    setIsTransitioning(true);
    setSelectedProject(index);
    setTimeout(() => setIsTransitioning(false), 450);
  };

  const handlePrevious = () =>
    selectProject(selectedProject === 0 ? projects.length - 1 : selectedProject - 1);

  const handleNext = () =>
    selectProject(selectedProject === projects.length - 1 ? 0 : selectedProject + 1);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") handlePrevious();
      if (event.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-950 via-gray-950 to-blue-950 py-12 sm:py-20">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 inline-flex items-center gap-3 rounded-full px-4 py-2">
          <div className="h-[1.5px] w-18 animate-pulse bg-gradient-to-l from-transparent via-cyan-500 to-transparent" />
          <span className="text-sm font-medium uppercase tracking-wider text-cyan-500">projects</span>
          <div className="h-[1.5px] w-18 animate-pulse bg-gradient-to-l from-transparent via-cyan-500 to-transparent" />
        </div>

        <h2 className="mb-4 text-4xl font-bold sm:text-5xl lg:text-6xl">
          <span className="bg-gradient-to-r from-white via-sky-500 to-white bg-clip-text text-transparent">
            Featured Projects
          </span>
        </h2>
        <p className="mx-auto max-w-3xl px-4 text-base text-slate-500 md:text-lg">
          Selected full-stack products and frontend engineering tools
        </p>

        <div className="mt-20 grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <div
              ref={sliderRef}
              className="relative overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-800/50 shadow-2xl"
              onTouchStart={(event) => {
                touchStartX.current = event.touches[0].clientX;
              }}
              onTouchEnd={(event) => {
                const distance = touchStartX.current - event.changedTouches[0].clientX;
                if (Math.abs(distance) > 50) {
                  if (distance > 0) {
                    handleNext();
                  } else {
                    handlePrevious();
                  }
                }
              }}
            >
              <div className="relative h-[300px] overflow-hidden sm:h-[400px] lg:h-[450px]">
                <div className={`absolute inset-0 bg-gradient-to-br ${currentProject.color} opacity-90`} />
                <Image
                  src={currentProject.image}
                  alt={currentProject.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className={`object-cover transition-all duration-700 ${
                    isTransitioning ? "scale-110 opacity-0" : "scale-100 opacity-100"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
                  <span className="mb-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-md sm:text-sm">
                    {currentProject.category}
                  </span>
                  <h3 className="mb-2 text-2xl font-bold text-white lg:text-3xl">{currentProject.title}</h3>
                  <p className="text-sm text-white/90 sm:text-base lg:text-lg">{currentProject.subtitle}</p>
                </div>

                <button
                  onClick={handlePrevious}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-md transition hover:bg-white/20"
                  aria-label="Previous project"
                >
                  <LucideChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-md transition hover:bg-white/20"
                  aria-label="Next project"
                >
                  <LucideChevronRight className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="mt-6 hidden grid-cols-4 gap-3 lg:grid">
              {projects.map((project, index) => (
                <button
                  key={project.id}
                  onClick={() => selectProject(index)}
                  className={`relative h-16 overflow-hidden rounded-xl border-2 transition ${
                    selectedProject === index
                      ? "scale-105 border-blue-500 shadow-lg shadow-blue-500/20"
                      : "border-slate-700 hover:border-slate-500"
                  }`}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="12vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <p className="absolute inset-x-0 bottom-0 truncate p-2 text-[10px] font-medium text-white">
                    {project.title}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div
            className={`transition-all duration-500 ${
              isTransitioning ? "translate-x-4 opacity-0" : "translate-x-0 opacity-100"
            }`}
          >
            <div className="flex min-h-[520px] flex-col rounded-3xl border border-slate-700/50 bg-slate-800/50 p-5 shadow-xl backdrop-blur-xl sm:p-8">
              <span className="mb-6 text-sm font-medium text-slate-500">
                {currentProject.year} • Project #{selectedProject + 1} of {projects.length}
              </span>

              <p className="mb-8 text-sm leading-relaxed text-slate-300 sm:text-base lg:text-lg">
                {currentProject.description}
              </p>

              <section className="mb-8">
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-300">Key Features</h4>
                <div className="grid grid-cols-2 gap-3">
                  {currentProject.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <div className={`h-2 w-2 shrink-0 rounded-full bg-gradient-to-br ${currentProject.color}`} />
                      <span className="text-xs text-slate-500 sm:text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mb-8">
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-300">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {currentProject.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-xl bg-slate-700/50 px-3 py-1.5 text-xs font-medium text-slate-300 sm:text-sm"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </section>

              <div className="mt-auto flex flex-col gap-3 pt-2 sm:flex-row">
                {currentProject.liveUrl && (
                  <a
                    href={currentProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 rounded-xl bg-gradient-to-r ${currentProject.color} px-6 py-3 text-center font-semibold text-white transition hover:shadow-lg`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      View Live <LucideExternalLink className="h-4 w-4" />
                    </span>
                  </a>
                )}
                <a
                  href={currentProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-xl border-2 border-slate-500 px-6 py-3 text-center font-semibold text-slate-300 transition hover:bg-slate-700/50"
                >
                  <span className="flex items-center justify-center gap-2">
                    Source Code <LucideGithub className="h-4 w-4" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
