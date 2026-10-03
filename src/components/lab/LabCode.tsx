"use client";

import { Fragment } from "react";
import { Highlight, themes } from "prism-react-renderer";

export type LabCodeTone = "plain" | "changed" | "added" | "removed" | "gap";

export interface LabCodeLine {
  id: string;
  /** The simulator's key for this line, used to open its editor. */
  lineKey?: string;
  text: string;
  gutter: string;
  tone: LabCodeTone;
  editable?: boolean;
  open?: boolean;
  spotlight?: boolean;
}

const toneClass: Record<LabCodeTone, string> = {
  plain: "",
  changed: "bg-emerald-400/10",
  added: "bg-emerald-400/12",
  removed: "bg-rose-400/10 opacity-80",
  gap: "",
};

const gutterToneClass: Record<LabCodeTone, string> = {
  plain: "text-slate-600",
  changed: "text-emerald-300",
  added: "text-emerald-300",
  removed: "text-rose-300",
  gap: "text-slate-600",
};

function lineClass(line: LabCodeLine) {
  return [
    "relative flex min-w-max whitespace-pre pr-4",
    toneClass[line.tone],
    line.editable ? "cursor-pointer hover:bg-cyan-400/10 focus-visible:bg-cyan-400/10 focus-visible:outline-none" : "",
    line.open ? "bg-cyan-400/10" : "",
    line.spotlight ? "!bg-amber-400/20 shadow-[inset_3px_0_0_var(--color-amber-400)]" : "",
  ].join(" ");
}

/**
 * Per-line code view on prism's Highlight (nightOwl on #07111f, like CodeBlock).
 * Lines can be clickable, marked as changed, spotlighted by a hint, or shown as a
 * diff; `renderAfter` inserts content (an editor, a hint) below a line.
 */
export default function LabCode({
  lines,
  label,
  onActivate,
  renderAfter,
}: {
  lines: LabCodeLine[];
  label: string;
  onActivate?: (line: LabCodeLine) => void;
  renderAfter?: (index: number) => React.ReactNode;
}) {
  const code = lines.map((line) => line.text).join("\n");

  return (
    <Highlight theme={themes.nightOwl} code={code} language="jsx">
      {({ tokens, getTokenProps }) => (
        <div
          dir="ltr"
          role="group"
          aria-label={label}
          className="overflow-x-auto rounded-2xl border border-slate-700/50 py-2 text-left font-code text-[12.5px] leading-[1.85]"
          style={{ background: "#07111f", color: themes.nightOwl.plain.color }}
        >
          {lines.map((line, index) => (
            <Fragment key={line.id}>
              {line.tone === "gap" ? (
                <div className="pl-12 text-slate-600">…</div>
              ) : (
                <div
                  className={lineClass(line)}
                  data-spotlight={line.spotlight ? "true" : undefined}
                  role={line.editable ? "button" : undefined}
                  tabIndex={line.editable ? 0 : undefined}
                  aria-expanded={line.editable ? Boolean(line.open) : undefined}
                  onClick={line.editable ? () => onActivate?.(line) : undefined}
                  onKeyDown={
                    line.editable
                      ? (event) => {
                          if (event.key !== "Enter" && event.key !== " ") return;
                          event.preventDefault();
                          onActivate?.(line);
                        }
                      : undefined
                  }
                >
                  <span className={`w-10 shrink-0 select-none pr-3 text-right ${gutterToneClass[line.tone]}`}>
                    {line.editable && (
                      <span aria-hidden="true" className="absolute left-1.5 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-cyan-400/50" />
                    )}
                    {line.gutter}
                  </span>
                  <span>
                    {(tokens[index] ?? []).map((token, tokenIndex) => (
                      <span key={tokenIndex} {...getTokenProps({ token })} />
                    ))}
                    {line.text === "" && " "}
                  </span>
                </div>
              )}
              {renderAfter?.(index)}
            </Fragment>
          ))}
        </div>
      )}
    </Highlight>
  );
}
