"use client";

import { createPortal } from "react-dom";
import { lineDiff, type DiffOperation } from "@/lib/lab/engine";
import { formatMs, formatNumber } from "@/lib/lab/format";
import { scoreConfig, type PlayableLevel } from "@/lib/lab/playable";
import type { Direction } from "@/lib/lab/types";
import FailedChecks from "./FailedChecks";
import InlineCode from "./InlineCode";
import LabCode, { type LabCodeLine, type LabCodeTone } from "./LabCode";
import type { RunRecord } from "./labStorage";
import Num from "./Num";
import ScoreMeter from "./ScoreMeter";
import { primaryButtonClass, quietButtonClass, secondaryButtonClass } from "./styles";
import { useDialogBehavior } from "./useDialogBehavior";

type Tone = "good" | "warn" | "bad";

const predictionLabel: Record<Direction, string> = {
  down: "کمتر می‌شه",
  same: "تغییری نمی‌کنه",
  up: "بیشتر می‌شه",
};

const diffStyle: Record<DiffOperation, { gutter: string; tone: LabCodeTone }> = {
  same: { gutter: "", tone: "plain" },
  added: { gutter: "+", tone: "added" },
  removed: { gutter: "-", tone: "removed" },
  gap: { gutter: "", tone: "gap" },
};

const toneStyle: Record<Tone, { icon: string; className: string }> = {
  good: { icon: "✓", className: "bg-emerald-400/15 text-emerald-300" },
  warn: { icon: "~", className: "bg-amber-400/15 text-amber-300" },
  bad: { icon: "!", className: "bg-rose-400/15 text-rose-300" },
};

function headline(correct: boolean, passed: boolean, score: number, run: RunRecord): { text: string; tone: Tone } {
  if (!correct) return { text: "سریع‌تر شد، ولی یه چیزی خراب شد", tone: "bad" };
  if (passed && run.firstPass) return { text: "تیکت بسته شد", tone: "good" };
  if (passed) return { text: score >= 100 ? "بهترین نتیجه‌ی ممکن" : "هدف برآورده شده", tone: "good" };
  if (run.direction === "down") return { text: "بهتر شد، ولی هنوز به هدف نرسیده", tone: "warn" };
  if (run.direction === "same") return { text: "تقریباً هیچ تغییری نکرد", tone: "warn" };
  return { text: "کندتر شد", tone: "bad" };
}

function SheetSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h4 className="mb-2 text-sm font-bold text-slate-200">{title}</h4>
      {children}
    </section>
  );
}

export default function ResultSheet({
  level,
  run,
  onClose,
  onShowApp,
  onShowAnalysis,
}: {
  level: PlayableLevel;
  run: RunRecord;
  onClose: () => void;
  onShowApp: () => void;
  onShowAnalysis: () => void;
}) {
  const sheetRef = useDialogBehavior(onClose);
  const { simulatorModel, primaryMetric } = level;
  const before = simulatorModel.evaluate(run.previous);
  const result = scoreConfig(level, run.config);
  const after = result.evaluation;
  const passed = result.passed && after.correct;
  const title = headline(after.correct, result.passed, result.score, run);
  const primaryTarget = level.targets.find((target) => target.metric === primaryMetric.key) ?? level.targets[0];
  const otherTargets = level.targets.filter((target) => target !== primaryTarget);
  const beforeValue = before.metrics[primaryMetric.key];
  const afterValue = after.metrics[primaryMetric.key];
  const reachedTarget = afterValue <= primaryTarget.max;
  const predictedRight = run.prediction === run.direction;
  const notes = simulatorModel.describeChange(run.previous, run.config);
  const diffLines: LabCodeLine[] = lineDiff(
    simulatorModel.buildCode(run.previous).map((line) => line.text),
    simulatorModel.buildCode(run.config).map((line) => line.text),
  ).map((line, index) => ({ id: String(index), text: line.text, ...diffStyle[line.operation] }));

  // Portaled to <body>: the shell's <main> is its own stacking context and would keep the dialog under the header.
  return createPortal(
    <div
      lang="fa"
      dir="rtl"
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 backdrop-blur-sm lg:items-center lg:p-6"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lab-sheet-title"
        tabIndex={-1}
        className="challenge-font flex max-h-[88vh] w-full max-w-2xl flex-col gap-5 overflow-y-auto rounded-t-3xl border border-b-0 border-slate-700/50 bg-slate-900 px-5 pt-1 text-slate-100 shadow-2xl shadow-black/50 outline-none [scrollbar-width:thin] motion-safe:animate-[lab-sheet-up_0.3s_cubic-bezier(0.2,0.8,0.2,1)] sm:px-7 lg:max-h-[85vh] lg:rounded-3xl lg:border-b lg:pt-7 lg:motion-safe:animate-[lab-dialog-in_0.22s_cubic-bezier(0.2,0.8,0.2,1)]"
      >
        <div aria-hidden="true" className="mx-auto mt-2 h-1 w-11 shrink-0 rounded-full bg-slate-700 lg:hidden" />
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className={`grid size-8 shrink-0 place-items-center rounded-full font-black ${toneStyle[title.tone].className}`}>
            {toneStyle[title.tone].icon}
          </span>
          <h3 id="lab-sheet-title" className="text-lg font-black text-white text-balance">{title.text}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="بستن"
            className="mr-auto hidden size-9 shrink-0 place-items-center rounded-xl text-slate-400 transition hover:bg-white/5 hover:text-white lg:grid"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <div className="rounded-2xl bg-slate-950/50 px-4 py-3">
          <div className="text-xs text-slate-400">{primaryMetric.label}</div>
          <div className="my-0.5 flex flex-wrap items-baseline gap-3">
            <Num className="text-base text-slate-500 line-through">{formatMs(beforeValue)}</Num>
            <span aria-hidden="true" className="text-slate-600">←</span>
            <Num className={`text-3xl font-black ${reachedTarget && after.correct ? "text-emerald-300" : "text-rose-300"}`}>
              {formatMs(afterValue)}
            </Num>
          </div>
          <div className="text-xs text-slate-400">
            هدف ≤ <Num>{formatMs(primaryTarget.max)}</Num> · {reachedTarget ? "رسید" : "هنوز نرسیده"}
          </div>
          {otherTargets.map((target) => {
            const value = after.metrics[target.metric];
            return (
              <div key={target.metric} className="text-xs text-slate-400">
                {target.label}: <Num>{formatMs(before.metrics[target.metric])} ← {formatMs(value)}</Num> ·{" "}
                {value <= target.max ? "رسید" : <span className="text-rose-300">بیشتر از <Num>{formatMs(target.max)}</Num></span>}
              </div>
            );
          })}
        </div>

        {after.correct && (
          <ScoreMeter
            score={result.score}
            suffix={result.passed && result.score < 100 && <> · هنوز حدود <Num>{formatNumber(100 - result.score)}٪</Num> جا داره</>}
          />
        )}

        {!after.correct && (
          <SheetSection title="چی خراب شد">
            <FailedChecks checks={level.checks} results={after.checks} />
          </SheetSection>
        )}

        <SheetSection title="چه تغییری دادی">
          <LabCode lines={diffLines} label="تغییرات کد" />
        </SheetSection>

        <SheetSection title="چه اتفاقی افتاد">
          <ul className="flex list-disc flex-col gap-1 pr-5 text-sm leading-7 text-slate-300 marker:text-slate-600">
            {notes.map((note) => (
              <li key={note}>
                <InlineCode text={note} />
              </li>
            ))}
            {result.wastedComplexity > 0 && after.correct && (
              <li>بعضی از تغییرهات اثری روی {primaryMetric.label} نداشتن و فقط کد رو پیچیده‌تر کردن.</li>
            )}
          </ul>
        </SheetSection>

        <p className="border-t border-dashed border-slate-700 pt-3 text-sm text-slate-400">
          {predictedRight && <span className="font-black text-emerald-300">✓ </span>}
          پیش‌بینی کردی <b className="text-slate-100">{predictionLabel[run.prediction]}</b>.{" "}
          {predictedRight ? "درست بود." : `ولی ${predictionLabel[run.direction]}. به بخش «چه اتفاقی افتاد» دقت کن.`}
        </p>

        <div className="sticky bottom-0 -mx-5 flex flex-wrap gap-2 border-t border-slate-800 bg-slate-900 px-5 pb-[calc(1rem+env(safe-area-inset-bottom,0px))] pt-3 sm:-mx-7 sm:px-7 lg:pb-5">
          <button type="button" onClick={onShowApp} className={`${primaryButtonClass} flex-1`}>
            {passed ? "تو اپ امتحانش کن" : "تو اپ ببین"}
          </button>
          <button type="button" onClick={onShowAnalysis} className={secondaryButtonClass}>تحلیل کامل</button>
          <button type="button" onClick={onClose} className={quietButtonClass}>بستن</button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
