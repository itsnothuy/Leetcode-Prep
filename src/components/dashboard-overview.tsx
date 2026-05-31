"use client";

import Link from "next/link";
import { useProblemProgress } from "@/hooks/use-problem-progress";
import { formatSectionName } from "@/lib/problem-display";
import { DEFAULT_PROGRESS_STATUS } from "@/lib/progress";
import type { Pattern, Problem } from "@/types/problem";
import type { ProgressStatus } from "@/types/progress";

type DashboardOverviewProps = {
  patterns: Pattern[];
  uniqueProblems: Problem[];
};

type SectionMetric = {
  attemptedCount: number;
  needReviewCount: number;
  percentComplete: number;
  remainingCount: number;
  section: string;
  solvedCount: number;
  totalCount: number;
};

const EMPTY_PROGRESS_SUMMARY: Record<ProgressStatus, number> = {
  "not-started": 0,
  attempted: 0,
  solved: 0,
  "need-review": 0,
  skipped: 0,
};

export function DashboardOverview({
  patterns,
  uniqueProblems,
}: DashboardOverviewProps) {
  const { getProblemStatus, storageError } = useProblemProgress();
  const progressSummary = getProgressSummary(uniqueProblems, getProblemStatus);
  const totalQuestions = uniqueProblems.length;
  const solvedCount = progressSummary.solved;
  const attemptedCount = progressSummary.attempted;
  const needReviewCount = progressSummary["need-review"];
  const progressPercent = getPercentComplete(solvedCount, totalQuestions);
  const incompleteSections = getSectionMetrics(patterns, getProblemStatus)
    .filter((section) => section.remainingCount > 0)
    .sort(compareWeakSections)
    .slice(0, 4);

  return (
    <section className="space-y-6">
      {storageError ? (
        <p className="rounded-xl border border-warning/40 bg-warning/10 px-4 py-3 text-sm font-medium text-warning">
          {storageError}
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total questions"
          value={totalQuestions.toString()}
          detail="Unique LeetCode questions"
        />
        <StatCard
          label="Solved"
          value={solvedCount.toString()}
          detail={`${progressPercent}% complete`}
        />
        <StatCard
          label="Attempted"
          value={attemptedCount.toString()}
          detail="Started but not solved"
        />
        <StatCard
          label="Need review"
          value={needReviewCount.toString()}
          detail="Marked for another pass"
        />
      </div>

      <div className="rounded-2xl border border-border bg-surface/90 p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">
              Overall progress
            </p>
            <h2 className="mt-2 text-2xl font-semibold">
              {solvedCount} solved out of {totalQuestions}
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Progress is stored locally in this browser and calculated from
              the unique question list, so repeated pattern entries do not
              inflate the totals.
            </p>
          </div>
          <p className="text-4xl font-semibold text-accent">
            {progressPercent}%
          </p>
        </div>
        <div
          className="mt-5 h-3 overflow-hidden rounded-full bg-surface-muted"
          aria-label="Overall solved progress"
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={progressPercent}
          role="progressbar"
        >
          <div
            className="h-full rounded-full bg-accent transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
        <section className="rounded-2xl border border-border bg-surface/90 p-5 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                Weakest sections
              </p>
              <h2 className="mt-2 text-xl font-semibold">
                Most incomplete areas
              </h2>
            </div>
            <Link
              href="/patterns"
              className="text-sm font-semibold text-accent underline-offset-4 hover:underline"
            >
              View patterns
            </Link>
          </div>

          {incompleteSections.length > 0 ? (
            <div className="mt-5 space-y-4">
              {incompleteSections.map((section) => (
                <SectionProgressRow key={section.section} section={section} />
              ))}
            </div>
          ) : (
            <p className="mt-5 rounded-xl bg-surface-muted px-4 py-5 text-sm leading-6 text-muted">
              Every section is solved. That is a very good problem to have.
            </p>
          )}
        </section>

        <aside className="rounded-2xl border border-border bg-surface/90 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            Next study move
          </p>
          <h2 className="mt-2 text-xl font-semibold">Keep the loop small</h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            Use the questions table to update statuses after each attempt. This
            dashboard will surface the sections with the most unfinished work.
          </p>
          <div className="mt-5 flex flex-col gap-3">
            <Link
              href="/questions"
              className="rounded-xl bg-accent px-4 py-2 text-center text-sm font-semibold text-accent-foreground transition hover:opacity-90"
            >
              Open questions
            </Link>
            <Link
              href="/review"
              className="rounded-xl border border-border px-4 py-2 text-center text-sm font-semibold transition hover:border-accent hover:text-accent"
            >
              Check review queue
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}

type StatCardProps = {
  detail: string;
  label: string;
  value: string;
};

function StatCard({ detail, label, value }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface/90 p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
        {label}
      </p>
      <p className="mt-3 text-3xl font-semibold">{value}</p>
      <p className="mt-2 text-sm text-muted">{detail}</p>
    </div>
  );
}

type SectionProgressRowProps = {
  section: SectionMetric;
};

function SectionProgressRow({ section }: SectionProgressRowProps) {
  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold">{formatSectionName(section.section)}</h3>
          <p className="mt-1 text-sm text-muted">
            {section.solvedCount} solved, {section.remainingCount} remaining
          </p>
        </div>
        <p className="text-sm font-semibold text-accent">
          {section.percentComplete}%
        </p>
      </div>
      <div
        className="mt-3 h-2 overflow-hidden rounded-full bg-surface-muted"
        aria-label={`${formatSectionName(section.section)} solved progress`}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={section.percentComplete}
        role="progressbar"
      >
        <div
          className="h-full rounded-full bg-accent transition-all"
          style={{ width: `${section.percentComplete}%` }}
        />
      </div>
      <p className="mt-2 text-xs leading-5 text-muted">
        {section.attemptedCount} attempted, {section.needReviewCount} need
        review, {section.totalCount} total
      </p>
    </div>
  );
}

function getProgressSummary(
  uniqueProblems: Problem[],
  getProblemStatus: (problemId: string) => ProgressStatus,
): Record<ProgressStatus, number> {
  return uniqueProblems.reduce<Record<ProgressStatus, number>>(
    (summary, problem) => {
      const status = getProblemStatus(problem.id) ?? DEFAULT_PROGRESS_STATUS;

      summary[status] += 1;

      return summary;
    },
    { ...EMPTY_PROGRESS_SUMMARY },
  );
}

function getSectionMetrics(
  patterns: Pattern[],
  getProblemStatus: (problemId: string) => ProgressStatus,
): SectionMetric[] {
  const sectionProblemIds = new Map<string, Set<string>>();

  patterns.forEach((pattern) => {
    const problemIds = sectionProblemIds.get(pattern.section) ?? new Set();

    pattern.problems.forEach((problem) => {
      problemIds.add(problem.id);
    });

    sectionProblemIds.set(pattern.section, problemIds);
  });

  return Array.from(sectionProblemIds.entries()).map(
    ([section, problemIds]) => {
      const statusCounts = Array.from(problemIds).reduce<
        Record<ProgressStatus, number>
      >(
        (counts, problemId) => {
          const status = getProblemStatus(problemId) ?? DEFAULT_PROGRESS_STATUS;

          counts[status] += 1;

          return counts;
        },
        { ...EMPTY_PROGRESS_SUMMARY },
      );
      const totalCount = problemIds.size;
      const solvedCount = statusCounts.solved;

      return {
        attemptedCount: statusCounts.attempted,
        needReviewCount: statusCounts["need-review"],
        percentComplete: getPercentComplete(solvedCount, totalCount),
        remainingCount: totalCount - solvedCount,
        section,
        solvedCount,
        totalCount,
      };
    },
  );
}

function getPercentComplete(solvedCount: number, totalCount: number): number {
  return totalCount === 0 ? 0 : Math.round((solvedCount / totalCount) * 100);
}

function compareWeakSections(
  firstSection: SectionMetric,
  secondSection: SectionMetric,
): number {
  return (
    firstSection.percentComplete - secondSection.percentComplete ||
    secondSection.remainingCount - firstSection.remainingCount ||
    firstSection.section.localeCompare(secondSection.section)
  );
}
