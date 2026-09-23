"use client";

import { useState } from "react";
import type { Game } from "@/types/game";
import GameCard from "./GameCard";
import GameForm, { type GameDraft } from "./GameForm";

type GameExplorerProps = {
  initialGames: Game[];
};

export default function GameExplorer({
  initialGames,
}: GameExplorerProps) {
  const [games, setGames] = useState<Game[]>(initialGames);
  const [editingId, setEditingId] = useState<string | null>(null);

  function handleCreate(draft: GameDraft) {
    const newGame: Game = {
      id: crypto.randomUUID(),
      name: draft.name.trim(),
      platform: draft.platform,
      hours: Number(draft.hours),
      status: draft.status,
    };

    setGames((prevGames) => [...prevGames, newGame]);
  }

  function handleDelete(id: string) {
    setGames((prevGames) =>
      prevGames.filter((game) => game.id !== id),
    );

    if (editingId === id) {
      setEditingId(null);
    }
  }

  function handleUpdate(id: string, draft: GameDraft) {
    setGames((prevGames) =>
      prevGames.map((game) =>
        game.id === id
          ? {
              ...game,
              name: draft.name.trim(),
              platform: draft.platform,
              hours: Number(draft.hours),
              status: draft.status,
            }
          : game,
      ),
    );

    setEditingId(null);
  }

  function handleSave(draft: GameDraft) {
    if (editingId === null) {
      handleCreate(draft);
      return;
    }

    handleUpdate(editingId, draft);
  }

  const editingGame = games.find(
    (game) => game.id === editingId,
  );

  return (
    <div className="gameExplorer">
      <h1>Game Backlog</h1>

      <GameForm
        key={editingId ?? "new"}
        initialGame={editingGame}
        onSave={handleSave}
        onCancel={() => setEditingId(null)}
      />

      <section className="gameGrid">
        {games.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            onEdit={() => setEditingId(game.id)}
            onDelete={() => handleDelete(game.id)}
          />
        ))}
      </section>
    </div>
  );
}