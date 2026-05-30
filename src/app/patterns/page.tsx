import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { PatternsOverview } from "@/components/patterns-overview";
import { patterns, swatiDataSummary } from "@/data";

export default function PatternsPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="Patterns"
        title="Browse by pattern"
        description={`${swatiDataSummary.patternCount} Swati patterns grouped by section. Progress is read from localStorage and each card links back to the filtered questions table.`}
      />
      <PatternsOverview patterns={patterns} />
    </Container>
  );
}
