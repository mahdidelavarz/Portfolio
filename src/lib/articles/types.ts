import type { ReactNode } from "react";

export type ArticleStatus = "planned" | "published";
export type ArticleLanguage = "en" | "fa";

export type ArticleEpisode = {
  /** Position in the ERP story series, starting at 1. */
  number: number;
  /** Two-line "so far" summary for readers who land on this episode directly. */
  recap?: string;
  /** Short takeaways shown in the "What I learned" box. */
  lessons: string[];
};

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
  episode?: ArticleEpisode;
};

export type Article = ArticleMetadata & {
  content: ReactNode;
};
