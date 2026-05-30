import type { Problem } from "@/types/problem";
import {
  formatDifficulty,
  formatProblemNumber,
  formatSectionName,
} from "@/lib/problem-display";

type QuestionsTableProps = {
  problems: Problem[];
};

export function QuestionsTable({ problems }: QuestionsTableProps) {
  return (
    <section className="rounded-md border border-border bg-surface shadow-sm">
      <div className="flex flex-col gap-1 border-b border-border px-4 py-4 sm:px-5">
        <h2 className="text-base font-semibold">All Swati pattern entries</h2>
        <p className="text-sm leading-6 text-muted">
          {problems.length} rows, with duplicate LeetCode questions preserved
          when they belong to more than one pattern.
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
            {problems.map((problem) => (
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
          </tbody>
        </table>
      </div>
    </section>
  );
}
