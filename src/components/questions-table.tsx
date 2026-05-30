"use client";

import { useState } from "react";
import { useProblemProgress } from "@/hooks/use-problem-progress";
import type { Problem } from "@/types/problem";
import {
  formatDifficulty,
  formatProblemNumber,
  formatSectionName,
} from "@/lib/problem-display";
import {
  DEFAULT_PROGRESS_STATUS,
  PROGRESS_STATUS_OPTIONS,
  getProgressStatusLabel,
  isProgressStatus,
} from "@/lib/progress";
import type { ProgressStatus } from "@/types/progress";

type QuestionsTableProps = {
  problems: Problem[];
};

type SortKey = "number" | "title" | "pattern";
type SortDirection = "asc" | "desc";

const ALL_FILTER_VALUE = "all";

export function QuestionsTable({ problems }: QuestionsTableProps) {
  const {
    getProblemStatus,
    isLoaded: isProgressLoaded,
    storageError,
    updateProblemStatus,
  } = useProblemProgress();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSection, setSelectedSection] = useState(ALL_FILTER_VALUE);
  const [selectedPatternId, setSelectedPatternId] = useState(ALL_FILTER_VALUE);
  const [selectedDifficulty, setSelectedDifficulty] =
    useState(ALL_FILTER_VALUE);
  const [sortKey, setSortKey] = useState<SortKey>("number");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const sectionOptions = getSectionOptions(problems);
  const patternOptions = getPatternOptions(problems);
  const difficultyOptions = getDifficultyOptions(problems);
  const progressSummary = getProgressSummary(problems, getProblemStatus);

  const normalizedSearch = searchQuery.trim().toLowerCase();
  const filteredProblems = problems
    .filter((problem) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        problem.title.toLowerCase().includes(normalizedSearch);
      const matchesSection =
        selectedSection === ALL_FILTER_VALUE ||
        problem.section === selectedSection;
      const matchesPattern =
        selectedPatternId === ALL_FILTER_VALUE ||
        problem.patternId === selectedPatternId;
      const matchesDifficulty =
        selectedDifficulty === ALL_FILTER_VALUE ||
        problem.difficulty === selectedDifficulty;

      return (
        matchesSearch &&
        matchesSection &&
        matchesPattern &&
        matchesDifficulty
      );
    })
    .sort((firstProblem, secondProblem) =>
      compareProblems(firstProblem, secondProblem, sortKey, sortDirection),
    );

  const hasActiveFilters =
    normalizedSearch.length > 0 ||
    selectedSection !== ALL_FILTER_VALUE ||
    selectedPatternId !== ALL_FILTER_VALUE ||
    selectedDifficulty !== ALL_FILTER_VALUE ||
    sortKey !== "number" ||
    sortDirection !== "asc";

  function clearFilters() {
    setSearchQuery("");
    setSelectedSection(ALL_FILTER_VALUE);
    setSelectedPatternId(ALL_FILTER_VALUE);
    setSelectedDifficulty(ALL_FILTER_VALUE);
    setSortKey("number");
    setSortDirection("asc");
  }

  return (
    <section className="rounded-md border border-border bg-surface shadow-sm">
      <div className="flex flex-col gap-4 border-b border-border px-4 py-4 sm:px-5">
        <div className="flex flex-col gap-1">
          <h2 className="text-base font-semibold">All Swati pattern entries</h2>
          <p className="text-sm leading-6 text-muted">
            Showing {filteredProblems.length} of {problems.length} rows.
            Duplicate LeetCode questions stay visible when they belong to more
            than one pattern.
          </p>
        </div>

        <div className="grid gap-3 rounded-md bg-surface-muted p-3 text-sm sm:grid-cols-4">
          <ProgressSummaryItem
            label="Solved"
            value={progressSummary.solved}
          />
          <ProgressSummaryItem
            label="Attempted"
            value={progressSummary.attempted}
          />
          <ProgressSummaryItem
            label="Need review"
            value={progressSummary["need-review"]}
          />
          <ProgressSummaryItem
            label="Not started"
            value={progressSummary["not-started"]}
          />
        </div>

        <div className="grid gap-3 lg:grid-cols-[minmax(16rem,1.3fr)_1fr_1fr_1fr_auto_auto]">
          <label className="flex flex-col gap-2 text-sm font-medium">
            Search title
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="e.g. two sum"
              className="h-10 rounded-md border border-border bg-background px-3 text-sm font-normal outline-none transition focus:border-accent"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium">
            Section
            <select
              value={selectedSection}
              onChange={(event) => setSelectedSection(event.target.value)}
              className="h-10 rounded-md border border-border bg-background px-3 text-sm font-normal outline-none transition focus:border-accent"
            >
              <option value={ALL_FILTER_VALUE}>All sections</option>
              {sectionOptions.map((section) => (
                <option key={section} value={section}>
                  {formatSectionName(section)}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium">
            Pattern
            <select
              value={selectedPatternId}
              onChange={(event) => setSelectedPatternId(event.target.value)}
              className="h-10 rounded-md border border-border bg-background px-3 text-sm font-normal outline-none transition focus:border-accent"
            >
              <option value={ALL_FILTER_VALUE}>All patterns</option>
              {patternOptions.map((pattern) => (
                <option key={pattern.id} value={pattern.id}>
                  {pattern.name}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium">
            Difficulty
            <select
              value={selectedDifficulty}
              onChange={(event) => setSelectedDifficulty(event.target.value)}
              disabled={difficultyOptions.length === 0}
              className="h-10 rounded-md border border-border bg-background px-3 text-sm font-normal outline-none transition focus:border-accent disabled:cursor-not-allowed disabled:text-muted"
            >
              <option value={ALL_FILTER_VALUE}>
                {difficultyOptions.length === 0
                  ? "Not in source data"
                  : "All difficulties"}
              </option>
              {difficultyOptions.map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {difficulty}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium">
            Sort by
            <select
              value={sortKey}
              onChange={(event) => setSortKey(event.target.value as SortKey)}
              className="h-10 rounded-md border border-border bg-background px-3 text-sm font-normal outline-none transition focus:border-accent"
            >
              <option value="number">Number</option>
              <option value="title">Title</option>
              <option value="pattern">Pattern</option>
            </select>
          </label>

          <div className="flex items-end gap-2">
            <button
              type="button"
              onClick={() =>
                setSortDirection((currentDirection) =>
                  currentDirection === "asc" ? "desc" : "asc",
                )
              }
              className="h-10 rounded-md border border-border px-3 text-sm font-semibold transition hover:border-accent hover:text-accent"
            >
              {sortDirection === "asc" ? "Asc" : "Desc"}
            </button>
            <button
              type="button"
              onClick={clearFilters}
              disabled={!hasActiveFilters}
              className="h-10 rounded-md bg-accent px-3 text-sm font-semibold text-accent-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-45"
            >
              Clear
            </button>
          </div>
        </div>

        <p className="text-xs leading-5 text-muted">
          Filters are client-side only. Progress is saved in this browser with
          localStorage and tracked per unique LeetCode question.
        </p>
        {storageError ? (
          <p className="rounded-md border border-warning/40 bg-warning/10 px-3 py-2 text-xs font-medium text-warning">
            {storageError}
          </p>
        ) : null}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1120px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-muted text-xs uppercase tracking-widest text-muted">
              <th scope="col" className="w-24 px-4 py-3 font-semibold sm:px-5">
                Number
              </th>
              <th scope="col" className="px-4 py-3 font-semibold sm:px-5">
                Title
              </th>
              <th scope="col" className="px-4 py-3 font-semibold sm:px-5">
                Status
              </th>
              <th scope="col" className="px-4 py-3 font-semibold sm:px-5">
                Pattern
              </th>
              <th scope="col" className="px-4 py-3 font-semibold sm:px-5">
                Section
              </th>
              <th scope="col" className="px-4 py-3 font-semibold sm:px-5">
                Difficulty
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProblems.map((problem) => (
              <tr
                key={problem.entryId}
                className="border-b border-border last:border-b-0 hover:bg-surface-muted/60"
              >
                <td className="px-4 py-4 align-top font-mono text-xs text-muted sm:px-5">
                  {formatProblemNumber(problem.number)}
                </td>
                <td className="max-w-md px-4 py-4 align-top sm:px-5">
                  <a
                    href={problem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-accent underline-offset-4 hover:underline"
                  >
                    {problem.title}
                  </a>
                </td>
                <td className="px-4 py-4 align-top sm:px-5">
                  <ProblemStatusSelect
                    isLoaded={isProgressLoaded}
                    problem={problem}
                    status={getProblemStatus(problem.id)}
                    onStatusChange={updateProblemStatus}
                  />
                </td>
                <td className="px-4 py-4 align-top text-foreground sm:px-5">
                  {problem.patternName}
                </td>
                <td className="px-4 py-4 align-top text-muted sm:px-5">
                  {formatSectionName(problem.section)}
                </td>
                <td className="px-4 py-4 align-top text-muted sm:px-5">
                  {formatDifficulty(problem.difficulty)}
                </td>
              </tr>
            ))}
            {filteredProblems.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-10 text-center text-sm text-muted sm:px-5"
                >
                  No questions match these filters. Clear filters to return to
                  the full Swati question list.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}

type ProblemStatusSelectProps = {
  isLoaded: boolean;
  problem: Problem;
  status: ProgressStatus;
  onStatusChange: (problemId: string, status: ProgressStatus) => void;
};

function ProblemStatusSelect({
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

type ProgressSummaryItemProps = {
  label: string;
  value: number;
};

function ProgressSummaryItem({ label, value }: ProgressSummaryItemProps) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-muted">
        {label}
      </p>
      <p className="mt-1 text-xl font-semibold">{value}</p>
    </div>
  );
}

function getSectionOptions(problems: Problem[]): string[] {
  return Array.from(new Set(problems.map((problem) => problem.section)));
}

function getPatternOptions(
  problems: Problem[],
): { id: string; name: string }[] {
  const patternsById = new Map<
    string,
    Pick<Problem, "patternId" | "patternName">
  >();

  problems.forEach((problem) => {
    patternsById.set(problem.patternId, {
      patternId: problem.patternId,
      patternName: problem.patternName,
    });
  });

  return Array.from(patternsById.values())
    .map((pattern) => ({
      id: pattern.patternId,
      name: pattern.patternName,
    }))
    .sort((firstPattern, secondPattern) =>
      firstPattern.name.localeCompare(secondPattern.name),
    );
}

function getDifficultyOptions(
  problems: Problem[],
): NonNullable<Problem["difficulty"]>[] {
  return Array.from(
    new Set(
      problems
        .map((problem) => problem.difficulty)
        .filter((difficulty): difficulty is NonNullable<Problem["difficulty"]> =>
          Boolean(difficulty),
        ),
    ),
  );
}

function compareProblems(
  firstProblem: Problem,
  secondProblem: Problem,
  sortKey: SortKey,
  sortDirection: SortDirection,
): number {
  const multiplier = sortDirection === "asc" ? 1 : -1;

  if (sortKey === "number") {
    return (
      compareProblemNumbers(firstProblem.number, secondProblem.number) *
      multiplier
    );
  }

  if (sortKey === "pattern") {
    return (
      firstProblem.patternName.localeCompare(secondProblem.patternName) *
      multiplier
    );
  }

  return firstProblem.title.localeCompare(secondProblem.title) * multiplier;
}

function compareProblemNumbers(
  firstNumber: Problem["number"],
  secondNumber: Problem["number"],
): number {
  const normalizedFirstNumber = firstNumber ?? Number.MAX_SAFE_INTEGER;
  const normalizedSecondNumber = secondNumber ?? Number.MAX_SAFE_INTEGER;

  return normalizedFirstNumber - normalizedSecondNumber;
}

function getProgressSummary(
  problems: Problem[],
  getProblemStatus: (problemId: string) => ProgressStatus,
): Record<ProgressStatus, number> {
  const summary: Record<ProgressStatus, number> = {
    "not-started": 0,
    attempted: 0,
    solved: 0,
    "need-review": 0,
    skipped: 0,
  };
  const seenProblemIds = new Set<string>();

  problems.forEach((problem) => {
    if (seenProblemIds.has(problem.id)) {
      return;
    }

    seenProblemIds.add(problem.id);
    summary[getProblemStatus(problem.id) ?? DEFAULT_PROGRESS_STATUS] += 1;
  });

  return summary;
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
