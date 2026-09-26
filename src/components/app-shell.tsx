import { useEffect, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { BasketballMark } from "@/components/basketball-mark";
import { rehydrateGames } from "@/lib/store";

export function AppShell({ children }: { children: ReactNode }) {
  useEffect(() => {
    rehydrateGames();
  }, []);

  return (
    <div className="relative min-h-dvh">
      <header className="sticky top-0 z-30 border-b border-border/80 bg-bg/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6">
          <Link
            to="/"
            className="flex items-center gap-2.5 text-fg no-underline"
            aria-label="BAMBAM 00 - Tiago da Silva — início"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-paper shadow-border">
              <BasketballMark className="size-5" />
            </span>
            <span className="flex min-w-0 flex-col leading-none">
              <span className="truncate font-display text-lg font-semibold tracking-tight">
                BAMBAM 00 - Tiago da Silva
              </span>
              <span className="mt-0.5 hidden text-xs font-medium uppercase tracking-widest text-muted sm:block">
                Registo de jogo
              </span>
            </span>
          </Link>
          <p className="hidden text-xs text-muted md:block">
            15 estatísticas · totais automáticos
          </p>
        </div>
      </header>
      <main className="mx-auto w-full min-w-0 max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        {children}
      </main>
    </div>
  );
}
