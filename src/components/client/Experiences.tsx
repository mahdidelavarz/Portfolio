// "use client";
// import { useState, useEffect, useRef, useCallback, useMemo, memo } from "react";
// import { Icon } from "@iconify/react";

// interface ExperiencesProps {
//   scrollToSection?: (id: string) => void;
// }

// interface Experience {
//   readonly id: number;
//   readonly company: string;
//   readonly role: string;
//   readonly period: string;
//   readonly duration: string;
//   readonly location: string;
//   readonly type: string;
//   readonly icon: string;
//   readonly color: string;
//   readonly bgColor: string;
//   readonly glowColor: string;
//   readonly description: string;
//   readonly achievements: readonly string[];
//   readonly technologies: readonly string[];
//   readonly projects: readonly {
//     name: string;
//     description: string;
//     impact: string;
//   }[];
//   readonly responsibilities: readonly string[];
// }

// interface Tab {
//   readonly id: string;
//   readonly label: string;
//   readonly icon: string;
// }
// // Move all static data outside component
// const EXPERIENCES: readonly Experience[] = [
//   {
//     id: 0,
//     company: "Petco",
//     role: "Full-Stack Developer",
//     period: "2022 - Present",
//     duration: "2+ Years",
//     location: "Tabriz, Iran",
//     type: "Full-Time",
//     icon: "mingcute:building-2-line",
//     color: "from-cyan-400 to-blue-500",
//     bgColor: "from-cyan-400/10 to-blue-500/10",
//     glowColor: "cyan-400",
//     description:
//       "Leading the development of an enterprise ERP system from inception to deployment, architecting scalable solutions that serve thousands of users.",
//     achievements: [
//       "Architected and built the entire frontend infrastructure from scratch",
//       "Designed modular component library increasing development efficiency by 40%",
//       "Integrated complex APIs serving 10,000+ daily active users",
//       "Mentored junior developers and established coding standards",
//       "Optimized application performance resulting in 60% faster load times",
//     ],
//     technologies: [
//       "React",
//       "TypeScript",
//       "Next.js",
//       "Zustand",
//       "TanStack Query",
//       "Tailwind CSS",
//       "Three.js",
//       "IndexedDB",
//       "SQL Server",
//       "REST APIs",
//     ],
//     projects: [
//       {
//         name: "ERP Core System",
//         description: "Complete enterprise resource planning system",
//         impact: "10,000+ users",
//       },
//       {
//         name: "Real-time Dashboard",
//         description: "Live analytics and monitoring dashboard",
//         impact: "24/7 monitoring",
//       },
//       {
//         name: "Mobile PWA",
//         description: "Progressive web app for mobile users",
//         impact: "70% mobile adoption",
//       },
//     ],
//     responsibilities: [
//       "Lead frontend architecture and development decisions",
//       "Collaborate with backend teams on API design and integration",
//       "Mentor junior developers and conduct code reviews",
//       "Optimize application performance and user experience",
//       "Implement responsive design and accessibility standards",
//     ],
//   },
//   {
//     id: 1,
//     company: "LoveCode",
//     role: "Frontend Developer",
//     period: "2021 - 2022",
//     duration: "1 Year",
//     location: "Tehran, Iran",
//     type: "Full-Time",
//     icon: "mingcute:heart-line",
//     color: "from-orange-400 to-red-500",
//     bgColor: "from-orange-400/10 to-red-500/10",
//     glowColor: "orange-400",
//     description:
//       "Developed responsive web applications and collaborated with cross-functional teams to deliver pixel-perfect user interfaces.",
//     achievements: [
//       "Developed 15+ responsive web applications using React",
//       "Collaborated with UI/UX designers for pixel-perfect interfaces",
//       "Improved website performance by 45% through optimization",
//       "Integrated third-party APIs and payment gateways",
//       "Participated in agile development processes and code reviews",
//     ],
//     technologies: [
//       "React",
//       "JavaScript",
//       "CSS3",
//       "SASS",
//       "Redux",
//       "Axios",
//       "Bootstrap",
//       "Material-UI",
//       "Git",
//       "Webpack",
//     ],
//     projects: [
//       {
//         name: "E-commerce Platform",
//         description: "Full-featured online shopping experience",
//         impact: "1,000+ products",
//       },
//       {
//         name: "Corporate Website",
//         description: "Company landing page and blog",
//         impact: "50% traffic increase",
//       },
//       {
//         name: "Admin Dashboard",
//         description: "Content management system",
//         impact: "90% admin efficiency",
//       },
//     ],
//     responsibilities: [
//       "Develop responsive user interfaces with modern frameworks",
//       "Collaborate with design team on UI/UX implementation",
//       "Integrate RESTful APIs and third-party services",
//       "Optimize web applications for performance and accessibility",
//       "Participate in agile development cycles and sprint planning",
//     ],
//   },
//   {
//     id: 2,
//     company: "Freelance",
//     role: "Web Developer",
//     period: "2020 - 2021",
//     duration: "1+ Year",
//     location: "Remote",
//     type: "Contract",
//     icon: "mingcute:rocket-line",
//     color: "from-purple-400 to-indigo-600",
//     bgColor: "from-purple-400/10 to-indigo-600/10",
//     glowColor: "purple-400",
//     description:
//       "Worked with various clients to deliver custom web solutions, from small business websites to complex web applications.",
//     achievements: [
//       "Completed 20+ projects for diverse clients across industries",
//       "Built responsive websites with 100% client satisfaction",
//       "Implemented SEO practices resulting in 200% traffic increase",
//       "Developed custom WordPress themes and plugins",
//       "Managed full project lifecycle from gathering to deployment",
//     ],
//     technologies: [
//       "HTML5",
//       "CSS3",
//       "JavaScript",
//       "jQuery",
//       "WordPress",
//       "PHP",
//       "MySQL",
//       "Photoshop",
//       "Figma",
//     ],
//     projects: [
//       {
//         name: "Restaurant Website",
//         description: "Online menu and reservation system",
//         impact: "300% bookings",
//       },
//       {
//         name: "Portfolio Websites",
//         description: "Creative portfolios for artists and designers",
//         impact: "10+ clients",
//       },
//       {
//         name: "Business Landing Pages",
//         description: "Conversion-optimized landing pages",
//         impact: "25% avg CTR",
//       },
//     ],
//     responsibilities: [
//       "Gather requirements and translate into technical solutions",
//       "Design and develop custom websites and web applications",
//       "Implement SEO best practices and performance optimization",
//       "Provide ongoing maintenance and support to clients",
//       "Manage project timelines and client communication",
//     ],
//   },
// ] as const;

// const TECH_ICONS: Record<string, string> = {
//   React: "logos:react",
//   TypeScript: "logos:typescript-icon",
//   "Next.js": "logos:nextjs-icon",
//   Zustand: "tabler:brand-zulip",
//   "TanStack Query": "logos:react-query-icon",
//   "Tailwind CSS": "logos:tailwindcss-icon",
//   "Three.js": "logos:threejs",
//   IndexedDB: "mdi:database",
//   "SQL Server": "vscode-icons:file-type-sql",
//   "REST APIs": "mdi:api",
//   JavaScript: "logos:javascript",
//   CSS3: "logos:css-3",
//   SASS: "logos:sass",
//   Redux: "logos:redux",
//   Axios: "logos:axios",
//   Bootstrap: "logos:bootstrap",
//   "Material-UI": "logos:material-ui",
//   Git: "logos:git-icon",
//   Webpack: "logos:webpack",
//   HTML5: "logos:html-5",
//   jQuery: "logos:jquery",
//   WordPress: "logos:wordpress-icon",
//   PHP: "logos:php",
//   MySQL: "logos:mysql",
//   Photoshop: "logos:adobe-photoshop",
//   Figma: "logos:figma",
// } as const;

// const TABS: readonly Tab[] = [
//   {
//     id: "overview",
//     icon: "mingcute:eye-line",
//     label: "Overview",
//   },
//   {
//     id: "achievements",
//     icon: "mingcute:trophy-line",
//     label: "Achievements",
//   },
//   {
//     id: "projects",
//     icon: "mingcute:rocket-line",
//     label: "Projects",
//   },
//   {
//     id: "tech",
//     icon: "mingcute:code-line",
//     label: "Tech Stack",
//   },
// ] as const;

// const CAREER_STATS = [
//   {
//     value: "3+",
//     label: "Years Experience",
//     color: "text-cyan-400",
//   },
//   {
//     value: "50+",
//     label: "Projects Completed",
//     color: "text-purple-400",
//   },
//   {
//     value: "15+",
//     label: "Technologies",
//     color: "text-orange-400",
//   },
//   {
//     value: "100%",
//     label: "Client Satisfaction",
//     color: "text-green-400",
//   },
// ] as const;

// // Memoized components
// const TabButton = memo<{
//   tab: (typeof TABS)[0];
//   isActive: boolean;
//   currentExp: (typeof EXPERIENCES)[0];
//   onClick: (id: string) => void;
// }>(({ tab, isActive, currentExp, onClick }) => {
//   const handleClick = useCallback(() => onClick(tab.id), [tab.id, onClick]);

//   return (
//     <button
//       onClick={handleClick}
//       className={`px-8 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
//         isActive
//           ? `bg-gradient-to-r ${currentExp.color} text-white shadow-lg`
//           : "bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50 border border-slate-600/30"
//       }`}
//       aria-label={`View ${tab.label}`}
//     >
//       <Icon icon={tab.icon} width={18} height={18} />
//       <span>{tab.label}</span>
//     </button>
//   );
// });

// TabButton.displayName = "TabButton";

// const TimelineButton = memo<{
//   exp: (typeof EXPERIENCES)[0];
//   index: number;
//   isActive: boolean;
//   onClick: (index: number) => void;
// }>(({ exp, index, isActive, onClick }) => {
//   const handleClick = useCallback(() => onClick(index), [index, onClick]);

//   return (
//     <button
//       className={`w-full text-left p-4 rounded-xl transition-all duration-500 border group ${
//         isActive
//           ? `bg-gradient-to-r ${exp.bgColor} border-slate-600/50 scale-105`
//           : "bg-slate-800/30 border-slate-700/50 hover:border-slate-600/50 hover:bg-slate-800/50"
//       }`}
//       onClick={handleClick}
//       aria-label={`View ${exp.company} experience`}
//     >
//       <div className="flex items-center gap-3 mb-2">
//         <div
//           className={`w-10 h-10 bg-gradient-to-br ${exp.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
//         >
//           <Icon icon={exp.icon} width={20} height={20} className="text-white" />
//         </div>
//         <div>
//           <h4 className="font-bold text-white text-lg">{exp.company}</h4>
//           <p className="text-sm text-slate-400">{exp.period}</p>
//         </div>
//       </div>
//       <p className="text-base text-slate-300 mb-2">{exp.role}</p>
//       <div className="flex gap-2">
//         <span className="px-2 py-1 bg-slate-700/50 text-slate-400 text-sm rounded-full">
//           {exp.type}
//         </span>
//         <span className="px-2 py-1 bg-slate-700/50 text-slate-400 text-sm rounded-full">
//           {exp.duration}
//         </span>
//       </div>
//     </button>
//   );
// });

// TimelineButton.displayName = "TimelineButton";

// const TechStack = memo<{
//   technologies: readonly string[];
// }>(({ technologies }) => (
//   <div className="flex flex-wrap gap-3">
//     {technologies.map((tech) => (
//       <span
//         key={tech}
//         className="px-4 text-base py-3 bg-slate-800/50 text-slate-300 font-medium rounded-xl border border-slate-600/50 hover:border-purple-400/50 hover:bg-purple-400/10 hover:text-white transition-all duration-300 flex items-center gap-2"
//       >
//         <Icon
//           icon={TECH_ICONS[tech] || "mdi:code-tags"}
//           width={24}
//           height={24}
//         />
//         {tech}
//       </span>
//     ))}
//   </div>
// ));

// TechStack.displayName = "TechStack";

// const Experiences = memo<ExperiencesProps>(({ scrollToSection }) => {
//   const [activeExperience, setActiveExperience] = useState(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);
//   const [activeTab, setActiveTab] = useState("overview");
//   const [isVisible, setIsVisible] = useState(false);
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const intervalRef = useRef<NodeJS.Timeout | null>(null);

//   // Optimized intersection observer
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting && !isVisible) {
//           setIsVisible(true);
//         } else if (!entry.isIntersecting && isVisible) {
//           setIsAutoPlaying(false);
//           if (intervalRef.current) {
//             clearInterval(intervalRef.current);
//             intervalRef.current = null;
//           }
//         }
//       },
//       {
//         threshold: 0.1,
//         rootMargin: "100px",
//       }
//     );

//     const currentRef = sectionRef.current;
//     if (currentRef) {
//       observer.observe(currentRef);
//     }

//     return () => {
//       if (currentRef) {
//         observer.unobserve(currentRef);
//       }
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//       }
//     };
//   }, [isVisible]);

//   // Optimized auto-play effect
//   useEffect(() => {
//     if (!isAutoPlaying || !isVisible) {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//         intervalRef.current = null;
//       }
//       return;
//     }

//     intervalRef.current = setInterval(() => {
//       setActiveExperience((prev) => (prev + 1) % EXPERIENCES.length);
//     }, 6000);

//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//       }
//     };
//   }, [isAutoPlaying, isVisible]);

//   // Memoized handlers
//   const handlePlayPause = useCallback(() => {
//     setIsAutoPlaying((prev) => !prev);
//   }, []);

//   const handleExperienceChange = useCallback((index: number) => {
//     setActiveExperience(index);
//     setIsAutoPlaying(false);
//   }, []);

//   const handleTabChange = useCallback((tabId: string) => {
//     setActiveTab(tabId);
//   }, []);

//   const handleContactClick = useCallback(() => {
//     scrollToSection?.("contactme");
//   }, [scrollToSection]);

//   // Memoized current experience
//   const currentExp = useMemo(
//     () => EXPERIENCES[activeExperience],
//     [activeExperience]
//   );

//   // Memoized tab content
//   const tabContent = useMemo(() => {
//     switch (activeTab) {
//       case "overview":
//         return (
//           <div className="grid md:grid-cols-2 gap-8">
//             <div>
//               <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
//                 <Icon
//                   icon="mingcute:user-line"
//                   width={24}
//                   height={24}
//                   className={`text-${currentExp.glowColor}`}
//                 />
//                 Key Responsibilities
//               </h4>
//               <div className="space-y-3 text-lg">
//                 {currentExp.responsibilities.map((responsibility, index) => (
//                   <div
//                     key={index}
//                     className="flex items-start gap-3 p-3 bg-slate-800/30 rounded-lg border border-slate-700/30"
//                   >
//                     <div
//                       className={`w-2 h-2 bg-gradient-to-r ${currentExp.color} rounded-full mt-2 flex-shrink-0`}
//                     />
//                     <span className="text-slate-300">{responsibility}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div>
//               <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
//                 <Icon
//                   icon="mingcute:chart-line"
//                   width={24}
//                   height={24}
//                   className={`text-${currentExp.glowColor}`}
//                 />
//                 Impact Metrics
//               </h4>
//               <div className="grid grid-cols-2 gap-4">
//                 {currentExp.projects.map((project, index) => (
//                   <div
//                     key={index}
//                     className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/30"
//                   >
//                     <div
//                       className={`text-xl font-bold text-${currentExp.glowColor} mb-1`}
//                     >
//                       {project.impact.split(" ")[0]}
//                     </div>
//                     <div className="text-xs text-slate-400 uppercase tracking-wide">
//                       {project.impact.split(" ").slice(1).join(" ")}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         );

//       case "achievements":
//         return (
//           <div>
//             <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
//               <Icon
//                 icon="mingcute:trophy-line"
//                 width={24}
//                 height={24}
//                 className="text-amber-400"
//               />
//               Key Achievements
//             </h4>
//             <div className="grid gap-4">
//               {currentExp.achievements.map((achievement, index) => (
//                 <div
//                   key={index}
//                   className="flex items-start gap-4 p-6 bg-slate-800/30 rounded-xl border border-slate-700/30 hover:border-slate-600/50 hover:bg-slate-800/50 transition-all duration-300 group"
//                 >
//                   <div className="w-8 h-8 bg-amber-400/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-amber-400/30 transition-all duration-300">
//                     <Icon
//                       icon="mingcute:check-line"
//                       width={16}
//                       height={16}
//                       className="text-amber-400"
//                     />
//                   </div>
//                   <p className="text-slate-300 leading-relaxed text-lg">
//                     {achievement}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         );

//       case "projects":
//         return (
//           <div>
//             <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
//               <Icon
//                 icon="mingcute:rocket-line"
//                 width={24}
//                 height={24}
//                 className="text-green-400"
//               />
//               Notable Projects
//             </h4>
//             <div className="grid gap-6">
//               {currentExp.projects.map((project, index) => (
//                 <div
//                   key={index}
//                   className="p-6 bg-slate-800/30 border border-slate-700/30 rounded-xl hover:border-green-400/50 hover:bg-green-400/5 transition-all duration-300 group"
//                 >
//                   <div className="flex justify-between items-start mb-4">
//                     <h5 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors duration-300">
//                       {project.name}
//                     </h5>
//                     <span className="text-sm px-3 py-1 bg-green-400/20 text-green-400 rounded-full border border-green-400/30 font-medium">
//                       {project.impact}
//                     </span>
//                   </div>
//                   <p className="text-slate-400 leading-relaxed">
//                     {project.description}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         );

//       case "tech":
//         return (
//           <div>
//             <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
//               <Icon
//                 icon="mingcute:code-line"
//                 width={24}
//                 height={24}
//                 className="text-purple-400"
//               />
//               Technology Stack
//             </h4>
//             <TechStack technologies={currentExp.technologies} />
//           </div>
//         );

//       default:
//         return null;
//     }
//   }, [activeTab, currentExp]);

//   return (
//     <div
//       ref={sectionRef}
//       className="relative min-h-screen py-20 overflow-hidden"
//     >
//       <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
//         {/* Header Section */}
//         <div className="text-center mb-12 transition-all duration-1000">
//           <div className="flex items-center justify-center gap-4 mb-6">
//             <div className="w-20 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent" />
//             <span className="text-orange-400 font-bold tracking-wider text-lg uppercase">
//               Experience
//             </span>
//             <div className="w-20 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent" />
//           </div>
//           <h2 className="text-4xl lg:text-6xl font-bold mb-4">
//             <span className="bg-gradient-to-r from-cyan-300 via-slate-100 to-cyan-400 bg-clip-text text-transparent">
//               Professional Journey
//             </span>
//           </h2>
//           <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
//             A timeline of growth, innovation, and impactful contributions across
//             diverse projects and technologies
//           </p>
//         </div>

//         {/* Central Experience Showcase */}
//         <div className="relative">
//           {/* Main Experience Card */}
//           <div className="relative mx-auto max-w-5xl transition-all duration-1000 delay-200">
//             <div
//               className={`relative backdrop-blur-lg bg-slate-900/40 border border-slate-700/60 rounded-3xl overflow-hidden shadow-2xl shadow-${currentExp.glowColor}/20`}
//             >
//               {/* Experience Header */}
//               <div className="p-8 border-b border-slate-700/50">
//                 <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//                   <div className="flex items-center gap-6">
//                     <div
//                       className={`w-20 h-20 bg-gradient-to-br ${currentExp.color} rounded-2xl flex items-center justify-center shadow-xl shadow-${currentExp.glowColor}/30`}
//                     >
//                       <Icon
//                         icon={currentExp.icon}
//                         width={40}
//                         height={40}
//                         className="text-white"
//                       />
//                     </div>
//                     <div className="flex flex-col justify-start items-start">
//                       <h3 className="text-3xl font-bold text-white mb-2">
//                         {currentExp.company}
//                       </h3>
//                       <p
//                         className={`text-xl font-semibold bg-gradient-to-r ${currentExp.color} bg-clip-text text-transparent mb-2`}
//                       >
//                         {currentExp.role}
//                       </p>
//                       <div className="flex items-center gap-2 text-slate-400">
//                         <Icon
//                           icon="mingcute:location-line"
//                           width={16}
//                           height={16}
//                         />
//                         <span>{currentExp.location}</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex flex-wrap gap-3">
//                     <span
//                       className={`px-4 py-2 bg-gradient-to-r ${currentExp.bgColor} border border-slate-600/50 text-white font-medium rounded-xl`}
//                     >
//                       {currentExp.period}
//                     </span>
//                     <span className="px-4 py-2 bg-slate-800/50 border border-slate-600/50 text-slate-300 font-medium rounded-xl">
//                       {currentExp.type}
//                     </span>
//                     <span className="px-4 py-2 bg-slate-800/50 border border-slate-600/50 text-slate-300 font-medium rounded-xl">
//                       {currentExp.duration}
//                     </span>
//                   </div>
//                 </div>

//                 <p className="text-slate-300 leading-relaxed mt-6 max-w-4xl">
//                   {currentExp.description}
//                 </p>
//               </div>

//               {/* Navigation Controls */}
//               <div className="p-6 border-b border-slate-700/50 bg-slate-800/20">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-4">
//                     <button
//                       className="p-3 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50 hover:border-slate-500/50 rounded-xl transition-all duration-300 flex items-center justify-center"
//                       onClick={handlePlayPause}
//                       aria-label={
//                         isAutoPlaying ? "Pause slideshow" : "Play slideshow"
//                       }
//                     >
//                       <Icon
//                         icon={
//                           isAutoPlaying
//                             ? "mingcute:pause-fill"
//                             : "mingcute:play-fill"
//                         }
//                         width={20}
//                         height={20}
//                         className={`text-${currentExp.glowColor} ${
//                           isAutoPlaying ? "animate-pulse" : ""
//                         }`}
//                       />
//                     </button>

//                     <div className="text-slate-300 font-medium">
//                       <span className={`text-${currentExp.glowColor}`}>
//                         {activeExperience + 1}
//                       </span>
//                       <span className="text-slate-500 mx-2">/</span>
//                       <span className="text-slate-400">
//                         {EXPERIENCES.length}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="flex gap-2">
//                     {EXPERIENCES.map((_, index) => (
//                       <button
//                         key={index}
//                         className={`h-3 rounded-full transition-all duration-500 ${
//                           activeExperience === index
//                             ? `w-8 bg-gradient-to-r ${currentExp.color} shadow-lg`
//                             : "w-3 bg-slate-600/50 hover:bg-slate-500/50"
//                         }`}
//                         onClick={() => handleExperienceChange(index)}
//                         aria-label={`View experience ${index + 1}`}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Tab Navigation */}
//               <div className="p-6">
//                 <div className="flex flex-wrap justify-center gap-2 mb-8">
//                   {TABS.map((tab) => (
//                     <TabButton
//                       key={tab.id}
//                       tab={tab}
//                       isActive={activeTab === tab.id}
//                       currentExp={currentExp}
//                       onClick={handleTabChange}
//                     />
//                   ))}
//                 </div>

//                 {/* Tab Content */}
//                 <div className="min-h-[250px]">{tabContent}</div>
//               </div>
//             </div>
//           </div>

//           {/* Left Experience Timeline */}
//           <div className="absolute -left-55 top-0 w-72 transition-all duration-1000 delay-400 hidden xl:block">
//             <div className="backdrop-blur-lg bg-slate-900/40 border border-slate-700/60 rounded-2xl p-6 shadow-xl">
//               <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
//                 <Icon
//                   icon="mingcute:time-line"
//                   width={24}
//                   height={24}
//                   className="text-orange-400"
//                 />
//                 Timeline
//               </h3>

//               <div className="space-y-4">
//                 {EXPERIENCES.map((exp, index) => (
//                   <TimelineButton
//                     key={exp.id}
//                     exp={exp}
//                     index={index}
//                     isActive={activeExperience === index}
//                     onClick={handleExperienceChange}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Right Stats Panel */}
//           <div className="absolute -right-55 top-0 w-72 transition-all duration-1000 delay-600 hidden xl:block">
//             <div className="backdrop-blur-lg bg-slate-900/40 border border-slate-700/60 rounded-2xl p-6 shadow-xl">
//               <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
//                 <Icon
//                   icon="mingcute:chart-line"
//                   width={24}
//                   height={24}
//                   className="text-cyan-400"
//                 />
//                 Career Stats
//               </h3>

//               <div className="space-y-4">
//                 {CAREER_STATS.map((stat, index) => (
//                   <div
//                     key={index}
//                     className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/30"
//                   >
//                     <div className={`text-xl font-bold ${stat.color} mb-1`}>
//                       {stat.value}
//                     </div>
//                     <div className="text-sm text-slate-400">{stat.label}</div>
//                   </div>
//                 ))}
//               </div>

//               <div className="mt-6 pt-6 border-t border-slate-700/50">
//                 <button
//                   onClick={handleContactClick}
//                   className={`w-full px-4 py-3 bg-gradient-to-r ${currentExp.color} rounded-xl font-semibold text-white hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2`}
//                   aria-label="Contact me"
//                 >
//                   <Icon icon="mingcute:message-3-line" width={18} height={18} />
//                   <span>Get in Touch</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// });

// Experiences.displayName = "Experiences";

// export default Experiences;


"use client";
import { useState, useEffect, useRef, useCallback, useMemo, memo } from "react";
import { Icon } from "@iconify/react";

interface ExperiencesProps {
  scrollToSection?: (id: string) => void;
}

// Experience data structure remains the same but simplified
const EXPERIENCES = [
  {
    id: 0,
    company: "Petco",
    role: "Full-Stack Developer",
    period: "2022 - Present",
    duration: "2+ Years",
    location: "Tabriz, Iran",
    type: "Full-Time",
    icon: "lucide:building-2",
    color: "from-cyan-500 to-blue-600",
    lightColor: "from-cyan-100 to-blue-100",
    description: "Leading enterprise ERP system development, architecting scalable solutions for thousands of users.",
    highlights: [
      "Built frontend infrastructure from scratch",
      "40% faster development with component library",
      "Serving 10,000+ daily active users",
      "60% performance improvement"
    ],
    technologies: ["React", "TypeScript", "Next.js", "Zustand", "TanStack Query", "Tailwind CSS"],
    impact: {
      users: "10K+",
      performance: "98%",
      efficiency: "+40%"
    }
  },
  {
    id: 1,
    company: "LoveCode",
    role: "Frontend Developer",
    period: "2021 - 2022",
    duration: "1 Year",
    location: "Tehran, Iran",
    type: "Full-Time",
    icon: "lucide:heart",
    color: "from-rose-500 to-pink-600",
    lightColor: "from-rose-100 to-pink-100",
    description: "Developed responsive web applications with pixel-perfect UI implementations.",
    highlights: [
      "Developed 15+ responsive applications",
      "45% performance improvement",
      "Pixel-perfect UI/UX implementation",
      "Integrated payment gateways"
    ],
    technologies: ["React", "JavaScript", "SASS", "Redux", "Material-UI", "Git"],
    impact: {
      projects: "15+",
      performance: "+45%",
      satisfaction: "100%"
    }
  },
  {
    id: 2,
    company: "Freelance",
    role: "Web Developer",
    period: "2020 - 2021",
    duration: "1+ Year",
    location: "Remote",
    type: "Contract",
    icon: "lucide:rocket",
    color: "from-purple-500 to-indigo-600",
    lightColor: "from-purple-100 to-indigo-100",
    description: "Delivered custom web solutions for diverse clients across industries.",
    highlights: [
      "Completed 20+ client projects",
      "100% client satisfaction rate",
      "200% traffic increase with SEO",
      "Full project lifecycle management"
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "WordPress", "PHP", "MySQL"],
    impact: {
      clients: "20+",
      traffic: "+200%",
      retention: "100%"
    }
  }
];

// Define icon mapping for static icons used in the UI
const STATIC_ICONS = {
  Trophy: "lucide:trophy",
  Code: "lucide:code",
  Eye: "lucide:eye",
  MapPin: "lucide:map-pin",
  Calendar: "lucide:calendar",
  Clock: "lucide:clock",
  ChevronLeft: "lucide:chevron-left",
  ChevronRight: "lucide:chevron-right",
  Briefcase: "lucide:briefcase",
  Star: "lucide:star",
  TrendingUp: "lucide:trending-up",
  Users: "lucide:users",
  CheckCircle2: "lucide:check-circle-2",
  ArrowRight: "lucide:arrow-right"
};

function Experiences({ scrollToSection }: ExperiencesProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const currentExp = EXPERIENCES[activeIndex];

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? EXPERIENCES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === EXPERIENCES.length - 1 ? 0 : prev + 1));
  };

  // Touch handling for mobile swipe
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

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

  return (
    <div ref={containerRef} className="relative min-h-screen py-12 lg:py-20 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Professional Experience
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            My journey through different roles and companies
          </p>
        </div>

        {/* Mobile View - Unified Card Design */}
        <div className="lg:hidden">
          <div 
            className="relative"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Mobile Timeline Indicator - Horizontal */}
            <div className="flex items-center justify-between mb-6 px-2">
              {EXPERIENCES.map((exp, index) => (
                <button
                  key={exp.id}
                  onClick={() => setActiveIndex(index)}
                  className={`flex-1 mx-1 transition-all duration-300 ${
                    index === activeIndex ? 'scale-110' : 'scale-100'
                  }`}
                >
                  <div className={`w-full h-1 rounded-full transition-all duration-300 ${
                    index === activeIndex 
                      ? `bg-gradient-to-r ${exp.color}` 
                      : 'bg-slate-300 dark:bg-slate-700'
                  }`} />
                  <div className={`mt-2 text-xs font-medium transition-all duration-300 ${
                    index === activeIndex 
                      ? 'text-slate-900 dark:text-white' 
                      : 'text-slate-500 dark:text-slate-500'
                  }`}>
                    {exp.company}
                  </div>
                </button>
              ))}
            </div>

            {/* Mobile Experience Card */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
              {/* Card Header with Gradient */}
              <div className={`p-6 bg-gradient-to-r ${currentExp.color} text-white`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <Icon icon={currentExp.icon} className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{currentExp.company}</h3>
                      <p className="text-white/90">{currentExp.role}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                    {currentExp.type}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="flex items-center gap-1">
                    <Icon icon={STATIC_ICONS.Calendar} className="w-4 h-4" />
                    {currentExp.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon icon={STATIC_ICONS.MapPin} className="w-4 h-4" />
                    {currentExp.location}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  {currentExp.description}
                </p>

                {/* Key Highlights */}
                <div className="mb-6">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <Icon icon={STATIC_ICONS.Trophy} className="w-4 h-4 text-amber-500" />
                    Key Highlights
                  </h4>
                  <div className="space-y-2">
                    {currentExp.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Icon icon={STATIC_ICONS.CheckCircle2} className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-slate-600 dark:text-slate-300">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Impact Metrics */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {Object.entries(currentExp.impact).map(([key, value]) => (
                    <div key={key} className="text-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                      <div className={`text-lg font-bold bg-gradient-to-r ${currentExp.color} bg-clip-text text-transparent`}>
                        {value}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                        {key}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <Icon icon={STATIC_ICONS.Code} className="w-4 h-4 text-blue-500" />
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentExp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between p-4 border-t border-slate-200 dark:border-slate-700">
                <button
                  onClick={handlePrevious}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  aria-label="Previous experience"
                >
                  <Icon icon={STATIC_ICONS.ChevronLeft} className="w-5 h-5" />
                </button>
                
                <div className="flex gap-1">
                  {EXPERIENCES.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === activeIndex
                          ? `bg-gradient-to-r ${currentExp.color} w-6`
                          : 'bg-slate-300 dark:bg-slate-700'
                      }`}
                      aria-label={`Go to experience ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  aria-label="Next experience"
                >
                  <Icon icon={STATIC_ICONS.ChevronRight} className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop View - Side by Side Layout */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Left Timeline */}
          <div className="lg:col-span-4">
            <div className="sticky top-8">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Icon icon={STATIC_ICONS.Briefcase} className="w-5 h-5" />
                Career Timeline
              </h3>
              
              <div className="space-y-4">
                {EXPERIENCES.map((exp, index) => (
                  <button
                    key={exp.id}
                    onClick={() => setActiveIndex(index)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                      index === activeIndex
                        ? 'bg-white dark:bg-slate-800 shadow-lg scale-105 border-2 border-transparent'
                        : 'bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 border-2 border-transparent hover:border-slate-200 dark:hover:border-slate-700'
                    }`}
                    style={{
                      borderColor: index === activeIndex ? `var(--tw-gradient-from)` : undefined,
                      borderImage: index === activeIndex ? `linear-gradient(to right, var(--tw-gradient-stops)) 1` : undefined,
                      '--tw-gradient-from': index === activeIndex ? exp.color.split(' ')[1] : undefined,
                      '--tw-gradient-to': index === activeIndex ? exp.color.split(' ')[3] : undefined,
                      '--tw-gradient-stops': index === activeIndex ? `var(--tw-gradient-from), var(--tw-gradient-to)` : undefined,
                    } as React.CSSProperties}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        index === activeIndex
                          ? `bg-gradient-to-r ${exp.color} text-white`
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                      }`}>
                        <Icon icon={exp.icon} className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-semibold ${
                          index === activeIndex ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'
                        }`}>
                          {exp.company}
                        </h4>
                        <p className={`text-sm ${
                          index === activeIndex ? 'text-slate-700 dark:text-slate-300' : 'text-slate-500 dark:text-slate-500'
                        }`}>
                          {exp.role}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                          {exp.period} • {exp.duration}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Career Stats */}
              <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
                  <Icon icon={STATIC_ICONS.TrendingUp} className="w-4 h-4" />
                  Career Overview
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-white dark:bg-slate-800 rounded-lg">
                    <div className="text-xl font-bold text-blue-600 dark:text-blue-400">3+</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">Years</div>
                  </div>
                  <div className="text-center p-3 bg-white dark:bg-slate-800 rounded-lg">
                    <div className="text-xl font-bold text-purple-600 dark:text-purple-400">50+</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">Projects</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Details */}
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
              {/* Header */}
              <div className={`p-8 bg-gradient-to-r ${currentExp.color} text-white`}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                        <Icon icon={currentExp.icon} className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold">{currentExp.company}</h3>
                        <p className="text-xl text-white/90">{currentExp.role}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Icon icon={STATIC_ICONS.Calendar} className="w-4 h-4" />
                        {currentExp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon icon={STATIC_ICONS.MapPin} className="w-4 h-4" />
                        {currentExp.location}
                      </span>
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                        {currentExp.type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-8">
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
                  {currentExp.description}
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Highlights */}
                  <div>
                    <h4 className="font-semibold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                      <Icon icon={STATIC_ICONS.Trophy} className="w-5 h-5 text-amber-500" />
                      Key Achievements
                    </h4>
                    <div className="space-y-3">
                      {currentExp.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-700/30 rounded-lg">
                          <Icon icon={STATIC_ICONS.CheckCircle2} className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700 dark:text-slate-300">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Impact & Tech */}
                  <div>
                    {/* Impact Metrics */}
                    <h4 className="font-semibold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                      <Icon icon={STATIC_ICONS.Star} className="w-5 h-5 text-yellow-500" />
                      Impact Metrics
                    </h4>
                    <div className="grid grid-cols-3 gap-3 mb-8">
                      {Object.entries(currentExp.impact).map(([key, value]) => (
                        <div key={key} className="text-center p-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700/30 dark:to-slate-700/50 rounded-xl">
                          <div className={`text-2xl font-bold bg-gradient-to-r ${currentExp.color} bg-clip-text text-transparent`}>
                            {value}
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-400 capitalize mt-1">
                            {key}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Technologies */}
                    <h4 className="font-semibold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                      <Icon icon={STATIC_ICONS.Code} className="w-5 h-5 text-blue-500" />
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentExp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 rounded-lg hover:shadow-md transition-shadow"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="p-6 bg-slate-50 dark:bg-slate-700/30 border-t border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => scrollToSection?.("contactme")}
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Let's Work Together
                  <Icon icon={STATIC_ICONS.ArrowRight} className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Experiences;