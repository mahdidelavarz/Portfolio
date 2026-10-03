import type { Evaluation } from "@/lib/lab/types";
import type { ChartSpotlight } from "./chartTypes";
import NetworkPanel from "./NetworkPanel";
import RenderPanel from "./RenderPanel";
import ThreadPanel from "./ThreadPanel";

const THREAD_MIN_SCALE_MS = 1000;
const THREAD_TAIL_MS = 40;

/** A shared time scale for thread charts shown side by side. */
export function threadScale(evaluations: Evaluation[]): number {
  const ends = evaluations.flatMap((evaluation) => {
    if (evaluation.details.kind !== "thread") return [];
    const last = evaluation.details.tasks[evaluation.details.tasks.length - 1];
    return [last.start + last.duration + THREAD_TAIL_MS];
  });
  return Math.max(THREAD_MIN_SCALE_MS, ...ends);
}

export default function LevelChart({
  evaluation,
  caption,
  targetMs,
  scale,
  spotlight,
}: {
  evaluation: Evaluation;
  caption: string;
  targetMs: number;
  scale: number;
  spotlight: ChartSpotlight | null;
}) {
  const { details, metrics } = evaluation;
  switch (details.kind) {
    case "network":
      return <NetworkPanel details={details} caption={caption} targetMs={targetMs} spotlight={spotlight} />;
    case "thread":
      return <ThreadPanel details={details} metrics={metrics} caption={caption} scale={scale} spotlight={spotlight} />;
    case "renders":
      return <RenderPanel details={details} metrics={metrics} caption={caption} spotlight={spotlight} />;
  }
}
