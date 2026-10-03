"use client";

import { useMemo } from "react";
import type { LabLevel } from "@/data/lab-validator";
import { toPlayableLevels } from "@/lib/lab/playable";
import AnalysisPane from "./AnalysisPane";
import CodePane from "./CodePane";
import Debrief from "./Debrief";
import HealthStrip from "./HealthStrip";
import HelpPane from "./HelpPane";
import LockedTicketCard from "./LockedTicketCard";
import ResultSheet from "./ResultSheet";
import ShopFrame from "./ShopFrame";
import TabBar from "./TabBar";
import TicketCard from "./TicketCard";
import TicketRail from "./TicketRail";
import { isDesktopNow, useIsDesktop } from "./useIsDesktop";
import { useLabState, type WorkTab } from "./useLabState";
import { useShopRuntime } from "./useShopRuntime";

function scrollToTop() {
  window.scrollTo({ top: 0 });
}

export default function LabExperience({ levels }: { levels: LabLevel[] }) {
  const playable = useMemo(() => toPlayableLevels(levels), [levels]);
  const { state, currentLevel, currentPlayable, progress, actions } = useLabState(levels, playable);
  const isDesktop = useIsDesktop();
  const appliedBySimulator = useMemo(
    () =>
      Object.fromEntries(
        playable.map((level) => [level.simulator, state.progress[level.id]?.applied ?? level.simulatorModel.defaults]),
      ),
    [playable, state.progress],
  );
  const highlightRenders = currentPlayable?.simulatorModel.analysis === "renders";
  const shop = useShopRuntime(appliedBySimulator, highlightRenders);
  const { ui } = state;
  const scenario = currentPlayable?.simulatorModel.scenario;

  const changeTab = (tab: WorkTab) => {
    actions.setTab(tab === "app" && isDesktopNow() ? "analysis" : tab);
    scrollToTop();
  };

  const selectLevel = (levelId: string) => {
    actions.selectLevel(levelId, isDesktopNow() ? "analysis" : "app");
    shop.actions.cancelScenario();
    scrollToTop();
  };

  const showInApp = () => {
    if (!isDesktopNow()) changeTab("app");
    if (scenario) shop.actions.runScenario(scenario);
  };

  const reproduce = () => {
    actions.markReproduced();
    showInApp();
  };

  const run = () => {
    const outcome = actions.run();
    if (outcome && outcome.level.simulatorModel.scenario !== "type") shop.actions.resetCart();
  };

  const showSolution = () => {
    actions.showSolution();
    scrollToTop();
  };

  const resetLevel = () => {
    actions.resetLevel();
    if (scenario === "reload") shop.actions.reload();
  };

  const closeSheet = () => actions.setSheetOpen(false);
  const lastRun = progress?.runs[progress.runs.length - 1] ?? null;
  const levelIndex = currentPlayable ? playable.indexOf(currentPlayable) : -1;
  const appPaneClass = ui.tab === "app" || !currentPlayable ? "" : "max-lg:hidden";
  const workPaneClass = ui.tab === "app" ? "max-lg:hidden" : "";
  const visiblePane = ui.tab === "app" ? "analysis" : ui.tab;

  return (
    <div className="pb-4 lg:pb-8">
      <header className="mb-6 mt-2 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="text-xs font-bold text-cyan-400">آزمایشگاه پرفورمنس</span>
          <h1 className="mt-1 text-2xl font-black text-white sm:text-3xl">تیکت‌های فروشگاه «کالاستان»</h1>
        </div>
        <HealthStrip playable={playable} progress={state.progress} />
      </header>

      <TicketRail levels={levels} currentLevelId={currentLevel.id} progress={state.progress} onSelect={selectLevel} />

      <div className="mt-6 grid items-start gap-4 lg:grid-cols-2 lg:gap-6 lg:[grid-template-areas:'ticket_ticket'_'work_app']">
        <div className={`min-w-0 lg:[grid-area:ticket] ${appPaneClass}`}>
          {currentPlayable && progress && (
            <TicketCard level={currentPlayable} progress={progress} onReproduce={reproduce} />
          )}
          {currentLevel.status === "locked" && (
            <LockedTicketCard level={currentLevel} playable={playable} onSelect={selectLevel} />
          )}
        </div>

        <aside className={`min-w-0 lg:sticky lg:top-24 lg:[grid-area:app] ${appPaneClass}`} aria-label="اپ فروشگاه">
          <ShopFrame runtime={shop} configs={appliedBySimulator} />
        </aside>

        {currentPlayable && progress && (
          <section className="flex min-w-0 flex-col gap-4 lg:[grid-area:work]" aria-label="میز کار">
            <TabBar tab={ui.tab} isDesktop={isDesktop} onChange={changeTab} />
            <div role="tabpanel" className={workPaneClass}>
              {visiblePane === "analysis" && (
                <AnalysisPane
                  level={currentPlayable}
                  progress={progress}
                  ui={ui}
                  onOpenSheet={() => actions.setSheetOpen(true)}
                  onDismissHint={actions.dismissSpotlight}
                  debrief={
                    <Debrief
                      level={currentPlayable}
                      progress={progress}
                      open={ui.debriefOpen}
                      nextLevel={playable[levelIndex + 1] ?? null}
                      onToggle={actions.toggleDebrief}
                      onSelectLevel={selectLevel}
                    />
                  }
                />
              )}
              {visiblePane === "code" && (
                <CodePane
                  level={currentPlayable}
                  progress={progress}
                  ui={ui}
                  onToggleLine={actions.toggleLine}
                  onFieldChange={actions.setField}
                  onPredict={actions.setPrediction}
                  onRun={run}
                  onDismissHint={actions.dismissSpotlight}
                />
              )}
              {visiblePane === "help" && (
                <HelpPane
                  level={currentPlayable}
                  progress={progress}
                  onTakeHint={actions.takeHint}
                  onShowHint={actions.showHint}
                  onShowSolution={showSolution}
                  onReset={resetLevel}
                />
              )}
            </div>
          </section>
        )}
      </div>

      {ui.sheetOpen && currentPlayable && lastRun && (
        <ResultSheet
          key={progress?.runs.length}
          level={currentPlayable}
          run={lastRun}
          onClose={closeSheet}
          onShowApp={() => {
            closeSheet();
            showInApp();
          }}
          onShowAnalysis={() => {
            closeSheet();
            changeTab("analysis");
          }}
        />
      )}
    </div>
  );
}
