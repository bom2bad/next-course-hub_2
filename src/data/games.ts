import type { Game } from "@/types/game";

export const games: Game[] = [
  {
    id: "elden-ring",
    name: "Elden Ring",
    platform: "PC",
    hours: 80,
    status: "ยังไม่เริ่ม",
  },
  {
    id: "god-of-war",
    name: "God of War Ragnarok",
    platform: "PlayStation 5",
    hours: 30,
    status: "กำลังเล่น",
  },
  {
    id: "minecraft",
    name: "Minecraft",
    platform: "PC",
    hours: 50,
    status: "ยังไม่เริ่ม",
  },
  {
    id: "zelda-totk",
    name: "The Legend of Zelda: Tears of the Kingdom",
    platform: "Nintendo Switch",
    hours: 70,
    status: "เล่นจบแล้ว",
  },
  {
    id: "cyberpunk-2077",
    name: "Cyberpunk 2077",
    platform: "PC",
    hours: 60,
    status: "ยังไม่เริ่ม",
  },
];