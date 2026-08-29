"use client";
import { useState, useEffect, useRef, useCallback, memo } from "react";
import {
  SolarAltArrowLeftBold,
  SolarAltArrowRightBold,
  SolarBuildingsBoldIcon,
  SolarCalendarBold,
  SolarCheckCircleBold,
  SolarClockCircleBoldIcon,
  SolarCodeBold,
  SolarMapPoindBold,
  SolarProgrammingBold,
  SolarRocketBold,
  SolarStarShineBold,
} from "@/icons/icons";

type Experience = (typeof EXPERIENCES)[number];

// Experience data
const EXPERIENCES = [
  {
    id: 0,
    company: "Petco",
    role: "Frontend Developer",
    period: "2024 - Present",
    duration: "2+ Years",
    location: "Tabriz, Iran",
    type: "Full-Time",
    icon: SolarBuildingsBoldIcon,
    color: "from-cyan-500 to-blue-600",
    description:
      "Developing a multi-module enterprise ERP frontend for complex, data-intensive workflows.",
    highlights: [
      "Developed a multi-module enterprise ERP frontend with React and TypeScript, implementing data-intensive interfaces and complex business workflows.",
      "Designed reusable factories and a PageShell architecture, cutting development time by 70%+ for comparable, repetitive CRUD pages by removing duplicate wiring.",
      "Built shared table and form infrastructure for server/client data, filtering, pagination, permissions, and dependent fields.",
      "Replaced nested modals with routed workspaces and implemented revision-based engineering workflows that preserve context and change history.",
    ],
    tags: [
      "PageShell Architecture",
      "Data-Intensive UI",
      "Routed Workspaces",
      "Workflow UI",
      "Server / Client Tables",
      "RTL Enterprise UI",
    ],
  },
  {
    id: 1,
    company: "LoveCode",
    role: "Frontend Developer",
    period: "2023 - 2024",
    duration: "1 Year",
    location: "Remote",
    type: "Full-Time",
    icon: SolarCodeBold,
    color: "from-rose-500 to-pink-600",
    description:
      "Built responsive web applications with React and TypeScript.",
    highlights: [
      "Built responsive, production-ready interfaces",
      "Collaborated with designers and backend teams",
      "Delivered clean, maintainable frontend code",
      "Integrated payment gateways",
    ],
    tags: ["React", "TypeScript", "Responsive UI"],
  },
  {
    id: 2,
    company: "Freelance",
    role: "Web Developer",
    period: "2020 - 2021",
    duration: "1+ Year",
    location: "Remote",
    type: "Contract",
    icon: SolarRocketBold,
    color: "from-purple-500 to-indigo-600",
    description:
      "Built and maintained client web applications across the project lifecycle.",
    highlights: [
      "Implemented responsive frontend interfaces",
      "Integrated application APIs and payment flows",
      "Managed delivery from requirements through deployment",
      "Maintained and improved applications after launch",
    ],
    tags: ["React", "Next.js", "TypeScript"],
  },
] as const;

// Mobile Timeline Component
const MobileTimeline = memo(
  ({
    experiences,
    activeIndex,
    onSelect,
  }: {
    experiences: typeof EXPERIENCES;
    activeIndex: number;
    onSelect: (index: number) => void;
  }) => {
    return (
      <div className="flex items-center justify-center gap-3 mb-8">
        {experiences.map((exp, index) => (
          <button
            key={exp.id}
            onClick={() => onSelect(index)}
            className={`relative transition-all duration-300 ${
              index === activeIndex ? "scale-110" : "scale-100 opacity-50"
            }`}
            aria-label={`View ${exp.company} experience`}
          >
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
                index === activeIndex
                  ? `bg-gradient-to-br ${exp.color} shadow-lg`
                  : "bg-slate-700/50"
              }`}
            >
              <exp.icon
                width={20}
                height={20}
                className={
                  index === activeIndex ? "text-white" : "text-slate-400"
                }
              />
            </div>
          </button>
        ))}
      </div>
    );
  },
);

MobileTimeline.displayName = "MobileTimeline";

// Experience Card Component
const ExperienceCard = memo(
  ({
    experience,
    isVisible,
  }: {
    experience: Experience;
    isVisible: boolean;
  }) => {
    return (
      <div
        className={`transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="relative bg-slate-800/40 backdrop-blur-3xl border border-slate-700/50 rounded-xl md:rounded-2xl overflow-hidden hover:border-cyan-400/30 transition-all duration-500 group">
          <div
            className={`absolute inset-0 bg-gradient-to-br ${experience.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
          />

          {/* Header */}
          <div className="relative p-4 md:p-6 border-b border-slate-700/50">
            <div className="flex items-start gap-3 md:gap-4">
              <div
                className={`w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br ${experience.color} rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
              >
                <experience.icon
                  width={24}
                  height={24}
                  className="text-white"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                      {experience.company}
                    </h3>
                    <p className="text-base md:text-lg text-cyan-400 font-medium">
                      {experience.role}
                    </p>
                  </div>
                  <span
                    className={`inline-flex px-2.5 py-1 bg-gradient-to-r ${experience.color} rounded-full text-xs font-medium text-white self-start flex-shrink-0`}
                  >
                    {experience.type}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 md:gap-3 text-xs md:text-sm text-slate-400">
                  <span className="flex items-center gap-1">
                    <SolarCalendarBold width={14} height={14} />
                    {experience.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <SolarClockCircleBoldIcon width={14} height={14} />
                    {experience.duration}
                  </span>
                  <br />
                  <span className="flex items-center gap-1">
                    <SolarMapPoindBold width={14} height={14} />
                    {experience.location}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="relative p-4 md:p-6">
            <p className="text-slate-300 mb-6 h-16 leading-relaxed text-sm md:text-base">
              {experience.description}
            </p>

            {/* Achievements */}
            <div className="mb-6">
              <h4 className="font-semibold text-white text-sm md:text-base mb-3 flex items-center gap-2">
                <SolarStarShineBold
                  width={18}
                  height={18}
                  className="text-amber-400"
                />
                Key Achievements
              </h4>
              <div className="space-y-2">
                {experience.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 p-2.5 bg-slate-700/20 rounded-lg"
                  >
                    <SolarCheckCircleBold
                      width={16}
                      height={16}
                      className={`flex-shrink-0 mt-0.5 bg-gradient-to-r ${experience.color} bg-clip-text text-transparent`}
                    />
                    <span className="text-xs md:text-sm text-slate-300 leading-relaxed">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Engineering focus */}
            <div>
              <h4 className="font-semibold text-white text-sm md:text-base mb-3 flex items-center gap-2">
                <SolarProgrammingBold
                  width={18}
                  height={18}
                  className="text-blue-400"
                />
                Engineering Focus
              </h4>
              <div className="flex flex-wrap gap-2">
                {experience.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-slate-700/30 border border-slate-600/50 text-xs font-medium text-slate-300 rounded-lg hover:border-cyan-400/50 transition-all duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

ExperienceCard.displayName = "ExperienceCard";

// Main Component
const Experiences = memo(() => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  // Check mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1, rootMargin: "50px" },
    );

    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const handlePrevious = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setActiveIndex((prev) =>
        prev === 0 ? EXPERIENCES.length - 1 : prev - 1,
      );
      setTimeout(() => setIsTransitioning(false), 500);
    }
  }, [isTransitioning]);

  const handleNext = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setActiveIndex((prev) =>
        prev === EXPERIENCES.length - 1 ? 0 : prev + 1,
      );
      setTimeout(() => setIsTransitioning(false), 500);
    }
  }, [isTransitioning]);

  // Touch handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const diff = touchStartX.current - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          handleNext();
        } else {
          handlePrevious();
        }
      }
    },
    [handleNext, handlePrevious],
  );

  // Auto-rotate
  useEffect(() => {
    const interval = setInterval(handleNext, 8000);
    return () => clearInterval(interval);
  }, [handleNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrevious]);

  const currentExperience = EXPERIENCES[activeIndex];

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen py-12 md:py-20 overflow-hidden bg-gradient-to-bl from-blue-950 via-gray-950 to-blue-950"
    >
      <div className="relative z-10  mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-6">
            <div className="h-[1.5px] w-18 bg-gradient-to-l from-transparent via-cyan-500 to-transparent animate-pulse" />
            <span className="text-cyan-400 font-medium tracking-widest text-sm uppercase">
              EXPERIENCES
            </span>
            <div className="h-[1.5px] w-18 bg-gradient-to-l from-transparent via-cyan-500 to-transparent animate-pulse" />
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white via-sky-400 to-white bg-clip-text text-transparent">
              Professional Journey
            </span>
          </h2>

          <p className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto px-4">
            Frontend experience across enterprise ERP and product delivery
          </p>
        </div>

        {/* Mobile View */}
        {isMobile ? (
          <div
            className={`transition-all duration-1000 delay-200 min-h-[46rem] ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <MobileTimeline
              experiences={EXPERIENCES}
              activeIndex={activeIndex}
              onSelect={setActiveIndex}
            />

            <ExperienceCard
              experience={currentExperience}
              isVisible={isVisible}
            />

            {/* Mobile Navigation */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={handlePrevious}
                className="p-2.5 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg hover:border-cyan-400/50 transition-all"
                aria-label="Previous"
              >
                <SolarAltArrowLeftBold
                  width={20}
                  height={20}
                  className="text-slate-400"
                />
              </button>

              <div className="flex gap-2">
                {EXPERIENCES.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? `w-8 bg-gradient-to-r ${currentExperience.color}`
                        : "w-1.5 bg-slate-600"
                    }`}
                    aria-label={`Experience ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="p-2.5 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg hover:border-cyan-400/50 transition-all"
                aria-label="Next"
              >
                <SolarAltArrowRightBold
                  width={20}
                  height={20}
                  className="text-slate-400"
                />
              </button>
            </div>
          </div>
        ) : (
          /* Desktop Slider View */
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {/* Desktop Timeline Navigation */}
            <div className="flex items-center justify-center gap-4 mb-12">
              {EXPERIENCES.map((exp, index) => (
                <button
                  key={exp.id}
                  onClick={() => setActiveIndex(index)}
                  className={`relative group transition-all duration-300 ${
                    index === activeIndex
                      ? "scale-110"
                      : "scale-100 opacity-60 hover:opacity-100"
                  }`}
                  aria-label={`View ${exp.company} experience`}
                >
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      index === activeIndex
                        ? `bg-gradient-to-br ${exp.color} shadow-lg shadow-${exp.color}/20`
                        : "bg-slate-700/50 hover:bg-slate-700"
                    }`}
                  >
                    <exp.icon
                      width={28}
                      height={28}
                      className={
                        index === activeIndex ? "text-white" : "text-slate-400"
                      }
                    />
                  </div>

                  {/* Company name tooltip */}
                  <div
                    className={`absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium transition-opacity duration-200 ${
                      index === activeIndex ? "text-white" : "text-slate-500"
                    }`}
                  >
                    {exp.company}
                  </div>
                </button>
              ))}
            </div>

            {/* Main Slider Card */}
            <div className="relative max-w-6xl px-8 mx-auto">
              {/* Navigation Arrows */}
              <button
                onClick={handlePrevious}
                disabled={isTransitioning}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-10 p-3 bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-xl hover:border-cyan-400/50 hover:bg-slate-800 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous experience"
              >
                <SolarAltArrowLeftBold
                  width={24}
                  height={24}
                  className="text-slate-300 group-hover:text-cyan-400 group-hover:-translate-x-1 transition-all"
                />
              </button>

              <button
                onClick={handleNext}
                disabled={isTransitioning}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-10 p-3 bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-xl hover:border-cyan-400/50 hover:bg-slate-800 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next experience"
              >
                <SolarAltArrowRightBold
                  width={24}
                  height={24}
                  className="text-slate-300 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all"
                />
              </button>

              {/* Card with transition */}
              <div
                className={`transition-all duration-500 ${
                  isTransitioning
                    ? "opacity-0 scale-95"
                    : "opacity-100 scale-100"
                }`}
              >
                <ExperienceCard
                  experience={currentExperience}
                  isVisible={isVisible}
                />
              </div>

              {/* Progress indicators */}
              <div className="flex items-center justify-center gap-2 mt-8">
                {EXPERIENCES.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? `w-12 bg-gradient-to-r ${currentExperience.color}`
                        : "w-1.5 bg-slate-600 hover:bg-slate-500"
                    }`}
                    aria-label={`Go to experience ${index + 1}`}
                  />
                ))}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
});

Experiences.displayName = "Experiences";

export default Experiences;
