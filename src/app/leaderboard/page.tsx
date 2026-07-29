import type { Metadata } from "next";
import ChallengeShell from "@/components/challenges/ChallengeShell";
import LeaderboardClient from "@/components/challenges/LeaderboardClient";

export const metadata: Metadata = {
  title: "رتبه‌بندی چالش‌های فرانت‌اند",
  description: "رتبه‌بندی ماهانه پاسخ‌دهندگان چالش‌های JavaScript و React.",
  alternates: { canonical: "https://mahdidelavar.ir/leaderboard" },
};

export default function LeaderboardPage() {
  return <ChallengeShell><LeaderboardClient /></ChallengeShell>;
}
