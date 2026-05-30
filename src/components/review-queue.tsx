"use client";

import Link from "next/link";
import { ProblemStatusSelect } from "@/components/problem-status-select";
import { useProblemProgress } from "@/hooks/use-problem-progress";
import {
  formatDifficulty,
  formatProblemNumber,
  formatSectionName,
} from "@/lib/problem-display";
import { getProgressStatusLabel } from "@/lib/progress";
import type { Problem } from "@/types/problem";
import type {
  ProblemProgress,
  ProblemProgressById,
  ProgressStatus,
} from "@/types/progress";

type ReviewQueueProps = {
  problems: Problem[];
};

type ReviewItem = {
  problem: Problem;
  progress: ProblemProgress;
  reason: string;
  priority: number;
};

const REVIEW_STATUS_PRIORITIES: Partial<Record<ProgressStatus, number>> = {
  "need-review": 0,
  attempted: 1,
};

export function ReviewQueue({ problems }: ReviewQueueProps) {
  const {
    getProblemStatus,
    isLoaded,
    progressByProblemId,
    storageError,
    updateProblemStatus,
  } = useProblemProgress();
  const reviewItems = getReviewItems(problems, progressByProblemId);
  const needReviewCount = reviewItems.filter(
    (item) => item.progress.status === "need-review",
  ).length;
  const attemptedCount = reviewItems.filter(
    (item) => item.progress.status === "attempted",
  ).length;
  const lowConfidenceCount = reviewItems.filter(
    (item) => isLowConfidence(item.progress),
  ).length;

  return (
    <section className="space-y-5">
      {storageError ? (
        <p className="rounded-md border border-warning/40 bg-warning/10 px-4 py-3 text-sm font-medium text-warning">
          {storageError}
        </p>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-3">
        <ReviewSummaryCard label="Need review" value={needReviewCount} />
        <ReviewSummaryCard label="Attempted" value={attemptedCount} />
        <ReviewSummaryCard label="Low confidence" value={lowConfidenceCount} />
      </div>

      {reviewItems.length > 0 ? (
        <div className="space-y-3">
          {reviewItems.map((item) => (
            <ReviewProblemCard
              key={item.problem.id}
              isLoaded={isLoaded}
              item={item}
              onStatusChange={updateProblemStatus}
              status={getProblemStatus(item.problem.id)}
            />
          ))}
        </div>
      ) : (
        <ReviewEmptyState />
      )}
    </section>
  );
}

type ReviewSummaryCardProps = {
  label: string;
  value: number;
};

function ReviewSummaryCard({ label, value }: ReviewSummaryCardProps) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}

type ReviewProblemCardProps = {
  isLoaded: boolean;
  item: ReviewItem;
  onStatusChange: (problemId: string, status: ProgressStatus) => void;
  status: ProgressStatus;
};

function ReviewProblemCard({
  isLoaded,
  item,
  onStatusChange,
  status,
}: ReviewProblemCardProps) {
  const { problem, progress, reason } = item;

  return (
    <article className="rounded-lg border border-border bg-surface p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-surface-muted px-2.5 py-1 font-mono text-xs font-semibold text-muted">
              {formatProblemNumber(problem.number)}
            </span>
            <span className="rounded-full border border-warning/40 bg-warning/10 px-2.5 py-1 text-xs font-semibold text-warning">
              {reason}
            </span>
          </div>
          <h2 className="mt-3 text-xl font-semibold leading-7">
            <a
              href={problem.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline-offset-4 hover:underline"
            >
              {problem.title}
            </a>
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            {problem.patternName}, {formatSectionName(problem.section)},{" "}
            {formatDifficulty(problem.difficulty)}
          </p>
        </div>

        <div className="shrink-0">
          <ProblemStatusSelect
            isLoaded={isLoaded}
            problem={problem}
            status={status}
            onStatusChange={onStatusChange}
          />
        </div>
      </div>

      <dl className="mt-5 grid gap-3 rounded-md bg-surface-muted p-4 text-sm sm:grid-cols-3">
        <ReviewMeta label="Status" value={getProgressStatusLabel(status)} />
        <ReviewMeta label="Attempts" value={progress.attempts.toString()} />
        <ReviewMeta label="Last updated" value={formatUpdatedAt(progress)} />
        {progress.confidence ? (
          <ReviewMeta
            label="Confidence"
            value={`${progress.confidence} / 5`}
          />
        ) : null}
      </dl>
    </article>
  );
}

type ReviewMetaProps = {
  label: string;
  value: string;
};

function ReviewMeta({ label, value }: ReviewMetaProps) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-widest text-muted">
        {label}
      </dt>
      <dd className="mt-1 font-medium">{value}</dd>
    </div>
  );
}

function ReviewEmptyState() {
  return (
    <div className="rounded-lg border border-dashed border-border bg-surface p-8 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-accent">
        Nothing to review
      </p>
      <h2 className="mt-3 text-2xl font-semibold">Your review queue is clear</h2>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted">
        Problems appear here after you mark them Attempted, Need Review, or
        give them low confidence later. For now, head back to the questions
        table and keep moving.
      </p>
      <Link
        href="/questions"
        className="mt-6 inline-flex rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition hover:opacity-90"
      >
        Open questions
      </Link>
    </div>
  );
}

function getReviewItems(
  problems: Problem[],
  progressByProblemId: ProblemProgressById,
): ReviewItem[] {
  return problems
    .map((problem) => {
      const progress = progressByProblemId[problem.id];

      if (!progress || !shouldReview(progress)) {
        return null;
      }

      return {
        problem,
        progress,
        reason: getReviewReason(progress),
        priority: getReviewPriority(progress),
      };
    })
    .filter((item): item is ReviewItem => item !== null)
    .sort(compareReviewItems);
}

function shouldReview(progress: ProblemProgress): boolean {
  return (
    progress.status === "need-review" ||
    progress.status === "attempted" ||
    isLowConfidence(progress)
  );
}

function isLowConfidence(progress: ProblemProgress): boolean {
  return progress.confidence !== undefined && progress.confidence <= 2;
}

function getReviewReason(progress: ProblemProgress): string {
  if (progress.status === "need-review") {
    return "Need Review";
  }

  if (progress.status === "attempted") {
    return "Attempted";
  }

  if (isLowConfidence(progress)) {
    return "Low Confidence";
  }

  return "Review";
}

function getReviewPriority(progress: ProblemProgress): number {
  return REVIEW_STATUS_PRIORITIES[progress.status] ?? 2;
}

function compareReviewItems(firstItem: ReviewItem, secondItem: ReviewItem) {
  return (
    firstItem.priority - secondItem.priority ||
    compareUpdatedAt(firstItem.progress, secondItem.progress) ||
    compareProblemNumbers(firstItem.problem.number, secondItem.problem.number)
  );
}

function compareUpdatedAt(
  firstProgress: ProblemProgress,
  secondProgress: ProblemProgress,
): number {
  return (
    new Date(firstProgress.lastUpdatedAt).getTime() -
    new Date(secondProgress.lastUpdatedAt).getTime()
  );
}

function compareProblemNumbers(
  firstNumber: Problem["number"],
  secondNumber: Problem["number"],
): number {
  const normalizedFirstNumber = firstNumber ?? Number.MAX_SAFE_INTEGER;
  const normalizedSecondNumber = secondNumber ?? Number.MAX_SAFE_INTEGER;

  return normalizedFirstNumber - normalizedSecondNumber;
}

function formatUpdatedAt(progress: ProblemProgress): string {
  const date = new Date(progress.lastUpdatedAt);

  if (Number.isNaN(date.getTime())) {
    return "Unknown";
  }

  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
