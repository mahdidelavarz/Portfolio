import type { ArticleLanguage } from "./types";

export type SeriesPlanEntry = {
  number: number;
  period: string;
  title: string;
};

/**
 * The planned arc of the ERP story series. Published episodes link to their
 * article; the rest are shown as upcoming on the series timeline.
 */
export const seriesPlan: Record<ArticleLanguage, SeriesPlanEntry[]> = {
  en: [
    { number: 1, period: "Nov 2024", title: "Starting an ERP from scratch" },
    {
      number: 2,
      period: "Winter 2024 – Spring 2025",
      title: "The first list, and the twentieth",
    },
    {
      number: 3,
      period: "Aug 2025",
      title: "A modal inside a modal inside a modal",
    },
    { number: 4, period: "Aug 2025", title: "Users wanted ten tabs open" },
    {
      number: 5,
      period: "Sep – Nov 2025",
      title: "Changing an order without losing its history",
    },
    { number: 6, period: "Autumn 2025", title: "When the data got big" },
    { number: 7, period: "Jan 2026", title: "57 pages, one shell" },
    {
      number: 8,
      period: "Apr 2026 – now",
      title: "Teaching an agent to write code like us",
    },
  ],
  fa: [
    { number: 1, period: "آبان ۱۴۰۳", title: "یک ERP از صفر" },
    {
      number: 2,
      period: "زمستان ۱۴۰۳ تا بهار ۱۴۰۴",
      title: "اولین لیست و بیستمین لیست",
    },
    { number: 3, period: "شهریور ۱۴۰۴", title: "modal توی modal توی modal" },
    { number: 4, period: "شهریور ۱۴۰۴", title: "کاربرها ده تا تب می‌خواستند" },
    {
      number: 5,
      period: "شهریور تا آبان ۱۴۰۴",
      title: "سفارشی که باید عوض شود بدون اینکه گذشته‌اش گم شود",
    },
    { number: 6, period: "پاییز ۱۴۰۴", title: "داده بزرگ شد" },
    { number: 7, period: "بهمن ۱۴۰۴", title: "۵۷ صفحه، یک قالب" },
    {
      number: 8,
      period: "فروردین ۱۴۰۵ تا امروز",
      title: "به agent یاد دادم مثل ما کد بنویسد",
    },
  ],
};
