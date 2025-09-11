
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
// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

// const Projects = ({ activeSlide, onThreeSliderProgress }) => {
//   const [selectedProject, setSelectedProject] = useState(0);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [hoveredCard, setHoveredCard] = useState(null);
//   const [viewMode, setViewMode] = useState('grid'); // 'grid', 'carousel', '3d'
//   const containerRef = useRef(null);
  
//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);
//   const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
//   const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

//   const projects = [
//     {
//       id: 1,
//       title: "E-Commerce Platform",
//       description: "Full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard",
//       technologies: ["React", "Next.js", "TypeScript", "Stripe", "Prisma"],
//       image: "🛒",
//       status: "Live",
//       category: "Full Stack",
//       year: "2024",
//       color: "#3b82f6",
//       gradient: "from-blue-600 via-blue-500 to-cyan-400",
//       complexity: 95,
//       features: ["Real-time inventory", "Payment processing", "Admin dashboard", "Mobile responsive"]
//     },
//     {
//       id: 2,
//       title: "3D Portfolio Website",
//       description: "Interactive 3D portfolio with Three.js animations, particle systems, and immersive user experience",
//       technologies: ["React", "Three.js", "Framer Motion", "Tailwind"],
//       image: "🌌",
//       status: "In Progress",
//       category: "3D Web",
//       year: "2024",
//       color: "#8b5cf6",
//       gradient: "from-purple-600 via-violet-500 to-indigo-400",
//       complexity: 90,
//       features: ["3D animations", "Particle effects", "Interactive elements", "WebGL shaders"]
//     },
//     {
//       id: 3,
//       title: "Task Management App",
//       description: "Collaborative task management with real-time updates, team collaboration, and advanced analytics",
//       technologies: ["React", "Redux", "Socket.io", "Node.js"],
//       image: "📋",
//       status: "Live",
//       category: "Web App",
//       year: "2023",
//       color: "#10b981",
//       gradient: "from-emerald-600 via-green-500 to-teal-400",
//       complexity: 85,
//       features: ["Real-time collaboration", "Advanced analytics", "Team management", "File sharing"]
//     },
//     {
//       id: 4,
//       title: "AI Chat Interface",
//       description: "Modern chat interface with AI integration, message streaming, and intelligent conversation flow",
//       technologies: ["React", "TypeScript", "WebSocket", "AI API"],
//       image: "🤖",
//       status: "Live",
//       category: "AI/ML",
//       year: "2024",
//       color: "#f59e0b",
//       gradient: "from-amber-600 via-yellow-500 to-orange-400",
//       complexity: 88,
//       features: ["Message streaming", "AI integration", "Context awareness", "Multi-language"]
//     },
//     {
//       id: 5,
//       title: "Real-time Dashboard",
//       description: "Analytics dashboard with live data visualization, interactive charts, and performance monitoring",
//       technologies: ["React", "D3.js", "WebSocket", "Chart.js"],
//       image: "📊",
//       status: "Live",
//       category: "Data Viz",
//       year: "2024",
//       color: "#ef4444",
//       gradient: "from-red-600 via-rose-500 to-pink-400",
//       complexity: 92,
//       features: ["Live data feeds", "Interactive charts", "Performance metrics", "Custom visualizations"]
//     },
//     {
//       id: 6,
//       title: "Mobile PWA",
//       description: "Progressive web app with offline capabilities, push notifications, and native-like experience",
//       technologies: ["React", "PWA", "Service Workers", "IndexedDB"],
//       image: "📱",
//       status: "Live",
//       category: "Mobile",
//       year: "2023",
//       color: "#ec4899",
//       gradient: "from-pink-600 via-rose-500 to-fuchsia-400",
//       complexity: 87,
//       features: ["Offline support", "Push notifications", "App-like experience", "Background sync"]
//     }
//   ];

//   const isActive = activeSlide === 3;

//   useEffect(() => {
//     if (isActive && !isModalOpen) {
//       const interval = setInterval(() => {
//         setSelectedProject((prev) => (prev + 1) % projects.length);
//       }, 4000);
//       return () => clearInterval(interval);
//     }
//   }, [isActive, isModalOpen, projects.length]);

//   const handleMouseMove = (e) => {
//     if (containerRef.current) {
//       const rect = containerRef.current.getBoundingClientRect();
//       const x = e.clientX - rect.left - rect.width / 2;
//       const y = e.clientY - rect.top - rect.height / 2;
//       mouseX.set(x);
//       mouseY.set(y);
//     }
//   };

//   const currentProject = projects[selectedProject];

//   return (
//     <section
//       ref={containerRef}
//       className="w-full h-screen snap-start flex items-center justify-center relative overflow-hidden backdrop-blur-2xl"
//       onMouseMove={handleMouseMove}
//       style={{ pointerEvents: "auto" }}
//     >
//       {/* Dynamic Background */}
//       <div className="absolute inset-0">
//         <motion.div
//           className="absolute inset-0"
//           style={{
//             background: `radial-gradient(circle at center, ${currentProject.color}08 0%, transparent 70%)`
//           }}
//           animate={{
//             background: `radial-gradient(circle at center, ${currentProject.color}08 0%, transparent 70%)`
//           }}
//           transition={{ duration: 1 }}
//         />
        
//         {/* Animated Grid */}
//         <div className="absolute inset-0 opacity-5">
//           {[...Array(20)].map((_, i) => (
//             <motion.div
//               key={i}
//               className="absolute w-px h-full bg-white"
//               style={{ left: `${i * 5}%` }}
//               animate={{
//                 opacity: [0.1, 0.3, 0.1],
//                 scaleY: [1, 1.2, 1]
//               }}
//               transition={{
//                 duration: 3,
//                 repeat: Infinity,
//                 delay: i * 0.1,
//                 ease: "easeInOut"
//               }}
//             />
//           ))}
//         </div>
//       </div>

//       <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 max-w-7xl mx-auto px-8 relative z-10">
        
//         {/* Project Showcase */}
//         <motion.div
//           className="relative"
//           style={{
//             rotateX: viewMode === '3d' ? rotateX : 0,
//             rotateY: viewMode === '3d' ? rotateY : 0,
//             transformStyle: "preserve-3d"
//           }}
//         >
//           {/* Main Project Display */}
//           <div className="relative w-80 lg:w-96 h-80 lg:h-96">
//             {/* Project Cards Stack */}
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={selectedProject}
//                 className="absolute inset-0 rounded-3xl overflow-hidden"
//                 initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
//                 animate={{ opacity: 1, scale: 1, rotateY: 0 }}
//                 exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
//                 transition={{ duration: 0.6, ease: "easeInOut" }}
//               >
//                 {/* Project Card */}
//                 <motion.div
//                   className={`w-full h-full bg-gradient-to-br ${currentProject.gradient} p-8 relative overflow-hidden cursor-pointer group`}
//                   whileHover={{ scale: 1.02 }}
//                   onClick={() => setIsModalOpen(true)}
//                   style={{
//                     boxShadow: `0 25px 50px ${currentProject.color}20, 0 0 100px ${currentProject.color}10`
//                   }}
//                 >
//                   {/* Animated Background Pattern */}
//                   <motion.div
//                     className="absolute inset-0 opacity-20"
//                     style={{
//                       background: `repeating-linear-gradient(
//                         45deg,
//                         transparent,
//                         transparent 10px,
//                         ${currentProject.color}20 10px,
//                         ${currentProject.color}20 20px
//                       )`
//                     }}
//                     animate={{ x: [0, 40, 0] }}
//                     transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
//                   />

//                   {/* Project Icon */}
//                   <motion.div
//                     className="text-6xl lg:text-8xl mb-4 filter drop-shadow-lg"
//                     animate={{
//                       rotateY: [0, 10, -10, 0],
//                       scale: [1, 1.1, 1]
//                     }}
//                     transition={{
//                       duration: 4,
//                       repeat: Infinity,
//                       ease: "easeInOut"
//                     }}
//                   >
//                     {currentProject.image}
//                   </motion.div>

//                   {/* Project Info */}
//                   <div className="relative z-10 text-white">
//                     <motion.h3
//                       className="text-2xl lg:text-3xl font-bold mb-2 drop-shadow-lg"
//                       layoutId={`title-${currentProject.id}`}
//                     >
//                       {currentProject.title}
//                     </motion.h3>
                    
//                     <motion.p
//                       className="text-sm lg:text-base opacity-90 mb-4 leading-relaxed"
//                       layoutId={`description-${currentProject.id}`}
//                     >
//                       {currentProject.description}
//                     </motion.p>

//                     {/* Status & Category */}
//                     <div className="flex gap-2 mb-4">
//                       <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
//                         {currentProject.status}
//                       </span>
//                       <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
//                         {currentProject.category}
//                       </span>
//                     </div>

//                     {/* Complexity Meter */}
//                     <div className="mb-4">
//                       <div className="flex justify-between items-center mb-2">
//                         <span className="text-xs font-medium">Complexity</span>
//                         <span className="text-xs font-bold">{currentProject.complexity}%</span>
//                       </div>
//                       <div className="w-full bg-white/20 rounded-full h-1.5 overflow-hidden">
//                         <motion.div
//                           className="h-full bg-white rounded-full"
//                           initial={{ width: 0 }}
//                           animate={{ width: `${currentProject.complexity}%` }}
//                           transition={{ duration: 1, ease: "easeOut" }}
//                         />
//                       </div>
//                     </div>

//                     {/* Tech Stack */}
//                     <div className="flex flex-wrap gap-1">
//                       {currentProject.technologies.slice(0, 3).map((tech, index) => (
//                         <motion.span
//                           key={tech}
//                           className="px-2 py-1 bg-black/30 backdrop-blur-sm rounded-lg text-xs font-medium"
//                           initial={{ opacity: 0, scale: 0 }}
//                           animate={{ opacity: 1, scale: 1 }}
//                           transition={{ delay: index * 0.1 }}
//                         >
//                           {tech}
//                         </motion.span>
//                       ))}
//                       {currentProject.technologies.length > 3 && (
//                         <span className="px-2 py-1 bg-black/30 backdrop-blur-sm rounded-lg text-xs font-medium">
//                           +{currentProject.technologies.length - 3}
//                         </span>
//                       )}
//                     </div>
//                   </div>

//                   {/* Hover Overlay */}
//                   <motion.div
//                     className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300"
//                     initial={{ opacity: 0 }}
//                     whileHover={{ opacity: 1 }}
//                   >
//                     <motion.div
//                       className="text-center"
//                       initial={{ scale: 0.8, opacity: 0 }}
//                       whileHover={{ scale: 1, opacity: 1 }}
//                       transition={{ duration: 0.2 }}
//                     >
//                       <div className="text-4xl mb-2">👁️</div>
//                       <span className="text-white font-semibold">View Details</span>
//                     </motion.div>
//                   </motion.div>
//                 </motion.div>
//               </motion.div>
//             </AnimatePresence>
//           </div>

//           {/* Project Navigation Dots */}
//           <div className="flex justify-center gap-3 mt-8">
//             {projects.map((_, index) => (
//               <motion.button
//                 key={index}
//                 className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                   selectedProject === index ? 'scale-125' : 'scale-100'
//                 }`}
//                 style={{
//                   backgroundColor: selectedProject === index ? projects[index].color : 'rgba(255,255,255,0.3)'
//                 }}
//                 onClick={() => setSelectedProject(index)}
//                 whileHover={{ scale: 1.2 }}
//                 whileTap={{ scale: 0.9 }}
//               />
//             ))}
//           </div>
//         </motion.div>

//         {/* Project Details Panel */}
//         <div className="flex flex-col gap-6 max-w-md">
//           {/* Header */}
//           <motion.div
//             className="text-center lg:text-left"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             <h1 className="text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent">
//               Projects
//             </h1>
//             <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mb-6" />
//           </motion.div>

//           {/* View Mode Switcher */}
//           <div className="flex gap-2 p-1 bg-black/40 backdrop-blur-md rounded-xl border border-white/20">
//             {[
//               { mode: 'grid', icon: '▦', label: 'Grid' },
//               { mode: 'carousel', icon: '→', label: 'Flow' },
//               { mode: '3d', icon: '◆', label: '3D' }
//             ].map(({ mode, icon, label }) => (
//               <motion.button
//                 key={mode}
//                 className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
//                   viewMode === mode
//                     ? 'bg-white/20 text-white shadow-lg'
//                     : 'text-white/70 hover:text-white hover:bg-white/10'
//                 }`}
//                 onClick={() => setViewMode(mode)}
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 <span className="mr-2">{icon}</span>
//                 {label}
//               </motion.button>
//             ))}
//           </div>

//           {/* Project Stats */}
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={selectedProject}
//               className="grid grid-cols-2 gap-4"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.4 }}
//             >
//               <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 border border-white/20">
//                 <div className="text-xs text-white/60 mb-1">Status</div>
//                 <div 
//                   className="text-sm font-bold"
//                   style={{ color: currentProject.color }}
//                 >
//                   {currentProject.status}
//                 </div>
//               </div>
//               <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 border border-white/20">
//                 <div className="text-xs text-white/60 mb-1">Year</div>
//                 <div className="text-sm font-bold text-white">{currentProject.year}</div>
//               </div>
//               <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 border border-white/20">
//                 <div className="text-xs text-white/60 mb-1">Category</div>
//                 <div className="text-sm font-bold text-white">{currentProject.category}</div>
//               </div>
//               <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 border border-white/20">
//                 <div className="text-xs text-white/60 mb-1">Complexity</div>
//                 <div className="text-sm font-bold text-white">{currentProject.complexity}%</div>
//               </div>
//             </motion.div>
//           </AnimatePresence>

//           {/* Technologies Used */}
//           <motion.div
//             className="space-y-3"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3 }}
//           >
//             <h4 className="text-sm font-semibold text-white/80">Technologies Used</h4>
//             <div className="flex flex-wrap gap-2">
//               {currentProject.technologies.map((tech, index) => (
//                 <motion.span
//                   key={tech}
//                   className="px-3 py-1.5 bg-black/50 backdrop-blur-md border border-white/20 rounded-lg text-xs font-medium text-white/90"
//                   initial={{ opacity: 0, scale: 0 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ delay: index * 0.1 }}
//                   whileHover={{ scale: 1.05, borderColor: `${currentProject.color}40` }}
//                 >
//                   {tech}
//                 </motion.span>
//               ))}
//             </div>
//           </motion.div>

//           {/* Quick Navigation */}
//           <div className="grid grid-cols-3 gap-2">
//             {projects.slice(0, 6).map((project, index) => (
//               <motion.button
//                 key={project.id}
//                 className={`relative h-16 rounded-xl border overflow-hidden group ${
//                   selectedProject === index 
//                     ? 'border-white/40 bg-white/10' 
//                     : 'border-white/20 bg-black/40 hover:bg-white/5'
//                 }`}
//                 onClick={() => setSelectedProject(index)}
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 <motion.div
//                   className="absolute inset-0"
//                   style={{
//                     background: `linear-gradient(135deg, ${project.color}20, transparent)`
//                   }}
//                   animate={{
//                     opacity: selectedProject === index ? 0.6 : 0
//                   }}
//                   transition={{ duration: 0.3 }}
//                 />
//                 <div className="relative z-10 flex flex-col items-center justify-center h-full">
//                   <span className="text-lg mb-1">{project.image}</span>
//                   <span className="text-xs font-medium text-white/80 truncate px-2">
//                     {project.title.split(' ')[0]}
//                   </span>
//                 </div>
//               </motion.button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Enhanced Modal */}
//       <AnimatePresence>
//         {isModalOpen && (
//           <motion.div
//             className="fixed inset-0 z-50 flex items-center justify-center p-4"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setIsModalOpen(false)}
//           >
//             {/* Backdrop */}
//             <motion.div
//               className="absolute inset-0 bg-black/80 backdrop-blur-xl"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//             />
            
//             {/* Modal Content */}
//             <motion.div
//               className="relative max-w-4xl w-full max-h-[90vh] overflow-auto rounded-3xl border border-white/20"
//               style={{
//                 background: `linear-gradient(135deg, ${currentProject.color}10, rgba(0,0,0,0.8))`
//               }}
//               initial={{ scale: 0.5, opacity: 0, rotateX: -15 }}
//               animate={{ scale: 1, opacity: 1, rotateX: 0 }}
//               exit={{ scale: 0.5, opacity: 0, rotateX: 15 }}
//               transition={{ duration: 0.5, ease: "easeOut" }}
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="p-8 lg:p-12">
//                 {/* Modal Header */}
//                 <div className="flex justify-between items-start mb-8">
//                   <div>
//                     <h2 className={`text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r ${currentProject.gradient} bg-clip-text text-transparent`}>
//                       {currentProject.title}
//                     </h2>
//                     <p className="text-white/80 text-lg">
//                       {currentProject.description}
//                     </p>
//                   </div>
//                   <motion.button
//                     className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
//                     onClick={() => setIsModalOpen(false)}
//                     whileHover={{ scale: 1.1, rotate: 90 }}
//                     whileTap={{ scale: 0.9 }}
//                   >
//                     ✕
//                   </motion.button>
//                 </div>

//                 {/* Features Grid */}
//                 <div className="grid md:grid-cols-2 gap-6 mb-8">
//                   <div>
//                     <h4 className="text-xl font-semibold text-white mb-4">Key Features</h4>
//                     <div className="space-y-2">
//                       {currentProject.features.map((feature, index) => (
//                         <motion.div
//                           key={feature}
//                           className="flex items-center gap-3 text-white/90"
//                           initial={{ opacity: 0, x: -20 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           transition={{ delay: index * 0.1 }}
//                         >
//                           <div 
//                             className="w-2 h-2 rounded-full"
//                             style={{ backgroundColor: currentProject.color }}
//                           />
//                           <span className="text-sm">{feature}</span>
//                         </motion.div>
//                       ))}
//                     </div>
//                   </div>
                  
//                   <div>
//                     <h4 className="text-xl font-semibold text-white mb-4">Tech Stack</h4>
//                     <div className="flex flex-wrap gap-2">
//                       {currentProject.technologies.map((tech, index) => (
//                         <motion.span
//                           key={tech}
//                           className="px-3 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-sm font-medium text-white"
//                           initial={{ opacity: 0, scale: 0 }}
//                           animate={{ opacity: 1, scale: 1 }}
//                           transition={{ delay: index * 0.05 }}
//                           whileHover={{ 
//                             scale: 1.05,
//                             borderColor: `${currentProject.color}60`
//                           }}
//                         >
//                           {tech}
//                         </motion.span>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex gap-4">
//                   <motion.button
//                     className="flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300"
//                     style={{
//                       background: `linear-gradient(135deg, ${currentProject.color}, ${currentProject.color}CC)`,
//                       boxShadow: `0 10px 30px ${currentProject.color}30`
//                     }}
//                     whileHover={{ scale: 1.02, y: -2 }}
//                     whileTap={{ scale: 0.98 }}
//                   >
//                     View Live Demo
//                   </motion.button>
//                   <motion.button
//                     className="flex-1 py-3 px-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl font-semibold text-white hover:bg-white/20 transition-all duration-300"
//                     whileHover={{ scale: 1.02, y: -2 }}
//                     whileTap={{ scale: 0.98 }}
//                   >
//                     Source Code
//                   </motion.button>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Floating Elements */}
//       <div className="absolute inset-0 pointer-events-none overflow-hidden">
//         {/* Code Snippets Floating */}
//         {['{ }', '< />', '[ ]', '( )', '→', '∞'].map((symbol, i) => (
//           <motion.div
//             key={symbol}
//             className="absolute text-white/10 font-mono text-2xl"
//             style={{
//               left: `${15 + i * 12}%`,
//               top: `${10 + (i % 2) * 70}%`
//             }}
//             animate={{
//               y: [0, -15, 0],
//               rotate: [0, 5, -5, 0],
//               opacity: [0.1, 0.3, 0.1]
//             }}
//             transition={{
//               duration: 6 + i,
//               repeat: Infinity,
//               ease: "easeInOut",
//               delay: i * 0.8
//             }}
//           >
//             {symbol}
//           </motion.div>
//         ))}

//         {/* Pulsing Energy Rings */}
//         {[...Array(3)].map((_, i) => (
//           <motion.div
//             key={`ring-${i}`}
//             className="absolute rounded-full border border-white/5"
//             style={{
//               width: `${300 + i * 200}px`,
//               height: `${300 + i * 200}px`,
//               left: '50%',
//               top: '50%',
//               transform: 'translate(-50%, -50%)'
//             }}
//             animate={{
//               scale: [1, 1.1, 1],
//               opacity: [0.1, 0.3, 0.1]
//             }}
//             transition={{
//               duration: 4 + i * 2,
//               repeat: Infinity,
//               ease: "easeInOut",
//               delay: i * 1.5
//             }}
//           />
//         ))}
//       </div>

//       {/* Interactive Hint */}
//       <motion.div
//         className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-black/60 backdrop-blur-md rounded-full border border-white/20 text-sm text-white/80"
//         animate={{
//           y: [0, -5, 0],
//           opacity: [0.8, 1, 0.8]
//         }}
//         transition={{
//           duration: 2.5,
//           repeat: Infinity,
//           ease: "easeInOut"
//         }}
//       >
//         <span className="mr-2">🖱️</span>
//         Click cards to explore • Auto-cycling every 4s
//       </motion.div>
//     </section>
//   );
// };

// export default Projects;
//! v3 

import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import ThreeSlider from "../reactThree/ReactThreeSlider";


interface ProjectsProps {
  scrollToSection?: (id: string) => void;
}

function Projects({ scrollToSection }: ProjectsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with real-time inventory, payment processing, and comprehensive admin dashboard for seamless online shopping experience.",
      technologies: ["React", "Next.js", "TypeScript", "Stripe", "Prisma", "PostgreSQL"],
      category: "Full Stack",
      year: "2024",
      status: "Live",
      color: "from-blue-400 to-cyan-500",
      bgColor: "from-blue-400/10 to-cyan-500/10",
      complexity: 95,
      duration: "4 months",
      teamSize: "3 developers",
      highlights: [
        "Real-time inventory management",
        "Secure payment processing with Stripe",
        "Advanced admin dashboard",
        "Mobile-responsive design",
        "SEO optimized"
      ],
      metrics: {
        users: "10,000+",
        performance: "98% uptime",
        conversion: "15% increase",
        load: "< 2s load time"
      },
      challenges: "Implementing real-time inventory sync across multiple sales channels while maintaining data consistency and handling high traffic loads during peak sales periods.",
      solution: "Built a robust event-driven architecture using WebSocket connections and implemented Redis caching for real-time updates with PostgreSQL for data persistence."
    },
    {
      id: 2,
      title: "3D Portfolio Website",
      description: "Interactive 3D portfolio featuring Three.js animations, particle systems, and immersive user experience with WebGL shaders and dynamic lighting effects.",
      technologies: ["React", "Three.js", "Framer Motion", "Tailwind", "WebGL", "GLSL"],
      category: "3D Web",
      year: "2024",
      status: "In Progress",
      color: "from-purple-400 to-pink-500",
      bgColor: "from-purple-400/10 to-pink-500/10",
      complexity: 90,
      duration: "3 months",
      teamSize: "Solo project",
      highlights: [
        "Custom WebGL shaders",
        "Physics-based animations",
        "Interactive 3D elements",
        "Optimized for mobile",
        "Dynamic lighting system"
      ],
      metrics: {
        users: "5,000+",
        performance: "60fps on mobile",
        engagement: "4.2 min avg session",
        load: "< 3s initial load"
      },
      challenges: "Optimizing 3D performance across devices while maintaining visual quality and ensuring smooth interactions on lower-end hardware.",
      solution: "Implemented LOD (Level of Detail) system, texture compression, and adaptive quality settings based on device capabilities."
    },
    {
      id: 3,
      title: "Task Management Platform",
      description: "Collaborative task management solution with real-time updates, team collaboration features, advanced analytics, and intelligent project insights.",
      technologies: ["React", "Redux", "Socket.io", "Node.js", "MongoDB", "Chart.js"],
      category: "Web App",
      year: "2023",
      status: "Live",
      color: "from-green-400 to-emerald-500",
      bgColor: "from-green-400/10 to-emerald-500/10",
      complexity: 85,
      duration: "5 months",
      teamSize: "4 developers",
      highlights: [
        "Real-time collaboration",
        "Advanced analytics dashboard",
        "Team performance insights",
        "File sharing system",
        "Custom workflow automation"
      ],
      metrics: {
        users: "25,000+",
        teams: "500+ active teams",
        productivity: "30% improvement",
        retention: "85% monthly retention"
      },
      challenges: "Building scalable real-time collaboration features that work seamlessly across different time zones and team sizes.",
      solution: "Architected microservices with Socket.io clusters and implemented operational transform algorithms for conflict resolution."
    },
    {
      id: 4,
      title: "AI Chat Interface",
      description: "Modern conversational AI interface with message streaming, context awareness, multi-language support, and intelligent conversation flow management.",
      technologies: ["React", "TypeScript", "WebSocket", "OpenAI API", "Redis", "Python"],
      category: "AI/ML",
      year: "2024",
      status: "Live",
      color: "from-orange-400 to-red-500",
      bgColor: "from-orange-400/10 to-red-500/10",
      complexity: 88,
      duration: "3 months",
      teamSize: "2 developers",
      highlights: [
        "Real-time message streaming",
        "Context-aware responses",
        "Multi-language support",
        "Voice-to-text integration",
        "Custom AI training pipeline"
      ],
      metrics: {
        messages: "1M+ processed",
        response: "< 1s avg response",
        accuracy: "94% user satisfaction",
        languages: "12 languages"
      },
      challenges: "Implementing efficient message streaming while maintaining conversation context and handling multiple concurrent users.",
      solution: "Built a scalable WebSocket architecture with Redis for session management and implemented streaming protocols for real-time AI responses."
    },
    {
      id: 5,
      title: "Analytics Dashboard",
      description: "Real-time analytics platform with interactive data visualizations, custom reporting tools, and performance monitoring for business intelligence.",
      technologies: ["React", "D3.js", "WebSocket", "Chart.js", "Python", "FastAPI"],
      category: "Data Viz",
      year: "2024",
      status: "Live",
      color: "from-amber-400 to-yellow-500",
      bgColor: "from-amber-400/10 to-yellow-500/10",
      complexity: 92,
      duration: "4 months",
      teamSize: "3 developers",
      highlights: [
        "Real-time data streaming",
        "Interactive visualizations",
        "Custom chart builder",
        "Export capabilities",
        "Alert system"
      ],
      metrics: {
        dataPoints: "10M+ daily",
        dashboards: "500+ active",
        queries: "< 200ms avg",
        uptime: "99.9% availability"
      },
      challenges: "Processing and visualizing large datasets in real-time while maintaining smooth user interactions and chart responsiveness.",
      solution: "Implemented data streaming with WebSockets, canvas-based rendering for performance, and smart data sampling algorithms."
    },
    {
      id: 6,
      title: "Progressive Web App",
      description: "Cross-platform PWA with offline capabilities, push notifications, native-like experience, and seamless synchronization across devices.",
      technologies: ["React", "PWA", "Service Workers", "IndexedDB", "Push API", "Workbox"],
      category: "Mobile",
      year: "2023",
      status: "Live",
      color: "from-cyan-400 to-blue-500",
      bgColor: "from-cyan-400/10 to-blue-500/10",
      complexity: 87,
      duration: "3 months",
      teamSize: "2 developers",
      highlights: [
        "Offline-first architecture",
        "Push notifications",
        "Native app feel",
        "Background sync",
        "Install prompts"
      ],
      metrics: {
        installs: "15,000+ installs",
        offline: "90% offline usage",
        engagement: "60% daily return",
        performance: "Lighthouse 95+"
      },
      challenges: "Creating a seamless offline experience while ensuring data consistency when reconnecting to the network.",
      solution: "Implemented comprehensive service worker strategy with background sync and conflict resolution for offline-first functionality."
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleScrollProgress = (progress: number) => {
    setScrollProgress(progress);
    const projectIndex = Math.floor(progress * projects.length);
    if (projectIndex !== selectedProject && projectIndex < projects.length) {
      setSelectedProject(projectIndex);
    }
  };

  const currentProject = projects[selectedProject];

  return (
    <div ref={sectionRef} className="relative min-h-screen py-20 overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/60 to-transparent"></div>
      
      {/* Dynamic Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-gradient-to-r ${currentProject.color} rounded-full animate-pulse`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
            <span className="text-purple-400 font-medium tracking-wider text-lg">Portfolio</span>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-slate-200 to-purple-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            A showcase of innovative solutions, cutting-edge technologies, and impactful digital experiences 
            that demonstrate expertise across the full development spectrum.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - 3D Slider */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <div className="relative h-[500px] lg:h-[600px] backdrop-blur-md bg-slate-800/20 border border-slate-700/50 rounded-2xl overflow-hidden hover:border-slate-600/50 transition-all duration-500">
              <ThreeSlider
                onScrollProgress={handleScrollProgress}
                openModal={isModalOpen}
                setOpenModal={setIsModalOpen}
              />
              
              {/* Overlay Controls */}
              <div className="absolute top-4 left-4 z-20">
                <div className="backdrop-blur-md bg-black/40 border border-white/20 rounded-xl p-3">
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <Icon icon="mingcute:mouse-line" width="16" height="16" />
                    <span>Scroll to navigate</span>
                  </div>
                </div>
              </div>
              
              {/* Progress Indicator */}
              <div className="absolute bottom-4 left-4 right-4 z-20">
                <div className="backdrop-blur-md bg-black/40 border border-white/20 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/80 text-sm font-medium">Project Progress</span>
                    <span className="text-white text-sm font-bold">
                      {selectedProject + 1} / {projects.length}
                    </span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-1.5">
                    <div
                      className={`h-full bg-gradient-to-r ${currentProject.color} rounded-full transition-all duration-500`}
                      style={{ width: `${((selectedProject + 1) / projects.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Project Details */}
          <div className={`space-y-8 transition-all duration-1000 delay-400 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            {/* Project Header */}
            <div className="backdrop-blur-md bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 hover:border-slate-600/50 transition-all duration-500">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">{currentProject.title}</h3>
                  <p className={`text-lg font-semibold bg-gradient-to-r ${currentProject.color} bg-clip-text text-transparent`}>
                    {currentProject.category} • {currentProject.year}
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className={`px-3 py-1 bg-gradient-to-r ${currentProject.bgColor} text-sm rounded-full border border-slate-600/30`}>
                    {currentProject.status}
                  </span>
                </div>
              </div>
              
              <p className="text-slate-300 leading-relaxed text-lg mb-6">
                {currentProject.description}
              </p>

              {/* Project Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-700/30 rounded-lg">
                  <div className="text-slate-400 text-xs mb-1">Complexity</div>
                  <div className="text-white font-bold">{currentProject.complexity}%</div>
                </div>
                <div className="p-3 bg-slate-700/30 rounded-lg">
                  <div className="text-slate-400 text-xs mb-1">Duration</div>
                  <div className="text-white font-bold">{currentProject.duration}</div>
                </div>
                <div className="p-3 bg-slate-700/30 rounded-lg">
                  <div className="text-slate-400 text-xs mb-1">Team Size</div>
                  <div className="text-white font-bold">{currentProject.teamSize}</div>
                </div>
                <div className="p-3 bg-slate-700/30 rounded-lg">
                  <div className="text-slate-400 text-xs mb-1">Category</div>
                  <div className="text-white font-bold">{currentProject.category}</div>
                </div>
              </div>
            </div>

            {/* Key Highlights */}
            <div className="backdrop-blur-md bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 hover:border-amber-400/30 transition-all duration-500">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Icon icon="mingcute:star-line" width="28" height="28" className="text-amber-400" />
                Key Highlights
              </h3>
              <div className="space-y-3">
                {currentProject.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all duration-300"
                  >
                    <div className={`w-2 h-2 bg-gradient-to-r ${currentProject.color} rounded-full mt-2 flex-shrink-0`} />
                    <span className="text-slate-300">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies & Metrics */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Technologies */}
              <div className="backdrop-blur-md bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 hover:border-cyan-400/30 transition-all duration-500">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Icon icon="mingcute:code-line" width="24" height="24" className="text-cyan-400" />
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {currentProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-slate-700/50 text-slate-300 text-sm rounded-lg border border-slate-600/50 hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Metrics */}
              <div className="backdrop-blur-md bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 hover:border-green-400/30 transition-all duration-500">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Icon icon="mingcute:chart-line" width="24" height="24" className="text-green-400" />
                  Key Metrics
                </h3>
                <div className="space-y-3">
                  {Object.entries(currentProject.metrics).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="text-white font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Project Navigation */}
            <div className="backdrop-blur-md bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 hover:border-purple-400/30 transition-all duration-500">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Icon icon="mingcute:grid-line" width="24" height="24" className="text-purple-400" />
                  All Projects
                </h3>
                <span className="text-slate-400 text-sm">
                  {selectedProject + 1} of {projects.length}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {projects.map((project, index) => (
                  <button
                    key={project.id}
                    className={`relative p-3 rounded-lg border transition-all duration-300 ${
                      selectedProject === index 
                        ? `bg-gradient-to-r ${project.bgColor} border-slate-600/50` 
                        : 'bg-slate-700/30 border-slate-600/30 hover:bg-slate-700/50'
                    }`}
                    onClick={() => setSelectedProject(index)}
                  >
                    <div className="text-xs font-medium text-white truncate">
                      {project.title}
                    </div>
                    <div className="text-xs text-slate-400">{project.category}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex-1 group relative px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                <div className="relative flex items-center justify-center gap-3">
                  <Icon icon="mingcute:eye-line" width="20" height="20" />
                  <span>View Details</span>
                </div>
              </button>
              <button
                onClick={() => scrollToSection?.("contactme")}
                className="flex-1 px-6 py-4 bg-transparent border-2 border-slate-600 rounded-xl font-semibold text-white hover:border-purple-400 hover:bg-purple-400/10 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-3"
              >
                <Icon icon="mingcute:message-3-line" width="20" height="20" />
                <span>Discuss Project</span>
              </button>
            </div>
          </div>
        </div>

        {/* Challenge & Solution Section */}
        <div className={`mt-16 transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Challenge */}
            <div className="backdrop-blur-md bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 hover:border-orange-400/30 transition-all duration-500">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Icon icon="mingcute:question-line" width="28" height="28" className="text-orange-400" />
                The Challenge
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {currentProject.challenges}
              </p>
            </div>

            {/* Solution */}
            <div className="backdrop-blur-md bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 hover:border-green-400/30 transition-all duration-500">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Icon icon="mingcute:lightbulb-line" width="28" height="28" className="text-green-400" />
                The Solution
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {currentProject.solution}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative max-w-4xl w-full max-h-[90vh] overflow-auto backdrop-blur-md bg-slate-800/30 border border-slate-700/50 rounded-2xl">
            <div className="p-8">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className={`text-3xl font-bold mb-2 bg-gradient-to-r ${currentProject.color} bg-clip-text text-transparent`}>
                    {currentProject.title}
                  </h2>
                  <p className="text-white/80 text-lg">{currentProject.description}</p>
                </div>
                <button
                  className="w-12 h-12 rounded-full bg-slate-700/50 border border-slate-600/50 flex items-center justify-center text-white/80 hover:text-white hover:bg-slate-600/50 transition-all duration-300"
                  onClick={() => setIsModalOpen(false)}
                >
                  <Icon icon="mingcute:close-line" width="24" height="24" />
                </button>
              </div>
              
              {/* Modal content with project details */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold text-white mb-4">Project Overview</h4>
                  <div className="space-y-4">
                    {currentProject.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className={`w-2 h-2 bg-gradient-to-r ${currentProject.color} rounded-full mt-2 flex-shrink-0`} />
                        <span className="text-slate-300">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold text-white mb-4">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-2 bg-slate-700/50 text-slate-300 text-sm rounded-lg border border-slate-600/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Stats */}
      <div className={`fixed top-20 right-8 backdrop-blur-md bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 transition-all duration-1000 delay-800 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'} hidden xl:block`}>
        <h4 className="font-bold text-white text-center mb-4 flex items-center gap-2">
          <Icon icon="mingcute:trophy-line" width="20" height="20" className="text-amber-400" />
          Project Stats
        </h4>
        <div className="space-y-4 text-center">
          <div className="p-3 bg-slate-700/30 rounded-lg">
            <div className="text-2xl font-bold text-cyan-400">6+</div>
            <div className="text-xs text-slate-400">Projects</div>
          </div>
          <div className="p-3 bg-slate-700/30 rounded-lg">
            <div className="text-2xl font-bold text-purple-400">90%</div>
            <div className="text-xs text-slate-400">Avg Complexity</div>
          </div>
          <div className="p-3 bg-slate-700/30 rounded-lg">
            <div className="text-2xl font-bold text-green-400">100%</div>
            <div className="text-xs text-slate-400">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;