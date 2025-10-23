// "use client";
// import { useEffect, useMemo, useState, useRef } from "react";
// import Particles, { initParticlesEngine } from "@tsparticles/react";
// import { loadSlim } from "@tsparticles/slim";
// import {
//   type Container,
//   type RecursivePartial,
//   IOptions,
// } from "@tsparticles/engine";

// const Particle = () => {
//   const [init, setInit] = useState(false);
//   const [isVisible, setIsVisible] = useState(true);
//   const containerRef = useRef<Container | undefined>(undefined);

//   useEffect(() => {
//     initParticlesEngine(async (engine) => {
//       await loadSlim(engine);
//     }).then(() => setInit(true));
//   }, []);

//   // Performance: Pause particles when tab is not visible
//   useEffect(() => {
//     const handleVisibilityChange = () => {
//       const visible = !document.hidden;
//       setIsVisible(visible);

//       if (containerRef.current) {
//         if (visible) {
//           containerRef.current.play();
//         } else {
//           containerRef.current.pause();
//         }
//       }
//     };

//     document.addEventListener("visibilitychange", handleVisibilityChange);
//     return () =>
//       document.removeEventListener("visibilitychange", handleVisibilityChange);
//   }, []);

//   // Performance: Reduce particles on mobile and smaller screens
//   const getParticleCount = () => {
//     if (typeof window === "undefined") return 250;

//     const width = window.innerWidth;
//     if (width < 640) return 130; // Mobile
//     if (width < 1024) return 250; // Tablet
//     return 250; // Desktop (reduced from 250)
//   };

//   const particlesLoaded = async (container: Container | undefined) => {
//     containerRef.current = container;
//   };

//   const options: RecursivePartial<IOptions> = useMemo(
//     () => ({
//       autoPlay: true,
//       backgroundMode: {
//         enable: true,
//         zIndex: 0,
//       },
//       fpsLimit: 20, // Reduced from 60 for better performance
//       particles: {
//         number: {
//           value: getParticleCount(),
//           density: {
//             enable: true,
//             width: 1920,
//             height: 1080,
//           },
//         },
//         color: {
//           value: ["#b18a4c", "#b3b56b", "#9e6e45"],
//         },
//         shape: {
//           type: "circle",
//         },
//         opacity: {
//           value: { min: 0.3, max: 0.7 }, // Slightly more visible since fewer particles
//           animation: {
//             enable: true,
//             speed: 2, // Reduced animation speed
//             sync: false,
//           },
//         },
//         size: {
//           value: { min: 1, max: 2.5 }, // Slightly smaller max size
//           animation: {
//             enable: true,
//             speed: 2, // Reduced animation speed
//             sync: false,
//           },
//         },
//         move: {
//           enable: true,
//           speed: 1, // Reduced speed for smoother performance
//           random: true,
//           straight: false,
//           outModes: {
//             default: "bounce",
//           },
//           attract: {
//             enable: false, // Disable for performance
//           },
//         },
//         wobble: {
//           enable: true,
//           distance: 3, // Reduced wobble distance
//           speed: {
//             angle: 5, // Reduced wobble speed
//             move: 5, // Reduced wobble speed
//           },
//         },
//       },
//       detectRetina: true,
//       // Performance optimizations
//       smooth: true,
//       style: {
//         position: "fixed",
//       },
//       // Reduce rendering load
//       interactivity: {
//         events: {
//           onHover: {
//             enable: false, // Disable hover interactions for performance
//           },
//           onClick: {
//             enable: false, // Disable click interactions for performance
//           },
//           resize: {
//             delay: 500,
//             enable: true,
//           },
//         },
//       },
//     }),
//     []
//   );

//   // Don't render particles on very small screens or if not initialized
//   if (!init || (typeof window !== "undefined" && window.innerWidth < 480)) {
//     return null;
//   }

//   return (
//     <div className="fixed inset-0 z-0 pointer-events-none">
//       <Particles
//         id="tsparticles"
//         options={{
//           ...options,
//           background: {
//             color: { value: "transparent" },
//           },
//         }}
//         particlesLoaded={particlesLoaded}
//         className="w-full h-full"
//         style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           pointerEvents: "none",
//         }}
//       />
//     </div>
//   );
// };

// export default Particle;
