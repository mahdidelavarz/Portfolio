import type { LabCheck } from "@/data/lab-validator";
import type { CheckResult } from "@/lib/lab/types";
import InlineCode from "./InlineCode";

export default function FailedChecks({ checks, results }: { checks: LabCheck[]; results: CheckResult[] }) {
  const failed = results
    .filter((result) => !result.passed)
    .flatMap((result) => checks.filter((check) => check.id === result.id));
  if (!failed.length) return null;

  return (
    <ul className="flex flex-col gap-2 text-sm">
      {failed.map((check) => (
        <li key={check.id} className="flex items-start gap-2">
          <span aria-hidden="true" className="mt-1 grid size-[18px] shrink-0 place-items-center rounded-full bg-rose-400/15 text-[11px] font-black text-rose-300">
            ✕
          </span>
          <span>
            <b className="font-bold text-slate-100"><InlineCode text={check.label} /></b>
            <small className="block text-xs leading-6 text-slate-400"><InlineCode text={check.failure} /></small>
          </span>
        </li>
      ))}
    </ul>
  );
}
