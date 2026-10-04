import { formatMs } from "@/lib/lab/format";
import type { ThreadDetails, ThreadSegment } from "@/lib/lab/types";
import { segmentColor, toPercent, type ChartSpotlight } from "./chartTypes";
import Num from "./Num";
import { spotlightRingClass } from "./styles";

const AXIS_MARKS = [0, 200, 400, 600, 800, 1000];
const LONG_TASK_MS = 50;

function Segments({ segments }: { segments: ThreadSegment[] }) {
  return (
    <>
      {segments.map((segment, index) => (
        <i key={index} className={`block h-full min-w-px ${segmentColor[segment.kind]}`} style={{ flex: `${segment.ms} 0 0` }} />
      ))}
    </>
  );
}

export function ThreadLegend() {
  const items = [
    { label: "calculateStatistics", className: segmentColor.stats },
    { label: "کش", className: segmentColor.cache },
    { label: "فیلتر", className: segmentColor.filter },
    { label: "رندر", className: segmentColor.render },
    { label: "effect", className: segmentColor.effect },
    { label: "کار طولانی‌تر از ۵۰ms", className: "bg-transparent outline outline-2 outline-rose-400" },
  ];
  return (
    <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[11.5px] text-slate-400">
      {items.map((item) => (
        <span key={item.label} className="inline-flex items-center gap-1.5">
          <i aria-hidden="true" className={`inline-block size-2.5 rounded-sm ${item.className}`} />
          {item.label}
        </span>
      ))}
    </div>
  );
}

export default function ThreadPanel({
  details,
  metrics,
  caption,
  scale,
  spotlight,
}: {
  details: ThreadDetails;
  metrics: Record<string, number>;
  caption: string;
  scale: number;
  spotlight: ChartSpotlight | null;
}) {
  const initialTotal = details.initialSegments.reduce((total, segment) => total + segment.ms, 0);
  const spotlightFirstTask = spotlight?.element === "thread:first-task";

  return (
    <div>
      <div className="mb-2 flex flex-wrap justify-between gap-2 text-xs text-slate-400">
        <span>{caption}</span>
        <span>
          بدترین کلید <b className="text-slate-100"><Num>{formatMs(metrics.input)}</Num></b> · نتیجه بعد از توقف{" "}
          <b className="text-slate-100"><Num>{formatMs(metrics.results)}</Num></b>
        </span>
      </div>
      <div dir="ltr" className="text-[11.5px]">
        <div className="relative h-4">
          {details.keyTimes.map((time, index) => (
            <b key={index} className="absolute top-0 -translate-x-1/2 text-[11px] font-medium text-slate-400" style={{ left: toPercent(time, scale) }}>
              {details.keyLabels[index] === " " ? "␣" : details.keyLabels[index]}
            </b>
          ))}
        </div>
        <div className="relative h-[30px] rounded bg-slate-950/70">
          {details.tasks.map((task, index) => {
            const isSpotlit = spotlightFirstTask && index === 0;
            return (
              <div
                key={index}
                data-spotlight={isSpotlit ? "true" : undefined}
                className={`absolute inset-y-1 flex min-w-0.5 overflow-hidden rounded-sm ${task.duration > LONG_TASK_MS ? "outline outline-2 outline-offset-1 outline-rose-400" : ""} ${isSpotlit ? spotlightRingClass : ""}`}
                style={{ left: toPercent(task.start, scale), width: toPercent(task.duration, scale) }}
              >
                <Segments segments={task.segments} />
              </div>
            );
          })}
        </div>
        <div className="relative mt-0.5 h-4">
          {AXIS_MARKS.filter((mark) => mark <= scale).map((mark) => (
            <span key={mark} className="absolute -translate-x-1/2 font-code text-[10px] text-slate-500" style={{ left: toPercent(mark, scale) }}>
              {mark}ms
            </span>
          ))}
        </div>
        <div dir="rtl" className="mb-1 mt-2 flex justify-between text-xs text-slate-400">
          <span>اولین رندر صفحه</span>
          <Num>{formatMs(initialTotal)}</Num>
        </div>
        <div className="relative h-[18px] rounded bg-slate-950/70">
          <div className="absolute inset-y-1 left-0 flex overflow-hidden rounded-sm" style={{ width: toPercent(Math.min(initialTotal, scale), scale) }}>
            <Segments segments={details.initialSegments} />
          </div>
        </div>
      </div>
      {spotlightFirstTask && spotlight.callout}
    </div>
  );
}
