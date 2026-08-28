import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleDetailView from "@/components/articles/ArticleDetailView";
import { getArticleBySlug, getAlternateLanguageVersion, getArticlesByLanguage } from "@/lib/articles/repository";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getArticlesByLanguage("fa").map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug, "fa");
  if (!article) return { title: "مقاله پیدا نشد", robots: { index: false, follow: false } };
  const alternate = getAlternateLanguageVersion(article);
  const canonical = `https://mahdidelavar.ir/fa/articles/${article.slug}`;
  return {
    title: article.title,
    description: article.summary,
    alternates: { canonical, languages: { fa: canonical, ...(alternate ? { en: `https://mahdidelavar.ir/articles/${alternate.slug}` } : {}) } },
    robots: article.status === "published" ? undefined : { index: false, follow: true },
    openGraph: { title: article.title, description: article.summary, url: canonical, locale: "fa_IR", alternateLocale: alternate ? ["en_US"] : undefined, type: "article", publishedTime: article.publishedAt ?? undefined, tags: article.tags },
  };
}

export default async function PersianArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug, "fa");
  if (!article) notFound();
  return <ArticleDetailView article={article} />;
}
