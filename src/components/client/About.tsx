import Image from "next/image";
import {
  SolarCalendarBold,
  SolarCodeSquareBold,
  SolarMapPoindBold,
} from "@/icons/icons";
import SectionHeader from "@/components/SectionHeader";

const PERSONAL_INFO = {
  name: "Mahdi Delavar",
  location: "Tabriz, Iran",
  role: "Frontend Developer",
  experience: "3+ Years",
  stack: "React + TypeScript",
} as const;

export default function AboutMe() {
  return (
    <div className="relative py-20 md:py-28 bg-gradient-to-bl from-blue-950 via-gray-950 to-blue-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="About"
          title="Frontend Engineering in Practice"
          subtitle="React and TypeScript for enterprise workflows and maintainable products"
        />

        <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 md:p-8">
          <div className="grid md:grid-cols-3 gap-6 md:gap-10">
            <div className="md:col-span-1 flex flex-col items-center">
              <Image
                src="/mahdi-delavar.webp"
                alt="Portrait of Mahdi Delavar"
                width={224}
                height={224}
                className="w-44 h-44 md:w-56 md:h-56 rounded-2xl object-cover mb-5 ring-1 ring-slate-600/60"
              />
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
                {PERSONAL_INFO.name}
              </h3>
              <p className="text-cyan-400 font-medium mb-5 text-lg md:text-xl">
                {PERSONAL_INFO.role}
              </p>
              <div className="flex flex-wrap justify-center gap-2 text-sm">
                <span className="px-3 py-1 bg-slate-700/50 rounded-lg text-slate-300">
                  <SolarCalendarBold className="inline mr-1" width={16} />
                  {PERSONAL_INFO.experience}
                </span>
                <span className="px-3 py-1 bg-slate-700/50 rounded-lg text-slate-300">
                  <SolarMapPoindBold className="inline mr-1" width={16} />
                  {PERSONAL_INFO.location}
                </span>
                <span className="px-3 py-1 bg-slate-700/50 rounded-lg text-slate-300">
                  <SolarCodeSquareBold className="inline mr-1" width={16} />
                  {PERSONAL_INFO.stack}
                </span>
              </div>
            </div>

            <div className="md:col-span-2 space-y-4 text-slate-300 leading-relaxed text-left">
              <p>
                I&apos;m a frontend developer working mainly with React and
                TypeScript. Over the past few years, I&apos;ve worked on
                everything from personal full-stack products to a large,
                multi-module enterprise ERP.
              </p>
              <p>
                Most of my professional work has involved turning complex
                business workflows into maintainable frontend systems:
                data-heavy interfaces, reusable form and table
                infrastructure, routed workflows, state management, and
                shared architecture such as PageShell.
              </p>
              <p>
                I usually care as much about the structure behind a feature
                as the UI itself. I try to understand how the workflow and
                data actually behave, then build the frontend around that
                instead of duplicating the same logic for every new page. I
                also use personal projects to explore full-stack development
                and product engineering end to end.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
