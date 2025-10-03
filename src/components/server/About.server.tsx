"use client";
import { useState, useEffect, useRef, useCallback, useMemo, memo } from "react";
import { Icon } from "@iconify/react";

interface AboutMeProps {
  scrollToSection?: (id: string) => void;
}

// Move static data outside component to prevent recreation
const JOURNEY_POINTS = [
  {
    icon: "mingcute:lightbulb-line",
    title: "Started Web Development",
    content: "Began my journey with HTML, CSS, and JavaScript",
    color: "from-yellow-400 to-orange-500",
  },
  {
    icon: "mingcute:code-line",
    title: "Mastered React",
    content: "Deep dive into React ecosystem and modern development",
    color: "from-blue-400 to-cyan-500",
  },
  {
    icon: "mingcute:rocket-line",
    title: "Advanced Technologies",
    content: "Explored Next.js, TypeScript, and performance optimization",
    color: "from-purple-400 to-pink-500",
  },
  {
    icon: "mingcute:trophy-line",
    title: "Professional Growth",
    content: "Delivered 50+ projects with 100% client satisfaction",
    color: "from-green-400 to-emerald-500",
  },
] as const;

const PERSONAL_INFO = [
  {
    icon: "mingcute:location-line",
    label: "Location",
    value: "Tehran, Iran",
    color: "from-red-400 to-pink-500",
  },
  {
    icon: "mingcute:mail-line",
    label: "Email",
    value: "mahdi@example.com",
    color: "from-blue-400 to-cyan-500",
  },
  {
    icon: "mingcute:phone-line",
    label: "Phone",
    value: "+98 912 345 6789",
    color: "from-green-400 to-emerald-500",
  },
  {
    icon: "mingcute:calendar-line",
    label: "Experience",
    value: "3+ Years",
    color: "from-purple-400 to-indigo-500",
  },
] as const;

const TECHNICAL_SKILLS = [
  {
    name: "React/Next.js",
    level: 95,
    icon: "logos:react",
    color: "from-blue-400 to-cyan-500",
  },
  {
    name: "TypeScript",
    level: 90,
    icon: "logos:typescript-icon",
    color: "from-blue-600 to-blue-400",
  },
  {
    name: "JavaScript",
    level: 92,
    icon: "logos:javascript",
    color: "from-yellow-400 to-orange-500",
  },
  {
    name: "Tailwind CSS",
    level: 88,
    icon: "logos:tailwindcss-icon",
    color: "from-cyan-400 to-blue-500",
  },
  {
    name: "Node.js",
    level: 85,
    icon: "logos:nodejs-icon",
    color: "from-green-500 to-green-400",
  },
] as const;

const INTERESTS = [
  {
    name: "UI/UX Design",
    icon: "mingcute:palette-line",
    color: "from-pink-400 to-rose-500",
  },
  {
    name: "Performance",
    icon: "mingcute:rocket-line",
    color: "from-orange-400 to-red-500",
  },
  {
    name: "Clean Code",
    icon: "mingcute:code-line",
    color: "from-green-400 to-emerald-500",
  },
  {
    name: "Innovation",
    icon: "mingcute:lightbulb-line",
    color: "from-yellow-400 to-amber-500",
  },
  {
    name: "Problem Solving",
    icon: "mingcute:puzzle-line",
    color: "from-purple-400 to-indigo-500",
  },
  {
    name: "Team Work",
    icon: "mingcute:group-line",
    color: "from-blue-400 to-cyan-500",
  },
] as const;

const PHILOSOPHY_POINTS = [
  {
    icon: "mingcute:target-line",
    title: "User-Centered",
    description: "Every line of code should enhance user experience",
    color: "from-red-400 to-pink-500",
  },
  {
    icon: "mingcute:speed-line",
    title: "Performance First",
    description: "Optimized, fast applications that users love",
    color: "from-orange-400 to-yellow-500",
  },
  {
    icon: "mingcute:refresh-line",
    title: "Clean & Maintainable",
    description: "Write code that's readable and scalable",
    color: "from-green-400 to-emerald-500",
  },
  {
    icon: "mingcute:diamond-line",
    title: "Attention to Detail",
    description: "Pixel-perfect implementations with care",
    color: "from-purple-400 to-indigo-500",
  },
] as const;

const STATS = [
  {
    icon: "mingcute:trophy-line",
    number: "50+",
    label: "Projects",
    color: "from-yellow-400 to-orange-500",
  },
  {
    icon: "mingcute:group-line",
    number: "30+",
    label: "Happy Clients",
    color: "from-green-400 to-emerald-500",
  },
  {
    icon: "mingcute:time-line",
    number: "3+",
    label: "Years Experience",
    color: "from-blue-400 to-cyan-500",
  },
  {
    icon: "mingcute:star-line",
    number: "5.0",
    label: "Rating",
    color: "from-purple-400 to-pink-500",
  },
] as const;

// Memoized skill bar component to prevent unnecessary re-renders
const SkillBar = memo<{
  skill: {
    name: string;
    level: number;
    icon: string;
    color: string;
  };
  index: number;
  isVisible: boolean;
  isActive: boolean;
}>(({ skill, index, isVisible, isActive }) => (
  <div className={`transition-all duration-500 ${isActive ? "scale-105" : ""}`}>
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-3">
        <Icon icon={skill.icon} width={24} height={24} />
        <span className="text-white font-medium">{skill.name}</span>
      </div>
      <span className="text-slate-400 font-medium">{skill.level}%</span>
    </div>
    <div className="w-full bg-slate-700 rounded-full h-2">
      <div
        className={`bg-gradient-to-r ${
          skill.color
        } h-2 rounded-full transition-all duration-1000 ${
          isActive ? "animate-pulse" : ""
        }`}
        style={{
          width: isVisible ? `${skill.level}%` : "0%",
          transitionDelay: `${index * 0.1}s`,
        }}
      />
    </div>
  </div>
));

SkillBar.displayName = "SkillBar";

// Memoized info card component
const InfoCard = memo<{
  info: {
    label: string;
    value: string;
    icon: string;
    color: string;
  };
}>(({ info }) => (
  <div className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-300 group">
    <div
      className={`w-12 h-12 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
    >
      <Icon icon={info.icon} width={24} height={24} className="text-white" />
    </div>
    <div>
      <p className="text-slate-400 text-sm">{info.label}</p>
      <p className="text-white font-semibold text-lg">{info.value}</p>
    </div>
  </div>
));

InfoCard.displayName = "InfoCard";

const AboutMeContent = memo<AboutMeProps>(({ scrollToSection }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSkill, setActiveSkill] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Optimized intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          // Start skill rotation only when visible
          intervalRef.current = setInterval(() => {
            setActiveSkill((prev) => (prev + 1) % TECHNICAL_SKILLS.length);
          }, 3000);
        } else if (!entry.isIntersecting && isVisible) {
          // Stop skill rotation when not visible for performance
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px", // Start loading slightly before visible
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isVisible]);

  // Memoized scroll handlers
  const handleContactClick = useCallback(() => {
    scrollToSection?.("contactme");
  }, [scrollToSection]);

  const handleExperienceClick = useCallback(() => {
    scrollToSection?.("experiences");
  }, [scrollToSection]);

  // Memoized animation classes
  const animationClasses = useMemo(
    () => ({
      header: `text-center mb-16 transition-all duration-1000 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`,
      journey: `mb-20 transition-all duration-1000 delay-200 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`,
      personalInfo: `transition-all duration-1000 delay-300 ${
        isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
      }`,
      skills: `transition-all duration-1000 delay-400 ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
      }`,
      interests: `mb-20 transition-all duration-1000 delay-500 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`,
      stats: `lg:col-span-1 transition-all duration-1000 delay-600 ${
        isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
      }`,
      philosophy: `lg:col-span-2 transition-all duration-1000 delay-700 ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
      }`,
      cta: `transition-all duration-1000 delay-800 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`,
    }),
    [isVisible]
  );

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen py-20 overflow-hidden"
    >
      {/* Background Overlay for better text readability */}
      <div className="absolute inset-0 gradient-hover-besides" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className={animationClasses.header}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent" />
            <span className="text-orange-400 font-medium tracking-wider text-lg uppercase">
              About Me
            </span>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent" />
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-200 via-slate-200 to-cyan-300 bg-clip-text text-transparent">
              Passionate Developer
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed text-shadow-xs text-shadow-slate-900">
            Crafting digital experiences that blend creativity with
            functionality. I turn ideas into elegant, performant web
            applications.
          </p>
        </div>

        {/* Journey Section */}
        <div className={animationClasses.journey}>
          <div className="backdrop-blur-md bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 hover:border-cyan-400/30 transition-all duration-500">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-300 to-blue-500 rounded-xl flex items-center justify-center">
                <Icon
                  icon="mingcute:user-star-fill"
                  width={28}
                  height={28}
                  className="text-white"
                />
              </div>
              <h3 className="text-3xl font-bold text-white">My Journey</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {JOURNEY_POINTS.map((point, index) => (
                <div
                  key={point.title}
                  className="flex gap-4 p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-300 group"
                >
                  <div
                    className={`w-10 h-10 bg-gradient-to-br ${point.color} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon
                      icon={point.icon}
                      width={24}
                      height={24}
                      className="text-white"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">
                      {point.title}
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {point.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Personal Info & Skills Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Personal Information */}
          <div className={animationClasses.personalInfo}>
            <div className="backdrop-blur-md bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 hover:border-purple-400/30 transition-all duration-500 h-full">
              <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <Icon
                  icon="mingcute:information-line"
                  width={32}
                  height={32}
                  className="text-purple-400"
                />
                Personal Info
              </h3>
              <div className="space-y-4">
                {PERSONAL_INFO.map((info) => (
                  <InfoCard key={info.label} info={info} />
                ))}
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div className={animationClasses.skills}>
            <div className="backdrop-blur-md bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 hover:border-cyan-400/30 transition-all duration-500 h-full">
              <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <Icon
                  icon="mingcute:code-line"
                  width={32}
                  height={32}
                  className="text-cyan-400"
                />
                Technical Skills
              </h3>
              <div className="space-y-6">
                {TECHNICAL_SKILLS.map((skill, index) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill}
                    index={index}
                    isVisible={isVisible}
                    isActive={activeSkill === index}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Interests Section */}
        <div className={animationClasses.interests}>
          <div className="backdrop-blur-md bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 hover:border-amber-400/30 transition-all duration-500">
            <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3 justify-center">
              <Icon
                icon="mingcute:sparkles-line"
                width={32}
                height={32}
                className="text-amber-400"
              />
              Interests & Focus Areas
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {INTERESTS.map((interest) => (
                <div
                  key={interest.name}
                  className="flex items-center gap-3 p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-300 group"
                >
                  <div
                    className={`w-10 h-10 bg-gradient-to-br ${interest.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon
                      icon={interest.icon}
                      width={20}
                      height={20}
                      className="text-white"
                    />
                  </div>
                  <span className="text-slate-300 font-medium">
                    {interest.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats & Philosophy Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {/* Stats Section */}
          <div className={animationClasses.stats}>
            <div className="backdrop-blur-md bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 hover:border-green-400/30 transition-all duration-500 h-full">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Icon
                  icon="mingcute:trophy-line"
                  width={28}
                  height={28}
                  className="text-green-400"
                />
                Achievements
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-300 group"
                  >
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon
                        icon={stat.icon}
                        width={20}
                        height={20}
                        className="text-white"
                      />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">
                      {stat.number}
                    </div>
                    <div className="text-slate-400 text-xs">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Development Philosophy */}
          <div className={animationClasses.philosophy}>
            <div className="backdrop-blur-md bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 hover:border-green-400/30 transition-all duration-500 h-full">
              <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <Icon
                  icon="mingcute:lightbulb-line"
                  width={32}
                  height={32}
                  className="text-green-400"
                />
                Development Philosophy
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PHILOSOPHY_POINTS.map((point) => (
                  <div
                    key={point.title}
                    className="p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`w-10 h-10 bg-gradient-to-br ${point.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon
                          icon={point.icon}
                          width={20}
                          height={20}
                          className="text-white"
                        />
                      </div>
                      <h4 className="text-white font-semibold">
                        {point.title}
                      </h4>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className={animationClasses.cta}>
          <div className="backdrop-blur-md bg-gradient-to-br from-slate-800/30 to-slate-700/30 border border-slate-700/50 rounded-2xl p-8 text-center hover:border-cyan-400/30 transition-all duration-500">
            <h3 className="text-3xl font-bold text-white mb-4">
              Let's Work Together
            </h3>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              Ready to bring your ideas to life? Let's create something amazing
              together and push the boundaries of what's possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleContactClick}
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-1"
                aria-label="Contact me"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <div className="relative flex items-center gap-3">
                  <Icon icon="mingcute:send-line" width={20} height={20} />
                  <span>Get In Touch</span>
                </div>
              </button>
              <button
                onClick={handleExperienceClick}
                className="group relative px-8 py-4 bg-transparent border-2 border-slate-600 rounded-xl font-semibold text-white hover:border-cyan-400 transition-all duration-300 hover:-translate-y-1"
                aria-label="View experience"
              >
                <div className="relative flex items-center gap-3">
                  <Icon icon="mingcute:time-line" width={20} height={20} />
                  <span>View Experience</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

AboutMeContent.displayName = "AboutMeContent";

export default AboutMeContent;
