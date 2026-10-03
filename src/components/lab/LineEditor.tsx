import type { LabField } from "@/data/lab-validator";
import type { ConfigValue, LabConfig } from "@/lib/lab/types";
import InlineCode from "./InlineCode";
import { optionClass } from "./styles";

export default function LineEditor({
  fields,
  draft,
  onChange,
}: {
  fields: LabField[];
  draft: LabConfig;
  onChange: (field: string, value: ConfigValue) => void;
}) {
  return (
    <div
      dir="rtl"
      className="challenge-font flex flex-col gap-4 whitespace-normal border-y border-slate-700/60 bg-slate-900/90 px-4 py-4 text-right text-sm"
    >
      {fields.map((field) => (
        <fieldset key={field.name}>
          <legend className="mb-2 text-xs font-bold text-slate-200"><InlineCode text={field.label} /></legend>
          <div className="flex flex-wrap gap-2">
            {field.options.map((option) => (
              <button
                key={String(option.value)}
                type="button"
                aria-pressed={draft[field.name] === option.value}
                onClick={() => onChange(field.name, option.value)}
                dir={field.mono ? "ltr" : undefined}
                className={`${optionClass(draft[field.name] === option.value)} ${field.mono ? "font-code text-xs" : "text-right"}`}
              >
                {field.mono ? option.label : <InlineCode text={option.label} />}
              </button>
            ))}
          </div>
          {field.note && <p className="mt-2 text-xs text-slate-500"><InlineCode text={field.note} /></p>}
        </fieldset>
      ))}
    </div>
  );
}
