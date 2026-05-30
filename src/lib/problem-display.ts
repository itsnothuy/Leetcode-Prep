import type { Problem } from "@/types/problem";

export function formatProblemNumber(number: Problem["number"]): string {
  return number === null ? "N/A" : number.toString();
}

export function formatSectionName(section: string): string {
  return section.replace(/^[IVXLCDM]+\.\s*/, "");
}

export function formatDifficulty(difficulty: Problem["difficulty"]): string {
  return difficulty ?? "Not listed";
}
