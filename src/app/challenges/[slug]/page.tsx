import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ChallengeShell from "@/components/challenges/ChallengeShell";
import QuestionExperience from "@/components/challenges/QuestionExperience";
import {
  getAdjacentChallenges,
  getPublishedChallengeBySlug,
  getPublishedChallenges,
  toPublicChallenge,
} from "@/lib/challenges/repository";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPublishedChallenges().map((challenge) => ({ slug: challenge.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const challenge = getPublishedChallengeBySlug(slug);
  if (!challenge) return { title: "سؤال پیدا نشد", robots: { index: false, follow: false } };
  const canonical = `https://mahdidelavar.ir/challenges/${challenge.slug}`;
  return {
    title: challenge.title,
    description: challenge.description,
    alternates: { canonical },
    openGraph: {
      title: challenge.title,
      description: challenge.description,
      url: canonical,
      type: "article",
    },
  };
}

export default async function ChallengePage({ params }: PageProps) {
  const { slug } = await params;
  const challenge = getPublishedChallengeBySlug(slug);
  if (!challenge) notFound();
  const adjacent = getAdjacentChallenges(slug);
  return (
    <ChallengeShell>
      <QuestionExperience
        question={toPublicChallenge(challenge)}
        initialAdjacent={{
          previous: adjacent.previous ? { slug: adjacent.previous.slug, title: adjacent.previous.title } : null,
          next: adjacent.next ? { slug: adjacent.next.slug, title: adjacent.next.title } : null,
        }}
      />
    </ChallengeShell>
  );
}
