type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="mb-8 max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-widest text-accent">
        {eyebrow}
      </p>
      <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">{title}</h1>
      <p className="mt-3 text-base leading-7 text-muted">{description}</p>
    </header>
  );
}
