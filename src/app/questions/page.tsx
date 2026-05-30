import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { QuestionsTable } from "@/components/questions-table";
import { problems, swatiDataSummary } from "@/data";

type QuestionsPageProps = {
  searchParams?: Promise<{
    pattern?: string | string[];
  }>;
};

export default async function QuestionsPage({
  searchParams,
}: QuestionsPageProps) {
  const resolvedSearchParams = await searchParams;
  const patternParam = resolvedSearchParams?.pattern;
  const initialPatternId = Array.isArray(patternParam)
    ? patternParam[0]
    : patternParam;

  return (
    <Container>
      <PageHeader
        eyebrow="Questions"
        title="Swati question table"
        description={`${swatiDataSummary.patternQuestionEntryCount} pattern-question entries, ${swatiDataSummary.uniqueQuestionCount} unique questions, and ${swatiDataSummary.patternCount} patterns. Search, filters, sorting, and progress tracking are client-side for now.`}
      />
      <QuestionsTable
        key={initialPatternId ?? "all-patterns"}
        initialPatternId={initialPatternId}
        problems={problems}
      />
    </Container>
  );
}
