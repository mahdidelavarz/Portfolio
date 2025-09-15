// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const Skills: React.FC = () => {
//   const [selectedCategory, setSelectedCategory] = useState(0);
//   const [isVisible, setIsVisible] = useState(false);

//   const skillCategories = [
//     {
//       title: "Frontend Frameworks",
//       color: "#3b82f6",
//       skills: ["React", "Next.js", "TypeScript"],
//       icon: "⚛️"
//     },
//     {
//       title: "Styling & Animation",
//       color: "#06b6d4",
//       skills: ["Tailwind CSS", "Framer Motion", "Three.js"],
//       icon: "🎨"
//     },
//     {
//       title: "State Management",
//       color: "#8b5cf6",
//       skills: ["Redux", "Zustand", "TanStack Query"],
//       icon: "🔄"
//     },
//     {
//       title: "Data & Storage",
//       color: "#10b981",
//       skills: ["IndexedDB", "Axios", "PWA"],
//       icon: "💾"
//     },
//     {
//       title: "Interactive Features",
//       color: "#f59e0b",
//       skills: ["Particle.js", "React Hook Form", "i18n"],
//       icon: "✨"
//     }
//   ];

//   useEffect(() => {
//     setIsVisible(true);
//     const interval = setInterval(() => {
//       setSelectedCategory((prev) => (prev + 1) % skillCategories.length);
//     }, 4000);

//     return () => clearInterval(interval);
//   }, []);

//   const containerVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.8,
//         staggerChildren: 0.2
//       }
//     }
//   };

//   const skillVariants = {
//     hidden: { opacity: 0, scale: 0.8, y: 20 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       y: 0,
//       transition: {
//         type: "spring",
//         stiffness: 200,
//         damping: 20
//       }
//     }
//   };

//   const orbitalVariants = {
//     animate: {
//       rotate: 360,
//       transition: {
//         duration: 20,
//         repeat: Infinity,
//         ease: "linear"
//       }
//     }
//   };

//   const pulseVariants = {
//     animate: {
//       scale: [1, 1.1, 1],
//       opacity: [0.7, 1, 0.7],
//       transition: {
//         duration: 2,
//         repeat: Infinity,
//         ease: "easeInOut"
//       }
//     }
//   };

//   return (
//     <div className="flex justify-center items-center text-white w-full min-h-screen snap-start px-8 md:px-16 lg:px-48 relative overflow-hidden">
//       {/* Background decorative elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <motion.div
//           className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/30 rounded-full"
//           animate={{
//             y: [0, -20, 0],
//             opacity: [0.3, 0.8, 0.3]
//           }}
//           transition={{
//             duration: 3,
//             repeat: Infinity,
//             ease: "easeInOut"
//           }}
//         />
//         <motion.div
//           className="absolute top-3/4 right-1/4 w-1 h-1 bg-cyan-300/40 rounded-full"
//           animate={{
//             y: [0, -15, 0],
//             opacity: [0.4, 0.9, 0.4]
//           }}
//           transition={{
//             duration: 2.5,
//             repeat: Infinity,
//             ease: "easeInOut",
//             delay: 1
//           }}
//         />
//       </div>

//       <motion.div
//         className="flex flex-col lg:flex-row justify-center items-center gap-12 lg:gap-24 w-full max-w-7xl"
//         variants={containerVariants}
//         initial="hidden"
//         animate={isVisible ? "visible" : "hidden"}
//       >
//         {/* Central Skills Visualization */}
//         <div className="relative flex justify-center items-center">
//           {/* Outer rotating ring */}
//           <motion.div
//             className="w-80 h-80 lg:w-96 lg:h-96 rounded-full border border-white/10 absolute"
//             variants={orbitalVariants}
//             animate="animate"
//           />

//           {/* Middle ring with skill indicators */}
//           <motion.div
//             className="w-72 h-72 lg:w-80 lg:h-80 rounded-full absolute"
//             variants={orbitalVariants}
//             animate="animate"
//           >
//             {skillCategories.map((category, index) => {
//               const angle = (index * 72) - 90; // 360/5 = 72 degrees between each
//               const radian = (angle * Math.PI) / 180;
//               const radius = 160; // Radius for positioning
//               const x = Math.cos(radian) * radius;
//               const y = Math.sin(radian) * radius;

//               return (
//                 <motion.div
//                   key={index}
//                   className={`absolute w-12 h-12 rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center backdrop-blur-md border border-white/20 ${
//                     selectedCategory === index ? 'scale-125 shadow-lg' : 'scale-100'
//                   }`}
//                   style={{
//                     backgroundColor: `${category.color}20`,
//                     left: `calc(50% + ${x}px - 24px)`,
//                     top: `calc(50% + ${y}px - 24px)`,
//                     boxShadow: selectedCategory === index ? `0 0 25px ${category.color}60, inset 0 0 20px ${category.color}20` : `0 0 10px ${category.color}20`
//                   }}
//                   onClick={() => setSelectedCategory(index)}
//                   whileHover={{ scale: 1.15 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <span
//                     className="text-lg font-bold"
//                     style={{
//                       color: selectedCategory === index ? category.color : `${category.color}CC`,
//                       textShadow: '0 0 10px rgba(0,0,0,0.5)'
//                     }}
//                   >
//                     {category.icon}
//                   </span>
//                 </motion.div>
//               );
//             })}
//           </motion.div>

//           {/* Central core */}
//           <motion.div
//             className="w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/20 flex flex-col justify-center items-center relative overflow-hidden"
//             variants={pulseVariants}
//             animate="animate"
//           >
//             <motion.div
//               className="absolute inset-0 rounded-full bg-gradient-to-br opacity-20"
//               style={{
//                 background: `linear-gradient(135deg, ${skillCategories[selectedCategory].color}40, transparent)`
//               }}
//               key={selectedCategory}
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 0.2, scale: 1 }}
//               transition={{ duration: 0.5 }}
//             />
//             <motion.div
//               className="text-3xl mb-2"
//               key={`icon-${selectedCategory}`}
//               initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
//               animate={{ opacity: 1, scale: 1, rotate: 0 }}
//               exit={{ opacity: 0, scale: 0.5, rotate: 180 }}
//               transition={{ duration: 0.5 }}
//             >
//               {skillCategories[selectedCategory].icon}
//             </motion.div>
//             <motion.div
//               className="text-xs text-center font-medium text-white/90"
//               key={`title-${selectedCategory}`}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             >
//               Skills
//             </motion.div>
//           </motion.div>
//         </div>

//         {/* Skills Display Panel */}
//         <div className="flex flex-col gap-6 lg:gap-8 max-w-md">
//           <motion.h2
//             className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent"
//             initial={{ opacity: 0, x: -30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//           >
//             Technical Expertise
//           </motion.h2>

//           <AnimatePresence mode="wait">
//             <motion.div
//               key={selectedCategory}
//               className="space-y-4"
//               initial={{ opacity: 0, x: 30 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -30 }}
//               transition={{ duration: 0.5 }}
//             >
//               <motion.h3
//                 className="text-xl lg:text-2xl font-semibold flex items-center gap-3"
//                 style={{ color: skillCategories[selectedCategory].color }}
//               >
//                 <span className="text-2xl">{skillCategories[selectedCategory].icon}</span>
//                 {skillCategories[selectedCategory].title}
//               </motion.h3>

//               <div className="grid gap-3">
//                 {skillCategories[selectedCategory].skills.map((skill, skillIndex) => (
//                   <motion.div
//                     key={skill}
//                     className="group relative"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.4, delay: skillIndex * 0.1 }}
//                   >
//                     <div
//                       className="px-4 py-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-300 cursor-pointer overflow-hidden relative"
//                       style={{
//                         boxShadow: `0 8px 25px rgba(0,0,0,0.3), 0 4px 20px ${skillCategories[selectedCategory].color}15`
//                       }}
//                     >
//                       <motion.div
//                         className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
//                         style={{
//                           background: `linear-gradient(90deg, transparent, ${skillCategories[selectedCategory].color}40, transparent)`
//                         }}
//                         animate={{
//                           x: ['-100%', '100%']
//                         }}
//                         transition={{
//                           duration: 2,
//                           repeat: Infinity,
//                           ease: "linear"
//                         }}
//                       />
//                       <span className="relative z-10 font-medium text-white drop-shadow-lg group-hover:text-white transition-colors duration-300">
//                         {skill}
//                       </span>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>
//           </AnimatePresence>

//           {/* Category Navigation */}
//           <motion.div
//             className="flex flex-wrap gap-2 mt-4"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.6 }}
//           >
//             {skillCategories.map((category, index) => (
//               <motion.button
//                 key={index}
//                 className={`px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 border ${
//                   selectedCategory === index
//                     ? 'border-white/40 bg-white/10 text-white'
//                     : 'border-white/20 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
//                 }`}
//                 onClick={() => setSelectedCategory(index)}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 style={{
//                   boxShadow: selectedCategory === index ? `0 0 15px ${category.color}30` : 'none'
//                 }}
//               >
//                 <span className="mr-1">{category.icon}</span>
//                 {category.title.split(' ')[0]}
//               </motion.button>
//             ))}
//           </motion.div>
//         </div>
//       </motion.div>

//       {/* Floating skill badges for visual interest - positioned in skills area only */}
//       <div className="absolute inset-0 pointer-events-none overflow-hidden">
//         {['🚀', '⚡', '🎯', '💎'].map((icon, index) => (
//           <motion.div
//             key={icon}
//             className="absolute text-lg opacity-20"
//             style={{
//               left: `${60 + index * 8}%`,
//               top: `${30 + index * 12}%`
//             }}
//             animate={{
//               y: [0, -8, 0],
//               opacity: [0.1, 0.3, 0.1],
//               rotate: [0, 5, -5, 0]
//             }}
//             transition={{
//               duration: 4 + index * 0.5,
//               repeat: Infinity,
//               ease: "easeInOut",
//               delay: index * 0.8
//             }}
//           >
//             {icon}
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };
// export default Skills;
// ! _______________________________________________________________________________________________________________________option two
// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const Skills = () => {
//   const [activeSkill, setActiveSkill] = useState(0);
//   const [hoveredSkill, setHoveredSkill] = useState(null);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);

//   const skills = [
//     { name: "React", level: 95, category: "Frontend", color: "#61dafb", description: "Component-based UI library" },
//     { name: "Next.js", level: 90, category: "Framework", color: "#000000", description: "Full-stack React framework" },
//     { name: "TypeScript", level: 88, category: "Language", color: "#3178c6", description: "Typed JavaScript superset" },
//     { name: "Tailwind CSS", level: 92, category: "Styling", color: "#06b6d4", description: "Utility-first CSS framework" },
//     { name: "TanStack Query", level: 85, category: "Data", color: "#ff4154", description: "Data fetching & caching" },
//     { name: "Zustand", level: 87, category: "State", color: "#f97316", description: "Lightweight state management" },
//     { name: "Redux", level: 83, category: "State", color: "#764abc", description: "Predictable state container" },
//     { name: "IndexedDB", level: 80, category: "Storage", color: "#fbbf24", description: "Browser database API" },
//     { name: "PWA", level: 85, category: "Web", color: "#10b981", description: "Progressive web applications" },
//     { name: "Particle.js", level: 88, category: "Animation", color: "#ec4899", description: "Interactive particle systems" },
//     { name: "Framer Motion", level: 90, category: "Animation", color: "#8b5cf6", description: "React animation library" },
//     { name: "React Hook Form", level: 86, category: "Forms", color: "#ef4444", description: "Performant form handling" },
//     { name: "Axios", level: 89, category: "HTTP", color: "#0ea5e9", description: "Promise-based HTTP client" },
//     { name: "i18n", level: 82, category: "Localization", color: "#22c55e", description: "Internationalization framework" },
//     { name: "Three.js", level: 84, category: "3D", color: "#ffffff", description: "3D graphics library" }
//   ];

//   const displayedSkill = hoveredSkill !== null ? hoveredSkill : activeSkill;

//   useEffect(() => {
//     if (isAutoPlaying) {
//       const interval = setInterval(() => {
//         setActiveSkill((prev) => (prev + 1) % skills.length);
//       }, 2500);
//       return () => clearInterval(interval);
//     }
//   }, [isAutoPlaying, skills.length]);

//   const categories = [...new Set(skills.map(skill => skill.category))];

//   const containerVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.8,
//         staggerChildren: 0.2
//       }
//     }
//   };

//   return (
//     <div className="flex flex-col justify-center items-center text-white w-full min-h-screen snap-start px-8 lg:px-16 relative">
//       {/* Main Title */}
//       <motion.div
//         className="text-center mb-16"
//         initial={{ opacity: 0, y: -30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//       >
//         <h1 className="text-5xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
//           Skills
//         </h1>
//         <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full" />
//       </motion.div>

//       {/* Skills Grid */}
//       <div
//         className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8 max-w-6xl"
//         onMouseEnter={() => setIsAutoPlaying(false)}
//         onMouseLeave={() => {
//           setIsAutoPlaying(true);
//           setHoveredSkill(null);
//         }}
//       >
//         {skills.map((skill, index) => {
//           const isCurrentlyActive = displayedSkill === index;

//           return (
//             <motion.div
//               key={skill.name}
//               className={`relative group cursor-pointer ${
//                 isCurrentlyActive ? 'z-20' : 'z-10'
//               }`}
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: index * 0.1 }}
//               onMouseEnter={() => setHoveredSkill(index)}
//               onMouseLeave={() => setHoveredSkill(null)}
//             >
//               {/* Skill Card */}
//               <motion.div
//                 className="relative bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl p-6 h-32 flex flex-col justify-between overflow-hidden"
//                 whileHover={{ scale: 1.05 }}
//                 animate={{
//                   borderColor: isCurrentlyActive ? `${skill.color}60` : 'rgba(255,255,255,0.2)',
//                   boxShadow: isCurrentlyActive
//                     ? `0 20px 40px rgba(0,0,0,0.4), 0 0 30px ${skill.color}30`
//                     : '0 10px 25px rgba(0,0,0,0.3)'
//                 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 {/* Background Glow */}
//                 <motion.div
//                   className="absolute inset-0 rounded-2xl"
//                   style={{
//                     background: `radial-gradient(circle at center, ${skill.color}40, transparent 70%)`
//                   }}
//                   animate={{
//                     opacity: isCurrentlyActive ? 0.15 : 0
//                   }}
//                   transition={{ duration: 0.3 }}
//                 />

//                 {/* Skill Name */}
//                 <motion.h3
//                   className="text-lg font-semibold drop-shadow-lg relative z-10"
//                   animate={{
//                     color: isCurrentlyActive ? skill.color : '#ffffff'
//                   }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   {skill.name}
//                 </motion.h3>

//                 {/* Progress Bar */}
//                 <div className="relative z-10">
//                   <div className="w-full bg-white/10 rounded-full h-2 mb-2 overflow-hidden">
//                     <motion.div
//                       className="h-full rounded-full"
//                       style={{ backgroundColor: skill.color }}
//                       initial={{ width: 0 }}
//                       animate={{ width: `${skill.level}%` }}
//                       transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
//                     />
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-xs text-white/70 font-medium">{skill.category}</span>
//                     <span className="text-xs text-white/90 font-bold">{skill.level}%</span>
//                   </div>
//                 </div>

//                 {/* Hover Description */}
//                 <AnimatePresence>
//                   {isCurrentlyActive && (
//                     <motion.div
//                       className="absolute inset-0 bg-black/80 backdrop-blur-xl rounded-2xl p-4 flex flex-col justify-center items-center text-center border"
//                       style={{ borderColor: `${skill.color}60` }}
//                       initial={{ opacity: 0, scale: 0.9 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       exit={{ opacity: 0, scale: 0.9 }}
//                       transition={{ duration: 0.2 }}
//                     >
//                       <h4
//                         className="text-xl font-bold mb-2 drop-shadow-lg"
//                         style={{ color: skill.color }}
//                       >
//                         {skill.name}
//                       </h4>
//                       <p className="text-sm text-white/90 leading-relaxed">
//                         {skill.description}
//                       </p>
//                       <div className="absolute top-2 right-2">
//                         <div
//                           className="w-3 h-3 rounded-full"
//                           style={{ backgroundColor: skill.color }}
//                         />
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </motion.div>
//             </motion.div>
//           );
//         })}
//       </div>

//       {/* Category Legend */}
//       <motion.div
//         className="flex flex-wrap justify-center gap-4 mt-12 max-w-4xl"
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, delay: 1 }}
//       >
//         {categories.map((category, index) => {
//           const categorySkills = skills.filter(skill => skill.category === category);
//           const avgLevel = Math.round(categorySkills.reduce((sum, skill) => sum + skill.level, 0) / categorySkills.length);

//           return (
//             <motion.div
//               key={category}
//               className="px-4 py-2 bg-black/40 backdrop-blur-md border border-white/20 rounded-full flex items-center gap-2"
//               whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.4)' }}
//             >
//               <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500" />
//               <span className="text-sm font-medium text-white/90">{category}</span>
//               <span className="text-xs text-white/60">({avgLevel}%)</span>
//             </motion.div>
//           );
//         })}
//       </motion.div>

//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 pointer-events-none overflow-hidden">
//         {[...Array(6)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`
//             }}
//             animate={{
//               scale: [0, 1.5, 0],
//               opacity: [0, 0.6, 0]
//             }}
//             transition={{
//               duration: 3,
//               repeat: Infinity,
//               delay: i * 0.5,
//               ease: "easeInOut"
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Skills;
// !_____________________________________________________________________________________________________________________________________option three
// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const Skills = () => {
//   const [selectedStack, setSelectedStack] = useState("frontend");
//   const [hoveredSkill, setHoveredSkill] = useState(null);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//   const skillStacks = {
//     frontend: {
//       title: "Frontend Mastery",
//       color: "#00d4ff",
//       skills: [
//         { name: "React", mastery: 95, years: 3, icon: "⚛️" },
//         { name: "Next.js", mastery: 90, years: 2, icon: "▲" },
//         { name: "TypeScript", mastery: 88, years: 2.5, icon: "📘" },
//         { name: "Tailwind CSS", mastery: 92, years: 2, icon: "🎨" }
//       ]
//     },
//     state: {
//       title: "State Architecture",
//       color: "#ff6b6b",
//       skills: [
//         { name: "Zustand", mastery: 87, years: 1.5, icon: "🐻" },
//         { name: "Redux", mastery: 83, years: 2, icon: "🔄" },
//         { name: "TanStack Query", mastery: 85, years: 1, icon: "🚀" },
//         { name: "React Hook Form", mastery: 86, years: 2, icon: "📝" }
//       ]
//     },
//     animation: {
//       title: "Interactive Experience",
//       color: "#4ecdc4",
//       skills: [
//         { name: "Framer Motion", mastery: 90, years: 2, icon: "🎭" },
//         { name: "Three.js", mastery: 84, years: 1, icon: "🎲" },
//         { name: "Particle.js", mastery: 88, years: 1.5, icon: "✨" },
//         { name: "PWA", mastery: 85, years: 1, icon: "📱" }
//       ]
//     },
//     data: {
//       title: "Data & Integration",
//       color: "#a8e6cf",
//       skills: [
//         { name: "Axios", mastery: 89, years: 3, icon: "🌐" },
//         { name: "IndexedDB", mastery: 80, years: 1, icon: "💾" },
//         { name: "i18n", mastery: 82, years: 1.5, icon: "🌍" }
//       ]
//     }
//   };

//   const stackKeys = Object.keys(skillStacks);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setSelectedStack(prev => {
//         const currentIndex = stackKeys.indexOf(prev);
//         return stackKeys[(currentIndex + 1) % stackKeys.length];
//       });
//     }, 4000);

//     return () => clearInterval(interval);
//   }, [stackKeys]);

//   const handleMouseMove = (e) => {
//     setMousePosition({ x: e.clientX, y: e.clientY });
//   };

//   return (
//     <div
//       className="flex flex-col justify-center items-center text-white w-full min-h-screen snap-start px-8 lg:px-16 relative overflow-hidden"
//       onMouseMove={handleMouseMove}
//     >
//       {/* Dynamic Background Grid */}
//       <div className="absolute inset-0 opacity-10">
//         <div className="absolute inset-0" style={{
//           backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 212, 255, 0.1) 0%, transparent 50%)`
//         }} />
//         {[...Array(20)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute w-px h-16 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent"
//             style={{
//               left: `${5 + i * 5}%`,
//               top: '0'
//             }}
//             animate={{
//               opacity: [0.1, 0.3, 0.1],
//               scaleY: [0.5, 1, 0.5]
//             }}
//             transition={{
//               duration: 3,
//               repeat: Infinity,
//               delay: i * 0.1,
//               ease: "easeInOut"
//             }}
//           />
//         ))}
//       </div>

//       {/* Header */}
//       <motion.div
//         className="text-center mb-20"
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 1 }}
//       >
//         <motion.h1
//           className="text-6xl lg:text-8xl font-black mb-6 tracking-tight"
//           style={{
//             background: `linear-gradient(135deg, ${skillStacks[selectedStack].color}, #ffffff, ${skillStacks[selectedStack].color})`,
//             backgroundClip: 'text',
//             WebkitBackgroundClip: 'text',
//             color: 'transparent',
//             textShadow: '0 0 40px rgba(0, 212, 255, 0.3)'
//           }}
//           animate={{
//             background: `linear-gradient(135deg, ${skillStacks[selectedStack].color}, #ffffff, ${skillStacks[selectedStack].color})`
//           }}
//           transition={{ duration: 0.8 }}
//         >
//           TECH STACK
//         </motion.h1>
//         <motion.p
//           className="text-xl text-white/70 font-light tracking-wide"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.3 }}
//         >
//           Crafting digital experiences with cutting-edge technologies
//         </motion.p>
//       </motion.div>

//       {/* Stack Navigation */}
//       <motion.div
//         className="flex gap-4 mb-16"
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, delay: 0.5 }}
//       >
//         {stackKeys.map((stack) => (
//           <motion.button
//             key={stack}
//             className={`px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-500 border-2 backdrop-blur-xl ${
//               selectedStack === stack
//                 ? 'text-white shadow-2xl'
//                 : 'text-white/60 border-white/20 hover:text-white/90 hover:border-white/40'
//             }`}
//             style={{
//               backgroundColor: selectedStack === stack ? `${skillStacks[stack].color}20` : 'rgba(0,0,0,0.3)',
//               borderColor: selectedStack === stack ? skillStacks[stack].color : 'rgba(255,255,255,0.2)',
//               boxShadow: selectedStack === stack ? `0 0 40px ${skillStacks[stack].color}40` : 'none'
//             }}
//             onClick={() => setSelectedStack(stack)}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             {skillStacks[stack].title}
//           </motion.button>
//         ))}
//       </motion.div>

//       {/* Skills Hexagon Grid */}
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={selectedStack}
//           className="relative"
//           initial={{ opacity: 0, rotateY: 90 }}
//           animate={{ opacity: 1, rotateY: 0 }}
//           exit={{ opacity: 0, rotateY: -90 }}
//           transition={{ duration: 0.6 }}
//         >
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
//             {skillStacks[selectedStack].skills.map((skill, index) => (
//               <motion.div
//                 key={skill.name}
//                 className="relative group"
//                 initial={{ opacity: 0, scale: 0, rotate: -180 }}
//                 animate={{ opacity: 1, scale: 1, rotate: 0 }}
//                 transition={{
//                   duration: 0.6,
//                   delay: index * 0.15,
//                   type: "spring",
//                   stiffness: 200
//                 }}
//                 onMouseEnter={() => setHoveredSkill(index)}
//                 onMouseLeave={() => setHoveredSkill(null)}
//               >
//                 {/* Hexagon Container */}
//                 <div className="relative w-36 h-36 lg:w-44 lg:h-44">
//                   {/* Outer Hexagon */}
//                   <motion.div
//                     className="absolute inset-0 rounded-3xl border-2 backdrop-blur-xl"
//                     style={{
//                       backgroundColor: `${skillStacks[selectedStack].color}10`,
//                       borderColor: hoveredSkill === index ? skillStacks[selectedStack].color : 'rgba(255,255,255,0.2)',
//                       transform: 'rotate(45deg)'
//                     }}
//                     animate={{
//                       borderColor: hoveredSkill === index ? skillStacks[selectedStack].color : 'rgba(255,255,255,0.2)',
//                       boxShadow: hoveredSkill === index
//                         ? `0 0 40px ${skillStacks[selectedStack].color}50, inset 0 0 20px ${skillStacks[selectedStack].color}20`
//                         : '0 10px 30px rgba(0,0,0,0.3)'
//                     }}
//                     whileHover={{
//                       scale: 1.1,
//                       rotate: '50deg'
//                     }}
//                     transition={{ duration: 0.3 }}
//                   />

//                   {/* Inner Content */}
//                   <div className="absolute inset-0 flex flex-col justify-center items-center p-4">
//                     <motion.div
//                       className="text-4xl mb-2"
//                       animate={{
//                         scale: hoveredSkill === index ? 1.2 : 1,
//                         rotate: hoveredSkill === index ? [0, 10, -10, 0] : 0
//                       }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       {skill.icon}
//                     </motion.div>

//                     <motion.h3
//                       className="text-lg font-bold text-center leading-tight mb-2"
//                       animate={{
//                         color: hoveredSkill === index ? skillStacks[selectedStack].color : '#ffffff'
//                       }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       {skill.name}
//                     </motion.h3>

//                     {/* Circular Progress */}
//                     <div className="relative w-12 h-12">
//                       <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 100 100">
//                         <circle
//                           cx="50"
//                           cy="50"
//                           r="45"
//                           stroke="rgba(255,255,255,0.1)"
//                           strokeWidth="6"
//                           fill="none"
//                         />
//                         <motion.circle
//                           cx="50"
//                           cy="50"
//                           r="45"
//                           stroke={skillStacks[selectedStack].color}
//                           strokeWidth="6"
//                           fill="none"
//                           strokeLinecap="round"
//                           initial={{ pathLength: 0 }}
//                           animate={{ pathLength: skill.mastery / 100 }}
//                           transition={{ duration: 1.5, delay: index * 0.2 }}
//                           style={{
//                             strokeDasharray: `${2 * Math.PI * 45}`,
//                             filter: `drop-shadow(0 0 8px ${skillStacks[selectedStack].color})`
//                           }}
//                         />
//                       </svg>
//                       <div className="absolute inset-0 flex items-center justify-center">
//                         <span className="text-xs font-bold text-white">{skill.mastery}%</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Floating Skill Details */}
//                   <AnimatePresence>
//                     {hoveredSkill === index && (
//                       <motion.div
//                         className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-xl border rounded-xl p-4 min-w-48"
//                         style={{ borderColor: skillStacks[selectedStack].color }}
//                         initial={{ opacity: 0, y: 10, scale: 0.9 }}
//                         animate={{ opacity: 1, y: 0, scale: 1 }}
//                         exit={{ opacity: 0, y: 10, scale: 0.9 }}
//                         transition={{ duration: 0.2 }}
//                       >
//                         <div className="text-center">
//                           <h4 className="font-bold text-white mb-1">{skill.name}</h4>
//                           <p className="text-sm text-white/70 mb-2">{skill.years} years experience</p>
//                           <div className="flex justify-center gap-1">
//                             {[...Array(5)].map((_, i) => (
//                               <div
//                                 key={i}
//                                 className={`w-2 h-2 rounded-full ${
//                                   i < Math.floor(skill.mastery / 20)
//                                     ? 'bg-current'
//                                     : 'bg-white/20'
//                                 }`}
//                                 style={{ color: skillStacks[selectedStack].color }}
//                               />
//                             ))}
//                           </div>
//                         </div>
//                         {/* Arrow */}
//                         <div
//                           className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-8 border-transparent"
//                           style={{ borderTopColor: skillStacks[selectedStack].color }}
//                         />
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </AnimatePresence>

//       {/* Floating Stats Panel */}
//       <motion.div
//         className="absolute top-20 right-8 bg-black/70 backdrop-blur-xl border border-white/20 rounded-2xl p-6 min-w-64"
//         initial={{ opacity: 0, x: 100 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.8, delay: 1 }}
//       >
//         <h3 className="text-xl font-bold mb-4 text-center">Stack Overview</h3>
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={selectedStack}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.3 }}
//           >
//             <div className="space-y-3">
//               <div className="flex items-center gap-3">
//                 <div
//                   className="w-4 h-4 rounded-full"
//                   style={{ backgroundColor: skillStacks[selectedStack].color }}
//                 />
//                 <span className="font-semibold">{skillStacks[selectedStack].title}</span>
//               </div>

//               <div className="text-sm text-white/70 space-y-1">
//                 <div>Skills: {skillStacks[selectedStack].skills.length}</div>
//                 <div>
//                   Avg Mastery: {Math.round(
//                     skillStacks[selectedStack].skills.reduce((sum, skill) => sum + skill.mastery, 0) /
//                     skillStacks[selectedStack].skills.length
//                   )}%
//                 </div>
//                 <div>
//                   Total Exp: {skillStacks[selectedStack].skills.reduce((sum, skill) => sum + skill.years, 0)} years
//                 </div>
//               </div>

//               {/* Mini Progress Bars */}
//               <div className="space-y-2 mt-4">
//                 {skillStacks[selectedStack].skills.map((skill, i) => (
//                   <div key={skill.name} className="flex items-center gap-2">
//                     <span className="text-xs w-16 truncate">{skill.name}</span>
//                     <div className="flex-1 bg-white/10 rounded-full h-1">
//                       <motion.div
//                         className="h-full rounded-full"
//                         style={{ backgroundColor: skillStacks[selectedStack].color }}
//                         initial={{ width: 0 }}
//                         animate={{ width: `${skill.mastery}%` }}
//                         transition={{ duration: 0.8, delay: i * 0.1 }}
//                       />
//                     </div>
//                     <span className="text-xs text-white/60 w-8">{skill.mastery}%</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </motion.div>
//         </AnimatePresence>
//       </motion.div>

//       {/* Neural Network Background */}
//       <div className="absolute inset-0 pointer-events-none">
//         {[...Array(12)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute w-2 h-2 rounded-full"
//             style={{
//               backgroundColor: `${skillStacks[selectedStack].color}40`,
//               left: `${10 + (i % 4) * 25}%`,
//               top: `${20 + Math.floor(i / 4) * 25}%`
//             }}
//             animate={{
//               scale: [1, 1.5, 1],
//               opacity: [0.3, 0.8, 0.3],
//               boxShadow: [`0 0 0px ${skillStacks[selectedStack].color}`, `0 0 20px ${skillStacks[selectedStack].color}`, `0 0 0px ${skillStacks[selectedStack].color}`]
//             }}
//             transition={{
//               duration: 2,
//               repeat: Infinity,
//               delay: i * 0.2,
//               ease: "easeInOut"
//             }}
//           />
//         ))}

//         {/* Connecting Lines */}
//         {[...Array(8)].map((_, i) => (
//           <motion.div
//             key={`line-${i}`}
//             className="absolute h-px"
//             style={{
//               backgroundColor: `${skillStacks[selectedStack].color}30`,
//               width: '120px',
//               left: `${15 + (i % 3) * 25}%`,
//               top: `${25 + Math.floor(i / 3) * 20}%`,
//               transformOrigin: 'left center',
//               transform: `rotate(${30 + i * 15}deg)`
//             }}
//             animate={{
//               opacity: [0.2, 0.6, 0.2],
//               scaleX: [0.8, 1.2, 0.8]
//             }}
//             transition={{
//               duration: 3,
//               repeat: Infinity,
//               delay: i * 0.3,
//               ease: "easeInOut"
//             }}
//           />
//         ))}
//       </div>

//       {/* Bottom Proficiency Indicator */}
//       <motion.div
//         className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4"
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, delay: 1.2 }}
//       >
//         <div className="text-sm text-white/60">Overall Proficiency:</div>
//         <div className="w-32 bg-white/10 rounded-full h-2">
//           <motion.div
//             className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
//             initial={{ width: 0 }}
//             animate={{ width: '87%' }}
//             transition={{ duration: 2, delay: 1.5 }}
//           />
//         </div>
//         <div className="text-sm font-bold text-white">87%</div>
//       </motion.div>
//     </div>
//   );
// };

// export default Skills;
// ______________________________________________________________________________________________________________________________option four
// import React, { useEffect, useState, useRef } from "react";
// import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

// const Skills = () => {
//   const [selectedSkillIndex, setSelectedSkillIndex] = useState(0);
//   const [isInteracting, setIsInteracting] = useState(false);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const containerRef = useRef(null);

//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);

//   const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
//   const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

//   const skillsData = [
//     {
//       name: "React",
//       mastery: 95,
//       exp: "3+ years",
//       color: "#61dafb",
//       gradient: "from-blue-400 to-cyan-300",
//       category: "Frontend",
//       projects: 25,
//       icon: "⚛️"
//     },
//     {
//       name: "Next.js",
//       mastery: 90,
//       exp: "2+ years",
//       color: "#ffffff",
//       gradient: "from-gray-200 to-white",
//       category: "Framework",
//       projects: 12,
//       icon: "▲"
//     },
//     {
//       name: "TypeScript",
//       mastery: 88,
//       exp: "2+ years",
//       color: "#3178c6",
//       gradient: "from-blue-600 to-blue-400",
//       category: "Language",
//       projects: 20,
//       icon: "📘"
//     },
//     {
//       name: "Tailwind",
//       mastery: 92,
//       exp: "2+ years",
//       color: "#06b6d4",
//       gradient: "from-cyan-500 to-teal-400",
//       category: "Styling",
//       projects: 18,
//       icon: "🎨"
//     },
//     {
//       name: "TanStack Query",
//       mastery: 85,
//       exp: "1+ years",
//       color: "#ff4154",
//       gradient: "from-red-500 to-pink-400",
//       category: "Data Fetching",
//       projects: 8,
//       icon: "🔄"
//     },
//     {
//       name: "Zustand",
//       mastery: 87,
//       exp: "1+ years",
//       color: "#f97316",
//       gradient: "from-orange-500 to-amber-400",
//       category: "State Management",
//       projects: 10,
//       icon: "🐻"
//     },
//     {
//       name: "Redux",
//       mastery: 83,
//       exp: "2+ years",
//       color: "#764abc",
//       gradient: "from-purple-600 to-violet-400",
//       category: "State Management",
//       projects: 15,
//       icon: "🔮"
//     },
//     {
//       name: "Three.js",
//       mastery: 84,
//       exp: "1+ years",
//       color: "#ffffff",
//       gradient: "from-white to-gray-300",
//       category: "3D Graphics",
//       projects: 6,
//       icon: "🌐"
//     }
//   ];

//   useEffect(() => {
//     if (!isInteracting) {
//       const interval = setInterval(() => {
//         setSelectedSkillIndex((prev) => (prev + 1) % skillsData.length);
//       }, 3000);
//       return () => clearInterval(interval);
//     }
//   }, [isInteracting, skillsData.length]);

//   const handleMouseMove = (e) => {
//     if (containerRef.current) {
//       const rect = containerRef.current.getBoundingClientRect();
//       const x = e.clientX - rect.left - rect.width / 2;
//       const y = e.clientY - rect.top - rect.height / 2;
//       mouseX.set(x);
//       mouseY.set(y);
//       setMousePosition({ x, y });
//     }
//   };

//   const selectedSkill = skillsData[selectedSkillIndex];

//   return (
//     <div
//       ref={containerRef}
//       className="flex justify-center items-center text-white w-full min-h-screen snap-start relative overflow-hidden"
//       onMouseMove={handleMouseMove}
//       onMouseEnter={() => setIsInteracting(true)}
//       onMouseLeave={() => setIsInteracting(false)}
//     >
//       {/* Dynamic Background Mesh */}
//       <div className="absolute inset-0 overflow-hidden">
//         <motion.div
//           className="absolute inset-0"
//           style={{
//             background: `radial-gradient(circle at ${mousePosition.x + 50}% ${mousePosition.y + 50}%, ${selectedSkill?.color}10 0%, transparent 50%)`
//           }}
//           animate={{
//             opacity: isInteracting ? 0.8 : 0.3
//           }}
//           transition={{ duration: 0.5 }}
//         />

//         {/* Floating Geometric Shapes */}
//         {[...Array(8)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute opacity-10"
//             style={{
//               left: `${(i * 12 + 10) % 90}%`,
//               top: `${(i * 15 + 5) % 80}%`,
//               width: `${20 + (i % 3) * 10}px`,
//               height: `${20 + (i % 3) * 10}px`,
//               background: `linear-gradient(45deg, ${skillsData[i % skillsData.length]?.color}40, transparent)`
//             }}
//             animate={{
//               rotate: [0, 360],
//               scale: [1, 1.2, 1],
//               opacity: [0.1, 0.3, 0.1]
//             }}
//             transition={{
//               duration: 15 + i * 2,
//               repeat: Infinity,
//               ease: "linear"
//             }}
//           />
//         ))}
//       </div>

//       <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24 max-w-7xl mx-auto px-8">

//         {/* 3D Skills Showcase */}
//         <motion.div
//           className="relative"
//           style={{
//             rotateX,
//             rotateY,
//             transformStyle: "preserve-3d"
//           }}
//         >
//           {/* Main Skills Sphere */}
//           <div className="relative w-80 h-80 lg:w-96 lg:h-96">
//             {/* Central Hub */}
//             <motion.div
//               className="absolute top-1/2 left-1/2 w-24 h-24 -translate-x-1/2 -translate-y-1/2 rounded-full z-30"
//               style={{
//                 background: `conic-gradient(from 0deg, ${skillsData.map((skill, i) =>
//                   `${skill.color} ${(i / skillsData.length) * 100}%, ${skill.color} ${((i + 1) / skillsData.length) * 100}%`
//                 ).join(', ')})`
//               }}
//               animate={{ rotate: 360 }}
//               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//             >
//               <div className="w-full h-full rounded-full bg-black/80 backdrop-blur-xl border-2 border-white/30 flex items-center justify-center">
//                 <motion.span
//                   className="text-2xl"
//                   key={selectedSkill?.icon}
//                   initial={{ scale: 0, rotate: -180 }}
//                   animate={{ scale: 1, rotate: 0 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   {selectedSkill?.icon}
//                 </motion.span>
//               </div>
//             </motion.div>

//             {/* Orbiting Skills */}
//             {skillsData.map((skill, index) => {
//               const angle = (index / skillsData.length) * 360;
//               const radian = (angle * Math.PI) / 180;
//               const radius = 140;
//               const x = Math.cos(radian) * radius;
//               const y = Math.sin(radian) * radius;
//               const isActive = selectedSkillIndex === index;

//               return (
//                 <motion.div
//                   key={skill.name}
//                   className="absolute cursor-pointer group"
//                   style={{
//                     left: `calc(50% + ${x}px)`,
//                     top: `calc(50% + ${y}px)`,
//                     transform: "translate(-50%, -50%)"
//                   }}
//                   onClick={() => setSelectedSkillIndex(index)}
//                   whileHover={{ scale: 1.2 }}
//                   whileTap={{ scale: 0.9 }}
//                 >
//                   {/* Skill Node */}
//                   <motion.div
//                     className={`relative w-16 h-16 rounded-2xl backdrop-blur-xl border-2 flex items-center justify-center overflow-hidden`}
//                     style={{
//                       background: `linear-gradient(135deg, ${skill.color}20, ${skill.color}05)`,
//                       borderColor: isActive ? skill.color : 'rgba(255,255,255,0.2)'
//                     }}
//                     animate={{
//                       scale: isActive ? 1.3 : 1,
//                       boxShadow: isActive
//                         ? `0 0 40px ${skill.color}50, 0 0 80px ${skill.color}20`
//                         : '0 0 20px rgba(0,0,0,0.3)'
//                     }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     {/* Animated Background */}
//                     <motion.div
//                       className="absolute inset-0 rounded-2xl"
//                       style={{
//                         background: `linear-gradient(45deg, ${skill.color}30, transparent, ${skill.color}30)`
//                       }}
//                       animate={{
//                         rotate: [0, 360]
//                       }}
//                       transition={{
//                         duration: 8,
//                         repeat: Infinity,
//                         ease: "linear"
//                       }}
//                     />

//                     {/* Skill Initial */}
//                     <span
//                       className="relative z-10 text-lg font-bold drop-shadow-lg"
//                       style={{ color: isActive ? skill.color : '#ffffff' }}
//                     >
//                       {skill.name.charAt(0)}
//                     </span>
//                   </motion.div>

//                   {/* Connecting Line */}
//                   <motion.div
//                     className="absolute w-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent"
//                     style={{
//                       height: `${radius - 60}px`,
//                       left: '50%',
//                       top: '100%',
//                       transformOrigin: 'top',
//                       transform: `translate(-50%, 0) rotate(${angle + 180}deg)`
//                     }}
//                     animate={{
//                       opacity: isActive ? 0.6 : 0.2,
//                       height: isActive ? `${radius - 40}px` : `${radius - 60}px`
//                     }}
//                     transition={{ duration: 0.3 }}
//                   />
//                 </motion.div>
//               );
//             })}
//           </div>
//         </motion.div>

//         {/* Skills Information Panel */}
//         <div className="flex flex-col gap-8 max-w-md">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={selectedSkillIndex}
//               className="space-y-6"
//               initial={{ opacity: 0, x: 50 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -50 }}
//               transition={{ duration: 0.4 }}
//             >
//               {/* Skill Header */}
//               <div className="space-y-4">
//                 <motion.h2
//                   className={`text-4xl lg:text-5xl font-bold bg-gradient-to-r ${selectedSkill.gradient} bg-clip-text text-transparent`}
//                   layoutId="skill-title"
//                 >
//                   {selectedSkill.name}
//                 </motion.h2>

//                 <div className="flex items-center gap-4">
//                   <motion.div
//                     className="px-3 py-1 rounded-full text-sm font-medium border"
//                     style={{
//                       backgroundColor: `${selectedSkill.color}20`,
//                       borderColor: `${selectedSkill.color}40`,
//                       color: selectedSkill.color
//                     }}
//                     layoutId="category-badge"
//                   >
//                     {selectedSkill.category}
//                   </motion.div>
//                   <span className="text-white/70 text-sm">{selectedSkill.exp}</span>
//                 </div>
//               </div>

//               {/* Mastery Visualization */}
//               <div className="space-y-4">
//                 <div className="flex justify-between items-center">
//                   <span className="text-white/80 font-medium">Mastery Level</span>
//                   <span className="text-2xl font-bold" style={{ color: selectedSkill.color }}>
//                     {selectedSkill.mastery}%
//                   </span>
//                 </div>

//                 {/* Circular Progress */}
//                 <div className="relative w-32 h-32 mx-auto">
//                   <svg className="w-32 h-32 -rotate-90" viewBox="0 0 100 100">
//                     {/* Background Circle */}
//                     <circle
//                       cx="50"
//                       cy="50"
//                       r="40"
//                       fill="none"
//                       stroke="rgba(255,255,255,0.1)"
//                       strokeWidth="8"
//                     />
//                     {/* Progress Circle */}
//                     <motion.circle
//                       cx="50"
//                       cy="50"
//                       r="40"
//                       fill="none"
//                       stroke={selectedSkill.color}
//                       strokeWidth="8"
//                       strokeLinecap="round"
//                       style={{
//                         pathLength: 0,
//                         filter: `drop-shadow(0 0 10px ${selectedSkill.color}40)`
//                       }}
//                       animate={{
//                         pathLength: selectedSkill.mastery / 100
//                       }}
//                       transition={{ duration: 1, ease: "easeInOut" }}
//                       strokeDasharray="0 1"
//                     />
//                   </svg>

//                   {/* Center Content */}
//                   <div className="absolute inset-0 flex flex-col items-center justify-center">
//                     <motion.span
//                       className="text-3xl mb-1"
//                       key={selectedSkill.icon}
//                       initial={{ scale: 0, rotate: -180 }}
//                       animate={{ scale: 1, rotate: 0 }}
//                       transition={{ duration: 0.5 }}
//                     >
//                       {selectedSkill.icon}
//                     </motion.span>
//                     <span className="text-xs text-white/60 font-medium">
//                       {selectedSkill.projects} projects
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Skill Details */}
//               <motion.div
//                 className="space-y-3"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 }}
//               >
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="bg-black/40 backdrop-blur-md rounded-xl p-3 border border-white/10">
//                     <div className="text-xs text-white/60 mb-1">Experience</div>
//                     <div className="text-sm font-semibold text-white">{selectedSkill.exp}</div>
//                   </div>
//                   <div className="bg-black/40 backdrop-blur-md rounded-xl p-3 border border-white/10">
//                     <div className="text-xs text-white/60 mb-1">Projects</div>
//                     <div className="text-sm font-semibold text-white">{selectedSkill.projects}</div>
//                   </div>
//                 </div>
//               </motion.div>
//             </motion.div>
//           </AnimatePresence>

//           {/* Skills Navigator */}
//           <div className="grid grid-cols-4 gap-2">
//             {skillsData.map((skill, index) => (
//               <motion.button
//                 key={skill.name}
//                 className="relative h-12 rounded-lg border border-white/20 bg-black/40 backdrop-blur-md overflow-hidden group"
//                 onClick={() => setSelectedSkillIndex(index)}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 animate={{
//                   borderColor: selectedSkillIndex === index ? `${skill.color}60` : 'rgba(255,255,255,0.2)'
//                 }}
//               >
//                 {/* Progress Background */}
//                 <motion.div
//                   className="absolute bottom-0 left-0 h-1"
//                   style={{ backgroundColor: skill.color }}
//                   animate={{
//                     width: selectedSkillIndex === index ? '100%' : '0%'
//                   }}
//                   transition={{ duration: 0.3 }}
//                 />

//                 {/* Skill Name */}
//                 <div className="flex items-center justify-center h-full px-2">
//                   <span className="text-xs font-medium text-white/80 group-hover:text-white transition-colors truncate">
//                     {skill.name}
//                   </span>
//                 </div>
//               </motion.button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Immersive Background Effects */}
//       <div className="absolute inset-0 pointer-events-none">
//         {/* Dynamic Particles */}
//         {[...Array(12)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute rounded-full"
//             style={{
//               width: `${4 + (i % 3) * 2}px`,
//               height: `${4 + (i % 3) * 2}px`,
//               backgroundColor: `${skillsData[i % skillsData.length]?.color}60`,
//               left: `${(i * 8 + 10) % 90}%`,
//               top: `${(i * 12 + 5) % 85}%`
//             }}
//             animate={{
//               y: [0, -20, 0],
//               opacity: [0.3, 0.8, 0.3],
//               scale: [1, 1.5, 1]
//             }}
//             transition={{
//               duration: 4 + (i % 3),
//               repeat: Infinity,
//               ease: "easeInOut",
//               delay: i * 0.3
//             }}
//           />
//         ))}

//         {/* Glowing Orbs */}
//         {[...Array(4)].map((_, i) => (
//           <motion.div
//             key={`orb-${i}`}
//             className="absolute rounded-full blur-xl"
//             style={{
//               width: "200px",
//               height: "200px",
//               background: `radial-gradient(circle, ${skillsData[i * 2]?.color}20, transparent)`,
//               left: `${20 + i * 20}%`,
//               top: `${15 + i * 20}%`
//             }}
//             animate={{
//               x: [0, 30, -30, 0],
//               y: [0, -20, 20, 0],
//               scale: [1, 1.2, 0.8, 1]
//             }}
//             transition={{
//               duration: 8 + i * 2,
//               repeat: Infinity,
//               ease: "easeInOut"
//             }}
//           />
//         ))}
//       </div>

//       {/* Floating Action Hint */}
//       <motion.div
//         className="absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/20 text-sm text-white/70"
//         animate={{
//           y: [0, -5, 0],
//           opacity: [0.7, 1, 0.7]
//         }}
//         transition={{
//           duration: 2,
//           repeat: Infinity,
//           ease: "easeInOut"
//         }}
//       >
//         Hover & Click to Explore • Auto-cycling Active
//       </motion.div>
//     </div>
//   );
// };

// export default Skills;

import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";

const Skills = () => {
  const [selectedStack, setSelectedStack] = useState("frontend");
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  type skillStacksType = {
    frontend: any;
    state: any;
    tools: any;
    animation: any;
  };
  const skillStacks: skillStacksType = {
    frontend: {
      title: "Frontend Development",
      icon: "mingcute:code-line",
      color: "from-cyan-400 to-blue-500",
      skills: [
        { name: "React", mastery: 95, years: 3, icon: "logos:react" },
        { name: "Next.js", mastery: 90, years: 2, icon: "logos:nextjs-icon" },
        {
          name: "TypeScript",
          mastery: 88,
          years: 2.5,
          icon: "logos:typescript-icon",
        },
        {
          name: "Tailwind CSS",
          mastery: 92,
          years: 2,
          icon: "logos:tailwindcss-icon",
        },
      ],
    },
    state: {
      title: "State Management",
      icon: "mingcute:settings-3-line",
      color: "from-purple-400 to-pink-500",
      skills: [
        {
          name: "Zustand",
          mastery: 87,
          years: 1.5,
          icon: "simple-icons:zustand",
        },
        { name: "Redux", mastery: 83, years: 2, icon: "logos:redux" },
        {
          name: "TanStack Query",
          mastery: 85,
          years: 1,
          icon: "logos:react-query-icon",
        },
        {
          name: "React Hook Form",
          mastery: 86,
          years: 2,
          icon: "simple-icons:reacthookform",
        },
      ],
    },
    animation: {
      title: "Animation & 3D",
      icon: "mingcute:magic-2-line",
      color: "from-amber-400 to-orange-500",
      skills: [
        { name: "Framer Motion", mastery: 90, years: 2, icon: "logos:framer" },
        { name: "Three.js", mastery: 84, years: 1, icon: "logos:threejs" },
        {
          name: "CSS Animations",
          mastery: 88,
          years: 2.5,
          icon: "logos:css-3",
        },
        { name: "GSAP", mastery: 80, years: 1, icon: "simple-icons:greensock" },
      ],
    },
    tools: {
      title: "Tools & Workflow",
      icon: "mingcute:tool-line",
      color: "from-green-400 to-emerald-500",
      skills: [
        { name: "Git & GitHub", mastery: 89, years: 3, icon: "logos:git-icon" },
        { name: "Vite", mastery: 85, years: 2, icon: "logos:vitejs" },
        { name: "Webpack", mastery: 78, years: 1.5, icon: "logos:webpack" },
        { name: "Docker", mastery: 75, years: 1, icon: "logos:docker-icon" },
      ],
    },
  };

  const stackKeys = Object.keys(skillStacks);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedStack((prev) => {
        const currentIndex = stackKeys.indexOf(prev);
        return stackKeys[(currentIndex + 1) % stackKeys.length];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [stackKeys]);

  const getOverallStats = () => {
    const allSkills = Object.values(skillStacks).flatMap(
      (stack) => stack.skills
    );
    const totalSkills = allSkills.length;
    const avgMastery = Math.round(
      allSkills.reduce((sum, skill) => sum + skill.mastery, 0) / totalSkills
    );
    const totalExperience = allSkills.reduce(
      (sum, skill) => sum + skill.years,
      0
    );

    return { totalSkills, avgMastery, totalExperience };
  };

  const stats = getOverallStats();

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen py-20 overflow-hidden"
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Floating Particles */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div> */}

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
            <span className="text-cyan-400 font-medium tracking-wider text-lg">
              Technical Skills
            </span>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
              Tech Mastery
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Expertise across modern web technologies and development tools
          </p>
        </div>

        {/* Stack Navigation */}
        <div
          className={`flex justify-center mb-12 transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="backdrop-blur-md bg-slate-800/30 border border-slate-700/50 rounded-2xl p-2 flex gap-2 flex-wrap justify-center">
            {stackKeys.map((stack) => (
              <button
                key={stack}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 ${
                  selectedStack === stack
                    ? `bg-gradient-to-r ${skillStacks[stack].color} text-white shadow-lg`
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
                onClick={() => setSelectedStack(stack)}
              >
                <Icon icon={skillStacks[stack].icon} width="20" height="20" />
                <span className="hidden sm:inline">
                  {skillStacks[stack].title}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Skills Grid */}
          <div className="lg:col-span-3">
            <div
              className={`transition-all duration-1000 delay-500 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {skillStacks[selectedStack].skills.map((skill, index) => (
                  <div
                    key={`${selectedStack}-${skill.name}`}
                    className="group backdrop-blur-md bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 hover:border-cyan-400/30 transition-all duration-500 hover:-translate-y-1 relative"
                    onMouseEnter={() => setHoveredSkill(index)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    {/* Skill Icon */}
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-slate-700/50 to-slate-800/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon icon={skill.icon} width="32" height="32" />
                      </div>
                    </div>

                    {/* Skill Name */}
                    <h3 className="text-lg font-bold text-white text-center mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                      {skill.name}
                    </h3>

                    {/* Circular Progress */}
                    <div className="relative w-20 h-20 mx-auto mb-4">
                      <svg
                        className="w-20 h-20 transform -rotate-90"
                        viewBox="0 0 100 100"
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="6"
                          fill="none"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="url(#gradient)"
                          strokeWidth="6"
                          fill="none"
                          strokeLinecap="round"
                          className="animate-draw-circle"
                          style={{
                            strokeDasharray: `${2 * Math.PI * 40}`,
                            strokeDashoffset: `${
                              2 * Math.PI * 40 * (1 - skill.mastery / 100)
                            }`,
                            animationDelay: `${index * 0.2}s`,
                          }}
                        />
                        <defs>
                          <linearGradient
                            id="gradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#06b6d4" />
                            <stop offset="100%" stopColor="#3b82f6" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold text-white">
                          {skill.mastery}%
                        </span>
                      </div>
                    </div>

                    {/* Experience */}
                    <div className="text-center">
                      <p className="text-sm text-slate-400">
                        {skill.years} year{skill.years !== 1 ? "s" : ""}{" "}
                        experience
                      </p>
                    </div>

                    {/* Hover Details */}
                    {hoveredSkill === index && (
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full backdrop-blur-md bg-slate-900/90 border border-cyan-400/50 rounded-xl p-3 min-w-max z-20">
                        <div className="text-center">
                          <h4 className="font-bold text-white text-sm mb-1">
                            {skill.name}
                          </h4>
                          <p className="text-xs text-slate-300 mb-2">
                            Mastery Level: {skill.mastery}%
                          </p>
                          <div className="flex justify-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-2 h-2 rounded-full ${
                                  i < Math.floor(skill.mastery / 20)
                                    ? "bg-cyan-400"
                                    : "bg-slate-600"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-cyan-400"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Side Panel - Stats */}
          <div className="lg:col-span-1">
            <div
              className={`backdrop-blur-md bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 transition-all duration-1000 delay-700 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-10 opacity-0"
              }`}
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Icon
                  icon="mingcute:chart-bar-line"
                  width="24"
                  height="24"
                  className="text-cyan-400"
                />
                Overview
              </h3>

              {/* Current Stack Info */}
              <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-slate-700/30 to-slate-800/30 border border-slate-600/30">
                <div className="flex items-center gap-3 mb-3">
                  <Icon
                    icon={skillStacks[selectedStack].icon}
                    width="20"
                    height="20"
                    className="text-cyan-400"
                  />
                  <span className="font-semibold text-white">
                    {skillStacks[selectedStack].title}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-slate-400">
                  <div>Skills: {skillStacks[selectedStack].skills.length}</div>
                  <div>
                    Avg Mastery:{" "}
                    {Math.round(
                      skillStacks[selectedStack].skills.reduce(
                        (sum, skill) => sum + skill.mastery,
                        0
                      ) / skillStacks[selectedStack].skills.length
                    )}
                    %
                  </div>
                </div>
              </div>

              {/* Overall Stats */}
              <div className="space-y-4">
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/20">
                  <div className="text-2xl font-bold text-white mb-1">
                    {stats.totalSkills}
                  </div>
                  <div className="text-sm text-slate-400">Total Skills</div>
                </div>

                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/20">
                  <div className="text-2xl font-bold text-white mb-1">
                    {stats.avgMastery}%
                  </div>
                  <div className="text-sm text-slate-400">Avg Mastery</div>
                </div>

                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-400/20">
                  <div className="text-2xl font-bold text-white mb-1">
                    {stats.totalExperience.toFixed(1)}
                  </div>
                  <div className="text-sm text-slate-400">Total Years</div>
                </div>
              </div>

              {/* Proficiency Bar */}
              <div className="mt-6">
                <div className="flex justify-between text-sm text-slate-400 mb-2">
                  <span>Overall Proficiency</span>
                  <span>{stats.avgMastery}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-1000 animate-fill-bar"
                    style={{ width: `${stats.avgMastery}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes draw-circle {
          0% {
            stroke-dashoffset: ${2 * Math.PI * 40};
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        @keyframes fill-bar {
          0% {
            width: 0%;
          }
          100% {
            width: var(--target-width);
          }
        }

        .animate-draw-circle {
          animation: draw-circle 1.5s ease-out forwards;
        }

        .animate-fill-bar {
          animation: fill-bar 2s ease-out 1s forwards;
          width: 0%;
        }
      `}</style>
    </div>
  );
};

export default Skills;
