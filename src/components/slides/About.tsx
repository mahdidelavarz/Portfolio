// import { motion } from "framer-motion";
// import { Icon } from "@iconify/react/dist/iconify.js";
// import { useState } from "react";

// function About() {
//   const [activeCard, setActiveCard] = useState(null);

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.15,
//         delayChildren: 0.2
//       }
//     }
//   };

//   const cardVariants = {
//     hidden: { 
//       opacity: 0, 
//       y: 80,
//       scale: 0.8
//     },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       scale: 1,
//       transition: {
//         type: "spring",
//         stiffness: 80,
//         damping: 20,
//         duration: 1
//       }
//     }
//   };

//   const titleVariants = {
//     hidden: { opacity: 0, y: -50 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         damping: 15,
//         duration: 1.2
//       }
//     }
//   };

//   const cards = [
//     {
//       id: 1,
//       icon: "material-symbols:person-4",
//       title: "Who I Am",
//       gradient: "from-cyan-500/15 to-blue-600/15",
//       borderColor: "border-cyan-400/30",
//       iconColor: "text-cyan-400",
//       glowColor: "shadow-cyan-400/20",
//       items: [
//         "29 y/o frontend developer with 6+ years of experience",
//         "Passionate about clean code & pixel-perfect UIs",
//         "Always learning modern frontend technologies"
//       ]
//     },
//     {
//       id: 2,
//       icon: "material-symbols:code",
//       title: "What I Do",
//       gradient: "from-teal-500/15 to-emerald-600/15",
//       borderColor: "border-teal-400/30",
//       iconColor: "text-teal-400",
//       glowColor: "shadow-teal-400/20",
//       items: [
//         "Develop fast, accessible & visually polished frontends",
//         "Refactor & optimize for better performance",
//         "Provide framework & UX enhancement guidance"
//       ]
//     },
//     {
//       id: 3,
//       icon: "material-symbols:handshake",
//       title: "How I Work",
//       gradient: "from-indigo-500/15 to-purple-600/15",
//       borderColor: "border-indigo-400/30",
//       iconColor: "text-indigo-400",
//       glowColor: "shadow-indigo-400/20",
//       items: [
//         "Team-first mindset with smooth collaboration",
//         "Clear communication bridging tech & non-tech teams",
//         "Adaptable & solution-driven approach"
//       ]
//     },
//     {
//       id: 4,
//       icon: "material-symbols:star",
//       title: "Why Choose Me",
//       gradient: "from-orange-500/15 to-red-600/15",
//       borderColor: "border-orange-400/30",
//       iconColor: "text-orange-400",
//       glowColor: "shadow-orange-400/20",
//       items: [
//         "Reliable & deadline-oriented delivery",
//         "User-focused aesthetic & functional balance",
//         "Low ego, high impact teamwork priority"
//       ]
//     }
//   ];

//   return (
//     <div className="w-full h-screen relative overflow-hidden snap-start">
//       {/* Animated title */}
//       <motion.div
//         className="absolute top-8 left-1/2 transform -translate-x-1/2 z-30"
//         variants={titleVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         <motion.h1 
//           className="text-4xl md:text-6xl font-bold text-white text-center tracking-wide"
//           animate={{
//             textShadow: [
//               "0 0 20px rgba(255,255,255,0.3)",
//               "0 0 40px rgba(255,255,255,0.6)", 
//               "0 0 20px rgba(255,255,255,0.3)"
//             ]
//           }}
//           transition={{
//             duration: 4,
//             repeat: Infinity,
//             ease: "easeInOut"
//           }}
//         >
//           About{" "}
//           <motion.span 
//             className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"
//             animate={{
//               filter: ["hue-rotate(0deg)", "hue-rotate(60deg)", "hue-rotate(0deg)"]
//             }}
//             transition={{
//               duration: 6,
//               repeat: Infinity,
//               ease: "easeInOut"
//             }}
//           >
//             Me
//           </motion.span>
//         </motion.h1>
//       </motion.div>

//       {/* Main grid layout */}
//       <motion.div 
//         className="absolute inset-0 pt-32 pb-12 px-8 md:px-16 lg:px-20"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
//           {cards.map((card, index) => (
//             <motion.div
//               key={card.id}
//               className="relative group"
//               variants={cardVariants}
//               onHoverStart={() => setActiveCard(card.id)}
//               onHoverEnd={() => setActiveCard(null)}
//               whileHover={{
//                 scale: 1.03,
//                 z: 10,
//                 transition: { type: "spring", stiffness: 300, damping: 30 }
//               }}
//             >
//               <motion.div
//                 className={`relative h-full bg-gradient-to-br ${card.gradient} backdrop-blur-lg border ${card.borderColor} rounded-2xl p-6 ${card.glowColor} shadow-2xl overflow-hidden`}
//                 animate={{
//                   boxShadow: activeCard === card.id
//                     ? `0 20px 40px -10px rgba(0, 0, 0, 0.4), 0 0 25px ${card.glowColor.split('/')[0].replace('shadow-', 'rgba(').replace('-400', ', 0.3)')}`
//                     : "0 10px 20px -5px rgba(0, 0, 0, 0.3)"
//                 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 {/* Animated background overlay */}
//                 <motion.div
//                   className={`absolute inset-0 bg-gradient-to-br ${card.gradient.replace('/15', '/5')} opacity-0`}
//                   animate={{
//                     opacity: activeCard === card.id ? 1 : 0,
//                   }}
//                   transition={{ duration: 0.3 }}
//                 />

//                 {/* Header */}
//                 <motion.div 
//                   className="flex items-center gap-4 mb-6 relative z-10"
//                   whileHover={{ x: 3 }}
//                 >
//                   <motion.div
//                     className={`p-3 rounded-xl bg-gradient-to-br ${card.gradient} border ${card.borderColor} backdrop-blur-sm`}
//                     whileHover={{ 
//                       rotate: [0, -10, 10, 0],
//                       scale: 1.1
//                     }}
//                     transition={{ 
//                       rotate: { duration: 0.6 },
//                       scale: { type: "spring", stiffness: 300 }
//                     }}
//                   >
//                     <Icon
//                       icon={card.icon}
//                       width="28"
//                       height="28"
//                       className={`${card.iconColor} drop-shadow-lg`}
//                     />
//                   </motion.div>
//                   <motion.h2 
//                     className={`text-xl md:text-2xl font-bold ${card.iconColor}`}
//                     animate={{
//                       textShadow: activeCard === card.id 
//                         ? "0 0 15px currentColor" 
//                         : "0 2px 4px rgba(0,0,0,0.5)"
//                     }}
//                   >
//                     {card.title}
//                   </motion.h2>
//                 </motion.div>

//                 {/* Content */}
//                 <motion.div className="space-y-3 relative z-10">
//                   {card.items.map((item, itemIndex) => (
//                     <motion.div
//                       key={itemIndex}
//                       className="flex items-start gap-3 group/item"
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ 
//                         delay: 0.6 + (index * 0.1) + (itemIndex * 0.1),
//                         type: "spring",
//                         stiffness: 150
//                       }}
//                       whileHover={{ x: 6 }}
//                     >
//                       <motion.div
//                         className={`w-2 h-2 rounded-full bg-gradient-to-r ${card.gradient.replace('/15', '')} mt-2 shadow-sm`}
//                         animate={{
//                           scale: activeCard === card.id ? [1, 1.3, 1] : 1,
//                           boxShadow: activeCard === card.id 
//                             ? `0 0 10px ${card.iconColor.replace('text-', '').replace('-400', '')}` 
//                             : "0 0 3px rgba(0,0,0,0.3)"
//                         }}
//                         transition={{
//                           scale: { 
//                             duration: 2, 
//                             repeat: Infinity,
//                             ease: "easeInOut"
//                           }
//                         }}
//                       />
//                       <motion.p
//                         className="text-gray-200 text-sm md:text-base leading-relaxed group-hover/item:text-white transition-colors duration-200"
//                         animate={{
//                           opacity: activeCard === card.id ? 1 : 0.85
//                         }}
//                       >
//                         {item}
//                       </motion.p>
//                     </motion.div>
//                   ))}
//                 </motion.div>

//                 {/* Floating orbs inside cards */}
//                 {activeCard === card.id && (
//                   <div className="absolute inset-0 pointer-events-none overflow-hidden">
//                     {[...Array(4)].map((_, i) => (
//                       <motion.div
//                         key={i}
//                         className={`absolute w-1 h-1 rounded-full ${card.iconColor.replace('text-', 'bg-')} opacity-60`}
//                         initial={{
//                           x: Math.random() * 300,
//                           y: Math.random() * 200,
//                           scale: 0
//                         }}
//                         animate={{
//                           y: [Math.random() * 200, -20],
//                           scale: [0, 1, 0],
//                           opacity: [0, 0.8, 0]
//                         }}
//                         transition={{
//                           duration: 4,
//                           delay: i * 0.5,
//                           repeat: Infinity,
//                           ease: "easeOut"
//                         }}
//                       />
//                     ))}
//                   </div>
//                 )}
//               </motion.div>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>

//       {/* Depth indicators */}
//       <div className="absolute inset-0 pointer-events-none overflow-hidden">
//         {[...Array(4)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
//             style={{ top: `${25 + i * 20}%` }}
//             animate={{
//               opacity: [0.05, 0.15, 0.05],
//               scaleX: [0.7, 1.1, 0.7],
//             }}
//             transition={{
//               duration: 6 + i,
//               repeat: Infinity,
//               delay: i * 1.5,
//               ease: "easeInOut"
//             }}
//           />
//         ))}
//       </div>

//       {/* Corner accent */}
//       <motion.div
//         className="absolute bottom-6 right-6 z-20"
//         initial={{ opacity: 0, scale: 0 }}
//         animate={{ opacity: 0.3, scale: 1 }}
//         transition={{ delay: 1.5, type: "spring" }}
//       >
//         <motion.div
//           className="w-20 h-20 border border-white/20 rounded-full backdrop-blur-sm bg-white/5 flex items-center justify-center"
//           animate={{
//             rotate: 360,
//             boxShadow: [
//               "0 0 20px rgba(6, 182, 212, 0.2)",
//               "0 0 40px rgba(6, 182, 212, 0.4)",
//               "0 0 20px rgba(6, 182, 212, 0.2)"
//             ]
//           }}
//           transition={{
//             rotate: { duration: 25, repeat: Infinity, ease: "linear" },
//             boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
//           }}
//         >
//           <Icon icon="material-symbols:waves" width="28" height="28" className="text-cyan-400" />
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// }

// export default About;



//!version 2
import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

const About = () => {
  const [activeTab, setActiveTab] = useState('story');
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
      controls.start('visible');
    }
  }, [isInView, controls]);

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, delay: 0.2, ease: "easeOut" }
    }
  };

  const statsVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: { duration: 0.6, delay: 0.4, type: "spring", stiffness: 200 }
    }
  };

  const stats = [
    { label: "Years Experience", value: "3+", icon: "⏱️" },
    { label: "Projects Completed", value: "50+", icon: "🚀" },
    { label: "Technologies", value: "15+", icon: "⚡" },
    { label: "Coffee Cups", value: "∞", icon: "☕" }
  ];

  const tabs = {
    story: {
      title: "My Story",
      content: (
        <div className="space-y-6">
          <p className="text-lg text-white/80 leading-relaxed">
            My journey into web development began during my computer science studies, where I discovered 
            the perfect blend of creativity and logic that frontend development offers. What started as 
            curiosity about how websites work evolved into a passion for creating seamless user experiences.
          </p>
          <p className="text-lg text-white/80 leading-relaxed">
            Over the past 3 years, I've evolved from a junior developer at LoveCode to a full-stack 
            developer at Petco, where I've been instrumental in building an enterprise ERP system from 
            the ground up. My expertise lies in React ecosystem, but I'm always eager to explore new 
            technologies and push the boundaries of web development.
          </p>
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-xl p-6">
            <h4 className="text-xl font-semibold text-cyan-400 mb-3">Philosophy</h4>
            <p className="text-white/70">
              "Clean code is not written by following a set of rules. You don't become a software 
              craftsman by learning a list of heuristics. Professionalism and craftsmanship come 
              from values that drive disciplines."
            </p>
          </div>
        </div>
      )
    },
    journey: {
      title: "Career Journey",
      content: (
        <div className="space-y-8">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-amber-500"></div>
            
            <div className="space-y-8">
              <motion.div
                className="relative flex items-start gap-6"
                variants={contentVariants}
              >
                <div className="relative z-10 w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">3</span>
                </div>
                <div className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                  <h4 className="text-xl font-semibold text-amber-400 mb-2">Full-Stack Developer</h4>
                  <p className="text-white/60 mb-2">Petco • 2022 - Present</p>
                  <p className="text-white/80">
                    Leading the development of an enterprise ERP system, architecting the entire 
                    frontend infrastructure from scratch. Working with React, TypeScript, and modern 
                    state management solutions.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="relative flex items-start gap-6"
                variants={contentVariants}
              >
                <div className="relative z-10 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">2</span>
                </div>
                <div className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                  <h4 className="text-xl font-semibold text-purple-400 mb-2">Frontend Developer</h4>
                  <p className="text-white/60 mb-2">LoveCode • 2021 - 2022</p>
                  <p className="text-white/80">
                    Developed responsive web applications using React and modern CSS frameworks. 
                    Collaborated with design teams to implement pixel-perfect user interfaces.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="relative flex items-start gap-6"
                variants={contentVariants}
              >
                <div className="relative z-10 w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">1</span>
                </div>
                <div className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                  <h4 className="text-xl font-semibold text-cyan-400 mb-2">Computer Science Student</h4>
                  <p className="text-white/60 mb-2">University • 2019 - 2023</p>
                  <p className="text-white/80">
                    Studied computer science fundamentals while building side projects and learning 
                    web development through online courses and practical experience.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )
    },
    values: {
      title: "Core Values",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: "🎯",
              title: "Precision",
              description: "Every pixel matters. I believe in creating interfaces that are not just functional, but pixel-perfect and delightful to use."
            },
            {
              icon: "🚀",
              title: "Innovation",
              description: "Staying ahead of the curve with cutting-edge technologies and pushing the boundaries of what's possible on the web."
            },
            {
              icon: "🤝",
              title: "Collaboration",
              description: "Great products are built by great teams. I thrive in collaborative environments and value diverse perspectives."
            },
            {
              icon: "📈",
              title: "Growth",
              description: "Continuous learning is key in tech. I'm always exploring new frameworks, patterns, and best practices to improve my craft."
            }
          ].map((value, index) => (
            <motion.div
              key={value.title}
              className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300"
              variants={statsVariants}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-3xl mb-4">{value.icon}</div>
              <h4 className="text-xl font-semibold text-white mb-3">{value.title}</h4>
              <p className="text-white/70">{value.description}</p>
            </motion.div>
          ))}
        </div>
      )
    }
  };

  return (
    <motion.section
      ref={ref}
      className="w-full min-h-screen snap-start flex flex-col justify-center px-8 lg:px-16 py-16 text-white relative overflow-hidden"
      initial="hidden"
      animate={controls}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full"
            style={{
              background: `radial-gradient(circle, ${
                ['#00d4ff20', '#ff6b6b20', '#4ecdc420', '#a8e6cf20'][i % 4]
              } 0%, transparent 70%)`,
              left: `${10 + (i % 4) * 25}%`,
              top: `${10 + Math.floor(i / 4) * 25}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.div
        className="text-center mb-16"
        variants={tabVariants}
      >
        <motion.h1 
          className="text-5xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          animate={{ 
            backgroundPosition: isVisible ? ['0% 50%', '100% 50%', '0% 50%'] : '0% 50%' 
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        >
          ABOUT ME
        </motion.h1>
        <motion.p 
          className="text-xl text-white/70 max-w-2xl mx-auto"
          variants={contentVariants}
        >
          Get to know the developer behind the code
        </motion.p>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile */}
          <motion.div
            className="lg:col-span-1"
            variants={contentVariants}
          >
            <div className="sticky top-8">
              <div className="bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-xl border border-white/20 rounded-2xl p-8 mb-8">
                <div className="w-32 h-32 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 flex items-center justify-center text-4xl font-black text-white">
                  MD
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">Mahdi Delavar</h3>
                  <p className="text-white/60 mb-6">Full-Stack Developer</p>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        className="text-center"
                        variants={statsVariants}
                        whileHover={{ scale: 1.1 }}
                      >
                        <div className="text-2xl mb-1">{stat.icon}</div>
                        <div className="text-xl font-bold text-cyan-400">{stat.value}</div>
                        <div className="text-xs text-white/60">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="space-y-2">
                {Object.entries(tabs).map(([key, tab]) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`w-full text-left px-6 py-4 rounded-xl transition-all duration-300 ${
                      activeTab === key
                        ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-white shadow-lg'
                        : 'bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {tab.title}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            className="lg:col-span-2"
            variants={contentVariants}
          >
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 min-h-[600px]">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-3xl font-bold mb-8 text-gradient bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  {tabs[activeTab].title}
                </h2>
                {tabs[activeTab].content}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <motion.div
        className="absolute top-8 right-8 flex flex-col gap-4"
        variants={statsVariants}
      >
        <motion.button
          className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-white shadow-lg"
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
        >
          💼
        </motion.button>
        <motion.button
          className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg"
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
        >
          📧
        </motion.button>
      </motion.div>
    </motion.section>
  );
};

export default About;