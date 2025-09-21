"use client";
import * as THREE from "three";
import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Image as DreiImage,
  ScrollControls,
  useScroll,
  ImageProps as DreiImageProps,
} from "@react-three/drei";
import { easing } from "maath";
import { ThreeEvent } from "@react-three/fiber";
import "../../utils/util";
import ScrollHandler from "./ScrollHandler";

// Props types
type RigProps = {
  rotation?: [number, number, number];
  children?: React.ReactNode;
};

type CardProps = DreiImageProps & {
  url: string;
  position: [number, number, number];
  rotation: [number, number, number];
  index: number;
  count: number;
  openModal: boolean;
  setOpenModal: any;
};

type CarouselProps = {
  radius?: number;
  count?: number;
  openModal: boolean;
  setOpenModal: any;
};

type ThreeSliderProps = {
  onScrollProgress?: (progress: number) => void;
  openModal: boolean;
  setOpenModal: any;
};

function ThreeSlider({
  onScrollProgress,
  openModal,
  setOpenModal,
}: ThreeSliderProps) {
  return (
    <div
      className={`w-full h-full m-0 p-0 font-inter relative`}
      style={{ pointerEvents: "auto", overflow: "visible" }}
    >
      <Canvas camera={{ position: [0, 0, 20], fov: 15 }}>
        <ScrollControls pages={8} damping={0.05}>
          <Rig rotation={[0.1, 0.5, 0.1]}>
            <Carousel openModal={openModal} setOpenModal={setOpenModal} />
          </Rig>
          {onScrollProgress && (
            <ScrollHandler onScrollProgress={onScrollProgress} />
          )}
        </ScrollControls>
      </Canvas>
    </div>
  );
}

function Rig({ rotation, children }: RigProps) {
  const ref = useRef<THREE.Group>(null);
  const scroll = useScroll();
  const { pointer, camera } = useThree();

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y = -scroll.offset * Math.PI * 2;
      // console.log("Rig rotation:", ref.current.rotation.y); // Debug log
    }
    easing.damp3(
      camera.position,
      [-pointer.x * 2, pointer.y + 1.5, 10],
      0.1,
      delta
    );
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={ref} rotation={rotation}>
      {children}
    </group>
  );
}

function Carousel({
  radius = 1.4,
  count = 8,
  openModal,
  setOpenModal,
}: CarouselProps) {
  return Array.from({ length: count }, (_, i) => (
    <Card
      key={i}
      url={`/img${(i % 8) + 1}_.jpg`}
      position={[
        Math.sin((i / count) * Math.PI * 2) * radius,
        0,
        Math.cos((i / count) * Math.PI * 2) * radius,
      ]}
      rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}
      index={i}
      count={window.innerWidth > 768 ? 8 : 4}
      openModal={openModal}
      setOpenModal={setOpenModal}
    />
  ));
}

type CustomImageMaterial = THREE.Material & {
  radius?: number;
  zoom?: number;
};

function Card({
  url,
  position,
  rotation,
  index,
  count,
  setOpenModal,
}: CardProps) {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [targetScroll, setTargetScroll] = useState<number | null>(null);
  const scroll = useScroll();
  const scrollState = useRef({ value: 0 }); // Object to hold scroll value for damping

  // Prevent page scrolling while slider is animating
  useEffect(() => {
    const preventScroll = (e: WheelEvent | TouchEvent) => {
      if (targetScroll !== null) {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", preventScroll, { passive: true });
    window.addEventListener("touchmove", preventScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    };
  }, [targetScroll]);

  const pointerOver = (e: ThreeEvent<PointerEvent>) => (
    e.stopPropagation(), setHovered(true)
  );
  const pointerOut = () => setHovered(false);

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    // setOpenModal(true);
    const targetOffset = index / count;
    setTargetScroll(targetOffset * scroll.el.scrollHeight);
    scrollState.current.value = scroll.el.scrollTop; // Initialize with current scroll
  };

  useFrame((state, delta) => {
    if (ref.current) {
      easing.damp3(
        ref.current.scale,
        hovered ? [1.15, 1.15, 1.15] : [1, 1, 1],
        0.1,
        delta
      );
      const material = ref.current.material as CustomImageMaterial;
      if (material.radius !== undefined) {
        easing.damp(material, "radius", hovered ? 0.25 : 0.1, 0.2, delta);
      }
      if (material.zoom !== undefined) {
        easing.damp(material, "zoom", hovered ? 1 : 1.5, 0.2, delta);
      }
    }
    // Smoothly animate scroll position
    if (targetScroll !== null) {
      easing.damp(
        scrollState.current,
        "value",
        targetScroll,
        0.5,
        delta,
        undefined,
        undefined,
        0.01
      );
      scroll.el.scrollTop = scrollState.current.value;
      if (Math.abs(scrollState.current.value - targetScroll) < 0.1) {
        setTargetScroll(null); // Stop animation when close enough
      }
    }
  });

  return (
    <DreiImage
      ref={ref}
      url={url}
      transparent
      side={THREE.DoubleSide}
      onPointerOver={pointerOver}
      onPointerOut={pointerOut}
      onClick={handleClick}
      position={position}
      rotation={rotation}
    >
      <curvedPlaneGeometry args={[0.1, 1, 1, 20, 20]} />
    </DreiImage>
  );
}

export default ThreeSlider;
// "use client";
// import { useRef, useState, useEffect, useCallback } from "react";
// import ScrollHandler from "./ScrollHandler";

// // Project data - replace with your actual project data
// const PROJECT_DATA = [
//   {
//     id: 1,
//     image: "/img1_.jpg",
//     title: "E-Commerce Platform",
//     category: "Full Stack",
//     year: "2024",
//     color: "from-cyan-400 to-blue-500",
//     bgColor: "from-cyan-400/10 to-blue-500/10",
//   },
//   {
//     id: 2,
//     image: "/img2_.jpg", 
//     title: "3D Portfolio Website",
//     category: "3D Web",
//     year: "2024",
//     color: "from-purple-400 to-indigo-600",
//     bgColor: "from-purple-400/10 to-indigo-600/10",
//   },
//   {
//     id: 3,
//     image: "/img3_.jpg",
//     title: "Task Management App", 
//     category: "Web App",
//     year: "2023",
//     color: "from-orange-400 to-red-500",
//     bgColor: "from-orange-400/10 to-red-500/10",
//   },
//   {
//     id: 4,
//     image: "/img4_.jpg",
//     title: "AI Chat Interface",
//     category: "AI/ML", 
//     year: "2024",
//     color: "from-slate-400 to-gray-600",
//     bgColor: "from-slate-400/10 to-gray-600/10",
//   },
//   {
//     id: 5,
//     image: "/img5_.jpg",
//     title: "Analytics Dashboard",
//     category: "Data Viz",
//     year: "2024", 
//     color: "from-cyan-400 to-teal-500",
//     bgColor: "from-cyan-400/10 to-teal-500/10",
//   },
//   {
//     id: 6,
//     image: "/img6_.jpg",
//     title: "Progressive Web App",
//     category: "Mobile",
//     year: "2023",
//     color: "from-purple-400 to-blue-600", 
//     bgColor: "from-purple-400/10 to-blue-600/10",
//   },
// ];

// type ModernSliderProps = {
//   onScrollProgress?: (progress: number) => void;
//   openModal: boolean;
//   setOpenModal: any;
// };

// function ModernSlider({
//   onScrollProgress,
//   openModal,
//   setOpenModal,
// }: ModernSliderProps) {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isScrolling, setIsScrolling] = useState(false);
//   const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const scrollTimeoutRef = useRef<NodeJS.Timeout>();
//   const lastScrollRef = useRef(0);
//   const scrollAccumulatorRef = useRef(0);

//   const handleScroll = useCallback((e: WheelEvent) => {
//     e.preventDefault();
    
//     if (isScrolling) return;
    
//     const delta = e.deltaY;
//     const currentTime = Date.now();
    
//     // Accumulate scroll delta
//     scrollAccumulatorRef.current += Math.abs(delta);
    
//     // Set scroll direction
//     setScrollDirection(delta > 0 ? 'down' : 'up');
    
//     // Clear existing timeout
//     if (scrollTimeoutRef.current) {
//       clearTimeout(scrollTimeoutRef.current);
//     }
    
//     // Debounce scroll handling
//     scrollTimeoutRef.current = setTimeout(() => {
//       if (scrollAccumulatorRef.current > 100) { // Threshold for scroll sensitivity
//         const direction = delta > 0 ? 1 : -1;
//         const newIndex = Math.max(0, Math.min(PROJECT_DATA.length - 1, activeIndex + direction));
        
//         if (newIndex !== activeIndex) {
//           setIsScrolling(true);
//           setActiveIndex(newIndex);
          
//           // Calculate progress and notify parent
//           const progress = newIndex / (PROJECT_DATA.length - 1);
//           onScrollProgress?.(progress);
          
//           // Reset scrolling state after animation
//           setTimeout(() => {
//             setIsScrolling(false);
//             setScrollDirection(null);
//           }, 800);
//         }
//       }
      
//       scrollAccumulatorRef.current = 0;
//     }, 50);
//   }, [activeIndex, isScrolling, onScrollProgress]);

//   // Handle touch events for mobile
//   const [touchStart, setTouchStart] = useState<{ y: number; time: number } | null>(null);
  
//   const handleTouchStart = useCallback((e: TouchEvent) => {
//     setTouchStart({
//       y: e.touches[0].clientY,
//       time: Date.now()
//     });
//   }, []);

//   const handleTouchMove = useCallback((e: TouchEvent) => {
//     e.preventDefault();
//   }, []);

//   const handleTouchEnd = useCallback((e: TouchEvent) => {
//     if (!touchStart || isScrolling) return;
    
//     const touchEnd = e.changedTouches[0].clientY;
//     const deltaY = touchStart.y - touchEnd;
//     const deltaTime = Date.now() - touchStart.time;
    
//     // Minimum swipe distance and maximum time for gesture recognition
//     if (Math.abs(deltaY) > 50 && deltaTime < 500) {
//       const direction = deltaY > 0 ? 1 : -1;
//       const newIndex = Math.max(0, Math.min(PROJECT_DATA.length - 1, activeIndex + direction));
      
//       if (newIndex !== activeIndex) {
//         setIsScrolling(true);
//         setActiveIndex(newIndex);
//         setScrollDirection(direction > 0 ? 'down' : 'up');
        
//         const progress = newIndex / (PROJECT_DATA.length - 1);
//         onScrollProgress?.(progress);
        
//         setTimeout(() => {
//           setIsScrolling(false);
//           setScrollDirection(null);
//         }, 800);
//       }
//     }
    
//     setTouchStart(null);
//   }, [touchStart, activeIndex, isScrolling, onScrollProgress]);

//   // Set up event listeners
//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     // Mouse wheel events
//     container.addEventListener('wheel', handleScroll, { passive: false });
    
//     // Touch events
//     container.addEventListener('touchstart', handleTouchStart, { passive: false });
//     container.addEventListener('touchmove', handleTouchMove, { passive: false });
//     container.addEventListener('touchend', handleTouchEnd, { passive: false });

//     return () => {
//       container.removeEventListener('wheel', handleScroll);
//       container.removeEventListener('touchstart', handleTouchStart);
//       container.removeEventListener('touchmove', handleTouchMove);
//       container.removeEventListener('touchend', handleTouchEnd);
      
//       if (scrollTimeoutRef.current) {
//         clearTimeout(scrollTimeoutRef.current);
//       }
//     };
//   }, [handleScroll, handleTouchStart, handleTouchMove, handleTouchEnd]);

//   const currentProject = PROJECT_DATA[activeIndex];

//   return (
//     <div
//       ref={containerRef}
//       className="relative w-full h-full overflow-hidden rounded-3xl cursor-grab active:cursor-grabbing"
//       style={{ touchAction: 'none' }}
//     >
//       {/* Background layers with stacked effect */}
//       <div className="absolute inset-0">
//         {PROJECT_DATA.map((project, index) => {
//           const offset = index - activeIndex;
//           const isActive = index === activeIndex;
//           const isPrev = index < activeIndex;
//           const isNext = index > activeIndex;
          
//           return (
//             <div
//               key={project.id}
//               className={`absolute inset-0 transition-all duration-700 ease-out ${
//                 isActive 
//                   ? 'opacity-100 scale-100 z-20' 
//                   : isPrev
//                   ? 'opacity-30 scale-95 z-10'
//                   : isNext 
//                   ? 'opacity-20 scale-105 z-10'
//                   : 'opacity-0 scale-110 z-0'
//               }`}
//               style={{
//                 transform: `translateY(${offset * (isActive ? 0 : 20)}px) translateZ(${isActive ? 0 : -100}px)`,
//               }}
//             >
//               {/* Project Image */}
//               <div className="absolute inset-0 overflow-hidden">
//                 <img
//                   src={project.image}
//                   alt={project.title}
//                   className={`w-full h-full object-cover transition-all duration-1000 ${
//                     isActive ? 'scale-100' : 'scale-110'
//                   }`}
//                   loading={Math.abs(offset) <= 1 ? 'eager' : 'lazy'}
//                 />
                
//                 {/* Dynamic overlay based on project */}
//                 <div className={`absolute inset-0 bg-gradient-to-br ${project.bgColor} mix-blend-overlay`} />
//                 <div className="absolute inset-0 bg-slate-900/50" />
                
//                 {/* Animated gradient overlay for active slide */}
//                 {isActive && (
//                   <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-20 animate-pulse`} />
//                 )}
//               </div>

//               {/* Floating elements for active slide */}
//               {isActive && (
//                 <div className="absolute inset-0 pointer-events-none overflow-hidden">
//                   {/* Animated particles */}
//                   {[...Array(8)].map((_, i) => (
//                     <div
//                       key={i}
//                       className={`absolute w-1 h-1 bg-gradient-to-r ${project.color} rounded-full opacity-60`}
//                       style={{
//                         left: `${15 + i * 10}%`,
//                         top: `${20 + (i % 3) * 25}%`,
//                         animation: `float ${2 + i * 0.3}s ease-in-out infinite`,
//                         animationDelay: `${i * 0.2}s`
//                       }}
//                     />
//                   ))}
                  
//                   {/* Geometric shapes */}
//                   <div 
//                     className={`absolute top-1/4 right-1/4 w-24 h-24 border border-white/10 rotate-45`}
//                     style={{
//                       animation: 'spin 20s linear infinite'
//                     }}
//                   />
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* Content overlay */}
//       <div className="relative z-30 h-full flex flex-col justify-center items-center text-center p-8">
//         <div className={`transition-all duration-500 ${
//           isScrolling ? 'opacity-50 translate-y-4' : 'opacity-100 translate-y-0'
//         }`}>
//           {/* Project category badge */}
//           <div className={`inline-flex items-center gap-2 px-4 py-2 backdrop-blur-md bg-white/10 border border-white/20 rounded-full text-sm font-medium text-white mb-6`}>
//             <div className={`w-2 h-2 bg-gradient-to-r ${currentProject.color} rounded-full animate-pulse`} />
//             {currentProject.category} • {currentProject.year}
//           </div>

//           {/* Project title with enhanced styling */}
//           <h3 className={`text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r ${currentProject.color} bg-clip-text text-transparent filter drop-shadow-lg`}>
//             {currentProject.title}
//           </h3>

//           {/* Slide counter */}
//           <div className="flex items-center justify-center gap-2 mt-8">
//             <span className="text-white/60 text-sm">
//               {String(activeIndex + 1).padStart(2, '0')}
//             </span>
//             <div className="w-12 h-px bg-white/20">
//               <div 
//                 className={`h-full bg-gradient-to-r ${currentProject.color} transition-all duration-700`}
//                 style={{ width: `${((activeIndex + 1) / PROJECT_DATA.length) * 100}%` }}
//               />
//             </div>
//             <span className="text-white/40 text-sm">
//               {String(PROJECT_DATA.length).padStart(2, '0')}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Navigation indicators */}
//       <div className="absolute right-6 top-1/2 transform -translate-y-1/2 z-30">
//         <div className="flex flex-col gap-2">
//           {PROJECT_DATA.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => {
//                 if (!isScrolling && index !== activeIndex) {
//                   setIsScrolling(true);
//                   setActiveIndex(index);
//                   const progress = index / (PROJECT_DATA.length - 1);
//                   onScrollProgress?.(progress);
//                   setTimeout(() => setIsScrolling(false), 800);
//                 }
//               }}
//               className={`w-2 h-8 rounded-full transition-all duration-300 ${
//                 index === activeIndex
//                   ? `bg-gradient-to-b ${currentProject.color} shadow-lg`
//                   : 'bg-white/20 hover:bg-white/30'
//               }`}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Scroll direction indicator */}
//       {scrollDirection && (
//         <div className="absolute top-1/2 left-6 transform -translate-y-1/2 z-30">
//           <div className={`text-white/60 text-2xl transition-all duration-300 ${
//             scrollDirection === 'down' ? 'animate-bounce' : 'animate-bounce rotate-180'
//           }`}>
//             ↓
//           </div>
//         </div>
//       )}

//       {/* Instructions */}
//       <div className="absolute bottom-6 left-6 z-30">
//         <div className="backdrop-blur-md bg-black/20 border border-white/10 rounded-lg px-4 py-2">
//           <div className="flex items-center gap-2 text-white/60 text-sm">
//             <div className="w-4 h-4 border border-white/40 rounded border-dashed animate-spin" />
//             <span>Scroll or swipe to navigate</span>
//           </div>
//         </div>
//       </div>

//       {/* ScrollHandler compatibility - no longer needed since we handle scroll internally */}

//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px) rotate(0deg); }
//           33% { transform: translateY(-8px) rotate(2deg); }
//           66% { transform: translateY(4px) rotate(-1deg); }
//         }
        
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//       `}</style>
//     </div>
//   );
// }

// export default ModernSlider;