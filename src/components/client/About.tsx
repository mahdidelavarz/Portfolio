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

const TECHNICAL_SKILLS = [
  {
    name: "React.js",
    level: 90,
    icon: "logos:react",
    color: "from-blue-400 to-cyan-500",
    category: "Frontend",
  },
  {
    name: "Next.js",
    level: 75,
    icon: "devicon-plain:nextjs",
    color: "from-blue-400 to-cyan-500",
    category: "Frontend",
  },
  {
    name: "TypeScript",
    level: 90,
    icon: "logos:typescript-icon",
    color: "from-blue-600 to-blue-400",
    category: "Language",
  },
  {
    name: "JavaScript",
    level: 90,
    icon: "logos:javascript",
    color: "from-yellow-400 to-orange-500",
    category: "Language",
  },
  {
    name: "Tailwind CSS",
    level: 95,
    icon: "logos:tailwindcss-icon",
    color: "from-cyan-400 to-blue-500",
    category: "Styling",
  },
  {
    name: "Material UI",
    level: 80,
    icon: "logos:material-ui",
    color: "from-blue-500 to-indigo-600",
    category: "UI Library",
  },
  {
    name: "SQL Server",
    level: 70,
    icon: "logos:microsoft-icon",
    color: "from-red-500 to-orange-600",
    category: "Database",
  },
  {
    name: "Supabase",
    level: 70,
    icon: "logos:supabase-icon",
    color: "from-green-400 to-emerald-500",
    category: "Backend",
  },
  {
    name: "Node.js",
    level: 30,
    icon: "logos:nodejs-icon",
    color: "from-green-500 to-green-400",
    category: "Backend",
  },
  {
    name: ".NET Core",
    level: 50,
    icon: "logos:dotnet",
    color: "from-purple-500 to-purple-600",
    category: "Backend",
  },
] as const;

const EXPERTISE_AREAS = [
  {
    title: "Frontend Development",
    icon: "mingcute:palette-line",
    color: "from-pink-500 to-rose-600",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Material UI"],
  },
  {
    title: "Backend Development",
    icon: "mingcute:server-line",
    color: "from-purple-500 to-indigo-600",
    skills: ["Node.js", ".NET Core", "RESTful APIs", "Supabase"],
  },
  {
    title: "Database Management",
    icon: "mingcute:storage-line",
    color: "from-blue-500 to-cyan-600",
    skills: ["SQL Server", "Supabase", "Database Design", "Query Optimization"],
  },
  {
    title: "Performance & SEO",
    icon: "mingcute:rocket-line",
    color: "from-orange-500 to-red-600",
    skills: [
      "Code Optimization",
      "SSR/SSG",
      "Web Vitals",
      "SEO Best Practices",
    ],
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
    icon: "eos-icons:performance",
    title: "Performance First",
    description: "Optimized, fast applications that users love",
    color: "from-orange-400 to-yellow-500",
  },
  {
    icon: "healthicons:clean-hands",
    title: "Clean & Maintainable",
    description: "Write code that's readable and scalable",
    color: "from-green-400 to-emerald-500",
  },
  {
    icon: "lets-icons:dimond-alt-light",
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

// Memoized skill bar component
const SkillBar = memo<{
  skill: {
    name: string;
    level: number;
    icon: string;
    color: string;
    category: string;
  };
  index: number;
  isVisible: boolean;
  isActive: boolean;
}>(({ skill, index, isVisible, isActive }) => (
  <div
    className={`transition-all duration-300 ${isActive ? "scale-[1.02]" : ""}`}
  >
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-lg bg-slate-800/50 flex items-center justify-center ${
            isActive ? "ring-2 ring-cyan-400" : ""
          }`}
        >
          <Icon icon={skill.icon} width={32} height={32} />
        </div>
        <div>
          <span className="text-white font-medium block">{skill.name}</span>
          <span className="text-slate-500 text-xs">{skill.category}</span>
        </div>
      </div>
      <span className="text-cyan-400 font-semibold text-lg">
        {skill.level}%
      </span>
    </div>
    <div className="w-full bg-slate-800/50 rounded-full h-2 overflow-hidden">
      <div
        className={`bg-gradient-to-r ${skill.color} h-2 rounded-full transition-all duration-1000 relative`}
        style={{
          width: isVisible ? `${skill.level}%` : "0%",
          transitionDelay: `${index * 0.1}s`,
        }}
      >
        {isActive && (
          <div className="absolute inset-0 bg-white/20 animate-pulse" />
        )}
      </div>
    </div>
  </div>
));

SkillBar.displayName = "SkillBar";

// Expertise card component
const ExpertiseCard = memo<{
  area: (typeof EXPERTISE_AREAS)[number];
  index: number;
  isVisible: boolean;
}>(({ area, index, isVisible }) => (
  <div
    className={`group relative overflow-hidden rounded-2xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 p-6 hover:border-cyan-400/50 transition-all duration-500 ${
      isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
    }`}
    style={{ transitionDelay: `${index * 0.1}s` }}
  >
    {/* Gradient overlay on hover */}
    <div
      className={`absolute inset-0 bg-gradient-to-br ${area.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
    />

    <div className="relative z-10">
      <div className="flex gap-4 items-center ">
        <div
          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${area.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon
            icon={area.icon}
            width={28}
            height={28}
            className="text-white"
          />
        </div>
        <h4 className="text-xl font-bold text-white mb-4">{area.title}</h4>
      </div>

      <div className="flex flex-wrap gap-2">
        {area.skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1.5 bg-slate-700/50 rounded-lg text-slate-300 text-sm font-medium hover:bg-slate-700 transition-colors duration-200"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  </div>
));

ExpertiseCard.displayName = "ExpertiseCard";

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
          intervalRef.current = setInterval(() => {
            setActiveSkill((prev) => (prev + 1) % TECHNICAL_SKILLS.length);
          }, 3000);
        } else if (!entry.isIntersecting && isVisible) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
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
  }, [isVisible , activeSkill]);

  const handleContactClick = useCallback(() => {
    scrollToSection?.("contactme");
  }, [scrollToSection]);

  const handleExperienceClick = useCallback(() => {
    scrollToSection?.("experiences");
  }, [scrollToSection]);

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen py-12 md:py-20 overflow-hidden"
    >
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-12 md:mb-20 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-slate-800/50 backdrop-blur-sm rounded-full border border-cyan-400/30 mb-6">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-cyan-400 font-medium tracking-wider text-sm uppercase">
              About Me
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
              FrontEnd Developer
            </span>
          </h2>

          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Crafting exceptional digital experiences with modern technologies.
            Specialized in building scalable, performant web applications.
          </p>
        </div>

        {/* Stats Grid - More compact on mobile */}
        <div
          className={`grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-20 transition-all duration-1000 delay-100 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="relative group">
              <div className="relative bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 md:p-6 hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-1">
                <div
                  className={`w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon
                    icon={stat.icon}
                    width={24}
                    height={24}
                    className="text-white"
                  />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {stat.number}
                </div>
                <div className="text-slate-400 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Expertise Areas */}
        <div className="mb-12 md:mb-20">
          <h3
            className={`text-3xl md:text-4xl font-bold text-white mb-8 md:mb-12 text-center transition-all duration-1000 delay-200 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            Areas of Expertise
          </h3>

          <div className="grid md:grid-cols-2  gap-4 md:gap-6">
            {EXPERTISE_AREAS.map((area, index) => (
              <ExpertiseCard
                key={area.title}
                area={area}
                index={index}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>

        {/* Technical Skills */}
        <div
          className={`mb-12 md:mb-20 transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 md:p-8 hover:border-cyan-400/30 transition-all duration-500">
            <div className="flex items-center gap-3 mb-8 md:mb-10">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Icon
                  icon="mingcute:code-line"
                  width={28}
                  height={28}
                  className="text-white"
                />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                Technical Skills
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-x-28 gap-y-8">
              {TECHNICAL_SKILLS.map((skill, index) => (
                <SkillBar
                  key={skill.name}
                  skill={skill}
                  index={index}
                  isVisible={isVisible}
                  isActive={activeSkill == index}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Development Philosophy */}
        <div
          className={`mb-12 md:mb-20 transition-all duration-1000 delay-400 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 md:p-8 hover:border-purple-400/30 transition-all duration-500">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Icon
                icon="mingcute:lightbulb-line"
                width={32}
                height={32}
                className="text-purple-400"
              />
              Development Philosophy
            </h3>

            <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
              {PHILOSOPHY_POINTS.map((point) => (
                <div
                  key={point.title}
                  className="relative group overflow-hidden rounded-xl bg-slate-700/30 p-5 md:p-6 hover:bg-slate-700/50 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${point.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon
                        icon={point.icon}
                        width={24}
                        height={24}
                        className="text-white"
                      />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg mb-2">
                        {point.title}
                      </h4>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div
          className={`transition-all duration-1000 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="relative overflow-hidden bg-gradient-to-br from-slate-800/60 to-slate-700/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 md:p-12 text-center hover:border-cyan-400/50 transition-all duration-500">
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Let's Build Something Great
              </h3>
              <p className="text-slate-400 text-base md:text-lg mb-8 md:mb-10 max-w-2xl mx-auto">
                Ready to bring your ideas to life? Let's collaborate and create
                exceptional digital experiences together.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleContactClick}
                  className="group relative px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-1"
                  aria-label="Contact me"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <div className="relative flex items-center justify-center gap-2 md:gap-3">
                    <Icon icon="mingcute:send-line" width={20} height={20} />
                    <span>Get In Touch</span>
                  </div>
                </button>

                <button
                  onClick={handleExperienceClick}
                  className="group relative px-6 md:px-8 py-3 md:py-4 bg-slate-800/50 backdrop-blur-sm border-2 border-slate-600 rounded-xl font-semibold text-white hover:border-cyan-400 transition-all duration-300 hover:-translate-y-1"
                  aria-label="View experience"
                >
                  <div className="relative flex items-center justify-center gap-2 md:gap-3">
                    <Icon
                      icon="mingcute:briefcase-line"
                      width={20}
                      height={20}
                    />
                    <span>View Projects</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

AboutMeContent.displayName = "AboutMeContent";

export default AboutMeContent;
