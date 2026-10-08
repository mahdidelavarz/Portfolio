"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Entry = {
  rank: number;
  displayName: string | null;
  points: number;
  quizPoints: number;
  labPoints: number;
  totalAnswers: number;
  accuracy: number;
};

type LeaderboardData = {
  period: { start: string; end: string; timeZone: string };
  entries: Entry[];
  currentVisitor: Entry | null;
};

export default function LeaderboardClient() {
  const [data, setData] = useState<LeaderboardData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/leaderboard", { cache: "no-store" })
      .then(async (response) => {
        const body = await response.json();
        if (!response.ok) throw new Error(body.error?.message ?? "رتبه‌بندی بارگذاری نشد.");
        return body as LeaderboardData;
      })
      .then(setData)
      .catch((loadError) => setError(loadError instanceof Error ? loadError.message : "رتبه‌بندی بارگذاری نشد."));
  }, []);

  if (error) return <ErrorState message={error} />;
  if (!data) return <LoadingState />;

  const monthLabel = new Intl.DateTimeFormat("fa-IR", {
    month: "long",
    year: "numeric",
    timeZone: data.period.timeZone,
  }).format(new Date(data.period.start));

  return (
    <>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-sm font-bold text-cyan-300">{monthLabel}</p>
          <h1 className="text-3xl font-black text-white sm:text-5xl">رتبه‌بندی ماهانه</h1>
          <p className="mt-4 max-w-2xl leading-8 text-slate-400">
            هر پاسخ درست کوییز ۱ امتیاز و هر تیکت آزمایشگاه تا ۵ امتیاز دارد. امتیاز بیشتر، دقت بالاتر و رسیدن زودتر به امتیاز، ترتیب رتبه‌ها را مشخص می‌کند.
          </p>
        </div>
        <Link href="/challenges" className="rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-5 py-3 text-sm font-bold text-cyan-200 hover:bg-cyan-400/15">
          حل یک چالش
        </Link>
      </div>

      {data.currentVisitor && (
        <section className="mb-7 grid gap-4 rounded-2xl border border-cyan-400/25 bg-gradient-to-l from-cyan-500/10 to-blue-500/5 p-5 sm:grid-cols-4 sm:p-6" aria-label="رتبه فعلی شما">
          <Stat label="رتبه شما" value={`#${data.currentVisitor.rank.toLocaleString("fa-IR")}`} />
          <Stat label="امتیاز" value={data.currentVisitor.points.toLocaleString("fa-IR")} />
          <Stat label="کوییز · آزمایشگاه" value={`${data.currentVisitor.quizPoints.toLocaleString("fa-IR")} · ${data.currentVisitor.labPoints.toLocaleString("fa-IR")}`} />
          <Stat label="دقت" value={`${data.currentVisitor.accuracy.toLocaleString("fa-IR")}٪`} />
        </section>
      )}

      {data.entries.length ? (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-right">
              <thead className="border-b border-white/10 bg-white/[0.03] text-xs text-slate-500">
                <tr>
                  <th className="px-5 py-4 font-medium">رتبه</th>
                  <th className="px-5 py-4 font-medium">نام</th>
                  <th className="px-5 py-4 text-center font-medium">امتیاز</th>
                  <th className="px-5 py-4 text-center font-medium">دقت</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {data.entries.map((entry) => (
                  <tr key={`${entry.rank}-${entry.displayName}`} className="hover:bg-white/[0.025]">
                    <td className="px-5 py-4 font-mono font-black text-cyan-300">#{entry.rank.toLocaleString("fa-IR")}</td>
                    <td className="px-5 py-4 font-bold text-white">{entry.displayName}</td>
                    <td className="px-5 py-4 text-center">
                      <span className="block text-lg font-black text-emerald-300">{entry.points.toLocaleString("fa-IR")}</span>
                      <span className="block text-[11px] text-slate-500">
                        کوییز {entry.quizPoints.toLocaleString("fa-IR")} · آزمایشگاه {entry.labPoints.toLocaleString("fa-IR")}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-center text-slate-300">{entry.accuracy.toLocaleString("fa-IR")}٪</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-700 py-16 text-center">
          <p className="mb-4 text-slate-400">هنوز کسی در رتبه‌بندی این ماه نیست.</p>
          <Link href="/challenges" className="text-cyan-300 hover:underline">اولین نفر باشید</Link>
        </div>
      )}
      <p className="mt-5 text-xs text-slate-600">مرز ماه بر اساس منطقه زمانی Asia/Tehran محاسبه می‌شود.</p>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return <div><p className="mb-1 text-xs text-slate-500">{label}</p><p className="text-2xl font-black text-white">{value}</p></div>;
}

function LoadingState() {
  return <div className="grid min-h-[50vh] place-items-center text-slate-400" role="status">در حال بارگذاری رتبه‌بندی…</div>;
}

function ErrorState({ message }: { message: string }) {
  return <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 p-6 text-rose-200" role="alert">{message}</div>;
}
