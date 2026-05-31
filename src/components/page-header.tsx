type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="mb-8 overflow-hidden rounded-2xl border border-border bg-surface/85 p-6 shadow-sm backdrop-blur sm:p-8">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
          {eyebrow}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-base leading-7 text-muted">{description}</p>
      </div>
    </header>
  );
}
