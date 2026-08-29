import Link from "next/link";
import ArticleCard from "@/components/articles/ArticleCard";
import { getArticlesByLanguage, getFeaturedArticles } from "@/lib/articles/repository";

export default function ArticlesPreview() {
  const featured = getFeaturedArticles();
  const featuredArticles = [
    ...featured,
    ...getArticlesByLanguage("en").filter(
      (article) => !featured.some((candidate) => candidate.slug === article.slug),
    ),
  ].slice(0, 3);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-bl from-blue-950 via-gray-950 to-blue-950 py-16 sm:py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-3xl" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 inline-flex items-center gap-3 rounded-full px-4 py-2">
          <div className="h-px w-12 bg-gradient-to-l from-cyan-500 to-transparent sm:w-20" />
          <span className="text-sm font-medium uppercase tracking-widest text-cyan-400">Articles</span>
          <div className="h-px w-12 bg-gradient-to-r from-cyan-500 to-transparent sm:w-20" />
        </div>
        <h2 className="mb-5 text-4xl font-bold sm:text-5xl lg:text-6xl">
          <span className="bg-gradient-to-r from-white via-sky-400 to-white bg-clip-text text-transparent">Engineering, explained</span>
        </h2>
        <p className="mx-auto max-w-3xl text-base leading-8 text-slate-400 sm:text-lg">
          Technical notes and case studies about frontend architecture, product decisions, and the lessons behind complex interfaces.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {featuredArticles.map((article) => <ArticleCard key={article.slug} article={article} compact />)}
        </div>

        <div className="mt-10 flex justify-center">
          <Link href="/articles" className="rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-6 py-3 text-sm font-semibold text-cyan-200 transition hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-400/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950">
            See all articles <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
