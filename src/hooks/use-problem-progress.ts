"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  DEFAULT_PROGRESS_STATUS,
  PROGRESS_STORAGE_KEY,
  createProblemProgress,
  parseStoredProgress,
} from "@/lib/progress";
import type {
  ProblemProgressById,
  ProgressStatus,
} from "@/types/progress";

const listeners = new Set<() => void>();
const EMPTY_PROGRESS_SNAPSHOT: ProblemProgressById = {};

let cachedRawProgress: string | null = null;
let cachedProgress: ProblemProgressById = {};
let storageError: string | null = null;

export function useProblemProgress() {
  const progressByProblemId = useSyncExternalStore(
    subscribeToProgress,
    getProgressSnapshot,
    getServerProgressSnapshot,
  );

  const getProblemStatus = useCallback(
    (problemId: string): ProgressStatus =>
      progressByProblemId[problemId]?.status ?? DEFAULT_PROGRESS_STATUS,
    [progressByProblemId],
  );

  const updateProblemStatus = useCallback(
    (problemId: string, status: ProgressStatus) => {
      const currentProgress = getProgressSnapshot();
      const nextProgress = {
        ...currentProgress,
        [problemId]: createProblemProgress(
          problemId,
          status,
          currentProgress[problemId],
        ),
      };

      writeProgressSnapshot(nextProgress);
    },
    [],
  );

  return {
    progressByProblemId,
    isLoaded: true,
    storageError,
    getProblemStatus,
    updateProblemStatus,
  };
}

function subscribeToProgress(listener: () => void): () => void {
  listeners.add(listener);

  function handleStorage(event: StorageEvent) {
    if (event.key === PROGRESS_STORAGE_KEY) {
      cachedRawProgress = event.newValue;
      cachedProgress = parseStoredProgress(event.newValue);
      storageError = null;
      listener();
    }
  }

  window.addEventListener("storage", handleStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

function getServerProgressSnapshot(): ProblemProgressById {
  return EMPTY_PROGRESS_SNAPSHOT;
}

function getProgressSnapshot(): ProblemProgressById {
  if (typeof window === "undefined") {
    return getServerProgressSnapshot();
  }

  if (storageError) {
    return cachedProgress;
  }

  try {
    const rawProgress = window.localStorage.getItem(PROGRESS_STORAGE_KEY);

    if (rawProgress === cachedRawProgress) {
      return cachedProgress;
    }

    cachedRawProgress = rawProgress;
    cachedProgress = parseStoredProgress(rawProgress);
    storageError = null;

    return cachedProgress;
  } catch {
    storageError = "Progress could not be loaded from this browser.";

    return cachedProgress;
  }
}

function writeProgressSnapshot(nextProgress: ProblemProgressById): void {
  const serializedProgress = JSON.stringify(nextProgress);

  cachedRawProgress = serializedProgress;
  cachedProgress = nextProgress;

  try {
    window.localStorage.setItem(PROGRESS_STORAGE_KEY, serializedProgress);
    storageError = null;
  } catch {
    storageError = "Progress could not be saved in this browser.";
  }

  listeners.forEach((listener) => listener());
}
