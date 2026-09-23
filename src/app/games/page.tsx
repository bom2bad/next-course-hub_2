import GameExplorer from "@/components/GameExplorer";
import { games } from "@/data/games";

export default function GamesPage() {
  return (
    <main className="page">
      <GameExplorer initialGames={games} />
    </main>
  );
}