"use client";

import { useState } from "react";
import type { Problem } from "@/types/problem";
import {
  formatDifficulty,
  formatProblemNumber,
  formatSectionName,
} from "@/lib/problem-display";

type QuestionsTableProps = {
  problems: Problem[];
};

type SortKey = "number" | "title" | "pattern";
type SortDirection = "asc" | "desc";

const ALL_FILTER_VALUE = "all";

export function QuestionsTable({ problems }: QuestionsTableProps) {
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
          Filters are client-side only. Progress tracking and URL-backed pattern
          navigation are intentionally deferred to later PRs.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[960px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-muted text-xs uppercase tracking-widest text-muted">
              <th scope="col" className="w-24 px-4 py-3 font-semibold sm:px-5">
                Number
              </th>
              <th scope="col" className="px-4 py-3 font-semibold sm:px-5">
                Title
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
                  colSpan={5}
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
