
// import React, { useState } from "react";
// import ThreeSlider from "../reactThree/ReactThreeSlider";

// type ProjectsProps = {
//   activeSlide: number;
//   onThreeSliderProgress?: (progress: number, isActive: boolean) => void;
// };

// const Projects: React.FC<ProjectsProps> = ({
//   activeSlide,
//   onThreeSliderProgress,
// }) => {
//   const [scrollProgress, setScrollProgress] = useState(0);
//   const isActive = activeSlide === 3;
//   const [openModal, setOpenModal] = useState(false);

//   const handleScrollProgress = (progress: number) => {
//     setScrollProgress(progress);
//     if (onThreeSliderProgress) {
//       onThreeSliderProgress(progress, isActive);
//     }
//   };

//   return (
//     <section
//       className="w-full h-screen snap-start flex items-center justify-center relative bg-black/20"
//       style={{ pointerEvents: "auto" }}
//     >
//       {activeSlide && (
//         <ThreeSlider
//           onScrollProgress={handleScrollProgress}
//           openModal={openModal}
//           setOpenModal={setOpenModal}
//         />
//       )}
//       <div
//         className={`w-full h-full absolute top-0 flex justify-center items-center ${
//           openModal ? "flex" : "hidden"
//         }`}
//       >
//         <div className="w-1/2 h-1/2 border rounded-xl">
//           <button
//             className="px-8 py-2 m-4 bg-blue-500 rounded-xl text-white"
//             onClick={() => setOpenModal(false)}
//           >
//             close
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Projects;
// !_______________________________________________________________________________________________________________________________________________________option two
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

const Projects = ({ activeSlide, onThreeSliderProgress }) => {
  const [selectedProject, setSelectedProject] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'carousel', '3d'
  const containerRef = useRef(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard",
      technologies: ["React", "Next.js", "TypeScript", "Stripe", "Prisma"],
      image: "🛒",
      status: "Live",
      category: "Full Stack",
      year: "2024",
      color: "#3b82f6",
      gradient: "from-blue-600 via-blue-500 to-cyan-400",
      complexity: 95,
      features: ["Real-time inventory", "Payment processing", "Admin dashboard", "Mobile responsive"]
    },
    {
      id: 2,
      title: "3D Portfolio Website",
      description: "Interactive 3D portfolio with Three.js animations, particle systems, and immersive user experience",
      technologies: ["React", "Three.js", "Framer Motion", "Tailwind"],
      image: "🌌",
      status: "In Progress",
      category: "3D Web",
      year: "2024",
      color: "#8b5cf6",
      gradient: "from-purple-600 via-violet-500 to-indigo-400",
      complexity: 90,
      features: ["3D animations", "Particle effects", "Interactive elements", "WebGL shaders"]
    },
    {
      id: 3,
      title: "Task Management App",
      description: "Collaborative task management with real-time updates, team collaboration, and advanced analytics",
      technologies: ["React", "Redux", "Socket.io", "Node.js"],
      image: "📋",
      status: "Live",
      category: "Web App",
      year: "2023",
      color: "#10b981",
      gradient: "from-emerald-600 via-green-500 to-teal-400",
      complexity: 85,
      features: ["Real-time collaboration", "Advanced analytics", "Team management", "File sharing"]
    },
    {
      id: 4,
      title: "AI Chat Interface",
      description: "Modern chat interface with AI integration, message streaming, and intelligent conversation flow",
      technologies: ["React", "TypeScript", "WebSocket", "AI API"],
      image: "🤖",
      status: "Live",
      category: "AI/ML",
      year: "2024",
      color: "#f59e0b",
      gradient: "from-amber-600 via-yellow-500 to-orange-400",
      complexity: 88,
      features: ["Message streaming", "AI integration", "Context awareness", "Multi-language"]
    },
    {
      id: 5,
      title: "Real-time Dashboard",
      description: "Analytics dashboard with live data visualization, interactive charts, and performance monitoring",
      technologies: ["React", "D3.js", "WebSocket", "Chart.js"],
      image: "📊",
      status: "Live",
      category: "Data Viz",
      year: "2024",
      color: "#ef4444",
      gradient: "from-red-600 via-rose-500 to-pink-400",
      complexity: 92,
      features: ["Live data feeds", "Interactive charts", "Performance metrics", "Custom visualizations"]
    },
    {
      id: 6,
      title: "Mobile PWA",
      description: "Progressive web app with offline capabilities, push notifications, and native-like experience",
      technologies: ["React", "PWA", "Service Workers", "IndexedDB"],
      image: "📱",
      status: "Live",
      category: "Mobile",
      year: "2023",
      color: "#ec4899",
      gradient: "from-pink-600 via-rose-500 to-fuchsia-400",
      complexity: 87,
      features: ["Offline support", "Push notifications", "App-like experience", "Background sync"]
    }
  ];

  const isActive = activeSlide === 3;

  useEffect(() => {
    if (isActive && !isModalOpen) {
      const interval = setInterval(() => {
        setSelectedProject((prev) => (prev + 1) % projects.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isActive, isModalOpen, projects.length]);

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      mouseX.set(x);
      mouseY.set(y);
    }
  };

  const currentProject = projects[selectedProject];

  return (
    <section
      ref={containerRef}
      className="w-full h-screen snap-start flex items-center justify-center relative overflow-hidden backdrop-blur-2xl"
      onMouseMove={handleMouseMove}
      style={{ pointerEvents: "auto" }}
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at center, ${currentProject.color}08 0%, transparent 70%)`
          }}
          animate={{
            background: `radial-gradient(circle at center, ${currentProject.color}08 0%, transparent 70%)`
          }}
          transition={{ duration: 1 }}
        />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px h-full bg-white"
              style={{ left: `${i * 5}%` }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scaleY: [1, 1.2, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 max-w-7xl mx-auto px-8 relative z-10">
        
        {/* Project Showcase */}
        <motion.div
          className="relative"
          style={{
            rotateX: viewMode === '3d' ? rotateX : 0,
            rotateY: viewMode === '3d' ? rotateY : 0,
            transformStyle: "preserve-3d"
          }}
        >
          {/* Main Project Display */}
          <div className="relative w-80 lg:w-96 h-80 lg:h-96">
            {/* Project Cards Stack */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedProject}
                className="absolute inset-0 rounded-3xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                {/* Project Card */}
                <motion.div
                  className={`w-full h-full bg-gradient-to-br ${currentProject.gradient} p-8 relative overflow-hidden cursor-pointer group`}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setIsModalOpen(true)}
                  style={{
                    boxShadow: `0 25px 50px ${currentProject.color}20, 0 0 100px ${currentProject.color}10`
                  }}
                >
                  {/* Animated Background Pattern */}
                  <motion.div
                    className="absolute inset-0 opacity-20"
                    style={{
                      background: `repeating-linear-gradient(
                        45deg,
                        transparent,
                        transparent 10px,
                        ${currentProject.color}20 10px,
                        ${currentProject.color}20 20px
                      )`
                    }}
                    animate={{ x: [0, 40, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />

                  {/* Project Icon */}
                  <motion.div
                    className="text-6xl lg:text-8xl mb-4 filter drop-shadow-lg"
                    animate={{
                      rotateY: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {currentProject.image}
                  </motion.div>

                  {/* Project Info */}
                  <div className="relative z-10 text-white">
                    <motion.h3
                      className="text-2xl lg:text-3xl font-bold mb-2 drop-shadow-lg"
                      layoutId={`title-${currentProject.id}`}
                    >
                      {currentProject.title}
                    </motion.h3>
                    
                    <motion.p
                      className="text-sm lg:text-base opacity-90 mb-4 leading-relaxed"
                      layoutId={`description-${currentProject.id}`}
                    >
                      {currentProject.description}
                    </motion.p>

                    {/* Status & Category */}
                    <div className="flex gap-2 mb-4">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                        {currentProject.status}
                      </span>
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                        {currentProject.category}
                      </span>
                    </div>

                    {/* Complexity Meter */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-medium">Complexity</span>
                        <span className="text-xs font-bold">{currentProject.complexity}%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-1.5 overflow-hidden">
                        <motion.div
                          className="h-full bg-white rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${currentProject.complexity}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1">
                      {currentProject.technologies.slice(0, 3).map((tech, index) => (
                        <motion.span
                          key={tech}
                          className="px-2 py-1 bg-black/30 backdrop-blur-sm rounded-lg text-xs font-medium"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                      {currentProject.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-black/30 backdrop-blur-sm rounded-lg text-xs font-medium">
                          +{currentProject.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <motion.div
                      className="text-center"
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="text-4xl mb-2">👁️</div>
                      <span className="text-white font-semibold">View Details</span>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Project Navigation Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {projects.map((_, index) => (
              <motion.button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  selectedProject === index ? 'scale-125' : 'scale-100'
                }`}
                style={{
                  backgroundColor: selectedProject === index ? projects[index].color : 'rgba(255,255,255,0.3)'
                }}
                onClick={() => setSelectedProject(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Project Details Panel */}
        <div className="flex flex-col gap-6 max-w-md">
          {/* Header */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent">
              Projects
            </h1>
            <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mb-6" />
          </motion.div>

          {/* View Mode Switcher */}
          <div className="flex gap-2 p-1 bg-black/40 backdrop-blur-md rounded-xl border border-white/20">
            {[
              { mode: 'grid', icon: '▦', label: 'Grid' },
              { mode: 'carousel', icon: '→', label: 'Flow' },
              { mode: '3d', icon: '◆', label: '3D' }
            ].map(({ mode, icon, label }) => (
              <motion.button
                key={mode}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  viewMode === mode
                    ? 'bg-white/20 text-white shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => setViewMode(mode)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="mr-2">{icon}</span>
                {label}
              </motion.button>
            ))}
          </div>

          {/* Project Stats */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedProject}
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="text-xs text-white/60 mb-1">Status</div>
                <div 
                  className="text-sm font-bold"
                  style={{ color: currentProject.color }}
                >
                  {currentProject.status}
                </div>
              </div>
              <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="text-xs text-white/60 mb-1">Year</div>
                <div className="text-sm font-bold text-white">{currentProject.year}</div>
              </div>
              <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="text-xs text-white/60 mb-1">Category</div>
                <div className="text-sm font-bold text-white">{currentProject.category}</div>
              </div>
              <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="text-xs text-white/60 mb-1">Complexity</div>
                <div className="text-sm font-bold text-white">{currentProject.complexity}%</div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Technologies Used */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-sm font-semibold text-white/80">Technologies Used</h4>
            <div className="flex flex-wrap gap-2">
              {currentProject.technologies.map((tech, index) => (
                <motion.span
                  key={tech}
                  className="px-3 py-1.5 bg-black/50 backdrop-blur-md border border-white/20 rounded-lg text-xs font-medium text-white/90"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, borderColor: `${currentProject.color}40` }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Quick Navigation */}
          <div className="grid grid-cols-3 gap-2">
            {projects.slice(0, 6).map((project, index) => (
              <motion.button
                key={project.id}
                className={`relative h-16 rounded-xl border overflow-hidden group ${
                  selectedProject === index 
                    ? 'border-white/40 bg-white/10' 
                    : 'border-white/20 bg-black/40 hover:bg-white/5'
                }`}
                onClick={() => setSelectedProject(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}20, transparent)`
                  }}
                  animate={{
                    opacity: selectedProject === index ? 0.6 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />
                <div className="relative z-10 flex flex-col items-center justify-center h-full">
                  <span className="text-lg mb-1">{project.image}</span>
                  <span className="text-xs font-medium text-white/80 truncate px-2">
                    {project.title.split(' ')[0]}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            {/* Modal Content */}
            <motion.div
              className="relative max-w-4xl w-full max-h-[90vh] overflow-auto rounded-3xl border border-white/20"
              style={{
                background: `linear-gradient(135deg, ${currentProject.color}10, rgba(0,0,0,0.8))`
              }}
              initial={{ scale: 0.5, opacity: 0, rotateX: -15 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotateX: 15 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 lg:p-12">
                {/* Modal Header */}
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className={`text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r ${currentProject.gradient} bg-clip-text text-transparent`}>
                      {currentProject.title}
                    </h2>
                    <p className="text-white/80 text-lg">
                      {currentProject.description}
                    </p>
                  </div>
                  <motion.button
                    className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                    onClick={() => setIsModalOpen(false)}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    ✕
                  </motion.button>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-4">Key Features</h4>
                    <div className="space-y-2">
                      {currentProject.features.map((feature, index) => (
                        <motion.div
                          key={feature}
                          className="flex items-center gap-3 text-white/90"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div 
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: currentProject.color }}
                          />
                          <span className="text-sm">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-4">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {currentProject.technologies.map((tech, index) => (
                        <motion.span
                          key={tech}
                          className="px-3 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-sm font-medium text-white"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ 
                            scale: 1.05,
                            borderColor: `${currentProject.color}60`
                          }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <motion.button
                    className="flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${currentProject.color}, ${currentProject.color}CC)`,
                      boxShadow: `0 10px 30px ${currentProject.color}30`
                    }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Live Demo
                  </motion.button>
                  <motion.button
                    className="flex-1 py-3 px-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl font-semibold text-white hover:bg-white/20 transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Source Code
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Code Snippets Floating */}
        {['{ }', '< />', '[ ]', '( )', '→', '∞'].map((symbol, i) => (
          <motion.div
            key={symbol}
            className="absolute text-white/10 font-mono text-2xl"
            style={{
              left: `${15 + i * 12}%`,
              top: `${10 + (i % 2) * 70}%`
            }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, -5, 0],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8
            }}
          >
            {symbol}
          </motion.div>
        ))}

        {/* Pulsing Energy Rings */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`ring-${i}`}
            className="absolute rounded-full border border-white/5"
            style={{
              width: `${300 + i * 200}px`,
              height: `${300 + i * 200}px`,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 4 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5
            }}
          />
        ))}
      </div>

      {/* Interactive Hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-black/60 backdrop-blur-md rounded-full border border-white/20 text-sm text-white/80"
        animate={{
          y: [0, -5, 0],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <span className="mr-2">🖱️</span>
        Click cards to explore • Auto-cycling every 4s
      </motion.div>
    </section>
  );
};

export default Projects;