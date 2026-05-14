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

interface ProjectsProps {
  scrollToSection?: (id: string) => void;
}

function Projects({ scrollToSection }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      subtitle: "Next-Gen Shopping Experience",
      description:
        "A comprehensive full-stack e-commerce solution featuring real-time inventory management, AI-powered recommendations, and seamless payment processing. Built with performance and scalability in mind.",
      technologies: ["React", "Next.js", "TypeScript", "Stripe", "PostgreSQL"],
      category: "Full Stack",
      year: "2024",
      metrics: {
        users: { value: "10K+", label: "Active Users", icon: LucideUsers },
        performance: {
          value: "98%",
          label: "Performance Score",
          icon: LucideTrendingUp,
        },
        conversion: {
          value: "+15%",
          label: "Conversion Rate",
          icon: LucideArrowRight,
        },
      },
      image: "/img1_.jpg",
      color: "from-blue-500 to-indigo-500",
      features: [
        "Real-time inventory",
        "AI recommendations",
        "Mobile-first design",
        "Analytics dashboard",
      ],
    },
    {
      id: 2,
      title: "3D Portfolio Website",
      subtitle: "Immersive Digital Experience",
      description:
        "An innovative portfolio featuring cutting-edge Three.js animations and WebGL shaders. Creates an unforgettable user experience with smooth 60fps performance.",
      technologies: ["React", "Three.js", "WebGL", "GLSL"],
      category: "3D Web",
      year: "2024",
      metrics: {
        users: {
          value: "5K+",
          label: "Monthly Visitors",
          icon: LucideUsers,
        },
        performance: {
          value: "60fps",
          label: "Frame Rate",
          icon: LucideUsers,
        },
        engagement: {
          value: "4.2min",
          label: "Avg. Session",
          icon: LucideClock,
        },
      },
      image: "/img2_.jpg",
      color: "from-purple-500 to-pink-500",
      features: [
        "WebGL shaders",
        "3D interactions",
        "Particle effects",
        "Responsive design",
      ],
    },
    {
      id: 3,
      title: "Task Management Platform",
      subtitle: "Team Collaboration Redefined",
      description:
        "A powerful collaborative platform with real-time updates, advanced team analytics, and intuitive project tracking. Trusted by hundreds of teams worldwide.",
      technologies: ["React", "Socket.io", "Node.js", "MongoDB"],
      category: "Web App",
      year: "2023",
      metrics: {
        users: { value: "25K+", label: "Active Users", icon: LucideUsers },
        teams: { value: "500+", label: "Teams", icon: LucideUsers },
        retention: {
          value: "85%",
          label: "Retention Rate",
          icon: LucideTrendingUp,
        },
      },
      image: "/img3_.jpg",
      color: "from-green-500 to-teal-500",
      features: [
        "Real-time sync",
        "Team analytics",
        "Kanban boards",
        "Time tracking",
      ],
    },
    {
      id: 4,
      title: "AI Chat Interface",
      subtitle: "Next-Level Conversational AI",
      description:
        "A sophisticated AI chat interface with advanced message streaming, context awareness, and support for multiple languages. Handles millions of conversations with ease.",
      technologies: ["React", "TypeScript", "OpenAI API", "WebSocket"],
      category: "AI/ML",
      year: "2024",
      metrics: {
        messages: { value: "1M+", label: "Messages", icon: LuciedPlay },
        response: {
          value: "<1s",
          label: "Response Time",
          icon: LucideClock,
        },
        accuracy: {
          value: "94%",
          label: "Accuracy",
          icon: LucideTrendingUp,
        },
      },
      image: "/img4_.jpg",
      color: "from-orange-500 to-red-500",
      features: [
        "Stream responses",
        "Multi-language",
        "Context memory",
        "Voice input",
      ],
    },
    {
      id: 5,
      title: "Analytics Dashboard",
      subtitle: "Data Visualization Excellence",
      description:
        "A comprehensive real-time analytics platform with stunning interactive visualizations. Processes millions of data points with sub-second response times.",
      technologies: ["React", "D3.js", "Chart.js", "FastAPI"],
      category: "Data Viz",
      year: "2024",
      metrics: {
        dataPoints: {
          value: "10M+",
          label: "Data Points",
          icon: LucideTrendingUp,
        },
        dashboards: { value: "500+", label: "Dashboards", icon: LuciedPlay },
        uptime: { value: "99.9%", label: "Uptime", icon: LucideClock },
      },
      image: "/img5_.jpg",
      color: "from-cyan-500 to-blue-500",
      features: [
        "Real-time updates",
        "Custom widgets",
        "Export reports",
        "API integration",
      ],
    },
    {
      id: 6,
      title: "Progressive Web App",
      subtitle: "Cross-Platform Excellence",
      description:
        "A cutting-edge PWA with offline capabilities, push notifications, and native-like performance. Delivers seamless experience across all devices.",
      technologies: ["React", "PWA", "Service Workers", "IndexedDB"],
      category: "Mobile",
      year: "2023",
      metrics: {
        installs: { value: "15K+", label: "Installs", icon: LucideUsers },
        offline: { value: "90%", label: "Offline Ready", icon: LuciedPlay },
        engagement: {
          value: "60%",
          label: "Engagement",
          icon: LucideTrendingUp,
        },
      },
      image: "/img6_.jpg",
      color: "from-indigo-500 to-purple-500",
      features: [
        "Offline mode",
        "Push notifications",
        "App shortcuts",
        "Background sync",
      ],
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
                  <button
                    className={`flex-1 px-4 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r ${currentProject.color} text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 group text-sm sm:text-base`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      View Live
                      <LucideExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </button>
                  <button className="flex-1 px-4 py-2.5 sm:px-6 sm:py-3 border-2 border-slate-500 text-slate-300 font-semibold rounded-xl hover:bg-slate-700/50 transition-all duration-200 group text-sm sm:text-base">
                    <span className="flex items-center justify-center gap-2">
                      Source Code
                      <LucideGithub className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:rotate-12 transition-transform" />
                    </span>
                  </button>
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
