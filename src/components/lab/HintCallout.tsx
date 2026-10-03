import { formatNumber } from "@/lib/lab/format";
import InlineCode from "./InlineCode";
import Num from "./Num";

export default function HintCallout({
  index,
  text,
  onDismiss,
}: {
  index: number;
  text: string;
  onDismiss: () => void;
}) {
  return (
    <div
      dir="rtl"
      role="note"
      className="challenge-font mx-2.5 my-2 flex flex-col items-start gap-2 rounded-2xl border border-amber-400/60 bg-amber-400/10 px-4 py-3 text-right text-sm leading-7 text-slate-100 whitespace-normal motion-safe:animate-[lab-pop_0.25s_ease-out]"
    >
      <span className="text-xs font-black text-amber-300">
        راهنمایی <Num>{formatNumber(index + 1)}</Num>
      </span>
      <p>
        <InlineCode text={text} />
      </p>
      <button
        type="button"
        onClick={onDismiss}
        className="rounded-lg border border-amber-400/30 px-3 py-1 text-xs font-bold text-amber-200 transition hover:bg-amber-400/10"
      >
        فهمیدم
      </button>
    </div>
  );
}
