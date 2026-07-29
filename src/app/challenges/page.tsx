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
  return (
    <ChallengeShell>
      <header className="mb-10 max-w-3xl">
        <p className="mb-3 text-sm font-bold text-cyan-300">Frontend Challenges</p>
        <h1 className="mb-5 text-4xl font-black leading-tight text-white sm:text-6xl">هر بار یک سؤال، هر بار یک نکته تازه</h1>
        <p className="text-base leading-8 text-slate-400 sm:text-lg">بدون ثبت‌نام پاسخ بدهید، توضیح مرحله‌به‌مرحله را ببینید و پیشرفتتان را در همین مرورگر دنبال کنید.</p>
      </header>
      <ChallengesExplorer initialChallenges={challenges} />
    </ChallengeShell>
  );
}
