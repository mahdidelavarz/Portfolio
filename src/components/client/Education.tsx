import {
  SolarCalendarBold,
  SolarDiplomaBold,
  SolarMapPoindBold,
} from "@/icons/icons";

const EDUCATION = {
  degree: "B.Sc. in Computer Engineering",
  institution: "Islamic Azad University, Tabriz",
  period: "2023 – expected 2028",
  location: "Tabriz, Iran",
  focus: "Software engineering and web development",
} as const;

export default function Education() {
  return (
    <div className="relative py-16 md:py-20 bg-gradient-to-bl from-blue-950 via-gray-950 to-blue-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-center gap-3">
          <div className="h-[1.5px] w-18 bg-gradient-to-l from-transparent via-cyan-500 to-transparent" />
          <h2 className="text-sm font-medium uppercase tracking-widest text-cyan-400">
            Education
          </h2>
          <div className="h-[1.5px] w-18 bg-gradient-to-l from-transparent via-cyan-500 to-transparent" />
        </div>
        <div className="flex flex-col sm:flex-row items-start gap-4 rounded-2xl border border-slate-700/50 bg-slate-800/40 p-5 md:p-6 text-left">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600">
            <SolarDiplomaBold width={24} height={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold text-white">
              {EDUCATION.degree}
            </h3>
            <p className="text-cyan-400 font-medium">{EDUCATION.institution}</p>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <SolarCalendarBold width={14} height={14} />
                {EDUCATION.period}
              </span>
              <span className="flex items-center gap-1.5">
                <SolarMapPoindBold width={14} height={14} />
                {EDUCATION.location}
              </span>
            </div>
            <p className="mt-3 text-sm md:text-base text-slate-300">
              Focus: {EDUCATION.focus}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
