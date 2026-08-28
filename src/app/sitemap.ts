import type { MetadataRoute } from "next";
import { getPublishedChallenges } from "@/lib/challenges/repository";
import { getPublishedArticles } from "@/lib/articles/repository";

const BASE_URL = "https://mahdidelavar.ir";

export default function sitemap(): MetadataRoute.Sitemap {
  const challengeRoutes: MetadataRoute.Sitemap = getPublishedChallenges().map(
    (challenge) => ({
      url: `${BASE_URL}/challenges/${challenge.slug}`,
      lastModified: new Date(challenge.publishedAt),
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  const articleRoutes: MetadataRoute.Sitemap = getPublishedArticles().map(
    (article) => ({
      url: article.language === "fa"
        ? `${BASE_URL}/fa/articles/${article.slug}`
        : `${BASE_URL}/articles/${article.slug}`,
      lastModified: new Date(article.publishedAt!),
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/challenges`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/articles`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/fa/articles`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/leaderboard`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.6,
    },
    ...challengeRoutes,
    ...articleRoutes,
  ];
}
