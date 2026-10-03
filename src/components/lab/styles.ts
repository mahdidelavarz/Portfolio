/** Shared class lists, matching the quiz pages. */
export const cardClass =
  "rounded-3xl border border-slate-700/50 bg-slate-800/50 p-5 shadow-xl shadow-black/10 backdrop-blur-xl sm:p-8";

export const primaryButtonClass =
  "rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-cyan-500/10 transition hover:-translate-y-0.5 hover:shadow-cyan-500/25 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0";

export const secondaryButtonClass =
  "rounded-xl border border-slate-700/60 bg-slate-950/50 px-4 py-2.5 text-sm font-bold text-slate-200 transition hover:border-cyan-400/30 hover:text-cyan-300";

export const quietButtonClass =
  "rounded-lg px-2 py-1.5 text-sm text-slate-400 transition hover:bg-white/5 hover:text-cyan-300";

export const optionClass = (selected: boolean) =>
  `rounded-xl border px-3 py-2 text-sm transition ${
    selected
      ? "border-cyan-400 bg-cyan-400/10 font-bold text-white"
      : "border-slate-700/60 bg-slate-950/50 text-slate-300 hover:border-cyan-400/30 hover:bg-slate-900/70"
  }`;

export const spotlightRingClass = "rounded-md ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-900";
