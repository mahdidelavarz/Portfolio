import type { MetadataRoute } from "next";
import { getPublishedChallenges } from "@/lib/challenges/repository";

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
      url: `${BASE_URL}/leaderboard`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.6,
    },
    ...challengeRoutes,
  ];
}
