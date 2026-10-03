import { formatMs, padTicketNumber } from "@/lib/lab/format";
import type { PlayableLevel } from "@/lib/lab/playable";
import type { LevelProgress } from "./labStorage";
import Num from "./Num";
import { cardClass, primaryButtonClass, secondaryButtonClass } from "./styles";

export function TicketHeading({ number, title, solved }: { number: number; title: string; solved: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <span dir="ltr" className="rounded-lg border border-slate-700 bg-slate-950/60 px-2 py-0.5 font-code text-xs text-slate-400">
        #{padTicketNumber(number)}
      </span>
      <span
        className={`rounded-full border px-2.5 py-0.5 text-xs font-bold ${
          solved
            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
            : "border-amber-500/30 bg-amber-500/10 text-amber-300"
        }`}
      >
        {solved ? "بسته شد" : "باز"}
      </span>
      <h2 className="basis-full text-xl font-black leading-9 text-white text-balance sm:text-2xl">{title}</h2>
    </div>
  );
}

function TargetRow({ label, max, current }: { label: string; max: number; current: number }) {
  const met = current <= max;
  return (
    <li className="flex items-center justify-between gap-3 py-2.5">
      <span className="text-sm text-slate-300">
        {label}
        <span className="block text-xs text-slate-500">
          هدف ≤ <Num>{formatMs(max)}</Num>
        </span>
      </span>
      <span
        className={`shrink-0 rounded-xl px-3 py-1.5 text-sm font-black ${met ? "bg-emerald-400/10 text-emerald-300" : "bg-rose-400/10 text-rose-300"}`}
      >
        <Num>{formatMs(current)}</Num>
      </span>
    </li>
  );
}

export default function TicketCard({
  level,
  progress,
  onReproduce,
}: {
  level: PlayableLevel;
  progress: LevelProgress;
  onReproduce: () => void;
}) {
  const evaluation = level.simulatorModel.evaluate(progress.applied);

  return (
    <section className={cardClass} aria-labelledby="lab-ticket-title">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-10">
        <div id="lab-ticket-title" className="flex flex-col gap-5">
          <TicketHeading number={level.number} title={level.title} solved={progress.solved} />
          <figure className="flex gap-3">
            <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-full border border-slate-700 bg-slate-950/60 text-sm font-black text-cyan-300">
              {level.reporter.initials}
            </span>
            <div className="min-w-0 flex-1 rounded-2xl rounded-tr-sm border border-slate-700/50 bg-slate-950/50 px-4 py-3">
              <figcaption className="mb-1 text-xs font-bold text-slate-400">{level.reporter.name}</figcaption>
              <blockquote className="max-w-prose text-sm leading-7 text-slate-200 sm:text-[15px] sm:leading-8">{level.report}</blockquote>
            </div>
          </figure>
        </div>

        <div className="flex flex-col rounded-2xl border border-slate-700/50 bg-slate-950/40 p-4 sm:p-5">
          <h3 className="text-xs font-bold text-slate-400">معیار بسته شدن تیکت</h3>
          <ul className="divide-y divide-slate-800">
            {level.targets.map((target) => (
              <TargetRow key={target.metric} label={target.label} max={target.max} current={evaluation.metrics[target.metric]} />
            ))}
          </ul>
          <p className="mt-1 border-t border-dashed border-slate-700/60 pt-3 text-xs leading-6 text-slate-400">
            <b className="font-bold text-slate-300">شرط: </b>
            {level.constraint}
          </p>
          <button
            type="button"
            onClick={onReproduce}
            className={`${progress.reproduced ? secondaryButtonClass : primaryButtonClass} mt-4 w-full py-3`}
          >
            {progress.reproduced ? "دوباره تو اپ ببین" : "بازتولید مشکل"}
          </button>
          {!progress.reproduced && <span className="mt-2 text-center text-xs text-slate-500">اول خودت ببین تو اپ چی اتفاق می‌افته.</span>}
        </div>
      </div>
    </section>
  );
}
