import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { PlaceholderPanel } from "@/components/placeholder-panel";

export default function QuestionsPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="Questions"
        title="Question table"
        description="The static Swati question list will land here before search, filters, and progress controls."
      />
      <PlaceholderPanel
        title="Questions placeholder"
        description="The next data-focused PRs will connect typed Swati data and render official LeetCode links."
        items={["Problem title", "Pattern", "Section"]}
      />
    </Container>
  );
}
