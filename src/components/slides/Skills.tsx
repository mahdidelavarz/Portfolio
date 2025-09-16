import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";

const Skills = () => {
  const [selectedStack, setSelectedStack] = useState("frontend");
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  type skillStacksType = {
    frontend: any;
    state: any;
    tools: any;
    animation: any;
  };
  const skillStacks: skillStacksType = {
    frontend: {
      title: "Frontend Development",
      icon: "mingcute:code-line",
      color: "from-cyan-400 to-blue-500",
      skills: [
        { name: "React", mastery: 95, years: 3, icon: "logos:react" },
        { name: "Next.js", mastery: 90, years: 2, icon: "logos:nextjs-icon" },
        {
          name: "TypeScript",
          mastery: 88,
          years: 2.5,
          icon: "logos:typescript-icon",
        },
        {
          name: "Tailwind CSS",
          mastery: 92,
          years: 2,
          icon: "logos:tailwindcss-icon",
        },
      ],
    },
    state: {
      title: "State Management",
      icon: "mingcute:settings-3-line",
      color: "from-purple-400 to-pink-500",
      skills: [
        {
          name: "Zustand",
          mastery: 87,
          years: 1.5,
          icon: "simple-icons:zustand",
        },
        { name: "Redux", mastery: 83, years: 2, icon: "logos:redux" },
        {
          name: "TanStack Query",
          mastery: 85,
          years: 1,
          icon: "logos:react-query-icon",
        },
        {
          name: "React Hook Form",
          mastery: 86,
          years: 2,
          icon: "simple-icons:reacthookform",
        },
      ],
    },
    animation: {
      title: "Animation & 3D",
      icon: "mingcute:magic-2-line",
      color: "from-amber-400 to-orange-500",
      skills: [
        { name: "Framer Motion", mastery: 90, years: 2, icon: "logos:framer" },
        { name: "Three.js", mastery: 84, years: 1, icon: "logos:threejs" },
        {
          name: "CSS Animations",
          mastery: 88,
          years: 2.5,
          icon: "logos:css-3",
        },
        { name: "GSAP", mastery: 80, years: 1, icon: "simple-icons:greensock" },
      ],
    },
    tools: {
      title: "Tools & Workflow",
      icon: "mingcute:tool-line",
      color: "from-green-400 to-emerald-500",
      skills: [
        { name: "Git & GitHub", mastery: 89, years: 3, icon: "logos:git-icon" },
        { name: "Vite", mastery: 85, years: 2, icon: "logos:vitejs" },
        { name: "Webpack", mastery: 78, years: 1.5, icon: "logos:webpack" },
        { name: "Docker", mastery: 75, years: 1, icon: "logos:docker-icon" },
      ],
    },
  };

  const stackKeys = Object.keys(skillStacks);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedStack((prev) => {
        const currentIndex = stackKeys.indexOf(prev);
        return stackKeys[(currentIndex + 1) % stackKeys.length];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [stackKeys]);

  const getOverallStats = () => {
    const allSkills = Object.values(skillStacks).flatMap(
      (stack) => stack.skills
    );
    const totalSkills = allSkills.length;
    const avgMastery = Math.round(
      allSkills.reduce((sum, skill) => sum + skill.mastery, 0) / totalSkills
    );
    const totalExperience = allSkills.reduce(
      (sum, skill) => sum + skill.years,
      0
    );

    return { totalSkills, avgMastery, totalExperience };
  };

  const stats = getOverallStats();

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen py-20 overflow-hidden"
    >
      {/* Background Overlay */}

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
            <span className="text-cyan-400 font-medium tracking-wider text-lg">
              Technical Skills
            </span>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
              Tech Mastery
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Expertise across modern web technologies and development tools
          </p>
        </div>

        {/* Stack Navigation */}
        <div
          className={`flex justify-center mb-12 transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="backdrop-blur-md bg-slate-800/30 border border-slate-700/50 rounded-2xl p-2 flex gap-2 flex-wrap justify-center">
            {stackKeys.map((stack) => (
              <button
                key={stack}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 ${
                  selectedStack === stack
                    ? `bg-gradient-to-r ${skillStacks[stack].color} text-white shadow-lg`
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
                onClick={() => setSelectedStack(stack)}
              >
                <Icon icon={skillStacks[stack].icon} width="20" height="20" />
                <span className="hidden sm:inline">
                  {skillStacks[stack].title}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Skills Grid */}
          <div className="lg:col-span-3">
            <div
              className={`transition-all duration-1000 delay-500 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {skillStacks[selectedStack].skills.map((skill, index) => (
                  <div
                    key={`${selectedStack}-${skill.name}`}
                    className="group backdrop-blur-md bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 hover:border-cyan-400/30 transition-all duration-500 hover:-translate-y-1 relative"
                    onMouseEnter={() => setHoveredSkill(index)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    {/* Skill Icon */}
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-slate-700/50 to-slate-800/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon icon={skill.icon} width="32" height="32" />
                      </div>
                    </div>

                    {/* Skill Name */}
                    <h3 className="text-lg font-bold text-white text-center mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                      {skill.name}
                    </h3>

                    {/* Circular Progress */}
                    <div className="relative w-20 h-20 mx-auto mb-4">
                      <svg
                        className="w-20 h-20 transform -rotate-90"
                        viewBox="0 0 100 100"
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="6"
                          fill="none"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="url(#gradient)"
                          strokeWidth="6"
                          fill="none"
                          strokeLinecap="round"
                          className="animate-draw-circle"
                          style={{
                            strokeDasharray: `${2 * Math.PI * 40}`,
                            strokeDashoffset: `${
                              2 * Math.PI * 40 * (1 - skill.mastery / 100)
                            }`,
                            animationDelay: `${index * 0.2}s`,
                          }}
                        />
                        <defs>
                          <linearGradient
                            id="gradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#06b6d4" />
                            <stop offset="100%" stopColor="#3b82f6" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold text-white">
                          {skill.mastery}%
                        </span>
                      </div>
                    </div>

                    {/* Experience */}
                    <div className="text-center">
                      <p className="text-sm text-slate-400">
                        {skill.years} year{skill.years !== 1 ? "s" : ""}{" "}
                        experience
                      </p>
                    </div>

                    {/* Hover Details */}
                    {hoveredSkill === index && (
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full backdrop-blur-md bg-slate-900/90 border border-cyan-400/50 rounded-xl p-3 min-w-max z-20">
                        <div className="text-center">
                          <h4 className="font-bold text-white text-sm mb-1">
                            {skill.name}
                          </h4>
                          <p className="text-xs text-slate-300 mb-2">
                            Mastery Level: {skill.mastery}%
                          </p>
                          <div className="flex justify-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-2 h-2 rounded-full ${
                                  i < Math.floor(skill.mastery / 20)
                                    ? "bg-cyan-400"
                                    : "bg-slate-600"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-cyan-400"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Side Panel - Stats */}
          <div className="lg:col-span-1">
            <div
              className={`backdrop-blur-md bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 transition-all duration-1000 delay-700 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-10 opacity-0"
              }`}
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Icon
                  icon="mingcute:chart-bar-line"
                  width="24"
                  height="24"
                  className="text-cyan-400"
                />
                Overview
              </h3>

              {/* Current Stack Info */}
              <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-slate-700/30 to-slate-800/30 border border-slate-600/30">
                <div className="flex items-center gap-3 mb-3">
                  <Icon
                    icon={skillStacks[selectedStack].icon}
                    width="20"
                    height="20"
                    className="text-cyan-400"
                  />
                  <span className="font-semibold text-white">
                    {skillStacks[selectedStack].title}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-slate-400">
                  <div>Skills: {skillStacks[selectedStack].skills.length}</div>
                  <div>
                    Avg Mastery:{" "}
                    {Math.round(
                      skillStacks[selectedStack].skills.reduce(
                        (sum, skill) => sum + skill.mastery,
                        0
                      ) / skillStacks[selectedStack].skills.length
                    )}
                    %
                  </div>
                </div>
              </div>

              {/* Overall Stats */}
              <div className="space-y-4">
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/20">
                  <div className="text-2xl font-bold text-white mb-1">
                    {stats.totalSkills}
                  </div>
                  <div className="text-sm text-slate-400">Total Skills</div>
                </div>

                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/20">
                  <div className="text-2xl font-bold text-white mb-1">
                    {stats.avgMastery}%
                  </div>
                  <div className="text-sm text-slate-400">Avg Mastery</div>
                </div>

                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-400/20">
                  <div className="text-2xl font-bold text-white mb-1">
                    {stats.totalExperience.toFixed(1)}
                  </div>
                  <div className="text-sm text-slate-400">Total Years</div>
                </div>
              </div>

              {/* Proficiency Bar */}
              <div className="mt-6">
                <div className="flex justify-between text-sm text-slate-400 mb-2">
                  <span>Overall Proficiency</span>
                  <span>{stats.avgMastery}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-1000 animate-fill-bar"
                    style={{ width: `${stats.avgMastery}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes draw-circle {
          0% {
            stroke-dashoffset: ${2 * Math.PI * 40};
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        @keyframes fill-bar {
          0% {
            width: 0%;
          }
          100% {
            width: var(--target-width);
          }
        }

        .animate-draw-circle {
          animation: draw-circle 1.5s ease-out forwards;
        }

        .animate-fill-bar {
          animation: fill-bar 2s ease-out 1s forwards;
          width: 0%;
        }
      `}</style>
    </div>
  );
};

export default Skills;
