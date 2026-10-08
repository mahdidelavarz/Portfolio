"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { parseLevelConfig, scoreConfig, type PlayableLevel } from "@/lib/lab/playable";
import type { LabConfig } from "@/lib/lab/types";
import type { LevelProgress } from "./labStorage";

/** What the server knows about one ticket, already checked against the level's fields. */
export interface ServerLabResult {
  levelId: string;
  bestConfig: LabConfig | null;
  bestScore: number;
  passed: boolean;
  hintsUsed: number;
  solutionViewed: boolean;
}

export interface RunToSave {
  levelId: string;
  config: LabConfig;
  hintsUsed: number;
  solutionViewed: boolean;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseResult(value: unknown, playableById: Map<string, PlayableLevel>): ServerLabResult | null {
  if (!isRecord(value) || typeof value.levelId !== "string") return null;
  const level = playableById.get(value.levelId);
  const { bestScore, hintsUsed, passed, solutionViewed } = value;
  if (!level || typeof bestScore !== "number" || typeof hintsUsed !== "number") return null;
  return {
    levelId: level.id,
    bestConfig: parseLevelConfig(level, value.bestConfig),
    bestScore: Math.max(0, Math.min(100, bestScore)),
    passed: passed === true,
    hintsUsed: Math.max(0, Math.min(level.hints.length, hintsUsed)),
    solutionViewed: solutionViewed === true,
  };
}

/** The config from this browser's runs that the server will score highest. */
function bestLocalRun(level: PlayableLevel, progress: LevelProgress): LabConfig | null {
  let best: { config: LabConfig; rank: number } | null = null;
  for (const run of progress.runs) {
    const result = scoreConfig(level, run.config);
    const correct = result.evaluation.correct;
    const rank = (correct && result.passed ? 1000 : 0) + (correct ? result.score : 0);
    if (!best || rank > best.rank) best = { config: run.config, rank };
  }
  return best?.config ?? null;
}

async function postRun(run: RunToSave, playableById: Map<string, PlayableLevel>): Promise<ServerLabResult | null> {
  const response = await fetch(`/api/lab/${run.levelId}/run`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ config: run.config, hintsUsed: run.hintsUsed, solutionViewed: run.solutionViewed }),
  });
  if (!response.ok) return null;
  return parseResult((await response.json()).result, playableById);
}

/**
 * Keeps lab results on the server for visitors with a username. Everything
 * here is best effort: the lab keeps working from localStorage when the server
 * is unreachable or the visitor has no username.
 */
export function useLabSync({
  hydrated,
  playable,
  progress,
  onMerge,
}: {
  hydrated: boolean;
  playable: PlayableLevel[];
  progress: Record<string, LevelProgress>;
  onMerge: (results: ServerLabResult[]) => void;
}) {
  const [username, setUsername] = useState<string | null>(null);
  const [online, setOnline] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const progressRef = useRef(progress);
  const playableById = useRef(new Map<string, PlayableLevel>());

  useEffect(() => {
    progressRef.current = progress;
    playableById.current = new Map(playable.map((level) => [level.id, level]));
  }, [progress, playable]);

  const load = useCallback(
    async (signal?: AbortSignal) => {
      const response = await fetch("/api/lab", { cache: "no-store", signal });
      if (!response.ok) throw new Error("Lab results are unavailable.");
      const data: unknown = await response.json();
      if (!isRecord(data)) return;
      setUsername(typeof data.username === "string" ? data.username : null);
      setOnline(true);
      const results = Array.isArray(data.results) ? data.results : [];
      onMerge(results.flatMap((item) => parseResult(item, playableById.current) ?? []));
    },
    [onMerge],
  );

  useEffect(() => {
    if (!hydrated) return;
    const controller = new AbortController();
    load(controller.signal).catch(() => undefined);
    return () => controller.abort();
  }, [hydrated, load]);

  /** Call after a run was applied locally. Saves it, or asks for a username the first time. */
  const saveRun = useCallback(
    (run: RunToSave) => {
      if (!online) return;
      if (!username) {
        if (!dismissed) setDialogOpen(true);
        return;
      }
      postRun(run, playableById.current)
        .then((result) => result && onMerge([result]))
        .catch(() => undefined);
    },
    [online, username, dismissed, onMerge],
  );

  /** After a claim or a recovery: send what this browser already solved, then take the server's view. */
  const identified = useCallback(
    async (name: string) => {
      setUsername(name);
      try {
        for (const level of playableById.current.values()) {
          const local = progressRef.current[level.id];
          const config = local ? bestLocalRun(level, local) : null;
          if (!local || !config) continue;
          await postRun(
            { levelId: level.id, config, hintsUsed: local.hintsUsed, solutionViewed: local.solutionShown },
            playableById.current,
          );
        }
        await load();
      } catch {
        // The results stay in localStorage and are sent again on the next run.
      }
    },
    [load],
  );

  const closeDialog = useCallback(() => {
    setDialogOpen(false);
    setDismissed(true);
  }, []);

  const hasLocalRuns = Object.values(progress).some((item) => item.runs.length > 0);

  return {
    username,
    dialogOpen,
    /** Runs exist in this browser only, because there is no username to save them under. */
    unsaved: online && !username && hasLocalRuns,
    saveRun,
    identified,
    openDialog: useCallback(() => setDialogOpen(true), []),
    closeDialog,
  };
}
