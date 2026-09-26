import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SeasonOverview } from "@/components/season-overview";
import { useGameStore } from "@/lib/store";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const navigate = useNavigate();
  const games = useGameStore((s) => s.games);
  const createGame = useGameStore((s) => s.createGame);
  const loadDemo = useGameStore((s) => s.loadDemo);

  function openNew() {
    const last = games[0];
    const game = createGame(
      last
        ? {
            team: last.team,
            athlete: last.athlete,
            number: last.number,
            position: last.position,
            role: last.role,
          }
        : { athlete: "BamBam", number: "00" },
    );
    void navigate({ to: "/jogo/$id", params: { id: game.id } });
  }

  return <SeasonOverview games={games} onNew={openNew} onDemo={loadDemo} />;
}
