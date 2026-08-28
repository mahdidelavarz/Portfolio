import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleDetailView from "@/components/articles/ArticleDetailView";
import { getArticleBySlug, getAlternateLanguageVersion, getArticlesByLanguage } from "@/lib/articles/repository";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getArticlesByLanguage("en").map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug, "en");
  if (!article) return { title: "Article not found", robots: { index: false, follow: false } };
  const alternate = getAlternateLanguageVersion(article);
  const canonical = `https://mahdidelavar.ir/articles/${article.slug}`;
  return {
    title: article.title,
    description: article.summary,
    alternates: { canonical, languages: { en: canonical, ...(alternate ? { fa: `https://mahdidelavar.ir/fa/articles/${alternate.slug}` } : {}) } },
    robots: article.status === "published" ? undefined : { index: false, follow: true },
    openGraph: { title: article.title, description: article.summary, url: canonical, locale: "en_US", alternateLocale: alternate ? ["fa_IR"] : undefined, type: "article", publishedTime: article.publishedAt ?? undefined, tags: article.tags },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug, "en");
  if (!article) notFound();
  return <ArticleDetailView article={article} />;
}

