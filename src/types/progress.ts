export type ProgressStatus =
  | "not-started"
  | "attempted"
  | "solved"
  | "need-review"
  | "skipped";

export type ProgressConfidence = 1 | 2 | 3 | 4 | 5;

export type ProblemProgress = {
  problemId: string;
  status: ProgressStatus;
  attempts: number;
  confidence?: ProgressConfidence;
  lastUpdatedAt: string;
};

export type ProblemProgressById = Record<string, ProblemProgress>;
