import Link from "next/link";
import type { Game } from "@/types/game";

type GameCardProps = {
  game: Game;
  onEdit: () => void;
  onDelete: () => void;
};

export default function GameCard({
  game,
  onEdit,
  onDelete,
}: GameCardProps) {
  return (
    <article className="gameCard">
      <h2>
        <Link href={`/games/${game.id}`}>
          {game.name}
        </Link>
      </h2>

      <p>
        <strong>แพลตฟอร์ม:</strong> {game.platform}
      </p>

      <p>
        <strong>เวลาที่คาดว่าจะใช้:</strong>{" "}
        {game.hours} ชั่วโมง
      </p>

      <p>
        <strong>สถานะ:</strong> {game.status}
      </p>

      <div className="gameActions">
        <button type="button" onClick={onEdit}>
          แก้ไข
        </button>

        <button type="button" onClick={onDelete}>
          ลบ
        </button>
      </div>
    </article>
  );
}