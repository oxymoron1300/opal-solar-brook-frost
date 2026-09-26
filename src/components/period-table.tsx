import { useEffect, useState } from "react";
import {
  PERIODS,
  STAT_DEFS,
  derivePeriod,
  formatMinutes,
  formatNum,
  formatPlusMinus,
  type PeriodKey,
  type PeriodStats,
  type StatKey,
} from "@/lib/stats";
import { cn } from "@/lib/utils";

export function PeriodTable({
  periods,
  onChange,
}: {
  periods: Record<PeriodKey, PeriodStats>;
  onChange: (period: PeriodKey, key: StatKey, value: number) => void;
}) {
  const totals = PERIODS.reduce(
    (acc, { key }) => {
      const p = periods[key];
      for (const def of STAT_DEFS) acc[def.key] += p[def.key];
      return acc;
    },
    { ...STAT_DEFS.reduce((a, d) => ({ ...a, [d.key]: 0 }), {} as PeriodStats) },
  );
  const derivedTotal = derivePeriod(totals);

  return (
    <section className="min-w-0 rounded-2xl bg-paper p-4 shadow-border sm:p-5">
      <div className="mb-4">
        <h2 className="font-display text-xl font-semibold tracking-tight">
          Folha por períodos
        </h2>
        <p className="mt-1 text-sm text-muted">
          Células em creme são editáveis. Totais e pontos calculam-se automaticamente.
        </p>
      </div>
      <div className="max-w-full overflow-x-auto rounded-xl bg-bg/50">
        <table className="w-full min-w-3xl border-separate border-spacing-0 text-sm">
          <thead>
            <tr className="bg-fg text-primary-fg">
              <th className="sticky left-0 z-10 rounded-tl-xl bg-fg px-3 py-2.5 text-left text-xs font-medium uppercase tracking-wider">
                Estatística
              </th>
              {PERIODS.map((p) => (
                <th
                  key={p.key}
                  className="px-1 py-2.5 text-center text-xs font-medium uppercase tracking-wider"
                >
                  {p.full}
                </th>
              ))}
              <th className="rounded-tr-xl px-3 py-2.5 text-center text-xs font-medium uppercase tracking-wider">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            <DerivedRow
              label="Pontos"
              abbr="PTS"
              values={PERIODS.map(({ key }) => derivePeriod(periods[key]).pts)}
              total={derivedTotal.pts}
            />
            {STAT_DEFS.map((def, i) => (
              <tr
                key={def.key}
                className={i % 2 === 0 ? "bg-paper/40" : "bg-transparent"}
              >
                <th
                  scope="row"
                  className={cn(
                    "sticky left-0 z-10 px-3 py-1.5 text-left font-medium",
                    i % 2 === 0 ? "bg-paper" : "bg-bg",
                  )}
                >
                  <span className="block leading-tight">{def.label}</span>
                  <span className="text-xs uppercase tracking-wider text-muted">
                    {def.abbr}
                  </span>
                </th>
                {PERIODS.map(({ key }) => (
                  <td key={key} className="px-1 py-1">
                    <CellInput
                      value={periods[key][def.key]}
                      step={def.step}
                      label={`${def.label} ${pLabel(key)}`}
                      onCommit={(n) => onChange(key, def.key, n)}
                    />
                  </td>
                ))}
                <td className="bg-total px-3 py-1 text-center font-display text-base tabular-nums">
                  {def.key === "minutes"
                    ? formatMinutes(totals[def.key])
                    : def.key === "plusMinus"
                      ? formatPlusMinus(totals[def.key])
                      : formatNum(totals[def.key])}
                </td>
              </tr>
            ))}
            <DerivedRow
              label="Ressaltos totais"
              abbr="RT"
              values={PERIODS.map(({ key }) => derivePeriod(periods[key]).reb)}
              total={derivedTotal.reb}
              last
            />
          </tbody>
        </table>
      </div>
    </section>
  );
}

function pLabel(key: PeriodKey) {
  return PERIODS.find((p) => p.key === key)?.full ?? key;
}

function CellInput({
  value,
  step,
  label,
  onCommit,
}: {
  value: number;
  step: number;
  label: string;
  onCommit: (n: number) => void;
}) {
  const [draft, setDraft] = useState(String(value));
  useEffect(() => {
    setDraft(String(value));
  }, [value]);

  return (
    <input
      type="text"
      inputMode="decimal"
      aria-label={label}
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={() => {
        const n = Number(draft.replace(",", "."));
        onCommit(Number.isNaN(n) ? 0 : n);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") (e.target as HTMLInputElement).blur();
        if (e.key === "ArrowUp") {
          e.preventDefault();
          onCommit(value + step);
        }
        if (e.key === "ArrowDown") {
          e.preventDefault();
          onCommit(value - step);
        }
      }}
      className="h-10 w-full min-w-16 rounded-md bg-cell text-center tabular-nums shadow-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70"
      suppressHydrationWarning
    />
  );
}

function DerivedRow({
  label,
  abbr,
  values,
  total,
  last,
}: {
  label: string;
  abbr: string;
  values: number[];
  total: number;
  last?: boolean;
}) {
  return (
    <tr className="bg-total/80">
      <th
        scope="row"
        className={cn(
          "sticky left-0 z-10 bg-total px-3 py-2 text-left font-medium",
          last && "rounded-bl-xl",
        )}
      >
        <span className="block leading-tight">{label}</span>
        <span className="text-xs uppercase tracking-wider text-muted">{abbr}</span>
      </th>
      {values.map((v, i) => (
        <td key={PERIODS[i].key} className="px-1 py-2 text-center tabular-nums">
          {v}
        </td>
      ))}
      <td
        className={cn(
          "px-3 py-2 text-center font-display text-base tabular-nums",
          last && "rounded-br-xl",
        )}
      >
        {total}
      </td>
    </tr>
  );
}
