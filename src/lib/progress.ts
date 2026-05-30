import type {
  ProblemProgress,
  ProblemProgressById,
  ProgressStatus,
} from "@/types/progress";

export const PROGRESS_STORAGE_KEY =
  "leetcode-pattern-tracker:problem-progress:v1";

export const DEFAULT_PROGRESS_STATUS: ProgressStatus = "not-started";

export const PROGRESS_STATUS_OPTIONS: readonly {
  value: ProgressStatus;
  label: string;
}[] = [
  { value: "not-started", label: "Not Started" },
  { value: "attempted", label: "Attempted" },
  { value: "solved", label: "Solved" },
  { value: "need-review", label: "Need Review" },
  { value: "skipped", label: "Skipped" },
];

const PROGRESS_STATUS_VALUES = new Set<ProgressStatus>(
  PROGRESS_STATUS_OPTIONS.map((option) => option.value),
);

export function isProgressStatus(value: unknown): value is ProgressStatus {
  return (
    typeof value === "string" &&
    PROGRESS_STATUS_VALUES.has(value as ProgressStatus)
  );
}

export function getProgressStatusLabel(status: ProgressStatus): string {
  return (
    PROGRESS_STATUS_OPTIONS.find((option) => option.value === status)?.label ??
    "Not Started"
  );
}

export function createProblemProgress(
  problemId: string,
  status: ProgressStatus,
  existingProgress?: ProblemProgress,
  lastUpdatedAt = new Date().toISOString(),
): ProblemProgress {
  const attempts =
    status === "attempted" && existingProgress?.status !== "attempted"
      ? (existingProgress?.attempts ?? 0) + 1
      : (existingProgress?.attempts ?? 0);

  return {
    problemId,
    status,
    attempts,
    confidence: existingProgress?.confidence,
    lastUpdatedAt,
  };
}

export function parseStoredProgress(
  rawProgress: string | null,
): ProblemProgressById {
  if (!rawProgress) {
    return {};
  }

  try {
    const parsedProgress: unknown = JSON.parse(rawProgress);

    if (!isRecord(parsedProgress)) {
      return {};
    }

    return Object.values(parsedProgress).reduce<ProblemProgressById>(
      (validProgress, progress) => {
        const normalizedProgress = normalizeProblemProgress(progress);

        if (normalizedProgress) {
          validProgress[normalizedProgress.problemId] = normalizedProgress;
        }

        return validProgress;
      },
      {},
    );
  } catch {
    return {};
  }
}

function normalizeProblemProgress(progress: unknown): ProblemProgress | null {
  if (!isRecord(progress)) {
    return null;
  }

  if (
    typeof progress.problemId !== "string" ||
    !isProgressStatus(progress.status) ||
    typeof progress.lastUpdatedAt !== "string"
  ) {
    return null;
  }

  return {
    problemId: progress.problemId,
    status: progress.status,
    attempts:
      typeof progress.attempts === "number" && progress.attempts >= 0
        ? progress.attempts
        : 0,
    confidence: isProgressConfidence(progress.confidence)
      ? progress.confidence
      : undefined,
    lastUpdatedAt: progress.lastUpdatedAt,
  };
}

function isProgressConfidence(
  value: unknown,
): value is ProblemProgress["confidence"] {
  return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    value >= 1 &&
    value <= 5
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
