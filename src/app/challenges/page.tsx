import type { Metadata } from "next";
import ChallengeShell from "@/components/challenges/ChallengeShell";
import ChallengesExplorer from "@/components/challenges/ChallengesExplorer";
import { getPublishedPublicChallenges } from "@/lib/challenges/repository";

export const metadata: Metadata = {
  title: "چالش‌های فرانت‌اند",
  description: "سؤال‌های کوتاه و تعاملی JavaScript و React همراه با پاسخ تشریحی و رتبه‌بندی ماهانه.",
  alternates: { canonical: "https://mahdidelavar.ir/challenges" },
  openGraph: {
    title: "چالش‌های فرانت‌اند | مهدی دلاور",
    description: "دانشتان را با چالش‌های کوتاه JavaScript و React محک بزنید.",
    url: "https://mahdidelavar.ir/challenges",
  },
};

export default function ChallengesPage() {
  const challenges = getPublishedPublicChallenges();
  const technologies = new Set(challenges.map((challenge) => challenge.technology)).size;
  const topics = new Set(challenges.map((challenge) => challenge.topic)).size;

  return (
    <ChallengeShell>
      <header className="mb-14 text-center sm:mb-16">
        <div className="mb-6 inline-flex items-center gap-3 rounded-full px-4 py-2">
          <div className="h-px w-12 bg-gradient-to-l from-cyan-500 to-transparent sm:w-20" />
          <span className="font-sans text-sm font-medium uppercase tracking-widest text-cyan-400">
            Frontend Challenges
          </span>
          <div className="h-px w-12 bg-gradient-to-r from-cyan-500 to-transparent sm:w-20" />
        </div>

        <h1 className="mx-auto mb-10 max-w-4xl text-3xl font-black leading-[1.35] sm:text-6xl lg:text-7xl">
          <span className="bg-gradient-to-l from-white via-sky-400 to-white bg-clip-text text-transparent">
            هر سؤال، یک قدم رو به جلو
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
          دانش JavaScript و React خود را با سؤال‌های کوتاه و کاربردی محک بزنید، پاسخ تشریحی را ببینید و پیشرفتتان را دنبال کنید.
        </p>

        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-3 gap-3 sm:gap-5">
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/40 p-4 backdrop-blur-sm sm:p-5">
            <strong className="block text-2xl font-black text-white sm:text-3xl">
              {challenges.length.toLocaleString("fa-IR")}
            </strong>
            <span className="mt-1 block text-xs text-slate-500 sm:text-sm">چالش منتشرشده</span>
          </div>
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/40 p-4 backdrop-blur-sm sm:p-5">
            <strong className="block text-2xl font-black text-cyan-300 sm:text-3xl">
              {technologies.toLocaleString("fa-IR")}
            </strong>
            <span className="mt-1 block text-xs text-slate-500 sm:text-sm">تکنولوژی</span>
          </div>
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/40 p-4 backdrop-blur-sm sm:p-5">
            <strong className="block text-2xl font-black text-sky-300 sm:text-3xl">
              {topics.toLocaleString("fa-IR")}
            </strong>
            <span className="mt-1 block text-xs text-slate-500 sm:text-sm">موضوع تخصصی</span>
          </div>
        </div>
      </header>
      <ChallengesExplorer initialChallenges={challenges} />
    </ChallengeShell>
  );
}
