import { formatNumber } from "@/lib/lab/format";
import Num from "./Num";

export default function ScoreMeter({ score, suffix }: { score: number; suffix?: React.ReactNode }) {
  const full = score >= 100;
  return (
    <div className="min-w-44 flex-1">
      <div className="text-xs text-slate-400">
        بهینگی <b className="text-slate-100"><Num>{formatNumber(score)}٪</Num></b>
        {suffix}
      </div>
      <div
        role="meter"
        aria-label="بهینگی"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={score}
        className="mt-1.5 h-2 overflow-hidden rounded-full border border-slate-700/60 bg-slate-950/70"
      >
        <i
          className={`block h-full rounded-full transition-[width] duration-700 ease-out ${full ? "bg-emerald-400" : "bg-gradient-to-l from-cyan-400 to-blue-500"}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}
