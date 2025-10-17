"use client";
import { useState, useEffect, useRef, useCallback, memo } from "react";
import { Icon } from "@iconify/react";

interface ProjectsProps {
  scrollToSection?: (id: string) => void;
}

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  category: string;
  year: string;
  metrics: {
    [key: string]: {
      value: string;
      label: string;
      icon: string;
    };
  };
  image: string;
  color: string;
  borderColor: string;
  shadowColor: string;
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const PROJECTS: Project[] = [
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
      users: {
        value: "10K+",
        label: "Active Users",
        icon: "mingcute:user-line",
      },
      performance: {
        value: "98%",
        label: "Performance",
        icon: "mingcute:speed-line",
      },
      conversion: {
        value: "+15%",
        label: "Conversion",
        icon: "mingcute:trending-up-line",
      },
    },
    image: "/img1_.jpg",
    color: "from-cyan-500 to-blue-600",
    borderColor: "border-cyan-400/50",
    shadowColor: "shadow-cyan-500/20",
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
    technologies: ["React", "Three.js", "WebGL", "GLSL", "Framer Motion"],
    category: "3D Web",
    year: "2024",
    metrics: {
      visitors: {
        value: "5K+",
        label: "Monthly Visitors",
        icon: "mingcute:eye-line",
      },
      fps: {
        value: "60fps",
        label: "Frame Rate",
        icon: "mingcute:play-circle-line",
      },
      engagement: {
        value: "4.2min",
        label: "Avg. Session",
        icon: "mingcute:time-line",
      },
    },
    image: "/img2_.jpg",
    color: "from-purple-500 to-pink-600",
    borderColor: "border-purple-400/50",
    shadowColor: "shadow-purple-500/20",
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
    technologies: ["React", "Socket.io", "Node.js", "MongoDB", "Redis"],
    category: "Web App",
    year: "2023",
    metrics: {
      users: {
        value: "25K+",
        label: "Active Users",
        icon: "mingcute:group-line",
      },
      teams: { value: "500+", label: "Teams", icon: "mingcute:building-line" },
      retention: {
        value: "85%",
        label: "Retention",
        icon: "mingcute:chart-line",
      },
    },
    image: "/img3_.jpg",
    color: "from-emerald-500 to-teal-600",
    borderColor: "border-emerald-400/50",
    shadowColor: "shadow-emerald-500/20",
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
    technologies: [
      "React",
      "TypeScript",
      "OpenAI API",
      "WebSocket",
      "Vercel AI",
    ],
    category: "AI/ML",
    year: "2024",
    metrics: {
      messages: {
        value: "1M+",
        label: "Messages",
        icon: "mingcute:message-3-line",
      },
      response: {
        value: "<1s",
        label: "Response",
        icon: "mingcute:lightning-line",
      },
      accuracy: {
        value: "94%",
        label: "Accuracy",
        icon: "mingcute:target-line",
      },
    },
    image: "/img4_.jpg",
    color: "from-orange-500 to-red-600",
    borderColor: "border-orange-400/50",
    shadowColor: "shadow-orange-500/20",
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
    technologies: ["React", "D3.js", "Chart.js", "FastAPI", "ClickHouse"],
    category: "Data Viz",
    year: "2024",
    metrics: {
      dataPoints: {
        value: "10M+",
        label: "Data Points",
        icon: "mingcute:database-line",
      },
      dashboards: {
        value: "500+",
        label: "Dashboards",
        icon: "mingcute:dashboard-line",
      },
      uptime: { value: "99.9%", label: "Uptime", icon: "mingcute:wifi-line" },
    },
    image: "/img5_.jpg",
    color: "from-indigo-500 to-blue-600",
    borderColor: "border-indigo-400/50",
    shadowColor: "shadow-indigo-500/20",
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
    technologies: ["React", "PWA", "Service Workers", "IndexedDB", "Web Push"],
    category: "Mobile",
    year: "2023",
    metrics: {
      installs: {
        value: "15K+",
        label: "Installs",
        icon: "mingcute:download-line",
      },
      offline: {
        value: "100%",
        label: "Offline",
        icon: "mingcute:wifi-off-line",
      },
      engagement: {
        value: "60%",
        label: "Engagement",
        icon: "mingcute:heart-line",
      },
    },
    image: "/img6_.jpg",
    color: "from-rose-500 to-purple-600",
    borderColor: "border-rose-400/50",
    shadowColor: "shadow-rose-500/20",
    features: [
      "Offline mode",
      "Push notifications",
      "App shortcuts",
      "Background sync",
    ],
  },
];

// Mobile project slider component
const MobileProjectSlider = memo(
  ({
    projects,
    selectedIndex,
    onSelect,
  }: {
    projects: Project[];
    selectedIndex: number;
    onSelect: (index: number) => void;
  }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (scrollRef.current) {
        const selectedElement = scrollRef.current.children[
          selectedIndex
        ] as HTMLElement;
        if (selectedElement) {
          selectedElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
          });
        }
      }
    }, [selectedIndex]);

    return (
      <div className="relative mb-6">
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto pb-4 px-4 -mx-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {projects.map((project, index) => (
            <button
              key={project.id}
              onClick={() => onSelect(index)}
              className={`relative flex-shrink-0 snap-center transition-all duration-300 ${
                selectedIndex === index ? "scale-105" : "scale-95 opacity-70"
              }`}
              aria-label={`View ${project.title}`}
            >
              <div
                className={`relative w-24 h-24 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                  selectedIndex === index
                    ? `${project.borderColor} ${project.shadowColor} shadow-lg`
                    : "border-slate-700/50"
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-80`}
                />
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-1 left-1 right-1">
                  <p className="text-[10px] text-white font-semibold truncate">
                    {project.title}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  },
);

MobileProjectSlider.displayName = "MobileProjectSlider";

// Project card component
const ProjectCard = memo(
  ({ project, isVisible }: { project: Project; isVisible: boolean }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        className={`relative transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden hover:border-cyan-400/30 transition-all duration-500 group">
          {/* Gradient overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
          />

          <div className="grid md:grid-cols-2 gap-6 p-6 sm:p-8">
            {/* Project Image */}
            <div className="relative h-64 sm:h-72 md:h-[450px] lg:h-[500px]">
              <div className="relative h-full rounded-xl overflow-hidden group">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-70 group-hover:opacity-80 transition-opacity duration-300`}
                />
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 bg-white/20 backdrop-blur-md text-white text-xs font-semibold rounded-full">
                    {project.category}
                  </span>
                </div>

                {/* Year Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1.5 bg-black/40 backdrop-blur-md text-white text-xs font-semibold rounded-full">
                    {project.year}
                  </span>
                </div>

                {/* View Project Overlay */}
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="flex gap-3">
                    <button className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all duration-300 hover:scale-110">
                      <Icon icon="mingcute:eye-line" className="w-5 h-5" />
                    </button>
                    <button className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all duration-300 hover:scale-110">
                      <Icon icon="mingcute:github-line" className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="flex flex-col justify-between">
              <div className="flex-1">
                {/* Title & Subtitle */}
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p
                  className={`text-lg font-medium bg-gradient-to-r ${project.color} bg-clip-text text-transparent mb-4`}
                >
                  {project.subtitle}
                </p>

                {/* Description */}
                <p className="text-slate-300 leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Key Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Key Features
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {project.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Icon
                          icon="mingcute:check-circle-fill"
                          className={`w-4 h-4 bg-gradient-to-r ${project.color} bg-clip-text text-transparent`}
                        />
                        <span className="text-sm text-slate-400">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {Object.entries(project.metrics).map(([key, metric]) => (
                    <div
                      key={key}
                      className="bg-slate-700/30 backdrop-blur-sm rounded-lg p-3 text-center hover:bg-slate-700/50 transition-all duration-300 group/metric"
                    >
                      <Icon
                        icon={metric.icon}
                        className="w-5 h-5 mx-auto mb-1 text-slate-500 group-hover/metric:text-cyan-400 transition-colors"
                      />
                      <div
                        className={`text-lg font-bold bg-gradient-to-r ${project.color} bg-clip-text text-transparent`}
                      >
                        {metric.value}
                      </div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-slate-700/30 backdrop-blur-sm border border-slate-600/50 text-xs font-medium text-slate-300 rounded-lg hover:border-cyan-400/50 transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  className={`flex-1 px-4 py-2.5 bg-gradient-to-r ${project.color} text-white text-sm font-semibold rounded-xl hover:shadow-lg ${project.shadowColor} transition-all duration-300 hover:-translate-y-0.5 group`}
                >
                  <span className="flex items-center justify-center gap-2">
                    Live Demo
                    <Icon
                      icon="mingcute:external-link-line"
                      className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </span>
                </button>
                <button className="flex-1 px-4 py-2.5 bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 text-slate-300 text-sm font-semibold rounded-xl hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-0.5 group">
                  <span className="flex items-center justify-center gap-2">
                    Source Code
                    <Icon
                      icon="mingcute:github-line"
                      className="w-4 h-4 group-hover:rotate-12 transition-transform"
                    />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

ProjectCard.displayName = "ProjectCard";

// Main Projects component
const Projects = memo<ProjectsProps>(({ scrollToSection }) => {
  const [selectedProject, setSelectedProject] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      },
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const handleContactClick = useCallback(() => {
    scrollToSection?.("contactme");
  }, [scrollToSection]);

  const handlePrevious = useCallback(() => {
    setSelectedProject((prev) => (prev === 0 ? PROJECTS.length - 1 : prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setSelectedProject((prev) => (prev === PROJECTS.length - 1 ? 0 : prev + 1));
  }, []);

  // Touch handling for mobile swipe
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX.current - touchEndX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          handleNext();
        } else {
          handlePrevious();
        }
      }
    },
    [handleNext, handlePrevious],
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrevious, handleNext]);

  // Auto-rotate projects
  useEffect(() => {
    if (!isMobile) {
      const interval = setInterval(() => {
        handleNext();
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [isMobile, handleNext]);

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen py-12 md:py-20 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 -right-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-slate-800/50 backdrop-blur-sm rounded-full border border-cyan-400/30 mb-6">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-cyan-400 font-medium tracking-wider text-sm uppercase">
              Portfolio
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>

          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Crafting exceptional digital experiences with modern technologies
            and innovative solutions.
          </p>
        </div>

        {/* Mobile View with Top Slider */}
        {isMobile ? (
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Mobile Slider at Top */}
            <MobileProjectSlider
              projects={PROJECTS}
              selectedIndex={selectedProject}
              onSelect={setSelectedProject}
            />

            {/* Mobile Project Card */}
            <ProjectCard
              project={PROJECTS[selectedProject]}
              isVisible={isVisible}
            />

            {/* Mobile Navigation */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={handlePrevious}
                className="p-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl hover:border-cyan-400/50 transition-all duration-300"
                aria-label="Previous project"
              >
                <Icon
                  icon="mingcute:arrow-left-line"
                  className="w-5 h-5 text-slate-400"
                />
              </button>

              <div className="flex gap-2">
                {PROJECTS.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedProject(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === selectedProject
                        ? `w-8 bg-gradient-to-r ${PROJECTS[selectedProject].color}`
                        : "w-2 bg-slate-600"
                    }`}
                    aria-label={`Go to project ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="p-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl hover:border-cyan-400/50 transition-all duration-300"
                aria-label="Next project"
              >
                <Icon
                  icon="mingcute:arrow-right-line"
                  className="w-5 h-5 text-slate-400"
                />
              </button>
            </div>
          </div>
        ) : (
          /* Desktop View - Grid Layout */
          <div className="space-y-8">
            {PROJECTS.map((project, index) => (
              <div
                key={project.id}
                className={`transition-all duration-1000 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <ProjectCard project={project} isVisible={isVisible} />
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA Section */}
        <div
          className={`mt-16 transition-all duration-1000 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="relative overflow-hidden bg-gradient-to-br from-slate-800/60 to-slate-700/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 md:p-12 text-center hover:border-cyan-400/50 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 opacity-0 hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Let's Create Something Amazing
              </h3>
              <p className="text-slate-400 text-base md:text-lg mb-8 max-w-2xl mx-auto">
                Have a project in mind? I'd love to help bring your vision to
                life with modern technologies and creative solutions.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleContactClick}
                  className="group relative px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-1"
                  aria-label="Start a project"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <div className="relative flex items-center justify-center gap-2 md:gap-3">
                    <Icon icon="mingcute:rocket-line" width={20} height={20} />
                    <span>Start a Project</span>
                  </div>
                </button>

                <button className="group relative px-6 md:px-8 py-3 md:py-4 bg-slate-800/50 backdrop-blur-sm border-2 border-slate-600 rounded-xl font-semibold text-white hover:border-cyan-400 transition-all duration-300 hover:-translate-y-1">
                  <div className="relative flex items-center justify-center gap-2 md:gap-3">
                    <Icon icon="mingcute:github-line" width={20} height={20} />
                    <span>View GitHub</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

Projects.displayName = "Projects";

export default Projects;
