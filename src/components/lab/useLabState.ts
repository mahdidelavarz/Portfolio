"use client";

import { useCallback, useEffect, useMemo, useReducer } from "react";
import type { LabLevel } from "@/data/lab-validator";
import { configsEqual, runDirection, validateDraft } from "@/lib/lab/engine";
import { scoreConfig, type PlayableLevel } from "@/lib/lab/playable";
import type { ConfigValue, Direction, LabConfig } from "@/lib/lab/types";
import {
  freshProgress,
  readStoredLab,
  writeStoredLab,
  type LevelProgress,
  type RunRecord,
} from "./labStorage";
import type { RunToSave, ServerLabResult } from "./useLabSync";

export type WorkTab = "app" | "analysis" | "code" | "help";

export interface LabUiState {
  tab: WorkTab;
  openLineKey: string | null;
  prediction: Direction | null;
  message: string | null;
  debriefOpen: boolean;
  sheetOpen: boolean;
  spotlightHint: number | null;
}

interface LabState {
  currentLevelId: string;
  progress: Record<string, LevelProgress>;
  ui: LabUiState;
  hydrated: boolean;
}

type LabAction =
  | { type: "hydrated"; currentLevelId?: string; progress: Record<string, LevelProgress> }
  | { type: "serverMerged"; results: ServerLabResult[] }
  | { type: "levelSelected"; levelId: string; tab: WorkTab }
  | { type: "tabChanged"; tab: WorkTab }
  | { type: "lineToggled"; key: string }
  | { type: "fieldChanged"; field: string; value: ConfigValue }
  | { type: "predictionChanged"; prediction: Direction }
  | { type: "hintSpotlighted"; hintIndex: number; tab: WorkTab; hintsUsed: number }
  | { type: "spotlightDismissed" }
  | { type: "solutionShown"; config: LabConfig }
  | { type: "debriefToggled" }
  | { type: "levelReset"; progress: LevelProgress }
  | { type: "runRejected"; message: string }
  | { type: "runCompleted"; run: RunRecord; score: number; passed: boolean }
  | { type: "sheetChanged"; open: boolean }
  | { type: "reproduced" };

const NO_CHANGE_MESSAGE = "کد با آخرین اجرا فرقی نداره. اول یه خط رو عوض کن.";

const initialUi: LabUiState = {
  tab: "app",
  openLineKey: null,
  prediction: null,
  message: null,
  debriefOpen: false,
  sheetOpen: false,
  spotlightHint: null,
};

function updateCurrent(state: LabState, update: (progress: LevelProgress) => LevelProgress): LabState {
  const current = state.progress[state.currentLevelId];
  if (!current) return state;
  return { ...state, progress: { ...state.progress, [state.currentLevelId]: update(current) } };
}

/**
 * Folds the server's result for a ticket into local progress. Nothing is ever
 * taken away; a ticket with no local runs also picks up the server's best code.
 */
function mergeServerResult(local: LevelProgress, result: ServerLabResult): LevelProgress {
  const adoptConfig =
    local.runs.length === 0 && result.bestConfig !== null && !configsEqual(local.applied, result.bestConfig);
  return {
    ...local,
    ...(adoptConfig && result.bestConfig
      ? { applied: { ...result.bestConfig }, draft: { ...result.bestConfig } }
      : null),
    solved: local.solved || result.passed,
    bestScore: Math.max(local.bestScore, result.bestScore),
    hintsUsed: Math.max(local.hintsUsed, result.hintsUsed),
    solutionShown: local.solutionShown || result.solutionViewed,
  };
}

function labReducer(state: LabState, action: LabAction): LabState {
  switch (action.type) {
    case "hydrated":
      return {
        ...state,
        hydrated: true,
        currentLevelId: action.currentLevelId ?? state.currentLevelId,
        progress: { ...state.progress, ...action.progress },
      };
    case "serverMerged": {
      const progress = { ...state.progress };
      for (const result of action.results) {
        const local = progress[result.levelId];
        if (local) progress[result.levelId] = mergeServerResult(local, result);
      }
      return { ...state, progress };
    }
    case "levelSelected":
      return { ...state, currentLevelId: action.levelId, ui: { ...initialUi, tab: action.tab } };
    case "tabChanged":
      return { ...state, ui: { ...state.ui, tab: action.tab, spotlightHint: null } };
    case "lineToggled":
      return {
        ...state,
        ui: {
          ...state.ui,
          openLineKey: state.ui.openLineKey === action.key ? null : action.key,
          spotlightHint: null,
        },
      };
    case "fieldChanged":
      return {
        ...updateCurrent(state, (progress) => ({
          ...progress,
          draft: { ...progress.draft, [action.field]: action.value },
        })),
        ui: { ...state.ui, message: null },
      };
    case "predictionChanged":
      return { ...state, ui: { ...state.ui, prediction: action.prediction, message: null } };
    case "hintSpotlighted":
      return {
        ...updateCurrent(state, (progress) => ({ ...progress, hintsUsed: action.hintsUsed })),
        ui: { ...state.ui, tab: action.tab, spotlightHint: action.hintIndex, openLineKey: null },
      };
    case "spotlightDismissed":
      return { ...state, ui: { ...state.ui, spotlightHint: null } };
    case "solutionShown":
      return {
        ...updateCurrent(state, (progress) =>
          progress.solutionShown ? progress : { ...progress, solutionShown: true, draft: { ...action.config } },
        ),
        ui: { ...state.ui, tab: "code", openLineKey: null, spotlightHint: null },
      };
    case "debriefToggled":
      return { ...state, ui: { ...state.ui, debriefOpen: !state.ui.debriefOpen } };
    case "levelReset":
      return {
        ...updateCurrent(state, () => action.progress),
        ui: { ...initialUi, tab: state.ui.tab },
      };
    case "runRejected":
      return { ...state, ui: { ...state.ui, message: action.message } };
    case "runCompleted":
      return {
        ...updateCurrent(state, (progress) => ({
          ...progress,
          runs: [...progress.runs, action.run],
          applied: { ...action.run.config },
          bestScore: Math.max(progress.bestScore, action.score),
          solved: progress.solved || action.passed,
        })),
        ui: { ...state.ui, prediction: null, message: null, openLineKey: null, spotlightHint: null, sheetOpen: true },
      };
    case "sheetChanged":
      return { ...state, ui: { ...state.ui, sheetOpen: action.open } };
    case "reproduced":
      return updateCurrent(state, (progress) => ({ ...progress, reproduced: true }));
  }
}

function createInitialState(levels: LabLevel[], playable: PlayableLevel[]): LabState {
  return {
    currentLevelId: playable[0]?.id ?? levels[0].id,
    progress: Object.fromEntries(playable.map((level) => [level.id, freshProgress(level)])),
    ui: initialUi,
    hydrated: false,
  };
}

export interface RunOutcome {
  level: PlayableLevel;
  /** The run as the server needs it to score and store it. */
  toSave: RunToSave;
}

/**
 * Lab progress and UI state. Progress is restored from localStorage after mount
 * and saved on every change; the first render always uses fresh defaults so the
 * server and client markup match.
 */
export function useLabState(levels: LabLevel[], playable: PlayableLevel[]) {
  const [state, dispatch] = useReducer(labReducer, undefined, () => createInitialState(levels, playable));
  const playableById = useMemo(() => new Map(playable.map((level) => [level.id, level])), [playable]);

  useEffect(() => {
    const stored = readStoredLab(levels.map((level) => level.id), playable);
    dispatch({ type: "hydrated", currentLevelId: stored?.currentLevelId, progress: stored?.progress ?? {} });
  }, [levels, playable]);

  useEffect(() => {
    if (state.hydrated) writeStoredLab({ currentLevelId: state.currentLevelId, progress: state.progress });
  }, [state.hydrated, state.currentLevelId, state.progress]);

  const currentLevel = levels.find((level) => level.id === state.currentLevelId) ?? levels[0];
  const currentPlayable = playableById.get(state.currentLevelId) ?? null;
  const progress = state.progress[state.currentLevelId] ?? null;

  const spotlightHint = useCallback(
    (hintIndex: number, hintsUsed: number) => {
      if (!currentPlayable) return;
      const hint = currentPlayable.hints[hintIndex];
      if (hint) dispatch({ type: "hintSpotlighted", hintIndex, tab: hint.tab, hintsUsed });
    },
    [currentPlayable],
  );

  const takeHint = useCallback(() => {
    if (!currentPlayable || !progress) return;
    const hintsUsed = Math.min(currentPlayable.hints.length, progress.hintsUsed + 1);
    spotlightHint(hintsUsed - 1, hintsUsed);
  }, [currentPlayable, progress, spotlightHint]);

  const showHint = useCallback(
    (hintIndex: number) => {
      if (progress) spotlightHint(hintIndex, progress.hintsUsed);
    },
    [progress, spotlightHint],
  );

  const showSolution = useCallback(() => {
    if (currentPlayable) dispatch({ type: "solutionShown", config: currentPlayable.baseline.bestConfig });
  }, [currentPlayable]);

  const resetLevel = useCallback(() => {
    if (currentPlayable) dispatch({ type: "levelReset", progress: freshProgress(currentPlayable) });
  }, [currentPlayable]);

  /** Applies the draft. Returns the level that ran, or null when the run was rejected. */
  const run = useCallback((): RunOutcome | null => {
    const prediction = state.ui.prediction;
    if (!currentPlayable || !progress || !prediction) return null;
    const invalid = validateDraft(currentPlayable.fields, progress.draft);
    if (invalid) {
      dispatch({ type: "runRejected", message: invalid });
      return null;
    }
    if (configsEqual(progress.draft, progress.applied)) {
      dispatch({ type: "runRejected", message: NO_CHANGE_MESSAGE });
      return null;
    }
    const { simulatorModel, primaryMetric } = currentPlayable;
    const previous = { ...progress.applied };
    const config = { ...progress.draft };
    const direction = runDirection(
      simulatorModel.evaluate(previous).metrics[primaryMetric.key],
      simulatorModel.evaluate(config).metrics[primaryMetric.key],
    );
    const result = scoreConfig(currentPlayable, config);
    const passed = result.passed && result.evaluation.correct;
    dispatch({
      type: "runCompleted",
      run: { previous, config, prediction, direction, firstPass: passed && !progress.solved },
      score: result.evaluation.correct ? result.score : 0,
      passed,
    });
    return {
      level: currentPlayable,
      toSave: {
        levelId: currentPlayable.id,
        config,
        hintsUsed: progress.hintsUsed,
        solutionViewed: progress.solutionShown,
      },
    };
  }, [currentPlayable, progress, state.ui.prediction]);

  const actions = useMemo(
    () => ({
      selectLevel: (levelId: string, tab: WorkTab) => dispatch({ type: "levelSelected", levelId, tab }),
      setTab: (tab: WorkTab) => dispatch({ type: "tabChanged", tab }),
      toggleLine: (key: string) => dispatch({ type: "lineToggled", key }),
      setField: (field: string, value: ConfigValue) => dispatch({ type: "fieldChanged", field, value }),
      setPrediction: (prediction: Direction) => dispatch({ type: "predictionChanged", prediction }),
      dismissSpotlight: () => dispatch({ type: "spotlightDismissed" }),
      toggleDebrief: () => dispatch({ type: "debriefToggled" }),
      setSheetOpen: (open: boolean) => dispatch({ type: "sheetChanged", open }),
      markReproduced: () => dispatch({ type: "reproduced" }),
      mergeServer: (results: ServerLabResult[]) => dispatch({ type: "serverMerged", results }),
    }),
    [],
  );

  return {
    state,
    currentLevel,
    currentPlayable,
    progress,
    actions: { ...actions, takeHint, showHint, showSolution, resetLevel, run },
  };
}
