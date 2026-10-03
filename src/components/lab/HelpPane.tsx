import { formatNumber } from "@/lib/lab/format";
import type { PlayableLevel } from "@/lib/lab/playable";
import InlineCode from "./InlineCode";
import type { LevelProgress } from "./labStorage";
import Num from "./Num";
import { cardClass, primaryButtonClass, quietButtonClass, secondaryButtonClass } from "./styles";

export default function HelpPane({
  level,
  progress,
  onTakeHint,
  onShowHint,
  onShowSolution,
  onReset,
}: {
  level: PlayableLevel;
  progress: LevelProgress;
  onTakeHint: () => void;
  onShowHint: (index: number) => void;
  onShowSolution: () => void;
  onReset: () => void;
}) {
  const takenHints = level.hints.slice(0, progress.hintsUsed);

  return (
    <div className="flex flex-col gap-4">
      <section className={cardClass}>
        <div className="mb-4 flex items-baseline justify-between gap-2">
          <h3 className="text-base font-black text-white">راهنمایی</h3>
          <span className="text-xs text-slate-500">
            <Num>{formatNumber(progress.hintsUsed)}</Num> از <Num>{formatNumber(level.hints.length)}</Num> استفاده شده
          </span>
        </div>
        {!takenHints.length && (
          <p className="text-sm leading-7 text-slate-400">هر راهنمایی جواب رو نمی‌گه؛ فقط نشون می‌ده کجا رو نگاه کنی و به چی فکر کنی.</p>
        )}
        <ol className="flex flex-col gap-3">
          {takenHints.map((hint, index) => (
            <li key={hint.text} className="rounded-2xl border-r-[3px] border-amber-400 bg-amber-400/10 px-4 py-3 text-sm leading-7 text-slate-200">
              <div className="text-xs font-bold text-amber-300">
                راهنمایی <Num>{formatNumber(index + 1)}</Num> · {hint.tab === "code" ? "تو کد" : "تو تحلیل"}
              </div>
              <p>
                <InlineCode text={hint.text} />
              </p>
              <button
                type="button"
                onClick={() => onShowHint(index)}
                className="mt-2 rounded-lg border border-amber-400/30 px-3 py-1 text-xs font-bold text-amber-200 transition hover:bg-amber-400/10"
              >
                نشونم بده کجا
              </button>
            </li>
          ))}
        </ol>
        {progress.hintsUsed < level.hints.length && (
          <button type="button" onClick={onTakeHint} className={`${primaryButtonClass} mt-4`}>
            {progress.hintsUsed === 0 ? "یه راهنمایی بده" : "راهنمایی بعدی"}
          </button>
        )}
      </section>
      <section className={cardClass}>
        <h3 className="mb-3 text-base font-black text-white">هنوز گیر کردی؟</h3>
        <p className="mb-4 text-sm leading-7 text-slate-400">
          {progress.solutionShown
            ? "بهترین ترکیب تو کد قرار گرفت ولی هنوز اجرا نشده. برو تو «کد»، خط‌های سبز رو بخون و قبل از اجرا پیش‌بینی کن چی عوض می‌شه."
            : "اشکالی نداره. راه‌حل رو تو کد می‌ذاریم؛ خودت می‌خونی و اجراش می‌کنی."}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={onShowSolution} className={secondaryButtonClass}>
            {progress.solutionShown ? "برو به کد" : "راه‌حل رو نشونم بده"}
          </button>
          <button type="button" onClick={onReset} className={quietButtonClass}>شروع دوباره‌ی تیکت</button>
        </div>
      </section>
    </div>
  );
}
