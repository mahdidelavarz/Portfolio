"use client";

import { Icon } from "@iconify/react";
import { type ComponentType, type SVGProps } from "react";
import SectionHeader from "@/components/SectionHeader";
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
  skills: readonly Skill[];
};

type SkillStackMap = Record<StackKey, SkillStack>;

const SKILL_STACKS: SkillStackMap = {
  core: {
    title: "Core Frontend",
    icon: MingcuteCodeLine,
    color: "from-cyan-500 to-blue-600",
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
    skills: [
      { name: "Git / GitHub", icon: "logos:git-icon" },
      { name: "Azure", icon: "logos:microsoft-azure" },
      { name: "CI/CD", icon: "simple-icons:githubactions" },
      { name: "Stimulsoft Report", icon: "mdi:file-chart-outline" },
    ],
  },
};

const STACK_KEYS = Object.keys(SKILL_STACKS) as StackKey[];

function SkillGroup({ stack }: { stack: SkillStack }) {
  const IconComponent = stack.icon;
  return (
    <section className="rounded-2xl border border-slate-700/50 bg-slate-800/40 p-5 md:p-6 text-left">
      <h3 className="mb-4 flex items-center gap-3 text-lg font-semibold text-white">
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${stack.color}`}
        >
          <IconComponent className="h-5 w-5 text-white" />
        </span>
        {stack.title}
      </h3>
      <ul className="flex flex-wrap gap-2">
        {stack.skills.map((skill) => (
          <li
            key={skill.name}
            className="flex items-center gap-2 rounded-lg border border-slate-600/50 bg-slate-900/40 px-3 py-1.5 text-sm text-slate-200"
          >
            <Icon icon={skill.icon} className="h-4 w-4 shrink-0" />
            {skill.name}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Skills() {
  return (
    <div className="relative py-20 md:py-28 bg-gradient-to-bl from-blue-950 via-gray-950 to-blue-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Skills"
          title="Tech Stack"
          subtitle="React and TypeScript first, supported by frontend architecture, data handling, and practical backend tooling."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {STACK_KEYS.map((key) => (
            <SkillGroup key={key} stack={SKILL_STACKS[key]} />
          ))}
        </div>
      </div>
    </div>
  );
}
