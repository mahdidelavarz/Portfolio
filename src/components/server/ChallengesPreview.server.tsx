import Link from "next/link";
import { getPublishedPublicChallenges } from "@/lib/challenges/repository";

const PREVIEW_COPY: Record<
  string,
  { title: string; description: string }
> = {
  "react-use-effect-dependency-001": {
    title: "Which Dependency Is Correct for This Effect?",
    description:
      "Choose the dependency that keeps an effect synchronized without stale values or unnecessary runs.",
  },
  "javascript-event-loop-microtask-001": {
    title: "What Is the Event Loop Output Order?",
    description:
      "Predict how synchronous code, microtasks, and timers are ordered.",
  },
  "javascript-scope-shadowing-001": {
    title: "What Does This Code Output?",
    description:
      "Reason about lexical scope and variable shadowing in a short JavaScript snippet.",
  },
};

const DIFFICULTY_LABELS = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
} as const;

const CAPABILITIES = [
  "Detailed explanations",
  "Progress tracking",
  "JavaScript & React topics",
] as const;

export default function ChallengesPreview() {
  const challenges = getPublishedPublicChallenges().slice(0, 3);

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-950 via-gray-950 to-blue-950 py-12 sm:py-20"
      aria-labelledby="frontend-challenges-title"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto mb-10 max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-3 rounded-full px-4 py-2">
            <div className="h-[1.5px] w-18 animate-pulse bg-gradient-to-l from-transparent via-cyan-500 to-transparent" />
            <span className="text-sm font-medium uppercase tracking-wider text-cyan-500">
              Built Product
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
          <p className="text-base leading-7 text-slate-400 md:text-lg">
            Practical JavaScript and React challenges based on real frontend edge
            cases, with detailed explanations and progress tracking.
          </p>
        </header>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          {challenges.map((challenge) => {
            const preview = PREVIEW_COPY[challenge.slug];

            return (
              <article
                key={challenge.slug}
                className="group flex flex-col rounded-2xl border border-slate-700/50 bg-slate-800/40 p-5 text-left backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 sm:p-6"
              >
                <div className="mb-5 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full border border-cyan-500/25 bg-cyan-500/10 px-2.5 py-1 font-medium text-cyan-300">
                    {challenge.technology}
                  </span>
                  <span className="rounded-full border border-blue-500/25 bg-blue-500/10 px-2.5 py-1 font-medium text-blue-300">
                    {challenge.topic}
                  </span>
                  <span className="rounded-full border border-slate-700 bg-slate-900/70 px-2.5 py-1 text-slate-400">
                    {DIFFICULTY_LABELS[challenge.difficulty]}
                  </span>
                </div>

                <h3 className="mb-3 text-lg font-bold leading-7 text-white transition-colors group-hover:text-cyan-200 sm:text-xl">
                  {preview?.title ??
                    `${challenge.technology}: ${challenge.topic} Challenge`}
                </h3>
                <p className="text-sm leading-6 text-slate-400">
                  {preview?.description ??
                    `A practical ${challenge.topic.toLowerCase()} challenge based on a real frontend scenario.`}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2.5">
          {CAPABILITIES.map((capability) => (
            <span
              key={capability}
              className="rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-slate-300 sm:text-sm"
            >
              {capability}
            </span>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            href="/challenges"
            className="group rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-3.5 font-semibold text-white transition hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/30"
          >
            <span className="flex items-center gap-3">
              Explore Challenges
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
