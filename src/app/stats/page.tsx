import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { PlaceholderPanel } from "@/components/placeholder-panel";

export default function StatsPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="Stats"
        title="Study stats"
        description="Lightweight stats can be added after the core tracker is useful and progress data has enough signal."
      />
      <PlaceholderPanel
        title="Stats placeholder"
        description="This route is ready for later summaries without adding charts ahead of the MVP."
        items={["By section", "By status", "By difficulty"]}
      />
    </Container>
  );
}
