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
    "rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-slate-200 outline-none focus:border-cyan-400";

  return (
    <>
      <div className="mb-8 grid gap-3 rounded-2xl border border-white/10 bg-slate-900/50 p-4 sm:grid-cols-3">
        <label className="grid gap-2 text-xs text-slate-400">
          تکنولوژی
          <select className={selectClass} value={technology} onChange={(event) => setTechnology(event.target.value)}>
            <option value="all">همه تکنولوژی‌ها</option>
            {technologies.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label className="grid gap-2 text-xs text-slate-400">
          سطح دشواری
          <select className={selectClass} value={difficulty} onChange={(event) => setDifficulty(event.target.value)}>
            <option value="all">همه سطح‌ها</option>
            <option value="beginner">مقدماتی</option>
            <option value="intermediate">متوسط</option>
            <option value="advanced">پیشرفته</option>
          </select>
        </label>
        <label className="grid gap-2 text-xs text-slate-400">
          موضوع
          <select className={selectClass} value={topic} onChange={(event) => setTopic(event.target.value)}>
            <option value="all">همه موضوع‌ها</option>
            {topics.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
      </div>
      {personalStatusUnavailable && (
        <p className="mb-6 rounded-xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
          سؤال‌ها در دسترس‌اند، اما وضعیت شخصی شما فعلاً بارگذاری نشد.
        </p>
      )}
      {filtered.length ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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
        <div className="rounded-2xl border border-dashed border-slate-700 py-16 text-center text-slate-400">
          سؤالی با این فیلترها پیدا نشد.
        </div>
      )}
    </>
  );
}
