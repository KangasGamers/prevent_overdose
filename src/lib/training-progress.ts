"use client";

import { useCallback, useEffect, useState } from "react";
import { modules } from "./training";

/**
 * Course progress, kept in the visitor's own browser (localStorage). Phase 1
 * has no accounts: this is per-device and resettable, which is an accepted
 * limit until progress moves server-side.
 */

const KEY = "po-training-v1";

export type ModuleProgress = { maxWatched: number; completed: boolean };

export type Progress = {
  modules: Record<string, ModuleProgress>;
  quiz: { passed: boolean; bestScore: number; attempts: number };
  submitted: boolean;
};

const EMPTY: Progress = {
  modules: {},
  quiz: { passed: false, bestScore: 0, attempts: 0 },
  submitted: false,
};

function read(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<Progress>;
    return {
      modules: parsed.modules ?? {},
      quiz: { ...EMPTY.quiz, ...parsed.quiz },
      submitted: parsed.submitted ?? false,
    };
  } catch {
    return EMPTY;
  }
}

function write(next: Progress) {
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("po-training-change"));
  } catch {
    /* storage unavailable — progress just won't persist */
  }
}

export function moduleUnlocked(progress: Progress, index: number): boolean {
  if (index <= 0) return true;
  const prev = modules[index - 1];
  return Boolean(progress.modules[prev.id]?.completed);
}

export function allModulesComplete(progress: Progress): boolean {
  return modules.every((m) => progress.modules[m.id]?.completed);
}

export function completedCount(progress: Progress): number {
  return modules.filter((m) => progress.modules[m.id]?.completed).length;
}

/** Reactive view of progress plus the mutators the course UI needs. */
export function useTrainingProgress() {
  const [progress, setProgress] = useState<Progress>(EMPTY);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProgress(read());
    setReady(true);
    const sync = () => setProgress(read());
    window.addEventListener("po-training-change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("po-training-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const recordModule = useCallback(
    (id: string, maxWatched: number, durationSeconds: number, completeAt: number) => {
      const cur = read();
      const prevMax = cur.modules[id]?.maxWatched ?? 0;
      const nextMax = Math.max(prevMax, maxWatched);
      const completed =
        cur.modules[id]?.completed ||
        (durationSeconds > 0 && nextMax >= durationSeconds * completeAt);
      cur.modules[id] = { maxWatched: nextMax, completed };
      write(cur);
    },
    [],
  );

  const recordQuiz = useCallback((score: number, passed: boolean) => {
    const cur = read();
    cur.quiz = {
      passed: cur.quiz.passed || passed,
      bestScore: Math.max(cur.quiz.bestScore, score),
      attempts: cur.quiz.attempts + 1,
    };
    write(cur);
  }, []);

  const markSubmitted = useCallback(() => {
    const cur = read();
    cur.submitted = true;
    write(cur);
  }, []);

  const reset = useCallback(() => write(EMPTY), []);

  return { progress, ready, recordModule, recordQuiz, markSubmitted, reset };
}
