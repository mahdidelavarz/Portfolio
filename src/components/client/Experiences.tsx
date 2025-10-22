"use client";
import { useState, useEffect, useRef, useCallback, memo } from "react";
import { Icon } from "@iconify/react";

interface ExperiencesProps {
  scrollToSection?: (id: string) => void;
}
type Experience = (typeof EXPERIENCES)[number];

// Experience data
const EXPERIENCES = [
  {
    id: 0,
    company: "Petco",
    role: "Full-Stack Developer",
    period: "2022 - Present",
    duration: "2+ Years",
    location: "Tabriz, Iran",
    type: "Full-Time",
    icon: "solar:buildings-2-bold",
    color: "from-cyan-500 to-blue-600",
    description:
      "Leading enterprise ERP system development, architecting scalable solutions for thousands of users.",
    highlights: [
      "Built frontend infrastructure from scratch",
      "40% faster development with library",
      "Serving 10,000+ daily active users",
      "60% performance improvement",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Next.js",
      "Zustand",
      "TanStack Query",
      "Tailwind CSS",
    ],
    impact: {
      users: "10K+",
      performance: "98%",
      efficiency: "+40%",
    },
  },
  {
    id: 1,
    company: "LoveCode",
    role: "Frontend Developer",
    period: "2021 - 2022",
    duration: "1 Year",
    location: "Tehran, Iran",
    type: "Full-Time",
    icon: "solar:code-bold",
    color: "from-rose-500 to-pink-600",
    description:
      "Developed responsive web applications with pixel-perfect UI implementations.",
    highlights: [
      "Developed 15+ responsive applications",
      "45% performance improvement",
      "Pixel-perfect UI/UX implementation",
      "Integrated payment gateways",
    ],
    technologies: [
      "React",
      "JavaScript",
      "SASS",
      "Redux",
      "Material-UI",
      "Git",
    ],
    impact: {
      projects: "15+",
      performance: "+45%",
      satisfaction: "100%",
    },
  },
  {
    id: 2,
    company: "Freelance",
    role: "Web Developer",
    period: "2020 - 2021",
    duration: "1+ Year",
    location: "Remote",
    type: "Contract",
    icon: "solar:rocket-bold",
    color: "from-purple-500 to-indigo-600",
    description:
      "Delivered custom web solutions for diverse clients across industries.",
    highlights: [
      "Completed 20+ client projects",
      "100% client satisfaction rate",
      "200% traffic increase with SEO",
      "Full project lifecycle management",
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "WordPress", "PHP", "MySQL"],
    impact: {
      clients: "20+",
      traffic: "+200%",
      retention: "100%",
    },
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
              <Icon
                icon={exp.icon}
                width={20}
                height={20}
                className={index === activeIndex ? "text-white" : "text-slate-400"}
              />
            </div>
          </button>
        ))}
      </div>
    );
  }
);

MobileTimeline.displayName = "MobileTimeline";

// Experience Card Component
const ExperienceCard = memo(
  ({
    experience,
    isVisible,
    showCTA,
    onContactClick,
  }: {
    experience: Experience;
    isVisible: boolean;
    showCTA?: boolean;
    onContactClick: () => void;
  }) => {
    return (
      <div
        className={`transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="relative bg-slate-800/40 backdrop-blur-3xl  border border-slate-700/50 rounded-xl md:rounded-2xl overflow-hidden hover:border-cyan-400/30 transition-all duration-500 group">
          <div
            className={`absolute inset-0 bg-gradient-to-br ${experience.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
          />

          {/* Header */}
          <div className="relative p-4 md:p-6 border-b border-slate-700/50">
            <div className="flex items-start gap-3 md:gap-4">
              <div
                className={`w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br ${experience.color} rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon
                  icon={experience.icon}
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
                    <Icon icon="solar:calendar-bold" width={14} height={14} />
                    {experience.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon icon="solar:clock-circle-bold" width={14} height={14} />
                    {experience.duration}
                  </span>
                  <br />
                  <span className="flex items-center gap-1">
                    <Icon icon="solar:map-point-bold" width={14} height={14} />
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

            {/* Impact Metrics */}
            <div className="grid grid-cols-3 gap-2 md:gap-3 mb-6">
              {Object.entries(experience.impact).map(([key, value]) => (
                <div
                  key={key}
                  className="bg-slate-700/30 rounded-lg p-2.5 md:p-3 text-center hover:bg-slate-700/50 transition-all duration-300"
                >
                  <div
                    className={`text-lg md:text-xl font-bold bg-gradient-to-r ${experience.color} bg-clip-text text-transparent`}
                  >
                    {value}
                  </div>
                  <div className="text-xs text-slate-500 capitalize mt-0.5">
                    {key}
                  </div>
                </div>
              ))}
            </div>

            {/* Achievements */}
            <div className="mb-6">
              <h4 className="font-semibold text-white text-sm md:text-base mb-3 flex items-center gap-2">
                <Icon icon="solar:star-shine-bold" width={18} height={18} className="text-amber-400" />
                Key Achievements
              </h4>
              <div className="space-y-2">
                {experience.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 p-2.5 bg-slate-700/20 rounded-lg"
                  >
                    <Icon
                      icon="solar:check-circle-bold"
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

            {/* Technologies */}
            <div>
              <h4 className="font-semibold text-white text-sm md:text-base mb-3 flex items-center gap-2">
                <Icon icon="solar:programming-bold" width={18} height={18} className="text-blue-400" />
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 bg-slate-700/30 border border-slate-600/50 text-xs font-medium text-slate-300 rounded-lg hover:border-cyan-400/50 transition-all duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
);

ExperienceCard.displayName = "ExperienceCard";

// Main Component
const Experiences = memo<ExperiencesProps>(({ scrollToSection }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
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
      { threshold: 0.1, rootMargin: "50px" }
    );

    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const handleContactClick = useCallback(() => {
    scrollToSection?.("contactme");
  }, [scrollToSection]);

  const handlePrevious = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? EXPERIENCES.length - 1 : prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === EXPERIENCES.length - 1 ? 0 : prev + 1));
  }, []);

  // Touch handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const diff = touchStartX.current - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? handleNext() : handlePrevious();
      }
    },
    [handleNext, handlePrevious]
  );

  // Auto-rotate on desktop
  useEffect(() => {
    if (!isMobile) {
      const interval = setInterval(handleNext, 8000);
      return () => clearInterval(interval);
    }
  }, [isMobile, handleNext]);

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen py-12 md:py-20 overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full  mb-6">
            {/* <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" /> */}
            <div className="h-[1.5px] w-18 bg-gradient-to-l from-transparent via-cyan-500 to-transparent animate-pulse" />
            <span className="text-cyan-400 font-medium tracking-widest text-sm uppercase">
              EXPERIENCES
            </span>
            <div className="h-[1.5px] w-18 bg-gradient-to-l from-transparent via-cyan-500 to-transparent animate-pulse" />
            {/* <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" /> */}
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white via-sky-400 to-white bg-clip-text text-transparent">
              Professional Journey
            </span>
          </h2>

          <p className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto px-4">
            Building innovative solutions and delivering exceptional results across different roles
          </p>
        </div>

        {/* Mobile View */}
        {isMobile ? (
          <div
            className={`transition-all duration-1000 delay-200 h-[55rem] ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
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
              experience={EXPERIENCES[activeIndex]}
              isVisible={isVisible}
              showCTA={activeIndex === 0}
              onContactClick={handleContactClick}
            />

            {/* Mobile Navigation */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={handlePrevious}
                className="p-2.5 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg hover:border-cyan-400/50 transition-all"
                aria-label="Previous"
              >
                <Icon icon="solar:alt-arrow-left-bold" width={20} height={20} className="text-slate-400" />
              </button>

              <div className="flex gap-2">
                {EXPERIENCES.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? `w-8 bg-gradient-to-r ${EXPERIENCES[activeIndex].color}`
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
                <Icon icon="solar:alt-arrow-right-bold" width={20} height={20} className="text-slate-400" />
              </button>
            </div>
          </div>
        ) : (
          /* Desktop View */
          <div className="space-y-6">
            {EXPERIENCES.map((experience, index) => (
              <div
                key={experience.id}
                className={`transition-all duration-1000 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <ExperienceCard
                  experience={experience}
                  isVisible={isVisible}
                  showCTA={index === 0}
                  onContactClick={handleContactClick}
                />
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA - Desktop Only */}
        {!isMobile && (
          <div
            className={`mt-12 transition-all duration-1000 delay-500 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-800/60 to-slate-700/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 text-center hover:border-cyan-400/50 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 opacity-0 hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <Icon icon="solar:chat-round-bold" width={48} height={48} className="text-cyan-400 mx-auto mb-4" />
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Ready for New Challenges
                </h3>
                <p className="text-slate-400 text-base mb-6 max-w-2xl mx-auto">
                  Looking for a skilled developer? Let's discuss how I can contribute to your success.
                </p>

                <button
                  onClick={handleContactClick}
                  className="group px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Icon icon="solar:letter-bold" width={20} height={20} />
                    Get In Touch
                  </span>
                </button>
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