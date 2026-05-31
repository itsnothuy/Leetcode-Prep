import type { ReactNode } from "react";
import { AppSidebar, TopNav } from "@/components/app-navigation";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen text-foreground">
      <TopNav />
      <div className="mx-auto flex min-h-screen w-full max-w-7xl">
        <AppSidebar />
        <main
          id="main-content"
          className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-10"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
