import type { ArticleLanguage } from "./types";

export const articleMessages = {
  en: {
    articles: "Articles",
    brand: "Engineering Articles",
    brandDescription: "Notes, decisions, and case studies",
    eyebrow: "Engineering notes",
    indexTitle: "Ideas from building complex frontend systems.",
    indexIntroduction: "Engineering notes and technical case studies about frontend architecture, React, TypeScript, tooling, and complex user interfaces.",
    collection: "Growing collection",
    allArticles: "All articles",
    allArticlesNav: "All articles",
    portfolio: "Portfolio",
    plannedCollection: "The first articles are currently being prepared for publication.",
    plannedArticle: "Planned article",
    seeAll: "See all",
    readArticle: "Read article",
    backToArticles: "Back to articles",
    published: "Published",
    readingTime: "Reading time",
    relatedArticles: "Related articles",
    previous: "Previous",
    next: "Next",
    tags: "Article tags",
    noArticles: "No articles available",
    footer: "Engineering notes by Mahdi Delavar",
    languageName: "English",
    alternateLanguageName: "فارسی",
  },
  fa: {
    articles: "مقاله‌ها",
    brand: "مقاله‌های مهندسی",
    brandDescription: "یادداشت‌ها، تصمیم‌ها و مطالعات فنی",
    eyebrow: "یادداشت‌های مهندسی",
    indexTitle: "ایده‌هایی از ساخت سیستم‌های پیچیده فرانت‌اند",
    indexIntroduction: "یادداشت‌ها و مطالعات فنی درباره معماری فرانت‌اند، React، TypeScript، ابزارها و رابط‌های کاربری پیچیده.",
    collection: "مجموعه‌ای در حال رشد",
    allArticles: "همه مقاله‌ها",
    allArticlesNav: "همه مقاله‌ها",
    portfolio: "نمونه‌کارها",
    plannedCollection: "نخستین مقاله‌ها در حال آماده‌سازی برای انتشار هستند.",
    plannedArticle: "مقاله در دست تهیه",
    seeAll: "مشاهده همه",
    readArticle: "مطالعه مقاله",
    backToArticles: "بازگشت به مقاله‌ها",
    published: "تاریخ انتشار",
    readingTime: "زمان مطالعه",
    relatedArticles: "مقاله‌های مرتبط",
    previous: "قبلی",
    next: "بعدی",
    tags: "برچسب‌های مقاله",
    noArticles: "مقاله‌ای موجود نیست",
    footer: "یادداشت‌های مهندسی مهدی دلاور",
    languageName: "فارسی",
    alternateLanguageName: "English",
  },
} as const;

export function getArticleMessages(language: ArticleLanguage) {
  return articleMessages[language];
}

export function getArticlesPath(language: ArticleLanguage) {
  return language === "fa" ? "/fa/articles" : "/articles";
}

export function getArticlePath(language: ArticleLanguage, slug: string) {
  return `${getArticlesPath(language)}/${slug}`;
}

export function formatArticleDate(date: string | null, language: ArticleLanguage) {
  if (!date) return getArticleMessages(language).plannedArticle;
  return new Intl.DateTimeFormat(language === "fa" ? "fa-IR" : "en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}
