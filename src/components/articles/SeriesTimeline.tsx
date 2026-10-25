import Link from "next/link";
import { getArticleMessages, getArticlePath } from "@/lib/articles/locale";
import { getSeriesEpisodes } from "@/lib/articles/repository";
import { seriesPlan } from "@/lib/articles/series";
import type { ArticleLanguage } from "@/lib/articles/types";

export default function SeriesTimeline({
  language,
}: {
  language: ArticleLanguage;
}) {
  const messages = getArticleMessages(language);
  const episodes = getSeriesEpisodes(language);
  // An empty series would only be a list of promises, so it stays hidden.
  if (episodes.length === 0) return null;

  return (
    <section
      className="mt-14 border-t border-slate-800/80 pt-10"
      aria-labelledby={`${language}-series-title`}
    >
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
        {messages.seriesEyebrow}
      </p>
      <h2
        id={`${language}-series-title`}
        className="mt-3 text-3xl font-bold text-white"
      >
        {messages.seriesTitle}
      </h2>
      <p className="mt-4 max-w-3xl leading-8 text-slate-400">
        {messages.seriesIntroduction}
      </p>

      <ol className="relative mt-10 border-s border-slate-700/70">
        {seriesPlan[language].map((entry) => {
          const episode = episodes.find(
            (candidate) => candidate.episode!.number === entry.number,
          );
          return (
            <li key={entry.number} className="relative mb-8 ps-8 last:mb-0">
              <span
                aria-hidden="true"
                className={`absolute -start-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 ${
                  episode
                    ? "border-cyan-300 bg-cyan-400"
                    : "border-slate-600 bg-slate-900"
                }`}
              />
              <p className="text-xs font-medium text-slate-500">
                {messages.episode}{" "}
                {entry.number.toLocaleString(
                  language === "fa" ? "fa-IR" : "en",
                )}{" "}
                · {entry.period}
              </p>
              {episode ? (
                <Link
                  href={getArticlePath(language, episode.slug)}
                  className="mt-1 inline-block rounded-sm text-lg font-semibold text-white transition hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                  {episode.title}
                </Link>
              ) : (
                <p className="mt-1 text-lg font-semibold text-slate-500">
                  {entry.title}{" "}
                  <span className="ms-2 text-xs font-normal text-slate-600">
                    {messages.comingSoon}
                  </span>
                </p>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
