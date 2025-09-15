
// import React, { useState, useEffect } from 'react';

// const Experiences = () => {
//   const [activeExperience, setActiveExperience] = useState(0);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//     };
//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);

//   const experiences = [
//     {
//       id: 1,
//       title: 'Senior Frontend Developer',
//       company: 'Petco Company',
//       duration: '2022 - 2024',
//       location: 'Remote',
//       type: 'Full-time',
//       description: 'Led the development of comprehensive ERP system using modern React ecosystem, transforming business operations and user experience.',
//       achievements: [
//         'Architected and built scalable ERP system from ground up using React and TypeScript',
//         'Implemented real-time data synchronization reducing system latency by 60%',
//         'Designed responsive component library used across 15+ internal applications',
//         'Integrated PWA capabilities enabling offline functionality for field workers',
//         'Optimized application performance reducing load times by 40% and improving UX',
//         'Mentored junior developers and established coding standards for the team'
//       ],
//       technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'TanStack Query', 'PWA'],
//       icon: 'mdi:office-building',
//       color: 'from-cyan-400 to-blue-500'
//     },
//     {
//       id: 2,
//       title: 'Full Stack Developer',
//       company: 'Freelance Projects',
//       duration: '2021 - 2022',
//       location: 'Remote',
//       type: 'Contract',
//       description: 'Delivered multiple high-impact web applications for various clients, specializing in modern React solutions and user experience optimization.',
//       achievements: [
//         'Developed 8+ custom web applications with React and modern tooling',
//         'Implemented complex state management solutions using Redux and Zustand',
//         'Created interactive 3D experiences using Three.js for enhanced user engagement',
//         'Built multilingual applications with comprehensive i18n support',
//         'Integrated advanced form handling with React Hook Form reducing validation errors',
//         'Delivered projects 20% ahead of schedule with 100% client satisfaction'
//       ],
//       technologies: ['React', 'Three.js', 'Redux', 'Zustand', 'Framer Motion', 'IndexedDB'],
//       icon: 'mdi:laptop-account',
//       color: 'from-purple-400 to-pink-500'
//     }
//   ];

//   const stats = [
//     { label: 'Years Experience', value: '2+', icon: 'mdi:calendar-clock' },
//     { label: 'Projects Delivered', value: '15+', icon: 'mdi:rocket-launch' },
//     { label: 'Code Commits', value: '1000+', icon: 'mdi:source-commit' },
//     { label: 'Client Satisfaction', value: '100%', icon: 'mdi:heart' }
//   ];

//   return (
//     <div className="h-screen w-full bg-transparent text-white relative overflow-hidden w-full h-screen snap-start flex items-center justify-center ">
//       {/* Animated background elements */}
//       <div className="absolute inset-0 pointer-events-none">
//         {[...Array(20)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-pulse"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 3}s`,
//               animationDuration: `${2 + Math.random() * 2}s`
//             }}
//           />
//         ))}
//       </div>

//       {/* Mouse follow gradient */}
//       <div 
//         className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-cyan-400/10 to-blue-500/10 blur-3xl pointer-events-none transition-all duration-300"
//         style={{
//           left: mousePosition.x - 192,
//           top: mousePosition.y - 192,
//         }}
//       />

//       <div className="h-full flex flex-col max-w-7xl mx-auto px-6 py-8">
        
//         {/* Header */}
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center space-x-4 mb-6">
//             <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-cyan-400/30 to-blue-500/30 flex items-center justify-center backdrop-blur-md border border-cyan-400/30">
//               <iconify-icon icon="mdi:briefcase-variant" class="text-3xl text-cyan-300"></iconify-icon>
//             </div>
//             <div>
//               <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
//                 Professional Journey
//               </h1>
//               <p className="text-white/60 text-lg mt-2">Crafting digital experiences with passion and precision</p>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 flex">
          
//           {/* Experience Timeline */}
//           <div className="flex-1 pr-8">
//             <div className="relative">
//               {/* Timeline line */}
//               <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400/50 via-blue-500/50 to-purple-500/50" />
              
//               <div className="space-y-8">
//                 {experiences.map((exp, index) => (
//                   <div 
//                     key={exp.id}
//                     className={`relative transition-all duration-700 cursor-pointer ${
//                       activeExperience === index ? 'scale-105' : 'hover:scale-102'
//                     }`}
//                     onClick={() => setActiveExperience(index)}
//                     style={{ animationDelay: `${index * 0.3}s` }}
//                   >
//                     {/* Timeline dot */}
//                     <div className={`absolute left-6 w-4 h-4 rounded-full border-2 transition-all duration-500 ${
//                       activeExperience === index 
//                         ? 'bg-cyan-400 border-cyan-400 shadow-lg shadow-cyan-400/50 scale-125' 
//                         : 'bg-white/20 border-white/40 hover:border-cyan-400/70'
//                     }`} />

//                     {/* Experience card */}
//                     <div className="ml-16">
//                       <div className={`
//                         relative overflow-hidden rounded-2xl backdrop-blur-md border transition-all duration-500
//                         ${activeExperience === index 
//                           ? 'bg-white/20 border-cyan-400/50 shadow-2xl shadow-cyan-500/25' 
//                           : 'bg-white/10 border-white/20 hover:bg-white/15 hover:border-cyan-400/30'
//                         }
//                       `}>
//                         {/* Animated background */}
//                         <div className={`
//                           absolute inset-0 opacity-0 transition-opacity duration-500
//                           bg-gradient-to-br ${exp.color}/20
//                           ${activeExperience === index ? 'opacity-100' : 'hover:opacity-50'}
//                         `} />

//                         <div className="relative z-10 p-6">
//                           {/* Header */}
//                           <div className="flex items-start justify-between mb-4">
//                             <div className="flex items-center space-x-4">
//                               <div className={`p-3 rounded-xl bg-gradient-to-r ${exp.color}/20 border border-current/20`}>
//                                 <iconify-icon icon={exp.icon} class="text-2xl text-cyan-300"></iconify-icon>
//                               </div>
//                               <div>
//                                 <h3 className="text-xl font-bold text-white">{exp.title}</h3>
//                                 <p className="text-cyan-300 font-medium">{exp.company}</p>
//                                 <div className="flex items-center space-x-4 text-white/60 text-sm mt-1">
//                                   <div className="flex items-center space-x-1">
//                                     <iconify-icon icon="mdi:calendar-range" class="text-sm"></iconify-icon>
//                                     <span>{exp.duration}</span>
//                                   </div>
//                                   <div className="flex items-center space-x-1">
//                                     <iconify-icon icon="mdi:map-marker" class="text-sm"></iconify-icon>
//                                     <span>{exp.location}</span>
//                                   </div>
//                                   <span className="px-2 py-1 rounded-full bg-cyan-400/20 text-cyan-300 text-xs">
//                                     {exp.type}
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>

//                           {/* Description */}
//                           <p className="text-white/80 mb-4 leading-relaxed">
//                             {exp.description}
//                           </p>

//                           {/* Technologies */}
//                           <div className="flex flex-wrap gap-2">
//                             {exp.technologies.map((tech, i) => (
//                               <span
//                                 key={i}
//                                 className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs font-medium border border-white/20 hover:border-cyan-400/50 transition-all duration-300"
//                               >
//                                 {tech}
//                               </span>
//                             ))}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Experience Details Panel */}
//           <div className="w-96 pl-8">
//             <div className="sticky top-8">
//               <div className="relative overflow-hidden rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 p-6 h-fit">
//                 <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-blue-500/10" />
                
//                 <div className="relative z-10">
//                   <div className="flex items-center space-x-3 mb-6">
//                     <div className="p-2 rounded-xl bg-gradient-to-r from-cyan-400/20 to-blue-500/20">
//                       <iconify-icon icon="mdi:star-circle" class="text-xl text-cyan-300"></iconify-icon>
//                     </div>
//                     <h3 className="text-xl font-bold text-white">Key Achievements</h3>
//                   </div>

//                   <div className="space-y-4">
//                     {experiences[activeExperience]?.achievements.map((achievement, i) => (
//                       <div 
//                         key={i}
//                         className="flex items-start space-x-3 group"
//                         style={{ 
//                           animationDelay: `${i * 0.1}s`,
//                           opacity: 0,
//                           animation: `fadeInUp 0.6s ease-out ${i * 0.1}s forwards`
//                         }}
//                       >
//                         <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 mt-2 flex-shrink-0 group-hover:scale-150 transition-transform duration-300" />
//                         <span className="text-white/80 text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
//                           {achievement}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Stats */}
//               <div className="grid grid-cols-2 gap-4 mt-6">
//                 {stats.map((stat, index) => (
//                   <div 
//                     key={index}
//                     className="relative group transition-all duration-500 hover:scale-105"
//                   >
//                     <div className="relative overflow-hidden rounded-xl backdrop-blur-md bg-white/10 border border-white/20 p-4 hover:border-cyan-400/50 transition-all duration-500 hover:shadow-lg hover:shadow-cyan-500/20">
//                       <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
//                       <div className="relative z-10 text-center">
//                         <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-400/20 to-blue-500/20 text-cyan-300 mb-2">
//                           <iconify-icon icon={stat.icon} class="text-lg"></iconify-icon>
//                         </div>
//                         <div className="text-xl font-bold text-white mb-1">{stat.value}</div>
//                         <div className="text-white/60 text-xs">{stat.label}</div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Navigation */}
//         <div className="mt-8 flex justify-center">
//           <div className="flex space-x-3">
//             {experiences.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setActiveExperience(index)}
//                 className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                   activeExperience === index 
//                     ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50 scale-125' 
//                     : 'bg-white/30 hover:bg-white/50'
//                 }`}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Floating CTA */}
//         <div className="absolute bottom-8 right-8">
//           <div className="relative group">
//             <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300 animate-pulse" />
//             <button className="relative px-6 py-3 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 backdrop-blur-md rounded-2xl border border-cyan-400/30 text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center space-x-2">
//               <iconify-icon icon="mdi:message-text" class="text-lg"></iconify-icon>
//               <span>Let's Connect</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-5px); }
//         }
        
//         @keyframes glow {
//           0%, 100% { box-shadow: 0 0 5px rgba(34, 211, 238, 0.3); }
//           50% { box-shadow: 0 0 20px rgba(34, 211, 238, 0.6); }
//         }

//         .animate-float {
//           animation: float 3s ease-in-out infinite;
//         }

//         /* Custom scrollbar for any overflow */
//         ::-webkit-scrollbar {
//           width: 6px;
//         }
        
//         ::-webkit-scrollbar-track {
//           background: rgba(255, 255, 255, 0.1);
//           border-radius: 3px;
//         }
        
//         ::-webkit-scrollbar-thumb {
//           background: rgba(34, 211, 238, 0.5);
//           border-radius: 3px;
//         }
        
//         ::-webkit-scrollbar-thumb:hover {
//           background: rgba(34, 211, 238, 0.7);
//         }
//       `}</style>

//       {/* Iconify script */}
//       <script src="https://cdnjs.cloudflare.com/ajax/libs/iconify/3.1.1/iconify.min.js"></script>
//     </div>
//   );
// };

// export default Experiences;
//! _____________________________________________________________________________________________________________________________ version 2
// import React, { useState, useEffect, useRef } from 'react';
// import * as THREE from 'three';

// const Experiences = () => {
//   const [activeExperience, setActiveExperience] = useState(0);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [isLoaded, setIsLoaded] = useState(false);
//   const mountRef = useRef(null);
//   const sceneRef = useRef(null);
//   const particlesRef = useRef([]);

//   useEffect(() => {
//     setIsLoaded(true);
//   }, []);

//   useEffect(() => {
//     if (!mountRef.current) return;

//     // Three.js Scene Setup
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setClearColor(0x000000, 0);
//     mountRef.current.appendChild(renderer.domElement);

//     // Create floating geometric shapes
//     const geometries = [
//       new THREE.OctahedronGeometry(0.5),
//       new THREE.TetrahedronGeometry(0.4),
//       new THREE.IcosahedronGeometry(0.3)
//     ];

//     const materials = [
//       new THREE.MeshBasicMaterial({ 
//         color: 0x00d4ff, 
//         transparent: true, 
//         opacity: 0.6,
//         wireframe: true 
//       }),
//       new THREE.MeshBasicMaterial({ 
//         color: 0x0099ff, 
//         transparent: true, 
//         opacity: 0.4,
//         wireframe: true 
//       }),
//       new THREE.MeshBasicMaterial({ 
//         color: 0x66ccff, 
//         transparent: true, 
//         opacity: 0.5,
//         wireframe: true 
//       })
//     ];

//     const shapes = [];
//     for (let i = 0; i < 15; i++) {
//       const geometry = geometries[Math.floor(Math.random() * geometries.length)];
//       const material = materials[Math.floor(Math.random() * materials.length)];
//       const mesh = new THREE.Mesh(geometry, material);
      
//       mesh.position.set(
//         (Math.random() - 0.5) * 20,
//         (Math.random() - 0.5) * 20,
//         (Math.random() - 0.5) * 20
//       );
      
//       mesh.rotation.set(
//         Math.random() * Math.PI,
//         Math.random() * Math.PI,
//         Math.random() * Math.PI
//       );
      
//       scene.add(mesh);
//       shapes.push(mesh);
//     }

//     camera.position.z = 10;
//     sceneRef.current = { scene, camera, renderer, shapes };

//     // Animation loop
//     const animate = () => {
//       requestAnimationFrame(animate);
      
//       shapes.forEach((shape, index) => {
//         shape.rotation.x += 0.005 + index * 0.001;
//         shape.rotation.y += 0.008 + index * 0.001;
//         shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;
//       });
      
//       renderer.render(scene, camera);
//     };
//     animate();

//     // Handle resize
//     const handleResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     };
//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//       if (mountRef.current && renderer.domElement) {
//         mountRef.current.removeChild(renderer.domElement);
//       }
//       renderer.dispose();
//     };
//   }, []);

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMousePosition({ 
//         x: (e.clientX / window.innerWidth) * 2 - 1, 
//         y: -(e.clientY / window.innerHeight) * 2 + 1 
//       });
//     };
//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);

//   const experiences = [
//     {
//       id: 1,
//       title: 'Senior Frontend Developer',
//       company: 'Petco Company',
//       duration: '2022 - 2024',
//       location: 'Remote',
//       type: 'Full-time',
//       description: 'Orchestrated the complete digital transformation of enterprise operations through cutting-edge ERP system development.',
//       achievements: [
//         'Architected scalable React ecosystem serving 10,000+ daily users',
//         'Pioneered real-time synchronization reducing system latency by 60%',
//         'Engineered component library adopted across 15+ enterprise applications',
//         'Delivered PWA solution enabling seamless offline workflow management',
//         'Achieved 40% performance optimization through advanced React patterns',
//         'Mentored development team establishing modern coding standards'
//       ],
//       technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'TanStack Query', 'PWA'],
//       color: 'from-cyan-400 via-blue-500 to-indigo-600',
//       accentColor: 'cyan'
//     },
//     {
//       id: 2,
//       title: 'Full Stack Developer',
//       company: 'Freelance Studio',
//       duration: '2021 - 2022',
//       location: 'Remote',
//       type: 'Contract',
//       description: 'Delivered premium digital experiences for diverse clientele, specializing in immersive web applications and advanced user interactions.',
//       achievements: [
//         'Crafted 12+ bespoke web applications with 100% client satisfaction',
//         'Implemented complex state architectures using Redux and Zustand',
//         'Created stunning 3D experiences with Three.js increasing engagement 300%',
//         'Built multilingual platforms supporting global user bases',
//         'Developed advanced form systems reducing validation errors by 85%',
//         'Exceeded project timelines by 25% while maintaining premium quality'
//       ],
//       technologies: ['React', 'Three.js', 'Redux', 'Zustand', 'Framer Motion', 'IndexedDB'],
//       color: 'from-purple-400 via-pink-500 to-rose-500',
//       accentColor: 'purple'
//     }
//   ];

//   const currentExp = experiences[activeExperience];

//   return (
//     <div className="w-full h-screen snap-start flex items-center justify-center relative overflow-hidden ">
//       {/* Three.js Background */}
//       <div ref={mountRef} className="absolute inset-0 pointer-events-none" />

//       {/* Interactive mouse gradient */}
//       <div 
//         className="absolute w-[800px] h-[800px] rounded-full pointer-events-none transition-all duration-300 ease-out"
//         style={{
//           background: `radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, rgba(59, 130, 246, 0.1) 30%, transparent 70%)`,
//           left: mousePosition.x * 100 - 400,
//           top: mousePosition.y * 100 - 400,
//           filter: 'blur(40px)'
//         }}
//       />

//       {/* Main Container */}
//       <div className={`h-full flex flex-col relative z-10 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
//         {/* Immersive Header */}
//         <div className="relative py-12 text-center">
//           <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
          
//           <div className="relative z-10">
//             <div className="inline-block mb-6 relative group">
//               <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-all duration-500 animate-pulse" />
//               <div className="relative px-8 py-4 bg-black/40 backdrop-blur-xl rounded-3xl border border-cyan-400/30">
//                 <iconify-icon icon="mdi:briefcase-variant-outline" class="text-4xl text-cyan-300 mb-2 block"></iconify-icon>
//                 <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
//                   Professional Journey
//                 </h1>
//                 <p className="text-white/70 text-xl mt-3">Where innovation meets execution</p>
//               </div>
//             </div>
//           </div>

//           {/* Floating elements */}
//           <div className="absolute inset-0 pointer-events-none">
//             {[...Array(8)].map((_, i) => (
//               <div
//                 key={i}
//                 className="absolute w-2 h-2 bg-cyan-400/40 rounded-full animate-pulse"
//                 style={{
//                   left: `${20 + Math.random() * 60}%`,
//                   top: `${20 + Math.random() * 60}%`,
//                   animationDelay: `${i * 0.5}s`,
//                   animationDuration: `${3 + Math.random() * 2}s`
//                 }}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Main Content Area */}
//         <div className="flex-1 flex max-w-7xl mx-auto w-full px-8">
          
//           {/* Experience Showcase - Left Side */}
//           <div className="flex-1 pr-12">
//             <div className="relative h-full">
              
//               {/* Experience Card */}
//               <div className="relative group">
//                 <div 
//                   className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700"
//                   style={{
//                     background: `linear-gradient(135deg, rgba(34, 211, 238, 0.1) 0%, rgba(59, 130, 246, 0.1) 50%, rgba(147, 51, 234, 0.1) 100%)`,
//                     filter: 'blur(20px)',
//                     transform: 'scale(1.05)'
//                   }}
//                 />

//                 <div className={`
//                   relative rounded-3xl backdrop-blur-xl border transition-all duration-700 h-full
//                   bg-gradient-to-br from-black/40 via-black/20 to-transparent
//                   border-gradient-to-r ${currentExp.color}
//                   shadow-2xl hover:shadow-cyan-500/25
//                   transform group-hover:scale-[1.02]
//                 `}
//                 style={{
//                   background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 50%, transparent 100%)',
//                   borderImage: `linear-gradient(135deg, rgba(34, 211, 238, 0.5), rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.2)) 1`
//                 }}>
                  
//                   <div className="p-10 h-full flex flex-col">
//                     {/* Company Badge */}
//                     <div className="flex items-center justify-between mb-8">
//                       <div className="flex items-center space-x-4">
//                         <div className={`
//                           relative p-4 rounded-2xl bg-gradient-to-r ${currentExp.color}/20 
//                           backdrop-blur-sm border border-current/20 group-hover:scale-110 transition-transform duration-500
//                         `}>
//                           <iconify-icon icon="mdi:office-building-cog" class="text-3xl text-cyan-300"></iconify-icon>
//                           <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//                         </div>
//                         <div>
//                           <h2 className="text-3xl font-bold text-white mb-1">{currentExp.title}</h2>
//                           <p className="text-cyan-300 text-xl font-medium">{currentExp.company}</p>
//                         </div>
//                       </div>
                      
//                       <div className={`
//                         px-4 py-2 rounded-full text-sm font-medium border
//                         bg-gradient-to-r ${currentExp.color}/20 border-current/30 text-cyan-300
//                       `}>
//                         {currentExp.type}
//                       </div>
//                     </div>

//                     {/* Meta Info */}
//                     <div className="flex items-center space-x-8 mb-8 text-white/70">
//                       <div className="flex items-center space-x-2">
//                         <iconify-icon icon="mdi:calendar-range" class="text-lg text-cyan-400"></iconify-icon>
//                         <span className="font-medium">{currentExp.duration}</span>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <iconify-icon icon="mdi:map-marker" class="text-lg text-cyan-400"></iconify-icon>
//                         <span className="font-medium">{currentExp.location}</span>
//                       </div>
//                     </div>

//                     {/* Description */}
//                     <div className="mb-8">
//                       <p className="text-white/90 text-lg leading-relaxed font-light">
//                         {currentExp.description}
//                       </p>
//                     </div>

//                     {/* Technologies with 3D hover effect */}
//                     <div className="mb-8">
//                       <h3 className="text-white/80 font-semibold mb-4 flex items-center">
//                         <iconify-icon icon="mdi:code-tags" class="text-lg mr-2 text-cyan-400"></iconify-icon>
//                         Tech Stack
//                       </h3>
//                       <div className="flex flex-wrap gap-3">
//                         {currentExp.technologies.map((tech, i) => (
//                           <div
//                             key={i}
//                             className="relative group cursor-pointer"
//                             style={{ animationDelay: `${i * 0.1}s` }}
//                           >
//                             <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur-md transform group-hover:scale-110" />
//                             <span className="relative px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm text-white/80 text-sm font-medium border border-white/20 group-hover:border-cyan-400/50 group-hover:text-white group-hover:shadow-lg transition-all duration-300 block transform group-hover:scale-105 group-hover:-translate-y-1">
//                               {tech}
//                             </span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Navigation */}
//                     <div className="mt-auto">
//                       <div className="flex items-center justify-between">
//                         <button
//                           onClick={() => setActiveExperience(activeExperience === 0 ? 1 : 0)}
//                           className="group flex items-center space-x-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20 hover:border-cyan-400/50 transition-all duration-500 hover:scale-105 hover:shadow-xl"
//                         >
//                           <iconify-icon icon="mdi:swap-horizontal" class="text-lg text-cyan-400 group-hover:rotate-180 transition-transform duration-500"></iconify-icon>
//                           <span className="text-white font-medium">Switch Experience</span>
//                         </button>

//                         <div className="flex space-x-3">
//                           {experiences.map((_, index) => (
//                             <button
//                               key={index}
//                               onClick={() => setActiveExperience(index)}
//                               className={`w-4 h-4 rounded-full transition-all duration-500 transform ${
//                                 activeExperience === index 
//                                   ? 'bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg shadow-cyan-400/50 scale-125' 
//                                   : 'bg-white/30 hover:bg-white/50 hover:scale-110'
//                               }`}
//                             />
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Achievement Showcase - Right Side */}
//           <div className="w-96">
//             <div className="relative h-full">
              
//               {/* Achievements Panel */}
//               <div className="relative h-full">
//                 <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-transparent rounded-3xl backdrop-blur-xl border border-white/20" />
                
//                 <div className="relative z-10 p-8 h-full flex flex-col">
//                   <div className="flex items-center space-x-3 mb-8">
//                     <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30">
//                       <iconify-icon icon="mdi:trophy-variant" class="text-2xl text-purple-300"></iconify-icon>
//                     </div>
//                     <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//                       Key Achievements
//                     </h3>
//                   </div>

//                   <div className="space-y-4 flex-1 overflow-hidden">
//                     {currentExp.achievements.map((achievement, i) => (
//                       <div 
//                         key={i}
//                         className="group relative"
//                         style={{ 
//                           animationDelay: `${i * 0.15}s`,
//                           opacity: 0,
//                           animation: `slideInRight 0.8s ease-out ${i * 0.15}s forwards`
//                         }}
//                       >
//                         <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
//                         <div className="relative flex items-start space-x-4 p-4 rounded-xl transition-all duration-300 group-hover:bg-white/5">
//                           <div className="relative">
//                             <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 mt-1 group-hover:scale-150 transition-transform duration-300" />
//                             <div className="absolute inset-0 w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-ping opacity-20" />
//                           </div>
//                           <span className="text-white/80 leading-relaxed group-hover:text-white transition-colors duration-300 flex-1">
//                             {achievement}
//                           </span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Stats Grid */}
//                   <div className="grid grid-cols-2 gap-4 mt-8">
//                     {[
//                       { icon: 'mdi:calendar-clock', value: '2+', label: 'Years' },
//                       { icon: 'mdi:rocket-launch-outline', value: '15+', label: 'Projects' },
//                       { icon: 'mdi:source-commit', value: '1K+', label: 'Commits' },
//                       { icon: 'mdi:heart-multiple', value: '100%', label: 'Satisfaction' }
//                     ].map((stat, index) => (
//                       <div 
//                         key={index}
//                         className="relative group cursor-pointer"
//                         style={{ animationDelay: `${index * 0.1}s` }}
//                       >
//                         <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-105" />
//                         <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                        
//                         <div className="relative backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 p-4 group-hover:border-cyan-400/30 transition-all duration-500 text-center">
//                           <iconify-icon icon={stat.icon} class="text-2xl text-cyan-300 mb-2 block group-hover:scale-125 transition-transform duration-300"></iconify-icon>
//                           <div className="text-xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors duration-300">{stat.value}</div>
//                           <div className="text-white/60 text-xs">{stat.label}</div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Immersive Bottom CTA */}
//         <div className="relative py-8">
//           <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          
//           <div className="relative z-10 flex justify-center">
//             <div className="relative group">
//               {/* Multiple glowing layers */}
//               <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-2xl blur-2xl opacity-30 group-hover:opacity-60 transition-all duration-500 animate-pulse" />
//               <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-500" />
              
//               <button className="relative px-12 py-4 bg-black/50 backdrop-blur-xl rounded-2xl border border-cyan-400/30 text-white font-bold text-lg transition-all duration-500 hover:scale-110 hover:shadow-2xl flex items-center space-x-3 group-hover:border-cyan-400/60">
//                 <iconify-icon icon="mdi:message-star" class="text-xl text-cyan-300 group-hover:rotate-12 transition-transform duration-300"></iconify-icon>
//                 <span className="bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
//                   Let's Create Something Extraordinary
//                 </span>
//                 <iconify-icon icon="mdi:arrow-right" class="text-xl text-cyan-300 group-hover:translate-x-2 transition-transform duration-300"></iconify-icon>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Floating Action Elements */}
//       <div className="absolute top-1/2 left-8 transform -translate-y-1/2 space-y-6">
//         {['mdi:linkedin', 'mdi:github', 'mdi:email'].map((icon, i) => (
//           <div 
//             key={i}
//             className="relative group cursor-pointer"
//             style={{ animationDelay: `${i * 0.2}s` }}
//           >
//             <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur-md scale-110" />
//             <div className="relative w-12 h-12 rounded-xl backdrop-blur-xl bg-white/10 border border-white/20 flex items-center justify-center group-hover:border-cyan-400/50 transition-all duration-300 hover:scale-110 hover:-translate-y-1">
//               <iconify-icon icon={icon} class="text-xl text-white/70 group-hover:text-cyan-300 transition-colors duration-300"></iconify-icon>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Custom Styles */}
//       <style jsx>{`
//         @keyframes slideInRight {
//           from {
//             opacity: 0;
//             transform: translateX(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
        
//         @keyframes float {
//           0%, 100% { transform: translateY(0px) rotate(0deg); }
//           50% { transform: translateY(-10px) rotate(5deg); }
//         }
        
//         @keyframes glow {
//           0%, 100% { 
//             box-shadow: 0 0 20px rgba(34, 211, 238, 0.3);
//             filter: brightness(1);
//           }
//           50% { 
//             box-shadow: 0 0 40px rgba(34, 211, 238, 0.6);
//             filter: brightness(1.2);
//           }
//         }

//         @keyframes borderShine {
//           0% { background-position: -200% 0; }
//           100% { background-position: 200% 0; }
//         }

//         /* Canvas positioning */
//         canvas {
//           position: absolute !important;
//           top: 0 !important;
//           left: 0 !important;
//           z-index: 1 !important;
//           pointer-events: none !important;
//         }

//         /* Gradient border animation */
//         .border-gradient-animated {
//           background: linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.5), transparent);
//           background-size: 200% 100%;
//           animation: borderShine 3s ease-in-out infinite;
//         }

//         /* Glass morphism enhancement */
//         .glass-enhanced {
//           backdrop-filter: blur(20px) saturate(180%);
//           background: rgba(255, 255, 255, 0.1);
//           border: 1px solid rgba(255, 255, 255, 0.2);
//         }
//       `}</style>

//       {/* Iconify Script */}
//       <script src="https://cdnjs.cloudflare.com/ajax/libs/iconify/3.1.1/iconify.min.js"></script>
//     </div>
//   );
// };

// export default Experiences;

//!version 3
// import React, { useState, useRef, useEffect } from 'react';
// import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion';
// import { expo } from 'maath/dist/declarations/src/easing';

//  const Experiences = () => {
//   const [selectedExperience, setSelectedExperience] = useState(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, threshold: 0.3 });
//   const controls = useAnimation();

//   const experiences = [
//     {
//       id: 0,
//       company: "Petco",
//       role: "Full-Stack Developer",
//       period: "2022 - Present",
//       duration: "2+ Years",
//       location: "Tehran, Iran",
//       type: "Full-Time",
//       logo: "🏢",
//       color: "#00d4ff",
//       description: "Leading the development of an enterprise ERP system from inception to deployment, architecting scalable solutions that serve thousands of users.",
//       achievements: [
//         "Architected and built the entire frontend infrastructure from scratch using React, TypeScript, and modern state management",
//         "Designed and implemented a modular component library increasing development efficiency by 40%",
//         "Integrated complex APIs and real-time features serving 10,000+ daily active users",
//         "Mentored junior developers and established coding standards and best practices",
//         "Optimized application performance resulting in 60% faster load times"
//       ],
//       technologies: [
//         "React", "TypeScript", "Next.js", "Zustand", "TanStack Query",
//         "Tailwind CSS", "Three.js", "IndexedDB", "SQL Server", "REST APIs"
//       ],
//       projects: [
//         {
//           name: "ERP Core System",
//           description: "Complete enterprise resource planning system",
//           impact: "10,000+ users"
//         },
//         {
//           name: "Real-time Dashboard",
//           description: "Live analytics and monitoring dashboard",
//           impact: "24/7 monitoring"
//         },
//         {
//           name: "Mobile PWA",
//           description: "Progressive web app for mobile users",
//           impact: "70% mobile adoption"
//         }
//       ]
//     },
//     {
//       id: 1,
//       company: "LoveCode",
//       role: "Frontend Developer",
//       period: "2021 - 2022",
//       duration: "1 Year",
//       location: "Tehran, Iran",
//       type: "Full-Time",
//       logo: "💝",
//       color: "#ff6b6b",
//       description: "Developed responsive web applications and collaborated with cross-functional teams to deliver pixel-perfect user interfaces.",
//       achievements: [
//         "Developed 15+ responsive web applications using React and modern CSS frameworks",
//         "Collaborated with UI/UX designers to implement pixel-perfect interfaces",
//         "Improved website performance by 45% through code optimization and lazy loading",
//         "Integrated third-party APIs and payment gateways for e-commerce solutions",
//         "Participated in agile development processes and code reviews"
//       ],
//       technologies: [
//         "React", "JavaScript", "CSS3", "SASS", "Redux", "Axios",
//         "Bootstrap", "Material-UI", "Git", "Webpack"
//       ],
//       projects: [
//         {
//           name: "E-commerce Platform",
//           description: "Full-featured online shopping experience",
//           impact: "1,000+ products"
//         },
//         {
//           name: "Corporate Website",
//           description: "Company landing page and blog",
//           impact: "50% traffic increase"
//         },
//         {
//           name: "Admin Dashboard",
//           description: "Content management system",
//           impact: "90% admin efficiency"
//         }
//       ]
//     },
//     {
//       id: 2,
//       company: "Freelance",
//       role: "Web Developer",
//       period: "2020 - 2021",
//       duration: "1+ Year",
//       location: "Remote",
//       type: "Contract",
//       logo: "🚀",
//       color: "#4ecdc4",
//       description: "Worked with various clients to deliver custom web solutions, from small business websites to complex web applications.",
//       achievements: [
//         "Completed 20+ projects for diverse clients across different industries",
//         "Built responsive websites from design mockups with 100% client satisfaction",
//         "Implemented SEO best practices resulting in 200% organic traffic increase",
//         "Developed custom WordPress themes and plugins",
//         "Managed full project lifecycle from requirement gathering to deployment"
//       ],
//       technologies: [
//         "HTML5", "CSS3", "JavaScript", "jQuery", "WordPress",
//         "PHP", "MySQL", "Photoshop", "Figma"
//       ],
//       projects: [
//         {
//           name: "Restaurant Website",
//           description: "Online menu and reservation system",
//           impact: "300% bookings"
//         },
//         {
//           name: "Portfolio Websites",
//           description: "Creative portfolios for artists and designers",
//           impact: "10+ clients"
//         },
//         {
//           name: "Business Landing Pages",
//           description: "Conversion-optimized landing pages",
//           impact: "Average 25% CTR"
//         }
//       ]
//     }
//   ];

//   useEffect(() => {
//     if (isInView) {
//       controls.start('visible');
//     }
//   }, [isInView, controls]);

//   useEffect(() => {
//     if (!isAutoPlaying) return;
    
//     const interval = setInterval(() => {
//       setSelectedExperience(prev => (prev + 1) % experiences.length);
//     }, 6000);

//     return () => clearInterval(interval);
//   }, [isAutoPlaying, experiences.length]);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.3,
//         delayChildren: 0.2
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6, ease: "easeOut" }
//     }
//   };

//   const currentExp = experiences[selectedExperience];

//   return (
//     <motion.section
//       ref={ref}
//       className="w-full min-h-screen snap-start flex flex-col justify-center px-8 lg:px-16 py-16 text-white relative overflow-hidden"
//       initial="hidden"
//       animate={controls}
//       variants={containerVariants}
//     >
//       {/* Dynamic Background */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div 
//           className="absolute inset-0 opacity-10 transition-all duration-1000"
//           style={{
//             background: `radial-gradient(circle at 30% 70%, ${currentExp.color}20 0%, transparent 50%)`
//           }}
//         />
//         {[...Array(15)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute w-2 h-2 rounded-full"
//             style={{
//               backgroundColor: `${currentExp.color}40`,
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`
//             }}
//             animate={{
//               scale: [0, 1, 0],
//               opacity: [0, 1, 0]
//             }}
//             transition={{
//               duration: 3,
//               repeat: Infinity,
//               delay: i * 0.2,
//               ease: "easeInOut"
//             }}
//           />
//         ))}
//       </div>

//       {/* Header */}
//       <motion.div className="text-center mb-16" variants={itemVariants}>
//         <h1 className="text-5xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
//           EXPERIENCE
//         </h1>
//         <p className="text-xl text-white/70 max-w-2xl mx-auto">
//           My professional journey in software development
//         </p>
//       </motion.div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto w-full">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//           {/* Left Sidebar - Experience List */}
//           <motion.div className="lg:col-span-1" variants={itemVariants}>
//             <div className="space-y-4">
//               {experiences.map((exp, index) => (
//                 <motion.button
//                   key={exp.id}
//                   className={`w-full text-left p-6 rounded-2xl transition-all duration-500 border-2 ${
//                     selectedExperience === index
//                       ? `border-[${exp.color}] shadow-2xl`
//                       : 'border-white/10 hover:border-white/30'
//                   }`}
//                   style={{
//                     backgroundColor: selectedExperience === index ? `${exp.color}15` : 'rgba(255,255,255,0.05)',
//                     borderColor: selectedExperience === index ? exp.color : 'rgba(255,255,255,0.1)'
//                   }}
//                   onClick={() => {
//                     setSelectedExperience(index);
//                     setIsAutoPlaying(false);
//                   }}
//                   whileHover={{ scale: 1.02, x: 5 }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   <div className="flex items-center gap-4 mb-2">
//                     <div className="text-2xl">{exp.logo}</div>
//                     <div>
//                       <h3 className="font-bold text-lg">{exp.company}</h3>
//                       <p className="text-sm text-white/60">{exp.period}</p>
//                     </div>
//                   </div>
//                   <p className="text-sm text-white/70">{exp.role}</p>
//                 </motion.button>
//               ))}
//             </div>

//             {/* Auto-play Toggle */}
//             <motion.button
//               className="w-full mt-6 p-4 rounded-xl bg-white/5 border border-white/20 hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
//               onClick={() => setIsAutoPlaying(!isAutoPlaying)}
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//             >
//               <span className={`text-2xl ${isAutoPlaying ? 'animate-spin' : ''}`}>
//                 {isAutoPlaying ? '⏸️' : '▶️'}
//               </span>
//               <span>{isAutoPlaying ? 'Pause' : 'Play'} Auto</span>
//             </motion.button>
//           </motion.div>

//           {/* Right Content - Experience Details */}
//           <motion.div className="lg:col-span-3" variants={itemVariants}>
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={selectedExperience}
//                 initial={{ opacity: 0, x: 50 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -50 }}
//                 transition={{ duration: 0.5 }}
//                 className="space-y-8"
//               >
//                 {/* Experience Header */}
//                 <div className="bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-xl border border-white/20 rounded-2xl p-8">
//                   <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
//                     <div className="flex items-center gap-6 mb-4 lg:mb-0">
//                       <div 
//                         className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-2xl"
//                         style={{ 
//                           backgroundColor: `${currentExp.color}20`,
//                           boxShadow: `0 0 30px ${currentExp.color}40`
//                         }}
//                       >
//                         {currentExp.logo}
//                       </div>
//                       <div>
//                         <h2 className="text-3xl font-bold">{currentExp.company}</h2>
//                         <p 
//                           className="text-xl font-semibold"
//                           style={{ color: currentExp.color }}
//                         >
//                           {currentExp.role}
//                         </p>
//                       </div>
//                     </div>
                    
//                     <div className="flex flex-col sm:flex-row gap-4">
//                       <div className="bg-white/5 rounded-xl p-3 text-center">
//                         <p className="text-sm text-white/60">Duration</p>
//                         <p className="font-semibold">{currentExp.duration}</p>
//                       </div>
//                       <div className="bg-white/5 rounded-xl p-3 text-center">
//                         <p className="text-sm text-white/60">Type</p>
//                         <p className="font-semibold">{currentExp.type}</p>
//                       </div>
//                       <div className="bg-white/5 rounded-xl p-3 text-center">
//                         <p className="text-sm text-white/60">Location</p>
//                         <p className="font-semibold">{currentExp.location}</p>
//                       </div>
//                     </div>
//                   </div>

//                   <p className="text-white/80 text-lg leading-relaxed">
//                     {currentExp.description}
//                   </p>
//                 </div>

//                 {/* Key Achievements */}
//                 <div className="bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-xl border border-white/20 rounded-2xl p-8">
//                   <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
//                     <span style={{ color: currentExp.color }}>🎯</span>
//                     Key Achievements
//                   </h3>
//                   <div className="space-y-4">
//                     {currentExp.achievements.map((achievement, index) => (
//                       <motion.div
//                         key={index}
//                         className="flex items-start gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300"
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: index * 0.1 }}
//                         whileHover={{ x: 5 }}
//                       >
//                         <div 
//                           className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
//                           style={{ backgroundColor: currentExp.color }}
//                         />
//                         <p className="text-white/80 leading-relaxed">{achievement}</p>
//                       </motion.div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Technologies & Projects */}
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                   {/* Technologies */}
//                   <div className="bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-xl border border-white/20 rounded-2xl p-8">
//                     <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
//                       <span style={{ color: currentExp.color }}>⚡</span>
//                       Technologies Used
//                     </h3>
//                     <div className="flex flex-wrap gap-3">
//                       {currentExp.technologies.map((tech, index) => (
//                         <motion.span
//                           key={tech}
//                           className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-sm font-medium hover:border-white/40 transition-all duration-300"
//                           initial={{ opacity: 0, scale: 0 }}
//                           animate={{ opacity: 1, scale: 1 }}
//                           transition={{ delay: index * 0.05 }}
//                           whileHover={{ 
//                             scale: 1.05,
//                             backgroundColor: `${currentExp.color}20`,
//                             borderColor: currentExp.color
//                           }}
//                         >
//                           {tech}
//                         </motion.span>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Notable Projects */}
//                   <div className="bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-xl border border-white/20 rounded-2xl p-8">
//                     <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
//                       <span style={{ color: currentExp.color }}>🚀</span>
//                       Notable Projects
//                     </h3>
//                     <div className="space-y-4">
//                       {currentExp.projects.map((project, index) => (
//                         <motion.div
//                           key={project.name}
//                           className="p-4 bg-white/5 border border-white/10 rounded-xl hover:border-white/30 transition-all duration-300"
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: index * 0.1 }}
//                           whileHover={{ y: -2, boxShadow: `0 10px 30px ${currentExp.color}20` }}
//                         >
//                           <div className="flex justify-between items-start mb-2">
//                             <h4 className="font-semibold text-white">{project.name}</h4>
//                             <span 
//                               className="text-xs px-2 py-1 rounded-full font-medium"
//                               style={{ 
//                                 backgroundColor: `${currentExp.color}20`,
//                                 color: currentExp.color 
//                               }}
//                             >
//                               {project.impact}
//                             </span>
//                           </div>
//                           <p className="text-sm text-white/70">{project.description}</p>
//                         </motion.div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Progress Indicator */}
//                 <div className="flex justify-center items-center gap-3 mt-8">
//                   {experiences.map((_, index) => (
//                     <motion.button
//                       key={index}
//                       className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                         selectedExperience === index ? 'w-8' : 'opacity-50'
//                       }`}
//                       style={{
//                         backgroundColor: selectedExperience === index ? currentExp.color : 'rgba(255,255,255,0.3)'
//                       }}
//                       onClick={() => {
//                         setSelectedExperience(index);
//                         setIsAutoPlaying(false);
//                       }}
//                       whileHover={{ scale: 1.2 }}
//                       whileTap={{ scale: 0.9 }}
//                     />
//                   ))}
//                 </div>
//               </motion.div>
//             </AnimatePresence>
//           </motion.div>
//         </div>
//       </div>

//       {/* Floating Stats */}
//       <motion.div
//         className="absolute top-8 right-8 bg-black/70 backdrop-blur-xl border border-white/20 rounded-2xl p-6"
//         variants={itemVariants}
//       >
//         <h4 className="font-bold text-center mb-4">Career Stats</h4>
//         <div className="space-y-3 text-center">
//           <div>
//             <div className="text-2xl font-bold text-cyan-400">3+</div>
//             <div className="text-xs text-white/60">Years</div>
//           </div>
//           <div>
//             <div className="text-2xl font-bold text-purple-400">50+</div>
//             <div className="text-xs text-white/60">Projects</div>
//           </div>
//           <div>
//             <div className="text-2xl font-bold text-pink-400">15+</div>
//             <div className="text-xs text-white/60">Technologies</div>
//           </div>
//         </div>
//       </motion.div>
//     </motion.section>
//   );
// }
// export default Experiences;

//! v4

// import React, { useState, useEffect, useRef } from "react";
// import { Icon } from "@iconify/react";

// interface ExperiencesProps {
//   scrollToSection?: (id: string) => void;
// }

// function Experiences({ scrollToSection }: ExperiencesProps) {
//   const [isVisible, setIsVisible] = useState(false);
//   const [activeExperience, setActiveExperience] = useState(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);
//   const sectionRef = useRef<HTMLDivElement>(null);

//   const experiences = [
//     {
//       id: 0,
//       company: "Petco",
//       role: "Full-Stack Developer",
//       period: "2022 - Present",
//       duration: "2+ Years",
//       location: "Tehran, Iran",
//       type: "Full-Time",
//       icon: "mingcute:building-2-line",
//       color: "from-cyan-400 to-blue-500",
//       bgColor: "from-cyan-400/10 to-blue-500/10",
//       description: "Leading the development of an enterprise ERP system from inception to deployment, architecting scalable solutions that serve thousands of users.",
//       achievements: [
//         "Architected and built the entire frontend infrastructure from scratch",
//         "Designed modular component library increasing development efficiency by 40%",
//         "Integrated complex APIs serving 10,000+ daily active users",
//         "Mentored junior developers and established coding standards",
//         "Optimized application performance resulting in 60% faster load times"
//       ],
//       technologies: [
//         "React", "TypeScript", "Next.js", "Zustand", "TanStack Query",
//         "Tailwind CSS", "Three.js", "IndexedDB", "SQL Server", "REST APIs"
//       ],
//       projects: [
//         { name: "ERP Core System", description: "Complete enterprise resource planning system", impact: "10,000+ users" },
//         { name: "Real-time Dashboard", description: "Live analytics and monitoring dashboard", impact: "24/7 monitoring" },
//         { name: "Mobile PWA", description: "Progressive web app for mobile users", impact: "70% mobile adoption" }
//       ]
//     },
//     {
//       id: 1,
//       company: "LoveCode",
//       role: "Frontend Developer",
//       period: "2021 - 2022",
//       duration: "1 Year",
//       location: "Tehran, Iran",
//       type: "Full-Time",
//       icon: "mingcute:heart-line",
//       color: "from-orange-400 to-red-500",
//       bgColor: "from-orange-400/10 to-red-500/10",
//       description: "Developed responsive web applications and collaborated with cross-functional teams to deliver pixel-perfect user interfaces.",
//       achievements: [
//         "Developed 15+ responsive web applications using React",
//         "Collaborated with UI/UX designers for pixel-perfect interfaces",
//         "Improved website performance by 45% through optimization",
//         "Integrated third-party APIs and payment gateways",
//         "Participated in agile development processes and code reviews"
//       ],
//       technologies: [
//         "React", "JavaScript", "CSS3", "SASS", "Redux", "Axios",
//         "Bootstrap", "Material-UI", "Git", "Webpack"
//       ],
//       projects: [
//         { name: "E-commerce Platform", description: "Full-featured online shopping experience", impact: "1,000+ products" },
//         { name: "Corporate Website", description: "Company landing page and blog", impact: "50% traffic increase" },
//         { name: "Admin Dashboard", description: "Content management system", impact: "90% admin efficiency" }
//       ]
//     },
//     {
//       id: 2,
//       company: "Freelance",
//       role: "Web Developer",
//       period: "2020 - 2021",
//       duration: "1+ Year",
//       location: "Remote",
//       type: "Contract",
//       icon: "mingcute:rocket-line",
//       color: "from-purple-400 to-pink-500",
//       bgColor: "from-purple-400/10 to-pink-500/10",
//       description: "Worked with various clients to deliver custom web solutions, from small business websites to complex web applications.",
//       achievements: [
//         "Completed 20+ projects for diverse clients across industries",
//         "Built responsive websites with 100% client satisfaction",
//         "Implemented SEO practices resulting in 200% traffic increase",
//         "Developed custom WordPress themes and plugins",
//         "Managed full project lifecycle from gathering to deployment"
//       ],
//       technologies: [
//         "HTML5", "CSS3", "JavaScript", "jQuery", "WordPress",
//         "PHP", "MySQL", "Photoshop", "Figma"
//       ],
//       projects: [
//         { name: "Restaurant Website", description: "Online menu and reservation system", impact: "300% bookings" },
//         { name: "Portfolio Websites", description: "Creative portfolios for artists and designers", impact: "10+ clients" },
//         { name: "Business Landing Pages", description: "Conversion-optimized landing pages", impact: "25% avg CTR" }
//       ]
//     }
//   ];

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//         }
//       },
//       { threshold: 0.1 }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   useEffect(() => {
//     if (!isAutoPlaying) return;
    
//     const interval = setInterval(() => {
//       setActiveExperience((prev) => (prev + 1) % experiences.length);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [isAutoPlaying, experiences.length]);

//   const currentExp = experiences[activeExperience];

//   return (
//     <div ref={sectionRef} className="relative min-h-screen py-20 overflow-hidden">
//       {/* Background Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/60 to-transparent"></div>
      
//       {/* Floating Particles Animation */}
//       <div className="absolute inset-0 overflow-hidden">
//         {[...Array(25)].map((_, i) => (
//           <div
//             key={i}
//             className={`absolute w-1 h-1 bg-gradient-to-r ${currentExp.color} rounded-full animate-pulse`}
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 4}s`,
//               animationDuration: `${2 + Math.random() * 3}s`
//             }}
//           />
//         ))}
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
//         {/* Section Header */}
//         <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
//           <div className="flex items-center justify-center gap-4 mb-6">
//             <div className="w-16 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent"></div>
//             <span className="text-orange-400 font-medium tracking-wider text-lg">Professional Journey</span>
//             <div className="w-16 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent"></div>
//           </div>
//           <h2 className="text-5xl lg:text-6xl font-bold mb-6">
//             <span className="bg-gradient-to-r from-white via-slate-200 to-orange-400 bg-clip-text text-transparent">
//               Experience & Growth
//             </span>
//           </h2>
//           <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
//             A journey through innovation, learning, and delivering exceptional digital solutions 
//             across diverse projects and technologies.
//           </p>
//         </div>

//         {/* Main Content */}
//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Left Sidebar - Experience Timeline */}
//           <div className={`lg:col-span-1 transition-all duration-1000 delay-200 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
//             <div className="space-y-4 mb-8">
//               {experiences.map((exp, index) => (
//                 <button
//                   key={exp.id}
//                   className={`w-full text-left p-4 rounded-xl transition-all duration-500 border backdrop-blur-md group ${
//                     activeExperience === index
//                       ? `bg-gradient-to-r ${exp.bgColor} border-slate-600/50 scale-105`
//                       : 'bg-slate-800/30 border-slate-700/50 hover:border-slate-600/50 hover:bg-slate-800/50'
//                   }`}
//                   onClick={() => {
//                     setActiveExperience(index);
//                     setIsAutoPlaying(false);
//                   }}
//                 >
//                   <div className="flex items-center gap-3 mb-2">
//                     <div className={`w-10 h-10 bg-gradient-to-br ${exp.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
//                       <Icon icon={exp.icon} width="20" height="20" className="text-white" />
//                     </div>
//                     <div>
//                       <h3 className="font-bold text-white text-sm">{exp.company}</h3>
//                       <p className="text-xs text-slate-400">{exp.period}</p>
//                     </div>
//                   </div>
//                   <p className="text-sm text-slate-300">{exp.role}</p>
//                   <div className="flex gap-2 mt-2">
//                     <span className="px-2 py-1 bg-slate-700/50 text-slate-400 text-xs rounded-full">
//                       {exp.type}
//                     </span>
//                     <span className="px-2 py-1 bg-slate-700/50 text-slate-400 text-xs rounded-full">
//                       {exp.duration}
//                     </span>
//                   </div>
//                 </button>
//               ))}
//             </div>

//             {/* Auto-play Control */}
//             <button
//               className="w-full p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:border-cyan-400/30 transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-md"
//               onClick={() => setIsAutoPlaying(!isAutoPlaying)}
//             >
//               <Icon 
//                 icon={isAutoPlaying ? "mingcute:pause-fill" : "mingcute:play-fill"} 
//                 width="20" 
//                 height="20" 
//                 className={`text-cyan-400 ${isAutoPlaying ? 'animate-pulse' : ''}`} 
//               />
//               <span className="text-white font-medium">
//                 {isAutoPlaying ? 'Pause Auto' : 'Play Auto'}
//               </span>
//             </button>

//             {/* Progress Indicators */}
//             <div className="flex justify-center gap-2 mt-6">
//               {experiences.map((_, index) => (
//                 <button
//                   key={index}
//                   className={`h-2 rounded-full transition-all duration-300 ${
//                     activeExperience === index ? 'w-8 bg-gradient-to-r ' + currentExp.color : 'w-2 bg-slate-600'
//                   }`}
//                   onClick={() => {
//                     setActiveExperience(index);
//                     setIsAutoPlaying(false);
//                   }}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Right Content - Experience Details */}
//           <div className={`lg:col-span-2 transition-all duration-1000 delay-400 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
//             <div className="space-y-8">
//               {/* Experience Header */}
//               <div className="backdrop-blur-md bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 hover:border-slate-600/50 transition-all duration-500">
//                 <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
//                   <div className="flex items-center gap-4 mb-4 sm:mb-0">
//                     <div className={`w-16 h-16 bg-gradient-to-br ${currentExp.color} rounded-2xl flex items-center justify-center shadow-lg`}>
//                       <Icon icon={currentExp.icon} width="32" height="32" className="text-white" />
//                     </div>
//                     <div>
//                       <h3 className="text-2xl font-bold text-white">{currentExp.company}</h3>
//                       <p className={`text-lg font-semibold bg-gradient-to-r ${currentExp.color} bg-clip-text text-transparent`}>
//                         {currentExp.role}
//                       </p>
//                       <p className="text-slate-400 text-sm">{currentExp.location}</p>
//                     </div>
//                   </div>
                  
//                   <div className="flex flex-wrap gap-2">
//                     <span className="px-3 py-1 bg-slate-700/50 text-slate-300 text-sm rounded-full border border-slate-600/50">
//                       {currentExp.period}
//                     </span>
//                     <span className="px-3 py-1 bg-slate-700/50 text-slate-300 text-sm rounded-full border border-slate-600/50">
//                       {currentExp.type}
//                     </span>
//                   </div>
//                 </div>
                
//                 <p className="text-slate-300 leading-relaxed text-lg">
//                   {currentExp.description}
//                 </p>
//               </div>

//               {/* Key Achievements */}
//               <div className="backdrop-blur-md bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 hover:border-slate-600/50 transition-all duration-500">
//                 <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
//                   <Icon icon="mingcute:trophy-line" width="28" height="28" className="text-amber-500" />
//                   Key Achievements
//                 </h3>
//                 <div className="space-y-3">
//                   {currentExp.achievements.map((achievement, index) => (
//                     <div
//                       key={index}
//                       className="flex items-start gap-4 p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-300 group"
//                     >
//                       <div className={`w-2 h-2 bg-gradient-to-r ${currentExp.color} rounded-full mt-2 flex-shrink-0 group-hover:scale-150 transition-transform duration-300`} />
//                       <p className="text-slate-300 leading-relaxed">{achievement}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Technologies & Projects Grid */}
//               <div className="grid md:grid-cols-2 gap-8">
//                 {/* Technologies */}
//                 <div className="backdrop-blur-md bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 hover:border-purple-400/30 transition-all duration-500">
//                   <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
//                     <Icon icon="mingcute:code-line" width="28" height="28" className="text-purple-400" />
//                     Technologies
//                   </h3>
//                   <div className="flex flex-wrap gap-2">
//                     {currentExp.technologies.map((tech, index) => (
//                       <span
//                         key={tech}
//                         className="px-3 py-2 bg-slate-700/50 text-slate-300 text-sm rounded-lg border border-slate-600/50 hover:border-purple-400/50 hover:bg-purple-400/10 transition-all duration-300"
//                       >
//                         {tech}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Notable Projects */}
//                 <div className="backdrop-blur-md bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 hover:border-green-400/30 transition-all duration-500">
//                   <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
//                     <Icon icon="mingcute:rocket-line" width="28" height="28" className="text-green-400" />
//                     Notable Projects
//                   </h3>
//                   <div className="space-y-4">
//                     {currentExp.projects.map((project, index) => (
//                       <div
//                         key={project.name}
//                         className="p-4 bg-slate-700/30 border border-slate-600/30 rounded-xl hover:border-green-400/50 hover:bg-green-400/5 transition-all duration-300"
//                       >
//                         <div className="flex justify-between items-start mb-2">
//                           <h4 className="font-semibold text-white">{project.name}</h4>
//                           <span className="text-xs px-2 py-1 bg-green-400/20 text-green-400 rounded-full border border-green-400/30">
//                             {project.impact}
//                           </span>
//                         </div>
//                         <p className="text-sm text-slate-400">{project.description}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Call to Action */}
//               <div className="backdrop-blur-md bg-gradient-to-br from-slate-800/30 to-slate-700/30 border border-slate-700/50 rounded-2xl p-8 text-center hover:border-cyan-400/30 transition-all duration-500">
//                 <h3 className="text-2xl font-bold text-white mb-4">Ready for Your Next Project?</h3>
//                 <p className="text-slate-300 mb-6">
//                   Let's discuss how my experience can help bring your ideas to life.
//                 </p>
//                 <button
//                   onClick={() => scrollToSection?.("contactme")}
//                   className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-1"
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
//                   <div className="relative flex items-center gap-3">
//                     <Icon icon="mingcute:message-3-line" width="20" height="20" />
//                     <span>Start a Conversation</span>
//                   </div>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Career Stats - Floating */}
//         <div className={`fixed top-20 right-8 backdrop-blur-md bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 transition-all duration-1000 delay-600 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'} hidden xl:block`}>
//           <h4 className="font-bold text-white text-center mb-4 flex items-center gap-2">
//             <Icon icon="mingcute:chart-line" width="20" height="20" className="text-cyan-400" />
//             Career Stats
//           </h4>
//           <div className="space-y-4 text-center">
//             <div className="p-3 bg-slate-700/30 rounded-lg">
//               <div className="text-2xl font-bold text-cyan-400">3+</div>
//               <div className="text-xs text-slate-400">Years Experience</div>
//             </div>
//             <div className="p-3 bg-slate-700/30 rounded-lg">
//               <div className="text-2xl font-bold text-purple-400">50+</div>
//               <div className="text-xs text-slate-400">Projects Completed</div>
//             </div>
//             <div className="p-3 bg-slate-700/30 rounded-lg">
//               <div className="text-2xl font-bold text-orange-400">15+</div>
//               <div className="text-xs text-slate-400">Technologies</div>
//             </div>
//             <div className="p-3 bg-slate-700/30 rounded-lg">
//               <div className="text-2xl font-bold text-green-400">100%</div>
//               <div className="text-xs text-slate-400">Client Satisfaction</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Experiences;
// ! v5
import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";

interface ExperiencesProps {
  scrollToSection?: (id: string) => void;
}

function Experiences({ scrollToSection }: ExperiencesProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeExperience, setActiveExperience] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const sectionRef = useRef<HTMLDivElement>(null);

  const experiences = [
    {
      id: 0,
      company: "Petco",
      role: "Full-Stack Developer",
      period: "2022 - Present",
      duration: "2+ Years",
      location: "Tehran, Iran",
      type: "Full-Time",
      icon: "mingcute:building-2-line",
      color: "from-cyan-400 to-blue-500",
      bgColor: "from-cyan-400/10 to-blue-500/10",
      glowColor: "cyan-400",
      description: "Leading the development of an enterprise ERP system from inception to deployment, architecting scalable solutions that serve thousands of users.",
      achievements: [
        "Architected and built the entire frontend infrastructure from scratch",
        "Designed modular component library increasing development efficiency by 40%",
        "Integrated complex APIs serving 10,000+ daily active users",
        "Mentored junior developers and established coding standards",
        "Optimized application performance resulting in 60% faster load times"
      ],
      technologies: [
        "React", "TypeScript", "Next.js", "Zustand", "TanStack Query",
        "Tailwind CSS", "Three.js", "IndexedDB", "SQL Server", "REST APIs"
      ],
      projects: [
        { name: "ERP Core System", description: "Complete enterprise resource planning system", impact: "10,000+ users" },
        { name: "Real-time Dashboard", description: "Live analytics and monitoring dashboard", impact: "24/7 monitoring" },
        { name: "Mobile PWA", description: "Progressive web app for mobile users", impact: "70% mobile adoption" }
      ],
      responsibilities: [
        "Lead frontend architecture and development decisions",
        "Collaborate with backend teams on API design and integration",
        "Mentor junior developers and conduct code reviews",
        "Optimize application performance and user experience",
        "Implement responsive design and accessibility standards"
      ]
    },
    {
      id: 1,
      company: "LoveCode",
      role: "Frontend Developer",
      period: "2021 - 2022",
      duration: "1 Year",
      location: "Tehran, Iran",
      type: "Full-Time",
      icon: "mingcute:heart-line",
      color: "from-orange-400 to-red-500",
      bgColor: "from-orange-400/10 to-red-500/10",
      glowColor: "orange-400",
      description: "Developed responsive web applications and collaborated with cross-functional teams to deliver pixel-perfect user interfaces.",
      achievements: [
        "Developed 15+ responsive web applications using React",
        "Collaborated with UI/UX designers for pixel-perfect interfaces",
        "Improved website performance by 45% through optimization",
        "Integrated third-party APIs and payment gateways",
        "Participated in agile development processes and code reviews"
      ],
      technologies: [
        "React", "JavaScript", "CSS3", "SASS", "Redux", "Axios",
        "Bootstrap", "Material-UI", "Git", "Webpack"
      ],
      projects: [
        { name: "E-commerce Platform", description: "Full-featured online shopping experience", impact: "1,000+ products" },
        { name: "Corporate Website", description: "Company landing page and blog", impact: "50% traffic increase" },
        { name: "Admin Dashboard", description: "Content management system", impact: "90% admin efficiency" }
      ],
      responsibilities: [
        "Develop responsive user interfaces with modern frameworks",
        "Collaborate with design team on UI/UX implementation",
        "Integrate RESTful APIs and third-party services",
        "Optimize web applications for performance and accessibility",
        "Participate in agile development cycles and sprint planning"
      ]
    },
    {
      id: 2,
      company: "Freelance",
      role: "Web Developer",
      period: "2020 - 2021",
      duration: "1+ Year",
      location: "Remote",
      type: "Contract",
      icon: "mingcute:rocket-line",
      color: "from-purple-400 to-indigo-600",
      bgColor: "from-purple-400/10 to-indigo-600/10",
      glowColor: "purple-400",
      description: "Worked with various clients to deliver custom web solutions, from small business websites to complex web applications.",
      achievements: [
        "Completed 20+ projects for diverse clients across industries",
        "Built responsive websites with 100% client satisfaction",
        "Implemented SEO practices resulting in 200% traffic increase",
        "Developed custom WordPress themes and plugins",
        "Managed full project lifecycle from gathering to deployment"
      ],
      technologies: [
        "HTML5", "CSS3", "JavaScript", "jQuery", "WordPress",
        "PHP", "MySQL", "Photoshop", "Figma"
      ],
      projects: [
        { name: "Restaurant Website", description: "Online menu and reservation system", impact: "300% bookings" },
        { name: "Portfolio Websites", description: "Creative portfolios for artists and designers", impact: "10+ clients" },
        { name: "Business Landing Pages", description: "Conversion-optimized landing pages", impact: "25% avg CTR" }
      ],
      responsibilities: [
        "Gather requirements and translate into technical solutions",
        "Design and develop custom websites and web applications",
        "Implement SEO best practices and performance optimization",
        "Provide ongoing maintenance and support to clients",
        "Manage project timelines and client communication"
      ]
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

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveExperience((prev) => (prev + 1) % experiences.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, experiences.length]);

  const currentExp = experiences[activeExperience];

  return (
    <div ref={sectionRef} className="relative min-h-screen py-20 overflow-hidden">
      {/* Enhanced Fire Particles Background */}
      {/* <div className="absolute inset-0 overflow-hidden">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-gradient-to-r ${currentExp.color} rounded-full animate-pulse opacity-70`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              boxShadow: `0 0 6px ${currentExp.glowColor === 'cyan-400' ? '#22d3ee' : 
                          currentExp.glowColor === 'orange-400' ? '#fb923c' :
                          currentExp.glowColor === 'purple-400' ? '#c084fc' : '#22d3ee'}`
            }}
          />
        ))}
      </div> */}

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header Section */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent"></div>
            <span className="text-orange-400 font-bold tracking-wider text-lg uppercase">Experience</span>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent"></div>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-slate-200 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Professional Journey
            </span>
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            A timeline of growth, innovation, and impactful contributions across diverse projects and technologies
          </p>
        </div>

        {/* Central Experience Showcase */}
        <div className="relative">
          {/* Main Experience Card */}
          <div className={`relative mx-auto max-w-5xl transition-all duration-1000 delay-200 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
            <div className={`relative backdrop-blur-lg bg-slate-900/40 border border-slate-700/60 rounded-3xl overflow-hidden shadow-2xl shadow-${currentExp.glowColor}/20`}>
              {/* Experience Header */}
              <div className="p-8 border-b border-slate-700/50">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className={`w-20 h-20 bg-gradient-to-br ${currentExp.color} rounded-2xl flex items-center justify-center shadow-xl shadow-${currentExp.glowColor}/30`}>
                      <Icon icon={currentExp.icon} width="40" height="40" className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-2">{currentExp.company}</h3>
                      <p className={`text-xl font-semibold bg-gradient-to-r ${currentExp.color} bg-clip-text text-transparent mb-2`}>
                        {currentExp.role}
                      </p>
                      <div className="flex items-center gap-2 text-slate-400">
                        <Icon icon="mingcute:location-line" width="16" height="16" />
                        <span>{currentExp.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <span className={`px-4 py-2 bg-gradient-to-r ${currentExp.bgColor} border border-slate-600/50 text-white font-medium rounded-xl`}>
                      {currentExp.period}
                    </span>
                    <span className="px-4 py-2 bg-slate-800/50 border border-slate-600/50 text-slate-300 font-medium rounded-xl">
                      {currentExp.type}
                    </span>
                    <span className="px-4 py-2 bg-slate-800/50 border border-slate-600/50 text-slate-300 font-medium rounded-xl">
                      {currentExp.duration}
                    </span>
                  </div>
                </div>
                
                <p className="text-slate-300 leading-relaxed text-lg mt-6 max-w-4xl">
                  {currentExp.description}
                </p>
              </div>

              {/* Navigation Controls */}
              <div className="p-6 border-b border-slate-700/50 bg-slate-800/20 ">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      className="p-3 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50 hover:border-slate-500/50 rounded-xl transition-all duration-300 flex items-center justify-center"
                      onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    >
                      <Icon 
                        icon={isAutoPlaying ? "mingcute:pause-fill" : "mingcute:play-fill"} 
                        width="20" 
                        height="20" 
                        className={`text-${currentExp.glowColor} ${isAutoPlaying ? 'animate-pulse' : ''}`} 
                      />
                    </button>
                    
                    <div className="text-slate-300 font-medium">
                      <span className={`text-${currentExp.glowColor}`}>{activeExperience + 1}</span>
                      <span className="text-slate-500 mx-2">/</span>
                      <span className="text-slate-400">{experiences.length}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {experiences.map((_, index) => (
                      <button
                        key={index}
                        className={`h-3 rounded-full transition-all duration-500 ${
                          activeExperience === index 
                            ? `w-8 bg-gradient-to-r ${currentExp.color} shadow-lg` 
                            : 'w-3 bg-slate-600/50 hover:bg-slate-500/50'
                        }`}
                        onClick={() => {
                          setActiveExperience(index);
                          setIsAutoPlaying(false);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="p-6">
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  {[
                    { id: 'overview', icon: 'mingcute:eye-line', label: 'Overview' },
                    { id: 'achievements', icon: 'mingcute:trophy-line', label: 'Achievements' },
                    { id: 'projects', icon: 'mingcute:rocket-line', label: 'Projects' },
                    { id: 'tech', icon: 'mingcute:code-line', label: 'Tech Stack' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                        activeTab === tab.id
                          ? `bg-gradient-to-r ${currentExp.color} text-white shadow-lg`
                          : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50 border border-slate-600/30'
                      }`}
                    >
                      <Icon icon={tab.icon} width="16" height="16" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="min-h-[400px]">
                  {activeTab === 'overview' && (
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                          <Icon icon="mingcute:user-line" width="24" height="24" className={`text-${currentExp.glowColor}`} />
                          Key Responsibilities
                        </h4>
                        <div className="space-y-3">
                          {currentExp.responsibilities.map((responsibility, index) => (
                            <div key={index} className="flex items-start gap-3 p-3 bg-slate-800/30 rounded-lg border border-slate-700/30">
                              <div className={`w-2 h-2 bg-gradient-to-r ${currentExp.color} rounded-full mt-2 flex-shrink-0`} />
                              <span className="text-slate-300">{responsibility}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                          <Icon icon="mingcute:chart-line" width="24" height="24" className={`text-${currentExp.glowColor}`} />
                          Impact Metrics
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          {currentExp.projects.map((project, index) => (
                            <div key={index} className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/30">
                              <div className={`text-2xl font-bold text-${currentExp.glowColor} mb-1`}>
                                {project.impact.split(' ')[0]}
                              </div>
                              <div className="text-xs text-slate-400 uppercase tracking-wide">
                                {project.impact.split(' ').slice(1).join(' ')}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'achievements' && (
                    <div>
                      <h4 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <Icon icon="mingcute:trophy-line" width="24" height="24" className="text-amber-400" />
                        Key Achievements
                      </h4>
                      <div className="grid gap-4">
                        {currentExp.achievements.map((achievement, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-4 p-6 bg-slate-800/30 rounded-xl border border-slate-700/30 hover:border-slate-600/50 hover:bg-slate-800/50 transition-all duration-300 group"
                          >
                            <div className="w-8 h-8 bg-amber-400/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-amber-400/30 transition-all duration-300">
                              <Icon icon="mingcute:check-line" width="16" height="16" className="text-amber-400" />
                            </div>
                            <p className="text-slate-300 leading-relaxed text-lg">{achievement}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'projects' && (
                    <div>
                      <h4 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <Icon icon="mingcute:rocket-line" width="24" height="24" className="text-green-400" />
                        Notable Projects
                      </h4>
                      <div className="grid gap-6">
                        {currentExp.projects.map((project, index) => (
                          <div
                            key={index}
                            className="p-6 bg-slate-800/30 border border-slate-700/30 rounded-xl hover:border-green-400/50 hover:bg-green-400/5 transition-all duration-300 group"
                          >
                            <div className="flex justify-between items-start mb-4">
                              <h5 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors duration-300">
                                {project.name}
                              </h5>
                              <span className="text-sm px-3 py-1 bg-green-400/20 text-green-400 rounded-full border border-green-400/30 font-medium">
                                {project.impact}
                              </span>
                            </div>
                            <p className="text-slate-400 leading-relaxed">{project.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'tech' && (
                    <div>
                      <h4 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <Icon icon="mingcute:code-line" width="24" height="24" className="text-purple-400" />
                        Technology Stack
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {currentExp.technologies.map((tech, index) => (
                          <span
                            key={tech}
                            className="px-4 py-3 bg-slate-800/50 text-slate-300 font-medium rounded-xl border border-slate-600/50 hover:border-purple-400/50 hover:bg-purple-400/10 hover:text-white transition-all duration-300"
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Left Experience Timeline */}
          <div className={`absolute -left-55 top-0 w-72 transition-all duration-1000 delay-400 ${isVisible ? '-translate-x-0 opacity-100' : '-translate-x-10 opacity-0'} hidden xl:block`}>
            <div className="backdrop-blur-lg bg-slate-900/40 border border-slate-700/60 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Icon icon="mingcute:time-line" width="24" height="24" className="text-orange-400" />
                Timeline
              </h3>
              
              <div className="space-y-4">
                {experiences.map((exp, index) => (
                  <button
                    key={exp.id}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-500 border group ${
                      activeExperience === index
                        ? `bg-gradient-to-r ${exp.bgColor} border-slate-600/50 scale-105`
                        : 'bg-slate-800/30 border-slate-700/50 hover:border-slate-600/50 hover:bg-slate-800/50'
                    }`}
                    onClick={() => {
                      setActiveExperience(index);
                      setIsAutoPlaying(false);
                    }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10 bg-gradient-to-br ${exp.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon icon={exp.icon} width="20" height="20" className="text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">{exp.company}</h4>
                        <p className="text-xs text-slate-400">{exp.period}</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-300 mb-2">{exp.role}</p>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-slate-700/50 text-slate-400 text-xs rounded-full">
                        {exp.type}
                      </span>
                      <span className="px-2 py-1 bg-slate-700/50 text-slate-400 text-xs rounded-full">
                        {exp.duration}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Stats Panel */}
          <div className={`absolute -right-55 top-0 w-72 transition-all duration-1000 delay-600 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'} hidden xl:block`}>
            <div className="backdrop-blur-lg bg-slate-900/40 border border-slate-700/60 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Icon icon="mingcute:chart-line" width="24" height="24" className="text-cyan-400" />
                Career Stats
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/30">
                  <div className="text-2xl font-bold text-cyan-400 mb-1">3+</div>
                  <div className="text-sm text-slate-400">Years Experience</div>
                </div>
                <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/30">
                  <div className="text-2xl font-bold text-purple-400 mb-1">50+</div>
                  <div className="text-sm text-slate-400">Projects Completed</div>
                </div>
                <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/30">
                  <div className="text-2xl font-bold text-orange-400 mb-1">15+</div>
                  <div className="text-sm text-slate-400">Technologies</div>
                </div>
                <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/30">
                  <div className="text-2xl font-bold text-green-400 mb-1">100%</div>
                  <div className="text-sm text-slate-400">Client Satisfaction</div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-700/50">
                <button
                  onClick={() => scrollToSection?.("contactme")}
                  className={`w-full px-4 py-3 bg-gradient-to-r ${currentExp.color} rounded-xl font-semibold text-white hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2`}
                >
                  <Icon icon="mingcute:message-3-line" width="18" height="18" />
                  <span>Get in Touch</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className={`mt-16 max-w-4xl mx-auto transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="backdrop-blur-lg bg-slate-900/40 border border-slate-700/60 rounded-3xl p-8 text-center shadow-2xl">
            <h3 className="text-3xl font-bold text-white mb-4">Ready to Collaborate?</h3>
            <p className="text-slate-300 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
              Let's discuss how my experience and expertise can help bring your next project to life.
              From concept to deployment, I'm here to make it happen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToSection?.("contactme")}
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                <div className="relative flex items-center justify-center gap-3">
                  <Icon icon="mingcute:message-3-line" width="20" height="20" />
                  <span>Start a Conversation</span>
                </div>
              </button>
              <button
                onClick={() => scrollToSection?.("projects")}
                className="px-8 py-4 bg-transparent border-2 border-slate-600 rounded-xl font-semibold text-white hover:border-orange-400 hover:bg-orange-400/10 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-3"
              >
                <Icon icon="mingcute:code-line" width="20" height="20" />
                <span>View Projects</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Navigation Dots */}
      {/* <div className={`fixed right-20 top-1/2 -translate-y-1/2 transition-all duration-1000 delay-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'} hidden lg:block`}>
        <div className="backdrop-blur-lg bg-slate-900/60 border border-slate-700/50 rounded-2xl p-4">
          <div className="space-y-3">
            {experiences.map((exp, index) => (
              <button
                key={exp.id}
                className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                  activeExperience === index
                    ? `bg-gradient-to-r ${exp.color} border-transparent shadow-lg`
                    : 'border-slate-600/50 hover:border-slate-400/50'
                }`}
                onClick={() => {
                  setActiveExperience(index);
                  setIsAutoPlaying(false);
                }}
                title={`${exp.company} - ${exp.role}`}
              />
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Experiences;