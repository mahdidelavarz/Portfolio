import type { Metadata } from "next";
import ArticlesIndexView from "@/components/articles/ArticlesIndexView";

export const metadata: Metadata = {
  title: "مقاله‌های مهندسی",
  description: "یادداشت‌ها و مطالعات فنی درباره معماری فرانت‌اند، React، TypeScript، ابزارها و رابط‌های کاربری پیچیده.",
  alternates: { canonical: "https://mahdidelavar.ir/fa/articles", languages: { en: "https://mahdidelavar.ir/articles", fa: "https://mahdidelavar.ir/fa/articles" } },
  openGraph: { title: "مقاله‌های مهندسی | مهدی دلاور", description: "یادداشت‌ها و مطالعات فنی درباره معماری فرانت‌اند و رابط‌های کاربری پیچیده.", url: "https://mahdidelavar.ir/fa/articles", locale: "fa_IR", alternateLocale: ["en_US"], type: "website" },
};

export default function PersianArticlesPage() {
  return <ArticlesIndexView language="fa" />;
}

