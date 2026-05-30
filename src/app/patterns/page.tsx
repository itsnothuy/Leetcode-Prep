import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { PlaceholderPanel } from "@/components/placeholder-panel";

export default function PatternsPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="Patterns"
        title="Pattern overview"
        description="Pattern groups will show section context and solved counts after the typed data and local progress slices are complete."
      />
      <PlaceholderPanel
        title="Patterns placeholder"
        description="This page is reserved for pattern cards and progress summaries."
        items={["Pattern name", "Section", "Solved / total"]}
      />
    </Container>
  );
}
