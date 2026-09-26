import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  PERIODS,
  STAT_DEFS,
  derivePeriod,
  formatNum,
  formatPct,
  type PeriodKey,
  type PeriodStats,
  type ShotKind,
  type StatKey,
} from "@/lib/stats";
import { cn } from "@/lib/utils";

const SHOTS: {
  kind: ShotKind;
  label: string;
  madeKey: StatKey;
  attKey: StatKey;
}[] = [
  { kind: "2", label: "2 pontos", madeKey: "fgm2", attKey: "fga2" },
  { kind: "3", label: "3 pontos", madeKey: "fgm3", attKey: "fga3" },
  { kind: "ft", label: "Livres", madeKey: "ftm", attKey: "fta" },
];

const ACTION_STATS: StatKey[] = [
  "minutes",
  "oreb",
  "dreb",
  "ast",
  "stl",
  "blk",
  "tov",
  "pf",
  "plusMinus",
];

export function ShotPad({
  period,
  stats,
  onPeriod,
  onShot,
  onStat,
}: {
  period: PeriodKey;
  stats: PeriodStats;
  onPeriod: (key: PeriodKey) => void;
  onShot: (kind: ShotKind, made: boolean, reverse?: boolean) => void;
  onStat: (key: StatKey, value: number) => void;
}) {
  const derived = derivePeriod(stats);

  return (
    <section className="min-w-0 rounded-2xl bg-paper p-4 shadow-border sm:p-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-semibold tracking-tight">
            Ao vivo
          </h2>
          <p className="mt-1 text-sm text-muted">
            Toque para marcar. Convertido também conta a tentativa.
          </p>
        </div>
        <p className="font-display text-2xl tabular-nums tracking-tight">
          {derived.pts}
          <span className="ml-1.5 text-sm font-sans font-medium text-muted">
            pts neste período
          </span>
        </p>
      </div>

      <div
        className="mt-4 flex gap-1.5 rounded-xl bg-bg/80 p-1"
        role="tablist"
        aria-label="Período"
      >
        {PERIODS.map((p) => (
          <button
            key={p.key}
            type="button"
            role="tab"
            aria-selected={period === p.key}
            onClick={() => onPeriod(p.key)}
            className={cn(
              "h-10 flex-1 rounded-lg text-sm font-medium transition-colors duration-150",
              period === p.key
                ? "bg-primary text-primary-fg shadow-border"
                : "text-muted hover:text-fg",
            )}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {SHOTS.map((shot) => {
          const made = stats[shot.madeKey];
          const att = stats[shot.attKey];
          const pct = att > 0 ? (made / att) * 100 : null;
          return (
            <div
              key={shot.kind}
              className="flex flex-col rounded-xl bg-bg/70 p-3 shadow-border"
            >
              <div className="flex items-baseline justify-between">
                <p className="text-sm font-medium">{shot.label}</p>
                <p className="text-xs tabular-nums text-muted">{formatPct(pct)}</p>
              </div>
              <p className="mt-1 font-display text-3xl tabular-nums tracking-tight">
                {made}
                <span className="text-lg text-muted">/{att}</span>
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant="default"
                  className="h-12"
                  onClick={() => onShot(shot.kind, true)}
                >
                  Convertido
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-12"
                  onClick={() => onShot(shot.kind, false)}
                >
                  Falhado
                </Button>
              </div>
              <button
                type="button"
                className="mt-2 self-end text-xs text-muted hover:text-fg"
                onClick={() => {
                  if (att <= 0) return;
                  onShot(shot.kind, att <= made, true);
                }}
              >
                Anular último
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {ACTION_STATS.map((key) => {
          const def = STAT_DEFS.find((d) => d.key === key)!;
          const value = stats[key];
          return (
            <div
              key={key}
              className="flex items-center justify-between gap-3 rounded-xl bg-bg/70 px-3 py-2 shadow-border"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{def.label}</p>
                <p className="text-xs uppercase tracking-wider text-muted">
                  {def.abbr}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  aria-label={`Diminuir ${def.label}`}
                  onClick={() => onStat(key, value - def.step)}
                >
                  <Minus />
                </Button>
                <span
                  className={cn(
                    "w-12 text-center font-display text-xl tabular-nums",
                    key === "pf" && value >= 5 && "text-danger",
                    key === "plusMinus" && value > 0 && "text-good",
                    key === "plusMinus" && value < 0 && "text-danger",
                  )}
                >
                  {key === "minutes"
                    ? formatNum(value, 1)
                    : key === "plusMinus"
                      ? value > 0
                        ? `+${value}`
                        : value
                      : value}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  aria-label={`Aumentar ${def.label}`}
                  onClick={() => onStat(key, value + def.step)}
                >
                  <Plus />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
