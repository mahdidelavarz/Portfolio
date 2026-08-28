import type { ReactNode } from "react";

export type ArticleStatus = "planned" | "published";
export type ArticleLanguage = "en" | "fa";

export type ArticleMetadata = {
  slug: string;
  language: ArticleLanguage;
  title: string;
  summary: string;
  publishedAt: string | null;
  readingTime: string;
  tags: string[];
  featured: boolean;
  project?: string;
  status: ArticleStatus;
};

export type Article = ArticleMetadata & {
  content: ReactNode;
};
