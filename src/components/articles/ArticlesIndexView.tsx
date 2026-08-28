import ArticleCard from "./ArticleCard";
import ArticlesShell from "./ArticlesShell";
import { getArticleMessages } from "@/lib/articles/locale";
import { getArticlesByLanguage } from "@/lib/articles/repository";
import type { ArticleLanguage } from "@/lib/articles/types";

export default function ArticlesIndexView({ language }: { language: ArticleLanguage }) {
  const messages = getArticleMessages(language);
  const articles = getArticlesByLanguage(language);
  const publishedCount = articles.filter((article) => article.status === "published").length;

  return (
    <ArticlesShell language={language}>
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <header className="max-w-4xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">{messages.eyebrow}</p>
          <h1 className="text-4xl font-black leading-tight text-white sm:text-6xl lg:text-7xl">{messages.indexTitle}</h1>
          <p className="mt-7 max-w-3xl text-base leading-8 text-slate-400 sm:text-lg">{messages.indexIntroduction}</p>
          {publishedCount === 0 && <p className="mt-6 inline-flex rounded-full border border-amber-400/20 bg-amber-400/[0.07] px-4 py-2 text-sm text-amber-200">{messages.plannedCollection}</p>}
        </header>
        <section className="mt-14 border-t border-slate-800/80 pt-10" aria-labelledby={`${language}-article-list-title`}>
          <div className="mb-8 flex items-end justify-between gap-4">
            <div><p className="text-sm text-slate-500">{messages.collection}</p><h2 id={`${language}-article-list-title`} className="mt-1 text-2xl font-bold text-white">{messages.allArticles}</h2></div>
            <span className="font-mono text-sm text-slate-500" dir="ltr">{articles.length.toString().padStart(2, "0")}</span>
          </div>
          {articles.length > 0 ? <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{articles.map((article) => <ArticleCard key={`${article.language}-${article.slug}`} article={article} />)}</div> : <p className="rounded-2xl border border-slate-800 p-8 text-slate-400">{messages.noArticles}</p>}
        </section>
      </div>
    </ArticlesShell>
  );
}

