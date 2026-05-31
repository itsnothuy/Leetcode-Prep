"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Dashboard" },
  { href: "/questions", label: "Questions" },
  { href: "/patterns", label: "Patterns" },
  { href: "/review", label: "Review" },
  { href: "/stats", label: "Stats" },
];

function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === href : pathname.startsWith(href);
}

function NavLinks({ compact = false }: { compact?: boolean }) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary navigation"
      className={compact ? "flex gap-2 overflow-x-auto pb-1" : "grid gap-1"}
    >
      {navItems.map((item) => {
        const active = isActivePath(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={[
              "rounded-xl px-3 py-2 text-sm font-semibold transition",
              compact ? "shrink-0" : "",
              active
                ? "bg-accent text-accent-foreground shadow-sm"
                : "text-muted hover:bg-surface-muted hover:text-foreground",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function TopNav() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-surface/90 px-4 py-3 shadow-sm backdrop-blur lg:hidden">
      <div className="mb-3 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="grid size-8 place-items-center rounded-xl bg-foreground text-sm text-background shadow-sm">
            LP
          </span>
          <span>Pattern Tracker</span>
        </Link>
        <a
          href="#main-content"
          className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted"
        >
          Skip
        </a>
      </div>
      <NavLinks compact />
    </header>
  );
}

export function AppSidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-border bg-surface/90 px-5 py-6 shadow-sm backdrop-blur lg:block">
      <Link href="/" className="mb-8 flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-2xl bg-foreground text-sm font-semibold text-background shadow-sm">
          LP
        </span>
        <span>
          <span className="block text-sm font-semibold">LeetCode Prep</span>
          <span className="block text-xs text-muted">Pattern Tracker</span>
        </span>
      </Link>
      <NavLinks />
      <div className="mt-8 rounded-2xl border border-border bg-surface-muted/80 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
          Local-first MVP
        </p>
        <p className="mt-2 text-sm font-semibold">Static data, local progress</p>
        <p className="mt-1 text-xs leading-5 text-muted">
          Backend sync stays deferred until the tracker is useful on its own.
        </p>
      </div>
    </aside>
  );
}
