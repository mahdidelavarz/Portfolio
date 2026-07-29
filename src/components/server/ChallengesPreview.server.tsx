import Link from "next/link";
import { getPublishedPublicChallenges } from "@/lib/challenges/repository";

export default function ChallengesPreview() {
  const challenges = getPublishedPublicChallenges().slice(0, 3);

  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-slate-950/60 px-4 py-20 sm:px-6" aria-labelledby="frontend-challenges-title">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-3xl" />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-9 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="mb-3 block text-sm font-bold uppercase tracking-widest text-cyan-400">Frontend Challenges</span>
            <h2 id="frontend-challenges-title" className="mb-3 text-3xl font-black text-white sm:text-5xl">دانشت را در چند دقیقه محک بزن</h2>
            <p dir="rtl" lang="fa" className="challenge-font max-w-2xl text-right text-base leading-8 text-slate-400">سؤال‌های کوتاه JavaScript و React، پاسخ تشریحی و یک رتبه‌بندی دوستانه؛ بدون نیاز به ثبت‌نام.</p>
          </div>
          <Link href="/challenges" className="shrink-0 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-bold text-white transition hover:shadow-lg hover:shadow-cyan-500/20">مشاهده همه چالش‌ها</Link>
        </div>
        <div dir="rtl" lang="fa" className="challenge-font grid gap-4 md:grid-cols-3">
          {challenges.map((challenge) => (
            <Link key={challenge.id} href={`/challenges/${challenge.slug}`} className="group rounded-2xl border border-white/10 bg-slate-900/70 p-5 text-right transition hover:-translate-y-1 hover:border-cyan-400/30">
              <div className="mb-4 flex flex-wrap gap-2 text-xs"><span className="rounded-full bg-cyan-500/10 px-2.5 py-1 text-cyan-300">{challenge.technology}</span><span className="rounded-full bg-white/5 px-2.5 py-1 text-slate-400">{challenge.topic}</span></div>
              <h3 className="mb-3 text-lg font-black leading-8 text-white group-hover:text-cyan-200">{challenge.title}</h3>
              <span className="text-sm text-slate-500">{challenge.estimatedMinutes ?? 3} دقیقه · شروع چالش ←</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
