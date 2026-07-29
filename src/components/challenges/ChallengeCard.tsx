import Link from "next/link";
import type { PublicChallenge } from "@/data/challenge-validator";

export type AnswerStatus = "unanswered" | "correct" | "incorrect";

const difficultyLabel = {
  beginner: "مقدماتی",
  intermediate: "متوسط",
  advanced: "پیشرفته",
};

const statusStyle: Record<AnswerStatus, string> = {
  unanswered: "border-slate-700 bg-slate-800/50 text-slate-400",
  correct: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  incorrect: "border-rose-500/30 bg-rose-500/10 text-rose-300",
};

const statusLabel: Record<AnswerStatus, string> = {
  unanswered: "پاسخ نداده‌اید",
  correct: "پاسخ درست",
  incorrect: "پاسخ نادرست",
};

export default function ChallengeCard({
  challenge,
  answerStatus = "unanswered",
  totalAnswers = 0,
}: {
  challenge: PublicChallenge;
  answerStatus?: AnswerStatus;
  totalAnswers?: number;
}) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30 sm:p-6">
      <div className="mb-5 flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full border border-cyan-500/25 bg-cyan-500/10 px-3 py-1 text-cyan-300">
          {challenge.technology}
        </span>
        <span className="rounded-full border border-purple-500/25 bg-purple-500/10 px-3 py-1 text-purple-300">
          {challenge.topic}
        </span>
        <span className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-slate-300">
          {difficultyLabel[challenge.difficulty]}
        </span>
      </div>
      <h2 className="mb-3 text-xl font-black leading-8 text-white group-hover:text-cyan-200">
        {challenge.title}
      </h2>
      <p className="mb-6 flex-1 text-sm leading-7 text-slate-400">
        {challenge.description}
      </p>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className={`rounded-lg border px-2.5 py-1.5 ${statusStyle[answerStatus]}`}>
          {statusLabel[answerStatus]}
        </span>
        <span className="text-slate-500">
          {challenge.estimatedMinutes ? `${challenge.estimatedMinutes} دقیقه · ` : ""}
          {totalAnswers.toLocaleString("fa-IR")} پاسخ
        </span>
      </div>
      <Link
        href={`/challenges/${challenge.slug}`}
        className="rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-3 text-center text-sm font-bold text-white transition hover:shadow-lg hover:shadow-cyan-500/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
      >
        {answerStatus === "unanswered" ? "حل چالش" : "مشاهده پاسخ"}
      </Link>
    </article>
  );
}
