"use client";
import { useState, useEffect, useRef, useCallback, memo } from "react";
import { Icon } from "@iconify/react";

interface ExperiencesProps {
  scrollToSection?: (id: string) => void;
}

// Experience data structure with enhanced visual properties
const EXPERIENCES = [
  {
    id: 0,
    company: "Petco",
    role: "Full-Stack Developer",
    period: "2022 - Present",
    duration: "2+ Years",
    location: "Tabriz, Iran",
    type: "Full-Time",
    icon: "mingcute:building-line",
    color: "from-cyan-500 to-blue-600",
    borderColor: "border-cyan-400/50",
    shadowColor: "shadow-cyan-500/20",
    description:
      "Leading enterprise ERP system development, architecting scalable solutions for thousands of users.",
    highlights: [
      "Built frontend infrastructure from scratch",
      "40% faster development with component library",
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
    icon: "mingcute:heart-line",
    color: "from-rose-500 to-pink-600",
    borderColor: "border-rose-400/50",
    shadowColor: "shadow-rose-500/20",
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
    icon: "mingcute:rocket-line",
    color: "from-purple-500 to-indigo-600",
    borderColor: "border-purple-400/50",
    shadowColor: "shadow-purple-500/20",
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
];

// Timeline navigation component for mobile
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
      <div className="flex items-center justify-center gap-2 mb-8">
        {experiences.map((exp, index) => (
          <button
            key={exp.id}
            onClick={() => onSelect(index)}
            className={`relative transition-all duration-300 ${
              index === activeIndex ? "scale-110" : "scale-100 opacity-70"
            }`}
            aria-label={`Go to ${exp.company} experience`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                index === activeIndex
                  ? `bg-gradient-to-br ${exp.color} shadow-lg ${exp.shadowColor}`
                  : "bg-slate-700/50 hover:bg-slate-700"
              }`}
            >
              <Icon
                icon={exp.icon}
                className={`w-5 h-5 ${index === activeIndex ? "text-white" : "text-slate-400"}`}
              />
            </div>
            {index === activeIndex && (
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-slate-400 whitespace-nowrap">
                {exp.company}
              </div>
            )}
          </button>
        ))}
      </div>
    );
  },
);

MobileTimeline.displayName = "MobileTimeline";

// Experience card component
const ExperienceCard = memo(
  ({
    experience,
    isVisible,
    onContactClick,
  }: {
    experience: (typeof EXPERIENCES)[0];
    isVisible: boolean;
    onContactClick: () => void;
  }) => {
    return (
      <div
        className={`transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="relative bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden hover:border-cyan-400/30 transition-all duration-500 group">
          {/* Gradient overlay on hover */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${experience.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
          />

          {/* Card Header */}
          <div className="relative p-6 sm:p-8 border-b border-slate-700/50">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${experience.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon
                  icon={experience.icon}
                  className="w-7 h-7 sm:w-8 sm:h-8 text-white"
                />
              </div>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                      {experience.company}
                    </h3>
                    <p className="text-lg text-cyan-400 font-medium">
                      {experience.role}
                    </p>
                  </div>
                  <span
                    className={`inline-flex px-3 py-1 bg-gradient-to-r ${experience.color} rounded-full text-xs font-medium text-white self-start`}
                  >
                    {experience.type}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3 sm:gap-4 text-sm text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Icon
                      icon="mingcute:calendar-line"
                      className="w-4 h-4 text-slate-500"
                    />
                    {experience.period}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Icon
                      icon="mingcute:time-line"
                      className="w-4 h-4 text-slate-500"
                    />
                    {experience.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Icon
                      icon="mingcute:location-line"
                      className="w-4 h-4 text-slate-500"
                    />
                    {experience.location}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="relative p-6 sm:p-8">
            <p className="text-slate-300 mb-8 leading-relaxed text-base sm:text-lg">
              {experience.description}
            </p>

            {/* Impact Metrics */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
              {Object.entries(experience.impact).map(([key, value]) => (
                <div
                  key={key}
                  className="relative bg-slate-700/30 backdrop-blur-sm rounded-xl p-3 sm:p-4 text-center hover:bg-slate-700/50 transition-all duration-300 group/metric"
                >
                  <div
                    className={`text-xl sm:text-2xl font-bold bg-gradient-to-r ${experience.color} bg-clip-text text-transparent group-hover/metric:scale-110 transition-transform duration-300`}
                  >
                    {value}
                  </div>
                  <div className="text-xs text-slate-500 capitalize mt-1">
                    {key}
                  </div>
                </div>
              ))}
            </div>

            {/* Key Highlights */}
            <div className="mb-8">
              <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Icon
                  icon="mingcute:trophy-line"
                  className="w-5 h-5 text-amber-400"
                />
                Key Achievements
              </h4>
              <div className="grid sm:grid-cols-2 gap-3">
                {experience.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-slate-700/20 rounded-lg hover:bg-slate-700/30 transition-colors duration-300"
                  >
                    <Icon
                      icon="mingcute:check-circle-fill"
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 bg-gradient-to-r ${experience.color} bg-clip-text text-transparent`}
                    />
                    <span className="text-sm text-slate-300 leading-relaxed">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div>
              <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Icon
                  icon="mingcute:code-line"
                  className="w-5 h-5 text-blue-400"
                />
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-slate-700/30 backdrop-blur-sm border border-slate-600/50 text-xs font-medium text-slate-300 rounded-lg hover:border-cyan-400/50 hover:bg-slate-700/50 transition-all duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Card Footer - CTA for last card */}
          {experience.id === 0 && (
            <div className="relative p-6 sm:p-8 border-t border-slate-700/50 bg-slate-800/20">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-slate-300 text-sm sm:text-base">
                    Interested in working together?
                  </p>
                </div>
                <button
                  onClick={onContactClick}
                  className="group relative px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-0.5 w-full sm:w-auto"
                  aria-label="Contact me"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <div className="relative flex items-center justify-center gap-2">
                    <span>Let's Connect</span>
                    <Icon
                      icon="mingcute:arrow-right-line"
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },
);

ExperienceCard.displayName = "ExperienceCard";

// Main Experiences component
const Experiences = memo<ExperiencesProps>(({ scrollToSection }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      },
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
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

  // Touch handling for mobile swipe
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX.current - touchEndX;

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

  // Auto-rotate experiences on desktop
  useEffect(() => {
    if (!isMobile) {
      const interval = setInterval(() => {
        handleNext();
      }, 8000);

      return () => clearInterval(interval);
    }
  }, [isMobile, handleNext]);

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen py-12 md:py-20 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/3 -left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-slate-800/50 backdrop-blur-sm rounded-full border border-cyan-400/30 mb-6">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-cyan-400 font-medium tracking-wider text-sm uppercase">
              Experience
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
              Professional Journey
            </span>
          </h2>

          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Building innovative solutions and delivering exceptional results
            across different roles and industries.
          </p>
        </div>

        {/* Mobile View */}
        {isMobile ? (
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Mobile Timeline */}
            <MobileTimeline
              experiences={EXPERIENCES}
              activeIndex={activeIndex}
              onSelect={setActiveIndex}
            />

            {/* Mobile Experience Card */}
            <div className="mt-12">
              <ExperienceCard
                experience={EXPERIENCES[activeIndex]}
                isVisible={isVisible}
                onContactClick={handleContactClick}
              />
            </div>

            {/* Mobile Navigation */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={handlePrevious}
                className="p-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl hover:border-cyan-400/50 transition-all duration-300"
                aria-label="Previous experience"
              >
                <Icon
                  icon="mingcute:arrow-left-line"
                  className="w-5 h-5 text-slate-400"
                />
              </button>

              <div className="flex gap-2">
                {EXPERIENCES.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? `w-8 bg-gradient-to-r ${EXPERIENCES[activeIndex].color}`
                        : "w-2 bg-slate-600"
                    }`}
                    aria-label={`Go to experience ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="p-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl hover:border-cyan-400/50 transition-all duration-300"
                aria-label="Next experience"
              >
                <Icon
                  icon="mingcute:arrow-right-line"
                  className="w-5 h-5 text-slate-400"
                />
              </button>
            </div>
          </div>
        ) : (
          /* Desktop View - Timeline Layout */
          <div className="space-y-8">
            {EXPERIENCES.map((experience, index) => (
              <div
                key={experience.id}
                className={`transition-all duration-1000 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <ExperienceCard
                  experience={experience}
                  isVisible={isVisible}
                  onContactClick={handleContactClick}
                />
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA Section - Desktop Only */}
        {!isMobile && (
          <div
            className={`mt-16 transition-all duration-1000 delay-500 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-800/60 to-slate-700/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 md:p-12 text-center hover:border-cyan-400/50 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 opacity-0 hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready for New Challenges
                </h3>
                <p className="text-slate-400 text-base md:text-lg mb-8 max-w-2xl mx-auto">
                  Looking for a skilled developer to join your team? Let's
                  discuss how I can contribute to your success.
                </p>

                <button
                  onClick={handleContactClick}
                  className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-1"
                  aria-label="Get in touch"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <div className="relative flex items-center justify-center gap-3">
                    <Icon icon="mingcute:send-line" className="w-5 h-5" />
                    <span>Get In Touch</span>
                  </div>
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
