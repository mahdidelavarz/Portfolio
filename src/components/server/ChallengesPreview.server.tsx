import Link from "next/link";
import { getPublishedPublicChallenges } from "@/lib/challenges/repository";

const previewCopy: Record<string, { title: string; description: string }> = {
  "javascript-scope-shadowing-001": {
    title: "Can You Spot the Scope Trap?",
    description:
      "Test your understanding of shadowing and JavaScript's Temporal Dead Zone.",
  },
  "javascript-event-loop-microtask-001": {
    title: "Put the Event Loop in Order",
    description:
      "Work out how synchronous code, microtasks, and timers reach the console.",
  },
  "react-use-effect-dependency-001": {
    title: "Fix the Effect Dependency",
    description:
      "Choose the dependency that keeps a React effect in sync with its data.",
  },
};

export default function ChallengesPreview() {
  const challenges = getPublishedPublicChallenges().slice(0, 3);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-950 via-gray-950 to-blue-950 py-12 sm:py-20">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 inline-flex items-center gap-3 rounded-full px-4 py-2">
          <div className="h-[1.5px] w-18 animate-pulse bg-gradient-to-l from-transparent via-cyan-500 to-transparent" />
          <span className="text-sm font-medium uppercase tracking-wider text-cyan-500">
            Challenges
          </span>
          <div className="h-[1.5px] w-18 animate-pulse bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        </div>

        <h2
          id="frontend-challenges-title"
          className="mb-4 text-4xl font-bold sm:text-5xl lg:text-6xl"
        >
          <span className="bg-gradient-to-r from-white via-sky-500 to-white bg-clip-text text-transparent">
            Frontend Challenges
          </span>
        </h2>
        <p className="mx-auto max-w-3xl px-4 text-base text-slate-500 md:text-lg">
          Sharpen your JavaScript and React skills with focused, practical questions.
        </p>

        <div className="mt-16 grid gap-6 text-left md:grid-cols-3">
          {challenges.map((challenge, index) => {
            const copy = previewCopy[challenge.slug] ?? {
              title: `${challenge.technology}: ${challenge.topic}`,
              description: `A quick ${challenge.technology} challenge focused on ${challenge.topic}.`,
            };

            return (
              <article
                key={challenge.id}
                className="group relative flex min-h-72 flex-col overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-800/50 p-6 shadow-xl backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-cyan-950/30 sm:p-8"
              >
                <div className="mb-8 flex items-center justify-between">
                  <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
                    {challenge.technology}
                  </span>
                  <span className="text-sm font-medium text-slate-600">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mb-4 text-2xl font-bold leading-tight text-white transition group-hover:text-cyan-200">
                  {copy.title}
                </h3>
                <p className="mb-8 text-sm leading-7 text-slate-400">
                  {copy.description}
                </p>
                <div className="mt-auto flex items-center justify-between border-t border-slate-700/50 pt-5 text-sm">
                  <span className="text-slate-500">{challenge.topic}</span>
                  <span className="text-slate-400">
                    {challenge.estimatedMinutes ?? 3} min
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/challenges"
            className="group rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 font-semibold text-white transition hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/30"
          >
            <span className="flex items-center gap-3">
              View All Challenges
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
