"use client";

import { useRef } from "react";
import { formatMs } from "@/lib/lab/format";
import { scoreConfig, type PlayableLevel } from "@/lib/lab/playable";
import type { ChartSpotlight } from "./chartTypes";
import FailedChecks from "./FailedChecks";
import HintCallout from "./HintCallout";
import type { LevelProgress } from "./labStorage";
import LevelChart, { threadScale } from "./LevelChart";
import Num from "./Num";
import ScoreMeter from "./ScoreMeter";
import { cardClass, quietButtonClass } from "./styles";
import { ThreadLegend } from "./ThreadPanel";
import type { LabUiState } from "./useLabState";
import { useSpotlightScroll } from "./useSpotlightScroll";

function CurrentState({ level, progress, spotlight }: { level: PlayableLevel; progress: LevelProgress; spotlight: ChartSpotlight | null }) {
  const evaluation = level.simulatorModel.evaluate(progress.applied);
  return (
    <section className={cardClass}>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-base font-black text-white">{level.analysis.title}</h3>
        <span className="text-xs text-slate-500">کد فعلی</span>
      </div>
      <LevelChart
        evaluation={evaluation}
        caption="وضعیت فعلی"
        targetMs={level.targets[0].max}
        scale={threadScale([evaluation])}
        spotlight={spotlight}
      />
      {level.simulatorModel.analysis === "thread" && <ThreadLegend />}
      <p className="mt-3 text-sm leading-7 text-slate-400">{level.analysis.lead}</p>
    </section>
  );
}

function LatestRun({
  level,
  progress,
  spotlight,
  onOpenSheet,
}: {
  level: PlayableLevel;
  progress: LevelProgress;
  spotlight: ChartSpotlight | null;
  onOpenSheet: () => void;
}) {
  const run = progress.runs[progress.runs.length - 1];
  const before = level.simulatorModel.evaluate(run.previous);
  const result = scoreConfig(level, run.config);
  const after = result.evaluation;
  const scale = threadScale([before, after]);

  return (
    <>
      <section className={cardClass}>
        <div className="mb-4 flex items-baseline justify-between gap-2">
          <h3 className="text-base font-black text-white">آخرین اجرا</h3>
          <button type="button" onClick={onOpenSheet} className={quietButtonClass}>خلاصه‌ی نتیجه</button>
        </div>
        <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
          {level.targets.map((target) => {
            const value = after.metrics[target.metric];
            return (
              <div key={target.metric}>
                <div className="text-xs text-slate-400">{target.label}</div>
                <div className={`text-2xl font-black ${value <= target.max ? "text-emerald-300" : "text-rose-300"}`}>
                  <Num>{formatMs(value)}</Num>
                </div>
                <div className="text-xs text-slate-500">
                  قبل <Num>{formatMs(before.metrics[target.metric])}</Num>
                </div>
              </div>
            );
          })}
          <ScoreMeter score={result.score} />
        </div>
        <div className="mt-4">
          <FailedChecks checks={level.checks} results={after.checks} />
        </div>
      </section>
      <section className={`${cardClass} flex flex-col gap-5`}>
        <h3 className="text-base font-black text-white">{level.analysis.title}</h3>
        <LevelChart evaluation={before} caption="قبل" targetMs={level.targets[0].max} scale={scale} spotlight={spotlight} />
        <LevelChart evaluation={after} caption="بعد" targetMs={level.targets[0].max} scale={scale} spotlight={null} />
        {level.simulatorModel.analysis === "thread" && <ThreadLegend />}
      </section>
    </>
  );
}

export default function AnalysisPane({
  level,
  progress,
  ui,
  debrief,
  onOpenSheet,
  onDismissHint,
}: {
  level: PlayableLevel;
  progress: LevelProgress;
  ui: LabUiState;
  debrief: React.ReactNode;
  onOpenSheet: () => void;
  onDismissHint: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hintIndex = ui.spotlightHint;
  const hint = hintIndex !== null ? level.hints[hintIndex] : null;
  const spotlight: ChartSpotlight | null =
    hint?.tab === "analysis" && hintIndex !== null
      ? { element: hint.chartElement, callout: <HintCallout index={hintIndex} text={hint.text} onDismiss={onDismissHint} /> }
      : null;

  useSpotlightScroll(containerRef, spotlight ? `analysis-${hintIndex}` : null);

  return (
    <div ref={containerRef} className="flex flex-col gap-4">
      {progress.runs.length ? (
        <LatestRun level={level} progress={progress} spotlight={spotlight} onOpenSheet={onOpenSheet} />
      ) : (
        <CurrentState level={level} progress={progress} spotlight={spotlight} />
      )}
      {progress.solved && debrief}
    </div>
  );
}
