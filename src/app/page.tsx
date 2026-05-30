import { Container } from "@/components/container";
import { DashboardOverview } from "@/components/dashboard-overview";
import { PageHeader } from "@/components/page-header";
import { patterns, uniqueProblems } from "@/data";

export default function Home() {
  return (
    <Container>
      <PageHeader
        eyebrow="Dashboard"
        title="Prep overview"
        description="A live summary of your local progress across the Swati pattern sheet, with totals, review pressure, and the sections that need the next pass."
      />
      <DashboardOverview patterns={patterns} uniqueProblems={uniqueProblems} />
    </Container>
  );
}
