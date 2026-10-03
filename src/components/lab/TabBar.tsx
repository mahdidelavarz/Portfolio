import type { WorkTab } from "./useLabState";

const TABS: Array<{ id: WorkTab; label: string; icon: React.ReactNode; mobileOnly?: boolean }> = [
  {
    id: "app",
    label: "اپ",
    mobileOnly: true,
    icon: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18" />
      </>
    ),
  },
  {
    id: "analysis",
    label: "تحلیل",
    icon: (
      <>
        <path d="M4 19V5" />
        <path d="M4 19h16" />
        <path d="M8 15l4-5 3 3 5-6" />
      </>
    ),
  },
  {
    id: "code",
    label: "کد",
    icon: (
      <>
        <path d="M9 8l-4 4 4 4" />
        <path d="M15 8l4 4-4 4" />
      </>
    ),
  },
  {
    id: "help",
    label: "کمک",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6" />
        <path d="M12 17h.01" />
      </>
    ),
  },
];

function tabClass(mobileOnly: boolean, mobileSelected: boolean, desktopSelected: boolean) {
  return [
    "flex flex-col items-center justify-center gap-0.5 rounded-xl py-1.5 text-[11px] text-slate-400 transition hover:text-slate-200",
    "lg:flex-1 lg:flex-row lg:gap-2 lg:py-2 lg:text-sm",
    mobileOnly ? "lg:hidden" : "",
    mobileSelected ? "max-lg:font-bold max-lg:text-cyan-300" : "",
    desktopSelected ? "lg:bg-cyan-400/10 lg:font-bold lg:text-cyan-300" : "",
  ].join(" ");
}

/**
 * Below `lg` this is a fixed bottom bar with an extra "app" tab; on desktop it
 * sits above the work area and the app is always visible beside it.
 */
export default function TabBar({
  tab,
  isDesktop,
  onChange,
}: {
  tab: WorkTab;
  isDesktop: boolean;
  onChange: (tab: WorkTab) => void;
}) {
  const desktopTab = tab === "app" ? "analysis" : tab;

  return (
    <div
      role="tablist"
      aria-label="بخش‌ها"
      className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-4 border-t border-slate-800 bg-slate-950/95 px-1.5 pb-[calc(0.25rem+env(safe-area-inset-bottom,0px))] pt-1 backdrop-blur-xl lg:sticky lg:top-24 lg:z-20 lg:flex lg:gap-1 lg:rounded-2xl lg:border lg:border-slate-700/50 lg:bg-slate-900/90 lg:p-1"
    >
      {TABS.map((item) => {
        const mobileSelected = tab === item.id;
        const desktopSelected = desktopTab === item.id;
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={isDesktop ? desktopSelected : mobileSelected}
            onClick={() => onChange(item.id)}
            className={tabClass(item.mobileOnly === true, mobileSelected, desktopSelected)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {item.icon}
            </svg>
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
