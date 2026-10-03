/** Renders text where `backticked` parts are inline code. Content never carries HTML. */
export default function InlineCode({ text }: { text: string }) {
  const parts = text.split("`");
  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <code
            key={index}
            dir="ltr"
            className="rounded-md bg-slate-950/70 px-1.5 py-0.5 font-code text-[0.85em] text-cyan-200 [unicode-bidi:isolate]"
          >
            {part}
          </code>
        ) : (
          part
        ),
      )}
    </>
  );
}
