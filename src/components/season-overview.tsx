import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  computeIndicators,
  formatDatePt,
  formatNum,
  formatPct,
  formatPlusMinus,
  resultKind,
  sumPeriods,
  type GameLog,
} from "@/lib/stats";
import { cn } from "@/lib/utils";

export function SeasonOverview({
  games,
  onNew,
  onDemo,
}: {
  games: GameLog[];
  onNew: () => void;
  onDemo: () => void;
}) {
  const sorted = [...games].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : b.updatedAt - a.updatedAt));
  const totalsList = sorted.map((g) => ({ game: g, totals: sumPeriods(g.periods) }));
  const n = totalsList.length;
  const avg = (pick: (t: (typeof totalsList)[number]["totals"]) => number) =>
    n === 0 ? 0 : totalsList.reduce((s, x) => s + pick(x.totals), 0) / n;
  const sumFg = totalsList.reduce((s, x) => s + x.totals.fgm, 0);
  const sumFga = totalsList.reduce((s, x) => s + x.totals.fga, 0);
  const sum3 = totalsList.reduce((s, x) => s + x.totals.fgm3, 0);
  const sum3a = totalsList.reduce((s, x) => s + x.totals.fga3, 0);
  const sumFt = totalsList.reduce((s, x) => s + x.totals.ftm, 0);
  const sumFta = totalsList.reduce((s, x) => s + x.totals.fta, 0);
  const avgPir =
    n === 0
      ? 0
      : totalsList.reduce((s, x) => s + computeIndicators(x.totals).pir, 0) / n;
  const maxPts = Math.max(1, ...totalsList.map((x) => x.totals.pts));

  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-muted">
            Registo individual
          </p>
          <h1 className="mt-1 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Caderno de jogo
          </h1>
        </div>
        <Button type="button" size="lg" onClick={onNew}>
          <Plus />
          Novo jogo
        </Button>
      </div>

      {n === 0 ? (
        <EmptyState onNew={onNew} onDemo={onDemo} />
      ) : (
        <>
          <section className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6">
            <StatTile label="Jogos" value={String(n)} />
            <StatTile label="Pts/jogo" value={formatNum(avg((t) => t.pts), 1)} />
            <StatTile label="Reb/jogo" value={formatNum(avg((t) => t.reb), 1)} />
            <StatTile label="Ast/jogo" value={formatNum(avg((t) => t.ast), 1)} />
            <StatTile
              label="FG%"
              value={formatPct(sumFga > 0 ? (sumFg / sumFga) * 100 : null)}
            />
            <StatTile label="PIR méd." value={formatNum(avgPir, 1)} />
          </section>

          <section className="rounded-2xl bg-paper p-4 shadow-border sm:p-5">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="font-display text-xl font-semibold tracking-tight">
                Pontos por jogo
              </h2>
              <p className="text-xs text-muted">
                3P {formatPct(sum3a > 0 ? (sum3 / sum3a) * 100 : null)} · LL{" "}
                {formatPct(sumFta > 0 ? (sumFt / sumFta) * 100 : null)}
              </p>
            </div>
            <div className="mt-4 flex h-36 items-end gap-2">
              {[...totalsList].reverse().map(({ game, totals }) => (
                <Link
                  key={game.id}
                  to="/jogo/$id"
                  params={{ id: game.id }}
                  className="group flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1.5 no-underline"
                  title={`${formatDatePt(game.date)} · ${totals.pts} pts`}
                >
                  <span className="text-xs tabular-nums text-muted">
                    {totals.pts}
                  </span>
                  <span
                    className="w-full max-w-12 rounded-t-md bg-primary/80 transition-colors duration-150 group-hover:bg-primary"
                    style={{ height: `${Math.max(8, (totals.pts / maxPts) * 100)}%` }}
                  />
                  <span className="w-full truncate text-center text-xs text-muted">
                    {game.opponent || "—"}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold tracking-tight">
              Jogos
            </h2>
            <ul className="mt-3 flex flex-col gap-2">
              {totalsList.map(({ game, totals }) => {
                const kind = resultKind(game.result);
                const pir = computeIndicators(totals).pir;
                return (
                  <li key={game.id}>
                    <Link
                      to="/jogo/$id"
                      params={{ id: game.id }}
                      className="flex flex-col gap-3 rounded-2xl bg-paper px-4 py-4 no-underline shadow-border transition-[box-shadow] duration-150 hover:shadow-border-hover sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-display text-lg font-semibold tracking-tight">
                            vs {game.opponent || "Adversário"}
                          </p>
                          {kind !== "unknown" && (
                            <Badge variant={kind === "win" ? "win" : "loss"}>
                              {kind === "win" ? "Vitória" : "Derrota"}
                            </Badge>
                          )}
                          {game.role ? (
                            <Badge variant="muted">
                              {game.role === "titular" ? "Titular" : "Suplente"}
                            </Badge>
                          ) : null}
                        </div>
                        <p className="mt-1 text-sm text-muted">
                          {formatDatePt(game.date)}
                          {game.competition ? ` · ${game.competition}` : ""}
                          {game.result ? ` · ${game.result}` : ""}
                        </p>
                      </div>
                      <dl className="flex flex-wrap gap-x-4 gap-y-1 text-sm tabular-nums">
                        <Mini k="PTS" v={formatNum(totals.pts)} accent />
                        <Mini k="REB" v={formatNum(totals.reb)} />
                        <Mini k="AST" v={formatNum(totals.ast)} />
                        <Mini k="MIN" v={formatNum(totals.minutes, 1)} />
                        <Mini k="+/−" v={formatPlusMinus(totals.plusMinus)} />
                        <Mini k="PIR" v={formatNum(pir)} accent />
                      </dl>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        </>
      )}
    </div>
  );
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-paper px-4 py-3 shadow-border">
      <p className="text-xs font-medium uppercase tracking-wider text-muted">
        {label}
      </p>
      <p className="mt-1 font-display text-2xl tabular-nums tracking-tight sm:text-3xl">
        {value}
      </p>
    </div>
  );
}

function Mini({
  k,
  v,
  accent,
}: {
  k: string;
  v: string;
  accent?: boolean;
}) {
  return (
    <div className="flex flex-col">
      <dt className="text-xs uppercase tracking-wider text-muted">{k}</dt>
      <dd
        className={cn(
          "font-display text-lg leading-none",
          accent && "text-primary",
        )}
      >
        {v}
      </dd>
    </div>
  );
}

function EmptyState({ onNew, onDemo }: { onNew: () => void; onDemo: () => void }) {
  return (
    <section className="flex flex-col items-start rounded-2xl bg-paper px-5 py-10 shadow-border sm:px-8">
      <p className="text-xs font-medium uppercase tracking-widest text-muted">
        Sem jogos ainda
      </p>
      <h2 className="mt-2 max-w-md font-display text-3xl font-semibold tracking-tight">
        A folha está em branco. Abra o primeiro jogo.
      </h2>
      <p className="mt-3 max-w-lg text-sm text-muted">
        Registe minutos, lançamentos, ressaltos, assistências, roubos, bloqueios,
        perdas, faltas e mais/menos — por período, com indicadores FIBA.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <Button type="button" onClick={onNew}>
          <Plus />
          Novo jogo
        </Button>
        <Button type="button" variant="outline" onClick={onDemo}>
          Carregar exemplos
        </Button>
      </div>
    </section>
  );
}
