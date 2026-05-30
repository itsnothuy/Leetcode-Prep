export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16">
      <section className="w-full max-w-4xl rounded-[2rem] border border-border bg-surface p-8 shadow-sm sm:p-12">
        <div className="max-w-2xl space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">
            Phase 1
          </p>
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              LeetCode Pattern Tracker
            </h1>
            <p className="text-lg leading-8 text-muted">
              The Next.js foundation is ready. This app will help users track
              LeetCode questions by pattern using verified Swati data, static
              frontend-first pages, and local progress state.
            </p>
          </div>
          <div className="grid gap-3 text-sm text-muted sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-background/80 p-4">
              App Router + TypeScript
            </div>
            <div className="rounded-2xl border border-border bg-background/80 p-4">
              Tailwind CSS + ESLint
            </div>
            <div className="rounded-2xl border border-border bg-background/80 p-4">
              Static data preserved
            </div>
          </div>
          <div className="rounded-2xl border border-dashed border-border p-5">
            <p className="text-sm font-medium text-foreground">
              Next slices in the roadmap
            </p>
            <p className="mt-2 text-sm leading-7 text-muted">
              Add CI, build the shared app shell, then move the Swati dataset
              into typed frontend modules before we tackle the questions table.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
