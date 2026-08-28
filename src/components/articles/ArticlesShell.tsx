import Image from "next/image";
import Link from "next/link";
import ArticleLanguageSwitcher from "./ArticleLanguageSwitcher";
import { getArticleMessages, getArticlesPath } from "@/lib/articles/locale";
import type { Article, ArticleLanguage } from "@/lib/articles/types";

export default function ArticlesShell({ children, language, alternateArticle }: { children: React.ReactNode; language: ArticleLanguage; alternateArticle?: Article }) {
  const messages = getArticleMessages(language);
  const articlesPath = getArticlesPath(language);
  return (
    <div lang={language} dir={language === "fa" ? "rtl" : "ltr"} className={`${language === "fa" ? "article-font-fa" : ""} min-h-screen bg-slate-950 text-slate-100`}>
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -right-24 top-16 h-72 w-72 rounded-full bg-cyan-500/[0.07] blur-3xl" />
        <div className="absolute -left-32 bottom-8 h-80 w-80 rounded-full bg-blue-500/[0.06] blur-3xl" />
      </div>

      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/85 shadow-lg shadow-black/10 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
          <Link href={articlesPath} className="group flex items-center gap-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
            <Image src="/favicon4.png" alt="Mahdi Delavar" width={36} height={36} priority className="size-9 rounded-xl object-cover" />
            <span>
              <span className="block text-sm font-black text-white sm:text-base">{messages.brand}</span>
              <span className="hidden text-xs text-slate-500 sm:block">{messages.brandDescription}</span>
            </span>
          </Link>
          <nav aria-label={messages.articles} className="flex items-center gap-1 text-sm text-slate-300">
            <ArticleLanguageSwitcher language={language} alternateArticle={alternateArticle} />
            <Link href={articlesPath} className="hidden rounded-lg px-3 py-2 transition hover:bg-white/5 hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 sm:block">{messages.allArticlesNav}</Link>
            <Link href="/" className="rounded-lg px-3 py-2 transition hover:bg-white/5 hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">{messages.portfolio}</Link>
          </nav>
        </div>
      </header>

      <main className="relative z-10">{children}</main>
      <footer className="relative z-10 border-t border-slate-800/80 px-4 py-8 text-center text-sm text-slate-500">
        {messages.footer}
      </footer>
    </div>
  );
}
