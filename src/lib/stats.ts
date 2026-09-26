export const PERIODS = [
  { key: "q1", label: "1.º", full: "1.º período" },
  { key: "q2", label: "2.º", full: "2.º período" },
  { key: "q3", label: "3.º", full: "3.º período" },
  { key: "q4", label: "4.º", full: "4.º período" },
  { key: "ot", label: "PR", full: "Prolongamento" },
] as const;

export type PeriodKey = (typeof PERIODS)[number]["key"];

export type ShotKind = "2" | "3" | "ft";

export interface PeriodStats {
  minutes: number;
  fgm2: number;
  fga2: number;
  fgm3: number;
  fga3: number;
  ftm: number;
  fta: number;
  oreb: number;
  dreb: number;
  ast: number;
  stl: number;
  blk: number;
  tov: number;
  pf: number;
  plusMinus: number;
}

export const EMPTY_PERIOD: PeriodStats = {
  minutes: 0,
  fgm2: 0,
  fga2: 0,
  fgm3: 0,
  fga3: 0,
  ftm: 0,
  fta: 0,
  oreb: 0,
  dreb: 0,
  ast: 0,
  stl: 0,
  blk: 0,
  tov: 0,
  pf: 0,
  plusMinus: 0,
};

export type StatKey = keyof PeriodStats;

export const STAT_DEFS: {
  key: StatKey;
  label: string;
  abbr: string;
  step: number;
  min?: number;
  max?: number;
}[] = [
  { key: "minutes", label: "Minutos jogados", abbr: "MIN", step: 0.5, min: 0, max: 15 },
  { key: "fgm2", label: "Lançamentos de 2 pontos convertidos", abbr: "2P", step: 1, min: 0 },
  { key: "fga2", label: "Lançamentos de 2 pontos tentados", abbr: "2PA", step: 1, min: 0 },
  { key: "fgm3", label: "Lançamentos de 3 pontos convertidos", abbr: "3P", step: 1, min: 0 },
  { key: "fga3", label: "Lançamentos de 3 pontos tentados", abbr: "3PA", step: 1, min: 0 },
  { key: "ftm", label: "Lançamentos livres convertidos", abbr: "LL", step: 1, min: 0 },
  { key: "fta", label: "Lançamentos livres tentados", abbr: "LLA", step: 1, min: 0 },
  { key: "oreb", label: "Ressaltos ofensivos", abbr: "RO", step: 1, min: 0 },
  { key: "dreb", label: "Ressaltos defensivos", abbr: "RD", step: 1, min: 0 },
  { key: "ast", label: "Assistências", abbr: "AST", step: 1, min: 0 },
  { key: "stl", label: "Roubos de bola", abbr: "RB", step: 1, min: 0 },
  { key: "blk", label: "Lançamentos bloqueados", abbr: "BL", step: 1, min: 0 },
  { key: "tov", label: "Perdas de bola", abbr: "PER", step: 1, min: 0 },
  { key: "pf", label: "Faltas pessoais", abbr: "FP", step: 1, min: 0, max: 6 },
  { key: "plusMinus", label: "Mais / menos", abbr: "+/−", step: 1 },
];

export const POSITIONS = [
  "Base",
  "Extremo-armador",
  "Extremo",
  "Ala-poste",
  "Poste",
] as const;

export const ROLES = [
  { value: "titular", label: "Titular" },
  { value: "suplente", label: "Suplente" },
] as const;

export type Role = (typeof ROLES)[number]["value"] | "";

export interface GameMeta {
  competition: string;
  date: string;
  location: string;
  team: string;
  opponent: string;
  result: string;
  athlete: string;
  number: string;
  position: string;
  role: Role;
  notes: string;
}

export interface GameLog extends GameMeta {
  id: string;
  periods: Record<PeriodKey, PeriodStats>;
  createdAt: number;
  updatedAt: number;
}

export interface Totals extends PeriodStats {
  pts: number;
  fgm: number;
  fga: number;
  reb: number;
}

export interface Indicators {
  fgPct: number | null;
  p2Pct: number | null;
  p3Pct: number | null;
  ftPct: number | null;
  ptsPerMin: number | null;
  astTo: number | null;
  pir: number;
}

export function emptyPeriods(): Record<PeriodKey, PeriodStats> {
  return {
    q1: { ...EMPTY_PERIOD },
    q2: { ...EMPTY_PERIOD },
    q3: { ...EMPTY_PERIOD },
    q4: { ...EMPTY_PERIOD },
    ot: { ...EMPTY_PERIOD },
  };
}

export function newGameId() {
  return crypto.randomUUID();
}

export function createEmptyGame(partial: Partial<GameMeta> = {}): GameLog {
  const now = Date.now();
  const today = new Date();
  const iso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  return {
    id: newGameId(),
    competition: partial.competition ?? "",
    date: partial.date ?? iso,
    location: partial.location ?? "",
    team: partial.team ?? "",
    opponent: partial.opponent ?? "",
    result: partial.result ?? "",
    athlete: partial.athlete ?? "BamBam",
    number: partial.number ?? "00",
    position: partial.position ?? "",
    role: partial.role ?? "",
    notes: partial.notes ?? "",
    periods: emptyPeriods(),
    createdAt: now,
    updatedAt: now,
  };
}

export function derivePeriod(p: PeriodStats) {
  const fgm = p.fgm2 + p.fgm3;
  const fga = p.fga2 + p.fga3;
  const reb = p.oreb + p.dreb;
  const pts = p.fgm2 * 2 + p.fgm3 * 3 + p.ftm;
  return { fgm, fga, reb, pts };
}

export function sumPeriods(periods: Record<PeriodKey, PeriodStats>): Totals {
  const acc: Totals = {
    ...EMPTY_PERIOD,
    pts: 0,
    fgm: 0,
    fga: 0,
    reb: 0,
  };
  for (const { key } of PERIODS) {
    const p = periods[key];
    for (const def of STAT_DEFS) {
      acc[def.key] += p[def.key];
    }
  }
  const d = derivePeriod(acc);
  acc.fgm = d.fgm;
  acc.fga = d.fga;
  acc.reb = d.reb;
  acc.pts = d.pts;
  return acc;
}

export function computeIndicators(t: Totals): Indicators {
  const pct = (made: number, att: number) => (att > 0 ? (made / att) * 100 : null);
  const missedFg = t.fga - t.fgm;
  const missedFt = t.fta - t.ftm;
  const pir =
    t.pts + t.reb + t.ast + t.stl + t.blk - missedFg - missedFt - t.tov - t.pf;
  return {
    fgPct: pct(t.fgm, t.fga),
    p2Pct: pct(t.fgm2, t.fga2),
    p3Pct: pct(t.fgm3, t.fga3),
    ftPct: pct(t.ftm, t.fta),
    ptsPerMin: t.minutes > 0 ? t.pts / t.minutes : null,
    astTo: t.tov > 0 ? t.ast / t.tov : t.ast > 0 ? Number.POSITIVE_INFINITY : null,
    pir,
  };
}

export function clampStat(key: StatKey, value: number, period: PeriodStats): number {
  const def = STAT_DEFS.find((d) => d.key === key);
  if (!def) return value;
  let v = value;
  if (def.min !== undefined) v = Math.max(def.min, v);
  if (def.max !== undefined) v = Math.min(def.max, v);
  if (key === "fgm2") v = Math.min(v, Math.max(period.fga2, v));
  if (key === "fgm3") v = Math.min(v, Math.max(period.fga3, v));
  if (key === "ftm") v = Math.min(v, Math.max(period.fta, v));
  if (key === "fga2") v = Math.max(v, period.fgm2);
  if (key === "fga3") v = Math.max(v, period.fgm3);
  if (key === "fta") v = Math.max(v, period.ftm);
  if (key === "minutes") v = Math.round(v * 2) / 2;
  else v = Math.round(v);
  return v;
}

export function applyStat(
  period: PeriodStats,
  key: StatKey,
  value: number,
): PeriodStats {
  const next = { ...period };
  let v = value;
  const def = STAT_DEFS.find((d) => d.key === key);
  if (def?.min !== undefined) v = Math.max(def.min, v);
  if (def?.max !== undefined) v = Math.min(def.max, v);

  if (key === "minutes") v = Math.round(v * 2) / 2;
  else if (key !== "plusMinus") v = Math.round(v);
  else v = Math.round(v);

  next[key] = v;

  if (key === "fgm2" && next.fga2 < next.fgm2) next.fga2 = next.fgm2;
  if (key === "fgm3" && next.fga3 < next.fgm3) next.fga3 = next.fgm3;
  if (key === "ftm" && next.fta < next.ftm) next.fta = next.ftm;
  if (key === "fga2" && next.fga2 < next.fgm2) next.fgm2 = next.fga2;
  if (key === "fga3" && next.fga3 < next.fgm3) next.fgm3 = next.fga3;
  if (key === "fta" && next.fta < next.ftm) next.ftm = next.fta;
  return next;
}

export function applyShot(
  period: PeriodStats,
  kind: ShotKind,
  made: boolean,
  reverse = false,
): PeriodStats {
  const next = { ...period };
  const delta = reverse ? -1 : 1;
  if (kind === "2") {
    next.fga2 = Math.max(0, next.fga2 + delta);
    if (made) next.fgm2 = Math.max(0, next.fgm2 + delta);
    if (next.fgm2 > next.fga2) next.fgm2 = next.fga2;
  } else if (kind === "3") {
    next.fga3 = Math.max(0, next.fga3 + delta);
    if (made) next.fgm3 = Math.max(0, next.fgm3 + delta);
    if (next.fgm3 > next.fga3) next.fgm3 = next.fga3;
  } else {
    next.fta = Math.max(0, next.fta + delta);
    if (made) next.ftm = Math.max(0, next.ftm + delta);
    if (next.ftm > next.fta) next.ftm = next.fta;
  }
  return next;
}

export function formatPct(value: number | null) {
  if (value === null) return "—";
  return `${value.toLocaleString("pt-PT", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;
}

export function formatRatio(value: number | null) {
  if (value === null) return "—";
  if (!Number.isFinite(value)) return "∞";
  return value.toLocaleString("pt-PT", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatNum(value: number, digits = 0) {
  return value.toLocaleString("pt-PT", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export function formatMinutes(value: number) {
  return formatNum(value, 1);
}

export function formatPlusMinus(value: number) {
  if (value > 0) return `+${value}`;
  return String(value);
}

export function formatDatePt(iso: string) {
  if (!iso) return "Sem data";
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("pt-PT", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function resultKind(result: string): "win" | "loss" | "unknown" {
  const cleaned = result.replace(/[–—]/g, "-").trim();
  const m = cleaned.match(/^(\d+)\s*-\s*(\d+)$/);
  if (!m) return "unknown";
  const a = Number(m[1]);
  const b = Number(m[2]);
  if (a === b) return "unknown";
  return a > b ? "win" : "loss";
}
