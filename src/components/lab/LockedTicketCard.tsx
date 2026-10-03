import type { LockedLabLevel } from "@/data/lab-validator";
import { padTicketNumber } from "@/lib/lab/format";
import type { PlayableLevel } from "@/lib/lab/playable";
import { cardClass, secondaryButtonClass } from "./styles";
import { TicketHeading } from "./TicketCard";

export default function LockedTicketCard({
  level,
  playable,
  onSelect,
}: {
  level: LockedLabLevel;
  playable: PlayableLevel[];
  onSelect: (levelId: string) => void;
}) {
  return (
    <section className={cardClass}>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-10">
        <div className="flex flex-col gap-4">
          <TicketHeading number={level.number} title={level.title} solved={false} />
          <p className="max-w-prose text-sm leading-7 text-slate-400">{level.summary}</p>
        </div>
        <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/40 p-4 sm:p-5">
          <p className="mb-3 text-sm text-slate-300">این تیکت هنوز قابل حل نیست. یکی از تیکت‌های فعال رو باز کن:</p>
          <div className="flex flex-col gap-2">
            {playable.map((item) => (
              <button key={item.id} type="button" onClick={() => onSelect(item.id)} className={`${secondaryButtonClass} text-right`}>
                <span dir="ltr" className="ml-2 font-code text-slate-500">#{padTicketNumber(item.number)}</span>
                {item.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
