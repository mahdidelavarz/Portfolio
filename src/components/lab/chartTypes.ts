import type { SegmentKind } from "@/lib/lab/types";

/** Where a hint points inside a chart, and what to show next to it. */
export interface ChartSpotlight {
  element: string;
  callout: React.ReactNode;
}

export const segmentColor: Record<SegmentKind, string> = {
  event: "bg-slate-500",
  input: "bg-slate-500",
  filter: "bg-sky-500",
  stats: "bg-rose-500",
  cache: "bg-emerald-500",
  render: "bg-slate-400",
  effect: "bg-amber-500",
};

export function toPercent(value: number, scale: number): string {
  return `${((value / scale) * 100).toFixed(3)}%`;
}
