"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import type { Game, GameStatus } from "@/types/game";

export type GameDraft = {
  name: string;
  platform: string;
  hours: string;
  status: GameStatus;
};

type FormErrors = Partial<Record<keyof GameDraft, string>>;

const emptyDraft: GameDraft = {
  name: "",
  platform: "",
  hours: "",
  status: "ยังไม่เริ่ม",
};

function toDraft(game?: Game): GameDraft {
  if (!game) {
    return emptyDraft;
  }

  return {
    name: game.name,
    platform: game.platform,
    hours: String(game.hours),
    status: game.status,
  };
}

type GameFormProps = {
  initialGame?: Game;
  onSave: (draft: GameDraft) => void;
  onCancel: () => void;
};

export default function GameForm({
  initialGame,
  onSave,
  onCancel,
}: GameFormProps) {
  const [draft, setDraft] = useState<GameDraft>(
    toDraft(initialGame),
  );

  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    setDraft(toDraft(initialGame));
    setErrors({});
  }, [initialGame]);

  function validate(value: GameDraft): FormErrors {
    const nextErrors: FormErrors = {};

    if (value.name.trim() === "") {
      nextErrors.name = "กรุณาระบุชื่อเกม";
    }

    if (value.platform === "") {
      nextErrors.platform = "กรุณาเลือกแพลตฟอร์ม";
    }

    const hours = Number(value.hours);

    if (!Number.isInteger(hours) || hours <= 0) {
      nextErrors.hours = "จำนวนชั่วโมงต้องเป็นจำนวนเต็มบวก";
    }

    return nextErrors;
  }

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target;

    setDraft((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(draft);

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onSave(draft);

    if (!initialGame) {
      setDraft(emptyDraft);
    }

    setErrors({});
  }

  return (
    <form className="gameForm" onSubmit={handleSubmit} noValidate>
      {/* ชื่อเกม */}
      <div className="formGroup">
        <label htmlFor="name">ชื่อเกม</label>

        <input
          id="name"
          name="name"
          type="text"
          value={draft.name}
          onChange={handleChange}
          aria-invalid={!!errors.name}
          aria-describedby={
            errors.name ? "game-name-error" : undefined
          }
        />

        {errors.name ? (
          <p id="game-name-error" className="error">
            {errors.name}
          </p>
        ) : null}
      </div>

      {/* แพลตฟอร์ม */}
      <div className="formGroup">
        <label htmlFor="platform">แพลตฟอร์ม</label>

        <select
          id="platform"
          name="platform"
          value={draft.platform}
          onChange={handleChange}
          aria-invalid={!!errors.platform}
          aria-describedby={
            errors.platform ? "game-platform-error" : undefined
          }
        >
          <option value="">-- เลือกแพลตฟอร์ม --</option>
          <option value="PC">PC</option>
          <option value="PlayStation 5">PlayStation 5</option>
          <option value="Xbox Series X/S">Xbox Series X/S</option>
          <option value="Nintendo Switch">Nintendo Switch</option>
          <option value="Mobile">Mobile</option>
        </select>

        {errors.platform ? (
          <p id="game-platform-error" className="error">
            {errors.platform}
          </p>
        ) : null}
      </div>

      {/* จำนวนชั่วโมง */}
      <div className="formGroup">
        <label htmlFor="hours">
          จำนวนชั่วโมงที่คาดว่าจะใช้เล่น
        </label>

        <input
          id="hours"
          name="hours"
          type="number"
          inputMode="numeric"
          min="1"
          value={draft.hours}
          onChange={handleChange}
          aria-invalid={!!errors.hours}
          aria-describedby={
            errors.hours ? "game-hours-error" : undefined
          }
        />

        {errors.hours ? (
          <p id="game-hours-error" className="error">
            {errors.hours}
          </p>
        ) : null}
      </div>

      {/* สถานะ */}
      <div className="formGroup">
        <label htmlFor="status">สถานะ</label>

        <select
          id="status"
          name="status"
          value={draft.status}
          onChange={handleChange}
        >
          <option value="ยังไม่เริ่ม">ยังไม่เริ่ม</option>
          <option value="กำลังเล่น">กำลังเล่น</option>
          <option value="เล่นจบแล้ว">เล่นจบแล้ว</option>
        </select>
      </div>

      {/* ปุ่ม */}
      <div className="formActions">
        <button type="submit">
          {initialGame ? "บันทึกการแก้ไข" : "เพิ่มเกม"}
        </button>

        {initialGame ? (
          <button type="button" onClick={onCancel}>
            ยกเลิก
          </button>
        ) : null}
      </div>
    </form>
  );
}