import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState, useEffect } from "react";

interface NavItem {
  id: string;
  title: string;
  icon: any;
}

const HeaderMenu: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState<string>("home");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const slides: NavItem[] = [
    { id: "home", title: "Home", icon: <Icon icon="solar:home-2-bold" width="30" height="30" /> },
    { id: "aboutme", title: "About Me", icon: <Icon icon="mingcute:user-warning-fill" width="30" height="30" /> },
    { id: "educations", title: "Educations", icon: <Icon icon="mdi:account-student" width="30" height="30" /> },
    { id: "experiences", title: "Experiences", icon: <Icon icon="mingcute:user-star-fill" width="30" height="30" /> },
    { id: "projects", title: "Projects", icon: <Icon icon="streamline-flex:keyboard-option-setting-gear-solid" width="30" height="30" /> },
    { id: "skills", title: "Skills", icon: <Icon icon="streamline-flex:artificial-intelligence-brain-chip-solid" width="30" height="30" /> },
    { id: "contactme", title: "Contact Me", icon: <Icon icon="streamline-ultimate:phone-retro-1-bold" width="30" height="30" /> },
  ];

  const scrollToSlide = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Force a small delay to ensure DOM measurements are accurate
      setTimeout(() => {
        const rect = element.getBoundingClientRect();
        const currentScrollY = window.pageYOffset;
        const elementTop = rect.top + currentScrollY;
        
        // Calculate the desired scroll position
        // We want to position the section title/start about 80-100px from the top
        const desiredOffset = 0; // Distance from top of viewport
        const targetScrollY = elementTop - desiredOffset;
        
        console.log({
          id,
          elementTop,
          currentScrollY,
          targetScrollY,
          rectTop: rect.top
        });

        window.scrollTo({
          top: Math.max(0, targetScrollY),
          behavior: "smooth",
        });

        setActiveSlide(id);
      }, 50);
    }
  };

  // Improved scroll detection
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (ticking) return;
      
      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = window.pageYOffset;
        const viewportHeight = window.innerHeight;
        const triggerPoint = scrollY + (viewportHeight * 0.3); // 30% down the viewport
        
        let newActiveSlide = "home";
        
        // Check each section to see which one is most prominent
        for (let i = 0; i < slides.length; i++) {
          const section = document.getElementById(slides[i].id);
          if (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionBottom = sectionTop + sectionHeight;
            
            // If the trigger point is within this section
            if (triggerPoint >= sectionTop && triggerPoint < sectionBottom) {
              newActiveSlide = slides[i].id;
              break;
            }
            
            // Also check if this section occupies the most visible area
            const visibleTop = Math.max(sectionTop, scrollY);
            const visibleBottom = Math.min(sectionBottom, scrollY + viewportHeight);
            const visibleHeight = Math.max(0, visibleBottom - visibleTop);
            
            // If more than 50% of viewport is occupied by this section
            if (visibleHeight > viewportHeight * 0.5) {
              newActiveSlide = slides[i].id;
            }
          }
        }
        
        setActiveSlide(newActiveSlide);
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [slides]);

  return (
    <nav 
      className={`fixed right-6 top-1/2 -translate-y-1/2 z-50 transition-all duration-500 hidden lg:block ${
        isExpanded ? 'w-48' : 'w-16'
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Background Panel */}
      <div className={`absolute inset-0 backdrop-blur-md bg-black/10 rounded-2xl transition-all duration-500 ${
        isExpanded ? 'opacity-100' : 'opacity-0'
      }`} />

      {/* Navigation Items Container */}
      <div className="relative z-10 py-6">
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
                aria-label={`Navigate to ${slide.title} section`}
              >
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