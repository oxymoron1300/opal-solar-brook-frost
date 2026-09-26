import {
  formatNum,
  formatPct,
  formatRatio,
  type Indicators,
  type Totals,
} from "@/lib/stats";

const ITEMS: {
  key: keyof Indicators;
  label: string;
  hint: string;
  format: (v: Indicators) => string;
}[] = [
  {
    key: "fgPct",
    label: "FG%",
    hint: "Percentagem de lançamentos de campo",
    format: (v) => formatPct(v.fgPct),
  },
  {
    key: "p2Pct",
    label: "2P%",
    hint: "Percentagem de lançamentos de 2 pontos",
    format: (v) => formatPct(v.p2Pct),
  },
  {
    key: "p3Pct",
    label: "3P%",
    hint: "Percentagem de lançamentos de 3 pontos",
    format: (v) => formatPct(v.p3Pct),
  },
  {
    key: "ftPct",
    label: "LL%",
    hint: "Percentagem de lançamentos livres",
    format: (v) => formatPct(v.ftPct),
  },
  {
    key: "ptsPerMin",
    label: "Pts/min",
    hint: "Produção ofensiva por minuto",
    format: (v) => formatRatio(v.ptsPerMin),
  },
  {
    key: "astTo",
    label: "AST/PER",
    hint: "Assistências por perda de bola",
    format: (v) => formatRatio(v.astTo),
  },
  {
    key: "pir",
    label: "PIR",
    hint: "Valorização FIBA: pts + ressaltos + ast + roubos + blocos − falhados − perdas − faltas",
    format: (v) => formatNum(v.pir),
  },
];

export function IndicatorsPanel({
  totals,
  indicators,
}: {
  totals: Totals;
  indicators: Indicators;
}) {
  return (
    <section className="rounded-2xl bg-paper p-4 shadow-border sm:p-5">
      <h2 className="font-display text-xl font-semibold tracking-tight">
        Indicadores calculados
      </h2>
      <p className="mt-1 text-sm text-muted">
        Sobre o total do jogo. Lançamentos e acções somam-se pelos períodos.
      </p>
      <dl className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
        {ITEMS.map((item) => (
          <div
            key={item.key}
            className="rounded-xl bg-bg/70 px-3 py-3 shadow-border"
            title={item.hint}
          >
            <dt className="text-xs font-medium uppercase tracking-wider text-muted">
              {item.label}
            </dt>
            <dd className="mt-1 font-display text-2xl tabular-nums tracking-tight">
              {item.format(indicators)}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-xs text-muted">
        Totais: {formatNum(totals.pts)} pts · {formatNum(totals.reb)} ressaltos ·{" "}
        {formatNum(totals.ast)} ast · {formatMinutesSafe(totals.minutes)} min ·{" "}
        {formatNum(totals.fgm)}/{formatNum(totals.fga)} FG
      </p>
    </section>
  );
}

function formatMinutesSafe(n: number) {
  return n.toLocaleString("pt-PT", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}
