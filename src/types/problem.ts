export type Difficulty = "Easy" | "Medium" | "Hard";

export type RawLeetCodeProblem = {
  number: number;
  title: string;
  url: string;
};

export type RawPatternGroup = {
  section: string;
  pattern_number: number;
  pattern: string;
  problem_count: number;
  problems: readonly RawLeetCodeProblem[];
};

export type Problem = {
  id: string;
  entryId: string;
  number: number | null;
  title: string;
  url: string;
  difficulty?: Difficulty;
  patternId: string;
  patternName: string;
  section: string;
};

export type Pattern = {
  id: string;
  number: number;
  name: string;
  section: string;
  problemCount: number;
  problems: Problem[];
};
