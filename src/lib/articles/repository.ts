import { articles } from "./articles";
import type { Article } from "./types";
import type { ArticleLanguage } from "./types";

function byPublicationDate(a: Article, b: Article) {
  if (!a.publishedAt && !b.publishedAt) return a.title.localeCompare(b.title);
  if (!a.publishedAt) return 1;
  if (!b.publishedAt) return -1;
  return Date.parse(b.publishedAt) - Date.parse(a.publishedAt);
}

export function getArticlesByLanguage(language: ArticleLanguage): Article[] {
  return articles.filter((article) => article.language === language).sort(byPublicationDate);
}

export function getAllArticles(): Article[] {
  return [...articles].sort(byPublicationDate);
}

export function getPublishedArticles(language?: ArticleLanguage): Article[] {
  const source = language ? getArticlesByLanguage(language) : getAllArticles();
  return source.filter((article) => article.status === "published");
}

export function getFeaturedArticles(language: ArticleLanguage = "en"): Article[] {
  const localized = getArticlesByLanguage(language);
  const featured = localized.filter((article) => article.featured);
  return featured.length > 0 ? featured : localized.slice(0, 3);
}

export function getArticleBySlug(slug: string, language: ArticleLanguage = "en"): Article | undefined {
  return articles.find((article) => article.slug === slug && article.language === language);
}

export function getRelatedArticles(article: Article, limit = 2): Article[] {
  return getArticlesByLanguage(article.language)
    .filter((candidate) => candidate.slug !== article.slug)
    .map((candidate) => ({
      article: candidate,
      score:
        candidate.tags.filter((tag) => article.tags.includes(tag)).length +
        (candidate.project && candidate.project === article.project ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ article: candidate }) => candidate);
}

export function getAdjacentArticles(article: Article) {
  const ordered = getArticlesByLanguage(article.language);
  const index = ordered.findIndex((candidate) => candidate.slug === article.slug);

  return {
    previous: index > 0 ? ordered[index - 1] : null,
    next: index >= 0 && index < ordered.length - 1 ? ordered[index + 1] : null,
  };
}

export function getAlternateLanguageVersion(article: Article): Article | undefined {
  const alternateLanguage: ArticleLanguage = article.language === "en" ? "fa" : "en";
  return getArticleBySlug(article.slug, alternateLanguage);
}
