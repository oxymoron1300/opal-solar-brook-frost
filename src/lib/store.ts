import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { DEMO_GAMES } from "./demo-games";
import {
  applyShot,
  applyStat,
  createEmptyGame,
  type GameLog,
  type GameMeta,
  type PeriodKey,
  type PeriodStats,
  type ShotKind,
  type StatKey,
} from "./stats";

interface GameState {
  games: GameLog[];
  createGame: (partial?: Partial<GameMeta>) => GameLog;
  updateMeta: (id: string, patch: Partial<GameMeta>) => void;
  setPeriodStat: (id: string, period: PeriodKey, key: StatKey, value: number) => void;
  addShot: (
    id: string,
    period: PeriodKey,
    kind: ShotKind,
    made: boolean,
    reverse?: boolean,
  ) => void;
  replacePeriod: (id: string, period: PeriodKey, stats: PeriodStats) => void;
  deleteGame: (id: string) => void;
  duplicateMeta: (id: string) => GameLog | null;
  loadDemo: () => void;
}

function touch(game: GameLog, periods?: Record<PeriodKey, PeriodStats>): GameLog {
  return {
    ...game,
    periods: periods ?? game.periods,
    updatedAt: Date.now(),
  };
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      games: DEMO_GAMES,
      loadDemo: () =>
        set({
          games: DEMO_GAMES.map((g) => ({ ...g })),
        }),
      createGame: (partial) => {
        const game = createEmptyGame(partial);
        set({ games: [game, ...get().games] });
        return game;
      },
      updateMeta: (id, patch) =>
        set({
          games: get().games.map((g) => (g.id === id ? touch({ ...g, ...patch }) : g)),
        }),
      setPeriodStat: (id, period, key, value) =>
        set({
          games: get().games.map((g) => {
            if (g.id !== id) return g;
            const nextPeriod = applyStat(g.periods[period], key, value);
            return touch(g, { ...g.periods, [period]: nextPeriod });
          }),
        }),
      addShot: (id, period, kind, made, reverse = false) =>
        set({
          games: get().games.map((g) => {
            if (g.id !== id) return g;
            const nextPeriod = applyShot(g.periods[period], kind, made, reverse);
            return touch(g, { ...g.periods, [period]: nextPeriod });
          }),
        }),
      replacePeriod: (id, period, stats) =>
        set({
          games: get().games.map((g) =>
            g.id === id ? touch(g, { ...g.periods, [period]: stats }) : g,
          ),
        }),
      deleteGame: (id) => set({ games: get().games.filter((g) => g.id !== id) }),
      duplicateMeta: (id) => {
        const source = get().games.find((g) => g.id === id);
        if (!source) return null;
        const game = createEmptyGame({
          competition: source.competition,
          location: source.location,
          team: source.team,
          athlete: source.athlete,
          number: source.number,
          position: source.position,
          role: source.role,
        });
        set({ games: [game, ...get().games] });
        return game;
      },
    }),
    {
      name: "bambam-game-logs",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (state) => ({ games: state.games }),
    },
  ),
);

export function rehydrateGames() {
  void Promise.resolve(useGameStore.persist.rehydrate());
}
