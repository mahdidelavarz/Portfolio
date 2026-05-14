"use client";
import {
  useState,
  useEffect,
  useRef,
  useCallback,
  memo,
  SVGProps,
} from "react";
import {
  DevIconSupabase,
  FaSolidPuzzlePieceIcon,
  LogoPostgresIcon,
  LogosDockerIcon,
  LogosFigmaIcon,
  LogosGitIcon,
  LogosJestIcon,
  LogosNextjsIcon,
  LogosReactIcon,
  LogosReactQuery,
  LogosTailwindCssIcon,
  LogosTypescriptBold,
  LogosViteIcon,
  LogosWebpackIcon,
  SimpleIconCypress,
  SimpleThreedorJs,
  SkillIconsDotnet,
  VscodeFileTypeSql,
} from "../../icons/icons";
import {
  MingcuteCodeLine,
  MingcuteGroupLine,
  MingcutePalleteLine,
  MingcuteRocketLine,
  MingcuteSendLine,
  MingcuteServerLine,
  MingcuteTimeLine,
  MingcuteToolLine,
} from "@/icons/icons";

interface SkillsProps {
  scrollToSection?: (id: string) => void;
}

// Types
type Skill = {
  name: string;
  mastery: number;
  years: number;
  icon: (props: SVGProps<SVGSVGElement>) => React.JSX.Element;
  color: string;
  description: string;
};

type StackKey = "frontend" | "backend" | "tools" | "design";

type SkillStack = {
  title: string;
  icon: (props: SVGProps<SVGSVGElement>) => React.JSX.Element;
  color: string;
  borderColor: string;
  shadowColor: string;
  bgGradient: string;
  skills: Skill[];
};

type SkillStackMap = Record<StackKey, SkillStack>;

// Skill Card Component
const SkillCard = memo(
  ({
    skill,
    index,
    isVisible,
    isActive,
    stackColor,
  }: {
    skill: Skill;
    index: number;
    isVisible: boolean;
    isActive: boolean;
    stackColor: string;
  }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      if (isVisible && isActive) {
        const timer = setTimeout(() => {
          setProgress(skill.mastery);
        }, index * 100);
        return () => clearTimeout(timer);
      } else {
        setProgress(0);
      }
    }, [isVisible, isActive, skill.mastery, index]);

    return (
      <div
        className={`w-39 lg:w-45 relative group transition-all duration-700  ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        <div className="relative h-full bg-gray-800/70  border border-slate-700/50 rounded-2xl p-6 hover:border-cyan-400/30 transition-all duration-500 group hover:-translate-y-2 backdrop-blur-3xl">
          {/* Icon */}
          <div className="relative z-10 flex justify-center mb-4">
            <div
              className={`w-16 h-16  rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
            >
              <skill.icon className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Name */}
          <h3 className="relative z-10 text-lg font-bold text-white text-center mb-2">
            {skill.name}
          </h3>

          {/* Progress Bar */}
          <div className="relative z-10 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-slate-400">Proficiency</span>
              <span className="text-xs font-semibold text-cyan-400">
                {skill.mastery}%
              </span>
            </div>
            <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${stackColor} rounded-full transition-all duration-1000 ease-out`}
                style={{
                  width: `${progress}%`,
                  transitionDelay: `${index * 100}ms`,
                }}
              />
            </div>
          </div>

          {/* Experience */}
          <div className="relative z-10 flex items-center justify-center gap-2 text-sm text-slate-400">
            <MingcuteTimeLine className="w-4 h-4" />
            <span>{skill.years} years experience</span>
          </div>

          {/* Description on hover */}
          <div className="absolute inset-x-4 -bottom-2 translate-y-full opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20">
            <div className="bg-slate-900/95 backdrop-blur-sm border border-slate-700 rounded-lg p-3 shadow-xl">
              <p className="text-xs text-slate-300">{skill.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

SkillCard.displayName = "SkillCard";

// Mobile Skill Slider Component
const MobileSkillSlider = memo(
  ({
    stacks,
    selectedStack,
    onSelect,
  }: {
    stacks: SkillStackMap;
    selectedStack: StackKey;
    onSelect: (key: StackKey) => void;
  }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
      <div className="relative mb-8 md:hidden ">
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto pb-4 px-4 -mx-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {(Object.keys(stacks) as StackKey[]).map((key) => {
            const IconComponent = stacks[key].icon;
            return (
              <button
                key={key}
                onClick={() => onSelect(key)}
                className={`relative flex-shrink-0 snap-center transition-all duration-300 ${
                  selectedStack === key ? "scale-105" : "scale-95 opacity-70"
                }`}
              >
                <div
                  className={`relative px-6 py-3 rounded-xl ${
                    selectedStack === key
                      ? `bg-gradient-to-r ${stacks[key].color} text-white shadow-lg ${stacks[key].shadowColor}`
                      : "bg-slate-800/50 text-slate-400 border border-slate-700/50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <IconComponent className="w-5 h-5" />
                    <span className="font-semibold text-sm">
                      {stacks[key].title}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  },
);

MobileSkillSlider.displayName = "MobileSkillSlider";

// Main Skills Component
const Skills = memo<SkillsProps>(({ scrollToSection }) => {
  const [selectedStack, setSelectedStack] = useState<StackKey>("frontend");
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const skillStacks: SkillStackMap = {
    frontend: {
      title: "Frontend",
      icon: MingcuteCodeLine,
      color: "from-cyan-500 to-blue-600",
      borderColor: "border-cyan-400/50",
      shadowColor: "shadow-cyan-500/20",
      bgGradient: "from-cyan-500/10 to-blue-600/10",
      skills: [
        {
          name: "React.js",
          mastery: 95,
          years: 3,
          icon: LogosReactIcon,
          color: "text-cyan-400",
          description:
            "Expert in React hooks, context, and performance optimization",
        },
        {
          name: "Next.js",
          mastery: 90,
          years: 2,
          icon: LogosNextjsIcon,
          color: "text-white",
          description: "Building SSR/SSG applications with optimal performance",
        },
        {
          name: "TypeScript",
          mastery: 88,
          years: 2.5,
          icon: LogosTypescriptBold,
          color: "text-blue-500",
          description: "Strong typing for scalable and maintainable code",
        },
        {
          name: "Tailwind CSS",
          mastery: 92,
          years: 2,
          icon: LogosTailwindCssIcon,
          color: "text-teal-400",
          description: "Rapid UI development with utility-first CSS",
        },
        {
          name: "TanStack Query",
          mastery: 85,
          years: 1.5,
          icon: LogosReactQuery,
          color: "text-purple-400",
          description: "Creating smooth animations and interactions",
        },
        {
          name: "Three.js",
          mastery: 75,
          years: 1,
          icon: SimpleThreedorJs,
          color: "text-white",
          description: "3D graphics and WebGL experiences",
        },
      ],
    },
    backend: {
      title: "Backend",
      icon: MingcuteServerLine,
      color: "from-purple-500 to-pink-600",
      borderColor: "border-purple-400/50",
      shadowColor: "shadow-purple-500/20",
      bgGradient: "from-purple-500/10 to-pink-600/10",
      skills: [
        {
          name: ".Net Core",
          mastery: 75,
          years: 1,
          icon: SkillIconsDotnet,
          color: "text-red-500",
          description: "Caching and session management",
        },
        {
          name: "MongoDB",
          mastery: 82,
          years: 2,
          icon: LogoPostgresIcon,
          color: "text-green-500",
          description: "NoSQL database design and optimization",
        },
        {
          name: "SQL Server",
          mastery: 78,
          years: 1.5,
          icon: VscodeFileTypeSql,
          color: "text-blue-400",
          description: "Relational database management",
        },
        {
          name: "Supabase",
          mastery: 78,
          years: 1.5,
          icon: DevIconSupabase,
          color: "text-blue-400",
          description: "Relational database management",
        },
      ],
    },
    tools: {
      title: "Tools",
      icon: MingcuteToolLine,
      color: "from-emerald-500 to-teal-600",
      borderColor: "border-emerald-400/50",
      shadowColor: "shadow-emerald-500/20",
      bgGradient: "from-emerald-500/10 to-teal-600/10",
      skills: [
        {
          name: "Git",
          mastery: 90,
          years: 3,
          icon: LogosGitIcon,
          color: "text-orange-500",
          description: "Version control and collaboration",
        },
        {
          name: "Docker",
          mastery: 75,
          years: 1,
          icon: LogosDockerIcon,
          color: "text-blue-500",
          description: "Containerization and deployment",
        },
        {
          name: "Webpack",
          mastery: 80,
          years: 2,
          icon: LogosWebpackIcon,
          color: "text-blue-400",
          description: "Module bundling and optimization",
        },
        {
          name: "Vite",
          mastery: 85,
          years: 1.5,
          icon: LogosViteIcon,
          color: "text-purple-500",
          description: "Fast build tool for modern web",
        },
        {
          name: "Jest",
          mastery: 82,
          years: 2,
          icon: LogosJestIcon,
          color: "text-red-500",
          description: "Unit testing and test coverage",
        },
        {
          name: "Cypress",
          mastery: 78,
          years: 1,
          icon: SimpleIconCypress,
          color: "text-green-500",
          description: "End-to-end testing automation",
        },
      ],
    },
    design: {
      title: "Design",
      icon: MingcutePalleteLine,
      color: "from-orange-500 to-red-600",
      borderColor: "border-orange-400/50",
      shadowColor: "shadow-orange-500/20",
      bgGradient: "from-orange-500/10 to-red-600/10",
      skills: [
        {
          name: "Figma",
          mastery: 85,
          years: 2,
          icon: LogosFigmaIcon,
          color: "text-purple-500",
          description: "UI/UX design and prototyping",
        },
      ],
    },
  };

  const stackKeys = Object.keys(skillStacks) as StackKey[];

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

  // Auto-switch stacks
  useEffect(() => {
    if (!isMobile) {
      const interval = setInterval(() => {
        setSelectedStack((prev) => {
          const currentIndex = stackKeys.indexOf(prev);
          return stackKeys[(currentIndex + 1) % stackKeys.length];
        });
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [stackKeys, isMobile]);

  const handleContactClick = useCallback(() => {
    scrollToSection?.("contactme");
  }, [scrollToSection]);

  // Calculate statistics
  const stats = (() => {
    const allSkills = Object.values(skillStacks).flatMap((s) => s.skills);
    const totalSkills = allSkills.length;
    const avgMastery = Math.round(
      allSkills.reduce((sum, s) => sum + s.mastery, 0) / totalSkills,
    );
    const totalExperience = Math.max(...allSkills.map((s) => s.years));
    return { totalSkills, avgMastery, totalExperience };
  })();

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen py-12 md:py-20 overflow-hidden bg-gradient-to-bl from-blue-950 via-gray-950 to-blue-950"
    >
      {/* Background gradient */}
      <div className="absolute inset-0" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 -right-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
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
              Skills
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
              Tech Stack
            </span>
          </h2>

          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Mastering modern technologies to build exceptional digital
            experiences with performance and scalability in mind.
          </p>
        </div>

        {/* Stats */}
        <div
          className={`grid grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto mb-12 transition-all duration-1000 delay-200 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="relative bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 md:p-6 hover:border-cyan-400/50 transition-all duration-300">
            <div className="text-2xl md:text-3xl font-bold text-white mb-1">
              {stats.totalSkills}+
            </div>
            <div className="text-slate-400 text-sm">Technologies</div>
          </div>
          <div className="relative bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 md:p-6 hover:border-purple-400/50 transition-all duration-300">
            <div className="text-2xl md:text-3xl font-bold text-white mb-1">
              {stats.avgMastery}%
            </div>
            <div className="text-slate-400 text-sm">Avg Mastery</div>
          </div>
          <div className="relative bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 md:p-6 hover:border-emerald-400/50 transition-all duration-300">
            <div className="text-2xl md:text-3xl font-bold text-white mb-1">
              {stats.totalExperience}+
            </div>
            <div className="text-slate-400 text-sm">Years Exp</div>
          </div>
        </div>

        {/* Mobile Slider */}
        {isMobile && (
          <MobileSkillSlider
            stacks={skillStacks}
            selectedStack={selectedStack}
            onSelect={setSelectedStack}
          />
        )}

        {/* Desktop Navigation */}
        {!isMobile && (
          <div
            className={`flex justify-center mb-12 transition-all duration-1000 delay-300 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="flex gap-3 bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-2">
              {stackKeys.map((key) => {
                const IconComponent = skillStacks[key].icon;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedStack(key)}
                    className={`relative px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-3 transition-all duration-300 ${
                      selectedStack === key
                        ? `bg-gradient-to-r ${skillStacks[key].color} text-white shadow-lg ${skillStacks[key].shadowColor}`
                        : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{skillStacks[key].title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Skills Grid */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-16">
          {skillStacks[selectedStack].skills.map((skill, index) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              index={index}
              isVisible={isVisible}
              isActive={true}
              stackColor={skillStacks[selectedStack].color}
            />
          ))}
        </div>

        {/* Key Strengths */}
        <div
          className={`transition-all duration-1000 delay-400 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
            Core Competencies
          </h3>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="relative bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 md:p-8 hover:border-yellow-400/30 transition-all duration-500 group">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mb-4">
                  <FaSolidPuzzlePieceIcon className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-3">
                  Problem Solving
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Strong analytical skills with ability to debug complex issues
                  and design scalable, efficient solutions.
                </p>
              </div>
            </div>

            <div className="relative bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 md:p-8 hover:border-blue-400/30 transition-all duration-500 group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4">
                  <MingcuteGroupLine className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-3">
                  Team Collaboration
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Excellent communication with experience in agile environments
                  and cross-functional team collaboration.
                </p>
              </div>
            </div>

            <div className="relative bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 md:p-8 hover:border-purple-400/30 transition-all duration-500 group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                  <MingcuteRocketLine className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-3">
                  Continuous Learning
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Passionate about staying current with latest technologies and
                  best practices in web development.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div
          className={`transition-all duration-1000 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="relative overflow-hidden bg-gradient-to-br from-slate-800/60 to-slate-700/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 md:p-12 text-center hover:border-cyan-400/50 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 opacity-0 hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Looking for a Skilled Developer?
              </h3>
              <p className="text-slate-400 text-base md:text-lg mb-8 max-w-2xl mx-auto">
                Let's collaborate to bring your ideas to life with modern
                technologies and best practices.
              </p>

              <button
                onClick={handleContactClick}
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-1"
                aria-label="Get in touch"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <div className="relative flex items-center justify-center gap-3">
                  <MingcuteSendLine className="w-5 h-5" />
                  <span>Get In Touch</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

Skills.displayName = "Skills";

export default Skills;
