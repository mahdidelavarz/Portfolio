import Link from "next/link";

export default function ChallengeShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      lang="fa"
      dir="rtl"
      className="challenge-font min-h-screen bg-slate-950 text-slate-100"
    >
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-24 top-12 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -left-24 bottom-12 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />
      </div>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link href="/challenges" className="group flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 font-black text-white shadow-lg shadow-cyan-500/15">
              &lt;/&gt;
            </span>
            <span>
              <span className="block text-sm font-black text-white sm:text-base">
                چالش‌های فرانت‌اند
              </span>
              <span className="hidden text-xs text-slate-500 sm:block">
                یادگیری با یک سؤال کوتاه
              </span>
            </span>
          </Link>
          <nav className="flex items-center gap-1 text-sm text-slate-300" aria-label="ناوبری چالش‌ها">
            <Link className="rounded-lg px-3 py-2 hover:bg-white/5 hover:text-cyan-300" href="/leaderboard">
              رتبه‌بندی
            </Link>
            <Link className="rounded-lg px-3 py-2 hover:bg-white/5 hover:text-cyan-300" href="/my-progress">
              پیشرفت من
            </Link>
            <Link className="hidden rounded-lg px-3 py-2 hover:bg-white/5 hover:text-cyan-300 sm:block" href="/">
              پورتفولیو
            </Link>
          </nav>
        </div>
      </header>
      <main className="relative z-10 mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        {children}
      </main>
      <footer className="relative z-10 border-t border-white/10 px-4 py-8 text-center text-sm text-slate-500">
        ساخته‌شده برای تمرین، گفت‌وگو و یادگیری عمیق‌تر فرانت‌اند
      </footer>
    </div>
  );
}
