"use client";

import { useEffect, useMemo, useState } from "react";
import type { PublicChallenge } from "@/data/challenge-validator";
import ChallengeCard, { type AnswerStatus } from "./ChallengeCard";

type EnrichedChallenge = PublicChallenge & {
  answerStatus: AnswerStatus;
  totalAnswers: number;
};

export default function ChallengesExplorer({
  initialChallenges,
}: {
  initialChallenges: PublicChallenge[];
}) {
  const [challenges, setChallenges] = useState<EnrichedChallenge[]>(
    initialChallenges.map((challenge) => ({
      ...challenge,
      answerStatus: "unanswered",
      totalAnswers: 0,
    })),
  );
  const [technology, setTechnology] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [topic, setTopic] = useState("all");
  const [personalStatusUnavailable, setPersonalStatusUnavailable] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/challenges", { signal: controller.signal, cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error();
        return response.json() as Promise<{ challenges: EnrichedChallenge[] }>;
      })
      .then((data) => setChallenges(data.challenges))
      .catch((error) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setPersonalStatusUnavailable(true);
      });
    return () => controller.abort();
  }, []);

  const technologies = useMemo(
    () => Array.from(new Set(initialChallenges.map((item) => item.technology))),
    [initialChallenges],
  );
  const topics = useMemo(
    () => Array.from(new Set(initialChallenges.map((item) => item.topic))),
    [initialChallenges],
  );
  const filtered = challenges.filter(
    (challenge) =>
      (technology === "all" || challenge.technology === technology) &&
      (difficulty === "all" || challenge.difficulty === difficulty) &&
      (topic === "all" || challenge.topic === topic),
  );

  const selectClass =
    "w-full cursor-pointer rounded-xl border border-slate-700/60 bg-slate-950/70 px-4 py-3.5 text-sm text-slate-200 outline-none transition hover:border-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10";

  return (
    <>
      <section className="mb-10 rounded-3xl border border-slate-700/50 bg-slate-800/50 p-5 shadow-xl shadow-black/10 backdrop-blur-xl sm:p-7">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-black text-white sm:text-xl">پیدا کردن چالش مناسب</h2>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">فهرست را بر اساس مهارت و سطح خودتان مرتب کنید.</p>
          </div>
          <span className="shrink-0 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1.5 text-xs font-bold text-cyan-300">
            {filtered.length.toLocaleString("fa-IR")} نتیجه
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
        <label className="grid gap-2 text-xs font-medium text-slate-400">
          تکنولوژی
          <select className={selectClass} value={technology} onChange={(event) => setTechnology(event.target.value)}>
            <option value="all">همه تکنولوژی‌ها</option>
            {technologies.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label className="grid gap-2 text-xs font-medium text-slate-400">
          سطح دشواری
          <select className={selectClass} value={difficulty} onChange={(event) => setDifficulty(event.target.value)}>
            <option value="all">همه سطح‌ها</option>
            <option value="beginner">مقدماتی</option>
            <option value="intermediate">متوسط</option>
            <option value="advanced">پیشرفته</option>
          </select>
        </label>
        <label className="grid gap-2 text-xs font-medium text-slate-400">
          موضوع
          <select className={selectClass} value={topic} onChange={(event) => setTopic(event.target.value)}>
            <option value="all">همه موضوع‌ها</option>
            {topics.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        </div>
      </section>
      {personalStatusUnavailable && (
        <p className="mb-6 rounded-xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
          سؤال‌ها در دسترس‌اند، اما وضعیت شخصی شما فعلاً بارگذاری نشد.
        </p>
      )}
      {filtered.length ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              answerStatus={challenge.answerStatus}
              totalAnswers={challenge.totalAnswers}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/30 py-20 text-center text-slate-400">
          سؤالی با این فیلترها پیدا نشد.
        </div>
      )}
    </>
  );
}
