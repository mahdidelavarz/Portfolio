"use client";

import { useEffect, useRef, useState } from "react";
import type { LabLevel } from "@/data/lab-validator";
import { formatNumber, padTicketNumber } from "@/lib/lab/format";
import type { LevelProgress } from "./labStorage";
import Num from "./Num";

type TicketState = "solved" | "open" | "locked";

function ticketState(level: LabLevel, progress: LevelProgress | undefined): TicketState {
  if (level.status === "locked") return "locked";
  return progress?.solved ? "solved" : "open";
}

function cardClass(isCurrent: boolean, state: TicketState) {
  const base =
    "group flex w-44 shrink-0 snap-start flex-col gap-2 rounded-2xl border p-3.5 text-right transition lg:w-56 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300";
  if (isCurrent) return `${base} border-cyan-400/70 bg-cyan-400/10 shadow-lg shadow-cyan-500/10`;
  if (state === "locked") return `${base} border-slate-800 bg-slate-900/30 hover:border-slate-700`;
  return `${base} border-slate-700/50 bg-slate-800/40 hover:-translate-y-0.5 hover:border-cyan-400/30`;
}

const SCROLL_STEP = 0.8;

/** Tracks whether the row can scroll further toward its start or end (RTL-safe). */
function useScrollEdges(listRef: React.RefObject<HTMLOListElement | null>) {
  const [edges, setEdges] = useState({ atStart: true, atEnd: true });

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const update = () => {
      const position = Math.abs(list.scrollLeft);
      const max = list.scrollWidth - list.clientWidth;
      setEdges({ atStart: position <= 1, atEnd: position >= max - 1 });
    };
    update();
    list.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      list.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [listRef]);

  return edges;
}

function ScrollButton({ direction, disabled, onClick }: { direction: "start" | "end"; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "start" ? "تیکت‌های قبلی" : "تیکت‌های بعدی"}
      className="grid size-8 place-items-center rounded-xl border border-slate-700/60 bg-slate-900/60 text-slate-300 transition hover:border-cyan-400/40 hover:text-cyan-300 disabled:pointer-events-none disabled:opacity-30"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={direction === "start" ? "M9 6l6 6-6 6" : "M15 6l-6 6 6 6"} />
      </svg>
    </button>
  );
}

function StateBadge({ state, score }: { state: TicketState; score: number }) {
  if (state === "solved") {
    return (
      <span className="flex items-center gap-1 rounded-full bg-emerald-400/10 px-2 py-0.5 text-[11px] font-bold text-emerald-300">
        ✓ <Num>{formatNumber(score)}٪</Num>
      </span>
    );
  }
  if (state === "locked") {
    return (
      <span className="flex items-center gap-1 text-[11px] text-slate-500">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
        به‌زودی
      </span>
    );
  }
  return <span className="rounded-full bg-amber-400/10 px-2 py-0.5 text-[11px] font-bold text-amber-300">باز</span>;
}

export default function TicketRail({
  levels,
  currentLevelId,
  progress,
  onSelect,
}: {
  levels: LabLevel[];
  currentLevelId: string;
  progress: Record<string, LevelProgress>;
  onSelect: (levelId: string) => void;
}) {
  const solved = levels.filter((level) => progress[level.id]?.solved).length;
  const solvedPercent = (solved / levels.length) * 100;
  const listRef = useRef<HTMLOListElement>(null);
  const edges = useScrollEdges(listRef);

  useEffect(() => {
    const current = listRef.current?.querySelector<HTMLElement>("[aria-current='true']");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    current?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: reduceMotion ? "auto" : "smooth" });
  }, [currentLevelId]);

  // In RTL the row starts on the right, so moving toward the end means scrolling left.
  const scrollRow = (direction: "start" | "end") => {
    const list = listRef.current;
    if (!list) return;
    const step = list.clientWidth * SCROLL_STEP;
    list.scrollBy({ left: direction === "end" ? -step : step, behavior: "smooth" });
  };

  return (
    <nav aria-labelledby="lab-tickets-title">
      <div className="mb-3 flex items-center gap-4">
        <h2 id="lab-tickets-title" className="shrink-0 text-sm font-black text-slate-200">تیکت‌ها</h2>
        <div aria-hidden="true" className="h-1 flex-1 overflow-hidden rounded-full bg-slate-800">
          <i className="block h-full rounded-full bg-gradient-to-l from-emerald-400 to-cyan-400" style={{ width: `${solvedPercent}%` }} />
        </div>
        <span className="shrink-0 text-xs text-slate-400">
          <Num>{formatNumber(solved)}</Num> از <Num>{formatNumber(levels.length)}</Num> بسته شده
        </span>
        <div className="hidden shrink-0 gap-1.5 sm:flex">
          <ScrollButton direction="start" disabled={edges.atStart} onClick={() => scrollRow("start")} />
          <ScrollButton direction="end" disabled={edges.atEnd} onClick={() => scrollRow("end")} />
        </div>
      </div>
      <ol
        ref={listRef}
        className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-2.5 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 [mask-image:linear-gradient(to_left,transparent,#000_1rem,#000_calc(100%-1rem),transparent)] sm:[mask-image:linear-gradient(to_left,transparent,#000_1.5rem,#000_calc(100%-1.5rem),transparent)] [&::-webkit-scrollbar]:hidden"
      >
        {levels.map((level) => {
          const state = ticketState(level, progress[level.id]);
          const isCurrent = level.id === currentLevelId;
          return (
            <li key={level.id} className="flex">
              <button
                type="button"
                onClick={() => onSelect(level.id)}
                aria-current={isCurrent ? "true" : undefined}
                className={cardClass(isCurrent, state)}
              >
                <span className="flex items-center justify-between gap-2">
                  <span dir="ltr" className={`font-code text-xs ${isCurrent ? "text-cyan-300" : "text-slate-500"}`}>
                    #{padTicketNumber(level.number)}
                  </span>
                  <StateBadge state={state} score={progress[level.id]?.bestScore ?? 0} />
                </span>
                <span
                  className={`line-clamp-2 text-[13px] font-bold leading-6 ${
                    state === "locked" ? "text-slate-500" : isCurrent ? "text-white" : "text-slate-300 group-hover:text-white"
                  }`}
                >
                  {level.title}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
