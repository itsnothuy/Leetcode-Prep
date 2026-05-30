import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { QuestionsTable } from "@/components/questions-table";
import { problems, swatiDataSummary } from "@/data";

export default function QuestionsPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="Questions"
        title="Swati question table"
        description={`${swatiDataSummary.patternQuestionEntryCount} pattern-question entries, ${swatiDataSummary.uniqueQuestionCount} unique questions, and ${swatiDataSummary.patternCount} patterns. Search, filters, and sorting are client-side for now; progress controls come in a later PR.`}
      />
      <QuestionsTable problems={problems} />
    </Container>
  );
}
