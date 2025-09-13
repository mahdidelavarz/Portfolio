// // src/components/HeaderMenu.tsx
// import React, { useState, useEffect } from "react";

// interface NavItem {
//   id: string;
//   title: string;
// }

// const HeaderMenu: React.FC = () => {
//   const [activeSlide, setActiveSlide] = useState<string>("home");

//   const slides: NavItem[] = [
//     { id: "home", title: "Home" },
//     { id: "aboutme", title: "About Me" },
//     { id: "educations", title: "Educations" },
//     { id: "experiences", title: "Experiences" },
//     { id: "projects", title: "Projects" },
//     { id: "skills", title: "Skills" },
//     { id: "contactme", title: "Contact Me" },
//   ];

//   const scrollToSlide = (id: string) => {
//     const element = document.getElementById(id);
//     if (element) {
//       const offsetTop = element.offsetTop - 100; // Adjust for header height
//       window.scrollTo({
//         top: offsetTop,
//         behavior: "smooth",
//       });
//       setActiveSlide(id);
//     }
//   };

//   // Optional: Update active slide on scroll
//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollPosition = window.scrollY + 150; // Offset for active detection

//       for (let i = slides.length - 1; i >= 0; i--) {
//         const section = document.getElementById(slides[i].id);
//         if (section && scrollPosition >= section.offsetTop) {
//           setActiveSlide(slides[i].id);
//           break;
//         }
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [slides]);

//   return (
//     <nav className="fixed top-0 left-0 w-full z-50 flex justify-center p-4">
//       <div className="relative px-6 py-2 rounded-2xl backdrop-blur-sm bg-black/20">
//         {/* Gradient Border via Mask Technique */}
//         <div
//           className="absolute inset-0 rounded-2xl pointer-events-none"
//           style={{
//             padding: "1px",
//             background: "linear-gradient(to left, #7C6437, #27596C, #24526A)",
//             WebkitMask:
//               "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
//             WebkitMaskComposite: "xor",
//             maskComposite: "exclude",
//           }}
//         ></div>

//         {/* Inner Content */}
//         <div className="relative z-10 flex gap-2 md:gap-4 flex-wrap justify-center">
//           {slides.map((slide) => (
//             <button
//               key={slide.id}
//               onClick={() => scrollToSlide(slide.id)}
//               className={`text-white text-sm md:text-base px-3 py-1.5 rounded-lg transition-all duration-300 cursor-pointer whitespace-nowrap
//                 ${
//                   activeSlide === slide.id
//                     ? "opacity-100 font-medium scale-105"
//                     : "opacity-70 hover:opacity-100 hover:scale-102"
//                 }`}
//             >
//               {slide.title}
//             </button>
//           ))}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default HeaderMenu;
//! v2
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState, useEffect } from "react";

interface NavItem {
  id: string;
  title: string;
  icon : any
}

const HeaderMenu: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState<string>("home");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const slides: NavItem[] = [
    { id: "home", title: "Home", icon:<Icon icon="solar:home-2-bold" width="30" height="30" /> },
    { id: "aboutme", title: "About Me", icon: <Icon icon="mingcute:user-warning-fill" width="30" height="30" /> },
    { id: "educations", title: "Educations", icon: <Icon icon="mdi:account-student" width="30" height="30" /> },
    { id: "experiences", title: "Experiences", icon: <Icon icon="mingcute:user-star-fill" width="30" height="30" /> },
    { id: "projects", title: "Projects", icon: <Icon icon="streamline-flex:keyboard-option-setting-gear-solid" width="30" height="30" /> },
    { id: "skills", title: "Skills", icon:<Icon icon="streamline-flex:artificial-intelligence-brain-chip-solid" width="30" height="30" /> },
    { id: "contactme", title: "Contact Me", icon: <Icon icon="streamline-ultimate:phone-retro-1-bold" width="30" height="30" /> },
  ];

  const scrollToSlide = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
      setActiveSlide(id);
    }
  };

  // Update active slide on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = slides.length - 1; i >= 0; i--) {
        const section = document.getElementById(slides[i].id);
        if (section && scrollPosition >= section.offsetTop) {
          setActiveSlide(slides[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [slides]);

  return (
    <nav 
      className={`fixed right-6 top-1/2 -translate-y-1/2 z-50 transition-all duration-500 ${
        isExpanded ? 'w-48' : 'w-16'
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Background Panel */}
      <div className={`absolute inset-0 backdrop-blur-md bg-black/10  rounded-2xl transition-all duration-500 ${
        isExpanded ? 'opacity-100' : 'opacity-0'
      }`} />

      {/* Navigation Items Container */}
      <div className="relative z-10 py-6">
        {/* Active Indicator Line */}
        {/* <div 
          className="absolute left-4 w-0.5 bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-500 rounded-full transition-all duration-500"
          style={{
            height: '32px',
            top: `${24 + slides.findIndex(slide => slide.id === activeSlide) * 56}px`,
          }}
        /> */}

        {/* Progress Line */}
        {/* <div className="absolute left-4 top-6 bottom-6 w-0.5 bg-white/20 rounded-full" /> */}

        {/* Navigation Items */}
        <div className="space-y-2">
          {slides.map((slide) => {
            const isActive = activeSlide === slide.id;
            
            return (
              <button
                key={slide.id}
                onClick={() => scrollToSlide(slide.id)}
                className={`group relative w-full flex items-center gap-4 px-4 py-3 transition-all duration-300 hover:scale-105 cursor-pointer ${
                  isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {/* Dot Indicator */}
                {/* <div className={`relative z-20 w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500 border-cyan-400 scale-125' 
                    : 'border-white/40 group-hover:border-white/60 group-hover:scale-110'
                }`}>
                  {isActive && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse" />
                  )}
                </div> */}

                {/* Label */}
                <div className={`overflow-hidden transition-all duration-500 flex gap-3 ${
                  isExpanded ? 'w-auto opacity-100' : 'w-0 opacity-0'
                }`}>
                  {slide.icon}
                  <span className={`text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                  }`}>
                    {slide.title}
                  </span>
                </div>

                {/* Icon Badge - Always Visible */}
                <div className={`absolute right-4 transition-all duration-300 ${
                  isExpanded ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
                } ${
                  isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'
                }`}>
                 {slide.icon} 
                </div>

                {/* Hover Effect */}
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 transition-all duration-300 ${
                  isActive ? 'opacity-30' : 'opacity-0 group-hover:opacity-20'
                }`} />
              </button>
            );
          })}
        </div>

        {/* Menu Toggle Hint */}
        <div className={`absolute -left-8 top-1/2 -translate-y-1/2 transition-all duration-500 ${
          isExpanded ? 'opacity-0 -translate-x-2' : 'opacity-60 translate-x-0'
        }`}>
          <div className="w-6 h-0.5 bg-gradient-to-r from-transparent to-white/30" />
        </div>
      </div>
    </nav>
  );
};

export default HeaderMenu;