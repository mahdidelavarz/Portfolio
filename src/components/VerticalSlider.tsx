// Slider.tsx
import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Home from "./slides/Home";
import About from "./slides/About";
import Skills from "./slides/Skills";
import Projects from "./slides/Projects";
import Experiences from "./slides/Experiences";
import Educations from "./slides/Educations";
import ContactMe from "./slides/ContactMe";

const Slider: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [threeSliderProgress, setThreeSliderProgress] = useState(0);
  const [isThreeSliderActive, setIsThreeSliderActive] = useState(false);

  const slides = [
    { id: 0, title: "Home" },
    { id: 1, title: "About" },
    { id: 2, title: "Skills" },
    { id: 3, title: "Projects" },
    { id: 4, title: "Experiences" },
    { id: 5, title: "Education" },
    { id: 6, title: "ContactMe" },
  ];

  // Handle ThreeSlider scroll progress
  const handleThreeSliderProgress = (progress: number, isActive: boolean) => {
    setThreeSliderProgress(progress);
    setIsThreeSliderActive(isActive);
  };

    useEffect(() => {
      const slider = sliderRef.current;
      if (!slider) return;
    
      let isScrolling = false;
      let scrollTimeout: ReturnType<typeof setTimeout>;
    
      const handleWheel = (e: WheelEvent) => {
        if (isScrolling) return;
    
        // Check if Projects slide is active
        if (isThreeSliderActive && activeSlide === 3) {
          // Allow scroll events to propagate to ThreeSlider
          if (e.deltaY > 0 && threeSliderProgress < 0.99) {
            return; // Let ThreeSlider handle the scroll
          }
          if (e.deltaY < 0 && threeSliderProgress > 0.01) {
            return; // Let ThreeSlider handle the scroll
          }
        }
    
        e.preventDefault();
        isScrolling = true;
    
        const delta = e.deltaY;
        const currentSlide = Math.round(slider.scrollTop / window.innerHeight);
        setActiveSlide(currentSlide);
    
        if (delta > 0 && currentSlide < slides.length - 1) {
          slider.scrollTo({
            top: (currentSlide + 1) * window.innerHeight,
            behavior: "smooth",
          });
        } else if (delta < 0 && currentSlide > 0) {
          slider.scrollTo({
            top: (currentSlide - 1) * window.innerHeight,
            behavior: "smooth",
          });
        }
    
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          isScrolling = false;
        }, 800);
      };
    
      const handleScroll = () => {
        const currentSlide = Math.round(slider.scrollTop / window.innerHeight);
        setActiveSlide(currentSlide);
      };
    
      slider.addEventListener("wheel", handleWheel, { passive: false });
      slider.addEventListener("scroll", handleScroll);
      return () => {
        slider.removeEventListener("wheel", handleWheel);
        slider.removeEventListener("scroll", handleScroll);
      };
    }, [slides.length, threeSliderProgress, isThreeSliderActive, activeSlide]);

  const scrollToSlide = (slideIndex: number) => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        top: slideIndex * window.innerHeight,
        behavior: "smooth",
      });
      setActiveSlide(slideIndex);
    }
  };

  return (
    <div className="relative w-full h-screen">
      {/* Top Menu */}
      <nav className="absolute top-0 left-0 w-full z-20 flex justify-center gap-4 p-4">
        <div className="relative px-8 py-1 rounded-2xl backdrop-blur-sm">
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
          <div className="relative z-10 flex gap-4">
            {slides.map((slide) => (
              <button
                key={slide.id}
                onClick={() => scrollToSlide(slide.id)}
                className={`text-white px-4 py-2 rounded transition-opacity duration-300 cursor-pointer ${
                  activeSlide === slide.id
                    ? "opacity-100"
                    : "opacity-50 hover:opacity-75"
                }`}
              >
                {slide.title}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Social Icons */}
      <div className="w-14 h-60 absolute top-1/2 bottom-1/2 -translate-y-1/2 left-6 flex flex-col justify-between items-center z-20">
        <button className="w-12 h-12 backdrop-blur-3xl rounded-xl flex justify-center items-center text-purple-300 cursor-pointer bg-gradient-to-br from-[#192434] via-[#2c5565] to-[#5c3931]">
          <Icon icon="line-md:github-loop" width="30" height="30" />
        </button>
        <button className="w-12 h-12 backdrop-blur-3xl rounded-xl flex justify-center items-center text-cyan-300 cursor-pointer bg-gradient-to-br from-[#192434] via-[#2c5565] to-[#5c3931]">
          <Icon icon="hugeicons:telegram" width="28" height="28" />
        </button>
        <button className="w-12 h-12 backdrop-blur-3xl rounded-xl flex justify-center items-center text-blue-300 cursor-pointer bg-gradient-to-br from-[#192434] via-[#2c5565] to-[#5c3931]">
          <Icon icon="streamline:linkedin" width="28" height="28" />
        </button>
        <button className="w-12 h-12 backdrop-blur-3xl rounded-xl flex justify-center items-center text-green-300 cursor-pointer bg-gradient-to-br from-[#192434] via-[#2c5565] to-[#5c3931]">
          <Icon icon="lineicons:whatsapp" width="28" height="28" />
        </button>
      </div>

      {/* Slider Container */}
      <div
        ref={sliderRef}
        className="absolute top-0 left-0 w-full h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
      >
        <Home scrollToSlide={scrollToSlide} />
        <About />
        <Skills />
        <Projects
          activeSlide={activeSlide}
          onThreeSliderProgress={handleThreeSliderProgress}
        />
        <Experiences />
        <Educations />
        <ContactMe />
      </div>

      {/* Right Navigation Buttons */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 flex flex-col gap-4">
        {slides.map((slide) => (
          <button
            key={slide.id}
            onClick={() => scrollToSlide(slide.id)}
            className={`w-3 h-3 rounded-full bg-white transition-opacity duration-300 ${
              activeSlide === slide.id
                ? "opacity-100"
                : "opacity-30 hover:opacity-60"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
