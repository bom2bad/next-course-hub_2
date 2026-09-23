import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { games } from "@/data/games";

type GamePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: GamePageProps): Promise<Metadata> {
  const { id } = await params;

  const game = games.find((item) => item.id === id);

  return {
    title: game ? game.name : "ไม่พบเกม",
  };
}

export default async function GamePage({
  params,
}: GamePageProps) {
  const { id } = await params;

  const game = games.find((item) => item.id === id);

  if (!game) {
    notFound();
  }

  return (
    <main className="page">
      <article className="gameDetail">
        <h1>{game.name}</h1>

        <p>
          <strong>แพลตฟอร์ม:</strong>{" "}
          {game.platform}
        </p>

        <p>
          <strong>จำนวนชั่วโมงที่คาดว่าจะใช้:</strong>{" "}
          {game.hours} ชั่วโมง
        </p>

        <p>
          <strong>สถานะ:</strong>{" "}
          {game.status}
        </p>
      </article>
    </main>
  );
}