"use client";

import { useMemo, useRef } from "react";
import { isFieldVisible } from "@/lib/lab/engine";
import type { PlayableLevel } from "@/lib/lab/playable";
import type { ConfigValue, Direction } from "@/lib/lab/types";
import HintCallout from "./HintCallout";
import LabCode, { type LabCodeLine } from "./LabCode";
import type { LevelProgress } from "./labStorage";
import LineEditor from "./LineEditor";
import RunBar from "./RunBar";
import { cardClass } from "./styles";
import type { LabUiState } from "./useLabState";
import { useSpotlightScroll } from "./useSpotlightScroll";

export default function CodePane({
  level,
  progress,
  ui,
  onToggleLine,
  onFieldChange,
  onPredict,
  onRun,
  onDismissHint,
}: {
  level: PlayableLevel;
  progress: LevelProgress;
  ui: LabUiState;
  onToggleLine: (key: string) => void;
  onFieldChange: (field: string, value: ConfigValue) => void;
  onPredict: (prediction: Direction) => void;
  onRun: () => void;
  onDismissHint: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { simulatorModel } = level;
  const baseTexts = useMemo(
    () => new Set(simulatorModel.buildCode(simulatorModel.defaults).map((line) => line.text)),
    [simulatorModel],
  );
  const code = simulatorModel.buildCode(progress.draft);
  const hint = ui.spotlightHint !== null ? level.hints[ui.spotlightHint] : null;
  const spotlightLines = hint?.tab === "code" ? hint.lines : [];
  const lastSpotlightIndex = code.reduce(
    (last, line, index) => (spotlightLines.includes(line.key) ? index : last),
    -1,
  );
  const fieldsForLine = (key: string) =>
    level.fields.filter((field) => field.lineKeys.includes(key) && isFieldVisible(field, progress.draft));

  const lines: LabCodeLine[] = code.map((line, index) => {
    const editable = fieldsForLine(line.key).length > 0;
    const changed = !baseTexts.has(line.text) && line.text.trim() !== "";
    return {
      id: `${index}-${line.key}`,
      lineKey: line.key,
      text: line.text,
      gutter: changed ? "+" : String(index + 1),
      tone: changed ? "changed" : "plain",
      editable,
      open: editable && ui.openLineKey === line.key,
      spotlight: spotlightLines.includes(line.key),
    };
  });

  useSpotlightScroll(containerRef, ui.spotlightHint === null ? null : `code-${ui.spotlightHint}`);

  const renderAfter = (index: number) => {
    const line = code[index];
    const isLastOfOpenGroup = lines[index].open && code[index + 1]?.key !== line.key;
    return (
      <>
        {isLastOfOpenGroup && (
          <LineEditor fields={fieldsForLine(line.key)} draft={progress.draft} onChange={onFieldChange} />
        )}
        {hint && index === lastSpotlightIndex && (
          <HintCallout index={ui.spotlightHint ?? 0} text={hint.text} onDismiss={onDismissHint} />
        )}
      </>
    );
  };

  return (
    <div ref={containerRef} className="flex flex-col gap-4">
      <section className={cardClass}>
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-base font-black text-white">کد</h3>
          <span className="text-xs text-slate-500">روی خطی بزن که فکر می‌کنی باید عوض بشه</span>
        </div>
        <LabCode
          lines={lines}
          label="کد قابل ویرایش"
          onActivate={(line) => line.lineKey && onToggleLine(line.lineKey)}
          renderAfter={renderAfter}
        />
        <p className="mt-3 text-xs leading-6 text-slate-500">
          <span aria-hidden="true" className="ml-1 inline-block size-1.5 rounded-full bg-cyan-400/50 align-middle" />
          خط‌هایی که نقطه دارن قابل تغییرن. خط‌های سبز با کد اول فرق دارن.
        </p>
      </section>
      <RunBar
        metricLabel={level.primaryMetric.label}
        prediction={ui.prediction}
        message={ui.message}
        onPredict={onPredict}
        onRun={onRun}
      />
    </div>
  );
}
