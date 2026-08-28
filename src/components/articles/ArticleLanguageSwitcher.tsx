import Link from "next/link";
import { getArticlesPath } from "@/lib/articles/locale";
import type { Article, ArticleLanguage } from "@/lib/articles/types";

type Props = {
  language: ArticleLanguage;
  alternateArticle?: Article;
};

export default function ArticleLanguageSwitcher({ language, alternateArticle }: Props) {
  const alternateLanguage: ArticleLanguage = language === "en" ? "fa" : "en";
  const alternateHref = alternateArticle
    ? `${getArticlesPath(alternateLanguage)}/${alternateArticle.slug}`
    : getArticlesPath(alternateLanguage);

  return (
    <div className="flex items-center gap-2 text-xs font-semibold" aria-label="Language switcher">
      {language === "en" ? (
        <span className="text-white" aria-current="page">EN</span>
      ) : (
        <Link href={alternateHref} hrefLang="en" className="rounded text-slate-400 hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">EN</Link>
      )}
      <span className="text-slate-700" aria-hidden="true">|</span>
      {language === "fa" ? (
        <span className="text-white" aria-current="page">فارسی</span>
      ) : (
        <Link href={alternateHref} hrefLang="fa" className="rounded text-slate-400 hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">فارسی</Link>
      )}
    </div>
  );
}
