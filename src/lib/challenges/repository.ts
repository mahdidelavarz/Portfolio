import "server-only";

import rawChallenges from "@/data/challenges.json";
import {
  validateChallenges,
  type Challenge,
  type PublicChallenge,
} from "@/data/challenge-validator";

const challenges = validateChallenges(rawChallenges);

export function isPublishedChallenge(
  challenge: Challenge,
  now = new Date(),
): boolean {
  return (
    challenge.status === "published" &&
    new Date(challenge.publishedAt).getTime() <= now.getTime()
  );
}

export function toPublicChallenge(challenge: Challenge): PublicChallenge {
  return {
    id: challenge.id,
    slug: challenge.slug,
    title: challenge.title,
    description: challenge.description,
    technology: challenge.technology,
    topic: challenge.topic,
    difficulty: challenge.difficulty,
    type: challenge.type,
    codeLanguage: challenge.codeLanguage,
    code: challenge.code,
    options: challenge.options,
    estimatedMinutes: challenge.estimatedMinutes,
    publishedAt: challenge.publishedAt,
    status: challenge.status,
    linkedinPostUrl: challenge.linkedinPostUrl,
  };
}

export function getPublishedChallenges(now = new Date()): Challenge[] {
  return challenges
    .filter((challenge) => isPublishedChallenge(challenge, now))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export function getPublishedPublicChallenges(
  now = new Date(),
): PublicChallenge[] {
  return getPublishedChallenges(now).map(toPublicChallenge);
}

export function getPublishedChallengeBySlug(
  slug: string,
  now = new Date(),
): Challenge | null {
  const challenge = challenges.find((item) => item.slug === slug);
  return challenge && isPublishedChallenge(challenge, now) ? challenge : null;
}

export function getChallengeById(id: string): Challenge | null {
  return challenges.find((challenge) => challenge.id === id) ?? null;
}

export function getAdjacentChallenges(slug: string): {
  previous: PublicChallenge | null;
  next: PublicChallenge | null;
} {
  const published = getPublishedChallenges();
  const index = published.findIndex((challenge) => challenge.slug === slug);
  return {
    previous: index >= 0 && index < published.length - 1
      ? toPublicChallenge(published[index + 1])
      : null,
    next: index > 0 ? toPublicChallenge(published[index - 1]) : null,
  };
}
