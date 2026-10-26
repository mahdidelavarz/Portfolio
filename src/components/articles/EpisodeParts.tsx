import Link from "next/link";
import { getArticleMessages, getArticlePath } from "@/lib/articles/locale";
import { getAdjacentEpisodes } from "@/lib/articles/repository";
import { seriesPlan } from "@/lib/articles/series";
import type { Article } from "@/lib/articles/types";

export function EpisodeBadge({ article }: { article: Article }) {
  if (!article.episode) return null;
  const messages = getArticleMessages(article.language);
  const locale = article.language === "fa" ? "fa-IR" : "en";
  return (
    <span className="rounded-full border border-violet-400/25 bg-violet-400/10 px-3 py-1 text-violet-300">
      {messages.episode} {article.episode.number.toLocaleString(locale)}{" "}
      {messages.of} {seriesPlan[article.language].length.toLocaleString(locale)}
    </span>
  );
}

export function EpisodeRecap({ article }: { article: Article }) {
  if (!article.episode?.recap) return null;
  const messages = getArticleMessages(article.language);
  return (
    <aside className="episode-box">
      <strong>{messages.soFar}</strong>
      <p>{article.episode.recap}</p>
    </aside>
  );
}

export function EpisodeLessons({ article }: { article: Article }) {
  if (!article.episode || article.episode.lessons.length === 0) return null;
  const messages = getArticleMessages(article.language);
  return (
    <aside className="episode-box episode-box-lessons">
      <strong>{messages.whatILearned}</strong>
      <ul>
        {article.episode.lessons.map((lesson) => (
          <li key={lesson}>{lesson}</li>
        ))}
      </ul>
    </aside>
  );
}

export function EpisodeNavigation({ article }: { article: Article }) {
  if (!article.episode) return null;
  const messages = getArticleMessages(article.language);
  const { previous, next } = getAdjacentEpisodes(article);
  const upcoming = seriesPlan[article.language].find(
    (entry) => entry.number === article.episode!.number + 1,
  );

  return (
    <nav
      className="mx-auto grid max-w-3xl gap-4 px-4 pb-16 sm:grid-cols-2 sm:px-6"
      aria-label={messages.seriesTitle}
    >
      {previous ? (
        <Link
          href={getArticlePath(article.language, previous.slug)}
          className="episode-nav-card"
        >
          <span>{messages.previousEpisode}</span>
          <strong>{previous.title}</strong>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={getArticlePath(article.language, next.slug)}
          className="episode-nav-card sm:text-end"
        >
          <span>{messages.nextEpisode}</span>
          <strong>{next.title}</strong>
        </Link>
      ) : (
        upcoming && (
          <div className="episode-nav-card episode-nav-card-upcoming sm:text-end">
            <span>
              {messages.nextEpisode} · {messages.comingSoon}
            </span>
            <strong>{upcoming.title}</strong>
          </div>
        )
      )}
    </nav>
  );
}
