// // ============================================================================
// // 2. OPTIMIZED ParticleWrapper.tsx - Lazy Loading & Performance
// // ============================================================================
// "use client";

// import { lazy, Suspense, useState, useEffect } from "react";

// // Lazy load particles for better initial page load
// const Particle = lazy(() => import("./Particle"));

// export default function ParticleWrapper() {
//   const [shouldLoadParticles, setShouldLoadParticles] = useState(false);

//   useEffect(() => {
//     // Delay particle loading for better initial page load performance
//     const timer = setTimeout(() => {
//       setShouldLoadParticles(true);
//     }, 500); // Load particles after 500ms

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div
//       className="fixed inset-0 z-0"
//       style={{
//         backgroundImage: `url(/whale.jpg)`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       {shouldLoadParticles && (
//         <Suspense fallback={null}>
//           <Particle />
//         </Suspense>
//       )}
//     </div>
//   );
// }