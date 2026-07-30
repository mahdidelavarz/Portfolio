import Link from "next/link";

export default function ChallengesPreview() {
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

        <div className="mx-auto mt-16 grid max-w-5xl gap-10 text-left md:grid-cols-[1.2fr_0.8fr] md:items-center md:gap-16">
          <div>
            <span className="mb-4 block text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Learn by thinking
            </span>
            <h3 className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl">
              Real frontend situations, turned into practical learning.
            </h3>
            <div className="space-y-5 text-base leading-8 text-slate-400 sm:text-lg">
              <p>
                Frontend Challenges is a focused learning space for developers who
                want to understand how JavaScript and React behave in real projects—not
                just memorize syntax or repeat textbook examples.
              </p>
              <p>
                The questions are inspired by real development experience: bugs,
                confusing runtime behavior, code-review discussions, architectural
                decisions, and edge cases that frontend developers regularly encounter
                while building production applications.
              </p>
              <p>
                Each challenge gives you a focused code scenario, asks you to predict
                or debug its behavior, and then reveals a clear step-by-step explanation,
                corrected code when needed, and the key idea you can apply in future work.
              </p>
            </div>
          </div>

          <div className="border-l border-slate-700/60 pl-6 sm:pl-8">
            <p className="mb-8 text-sm font-semibold uppercase tracking-widest text-slate-500">
              What you will practice
            </p>
            <div className="space-y-8">
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <span className="size-2 shrink-0 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400/50" />
                  <h4 className="text-lg font-bold text-white">Practice with purpose</h4>
                </div>
                <p className="pl-5 text-sm leading-7 text-slate-400">
                  Explore JavaScript behavior, React hooks, debugging, code output,
                  performance, and common frontend pitfalls through concise scenarios.
                </p>
              </div>

              <div>
                <div className="mb-3 flex items-center gap-3">
                  <span className="size-2 shrink-0 rounded-full bg-blue-400 shadow-sm shadow-blue-400/50" />
                  <h4 className="text-lg font-bold text-white">Understand the answer</h4>
                </div>
                <p className="pl-5 text-sm leading-7 text-slate-400">
                  Go beyond right or wrong with a short answer, a step-by-step breakdown,
                  corrected code, and a practical takeaway for future projects.
                </p>
              </div>

              <div>
                <div className="mb-3 flex items-center gap-3">
                  <span className="size-2 shrink-0 rounded-full bg-purple-400 shadow-sm shadow-purple-400/50" />
                  <h4 className="text-lg font-bold text-white">Learn from real experience</h4>
                </div>
                <p className="pl-5 text-sm leading-7 text-slate-400">
                  Practice the subtle behaviors, bugs, and decisions that appear in real
                  frontend work but are often missing from tutorials.
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="mx-auto mt-24 max-w-6xl text-left" aria-labelledby="progress-showcase-title">
          <div className="mb-8 max-w-3xl">
            <span className="mb-3 block text-sm font-semibold uppercase tracking-widest text-cyan-400">My Progress</span>
            <h3 id="progress-showcase-title" className="mb-4 text-3xl font-bold text-white sm:text-4xl">Your learning history, always visible.</h3>
            <p className="leading-7 text-slate-400">
              Progress is saved in your browser automatically. Review completed challenges,
              accuracy, monthly performance, and every correct or incorrect attempt without
              creating an account.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-700/50 bg-slate-800/50 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8">
            <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {[
                ["Display name", "Alex Morgan"],
                ["Total answers", "18"],
                ["Correct answers", "15"],
                ["Overall accuracy", "83%"],
              ].map(([label, value], index) => (
                <div key={label} className="rounded-2xl border border-slate-700/50 bg-slate-950/45 p-4 sm:p-5">
                  <p className="mb-2 text-xs text-slate-500">{label}</p>
                  <p className={`text-lg font-bold sm:text-xl ${index === 2 ? "text-emerald-300" : "text-white"}`}>{value}</p>
                </div>
              ))}
            </div>
            <div className="mb-6 rounded-2xl border border-purple-400/15 bg-purple-400/5 p-5">
              <p className="mb-4 font-semibold text-white">This month</p>
              <div className="grid grid-cols-4 gap-3 text-center">
                {[["Answers", "8"], ["Correct", "7"], ["Accuracy", "88%"], ["Rank", "#4"]].map(([label, value]) => (
                  <div key={label}><strong className="block text-xl text-white sm:text-2xl">{value}</strong><span className="mt-1 block text-[10px] text-slate-500 sm:text-xs">{label}</span></div>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              {[
                ["JavaScript", "Event Loop", "Correct", "text-emerald-300 border-emerald-400/20 bg-emerald-400/10"],
                ["React", "Effect Dependencies", "Correct", "text-emerald-300 border-emerald-400/20 bg-emerald-400/10"],
                ["JavaScript", "Scope & Shadowing", "Review", "text-rose-300 border-rose-400/20 bg-rose-400/10"],
              ].map(([technology, topic, status, style]) => (
                <div key={topic} className="flex items-center justify-between gap-4 rounded-2xl border border-slate-700/50 bg-slate-950/35 p-4">
                  <div><p className="text-xs text-slate-500">{technology}</p><p className="mt-1 font-semibold text-white">{topic}</p></div>
                  <span className={`rounded-lg border px-3 py-1.5 text-xs font-semibold ${style}`}>{status}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-24 max-w-6xl text-left" aria-labelledby="leaderboard-showcase-title">
          <div className="mb-8 max-w-3xl">
            <span className="mb-3 block text-sm font-semibold uppercase tracking-widest text-purple-400">Leaderboard</span>
            <h3 id="leaderboard-showcase-title" className="mb-4 text-3xl font-bold text-white sm:text-4xl">A friendly reason to keep improving.</h3>
            <p className="leading-7 text-slate-400">
              Choose a display name and join the monthly ranking. Positions are based on
              correct answers, accuracy, and when the score was achieved—making progress
              visible without turning learning into pressure.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-800/50 shadow-2xl shadow-black/20 backdrop-blur-xl">
            <div className="grid grid-cols-[3rem_1fr_4rem_4rem] border-b border-slate-700/50 bg-white/[0.025] px-4 py-4 text-xs text-slate-500 sm:grid-cols-[5rem_1fr_7rem_7rem] sm:px-7">
              <span>Rank</span><span>Developer</span><span className="text-center">Correct</span><span className="text-center">Accuracy</span>
            </div>
            {[
              ["#1", "Sara K.", "18", "95%"],
              ["#2", "Arman Dev", "17", "89%"],
              ["#3", "Nima R.", "16", "89%"],
              ["#4", "Alex Morgan", "15", "83%"],
            ].map(([rank, name, correct, accuracy], index) => (
              <div key={rank} className={`grid grid-cols-[3rem_1fr_4rem_4rem] items-center px-4 py-5 text-sm sm:grid-cols-[5rem_1fr_7rem_7rem] sm:px-7 ${index < 3 ? "border-b border-slate-700/40" : "bg-cyan-500/[0.04]"}`}>
                <span className="font-mono font-bold text-cyan-300">{rank}</span><span className="truncate font-semibold text-white">{name}</span><span className="text-center text-emerald-300">{correct}</span><span className="text-center text-slate-300">{accuracy}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-16 flex justify-center">
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
