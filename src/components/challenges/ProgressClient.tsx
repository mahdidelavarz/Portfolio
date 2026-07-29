"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Progress = {
  visitor: { displayName: string | null };
  summary: { totalAnswers: number; correctAnswers: number; accuracy: number };
  currentMonth: { totalAnswers: number; correctAnswers: number; accuracy: number; rank: number | null };
  answeredChallenges: Array<{
    slug: string;
    title: string;
    technology: string;
    topic: string;
    isCorrect: boolean;
    answeredAt: string;
  }>;
};

export default function ProgressClient() {
  const [data, setData] = useState<Progress | null>(null);
  const [name, setName] = useState("");
  const [editingName, setEditingName] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/me/progress", { cache: "no-store" })
      .then(async (response) => {
        const body = await response.json();
        if (!response.ok) throw new Error(body.error?.message ?? "پیشرفت شما بارگذاری نشد.");
        return body as Progress;
      })
      .then((progress) => {
        setData(progress);
        setName(progress.visitor.displayName ?? "");
      })
      .catch((loadError) => setError(loadError instanceof Error ? loadError.message : "پیشرفت شما بارگذاری نشد."));
  }, []);

  async function saveName(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const response = await fetch("/api/me/display-name", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayName: name }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error?.message ?? "نام ذخیره نشد.");
      setData((current) => current ? { ...current, visitor: { displayName: body.visitor.displayName } } : current);
      setEditingName(false);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "نام ذخیره نشد.");
    } finally {
      setSaving(false);
    }
  }

  if (error && !data) return <div role="alert" className="rounded-2xl border border-rose-400/20 bg-rose-400/10 p-6 text-rose-200">{error}</div>;
  if (!data) return <div className="grid min-h-[50vh] place-items-center text-slate-400" role="status">در حال بارگذاری پیشرفت شما…</div>;

  if (data.summary.totalAnswers === 0) {
    return (
      <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-slate-900/60 p-8 text-center sm:p-12">
        <span className="mx-auto mb-5 grid size-16 place-items-center rounded-2xl bg-cyan-500/10 text-3xl">⌁</span>
        <h1 className="mb-3 text-3xl font-black text-white">هنوز پاسخی ثبت نکرده‌اید</h1>
        <p className="mb-7 leading-8 text-slate-400">با حل اولین سؤال، آمار و روند پیشرفت شما در همین مرورگر ذخیره می‌شود.</p>
        <Link href="/challenges" className="inline-block rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-bold text-white">مشاهده چالش‌ها</Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-sm font-bold text-cyan-300">داشبورد شخصی شما</p>
          <h1 className="text-3xl font-black text-white sm:text-5xl">پیشرفت من</h1>
        </div>
        {!editingName && (
          <button onClick={() => setEditingName(true)} className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-300 hover:border-cyan-400/30 hover:text-white">
            {data.visitor.displayName ? "ویرایش نام" : "ثبت نام نمایشی"}
          </button>
        )}
      </div>

      {editingName && (
        <form onSubmit={saveName} className="mb-7 flex flex-col gap-3 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5 sm:flex-row">
          <label htmlFor="progress-name" className="sr-only">نام نمایشی LinkedIn</label>
          <input id="progress-name" value={name} onChange={(event) => setName(event.target.value)} maxLength={40} placeholder="نام نمایشی LinkedIn" className="min-w-0 flex-1 rounded-xl border border-white/15 bg-slate-950/70 px-4 py-3 outline-none focus:border-cyan-400" />
          <button disabled={saving} className="rounded-xl bg-cyan-500 px-5 py-3 font-bold text-slate-950 disabled:opacity-50">{saving ? "در حال ذخیره…" : "ذخیره"}</button>
          <button type="button" onClick={() => setEditingName(false)} className="px-4 py-2 text-sm text-slate-400">انصراف</button>
        </form>
      )}
      {error && <p role="alert" className="mb-5 text-sm text-rose-300">{error}</p>}

      <section className="mb-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="آمار کلی">
        <ProgressStat label="نام نمایشی" value={data.visitor.displayName ?? "کاربر ناشناس"} />
        <ProgressStat label="کل پاسخ‌ها" value={data.summary.totalAnswers.toLocaleString("fa-IR")} />
        <ProgressStat label="پاسخ صحیح" value={data.summary.correctAnswers.toLocaleString("fa-IR")} accent />
        <ProgressStat label="دقت کلی" value={`${data.summary.accuracy.toLocaleString("fa-IR")}٪`} />
      </section>

      <section className="mb-10 rounded-2xl border border-purple-400/20 bg-purple-400/5 p-6">
        <h2 className="mb-5 text-xl font-black text-white">این ماه</h2>
        <div className="grid gap-5 sm:grid-cols-4">
          <SmallStat label="پاسخ‌ها" value={data.currentMonth.totalAnswers} />
          <SmallStat label="صحیح" value={data.currentMonth.correctAnswers} />
          <SmallStat label="دقت" value={`${data.currentMonth.accuracy}٪`} />
          <SmallStat label="رتبه" value={data.currentMonth.rank ? `#${data.currentMonth.rank}` : "—"} />
        </div>
      </section>

      <section>
        <h2 className="mb-5 text-2xl font-black text-white">پاسخ‌های ثبت‌شده</h2>
        <div className="space-y-3">
          {data.answeredChallenges.map((challenge) => (
            <Link key={`${challenge.slug}-${challenge.answeredAt}`} href={`/challenges/${challenge.slug}`} className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-900/60 p-5 transition hover:border-cyan-400/30 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="mb-2 flex flex-wrap gap-2 text-xs text-slate-500"><span>{challenge.technology}</span><span>·</span><span>{challenge.topic}</span></div>
                <h3 className="font-bold text-white">{challenge.title}</h3>
              </div>
              <span className={`shrink-0 rounded-lg border px-3 py-1.5 text-xs font-bold ${challenge.isCorrect ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-300" : "border-rose-400/25 bg-rose-400/10 text-rose-300"}`}>
                {challenge.isCorrect ? "پاسخ درست" : "پاسخ نادرست"}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <p className="mt-8 rounded-xl border border-white/5 bg-white/[0.02] p-4 text-xs leading-6 text-slate-500">
        پیشرفت شما در این مرورگر ذخیره می‌شود. با پاک‌کردن داده‌های مرورگر، ممکن است دسترسی به این سابقه از بین برود.
      </p>
    </>
  );
}

function ProgressStat({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5"><p className="mb-2 text-xs text-slate-500">{label}</p><p className={`text-xl font-black ${accent ? "text-emerald-300" : "text-white"}`}>{value}</p></div>;
}

function SmallStat({ label, value }: { label: string; value: string | number }) {
  return <div><p className="mb-1 text-xs text-slate-500">{label}</p><p className="text-2xl font-black text-white">{typeof value === "number" ? value.toLocaleString("fa-IR") : value}</p></div>;
}
