"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState, useEffect } from "react";

interface NavItem {
  id: string;
  title: string;
  icon: any;
}

const BurgerMenu: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState<string>("home");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const slides: NavItem[] = [
    { id: "home", title: "Home", icon: <Icon icon="solar:home-2-bold" width="24" height="24" /> },
    { id: "aboutme", title: "About Me", icon: <Icon icon="mingcute:user-warning-fill" width="24" height="24" /> },
    { id: "educations", title: "Educations", icon: <Icon icon="mdi:account-student" width="24" height="24" /> },
    { id: "experiences", title: "Experiences", icon: <Icon icon="mingcute:user-star-fill" width="24" height="24" /> },
    { id: "projects", title: "Projects", icon: <Icon icon="streamline-flex:keyboard-option-setting-gear-solid" width="24" height="24" /> },
    { id: "skills", title: "Skills", icon: <Icon icon="streamline-flex:artificial-intelligence-brain-chip-solid" width="24" height="24" /> },
    { id: "contactme", title: "Contact Me", icon: <Icon icon="streamline-ultimate:phone-retro-1-bold" width="24" height="24" /> },
  ];

  const scrollToSlide = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setTimeout(() => {
        const rect = element.getBoundingClientRect();
        const currentScrollY = window.pageYOffset;
        const elementTop = rect.top + currentScrollY;
        const targetScrollY = elementTop;

        window.scrollTo({
          top: Math.max(0, targetScrollY),
          behavior: "smooth",
        });

        setActiveSlide(id);
        setIsOpen(false);
      }, 50);
    }
  };

  // Active section detection
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = window.pageYOffset;
        const viewportHeight = window.innerHeight;
        const triggerPoint = scrollY + viewportHeight * 0.3;

        let newActiveSlide = "home";

        for (let i = 0; i < slides.length; i++) {
          const section = document.getElementById(slides[i].id);
          if (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionBottom = sectionTop + sectionHeight;

            if (triggerPoint >= sectionTop && triggerPoint < sectionBottom) {
              newActiveSlide = slides[i].id;
              break;
            }
          }
        }

        setActiveSlide(newActiveSlide);
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [slides]);

  return (
    <>
      {/* Burger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-50 p-2 rounded-lg bg-black/40 text-white backdrop-blur-md md:hidden"
      >
        <Icon icon="mdi:menu" width="28" height="28" />
      </button>

      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Slide-in Menu */}
      <nav
        className={`fixed top-0 right-0 h-full w-64 bg-neutral-900/95 backdrop-blur-xl text-white shadow-xl transform transition-transform duration-500 z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button inside menu */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-700/40 transition"
          >
            <Icon icon="mdi:close" width="28" height="28" />
          </button>
        </div>

        {/* Menu Items */}
        <div className="px-6 space-y-4">
          {slides.map((slide) => {
            const isActive = activeSlide === slide.id;
            return (
              <button
                key={slide.id}
                onClick={() => scrollToSlide(slide.id)}
                className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-left transition-colors ${
                  isActive
                    ? "bg-cyan-600 text-white"
                    : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                }`}
              >
                {slide.icon}
                <span className="text-base font-medium">{slide.title}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default BurgerMenu;
