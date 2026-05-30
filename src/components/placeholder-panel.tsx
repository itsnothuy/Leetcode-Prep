type PlaceholderPanelProps = {
  title: string;
  description: string;
  items: string[];
};

export function PlaceholderPanel({
  title,
  description,
  items,
}: PlaceholderPanelProps) {
  return (
    <section className="rounded-md border border-border bg-surface p-5 shadow-sm">
      <div className="flex flex-col gap-2 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold">{title}</h2>
          <p className="mt-1 text-sm leading-6 text-muted">{description}</p>
        </div>
        <span className="w-fit rounded-md bg-surface-muted px-3 py-1 text-xs font-medium text-muted">
          Placeholder
        </span>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {items.map((item) => (
          <div
            key={item}
            className="min-h-24 rounded-md border border-border bg-background p-4 text-sm font-medium text-muted"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
