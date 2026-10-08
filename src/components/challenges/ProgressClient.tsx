"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import UsernameDialog, { RecoveryCodeCard, requestNewRecoveryCode } from "./UsernameDialog";

type LabTicket = {
  levelId: string;
  number: number;
  title: string;
  status: "untouched" | "open" | "closed";
  bestScore: number;
  runs: number;
  hintsUsed: number;
  solutionViewed: boolean;
  points: number;
};

type Progress = {
  visitor: { displayName: string | null };
  summary: {
    totalAnswers: number;
    correctAnswers: number;
    accuracy: number;
    closedTickets: number;
    totalTickets: number;
  };
  currentMonth: {
    totalAnswers: number;
    points: number;
    quizPoints: number;
    labPoints: number;
    accuracy: number;
    rank: number | null;
  };
  lab: LabTicket[];
  answeredChallenges: Array<{
    slug: string;
    title: string;
    technology: string;
    topic: string;
    isCorrect: boolean;
    answeredAt: string;
  }>;
};

const LOAD_ERROR = "پیشرفت شما بارگذاری نشد.";

const ticketStatus: Record<LabTicket["status"], { label: string; className: string }> = {
  closed: { label: "بسته شد", className: "border-emerald-400/25 bg-emerald-400/10 text-emerald-300" },
  open: { label: "هنوز باز", className: "border-amber-400/25 bg-amber-400/10 text-amber-300" },
  untouched: { label: "شروع نشده", className: "border-slate-700 bg-slate-800/60 text-slate-400" },
};

const fa = (value: number) => value.toLocaleString("fa-IR");

async function fetchProgress(): Promise<Progress> {
  const response = await fetch("/api/me/progress", { cache: "no-store" });
  const body = await response.json();
  if (!response.ok) throw new Error(body.error?.message ?? LOAD_ERROR);
  return body as Progress;
}

export default function ProgressClient() {
  const [data, setData] = useState<Progress | null>(null);
  const [error, setError] = useState("");
  const [nameDialogOpen, setNameDialogOpen] = useState(false);
  const [newCode, setNewCode] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  const load = useCallback(() => {
    fetchProgress()
      .then(setData)
      .catch((loadError) => setError(loadError instanceof Error ? loadError.message : LOAD_ERROR));
  }, []);
  const closeNameDialog = useCallback(() => setNameDialogOpen(false), []);

  useEffect(load, [load]);

  async function generateCode() {
    setGenerating(true);
    setError("");
    try {
      setNewCode(await requestNewRecoveryCode());
    } catch (codeError) {
      setError(codeError instanceof Error ? codeError.message : "کد جدید ساخته نشد.");
    } finally {
      setGenerating(false);
    }
  }

  const nameDialog = nameDialogOpen && (
    <UsernameDialog
      intro="با ثبت اسم، امتیازهات تو رتبه‌بندی ماهانه حساب می‌شه و از دستگاه‌های دیگه هم بهشون دسترسی داری."
      onDone={load}
      onClose={closeNameDialog}
    />
  );

  if (error && !data) return <div role="alert" className="rounded-2xl border border-rose-400/20 bg-rose-400/10 p-6 text-rose-200">{error}</div>;
  if (!data) return <div className="grid min-h-[50vh] place-items-center text-slate-400" role="status">در حال بارگذاری پیشرفت شما…</div>;

  const hasLabActivity = data.lab.some((ticket) => ticket.status !== "untouched");
  if (data.summary.totalAnswers === 0 && !hasLabActivity) {
    return (
      <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-slate-900/60 p-8 text-center sm:p-12">
        <span className="mx-auto mb-5 grid size-16 place-items-center rounded-2xl bg-cyan-500/10 text-3xl">⌁</span>
        <h1 className="mb-3 text-3xl font-black text-white">هنوز نتیجه‌ای ثبت نکرده‌اید</h1>
        <p className="mb-7 leading-8 text-slate-400">با بستن اولین تیکت آزمایشگاه یا حل اولین سؤال، آمار و روند پیشرفت شما اینجا دیده می‌شود.</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/challenges/lab" className="inline-block rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-bold text-white">ورود به آزمایشگاه</Link>
          {!data.visitor.displayName && (
            <button type="button" onClick={() => setNameDialogOpen(true)} className="text-sm text-cyan-300 underline-offset-4 hover:underline">
              قبلاً اسم ثبت کرده‌ام
            </button>
          )}
        </div>
        {nameDialog}
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
        {data.visitor.displayName ? (
          <button onClick={generateCode} disabled={generating} className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-300 hover:border-cyan-400/30 hover:text-white disabled:opacity-50">
            {generating ? "در حال ساخت…" : "کد بازیابی جدید"}
          </button>
        ) : (
          <button onClick={() => setNameDialogOpen(true)} className="rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2.5 text-sm font-bold text-cyan-200 hover:bg-cyan-400/15">
            ثبت اسم
          </button>
        )}
      </div>

      {newCode && (
        <div className="mb-7">
          <RecoveryCodeCard code={newCode} />
          <p className="mt-2 text-xs text-slate-500">کد قبلی دیگه کار نمی‌کنه.</p>
        </div>
      )}
      {!data.visitor.displayName && (
        <p className="mb-7 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-4 text-sm leading-7 text-slate-300">
          هنوز اسم ثبت نکرده‌ای؛ پاسخ‌هات تو این مرورگر می‌مونه ولی تو رتبه‌بندی حساب نمی‌شه و نتیجه‌ی آزمایشگاه ذخیره نمی‌شه.
        </p>
      )}
      {error && <p role="alert" className="mb-5 text-sm text-rose-300">{error}</p>}

      <section className="mb-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="آمار کلی">
        <ProgressStat label="اسم" value={data.visitor.displayName ?? "کاربر ناشناس"} />
        <ProgressStat label="تیکت‌های بسته‌شده" value={`${fa(data.summary.closedTickets)} از ${fa(data.summary.totalTickets)}`} accent />
        <ProgressStat label="پاسخ صحیح کوییز" value={`${fa(data.summary.correctAnswers)} از ${fa(data.summary.totalAnswers)}`} />
        <ProgressStat label="دقت کوییز" value={`${fa(data.summary.accuracy)}٪`} />
      </section>

      <section className="mb-10 rounded-2xl border border-purple-400/20 bg-purple-400/5 p-6">
        <h2 className="mb-5 text-xl font-black text-white">این ماه</h2>
        <div className="grid gap-5 sm:grid-cols-4">
          <SmallStat label="امتیاز" value={data.currentMonth.points} />
          <SmallStat label="کوییز · آزمایشگاه" value={`${fa(data.currentMonth.quizPoints)} · ${fa(data.currentMonth.labPoints)}`} />
          <SmallStat label="دقت" value={`${fa(data.currentMonth.accuracy)}٪`} />
          <SmallStat label="رتبه" value={data.currentMonth.rank ? `#${fa(data.currentMonth.rank)}` : "—"} />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-5 text-2xl font-black text-white">تیکت‌های آزمایشگاه</h2>
        <div className="space-y-3">
          {data.lab.map((ticket) => (
            <Link key={ticket.levelId} href="/challenges/lab" className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-900/60 p-5 transition hover:border-cyan-400/30 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-bold text-white">
                  <span dir="ltr" className="ml-2 font-mono text-xs text-slate-500">#{String(ticket.number).padStart(2, "0")}</span>
                  {ticket.title}
                </h3>
                {ticket.status !== "untouched" && (
                  <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
                    <span>بهینگی {fa(ticket.bestScore)}٪</span>
                    <span>{fa(ticket.runs)} اجرا</span>
                    <span>{fa(ticket.hintsUsed)} راهنمایی</span>
                    <span>{ticket.solutionViewed ? "راه‌حل دیده شده · بدون امتیاز" : `${fa(ticket.points)} امتیاز`}</span>
                  </p>
                )}
              </div>
              <span className={`shrink-0 self-start rounded-lg border px-3 py-1.5 text-xs font-bold sm:self-auto ${ticketStatus[ticket.status].className}`}>
                {ticketStatus[ticket.status].label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {data.answeredChallenges.length > 0 && (
        <section>
          <h2 className="mb-5 text-2xl font-black text-white">پاسخ‌های کوییز</h2>
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
      )}

      <p className="mt-8 rounded-xl border border-white/5 bg-white/[0.02] p-4 text-xs leading-6 text-slate-500">
        پیشرفت شما به این مرورگر وصل است. برای دسترسی از یک مرورگر یا دستگاه دیگر، اسم و کد بازیابی‌تان را لازم دارید.
      </p>
      {nameDialog}
    </>
  );
}

function ProgressStat({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5"><p className="mb-2 text-xs text-slate-500">{label}</p><p className={`text-xl font-black ${accent ? "text-emerald-300" : "text-white"}`}>{value}</p></div>;
}

function SmallStat({ label, value }: { label: string; value: string | number }) {
  return <div><p className="mb-1 text-xs text-slate-500">{label}</p><p className="text-2xl font-black text-white">{typeof value === "number" ? fa(value) : value}</p></div>;
}
