"use client";
import { useState, useRef, useEffect } from "react";
import {
  LucideArrowRight,
  LucideChevronLeft,
  LucideChevronRight,
  LucideClock,
  LucideExternalLink,
  LucideGithub,
  LucideTrendingUp,
  LucideUsers,
  LuciedPlay,
} from "@/icons/icons";

function Projects() {
  const [selectedProject, setSelectedProject] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const projects = [
    {
      id: 1,
      title: "Nazi Shop",
      subtitle: "Full-Stack E-Commerce Platform",
      description:
        "A production-ready e-commerce monorepo with a Next.js storefront and an Express + TypeORM backend. Includes product variants, cart, wishlist, reviews, coupons, OTP authentication, and a full admin panel for managing products, orders, and inventory - fully containerized with Docker.",
      technologies: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Express.js",
        "TypeORM",
        "PostgreSQL",
        "Docker",
      ],
      category: "Full Stack E-Commerce",
      year: "2025-2026",
      metrics: {
        entities: { value: "30+", label: "DB Entities", icon: LucideTrendingUp },
        auth: { value: "OTP", label: "Secure Auth", icon: LucideUsers },
        deploy: { value: "Docker", label: "Containerized", icon: LuciedPlay },
      },
      image: "/imge1_.jpg",
      color: "from-blue-500 to-indigo-500",
      features: [
        "Product variants & cart",
        "Wishlist, reviews & coupons",
        "Admin panel for orders & inventory",
        "RTL/Persian + dark mode",
      ],
      liveUrl: "http://nazishop.ir",
      githubUrl: "https://github.com/mahdidelavarz/Ex_ecommerce",
    },
    {
      id: 2,
      title: "ChatVault",
      subtitle: "Real-Time Messaging App",
      description:
        "A full-stack chat application with instant messaging powered by Socket.io, a Next.js frontend, and an Express + TypeORM backend. Fully Dockerized with PostgreSQL persistence and production-ready security configuration.",
      technologies: [
        "Next.js",
        "React 19",
        "TypeScript",
        "Socket.io",
        "Express.js",
        "PostgreSQL",
        "Docker",
      ],
      category: "Real-Time Chat",
      year: "2025-2026",
      metrics: {
        realtime: {
          value: "Realtime",
          label: "Socket.io Messaging",
          icon: LuciedPlay,
        },
        auth: { value: "JWT", label: "Auth & Security", icon: LucideUsers },
        deploy: {
          value: "Docker",
          label: "Multi-Container Setup",
          icon: LucideClock,
        },
      },
      image: "/imge2_.jpg",
      color: "from-cyan-500 to-blue-500",
      features: [
        "Instant messaging via WebSockets",
        "JWT auth with bcrypt",
        "Docker Compose dev & prod setups",
        "TypeScript across the stack",
      ],
      liveUrl: undefined,
      githubUrl: "https://github.com/mahdidelavarz/chat-app",
    },
    {
      id: 3,
      title: "ERP Core",
      subtitle: "Modular ERP with Clean Architecture",
      description:
        "An enterprise resource planning backend built with .NET and Clean Architecture (Domain, Infrastructure, and UI layers), paired with a React + Vite frontend. Designed for managing business operations with strong separation of concerns and built-in reporting.",
      technologies: [
        "C# / .NET",
        "ASP.NET Core",
        "Entity Framework Core",
        "React",
        "Vite",
        "TypeScript",
      ],
      category: "Enterprise ERP",
      year: "2025-2026",
      metrics: {
        arch: { value: "Clean Arch", label: "DDD Layers", icon: LucideTrendingUp },
        data: { value: "EF Core", label: "Data Access", icon: LucideClock },
        frontend: {
          value: "React+Vite",
          label: "Frontend SPA",
          icon: LucideUsers,
        },
      },
      image: "/erp.png",
      color: "from-green-500 to-teal-500",
      features: [
        "Core / Infrastructure / UI layers",
        "React + Vite SPA frontend",
        "Built-in reporting (Stimulsoft)",
        "Modular, multi-domain structure",
      ],
      liveUrl: undefined,
      githubUrl: "https://github.com/mahdidelavarz/erp-core",
    },
    {
      id: 4,
      title: "NaziShop",
      subtitle: "Persian E-Commerce for Beauty & Cosmetics",
      description:
        "A production-ready Persian/RTL e-commerce platform for beauty and cosmetics, built with Next.js 16 and Supabase. Features a full storefront with cart, wishlist and checkout, OTP + Google authentication, and an admin dashboard with payment integration ready via Zibal.",
      technologies: [
        "Next.js",
        "React 19",
        "TypeScript",
        "Tailwind CSS",
        "Supabase",
        "Zustand",
        "TanStack Query",
      ],
      category: "E-Commerce",
      year: "2025-2026",
      metrics: {
        live: { value: "Live", label: "Deployed on Vercel", icon: LucideArrowRight },
        auth: { value: "OTP+OAuth", label: "Auth Options", icon: LucideUsers },
        ui: { value: "RTL", label: "Persian-First UI", icon: LuciedPlay },
      },
      image: "/imge3_.jpg",
      color: "from-purple-500 to-pink-500",
      features: [
        "Storefront, cart, wishlist & checkout",
        "OTP SMS + Google OAuth login",
        "Admin dashboard with order management",
        "Zibal payment integration ready",
      ],
      liveUrl: "https://nazishop.vercel.app",
      githubUrl: "https://github.com/mahdidelavarz/nazishop",
    },
  ];

  const currentProject = projects[selectedProject];

  const handlePrevious = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setSelectedProject((prev) =>
        prev === 0 ? projects.length - 1 : prev - 1,
      );
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const handleNext = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setSelectedProject((prev) =>
        prev === projects.length - 1 ? 0 : prev + 1,
      );
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrevious();
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen py-12 sm:py-20 overflow-hidden bg-gradient-to-br from-blue-950 via-gray-950 to-blue-950">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-6">
          <div className="h-[1.5px] w-18 bg-gradient-to-l from-transparent via-cyan-500 to-transparent animate-pulse" />
          <span className="text-cyan-500 font-medium tracking-wider text-sm uppercase">
            projects
          </span>
          <div className="h-[1.5px] w-18 bg-gradient-to-l from-transparent via-cyan-500 to-transparent animate-pulse" />
        </div>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
          <span className="bg-gradient-to-r from-white via-sky-500 to-white bg-clip-text text-transparent">
            Featured Projects
          </span>
        </h2>

        <p className="text-base md:text-lg text-slate-500 max-w-3xl mx-auto px-4">
          Crafting digital experiences that make a difference
        </p>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mt-20">
          {/* Left Panel - Slider */}
          <div className="order-1 lg:order-1 ">
            <div
              ref={sliderRef}
              className="relative bg-white dark:bg-slate-800/50 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700/50"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Project Image Slider */}
              <div className="relative h-[300px] sm:h-[400px] lg:h-[450px] overflow-hidden">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${currentProject.color} opacity-90`}
                />
                <img
                  src={currentProject.image}
                  alt={currentProject.title}
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    isTransitioning
                      ? "scale-110 opacity-0"
                      : "scale-100 opacity-100"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
                  <div
                    className={`transition-all duration-500 ${
                      isTransitioning
                        ? "translate-y-4 opacity-0"
                        : "translate-y-0 opacity-100"
                    }`}
                  >
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-medium rounded-full mb-2 sm:mb-3">
                      {currentProject.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">
                      {currentProject.title}
                    </h3>
                    <p className="text-white/90 text-sm sm:text-base lg:text-lg">
                      {currentProject.subtitle}
                    </p>
                  </div>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={handlePrevious}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all duration-200 group"
                  aria-label="Previous project"
                >
                  <LucideChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-0.5 transition-transform" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all duration-200 group"
                  aria-label="Next project"
                >
                  <LucideChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              {/* Slider Indicators */}
              <div className="absolute bottom-1 lg:bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedProject(index)}
                    className={`h-1 rounded-full transition-all duration-300  ${
                      index === selectedProject
                        ? "w-8 bg-white"
                        : "w-1 bg-white/40 hover:bg-white/60"
                    }`}
                    aria-label={`Go to project ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Grid - Desktop Only */}
            <div className="hidden lg:grid grid-cols-6 gap-3 mt-6">
              {projects.map((project, index) => (
                <button
                  key={project.id}
                  onClick={() => setSelectedProject(index)}
                  className={`relative overflow-hidden rounded-xl border-2 transition-all duration-300 group ${
                    selectedProject === index
                      ? "border-blue-500 shadow-lg shadow-blue-500/20 scale-105"
                      : "border-slate-700 hover:border-slate-500"
                  }`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-80 transition-opacity duration-300`}
                  />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-16 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-2">
                    <p className="text-[10px] text-white font-medium truncate">
                      {project.title}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Panel - Project Details */}
          <div className="order-2 lg:order-2">
            <div
              className={`transition-all duration-500 ${
                isTransitioning
                  ? "opacity-0 translate-x-4"
                  : "opacity-100 translate-x-0"
              }`}
            >
              {/* Project Info Card - Fixed height on desktop */}
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-slate-700/50 lg:h-[750px] flex flex-col">
                {/* Year Badge */}
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <span className="text-xs sm:text-sm font-medium text-slate-500">
                    {currentProject.year} • Project #{selectedProject + 1} of{" "}
                    {projects.length}
                  </span>
                </div>

                {/* Description */}
                <p className="text-slate-300 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg">
                  {currentProject.description}
                </p>

                {/* Key Features */}
                <div className="mb-6 sm:mb-8">
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-300 mb-3 sm:mb-4 uppercase tracking-wider">
                    Key Features
                  </h4>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    {currentProject.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 justify-center"
                      >
                        <div
                          className={`w-2 h-2 rounded-full bg-gradient-to-br ${currentProject.color}`}
                        />
                        <span className="text-xs sm:text-sm text-slate-500">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className="mb-6 sm:mb-8">
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-300 mb-3 sm:mb-4 uppercase tracking-wider">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {currentProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 sm:px-4 sm:py-2 bg-slate-100 dark:bg-slate-700/50 text-slate-300 text-xs sm:text-sm font-medium rounded-xl hover:shadow-md transition-shadow duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div className="mb-6 sm:mb-8 flex-grow">
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-300 mb-3 sm:mb-4 uppercase tracking-wider">
                    Impact Metrics
                  </h4>
                  <div className="grid grid-cols-3 gap-2 sm:gap-4">
                    {Object.entries(currentProject.metrics).map(
                      ([key, metric]) => (
                        <div
                          key={key}
                          className="bg-slate-700/30 rounded-xl p-2 sm:p-4 text-center hover:shadow-md transition-all duration-200 group"
                        >
                          <metric.icon
                            className={`w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 sm:mb-2 text-slate-500 group-hover:text-blue-500 transition-colors`}
                          />
                          <div
                            className={`text-base sm:text-xl font-bold bg-gradient-to-br ${currentProject.color} bg-clip-text text-transparent`}
                          >
                            {metric.value}
                          </div>
                          <div className="text-[10px] sm:text-xs text-slate-500 mt-1">
                            {metric.label}
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-auto">
                  {currentProject.liveUrl && (
                    <a
                      href={currentProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 px-4 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r ${currentProject.color} text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 group text-sm sm:text-base text-center`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        View Live
                        <LucideExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    </a>
                  )}
                  <a
                    href={currentProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2.5 sm:px-6 sm:py-3 border-2 border-slate-500 text-slate-300 font-semibold rounded-xl hover:bg-slate-700/50 transition-all duration-200 group text-sm sm:text-base text-center"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Source Code
                      <LucideGithub className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:rotate-12 transition-transform" />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
