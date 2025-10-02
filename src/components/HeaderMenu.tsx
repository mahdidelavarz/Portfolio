// ============================================================================
// 1. OPTIMIZED HeaderMenu.tsx - Major Performance Improvements
// ============================================================================
"use client";

import { Icon } from "@iconify/react";
import React, { useState, useEffect, useCallback } from "react";


interface NavItem {
  id: string;
  title: string;
  iconName: string; // Changed from JSX.Element to string for better performance
}

// Move static data outside component to prevent recreation
const NAVIGATION_ITEMS: NavItem[] = [
  { id: "home", title: "Home", iconName: "solar:home-2-bold" },
  { id: "aboutme", title: "About Me", iconName: "mingcute:user-warning-fill" },
  { id: "educations", title: "Educations", iconName: "mdi:account-student" },
  { id: "experiences", title: "Experiences", iconName: "mingcute:user-star-fill" },
  { id: "projects", title: "Projects", iconName: "streamline-flex:keyboard-option-setting-gear-solid" },
  { id: "skills", title: "Skills", iconName: "streamline-flex:artificial-intelligence-brain-chip-solid" },
  { id: "contactme", title: "Contact Me", iconName: "streamline-ultimate:phone-retro-1-bold" },
];

const HeaderMenu: React.FC = React.memo(() => {
  const [activeSlide, setActiveSlide] = useState<string>("home");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Memoize scroll function to prevent recreation
  const scrollToSlide = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const currentScrollY = window.pageYOffset;
    const targetScrollY = rect.top + currentScrollY;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });

    setActiveSlide(id);
  }, []);

  // Throttled scroll handler for better performance
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.pageYOffset;
          const viewportHeight = window.innerHeight;
          const triggerPoint = scrollY + viewportHeight * 0.3;

          let newActiveSlide = "home";

          // Use for...of for better performance than forEach
          for (const item of NAVIGATION_ITEMS) {
            const section = document.getElementById(item.id);
            if (!section) continue;

            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (triggerPoint >= sectionTop && triggerPoint < sectionBottom) {
              newActiveSlide = item.id;
              break;
            }
          }

          if (newActiveSlide !== activeSlide) {
            setActiveSlide(newActiveSlide);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSlide]);

  // Memoize handlers to prevent recreation
  const handleMouseEnter = useCallback(() => setIsExpanded(true), []);
  const handleMouseLeave = useCallback(() => setIsExpanded(false), []);

  return (
    <nav
      className={`fixed right-6 top-1/2 -translate-y-1/2 z-50 transition-all duration-300 ${isExpanded ? "w-48" : "w-16"}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="Main navigation"
    >
      <div
        className={`absolute inset-0 backdrop-blur-md bg-black/10 rounded-2xl transition-all duration-300 ${
          isExpanded ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="relative z-10 py-6 space-y-2">
        {NAVIGATION_ITEMS.map((item) => {
          const isActive = activeSlide === item.id;
          return (
            <NavigationButton
              key={item.id}
              item={item}
              isActive={isActive}
              isExpanded={isExpanded}
              onClick={scrollToSlide}
            />
          );
        })}
      </div>
    </nav>
  );
});

// Separate memoized component for navigation buttons
const NavigationButton = React.memo<{
  item: NavItem;
  isActive: boolean;
  isExpanded: boolean;
  onClick: (id: string) => void;
}>(({ item, isActive, isExpanded, onClick }) => {
  const handleClick = useCallback(() => onClick(item.id), [item.id, onClick]);

  return (
    <button
      onClick={handleClick}
      className={`group relative w-full lg:flex items-center gap-4 px-4 py-3 transition-all duration-300 hover:scale-105 cursor-pointer hidden ${
        isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
      }`}
      aria-label={`Navigate to ${item.title}`}
    >
      <div
        className={`overflow-hidden transition-all duration-300 flex items-center gap-3 ${
          isExpanded ? "w-auto opacity-100" : "w-0 opacity-0"
        }`}
      >
        <Icon icon={item.iconName} width={30} height={30}  />
        <span
          className={`text-sm font-medium whitespace-nowrap transition-all duration-300 ${
            isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200"
          }`}
        >
          {item.title}
        </span>
      </div>

      <div
        className={`absolute right-4 transition-all duration-300 ${
          isExpanded ? "opacity-0 scale-90" : "opacity-100 scale-100"
        } ${isActive ? "text-cyan-400" : "text-slate-500 group-hover:text-slate-300"}`}
      >
        <Icon icon={item.iconName} width={30} height={30}  />
      </div>

      <div
        className={`absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 transition-all duration-300 ${
          isActive ? "opacity-30" : "opacity-0 group-hover:opacity-20"
        }`}
      />
    </button>
  );
});

HeaderMenu.displayName = "HeaderMenu";
NavigationButton.displayName = "NavigationButton";

export default HeaderMenu;