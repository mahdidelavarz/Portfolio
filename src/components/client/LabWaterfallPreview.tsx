"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import type { NetworkDetails } from "@/lib/lab/types";

const SCALE_MS = 3000;
const AXIS_MARKS = [0, 1000, 2000, 3000];
const RENDER_BAR_MS = 60;
const HOLD_MS = 2800;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const toPercent = (value: number) => `${((value / SCALE_MS) * 100).toFixed(3)}%`;
const formatMs = (value: number) => `${Math.round(value).toLocaleString("en-US")}ms`;

const barMotion = "transition-[left,width,opacity,background-color] duration-700 ease-out";
const trackClass = "relative h-5 rounded bg-slate-950/70";
const labelClass = "truncate pr-2 font-mono text-slate-400";

function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
}

/**
 * One waterfall chart. Rows always follow `rows`, so a request that is gone in
 * `details` (prices folded into /products) shrinks away instead of jumping.
 */
function Waterfall({
  rows,
  details,
  targetMs,
  label,
}: {
  rows: NetworkDetails["requests"];
  details: NetworkDetails;
  targetMs: number;
  label: string;
}) {
  const current = new Map(details.requests.map((request) => [request.key, request]));
  const late = details.ready > targetMs;

  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${late ? "border-rose-400/25 bg-rose-400/10 text-rose-300" : "border-emerald-400/25 bg-emerald-400/10 text-emerald-300"}`}>
          {label}
        </span>
        <span className="text-xs text-slate-400">
          products ready in{" "}
          <b className={`text-base tabular-nums ${late ? "text-rose-300" : "text-emerald-300"}`}>{formatMs(details.ready)}</b>
        </span>
      </div>
      <div className="grid grid-cols-[104px_minmax(0,1fr)] items-center gap-y-1.5 text-[11.5px] sm:grid-cols-[132px_minmax(0,1fr)]">
        {rows.map((row) => {
          const request = current.get(row.key);
          const critical = details.criticalPath.includes(row.key);
          return (
            <div key={row.key} className="contents">
              <span className={`${labelClass} transition-opacity duration-700 ${request ? "" : "opacity-30"}`}>
                {(request ?? row).label}
              </span>
              <div className={trackClass}>
                <span
                  className={`absolute inset-y-[3px] flex items-center justify-center overflow-hidden rounded-sm ${barMotion} ${critical ? "bg-sky-500" : "bg-slate-600"} ${request ? "opacity-100" : "opacity-0"}`}
                  style={{
                    left: toPercent((request ?? row).start),
                    width: request ? toPercent(request.duration) : "0%",
                  }}
                >
                  <span className="whitespace-nowrap px-1 font-mono text-[10.5px] text-slate-950">{request?.duration}</span>
                </span>
              </div>
            </div>
          );
        })}
        <span className={labelClass}>render</span>
        <div className={trackClass}>
          <span
            className={`absolute inset-y-[3px] min-w-[3px] rounded-sm bg-slate-400 ${barMotion}`}
            style={{ left: toPercent(details.renderAt), width: toPercent(RENDER_BAR_MS) }}
          />
          <span className="absolute inset-y-0 border-l border-dashed border-emerald-400/80" style={{ left: toPercent(targetMs) }} />
          <span
            className={`absolute -inset-y-0.5 w-0.5 rounded ${barMotion} ${late ? "bg-rose-400" : "bg-emerald-400"}`}
            style={{ left: toPercent(details.ready) }}
          />
        </div>
        <span />
        <div className="relative mt-0.5 h-4">
          {AXIS_MARKS.map((mark) => (
            <span key={mark} className="absolute -translate-x-1/2 font-mono text-[10px] text-slate-500 first:translate-x-0 last:-translate-x-full" style={{ left: toPercent(mark) }}>
              {mark}ms
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * The lab's first ticket in miniature: the same request waterfall, switching
 * between the code as shipped and the best fix. Numbers come from the lab's
 * simulator. With reduced motion both states are shown side by side in time.
 */
export default function LabWaterfallPreview({
  before,
  after,
  targetMs,
}: {
  before: NetworkDetails;
  after: NetworkDetails;
  targetMs: number;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const [fixed, setFixed] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setInterval(() => setFixed((value) => !value), HOLD_MS);
    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  const summary = `Request waterfall of a product page: ${formatMs(before.ready)} before the fix, ${formatMs(after.ready)} after.`;

  return (
    <figure className="rounded-2xl border border-slate-700/50 bg-slate-800/40 p-5 text-left backdrop-blur-xl sm:p-6">
      <figcaption className="mb-5 flex items-center justify-between gap-3 border-b border-slate-700/50 pb-4">
        <span className="font-mono text-xs text-slate-400">loadProductsPage()</span>
        <span className="text-xs text-slate-500">target ≤ {formatMs(targetMs)}</span>
      </figcaption>
      <p className="sr-only">{summary}</p>
      <div aria-hidden="true" className="flex flex-col gap-7">
        {reducedMotion ? (
          <>
            <Waterfall rows={before.requests} details={before} targetMs={targetMs} label="Before" />
            <Waterfall rows={before.requests} details={after} targetMs={targetMs} label="After" />
          </>
        ) : (
          <Waterfall
            rows={before.requests}
            details={fixed ? after : before}
            targetMs={targetMs}
            label={fixed ? "After the fix" : "Before"}
          />
        )}
      </div>
    </figure>
  );
}
