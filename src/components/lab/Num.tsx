/** A number or duration kept in its own direction so it doesn't reorder inside RTL text. */
export default function Num({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span dir="ltr" className={`tabular-nums [unicode-bidi:isolate] ${className}`}>
      {children}
    </span>
  );
}
