import { formatMs, formatNumber } from "@/lib/lab/format";
import { countRenderReasons } from "@/lib/lab/simulators/renderStorm";
import type { CardState, RenderDetails } from "@/lib/lab/types";
import type { ChartSpotlight } from "./chartTypes";
import Num from "./Num";
import { spotlightRingClass } from "./styles";

const cellClass: Record<CardState, string> = {
  clicked: "border-transparent bg-sky-500",
  rendered: "border-transparent bg-rose-500",
  skipped: "border-slate-700 bg-slate-950/70",
  hidden: "border-dashed border-slate-700 bg-transparent opacity-25",
};

export default function RenderPanel({
  details,
  metrics,
  caption,
  spotlight,
}: {
  details: RenderDetails;
  metrics: Record<string, number>;
  caption: string;
  spotlight: ChartSpotlight | null;
}) {
  const isSpotlit = spotlight?.element === "render:cells";
  const reasons = countRenderReasons(details.cards);
  const skipped = details.cards.filter((card) => card.state === "skipped").length;

  return (
    <div>
      <div className="mb-2 flex justify-between gap-2 text-xs text-slate-400">
        <span>{caption}</span>
        <span>
          <Num>{formatNumber(details.renderedCount)}</Num> رندر ·{" "}
          <b className="text-slate-100"><Num>{formatMs(metrics.click)}</Num></b>
        </span>
      </div>
      <div
        dir="ltr"
        data-spotlight={isSpotlit ? "true" : undefined}
        className={`grid grid-cols-10 gap-[3px] sm:grid-cols-15 ${isSpotlit ? spotlightRingClass : ""}`}
      >
        {details.cards.map((card, index) => (
          <span key={index} title={card.reason} className={`aspect-square rounded-[3px] border ${cellClass[card.state]}`} />
        ))}
      </div>
      {isSpotlit && spotlight.callout}
      <ul className="mt-3 flex flex-col gap-0.5 text-xs text-slate-400">
        <li>
          <b className="text-slate-100"><Num>{formatNumber(1)}</Num></b> کارتی که کلیک شد (inCart عوض شد)
        </li>
        {reasons.map((item) => (
          <li key={item.reason}>
            <b className="text-slate-100"><Num>{formatNumber(item.count)}</Num></b> کارت: {item.reason}
          </li>
        ))}
        {skipped > 0 && (
          <li>
            <b className="text-slate-100"><Num>{formatNumber(skipped)}</Num></b> کارت: رد شد، propها یکسان بودن
          </li>
        )}
      </ul>
    </div>
  );
}
