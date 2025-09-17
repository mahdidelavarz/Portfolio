import { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";

// Types
type Skill = {
  name: string;
  mastery: number;
  years: number;
  icon: string;
  color: string;
};
type StackKey = "frontend" | "state" | "animation" | "tools";
type SkillStack = {
  title: string;
  icon: string;
  color: string; // nav gradient
  gradientColors: [string, string, string]; // for progress circle
  skills: Skill[];
};
type SkillStackMap = Record<StackKey, SkillStack>;

const Skills = () => {
  const [selectedStack, setSelectedStack] = useState<StackKey>("frontend");
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const [animateProgress, setAnimateProgress] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const skillStacks: SkillStackMap = {
    frontend: {
      title: "Frontend",
      icon: "ri:code-s-slash-line",
      color: "from-blue-400 via-purple-500 to-purple-600",
      gradientColors: ["#60a5fa", "#8b5cf6", "#6366f1"],
      skills: [
        { name: "React", mastery: 95, years: 3, icon: "logos:react", color: "text-blue-400" },
        { name: "Next.js", mastery: 90, years: 2, icon: "logos:nextjs-icon", color: "text-white" },
        { name: "TypeScript", mastery: 88, years: 2.5, icon: "logos:typescript-icon", color: "text-blue-500" },
        { name: "Tailwind", mastery: 92, years: 2, icon: "logos:tailwindcss-icon", color: "text-teal-400" },
      ],
    },
    state: {
      title: "State",
      icon: "ri:settings-4-line",
      color: "from-purple-400 via-pink-500 to-red-500",
      gradientColors: ["#a855f7", "#ec4899", "#ef4444"],
      skills: [
        { name: "Zustand", mastery: 87, years: 1.5, icon: "simple-icons:zustand", color: "text-orange-400" },
        { name: "Redux", mastery: 83, years: 2, icon: "logos:redux", color: "text-purple-500" },
        { name: "TanStack", mastery: 85, years: 1, icon: "logos:react-query-icon", color: "text-red-400" },
        { name: "Hook Form", mastery: 86, years: 2, icon: "simple-icons:reacthookform", color: "text-pink-400" },
      ],
    },
    animation: {
      title: "Animation",
      icon: "ri:magic-line",
      color: "from-amber-400 via-orange-500 to-red-500",
      gradientColors: ["#fbbf24", "#f97316", "#dc2626"],
      skills: [
        { name: "Framer", mastery: 90, years: 2, icon: "logos:framer", color: "text-purple-400" },
        { name: "Three.js", mastery: 84, years: 1, icon: "logos:threejs", color: "text-green-400" },
        { name: "CSS", mastery: 88, years: 2.5, icon: "logos:css-3", color: "text-blue-500" },
        { name: "GSAP", mastery: 80, years: 1, icon: "simple-icons:greensock", color: "text-green-500" },
      ],
    },
    tools: {
      title: "Tools",
      icon: "ri:tools-line",
      color: "from-green-400 via-teal-500 to-blue-500",
      gradientColors: ["#10b981", "#06b6d4", "#3b82f6"],
      skills: [
        { name: "Git", mastery: 89, years: 3, icon: "logos:git-icon", color: "text-orange-500" },
        { name: "Vite", mastery: 85, years: 2, icon: "logos:vitejs", color: "text-yellow-400" },
        { name: "Webpack", mastery: 78, years: 1.5, icon: "logos:webpack", color: "text-blue-400" },
        { name: "Docker", mastery: 75, years: 1, icon: "logos:docker-icon", color: "text-blue-500" },
      ],
    },
  };

  const stackKeys = Object.keys(skillStacks) as StackKey[];

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        setTimeout(() => setAnimateProgress(true), 500);
      }
    });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-switch
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedStack((prev) => {
        const currentIndex = stackKeys.indexOf(prev);
        return stackKeys[(currentIndex + 1) % stackKeys.length];
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [stackKeys]);

  // Reset progress animation when stack changes
  useEffect(() => {
    if (isVisible) {
      setAnimateProgress(false);
      setTimeout(() => setAnimateProgress(true), 200);
    }
  }, [selectedStack, isVisible]);

  // Stats
  const stats = (() => {
    const allSkills = Object.values(skillStacks).flatMap((s) => s.skills);
    const totalSkills = allSkills.length;
    const avgMastery = Math.round(allSkills.reduce((sum, s) => sum + s.mastery, 0) / totalSkills);
    const totalExperience = allSkills.reduce((sum, s) => sum + s.years, 0);
    return { totalSkills, avgMastery, totalExperience };
  })();

  return (
    <div ref={sectionRef} className="relative min-h-screen w-full mt-20 overflow-hidden">
      {/* Header */}
       <div className={`text-center mb-12 transition-all duration-1000`}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent"></div>
            <span className="text-orange-400 font-bold tracking-wider text-lg uppercase">
              skills
            </span>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent"></div>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-slate-200 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
             TECH STACK
            </span>
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Mastering modern technologies to build exceptional digital experiences
          </p>
        </div>

      {/* Navigation */}
      <div className="flex justify-center mb-8">
        <div className="flex gap-3 backdrop-blur-lg bg-slate-900/40 border border-slate-700/60 rounded-3xl p-4 shadow-2xl">
          {stackKeys.map((stack) => (
            <button
              key={stack}
              onClick={() => setSelectedStack(stack)}
              className={`relative px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-3 transition-all ${
                selectedStack === stack ? "text-white scale-110 bg-gradient-to-r " + skillStacks[stack].color : "text-slate-400 hover:text-white hover:scale-105"
              }`}
            >
              <Icon icon={skillStacks[stack].icon} width="20" />
              <span className="hidden sm:inline">{skillStacks[stack].title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-6">
        {skillStacks[selectedStack].skills.map((skill, i) => (
          <div
            key={skill.name}
            onMouseEnter={() => setHoveredSkill(i)}
            onMouseLeave={() => setHoveredSkill(null)}
            className="relative group h-80 transition-transform duration-500 hover:scale-105 backdrop-blur-lg bg-slate-900/40 border border-slate-700/60 rounded-3xl py-4 flex flex-col justify-around shadow-2xl"
          >
            {/* Icon */}
           <div className="w-full h-35 flex justify-center items-center">
             <Icon icon={skill.icon} width="40" className={`mx-auto mb-3 ${skill.color}`} />
           </div>

            {/* Name */}
            <h3 className="text-lg font-bold text-white mb-2">{skill.name}</h3>

            {/* Progress Circle */}
            <div className="relative w-20 h-20 mx-auto my-4">
              <svg className="w-20 h-20 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.1)" strokeWidth="6" fill="none" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke={`url(#grad-${selectedStack})`}
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 40}
                  strokeDashoffset={animateProgress ? 2 * Math.PI * 40 * (1 - skill.mastery / 100) : 2 * Math.PI * 40}
                  style={{ transition: `stroke-dashoffset 1.2s ease ${i * 0.2}s` }}
                />
                <defs>
                  <linearGradient id={`grad-${selectedStack}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    {skillStacks[selectedStack].gradientColors.map((c, idx) => (
                      <stop key={idx} offset={`${idx * 50}%`} stopColor={c} />
                    ))}
                  </linearGradient>
                </defs>
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-white font-bold">{skill.mastery}%</span>
            </div>

            {/* Experience */}
            <p className="text-sm text-slate-400">{skill.years}y exp</p>

            {/* Tooltip */}
            {hoveredSkill === i && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 -translate-y-full bg-slate-900/90 text-white px-4 py-2 rounded-lg text-sm shadow-lg opacity-100 transition">
                {skill.mastery >= 90 ? "Expert" : skill.mastery >= 80 ? "Advanced" : "Intermediate"}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* === Bottom Sections === */}
      <div className="max-w-6xl mx-auto mt-20 px-6 space-y-12">
        {/* Highlights */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Key Strengths</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="backdrop-blur-lg bg-slate-900/40 border border-slate-700/60 rounded-3xl p-8 shadow-2xl text-center">
              <Icon icon="ri:lightbulb-flash-fill" className="text-yellow-400 mb-3" width="32" />
              <h3 className="text-lg font-semibold text-white mb-2">Problem Solving</h3>
              <p className="text-slate-400 text-sm">Strong ability to debug, optimize, and design scalable solutions.</p>
            </div>
            <div className="backdrop-blur-lg bg-slate-900/40 border border-slate-700/60 rounded-3xl p-8 shadow-2xl text-center">
              <Icon icon="ri:team-fill" className="text-blue-400 mb-3" width="32" />
              <h3 className="text-lg font-semibold text-white mb-2">Collaboration</h3>
              <p className="text-slate-400 text-sm">Experience working in cross-functional teams with Git & agile tools.</p>
            </div>
            <div className="backdrop-blur-lg bg-slate-900/40 border border-slate-700/60 rounded-3xl p-8 shadow-2xl text-center">
              <Icon icon="ri:rocket-2-fill" className="text-purple-400 mb-3" width="32" />
              <h3 className="text-lg font-semibold text-white mb-2">Continuous Learning</h3>
              <p className="text-slate-400 text-sm">Always exploring new frameworks, libraries, and best practices.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Skills;
