"use client";

import { Icon } from "@iconify/react";
import {
  memo,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type SVGProps,
} from "react";
import {
  MingcuteCodeLine,
  MingcuteGroupLine,
  MingcuteRocketLine,
  MingcuteServerLine,
  MingcuteToolLine,
} from "@/icons/icons";

type StackKey = "core" | "state" | "architecture" | "supporting" | "tools";

type Skill = {
  name: string;
  icon: string;
};

type SkillStack = {
  title: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  color: string;
  shadowColor: string;
  skills: readonly Skill[];
};

type SkillStackMap = Record<StackKey, SkillStack>;

const SKILL_STACKS: SkillStackMap = {
  core: {
    title: "Core Frontend",
    icon: MingcuteCodeLine,
    color: "from-cyan-500 to-blue-600",
    shadowColor: "shadow-cyan-500/20",
    skills: [
      { name: "React.js", icon: "logos:react" },
      { name: "TypeScript", icon: "logos:typescript-icon" },
      { name: "Next.js", icon: "logos:nextjs-icon" },
      { name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
    ],
  },
  state: {
    title: "State & Data",
    icon: MingcuteServerLine,
    color: "from-violet-500 to-purple-600",
    shadowColor: "shadow-violet-500/20",
    skills: [
      { name: "TanStack Query", icon: "logos:react-query-icon" },
      { name: "Zustand", icon: "devicon:zustand" },
      { name: "React Hook Form", icon: "simple-icons:reacthookform" },
      { name: "React Router", icon: "simple-icons:reactrouter" },
    ],
  },
  architecture: {
    title: "Frontend Architecture",
    icon: MingcuteGroupLine,
    color: "from-indigo-500 to-cyan-600",
    shadowColor: "shadow-indigo-500/20",
    skills: [
      { name: "Data-Intensive UI", icon: "mdi:table-large" },
      { name: "Reusable Architecture", icon: "mdi:layers-triple-outline" },
      { name: "Routed Workspaces", icon: "mdi:routes" },
      {
        name: "RTL Support",
        icon: "material-symbols:format-textdirection-r-to-l",
      },
      { name: "Server / Client Tables", icon: "mdi:table-sync" },
    ],
  },
  supporting: {
    title: "Supporting Stack",
    icon: MingcuteRocketLine,
    color: "from-purple-500 to-pink-600",
    shadowColor: "shadow-purple-500/20",
    skills: [
      { name: "Vite", icon: "logos:vitejs" },
      { name: "Axios", icon: "simple-icons:axios" },
      { name: "Node.js", icon: "logos:nodejs-icon" },
      { name: "Express", icon: "simple-icons:express" },
      { name: "PostgreSQL", icon: "logos:postgresql" },
      { name: "SQL Server", icon: "simple-icons:microsoftsqlserver" },
      { name: "Docker", icon: "logos:docker-icon" },
      { name: "Docker Compose", icon: "logos:docker-icon" },
      { name: "REST APIs", icon: "mdi:api" },
    ],
  },
  tools: {
    title: "Tools",
    icon: MingcuteToolLine,
    color: "from-emerald-500 to-teal-600",
    shadowColor: "shadow-emerald-500/20",
    skills: [
      { name: "Git / GitHub", icon: "logos:git-icon" },
      { name: "Azure", icon: "logos:microsoft-azure" },
      { name: "CI/CD", icon: "simple-icons:githubactions" },
      { name: "Stimulsoft Report", icon: "mdi:file-chart-outline" },
    ],
  },
};

const STACK_KEYS = Object.keys(SKILL_STACKS) as StackKey[];

const SkillCard = memo(
  ({
    skill,
    index,
    isVisible,
  }: {
    skill: Skill;
    index: number;
    isVisible: boolean;
  }) => {
    return (
      <div
        className={`group relative w-36 transition-all duration-700 sm:w-40 lg:w-48 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
        style={{ transitionDelay: `${index * 80}ms` }}
      >
        <div className="flex h-full min-h-32 flex-col items-center justify-between rounded-2xl border border-slate-700/50 bg-gray-800/70 p-5 backdrop-blur-3xl transition-all duration-500 group-hover:-translate-y-2 group-hover:border-cyan-400/30">
          <div
            className="mb-4 flex h-12 w-12 items-center justify-center transition-transform duration-300 group-hover:scale-110"
          >
            <Icon icon={skill.icon} className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-center text-base font-bold text-white sm:text-lg">
            {skill.name}
          </h3>
        </div>
      </div>
    );
  },
);

SkillCard.displayName = "SkillCard";

const MobileSkillSlider = memo(
  ({
    selectedStack,
    onSelect,
  }: {
    selectedStack: StackKey;
    onSelect: (key: StackKey) => void;
  }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
      <div className="relative mb-8 md:hidden">
        <div
          ref={scrollRef}
          className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {STACK_KEYS.map((key) => {
            const stack = SKILL_STACKS[key];
            const IconComponent = stack.icon;

            return (
              <button
                key={key}
                onClick={() => onSelect(key)}
                className={`relative flex-shrink-0 snap-center transition-all duration-300 ${
                  selectedStack === key ? "scale-105" : "scale-95 opacity-70"
                }`}
              >
                <div
                  className={`relative rounded-xl px-6 py-3 ${
                    selectedStack === key
                      ? `bg-gradient-to-r ${stack.color} text-white shadow-lg ${stack.shadowColor}`
                      : "border border-slate-700/50 bg-slate-800/50 text-slate-400"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <IconComponent className="h-5 w-5" />
                    <span className="text-sm font-semibold">{stack.title}</span>
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

const Skills = memo(() => {
  const [selectedStack, setSelectedStack] = useState<StackKey>("core");
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  useEffect(() => {
    if (isMobile) return;

    const interval = setInterval(() => {
      setSelectedStack((currentStack) => {
        const currentIndex = STACK_KEYS.indexOf(currentStack);
        return STACK_KEYS[(currentIndex + 1) % STACK_KEYS.length];
      });
    }, 8000);

    return () => clearInterval(interval);
  }, [isMobile]);

  const selectedSkillStack = SKILL_STACKS[selectedStack];

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-bl from-blue-950 via-gray-950 to-blue-950 py-12 md:py-20"
    >
      <div className="absolute inset-0" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 h-96 w-96 animate-pulse rounded-full bg-cyan-500/10 blur-3xl" />
        <div
          className="absolute -right-20 bottom-1/4 h-72 w-72 animate-pulse rounded-full bg-purple-500/10 blur-3xl"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/3 h-96 w-96 animate-pulse rounded-full bg-emerald-500/5 blur-3xl"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`mb-12 text-center transition-all duration-1000 md:mb-16 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-cyan-400/30 bg-slate-800/50 px-4 py-2 backdrop-blur-sm">
            <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
            <span className="text-sm font-medium tracking-wider text-cyan-400 uppercase">
              Skills
            </span>
          </div>

          <h2 className="mb-6 text-4xl leading-tight font-bold sm:text-5xl lg:text-7xl">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
              Tech Stack
            </span>
          </h2>

          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-400 md:text-xl">
            React and TypeScript first, supported by frontend architecture,
            data handling, and practical backend tooling.
          </p>
        </div>

        {isMobile && (
          <MobileSkillSlider
            selectedStack={selectedStack}
            onSelect={setSelectedStack}
          />
        )}

        {!isMobile && (
          <div
            className={`mb-12 flex justify-center transition-all delay-200 duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="flex flex-wrap justify-center gap-3 rounded-2xl border border-slate-700/50 bg-slate-800/40 p-2 backdrop-blur-sm">
              {STACK_KEYS.map((key) => {
                const stack = SKILL_STACKS[key];
                const IconComponent = stack.icon;

                return (
                  <button
                    key={key}
                    onClick={() => setSelectedStack(key)}
                    className={`relative flex items-center gap-3 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 ${
                      selectedStack === key
                        ? `bg-gradient-to-r ${stack.color} text-white shadow-lg ${stack.shadowColor}`
                        : "text-slate-400 hover:bg-slate-700/50 hover:text-white"
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span>{stack.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="mb-16 flex flex-wrap justify-center gap-4 md:gap-6">
          {selectedSkillStack.skills.map((skill, index) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

Skills.displayName = "Skills";

export default Skills;
