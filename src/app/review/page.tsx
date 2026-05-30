import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { ReviewQueue } from "@/components/review-queue";
import { uniqueProblems } from "@/data";

export default function ReviewPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="Review"
        title="Review queue"
        description="A local queue for questions marked Need Review, Attempted, or low confidence. Keep this lightweight for now: no spaced repetition or backend sync yet."
      />
      <ReviewQueue problems={uniqueProblems} />
    </Container>
  );
}
