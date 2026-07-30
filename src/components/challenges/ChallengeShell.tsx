import Link from "next/link";
import Image from "next/image";

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
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/85 shadow-lg shadow-black/10 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-nowrap items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-6 sm:py-4">
          <Link href="/challenges" className="group flex min-w-0 shrink items-center gap-2 sm:gap-3">
            <Image
              src="/favicon4.png"
              alt="لوگوی چالش‌های فرانت‌اند"
              width={30}
              height={30}
              priority
              className="size-7 shrink-0 rounded-lg object-cover shadow-lg shadow-cyan-500/15 sm:size-10 sm:rounded-xl"
            />
            <span className="hidden min-w-0 min-[390px]:block">
              <span className="block truncate whitespace-nowrap text-[11px] font-black text-white sm:text-sm lg:text-base">
                چالش‌های فرانت‌اند
              </span>
              <span className="hidden truncate whitespace-nowrap text-[10px] text-slate-500 md:block lg:text-xs">
                یادگیری با یک سؤال کوتاه
              </span>
            </span>
          </Link>
          <nav className="flex shrink-0 flex-nowrap items-center gap-0.5 whitespace-nowrap text-[10px] text-slate-300 min-[390px]:text-[11px] sm:gap-1 sm:text-xs lg:text-sm" aria-label="ناوبری چالش‌ها">
            <Link className="rounded-lg px-2 py-2 transition hover:bg-white/5 hover:text-cyan-300 sm:px-3" href="/leaderboard">
              رتبه‌بندی
            </Link>
            <Link className="rounded-lg px-2 py-2 transition hover:bg-white/5 hover:text-cyan-300 sm:px-3" href="/my-progress">
              پیشرفت من
            </Link>
            <Link className="hidden rounded-lg px-2 py-2 transition hover:bg-white/5 hover:text-cyan-300 md:block sm:px-3" href="/">
              پورتفولیو
            </Link>
          </nav>
        </div>
      </header>
      <main className="relative z-10 mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-4">
        {children}
      </main>
      <footer className="relative z-10 border-t border-white/10 px-4 py-8 text-center text-sm text-slate-500">
        ساخته‌شده برای تمرین، گفت‌وگو و یادگیری عمیق‌تر فرانت‌اند
      </footer>
    </div>
  );
}
