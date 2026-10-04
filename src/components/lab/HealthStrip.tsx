import { formatMs } from "@/lib/lab/format";
import type { PlayableLevel } from "@/lib/lab/playable";
import type { LevelProgress } from "./labStorage";
import Num from "./Num";

function HealthMetric({ level, progress }: { level: PlayableLevel; progress: LevelProgress | undefined }) {
  const config = progress?.applied ?? level.simulatorModel.defaults;
  const evaluation = level.simulatorModel.evaluate(config);
  const key = level.primaryMetric.key;
  const target = level.targets.find((item) => item.metric === key);
  const healthy = evaluation.correct && target !== undefined && evaluation.metrics[key] <= target.max;

  return (
    <li className="flex shrink-0 items-center gap-2.5 px-4 py-2.5">
      <span aria-hidden="true" className="relative flex size-2">
        {!healthy && <span className="absolute inline-flex size-full rounded-full bg-rose-400 opacity-60 motion-safe:animate-ping" />}
        <span className={`relative inline-flex size-2 rounded-full ${healthy ? "bg-emerald-400" : "bg-rose-400"}`} />
      </span>
      <span className="text-xs text-slate-400">{level.healthLabel}</span>
      <b className={`text-sm font-black ${healthy ? "text-emerald-300" : "text-slate-100"}`}>
        <Num>{formatMs(evaluation.metrics[key])}</Num>
      </b>
      <span className="sr-only">{healthy ? "سالم" : "مشکل دارد"}</span>
    </li>
  );
}

/** Live status of the shop: one metric per playable ticket, using the code last run for it. */
export default function HealthStrip({
  playable,
  progress,
}: {
  playable: PlayableLevel[];
  progress: Record<string, LevelProgress>;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <span className="text-[11px] text-slate-500">وضعیت اپ</span>
      <ul
        aria-label="وضعیت اپ"
        className="flex divide-x divide-x-reverse divide-slate-700/60 overflow-x-auto rounded-2xl border border-slate-700/50 bg-slate-900/60 [scrollbar-width:none]"
      >
        {playable.map((level) => (
          <HealthMetric key={level.id} level={level} progress={progress[level.id]} />
        ))}
      </ul>
    </div>
  );
}
