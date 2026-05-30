import type {
  Pattern,
  Problem,
  RawLeetCodeProblem,
  RawPatternGroup,
} from "@/types/problem";

const LEETCODE_PROBLEM_PREFIX = "https://leetcode.com/problems/";

export function createPatternId(patternNumber: number) {
  return `pattern-${patternNumber}`;
}

export function createProblemId(problem: Pick<RawLeetCodeProblem, "number">) {
  return `leetcode-${problem.number}`;
}

export function createProblemEntryId(
  patternNumber: number,
  problem: Pick<RawLeetCodeProblem, "number">,
) {
  return `${createPatternId(patternNumber)}-${createProblemId(problem)}`;
}

export function isOfficialLeetCodeUrl(url: string) {
  return url.startsWith(LEETCODE_PROBLEM_PREFIX);
}

export function toProblem(
  rawProblem: RawLeetCodeProblem,
  rawPattern: RawPatternGroup,
): Problem {
  const patternId = createPatternId(rawPattern.pattern_number);

  return {
    id: createProblemId(rawProblem),
    entryId: createProblemEntryId(rawPattern.pattern_number, rawProblem),
    number: rawProblem.number,
    title: rawProblem.title,
    url: rawProblem.url,
    patternId,
    patternName: rawPattern.pattern,
    section: rawPattern.section,
  };
}

export function toPattern(rawPattern: RawPatternGroup): Pattern {
  return {
    id: createPatternId(rawPattern.pattern_number),
    number: rawPattern.pattern_number,
    name: rawPattern.pattern,
    section: rawPattern.section,
    problemCount: rawPattern.problem_count,
    problems: rawPattern.problems.map((problem) =>
      toProblem(problem, rawPattern),
    ),
  };
}

export function getUniqueProblems(problems: readonly Problem[]) {
  const problemsById = new Map<string, Problem>();

  for (const problem of problems) {
    if (!problemsById.has(problem.id)) {
      problemsById.set(problem.id, problem);
    }
  }

  return Array.from(problemsById.values());
}

export function groupPatternsBySection(patterns: readonly Pattern[]) {
  return patterns.reduce<Record<string, Pattern[]>>((sections, pattern) => {
    sections[pattern.section] = [...(sections[pattern.section] ?? []), pattern];
    return sections;
  }, {});
}
