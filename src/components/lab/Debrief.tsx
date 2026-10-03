import type { ApproachKind } from "@/data/lab-validator";
import { formatMs, formatNumber } from "@/lib/lab/format";
import { configFromApproach, fillExplanation, scoreConfig, type PlayableLevel } from "@/lib/lab/playable";
import InlineCode from "./InlineCode";
import type { LevelProgress } from "./labStorage";
import Num from "./Num";
import { cardClass, primaryButtonClass, quietButtonClass } from "./styles";

const kindLabel: Record<ApproachKind, string> = {
  optimal: "بهینه",
  valid: "معتبر، با هزینه‌ی بیشتر",
  partial: "بهبود ناکافی",
  overkill: "پیچیده‌تر از لازم",
  symptom: "فقط علامت رو پنهان می‌کنه",
  "no-cause": "علت رو حل نمی‌کنه",
  broken: "رفتار رو خراب می‌کنه",
};

const kindStyle: Record<ApproachKind, string> = {
  optimal: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  valid: "border-cyan-500/25 bg-cyan-500/10 text-cyan-300",
  partial: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  overkill: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  symptom: "border-rose-500/30 bg-rose-500/10 text-rose-300",
  "no-cause": "border-rose-500/30 bg-rose-500/10 text-rose-300",
  broken: "border-rose-500/30 bg-rose-500/10 text-rose-300",
};

function ApproachTable({ level }: { level: PlayableLevel }) {
  const rows = level.approaches.map((approach) => ({
    approach,
    result: scoreConfig(level, configFromApproach(level, approach)),
  }));

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-slate-700/60 text-right text-xs text-slate-500">
            <th className="px-2 py-2 font-medium">راه‌حل</th>
            <th className="px-2 py-2 font-medium">نوع</th>
            <th className="px-2 py-2 font-medium">{level.primaryMetric.label}</th>
            <th className="px-2 py-2 font-medium">بهینگی</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ approach, result }) => (
            <tr key={approach.name} className="border-b border-slate-800 align-top text-slate-300">
              <td className="px-2 py-2.5"><InlineCode text={approach.name} /></td>
              <td className="px-2 py-2.5">
                <span className={`inline-block whitespace-nowrap rounded-md border px-2 text-xs ${kindStyle[approach.kind]}`}>
                  {kindLabel[approach.kind]}
                </span>
              </td>
              <td className="whitespace-nowrap px-2 py-2.5">
                <Num>{formatMs(result.evaluation.metrics[level.primaryMetric.key])}</Num>
              </td>
              <td className="whitespace-nowrap px-2 py-2.5">
                {result.evaluation.correct ? <Num>{formatNumber(result.score)}٪</Num> : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Debrief({
  level,
  progress,
  open,
  nextLevel,
  onToggle,
  onSelectLevel,
}: {
  level: PlayableLevel;
  progress: LevelProgress;
  open: boolean;
  nextLevel: PlayableLevel | null;
  onToggle: () => void;
  onSelectLevel: (levelId: string) => void;
}) {
  const correctPredictions = progress.runs.filter((run) => run.prediction === run.direction).length;

  return (
    <section className={cardClass} aria-labelledby="lab-debrief-title">
      <div className="flex items-baseline justify-between gap-3">
        <h3 id="lab-debrief-title" className="text-base font-black text-white">گزارش تیکت</h3>
        <button type="button" onClick={onToggle} aria-expanded={open} className={quietButtonClass}>
          {open ? "بستن" : "باز کردن"}
        </button>
      </div>
      {!open && <p className="mt-2 text-sm text-slate-400">مفهومی که پشت این تیکت بود، چرا جواب داد، و مقایسه‌ی راه‌حل‌های دیگه.</p>}
      {open && (
        <div className="mt-4 flex flex-col gap-5">
          <div className="text-xs text-slate-500">
            مفهومی که پیدا کردی
            <b className="mt-1 block text-lg font-black text-cyan-300">{level.concept}</b>
          </div>
          <div className="flex max-w-prose flex-col gap-3 text-sm leading-7 text-slate-300">
            {fillExplanation(level).map((paragraph) => (
              <p key={paragraph}>
                <InlineCode text={paragraph} />
              </p>
            ))}
          </div>
          <ApproachTable level={level} />
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-slate-400">
            <span>اجراها <b className="text-slate-100"><Num>{formatNumber(progress.runs.length)}</Num></b></span>
            <span>
              پیش‌بینی درست{" "}
              <b className="text-slate-100">
                <Num>{formatNumber(correctPredictions)}</Num> از <Num>{formatNumber(progress.runs.length)}</Num>
              </b>
            </span>
            <span>
              راهنمایی <b className="text-slate-100"><Num>{formatNumber(progress.hintsUsed)}</Num></b>
              {progress.solutionShown && " · راه‌حل دیده شد"}
            </span>
            <span>بهترین نتیجه <b className="text-slate-100"><Num>{formatNumber(progress.bestScore)}٪</Num></b></span>
          </div>
          {nextLevel && (
            <button type="button" onClick={() => onSelectLevel(nextLevel.id)} className={`${primaryButtonClass} self-start`}>
              تیکت بعدی: {nextLevel.title}
            </button>
          )}
        </div>
      )}
    </section>
  );
}
