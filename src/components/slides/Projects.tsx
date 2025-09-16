import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import ThreeSlider from "../reactThree/ReactThreeSlider";
import { ScrollControls } from "@react-three/drei";
import ScrollHandler from "../reactThree/ScrollHandler";

interface ProjectsProps {
  scrollToSection?: (id: string) => void;
}

function Projects({ scrollToSection }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const sectionRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with real-time inventory, payment processing, and comprehensive admin dashboard for seamless online shopping experience.",
      technologies: [
        "React",
        "Next.js",
        "TypeScript",
        "Stripe",
        "Prisma",
        "PostgreSQL",
      ],
      category: "Full Stack",
      year: "2024",
      status: "Live",
      color: "from-cyan-400 to-blue-500",
      bgColor: "from-cyan-400/10 to-blue-500/10",
      glowColor: "cyan-400",
      complexity: 95,
      duration: "4 months",
      teamSize: "3 developers",
      highlights: [
        "Real-time inventory management",
        "Secure payment processing with Stripe",
        "Advanced admin dashboard",
        "Mobile-responsive design",
        "SEO optimized",
      ],
      metrics: {
        users: "10,000+",
        performance: "98% uptime",
        conversion: "15% increase",
        load: "< 2s load time",
      },
      challenges:
        "Implementing real-time inventory sync across multiple sales channels while maintaining data consistency and handling high traffic loads during peak sales periods.",
      solution:
        "Built a robust event-driven architecture using WebSocket connections and implemented Redis caching for real-time updates with PostgreSQL for data persistence.",
    },
    {
      id: 2,
      title: "3D Portfolio Website",
      description:
        "Interactive 3D portfolio featuring Three.js animations, particle systems, and immersive user experience with WebGL shaders and dynamic lighting effects.",
      technologies: [
        "React",
        "Three.js",
        "Framer Motion",
        "Tailwind",
        "WebGL",
        "GLSL",
      ],
      category: "3D Web",
      year: "2024",
      status: "In Progress",
      color: "from-purple-400 to-indigo-600",
      bgColor: "from-purple-400/10 to-indigo-600/10",
      glowColor: "purple-400",
      complexity: 90,
      duration: "3 months",
      teamSize: "Solo project",
      highlights: [
        "Custom WebGL shaders",
        "Physics-based animations",
        "Interactive 3D elements",
        "Optimized for mobile",
        "Dynamic lighting system",
      ],
      metrics: {
        users: "5,000+",
        performance: "60fps on mobile",
        engagement: "4.2 min avg session",
        load: "< 3s initial load",
      },
      challenges:
        "Optimizing 3D performance across devices while maintaining visual quality and ensuring smooth interactions on lower-end hardware.",
      solution:
        "Implemented LOD (Level of Detail) system, texture compression, and adaptive quality settings based on device capabilities.",
    },
    {
      id: 3,
      title: "Task Management Platform",
      description:
        "Collaborative task management solution with real-time updates, team collaboration features, advanced analytics, and intelligent project insights.",
      technologies: [
        "React",
        "Redux",
        "Socket.io",
        "Node.js",
        "MongoDB",
        "Chart.js",
      ],
      category: "Web App",
      year: "2023",
      status: "Live",
      color: "from-orange-400 to-red-500",
      bgColor: "from-orange-400/10 to-red-500/10",
      glowColor: "orange-400",
      complexity: 85,
      duration: "5 months",
      teamSize: "4 developers",
      highlights: [
        "Real-time collaboration",
        "Advanced analytics dashboard",
        "Team performance insights",
        "File sharing system",
        "Custom workflow automation",
      ],
      metrics: {
        users: "25,000+",
        teams: "500+ active teams",
        productivity: "30% improvement",
        retention: "85% monthly retention",
      },
      challenges:
        "Building scalable real-time collaboration features that work seamlessly across different time zones and team sizes.",
      solution:
        "Architected microservices with Socket.io clusters and implemented operational transform algorithms for conflict resolution.",
    },
    {
      id: 4,
      title: "AI Chat Interface",
      description:
        "Modern conversational AI interface with message streaming, context awareness, multi-language support, and intelligent conversation flow management.",
      technologies: [
        "React",
        "TypeScript",
        "WebSocket",
        "OpenAI API",
        "Redis",
        "Python",
      ],
      category: "AI/ML",
      year: "2024",
      status: "Live",
      color: "from-slate-400 to-gray-600",
      bgColor: "from-slate-400/10 to-gray-600/10",
      glowColor: "slate-400",
      complexity: 88,
      duration: "3 months",
      teamSize: "2 developers",
      highlights: [
        "Real-time message streaming",
        "Context-aware responses",
        "Multi-language support",
        "Voice-to-text integration",
        "Custom AI training pipeline",
      ],
      metrics: {
        messages: "1M+ processed",
        response: "< 1s avg response",
        accuracy: "94% user satisfaction",
        languages: "12 languages",
      },
      challenges:
        "Implementing efficient message streaming while maintaining conversation context and handling multiple concurrent users.",
      solution:
        "Built a scalable WebSocket architecture with Redis for session management and implemented streaming protocols for real-time AI responses.",
    },
    {
      id: 5,
      title: "Analytics Dashboard",
      description:
        "Real-time analytics platform with interactive data visualizations, custom reporting tools, and performance monitoring for business intelligence.",
      technologies: [
        "React",
        "D3.js",
        "WebSocket",
        "Chart.js",
        "Python",
        "FastAPI",
      ],
      category: "Data Viz",
      year: "2024",
      status: "Live",
      color: "from-cyan-400 to-teal-500",
      bgColor: "from-cyan-400/10 to-teal-500/10",
      glowColor: "cyan-400",
      complexity: 92,
      duration: "4 months",
      teamSize: "3 developers",
      highlights: [
        "Real-time data streaming",
        "Interactive visualizations",
        "Custom chart builder",
        "Export capabilities",
        "Alert system",
      ],
      metrics: {
        dataPoints: "10M+ daily",
        dashboards: "500+ active",
        queries: "< 200ms avg",
        uptime: "99.9% availability",
      },
      challenges:
        "Processing and visualizing large datasets in real-time while maintaining smooth user interactions and chart responsiveness.",
      solution:
        "Implemented data streaming with WebSockets, canvas-based rendering for performance, and smart data sampling algorithms.",
    },
    {
      id: 6,
      title: "Progressive Web App",
      description:
        "Cross-platform PWA with offline capabilities, push notifications, native-like experience, and seamless synchronization across devices.",
      technologies: [
        "React",
        "PWA",
        "Service Workers",
        "IndexedDB",
        "Push API",
        "Workbox",
      ],
      category: "Mobile",
      year: "2023",
      status: "Live",
      color: "from-purple-400 to-blue-600",
      bgColor: "from-purple-400/10 to-blue-600/10",
      glowColor: "purple-400",
      complexity: 87,
      duration: "3 months",
      teamSize: "2 developers",
      highlights: [
        "Offline-first architecture",
        "Push notifications",
        "Native app feel",
        "Background sync",
        "Install prompts",
      ],
      metrics: {
        installs: "15,000+ installs",
        offline: "90% offline usage",
        engagement: "60% daily return",
        performance: "Lighthouse 95+",
      },
      challenges:
        "Creating a seamless offline experience while ensuring data consistency when reconnecting to the network.",
      solution:
        "Implemented comprehensive service worker strategy with background sync and conflict resolution for offline-first functionality.",
    },
  ];

  const handleScrollProgress = (progress: number) => {
    setScrollProgress(progress);

    // Fixed calculation - prevents the "stuck on first slide" issue
    const projectIndex = Math.min(
      Math.floor(progress * projects.length),
      projects.length - 1
    );

    if (projectIndex !== selectedProject) {
      setSelectedProject(projectIndex);
    }
  };

  const currentProject = projects[selectedProject];

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen py-20 overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header Section */}
        <div className={`text-center mb-12 transition-all duration-1000`}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent"></div>
            <span className="text-orange-400 font-bold tracking-wider text-lg uppercase">
              Portfolio
            </span>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent"></div>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-slate-200 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Innovative solutions crafted with cutting-edge technologies and
            creative problem-solving
          </p>
        </div>

        {/* Main Layout - Centered 3D Slider with Side Panels */}
        <div className="relative">
          {/* Central 3D Slider */}
          <div
            className={`relative mx-auto max-w-4xl transition-all duration-1000 delay-200 `}
          >
            <div
              className={`relative h-[400px] lg:h-[500px] backdrop-blur-lg bg-slate-900/40 border border-slate-700/60 rounded-3xl overflow-hidden shadow-2xl shadow-${currentProject.glowColor}/20`}
            >
              <ThreeSlider
                onScrollProgress={handleScrollProgress}
                openModal={isModalOpen}
                setOpenModal={setIsModalOpen}
              />
             

              {/* Floating Controls */}
              <div className="absolute top-6 left-6 z-20">
                <div className="backdrop-blur-lg bg-slate-900/60 border border-slate-600/50 rounded-2xl px-4 py-3">
                  <div className="flex items-center gap-3 text-slate-300 text-sm font-medium">
                    <Icon
                      icon="mingcute:mouse-line"
                      width="18"
                      height="18"
                      className="text-orange-400"
                    />
                    <span>Scroll to explore</span>
                  </div>
                </div>
              </div>

              {/* Project Counter */}
              <div className="absolute top-6 right-6 z-20">
                <div className="backdrop-blur-lg bg-slate-900/60 border border-slate-600/50 rounded-2xl px-4 py-3">
                  <div className="text-slate-200 font-bold text-lg">
                    <span className={`text-${currentProject.glowColor}`}>
                      {selectedProject + 1}
                    </span>
                    <span className="text-slate-500 mx-2">/</span>
                    <span className="text-slate-400">{projects.length}</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="absolute bottom-4 left-6 right-6 z-20">
                <div className="backdrop-blur-lg bg-slate-900/20 border border-slate-600/50 rounded-2xl p-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-slate-300 font-semibold text-sm">
                      {currentProject.title}
                    </span>
                    <span className="text-slate-400 text-xs">
                      {currentProject.category}
                    </span>
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-2">
                    <div
                      className={`h-full bg-gradient-to-r ${currentProject.color} rounded-full transition-all duration-500 shadow-lg`}
                      style={{
                        width: `${
                          ((selectedProject + 1) / projects.length) * 100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Left Info Panel */}
          <div
            className={`absolute -left-45 top-1/2 -translate-y-1/2 w-80 transition-all duration-1000 delay-400 hidden xl:block`}
          >
            <div className="backdrop-blur-lg bg-slate-900/40 border border-slate-700/60 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Icon
                  icon="mingcute:information-line"
                  width="24"
                  height="24"
                  className={`text-${currentProject.glowColor}`}
                />
                Project Info
              </h3>

              {/* Project Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-600/30">
                  <div className="text-slate-400 text-xs mb-1">Complexity</div>
                  <div className="text-white font-bold text-lg">
                    {currentProject.complexity}%
                  </div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-600/30">
                  <div className="text-slate-400 text-xs mb-1">Duration</div>
                  <div className="text-white font-bold text-lg">
                    {currentProject.duration}
                  </div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-600/30">
                  <div className="text-slate-400 text-xs mb-1">Team</div>
                  <div className="text-white font-bold text-lg">
                    {currentProject.teamSize}
                  </div>
                </div>
                <div
                  className={`bg-gradient-to-r ${currentProject.bgColor} rounded-lg p-3 border border-slate-600/30`}
                >
                  <div className="text-slate-400 text-xs mb-1">Status</div>
                  <div className="text-white font-bold text-lg">
                    {currentProject.status}
                  </div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-slate-300 mb-3">
                  Key Metrics
                </h4>
                {Object.entries(currentProject.metrics)
                  .slice(0, 3)
                  .map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between items-center py-1"
                    >
                      <span className="text-slate-400 text-sm capitalize">
                        {key}
                      </span>
                      <span className="text-white font-medium text-sm">
                        {value}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Right Tech Panel */}
          <div
            className={`absolute -right-45 top-1/2 -translate-y-1/2 w-80 transition-all duration-1000 delay-600 hidden xl:block`}
          >
            <div className="backdrop-blur-lg bg-slate-900/40 border border-slate-700/60 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Icon
                  icon="mingcute:code-line"
                  width="24"
                  height="24"
                  className={`text-${currentProject.glowColor}`}
                />
                Tech Stack
              </h3>

              <div className="flex flex-wrap gap-2 mb-6">
                {currentProject.technologies.map((tech, index) => (
                  <span
                    key={tech}
                    className={`px-3 py-2 bg-slate-800/50 text-slate-300 text-sm rounded-lg border border-slate-600/50 hover:border-${currentProject.glowColor}/50 hover:shadow-sm transition-all duration-300`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Quick Navigation */}
              <div>
                <h4 className="text-sm font-semibold text-slate-300 mb-3">
                  Quick Navigation
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {projects.slice(0, 4).map((project, index) => (
                    <button
                      key={project.id}
                      className={`p-2 text-xs rounded-lg border transition-all duration-300 ${
                        selectedProject === index
                          ? `bg-gradient-to-r ${project.bgColor} border-slate-600/50 text-white`
                          : "bg-slate-800/30 border-slate-600/30 text-slate-400 hover:bg-slate-700/50 hover:text-white"
                      }`}
                      onClick={() => setSelectedProject(index)}
                    >
                      <div className="font-medium truncate">
                        {project.title}
                      </div>
                      <div className="text-xs opacity-75">{project.year}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Content Section */}
        <div className={`mt-16 transition-all duration-1000 delay-800`}>
          {/* Project Details Tabs */}
          <div className="max-w-6xl mx-auto">
            <div className="backdrop-blur-lg bg-slate-900/40 border border-slate-700/60 rounded-3xl p-8 shadow-2xl">
              {/* Tab Navigation */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {[
                  {
                    id: "overview",
                    icon: "mingcute:eye-line",
                    label: "Overview",
                  },
                  {
                    id: "highlights",
                    icon: "mingcute:star-line",
                    label: "Highlights",
                  },
                  {
                    id: "challenge",
                    icon: "mingcute:question-line",
                    label: "Challenge & Solution",
                  },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                      activeTab === tab.id
                        ? `bg-gradient-to-r ${currentProject.color} text-white shadow-lg`
                        : "bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50 border border-slate-600/30"
                    }`}
                  >
                    <Icon icon={tab.icon} width="18" height="18" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="min-h-[300px]">
                {activeTab === "overview" && (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4">
                        {currentProject.title}
                      </h3>
                      <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                        {currentProject.description}
                      </p>
                      <div className="flex gap-4">
                        <button
                          onClick={() => setIsModalOpen(true)}
                          className={`px-6 py-3 bg-gradient-to-r ${currentProject.color} rounded-xl font-semibold text-white hover:shadow-lg transition-all duration-300 flex items-center gap-2`}
                        >
                          <Icon
                            icon="mingcute:eye-line"
                            width="20"
                            height="20"
                          />
                          View Details
                        </button>
                        <button
                          onClick={() => scrollToSection?.("contactme")}
                          className="px-6 py-3 bg-transparent border-2 border-slate-600 rounded-xl font-semibold text-white hover:border-orange-400 hover:bg-orange-400/10 transition-all duration-300 flex items-center gap-2"
                        >
                          <Icon
                            icon="mingcute:message-3-line"
                            width="20"
                            height="20"
                          />
                          Discuss
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(currentProject.metrics).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="bg-slate-800/30 rounded-lg p-4 border border-slate-600/30"
                          >
                            <div className="text-slate-400 text-sm capitalize mb-1">
                              {key.replace(/([A-Z])/g, " $1")}
                            </div>
                            <div className="text-white font-bold text-lg">
                              {value}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {activeTab === "highlights" && (
                  <div className="grid md:grid-cols-2 gap-6">
                    {currentProject.highlights.map((highlight, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 bg-slate-800/30 rounded-lg border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300"
                      >
                        <div
                          className={`w-3 h-3 bg-gradient-to-r ${currentProject.color} rounded-full mt-1.5 flex-shrink-0 shadow-lg`}
                        />
                        <span className="text-slate-300 leading-relaxed">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "challenge" && (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-orange-400/10 rounded-lg p-6 border border-orange-400/20">
                      <h4 className="text-xl font-bold text-orange-400 mb-4 flex items-center gap-2">
                        <Icon
                          icon="mingcute:question-line"
                          width="24"
                          height="24"
                        />
                        The Challenge
                      </h4>
                      <p className="text-slate-300 leading-relaxed">
                        {currentProject.challenges}
                      </p>
                    </div>
                    <div className="bg-cyan-400/10 rounded-lg p-6 border border-cyan-400/20">
                      <h4 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                        <Icon
                          icon="mingcute:lightbulb-line"
                          width="24"
                          height="24"
                        />
                        The Solution
                      </h4>
                      <p className="text-slate-300 leading-relaxed">
                        {currentProject.solution}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/90 backdrop-blur-xl"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative max-w-5xl w-full max-h-[90vh] overflow-auto backdrop-blur-lg bg-slate-900/40 border border-slate-700/60 rounded-3xl shadow-2xl">
            <div className="p-8">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2
                    className={`text-4xl font-bold mb-3 bg-gradient-to-r ${currentProject.color} bg-clip-text text-transparent`}
                  >
                    {currentProject.title}
                  </h2>
                  <p className="text-slate-300 text-lg leading-relaxed max-w-3xl">
                    {currentProject.description}
                  </p>
                </div>
                <button
                  className="w-12 h-12 rounded-full bg-slate-800/50 border border-slate-600/50 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all duration-300"
                  onClick={() => setIsModalOpen(false)}
                >
                  <Icon icon="mingcute:close-line" width="24" height="24" />
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h4 className="text-2xl font-semibold text-white mb-6">
                    Key Features
                  </h4>
                  <div className="grid gap-4">
                    {currentProject.highlights.map((highlight, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-lg border border-slate-600/30"
                      >
                        <div
                          className={`w-2 h-2 bg-gradient-to-r ${currentProject.color} rounded-full flex-shrink-0`}
                        />
                        <span className="text-slate-300">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-2xl font-semibold text-white mb-6">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-2 bg-slate-800/50 text-slate-300 text-sm rounded-lg border border-slate-600/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8">
                    <h5 className="text-lg font-semibold text-white mb-4">
                      Project Metrics
                    </h5>
                    <div className="space-y-3">
                      {Object.entries(currentProject.metrics).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="flex justify-between items-center p-3 bg-slate-800/30 rounded-lg"
                          >
                            <span className="text-slate-400 capitalize">
                              {key.replace(/([A-Z])/g, " $1")}
                            </span>
                            <span className="text-white font-semibold">
                              {value}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Projects;
