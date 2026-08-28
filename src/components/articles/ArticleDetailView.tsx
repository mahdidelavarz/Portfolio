import Link from "next/link";
import ArticleCard from "./ArticleCard";
import ArticlesShell from "./ArticlesShell";
import { formatArticleDate, getArticleMessages, getArticlesPath } from "@/lib/articles/locale";
import { getAlternateLanguageVersion, getRelatedArticles } from "@/lib/articles/repository";
import type { Article } from "@/lib/articles/types";

export default function ArticleDetailView({ article }: { article: Article }) {
  const messages = getArticleMessages(article.language);
  const related = getRelatedArticles(article);
  const alternateArticle = getAlternateLanguageVersion(article);

  return (
    <ArticlesShell language={article.language} alternateArticle={alternateArticle}>
      <article>
        <header className=" border-b border-slate-800/80"><div className="mx-auto max-w-8xl flex flex-col items-center px-4 py-12 sm:px-6 sm:py-20">
          <Link href={getArticlesPath(article.language)} className="inline-flex w-full px-60 rounded-lg text-sm font-semibold text-cyan-300 transition hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950"><span className="rtl:-scale-x-100" aria-hidden="true">←</span>&nbsp; {messages.backToArticles}</Link>
          <div className="mt-9 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            {article.project && <span className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-cyan-300">{article.project}</span>}
            <span><span className="sr-only">{messages.published}: </span>{formatArticleDate(article.publishedAt, article.language)}</span><span aria-hidden="true">•</span><span><span className="sr-only">{messages.readingTime}: </span>{article.readingTime}</span>
          </div>
          <h1 className="mt-7 text-3xl font-black leading-[1.18] text-white sm:text-5xl">{article.title}</h1>
          <p className="mt-7 text-lg leading-8 text-slate-300 sm:text-xl sm:leading-9">{article.summary}</p>
          <div className="mt-8 flex flex-wrap gap-2" aria-label={messages.tags}>{article.tags.map((tag) => <span key={tag} className="rounded-md bg-slate-800 px-3 py-1.5 text-xs text-slate-400">{tag}</span>)}</div>
        </div></header>
        <div className="article-content mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">{article.content}</div>
      </article>
      {related.length > 0 && <section className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6" aria-labelledby={`${article.language}-related-articles-title`}><h2 id={`${article.language}-related-articles-title`} className="mb-7 text-2xl font-bold text-white">{messages.relatedArticles}</h2><div className="grid gap-5 md:grid-cols-2">{related.map((candidate) => <ArticleCard key={`${candidate.language}-${candidate.slug}`} article={candidate} compact />)}</div></section>}
    </ArticlesShell>
  );
}
