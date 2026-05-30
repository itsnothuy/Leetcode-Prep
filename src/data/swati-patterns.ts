import { swatiPatterns as rawSwatiPatterns } from "../../swati_patterns_data";
import {
  getUniqueProblems,
  groupPatternsBySection,
  isOfficialLeetCodeUrl,
  toPattern,
} from "@/lib/problem-utils";
import type { Pattern, Problem } from "@/types/problem";

export const patterns: Pattern[] = rawSwatiPatterns.map(toPattern);

export const problems: Problem[] = patterns.flatMap(
  (pattern) => pattern.problems,
);

export const uniqueProblems: Problem[] = getUniqueProblems(problems);

export const patternsBySection = groupPatternsBySection(patterns);

export const swatiDataSummary = {
  patternCount: patterns.length,
  patternQuestionEntryCount: problems.length,
  uniqueQuestionCount: uniqueProblems.length,
  invalidLeetCodeUrlCount: problems.filter(
    (problem) => !isOfficialLeetCodeUrl(problem.url),
  ).length,
} as const;

export { rawSwatiPatterns };
export type { Pattern, Problem };
