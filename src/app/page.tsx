import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { PlaceholderPanel } from "@/components/placeholder-panel";

export default function Home() {
  return (
    <Container>
      <PageHeader
        eyebrow="Dashboard"
        title="Prep overview"
        description="A quiet home base for progress totals, review pressure, and weak sections once tracking data exists."
      />
      <PlaceholderPanel
        title="Dashboard placeholder"
        description="This space will become the first read on study progress after local progress tracking is added."
        items={["Total questions", "Solved progress", "Review queue"]}
      />
    </Container>
  );
}
