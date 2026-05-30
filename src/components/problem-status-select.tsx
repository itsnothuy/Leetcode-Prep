"use client";

import type { Problem } from "@/types/problem";
import type { ProgressStatus } from "@/types/progress";
import {
  PROGRESS_STATUS_OPTIONS,
  getProgressStatusLabel,
  isProgressStatus,
} from "@/lib/progress";

type ProblemStatusSelectProps = {
  isLoaded: boolean;
  problem: Problem;
  status: ProgressStatus;
  onStatusChange: (problemId: string, status: ProgressStatus) => void;
};

export function ProblemStatusSelect({
  isLoaded,
  problem,
  status,
  onStatusChange,
}: ProblemStatusSelectProps) {
  const selectId = `status-${problem.entryId}`;

  return (
    <label htmlFor={selectId} className="block">
      <span className="sr-only">Progress status for {problem.title}</span>
      <select
        id={selectId}
        value={status}
        onChange={(event) => {
          const nextStatus = event.target.value;

          if (isProgressStatus(nextStatus)) {
            onStatusChange(problem.id, nextStatus);
          }
        }}
        disabled={!isLoaded}
        className={getStatusSelectClassName(status)}
        title={`Progress status: ${getProgressStatusLabel(status)}`}
      >
        {PROGRESS_STATUS_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function getStatusSelectClassName(status: ProgressStatus): string {
  const baseClassName =
    "h-9 min-w-36 rounded-md border bg-background px-2 text-sm font-medium outline-none transition focus:border-accent disabled:cursor-not-allowed disabled:opacity-60";
  const statusClassNames: Record<ProgressStatus, string> = {
    "not-started": "border-border text-muted",
    attempted: "border-warning/60 text-warning",
    solved: "border-accent/60 text-accent",
    "need-review": "border-warning text-warning",
    skipped: "border-border text-muted",
  };

  return `${baseClassName} ${statusClassNames[status]}`;
}
