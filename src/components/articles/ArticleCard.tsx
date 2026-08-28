import Link from "next/link";
import type { ArticleMetadata } from "@/lib/articles/types";
import { formatArticleDate, getArticleMessages, getArticlePath } from "@/lib/articles/locale";

type ArticleCardProps = {
  article: ArticleMetadata;
  compact?: boolean;
};

export default function ArticleCard({ article, compact = false }: ArticleCardProps) {
  const messages = getArticleMessages(article.language);
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900/55 p-6 text-left transition duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-slate-900/80 focus-within:border-cyan-300 sm:p-7">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="mb-5 flex flex-wrap items-center gap-2 text-xs font-medium">
        {article.project && (
          <span className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-2.5 py-1 text-cyan-300">
            {article.project}
          </span>
        )}
        <span className="text-slate-500">{formatArticleDate(article.publishedAt, article.language)}</span>
        <span aria-hidden="true" className="text-slate-700">•</span>
        <span className="text-slate-500">{article.readingTime}</span>
      </div>

      <h3 className={`${compact ? "text-xl" : "text-2xl"} mb-3 font-bold leading-snug text-white transition-colors group-hover:text-cyan-100`}>
        <Link
          href={getArticlePath(article.language, article.slug)}
          className="rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950"
        >
          <span className="absolute inset-0" aria-hidden="true" />
          {article.title}
        </Link>
      </h3>

      <p className="mb-6 flex-1 text-sm leading-7 text-slate-400 sm:text-base">
        {article.summary}
      </p>

      <div className="flex flex-wrap gap-2" aria-label={messages.tags}>
        {article.tags.slice(0, compact ? 2 : 3).map((tag) => (
          <span key={tag} className="rounded-md bg-slate-800/80 px-2.5 py-1 text-xs text-slate-400">
            {tag}
          </span>
        ))}
      </div>
      <span className="mt-5 text-sm font-semibold text-cyan-300" aria-hidden="true">
        {messages.readArticle} <span className="inline-block rtl:-scale-x-100">→</span>
      </span>
    </article>
  );
}
