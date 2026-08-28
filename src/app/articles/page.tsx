import type { Metadata } from "next";
import ArticlesIndexView from "@/components/articles/ArticlesIndexView";

export const metadata: Metadata = {
  title: "Engineering Articles",
  description: "Engineering notes and technical case studies about frontend architecture, React, TypeScript, tooling, and complex user interfaces.",
  alternates: { canonical: "https://mahdidelavar.ir/articles", languages: { en: "https://mahdidelavar.ir/articles", fa: "https://mahdidelavar.ir/fa/articles" } },
  openGraph: { title: "Engineering Articles | Mahdi Delavar", description: "Engineering notes and technical case studies about frontend architecture and complex user interfaces.", url: "https://mahdidelavar.ir/articles", locale: "en_US", alternateLocale: ["fa_IR"], type: "website" },
};

export default function ArticlesPage() {
  return <ArticlesIndexView language="en" />;
}

