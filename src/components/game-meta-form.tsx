import type { ReactNode } from "react";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { GameLog } from "@/lib/stats";
import { POSITIONS, ROLES } from "@/lib/stats";
import { cn } from "@/lib/utils";

const fieldClass =
  "flex h-11 w-full rounded-md border-0 bg-cell px-3 text-base text-fg shadow-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 md:text-sm";

export function GameMetaForm({
  game,
  onChange,
}: {
  game: GameLog;
  onChange: (patch: Partial<GameLog>) => void;
}) {
  return (
    <section className="rounded-2xl bg-paper p-4 shadow-border sm:p-5">
      <h2 className="font-display text-xl font-semibold tracking-tight">
        Ficha do jogo
      </h2>
      <p className="mt-1 text-sm text-muted">
        Preencha os campos em creme. Os totais e indicadores actualizam-se sozinhos.
      </p>
      <div className="mt-5 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Competição / jogo">
          <Input
            value={game.competition}
            onChange={(e) => onChange({ competition: e.target.value })}
            placeholder="Campeonato, jornada…"
          />
        </Field>
        <Field label="Data">
          <Input
            type="date"
            value={game.date}
            onChange={(e) => onChange({ date: e.target.value })}
          />
        </Field>
        <Field label="Local">
          <Input
            value={game.location}
            onChange={(e) => onChange({ location: e.target.value })}
            placeholder="Pavilhão"
          />
        </Field>
        <Field label="Equipa">
          <Input
            value={game.team}
            onChange={(e) => onChange({ team: e.target.value })}
            placeholder="A sua equipa"
          />
        </Field>
        <Field label="Adversário">
          <Input
            value={game.opponent}
            onChange={(e) => onChange({ opponent: e.target.value })}
            placeholder="Adversário"
          />
        </Field>
        <Field label="Resultado">
          <Input
            value={game.result}
            onChange={(e) => onChange({ result: e.target.value })}
            placeholder="78-64"
          />
        </Field>
        <Field label="Atleta">
          <Input
            value={game.athlete}
            onChange={(e) => onChange({ athlete: e.target.value })}
            placeholder="Nome"
          />
        </Field>
        <Field label="N.º">
          <Input
            value={game.number}
            onChange={(e) => onChange({ number: e.target.value })}
            placeholder="00"
            inputMode="numeric"
          />
        </Field>
        <Field label="Posição">
          <select
            className={fieldClass}
            value={game.position}
            onChange={(e) => onChange({ position: e.target.value })}
          >
            <option value="">Seleccionar</option>
            {POSITIONS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Titular / suplente">
          <select
            className={fieldClass}
            value={game.role}
            onChange={(e) =>
              onChange({ role: e.target.value as GameLog["role"] })
            }
          >
            <option value="">Seleccionar</option>
            {ROLES.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Observações" className="sm:col-span-2 lg:col-span-2">
          <Textarea
            value={game.notes}
            onChange={(e) => onChange({ notes: e.target.value })}
            placeholder="Notas tácticas, ritmo, pontos a melhorar…"
            rows={3}
          />
        </Field>
      </div>
    </section>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label>{label}</Label>
      {children}
    </div>
  );
}
