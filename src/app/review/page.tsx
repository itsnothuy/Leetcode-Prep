import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { PlaceholderPanel } from "@/components/placeholder-panel";

export default function ReviewPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="Review"
        title="Review queue"
        description="Attempted, need-review, and low-confidence problems will appear here after progress tracking exists."
      />
      <PlaceholderPanel
        title="Review placeholder"
        description="This route stays intentionally empty until question statuses can be saved locally."
        items={["Need review", "Attempted", "Low confidence"]}
      />
    </Container>
  );
}
