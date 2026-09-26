import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Copy, Trash2 } from "lucide-react";
import { GameMetaForm } from "@/components/game-meta-form";
import { IndicatorsPanel } from "@/components/indicators-panel";
import { PeriodTable } from "@/components/period-table";
import { ShotPad } from "@/components/shot-pad";
import { SummaryBar } from "@/components/summary-bar";
import { Button } from "@/components/ui/button";
import {
  computeIndicators,
  formatDatePt,
  sumPeriods,
  type PeriodKey,
} from "@/lib/stats";
import { useGameStore } from "@/lib/store";

export const Route = createFileRoute("/jogo/$id")({
  component: GamePage,
});

function GamePage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const game = useGameStore((s) => s.games.find((g) => g.id === id));
  const updateMeta = useGameStore((s) => s.updateMeta);
  const setPeriodStat = useGameStore((s) => s.setPeriodStat);
  const addShot = useGameStore((s) => s.addShot);
  const deleteGame = useGameStore((s) => s.deleteGame);
  const duplicateMeta = useGameStore((s) => s.duplicateMeta);
  const [period, setPeriod] = useState<PeriodKey>("q1");
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (!game) {
    return (
      <section className="rounded-2xl bg-paper px-5 py-10 shadow-border">
        <h1 className="font-display text-3xl font-semibold">Jogo não encontrado</h1>
        <p className="mt-2 text-sm text-muted">
          Este registo não existe neste dispositivo.
        </p>
        <Button className="mt-6" asChild>
          <Link to="/">Voltar ao caderno</Link>
        </Button>
      </section>
    );
  }

  const totals = sumPeriods(game.periods);
  const indicators = computeIndicators(totals);

  return (
    <div className="flex min-w-0 flex-col gap-5 pb-24">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <Button variant="outline" size="icon" asChild aria-label="Voltar">
            <Link to="/">
              <ArrowLeft />
            </Link>
          </Button>
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-widest text-muted">
              {game.athlete || "Atleta"}
              {game.number ? ` · #${game.number}` : ""}
            </p>
            <h1 className="font-display text-3xl font-semibold tracking-tight">
              {game.opponent ? `vs ${game.opponent}` : "Novo jogo"}
            </h1>
            <p className="mt-1 text-sm text-muted">
              {formatDatePt(game.date)}
              {game.location ? ` · ${game.location}` : ""}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              const copy = duplicateMeta(game.id);
              if (copy) void navigate({ to: "/jogo/$id", params: { id: copy.id } });
            }}
          >
            <Copy />
            Nova ficha
          </Button>
          {confirmDelete ? (
            <Button
              type="button"
              variant="danger"
              onClick={() => {
                deleteGame(game.id);
                void navigate({ to: "/" });
              }}
            >
              Confirmar apagar
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline"
              onClick={() => setConfirmDelete(true)}
            >
              <Trash2 />
              Apagar
            </Button>
          )}
        </div>
      </div>

      <GameMetaForm
        game={game}
        onChange={(patch) => updateMeta(game.id, patch)}
      />

      <ShotPad
        period={period}
        stats={game.periods[period]}
        onPeriod={setPeriod}
        onShot={(kind, made, reverse) =>
          addShot(game.id, period, kind, made, reverse)
        }
        onStat={(key, value) => setPeriodStat(game.id, period, key, value)}
      />

      <PeriodTable
        periods={game.periods}
        onChange={(p, key, value) => setPeriodStat(game.id, p, key, value)}
      />

      <IndicatorsPanel totals={totals} indicators={indicators} />

      <SummaryBar totals={totals} pir={indicators.pir} />
    </div>
  );
}
