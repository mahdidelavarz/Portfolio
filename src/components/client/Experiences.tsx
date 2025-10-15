"use client";
import { useState, useEffect, useRef} from "react";
import { Icon } from "@iconify/react";

interface ExperiencesProps {
  scrollToSection?: (id: string) => void;
}

// Experience data structure remains the same but simplified
const EXPERIENCES = [
  {
    id: 0,
    company: "Petco",
    role: "Full-Stack Developer",
    period: "2022 - Present",
    duration: "2+ Years",
    location: "Tabriz, Iran",
    type: "Full-Time",
    icon: "lucide:building-2",
    color: "from-cyan-500 to-blue-600",
    lightColor: "from-cyan-100 to-blue-100",
    description: "Leading enterprise ERP system development, architecting scalable solutions for thousands of users.",
    highlights: [
      "Built frontend infrastructure from scratch",
      "40% faster development with component library",
      "Serving 10,000+ daily active users",
      "60% performance improvement"
    ],
    technologies: ["React", "TypeScript", "Next.js", "Zustand", "TanStack Query", "Tailwind CSS"],
    impact: {
      users: "10K+",
      performance: "98%",
      efficiency: "+40%"
    }
  },
  {
    id: 1,
    company: "LoveCode",
    role: "Frontend Developer",
    period: "2021 - 2022",
    duration: "1 Year",
    location: "Tehran, Iran",
    type: "Full-Time",
    icon: "lucide:heart",
    color: "from-rose-500 to-pink-600",
    lightColor: "from-rose-100 to-pink-100",
    description: "Developed responsive web applications with pixel-perfect UI implementations.",
    highlights: [
      "Developed 15+ responsive applications",
      "45% performance improvement",
      "Pixel-perfect UI/UX implementation",
      "Integrated payment gateways"
    ],
    technologies: ["React", "JavaScript", "SASS", "Redux", "Material-UI", "Git"],
    impact: {
      projects: "15+",
      performance: "+45%",
      satisfaction: "100%"
    }
  },
  {
    id: 2,
    company: "Freelance",
    role: "Web Developer",
    period: "2020 - 2021",
    duration: "1+ Year",
    location: "Remote",
    type: "Contract",
    icon: "lucide:rocket",
    color: "from-purple-500 to-indigo-600",
    lightColor: "from-purple-100 to-indigo-100",
    description: "Delivered custom web solutions for diverse clients across industries.",
    highlights: [
      "Completed 20+ client projects",
      "100% client satisfaction rate",
      "200% traffic increase with SEO",
      "Full project lifecycle management"
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "WordPress", "PHP", "MySQL"],
    impact: {
      clients: "20+",
      traffic: "+200%",
      retention: "100%"
    }
  }
];

// Define icon mapping for static icons used in the UI
const STATIC_ICONS = {
  Trophy: "lucide:trophy",
  Code: "lucide:code",
  Eye: "lucide:eye",
  MapPin: "lucide:map-pin",
  Calendar: "lucide:calendar",
  Clock: "lucide:clock",
  ChevronLeft: "lucide:chevron-left",
  ChevronRight: "lucide:chevron-right",
  Briefcase: "lucide:briefcase",
  Star: "lucide:star",
  TrendingUp: "lucide:trending-up",
  Users: "lucide:users",
  CheckCircle2: "lucide:check-circle-2",
  ArrowRight: "lucide:arrow-right"
};

function Experiences({ scrollToSection }: ExperiencesProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const currentExp = EXPERIENCES[activeIndex];

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? EXPERIENCES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === EXPERIENCES.length - 1 ? 0 : prev + 1));
  };

  // Touch handling for mobile swipe
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrevious();
      }
    }
  };

  return (
    <div ref={containerRef} className="relative min-h-screen py-12 lg:py-20 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Professional Experience
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            My journey through different roles and companies
          </p>
        </div>

        {/* Mobile View - Unified Card Design */}
        <div className="lg:hidden">
          <div 
            className="relative"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Mobile Timeline Indicator - Horizontal */}
            <div className="flex items-center justify-between mb-6 px-2">
              {EXPERIENCES.map((exp, index) => (
                <button
                  key={exp.id}
                  onClick={() => setActiveIndex(index)}
                  className={`flex-1 mx-1 transition-all duration-300 ${
                    index === activeIndex ? 'scale-110' : 'scale-100'
                  }`}
                >
                  <div className={`w-full h-1 rounded-full transition-all duration-300 ${
                    index === activeIndex 
                      ? `bg-gradient-to-r ${exp.color}` 
                      : 'bg-slate-300 dark:bg-slate-700'
                  }`} />
                  <div className={`mt-2 text-xs font-medium transition-all duration-300 ${
                    index === activeIndex 
                      ? 'text-slate-900 dark:text-white' 
                      : 'text-slate-500 dark:text-slate-500'
                  }`}>
                    {exp.company}
                  </div>
                </button>
              ))}
            </div>

            {/* Mobile Experience Card */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
              {/* Card Header with Gradient */}
              <div className={`p-6 bg-gradient-to-r ${currentExp.color} text-white`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <Icon icon={currentExp.icon} className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{currentExp.company}</h3>
                      <p className="text-white/90">{currentExp.role}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                    {currentExp.type}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="flex items-center gap-1">
                    <Icon icon={STATIC_ICONS.Calendar} className="w-4 h-4" />
                    {currentExp.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon icon={STATIC_ICONS.MapPin} className="w-4 h-4" />
                    {currentExp.location}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  {currentExp.description}
                </p>

                {/* Key Highlights */}
                <div className="mb-6">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <Icon icon={STATIC_ICONS.Trophy} className="w-4 h-4 text-amber-500" />
                    Key Highlights
                  </h4>
                  <div className="space-y-2">
                    {currentExp.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Icon icon={STATIC_ICONS.CheckCircle2} className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-slate-600 dark:text-slate-300">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Impact Metrics */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {Object.entries(currentExp.impact).map(([key, value]) => (
                    <div key={key} className="text-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                      <div className={`text-lg font-bold bg-gradient-to-r ${currentExp.color} bg-clip-text text-transparent`}>
                        {value}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                        {key}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <Icon icon={STATIC_ICONS.Code} className="w-4 h-4 text-blue-500" />
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentExp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between p-4 border-t border-slate-200 dark:border-slate-700">
                <button
                  onClick={handlePrevious}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  aria-label="Previous experience"
                >
                  <Icon icon={STATIC_ICONS.ChevronLeft} className="w-5 h-5" />
                </button>
                
                <div className="flex gap-1">
                  {EXPERIENCES.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === activeIndex
                          ? `bg-gradient-to-r ${currentExp.color} w-6`
                          : 'bg-slate-300 dark:bg-slate-700'
                      }`}
                      aria-label={`Go to experience ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  aria-label="Next experience"
                >
                  <Icon icon={STATIC_ICONS.ChevronRight} className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop View - Side by Side Layout */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Left Timeline */}
          <div className="lg:col-span-4">
            <div className="sticky top-8">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Icon icon={STATIC_ICONS.Briefcase} className="w-5 h-5" />
                Career Timeline
              </h3>
              
              <div className="space-y-4">
                {EXPERIENCES.map((exp, index) => (
                  <button
                    key={exp.id}
                    onClick={() => setActiveIndex(index)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                      index === activeIndex
                        ? 'bg-white dark:bg-slate-800 shadow-lg scale-105 border-2 border-transparent'
                        : 'bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 border-2 border-transparent hover:border-slate-200 dark:hover:border-slate-700'
                    }`}
                    style={{
                      borderColor: index === activeIndex ? `var(--tw-gradient-from)` : undefined,
                      borderImage: index === activeIndex ? `linear-gradient(to right, var(--tw-gradient-stops)) 1` : undefined,
                      '--tw-gradient-from': index === activeIndex ? exp.color.split(' ')[1] : undefined,
                      '--tw-gradient-to': index === activeIndex ? exp.color.split(' ')[3] : undefined,
                      '--tw-gradient-stops': index === activeIndex ? `var(--tw-gradient-from), var(--tw-gradient-to)` : undefined,
                    } as React.CSSProperties}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        index === activeIndex
                          ? `bg-gradient-to-r ${exp.color} text-white`
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                      }`}>
                        <Icon icon={exp.icon} className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-semibold ${
                          index === activeIndex ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'
                        }`}>
                          {exp.company}
                        </h4>
                        <p className={`text-sm ${
                          index === activeIndex ? 'text-slate-700 dark:text-slate-300' : 'text-slate-500 dark:text-slate-500'
                        }`}>
                          {exp.role}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                          {exp.period} • {exp.duration}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Career Stats */}
              <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
                  <Icon icon={STATIC_ICONS.TrendingUp} className="w-4 h-4" />
                  Career Overview
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-white dark:bg-slate-800 rounded-lg">
                    <div className="text-xl font-bold text-blue-600 dark:text-blue-400">3+</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">Years</div>
                  </div>
                  <div className="text-center p-3 bg-white dark:bg-slate-800 rounded-lg">
                    <div className="text-xl font-bold text-purple-600 dark:text-purple-400">50+</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">Projects</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Details */}
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
              {/* Header */}
              <div className={`p-8 bg-gradient-to-r ${currentExp.color} text-white`}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                        <Icon icon={currentExp.icon} className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold">{currentExp.company}</h3>
                        <p className="text-xl text-white/90">{currentExp.role}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Icon icon={STATIC_ICONS.Calendar} className="w-4 h-4" />
                        {currentExp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon icon={STATIC_ICONS.MapPin} className="w-4 h-4" />
                        {currentExp.location}
                      </span>
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                        {currentExp.type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-8">
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
                  {currentExp.description}
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Highlights */}
                  <div>
                    <h4 className="font-semibold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                      <Icon icon={STATIC_ICONS.Trophy} className="w-5 h-5 text-amber-500" />
                      Key Achievements
                    </h4>
                    <div className="space-y-3">
                      {currentExp.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-700/30 rounded-lg">
                          <Icon icon={STATIC_ICONS.CheckCircle2} className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700 dark:text-slate-300">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Impact & Tech */}
                  <div>
                    {/* Impact Metrics */}
                    <h4 className="font-semibold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                      <Icon icon={STATIC_ICONS.Star} className="w-5 h-5 text-yellow-500" />
                      Impact Metrics
                    </h4>
                    <div className="grid grid-cols-3 gap-3 mb-8">
                      {Object.entries(currentExp.impact).map(([key, value]) => (
                        <div key={key} className="text-center p-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700/30 dark:to-slate-700/50 rounded-xl">
                          <div className={`text-2xl font-bold bg-gradient-to-r ${currentExp.color} bg-clip-text text-transparent`}>
                            {value}
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-400 capitalize mt-1">
                            {key}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Technologies */}
                    <h4 className="font-semibold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                      <Icon icon={STATIC_ICONS.Code} className="w-5 h-5 text-blue-500" />
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentExp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 rounded-lg hover:shadow-md transition-shadow"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="p-6 bg-slate-50 dark:bg-slate-700/30 border-t border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => scrollToSection?.("contactme")}
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Let's Work Together
                  <Icon icon={STATIC_ICONS.ArrowRight} className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Experiences;