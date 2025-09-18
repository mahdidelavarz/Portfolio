// components/HeaderMenu.tsx
"use client";

import { Icon } from "@iconify/react";
import React, { useState, useEffect, JSX } from "react";

interface NavItem {
  id: string;
  title: string;
  icon: JSX.Element;
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
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const currentScrollY = window.pageYOffset;
    const targetScrollY = rect.top + currentScrollY;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });

    setActiveSlide(id);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset;
      const viewportHeight = window.innerHeight;
      const triggerPoint = scrollY + viewportHeight * 0.3;

      let newActiveSlide = "home";

      for (const slide of slides) {
        const section = document.getElementById(slide.id);
        if (!section) continue;

        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (triggerPoint >= sectionTop && triggerPoint < sectionBottom) {
          newActiveSlide = slide.id;
          break;
        }
      }

      setActiveSlide(newActiveSlide);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [slides]);

  return (
    <nav
      className={`fixed right-6 top-1/2 -translate-y-1/2 z-50 transition-all duration-500 ${isExpanded ? "w-48" : "w-16"}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      aria-label="Main navigation"
    >
      <div
        className={`absolute inset-0 backdrop-blur-md bg-black/10 rounded-2xl transition-all duration-500 ${
          isExpanded ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="relative z-10 py-6 space-y-2">
        {slides.map((slide) => {
          const isActive = activeSlide === slide.id;
          return (
            <button
              key={slide.id}
              onClick={() => scrollToSlide(slide.id)}
              className={`group relative w-full flex items-center gap-4 px-4 py-3 transition-all duration-300 hover:scale-105 cursor-pointer ${
                isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
              }`}
              aria-label={`Navigate to ${slide.title}`}
            >
              <div
                className={`overflow-hidden transition-all duration-500 flex gap-3 ${
                  isExpanded ? "w-auto opacity-100" : "w-0 opacity-0"
                }`}
              >
                {slide.icon}
                <span
                  className={`text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                    isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200"
                  }`}
                >
                  {slide.title}
                </span>
              </div>

              <div
                className={`absolute right-4 transition-all duration-300 ${
                  isExpanded ? "opacity-0 scale-90" : "opacity-100 scale-100"
                } ${isActive ? "text-cyan-400" : "text-slate-500 group-hover:text-slate-300"}`}
              >
                {slide.icon}
              </div>

              <div
                className={`absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 transition-all duration-300 ${
                  isActive ? "opacity-30" : "opacity-0 group-hover:opacity-20"
                }`}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default HeaderMenu;
