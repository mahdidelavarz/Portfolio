import type { Direction } from "@/lib/lab/types";
import { optionClass, primaryButtonClass } from "./styles";

const PREDICTIONS: Array<{ value: Direction; label: string }> = [
  { value: "down", label: "کمتر" },
  { value: "same", label: "بدون تغییر" },
  { value: "up", label: "بیشتر" },
];

export default function RunBar({
  metricLabel,
  prediction,
  message,
  onPredict,
  onRun,
}: {
  metricLabel: string;
  prediction: Direction | null;
  message: string | null;
  onPredict: (prediction: Direction) => void;
  onRun: () => void;
}) {
  return (
    <div className="sticky bottom-[calc(4.25rem+env(safe-area-inset-bottom,0px))] z-30 flex flex-col gap-2.5 rounded-3xl border border-slate-700/50 bg-slate-900/95 p-3.5 shadow-2xl shadow-black/40 backdrop-blur-xl sm:gap-3 sm:p-5 lg:bottom-4">
      <p id="lab-prediction-question" className="text-sm text-slate-300">
        پیش‌بینی: <b className="text-white">{metricLabel}</b> بعد از این تغییر چی می‌شه؟
      </p>
      <div role="radiogroup" aria-labelledby="lab-prediction-question" className="grid grid-cols-3 gap-2">
        {PREDICTIONS.map((item) => (
          <button
            key={item.value}
            type="button"
            role="radio"
            aria-checked={prediction === item.value}
            onClick={() => onPredict(item.value)}
            className={`${optionClass(prediction === item.value)} text-center`}
          >
            {item.label}
          </button>
        ))}
      </div>
      {message && (
        <p role="alert" className="text-xs text-rose-300">
          {message}
        </p>
      )}
      <button type="button" onClick={onRun} disabled={!prediction} className={`${primaryButtonClass} w-full py-3.5`}>
        اجرای کد
      </button>
    </div>
  );
}
