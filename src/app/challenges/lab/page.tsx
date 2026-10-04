import type { Metadata } from "next";
import ChallengeShell from "@/components/challenges/ChallengeShell";
import LabExperience from "@/components/lab/LabExperience";
import { getLabLevels } from "@/lib/lab/repository";

export const metadata: Metadata = {
  title: "آزمایشگاه پرفورمنس فرانت‌اند",
  description: "تیکت‌های واقعی پرفورمنس یک فروشگاه را باز کنید: مشکل را در اپ ببینید، کد را عوض کنید، نتیجه را پیش‌بینی و اجرا کنید.",
  alternates: { canonical: "https://mahdidelavar.ir/challenges/lab" },
  openGraph: {
    title: "آزمایشگاه پرفورمنس فرانت‌اند | مهدی دلاور",
    description: "Request waterfall، محاسبه‌ی تکراری و رندرهای اضافه را در یک اپ زنده پیدا و حل کنید.",
    url: "https://mahdidelavar.ir/challenges/lab",
  },
};

export default function LabPage() {
  return (
    <ChallengeShell wide hasBottomBar>
      <LabExperience levels={getLabLevels()} />
    </ChallengeShell>
  );
}
