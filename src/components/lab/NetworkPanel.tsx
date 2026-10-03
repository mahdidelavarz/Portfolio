import { Fragment } from "react";
import { formatMs } from "@/lib/lab/format";
import type { NetworkDetails } from "@/lib/lab/types";
import { toPercent, type ChartSpotlight } from "./chartTypes";
import Num from "./Num";
import { spotlightRingClass } from "./styles";

const SCALE_MS = 3000;
const AXIS_MARKS = [0, 1000, 2000, 3000];
const RENDER_BAR_MS = 60;

const trackClass = "relative h-5 rounded bg-slate-950/70";
const labelClass = "truncate pr-2 font-code text-slate-400";

export default function NetworkPanel({
  details,
  caption,
  targetMs,
  spotlight,
}: {
  details: NetworkDetails;
  caption: string;
  targetMs: number;
  spotlight: ChartSpotlight | null;
}) {
  const late = details.ready > targetMs;

  return (
    <div>
      <div className="mb-2 flex justify-between gap-2 text-xs text-slate-400">
        <span>{caption}</span>
        <span>
          محصولات در <b className="text-slate-100"><Num>{formatMs(details.ready)}</Num></b>
        </span>
      </div>
      <div dir="ltr" className="grid grid-cols-[92px_minmax(0,1fr)] items-center gap-y-1.5 text-[11.5px] sm:grid-cols-[118px_minmax(0,1fr)]">
        {details.requests.map((request) => {
          const isSpotlit = spotlight?.element === `request:${request.key}`;
          const critical = details.criticalPath.includes(request.key);
          return (
            <Fragment key={request.key}>
              <span className={labelClass}>{request.label}</span>
              <div className={`${trackClass} ${isSpotlit ? spotlightRingClass : ""}`} data-spotlight={isSpotlit ? "true" : undefined}>
                <span
                  className={`absolute inset-y-[3px] flex min-w-[3px] items-center justify-center overflow-hidden rounded-sm ${critical ? "bg-sky-500" : "bg-slate-600"}`}
                  style={{ left: toPercent(request.start, SCALE_MS), width: toPercent(request.duration, SCALE_MS) }}
                >
                  <span className="whitespace-nowrap px-1 font-code text-[10.5px] text-slate-950">{request.duration}</span>
                </span>
              </div>
            </Fragment>
          );
        })}
        <span className={labelClass}>render</span>
        <div className={trackClass}>
          <span
            className="absolute inset-y-[3px] min-w-[3px] rounded-sm bg-slate-400"
            style={{ left: toPercent(details.renderAt, SCALE_MS), width: toPercent(RENDER_BAR_MS, SCALE_MS) }}
          />
          <span
            aria-hidden="true"
            className="absolute inset-y-0 border-l border-dashed border-emerald-400/80"
            style={{ left: toPercent(targetMs, SCALE_MS) }}
          />
          <span
            aria-hidden="true"
            className={`absolute -inset-y-0.5 w-0.5 rounded ${late ? "bg-rose-400" : "bg-emerald-400"}`}
            style={{ left: toPercent(details.ready, SCALE_MS) }}
          />
        </div>
        <span />
        <div className="relative mt-0.5 h-4">
          {AXIS_MARKS.map((mark) => (
            <span
              key={mark}
              className="absolute -translate-x-1/2 font-code text-[10px] text-slate-500"
              style={{ left: toPercent(mark, SCALE_MS) }}
            >
              {mark}ms
            </span>
          ))}
        </div>
      </div>
      {spotlight?.element.startsWith("request:") && spotlight.callout}
    </div>
  );
}
