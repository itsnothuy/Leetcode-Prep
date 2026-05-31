"use client";

import Link from "next/link";
import { useProblemProgress } from "@/hooks/use-problem-progress";
import { formatSectionName } from "@/lib/problem-display";
import type { Pattern } from "@/types/problem";

type PatternsOverviewProps = {
  patterns: Pattern[];
};

export function PatternsOverview({ patterns }: PatternsOverviewProps) {
  const { getProblemStatus } = useProblemProgress();

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {patterns.map((pattern) => {
        const progress = getPatternProgress(pattern, getProblemStatus);

        return (
          <Link
            key={pattern.id}
            href={`/questions?pattern=${encodeURIComponent(pattern.id)}`}
            className="group flex min-h-56 flex-col justify-between rounded-2xl border border-border bg-surface/90 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-accent hover:shadow-md"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                Pattern {pattern.number}
              </p>
              <h2 className="mt-3 text-xl font-semibold leading-7 group-hover:text-accent">
                {pattern.name}
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                {formatSectionName(pattern.section)}
              </p>
            </div>

            <div className="mt-6">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-muted">Solved</p>
                  <p className="mt-1 text-2xl font-semibold">
                    {progress.solvedCount}
                    <span className="text-base font-medium text-muted">
                      {" "}
                      / {progress.totalCount}
                    </span>
                  </p>
                </div>
                <p className="text-sm font-semibold text-accent">
                  {progress.percentComplete}%
                </p>
              </div>
              <div
                className="mt-4 h-2 overflow-hidden rounded-full bg-surface-muted"
                aria-label={`${pattern.name} progress`}
                aria-valuemax={100}
                aria-valuemin={0}
                aria-valuenow={progress.percentComplete}
                role="progressbar"
              >
                <div
                  className="h-full rounded-full bg-accent transition-all"
                  style={{ width: `${progress.percentComplete}%` }}
                />
              </div>
              <p className="mt-4 text-sm font-semibold text-accent">
                View questions
              </p>
            </div>
          </Link>
        );
      })}
    </section>
  );
}

function getPatternProgress(
  pattern: Pattern,
  getProblemStatus: (problemId: string) => string,
) {
  const uniqueProblemIds = Array.from(
    new Set(pattern.problems.map((problem) => problem.id)),
  );
  const totalCount = uniqueProblemIds.length;
  const solvedCount = uniqueProblemIds.filter(
    (problemId) => getProblemStatus(problemId) === "solved",
  ).length;
  const percentComplete =
    totalCount === 0 ? 0 : Math.round((solvedCount / totalCount) * 100);

  return {
    percentComplete,
    solvedCount,
    totalCount,
  };
}
