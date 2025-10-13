"use client";
import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";

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
      description: "A comprehensive full-stack e-commerce solution featuring real-time inventory management, AI-powered recommendations, and seamless payment processing. Built with performance and scalability in mind.",
      technologies: ["React", "Next.js", "TypeScript", "Stripe", "PostgreSQL"],
      category: "Full Stack",
      year: "2024",
      metrics: {
        users: { value: "10K+", label: "Active Users", icon: "lucide:users" },
        performance: { value: "98%", label: "Performance Score", icon: "lucide:trending-up" },
        conversion: { value: "+15%", label: "Conversion Rate", icon: "lucide:arrow-right" },
      },
      image: "/img1_.jpg",
      color: "from-blue-600 to-indigo-600",
      features: ["Real-time inventory", "AI recommendations", "Mobile-first design", "Analytics dashboard"]
    },
    {
      id: 2,
      title: "3D Portfolio Website",
      subtitle: "Immersive Digital Experience",
      description: "An innovative portfolio featuring cutting-edge Three.js animations and WebGL shaders. Creates an unforgettable user experience with smooth 60fps performance.",
      technologies: ["React", "Three.js", "WebGL", "GLSL"],
      category: "3D Web",
      year: "2024",
      metrics: {
        users: { value: "5K+", label: "Monthly Visitors", icon: "lucide:users" },
        performance: { value: "60fps", label: "Frame Rate", icon: "lucide:play" },
        engagement: { value: "4.2min", label: "Avg. Session", icon: "lucide:clock" },
      },
      image: "/img2_.jpg",
      color: "from-purple-600 to-pink-600",
      features: ["WebGL shaders", "3D interactions", "Particle effects", "Responsive design"]
    },
    {
      id: 3,
      title: "Task Management Platform",
      subtitle: "Team Collaboration Redefined",
      description: "A powerful collaborative platform with real-time updates, advanced team analytics, and intuitive project tracking. Trusted by hundreds of teams worldwide.",
      technologies: ["React", "Socket.io", "Node.js", "MongoDB"],
      category: "Web App",
      year: "2023",
      metrics: {
        users: { value: "25K+", label: "Active Users", icon: "lucide:users" },
        teams: { value: "500+", label: "Teams", icon: "lucide:users" },
        retention: { value: "85%", label: "Retention Rate", icon: "lucide:trending-up" },
      },
      image: "/img3_.jpg",
      color: "from-green-600 to-teal-600",
      features: ["Real-time sync", "Team analytics", "Kanban boards", "Time tracking"]
    },
    {
      id: 4,
      title: "AI Chat Interface",
      subtitle: "Next-Level Conversational AI",
      description: "A sophisticated AI chat interface with advanced message streaming, context awareness, and support for multiple languages. Handles millions of conversations with ease.",
      technologies: ["React", "TypeScript", "OpenAI API", "WebSocket"],
      category: "AI/ML",
      year: "2024",
      metrics: {
        messages: { value: "1M+", label: "Messages", icon: "lucide:play" },
        response: { value: "<1s", label: "Response Time", icon: "lucide:clock" },
        accuracy: { value: "94%", label: "Accuracy", icon: "lucide:trending-up" },
      },
      image: "/img4_.jpg",
      color: "from-orange-600 to-red-600",
      features: ["Stream responses", "Multi-language", "Context memory", "Voice input"]
    },
    {
      id: 5,
      title: "Analytics Dashboard",
      subtitle: "Data Visualization Excellence",
      description: "A comprehensive real-time analytics platform with stunning interactive visualizations. Processes millions of data points with sub-second response times.",
      technologies: ["React", "D3.js", "Chart.js", "FastAPI"],
      category: "Data Viz",
      year: "2024",
      metrics: {
        dataPoints: { value: "10M+", label: "Data Points", icon: "lucide:trending-up" },
        dashboards: { value: "500+", label: "Dashboards", icon: "lucide:play" },
        uptime: { value: "99.9%", label: "Uptime", icon: "lucide:clock" },
      },
      image: "/img5_.jpg",
      color: "from-cyan-600 to-blue-600",
      features: ["Real-time updates", "Custom widgets", "Export reports", "API integration"]
    },
    {
      id: 6,
      title: "Progressive Web App",
      subtitle: "Cross-Platform Excellence",
      description: "A cutting-edge PWA with offline capabilities, push notifications, and native-like performance. Delivers seamless experience across all devices.",
      technologies: ["React", "PWA", "Service Workers", "IndexedDB"],
      category: "Mobile",
      year: "2023",
      metrics: {
        installs: { value: "15K+", label: "Installs", icon: "lucide:users" },
        offline: { value: "90%", label: "Offline Ready", icon: "lucide:play" },
        engagement: { value: "60%", label: "Engagement", icon: "lucide:trending-up" },
      },
      image: "/img6_.jpg",
      color: "from-indigo-600 to-purple-600",
      features: ["Offline mode", "Push notifications", "App shortcuts", "Background sync"]
    },
  ];

  const currentProject = projects[selectedProject];

  const handlePrevious = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setSelectedProject((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const handleNext = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setSelectedProject((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
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
    <div className="relative min-h-screen py-12 sm:py-20 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
            Featured Projects
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Crafting digital experiences that make a difference
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Panel - Slider */}
          <div className="order-2 lg:order-1">
            <div
              ref={sliderRef}
              className="relative bg-white dark:bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700/50"
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
                    isTransitioning ? "scale-110 opacity-0" : "scale-100 opacity-100"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <div className={`transition-all duration-500 ${isTransitioning ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"}`}>
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-sm font-medium rounded-full mb-3">
                      {currentProject.category}
                    </span>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                      {currentProject.title}
                    </h3>
                    <p className="text-white/90 text-lg">
                      {currentProject.subtitle}
                    </p>
                  </div>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={handlePrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all duration-200 group"
                  aria-label="Previous project"
                >
                  <Icon icon="lucide:chevron-left" className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all duration-200 group"
                  aria-label="Next project"
                >
                  <Icon icon="lucide:chevron-right" className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              {/* Slider Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedProject(index)}
                    className={`h-1 rounded-full transition-all duration-300 ${
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
                      : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-80 transition-opacity duration-300`} />
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
          <div className="order-1 lg:order-2">
            <div className={`transition-all duration-500 ${isTransitioning ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"}`}>
              {/* Project Info Card */}
              <div className="bg-white dark:bg-slate-800/50 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-700/50">
                {/* Year Badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    {currentProject.year} • Project #{selectedProject + 1} of {projects.length}
                  </span>
                </div>

                {/* Description */}
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8 text-lg">
                  {currentProject.description}
                </p>

                {/* Key Features */}
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4 uppercase tracking-wider">
                    Key Features
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {currentProject.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${currentProject.color}`} />
                        <span className="text-sm text-slate-600 dark:text-slate-400">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4 uppercase tracking-wider">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-xl hover:shadow-md transition-shadow duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4 uppercase tracking-wider">
                    Impact Metrics
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(currentProject.metrics).map(([key, metric]) => (
                      <div key={key} className="bg-slate-50 dark:bg-slate-700/30 rounded-xl p-4 text-center hover:shadow-md transition-all duration-200 group">
                        <Icon icon={metric.icon} className={`w-5 h-5 mx-auto mb-2 text-slate-400 group-hover:text-blue-500 transition-colors`} />
                        <div className={`text-xl font-bold bg-gradient-to-br ${currentProject.color} bg-clip-text text-transparent`}>
                          {metric.value}
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <button
                    className={`flex-1 px-6 py-3 bg-gradient-to-r ${currentProject.color} text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 group`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      View Live
                      <Icon icon="lucide:external-link" className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </button>
                  <button
                    className="flex-1 px-6 py-3 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 group"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Source Code
                      <Icon icon="lucide:github" className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    </span>
                  </button>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="mt-6 text-center">
                <button
                  onClick={() => scrollToSection?.("contactme")}
                  className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  <span>Interested in working together?</span>
                  <Icon icon="lucide:arrow-right" className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;