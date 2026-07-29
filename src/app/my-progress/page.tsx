import type { Metadata } from "next";
import ChallengeShell from "@/components/challenges/ChallengeShell";
import ProgressClient from "@/components/challenges/ProgressClient";

export const metadata: Metadata = {
  title: "پیشرفت من در چالش‌ها",
  description: "آمار و پاسخ‌های ثبت‌شده شما در چالش‌های فرانت‌اند.",
  robots: { index: false, follow: false },
};

export default function MyProgressPage() {
  return <ChallengeShell><ProgressClient /></ChallengeShell>;
}
