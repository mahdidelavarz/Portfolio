import Link from "next/link";
import LabWaterfallPreview from "@/components/client/LabWaterfallPreview";
import { getWaterfallPreview } from "@/lib/lab/repository";

export default function ChallengesPreview() {
  const preview = getWaterfallPreview();

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
              Performance Lab
            </span>
          </h2>
        </header>

        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-12">
          <div className="text-left">
            <p className="mb-8 text-lg leading-8 text-slate-300 md:text-xl md:leading-9">
              A simulated online store with real performance tickets: you find
              what makes it slow, change the code, and watch the numbers drop.
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link
                href="/challenges/lab"
                className="group rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-3.5 font-semibold text-white transition hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/30"
              >
                <span className="flex items-center gap-3">
                  Open the Lab
                  <span
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
              <Link
                href="/challenges/quiz"
                className="text-sm text-slate-400 underline-offset-4 transition hover:text-cyan-300 hover:underline"
              >
                or try the JavaScript &amp; React quiz
              </Link>
            </div>
            <p className="mt-5 text-xs text-slate-500">
              {preview ? `${preview.tickets} tickets open · ` : ""}Free, in Persian, no sign-up.
            </p>
          </div>

          {preview && (
            <LabWaterfallPreview
              before={preview.before}
              after={preview.after}
              targetMs={preview.targetMs}
            />
          )}
        </div>
      </div>
    </section>
  );
}
