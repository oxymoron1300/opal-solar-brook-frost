import { formatMinutes, formatNum, formatPlusMinus, type Totals } from "@/lib/stats";
import { cn } from "@/lib/utils";

export function SummaryBar({ totals, pir }: { totals: Totals; pir: number }) {
  const items = [
    { label: "PTS", value: formatNum(totals.pts) },
    { label: "REB", value: formatNum(totals.reb) },
    { label: "AST", value: formatNum(totals.ast) },
    { label: "RB", value: formatNum(totals.stl) },
    { label: "BL", value: formatNum(totals.blk) },
    { label: "PER", value: formatNum(totals.tov) },
    { label: "FP", value: formatNum(totals.pf), warn: totals.pf >= 5 },
    { label: "+/−", value: formatPlusMinus(totals.plusMinus) },
    { label: "MIN", value: formatMinutes(totals.minutes) },
    { label: "PIR", value: formatNum(pir), accent: true },
  ];

  return (
    <div className="sticky bottom-3 z-20 w-full min-w-0 px-0">
      <div className="overflow-x-auto rounded-2xl bg-fg px-2 py-2 text-primary-fg shadow-lift">
        <ul className="flex w-max min-w-full items-center justify-between gap-1">
          {items.map((item) => (
            <li
              key={item.label}
              className={cn(
                "flex min-w-14 flex-col items-center rounded-lg px-2 py-1",
                item.accent && "bg-primary text-primary-fg",
              )}
            >
              <span className="text-xs font-medium uppercase tracking-wider opacity-70">
                {item.label}
              </span>
              <span
                className={cn(
                  "font-display text-lg tabular-nums leading-none",
                  item.warn && "text-oak",
                )}
              >
                {item.value}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
