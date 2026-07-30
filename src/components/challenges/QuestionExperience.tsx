"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { PublicChallenge } from "@/data/challenge-validator";
import CodeBlock from "./CodeBlock";
import DisplayNamePrompt from "./DisplayNamePrompt";
import { LucideArrowRight } from "@/icons/icons";

type Adjacent = { slug: string; title: string } | null;
type AnswerResult = {
  answer: {
    selectedOptionId: string;
    correctOptionId: string;
    isCorrect: boolean;
    answeredAt: string;
  };
  explanation: {
    shortAnswer: string;
    steps: string[];
    correctedCode: string | null;
    takeaway: string;
  };
  questionStats: {
    totalAnswers: number;
    optionDistribution: Array<{ optionId: string; count: number; percentage: number }>;
  };
  repeated?: boolean;
};

type DetailResponse = {
  existingAnswer: AnswerResult | null;
  adjacent: { previous: Adjacent; next: Adjacent };
  visitor: { displayName: string | null; shouldRequestDisplayName: boolean };
};

const difficultyLabel = {
  beginner: "مقدماتی",
  intermediate: "متوسط",
  advanced: "پیشرفته",
};

export default function QuestionExperience({
  question,
  initialAdjacent,
}: {
  question: PublicChallenge;
  initialAdjacent: { previous: Adjacent; next: Adjacent };
}) {
  const [selectedOptionId, setSelectedOptionId] = useState("");
  const [result, setResult] = useState<AnswerResult | null>(null);
  const [adjacent, setAdjacent] = useState(initialAdjacent);
  const [requestDisplayName, setRequestDisplayName] = useState(false);
  const [loadingExisting, setLoadingExisting] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const startedAt = useRef(Date.now());

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/challenges/${question.slug}`, {
      signal: controller.signal,
      cache: "no-store",
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error?.message ?? "بازیابی پاسخ ممکن نشد.");
        return data as DetailResponse;
      })
      .then((data) => {
        setAdjacent(data.adjacent);
        setRequestDisplayName(data.visitor.shouldRequestDisplayName);
        if (data.existingAnswer) {
          setResult(data.existingAnswer);
          setSelectedOptionId(data.existingAnswer.answer.selectedOptionId);
        }
      })
      .catch((loadError) => {
        if (loadError instanceof DOMException && loadError.name === "AbortError") return;
        setError("سؤال قابل مشاهده است، اما اتصال به سابقه پاسخ فعلاً برقرار نشد.");
      })
      .finally(() => setLoadingExisting(false));
    return () => controller.abort();
  }, [question.slug]);

  async function submitAnswer(event: React.FormEvent) {
    event.preventDefault();
    if (!selectedOptionId || result) return;
    setSubmitting(true);
    setError("");

    const source =
      new URLSearchParams(window.location.search).get("utm_source") === "linkedin"
        ? "linkedin"
        : "direct";

    try {
      const response = await fetch(`/api/challenges/${question.slug}/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedOptionId,
          responseTimeMs: Date.now() - startedAt.current,
          source,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message ?? "ثبت پاسخ انجام نشد.");
      setResult(data as AnswerResult);
      setSelectedOptionId(data.answer.selectedOptionId);
      setRequestDisplayName(data.visitor.shouldRequestDisplayName);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "ثبت پاسخ انجام نشد.");
    } finally {
      setSubmitting(false);
    }
  }

  const distribution = new Map(
    result?.questionStats.optionDistribution.map((item) => [item.optionId, item.percentage]) ?? [],
  );

  return (
    <article className="mx-auto max-w-5xl">
      <Link href="/challenges" className="inline-flex items-center gap-2 rounded-full border border-slate-700/50 bg-slate-800/40 px-4 py-2 text-sm text-slate-400 transition hover:border-cyan-400/30 hover:text-cyan-300">
        <span aria-hidden="true"><LucideArrowRight width={20}/></span> بازگشت به همه چالش‌ها
      </Link>

      <header className="mb-12">
        <div className="mb-8 grid grid-cols-2 gap-3 border-b border-slate-800 py-5 text-xs sm:flex sm:flex-wrap sm:items-center sm:border-0 sm:py-0">
          <span className="rounded-xl border border-cyan-500/25 bg-cyan-500/10 px-3 py-2.5 text-center text-cyan-300 sm:rounded-full sm:py-1.5">{question.technology}</span>
          <span className="rounded-xl border border-blue-500/25 bg-blue-500/10 px-3 py-2.5 text-center text-blue-300 sm:rounded-full sm:py-1.5">{question.topic}</span>
          <span className="rounded-xl border border-slate-700 bg-slate-800/70 px-3 py-2.5 text-center text-slate-300 sm:rounded-full sm:py-1.5">{difficultyLabel[question.difficulty]}</span>
          {question.estimatedMinutes && <span className="flex items-center justify-center rounded-xl border border-slate-800 px-3 py-2.5 text-center text-slate-500 sm:border-0 sm:px-2 sm:py-1.5">حدود {question.estimatedMinutes} دقیقه</span>}
        </div>

        <div className="text-right">
        <h1 className="mb-6 text-xl font-black leading-[1.7] text-white sm:text-2xl lg:text-3xl">
          <span className="ml-2 text-cyan-300">سؤال:</span>
          {question.title}
        </h1>
        <div className="border-r-2 border-slate-700 pr-4 sm:pr-5">
          <p className="text-base leading-8 text-slate-400 sm:text-lg">
            <span className="ml-2 font-bold text-slate-200">توضیح:</span>
            {question.description}
          </p>
        </div>
        </div>
      </header>

      <CodeBlock code={question.code} language={question.codeLanguage} />

      <form onSubmit={submitAnswer} className="mt-8 rounded-3xl border border-slate-700/50 bg-slate-800/50 p-5 shadow-xl shadow-black/10 backdrop-blur-xl sm:p-8" aria-busy={submitting || loadingExisting}>
        <fieldset disabled={Boolean(result) || submitting || loadingExisting}>
          <legend className="mb-6 text-xl font-black text-white sm:text-2xl">پاسخ شما کدام است؟</legend>
          <div className="grid gap-3">
            {question.options.map((option) => {
              const isSelected = option.id === selectedOptionId;
              const isCorrect = result?.answer.correctOptionId === option.id;
              const isWrongSelection = Boolean(result && isSelected && !isCorrect);
              const visualClass = isCorrect
                ? "border-emerald-400/60 bg-emerald-400/10"
                : isWrongSelection
                  ? "border-rose-400/60 bg-rose-400/10"
                  : isSelected
                    ? "border-cyan-400 bg-cyan-400/10"
                    : "border-slate-700/60 bg-slate-950/50 hover:border-cyan-400/30 hover:bg-slate-900/70";

              return (
                <label key={option.id} className={`relative flex cursor-pointer items-start gap-4 rounded-2xl border p-4 transition duration-200 sm:p-5 ${visualClass} ${result ? "cursor-default" : ""}`}>
                  <input
                    type="radio"
                    name="challenge-option"
                    value={option.id}
                    checked={isSelected}
                    onChange={() => setSelectedOptionId(option.id)}
                    className="mt-1 size-4 accent-cyan-400"
                  />
                  <span dir="ltr" className="grid size-8 shrink-0 place-items-center rounded-lg bg-white/5 font-mono font-bold text-cyan-300">{option.label}</span>
                  <span className="min-w-0 flex-1 pt-1 text-sm leading-7 text-slate-200 sm:text-base">{option.content}</span>
                  {result && (
                    <span className={`shrink-0 pt-1 text-xs font-bold ${isCorrect ? "text-emerald-300" : isWrongSelection ? "text-rose-300" : "text-slate-500"}`}>
                      {isCorrect ? "پاسخ درست ✓" : isWrongSelection ? "انتخاب شما ✕" : `${distribution.get(option.id) ?? 0}٪`}
                    </span>
                  )}
                  {result && (isCorrect || isWrongSelection) && (
                    <span className="absolute bottom-2 left-4 text-[11px] text-slate-500">{distribution.get(option.id) ?? 0}٪ کاربران</span>
                  )}
                </label>
              );
            })}
          </div>
        </fieldset>

        {!result && (
          <button
            type="submit"
            disabled={!selectedOptionId || submitting || loadingExisting}
            className="mt-6 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-4 font-black text-white shadow-lg shadow-cyan-500/10 transition hover:-translate-y-0.5 hover:shadow-cyan-500/25 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
          >
            {loadingExisting ? "در حال بررسی پاسخ قبلی…" : submitting ? "در حال ثبت پاسخ…" : "ثبت پاسخ نهایی"}
          </button>
        )}
        <p className="mt-3 text-xs text-slate-500">امتیاز فقط بر اساس اولین پاسخ ثبت می‌شود.</p>
        {error && <p role="alert" className="mt-4 rounded-xl border border-rose-400/20 bg-rose-400/10 p-4 text-sm text-rose-200">{error}</p>}
      </form>

      {result && (
        <section aria-live="polite" className="mt-10 space-y-6">
          <div className={`rounded-3xl border p-6 shadow-xl shadow-black/10 sm:p-8 ${result.answer.isCorrect ? "border-emerald-400/30 bg-emerald-400/10" : "border-rose-400/30 bg-rose-400/10"}`}>
            <p className={`mb-2 text-sm font-bold ${result.answer.isCorrect ? "text-emerald-300" : "text-rose-300"}`}>
              {result.answer.isCorrect ? "آفرین، پاسخ درست است." : "این بار پاسخ درست نبود."}
            </p>
            <p className="text-lg font-black leading-8 text-white">{result.explanation.shortAnswer}</p>
            {result.repeated && <p className="mt-3 text-xs text-slate-400">نتیجه اولین پاسخ ثبت‌شده نمایش داده شده است.</p>}
          </div>

          <div className="rounded-3xl border border-slate-700/50 bg-slate-800/50 p-6 shadow-xl shadow-black/10 backdrop-blur-xl sm:p-8">
            <h2 className="mb-5 text-2xl font-black text-white">چرا؟</h2>
            <ol className="space-y-4">
              {result.explanation.steps.map((step, index) => (
                <li key={step} className="flex gap-4 text-sm leading-7 text-slate-300 sm:text-base">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-cyan-500/15 text-xs font-bold text-cyan-300">{(index + 1).toLocaleString("fa-IR")}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {result.explanation.correctedCode && (
            <div>
              <h2 className="mb-4 text-xl font-black text-white">نسخه اصلاح‌شده</h2>
              <CodeBlock code={result.explanation.correctedCode} language={question.codeLanguage} />
            </div>
          )}

          <div className="rounded-3xl border border-blue-400/20 bg-blue-400/10 p-6 sm:p-8">
            <h2 className="mb-2 text-sm font-bold text-blue-300">نکته کلیدی</h2>
            <p className="leading-8 text-slate-200">{result.explanation.takeaway}</p>
          </div>
        </section>
      )}

      {result && requestDisplayName && <DisplayNamePrompt onSaved={() => setRequestDisplayName(false)} />}

      <nav className="mt-12 grid gap-4 border-t border-slate-700/50 pt-8 sm:grid-cols-2" aria-label="سؤال‌های قبلی و بعدی">
        {adjacent.previous ? (
          <Link href={`/challenges/${adjacent.previous.slug}`} className="rounded-2xl border border-slate-700/50 bg-slate-800/50 p-5 transition hover:-translate-y-0.5 hover:border-cyan-400/30">
            <span className="mb-1 block text-xs text-slate-500">سؤال قبلی</span>
            <span className="text-sm font-bold text-white">{adjacent.previous.title}</span>
          </Link>
        ) : <span />}
        {adjacent.next && (
          <Link href={`/challenges/${adjacent.next.slug}`} className="rounded-2xl border border-slate-700/50 bg-slate-800/50 p-5 text-left transition hover:-translate-y-0.5 hover:border-cyan-400/30">
            <span className="mb-1 block text-xs text-slate-500">سؤال بعدی</span>
            <span className="text-sm font-bold text-white">{adjacent.next.title}</span>
          </Link>
        )}
      </nav>

      {question.linkedinPostUrl && (
        <a href={question.linkedinPostUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block text-sm text-cyan-300 hover:underline">
          بازگشت به پست LinkedIn
        </a>
      )}
    </article>
  );
}
