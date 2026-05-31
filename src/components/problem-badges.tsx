import type { Problem } from "@/types/problem";
import { formatDifficulty, formatProblemNumber } from "@/lib/problem-display";

type ProblemNumberBadgeProps = {
  number: Problem["number"];
};

export function ProblemNumberBadge({ number }: ProblemNumberBadgeProps) {
  return (
    <span className="inline-flex rounded-full bg-surface-muted px-2.5 py-1 font-mono text-xs font-semibold text-muted">
      {formatProblemNumber(number)}
    </span>
  );
}

type DifficultyBadgeProps = {
  difficulty: Problem["difficulty"];
};

export function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  const label = formatDifficulty(difficulty);
  const className = difficulty
    ? "border-accent/30 bg-accent/10 text-accent"
    : "border-border bg-surface-muted text-muted";

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${className}`}
    >
      {label}
    </span>
  );
}
