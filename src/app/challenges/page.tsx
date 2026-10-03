import type { Metadata } from "next";
import Link from "next/link";
import ChallengeShell from "@/components/challenges/ChallengeShell";
import LabFeature from "@/components/challenges/hub/LabFeature";
import LabSteps from "@/components/challenges/hub/LabSteps";
import { getPublishedPublicChallenges } from "@/lib/challenges/repository";
import { getLabShowcase, getLabSummary } from "@/lib/lab/repository";

export const metadata: Metadata = {
  title: "چالش‌های فرانت‌اند",
  description: "آزمایشگاه پرفورمنس با تیکت‌های واقعی و سؤال‌های کوتاه JavaScript و React همراه با پاسخ تشریحی.",
  alternates: { canonical: "https://mahdidelavar.ir/challenges" },
  openGraph: {
    title: "چالش‌های فرانت‌اند | مهدی دلاور",
    description: "مشکل‌های پرفورمنس را در یک اپ زنده پیدا و حل کنید، یا دانشتان را با سؤال‌های کوتاه محک بزنید.",
    url: "https://mahdidelavar.ir/challenges",
  },
};

export default function ChallengesHubPage() {
  const lab = getLabSummary();
  const quizCount = getPublishedPublicChallenges().length;

  return (
    <ChallengeShell>
      <header className="mx-auto mb-12 mt-8 max-w-3xl text-center sm:mb-16 sm:mt-12">
        <div className="mb-6 inline-flex items-center gap-3">
          <div className="h-px w-12 bg-gradient-to-l from-cyan-500 to-transparent sm:w-20" />
          <span className="font-sans text-sm font-medium uppercase tracking-widest text-cyan-400">
            Frontend Challenges
          </span>
          <div className="h-px w-12 bg-gradient-to-r from-cyan-500 to-transparent sm:w-20" />
        </div>
        <h1 className="mb-6 text-3xl font-black leading-[1.4] [text-wrap:balance] sm:text-5xl">
          <span className="bg-gradient-to-l from-white via-sky-400 to-white bg-clip-text text-transparent">
            کد کند را پیدا کن، درستش کن، اندازه بگیر
          </span>
        </h1>
        <p className="text-base leading-8 text-slate-400 sm:text-lg">
          چالش‌ها حالا دو شکل دارند: آزمایشگاهی که در آن مشکل‌های واقعی پرفورمنس را در یک اپ زنده حل می‌کنی، و سؤال‌های کوتاه برای محک زدن دانش JavaScript و React.
        </p>
      </header>

      <LabFeature tickets={getLabShowcase()} totalTickets={lab.total} />

      <LabSteps />

      <section aria-labelledby="quiz-title" className="mb-8 mt-16 sm:mt-20">
        <Link
          href="/challenges/quiz"
          className="group flex flex-col gap-4 rounded-2xl border border-slate-700/50 bg-slate-900/50 p-5 transition hover:-translate-y-0.5 hover:border-cyan-400/30 sm:flex-row sm:items-center sm:justify-between sm:p-6"
        >
          <div>
            <span className="mb-2 block text-xs text-slate-500">چالش‌های قبلی</span>
            <h2 id="quiz-title" className="text-lg font-black text-white transition group-hover:text-cyan-200">سؤال‌های کوتاه</h2>
            <p className="mt-1 text-sm leading-7 text-slate-400">
              سؤال‌های چندگزینه‌ای JavaScript و React با پاسخ تشریحی و رتبه‌بندی ماهانه.
            </p>
          </div>
          <span className="shrink-0 text-sm font-bold text-cyan-300">
            {quizCount.toLocaleString("fa-IR")} سؤال <span aria-hidden="true">←</span>
          </span>
        </Link>
      </section>
    </ChallengeShell>
  );
}
