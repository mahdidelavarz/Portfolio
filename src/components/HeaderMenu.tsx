// src/components/HeaderMenu.tsx
import React, { useState, useEffect } from "react";

interface NavItem {
  id: string;
  title: string;
}

const HeaderMenu: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState<string>("home");

  const slides: NavItem[] = [
    { id: "home", title: "Home" },
    { id: "aboutme", title: "About Me" },
    { id: "educations", title: "Educations" },
    { id: "experiences", title: "Experiences" },
    { id: "projects", title: "Projects" },
    { id: "skills", title: "Skills" },
    { id: "contactme", title: "Contact Me" },
  ];

  const scrollToSlide = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 100; // Adjust for header height
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
      setActiveSlide(id);
    }
  };

  // Optional: Update active slide on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // Offset for active detection

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
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-center p-4">
      <div className="relative px-6 py-2 rounded-2xl backdrop-blur-sm bg-black/20">
        {/* Gradient Border via Mask Technique */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            padding: "1px",
            background: "linear-gradient(to left, #7C6437, #27596C, #24526A)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        ></div>

        {/* Inner Content */}
        <div className="relative z-10 flex gap-2 md:gap-4 flex-wrap justify-center">
          {slides.map((slide) => (
            <button
              key={slide.id}
              onClick={() => scrollToSlide(slide.id)}
              className={`text-white text-sm md:text-base px-3 py-1.5 rounded-lg transition-all duration-300 cursor-pointer whitespace-nowrap
                ${
                  activeSlide === slide.id
                    ? "opacity-100 font-medium scale-105"
                    : "opacity-70 hover:opacity-100 hover:scale-102"
                }`}
            >
              {slide.title}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default HeaderMenu;