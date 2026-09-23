"use client";

import { Course } from "@/types/course";
import { ChangeEvent, FormEvent, useState } from "react";

export type CourseDraft = {
  code: string;
  name: string;
  credit: string;
  instructor: string;
};
function toDraft(course?: Course): CourseDraft {
  if (!course) {
    return emptyDraft;
  }

  return {
    code: course.code,
    name: course.name,
    credit: String(course.credit),
    instructor: course.instructor,
  };
}
const emptyDraft: CourseDraft = {
  code: "",
  name: "",
  credit: "",
  instructor: "",
};
type CourseFormProps = {
  initialCourse?: Course;
  onSave: (draft: CourseDraft) => void;
  onCancel: () => void;
};
export default function CourseForm({
  initialCourse,
  onSave,
  onCancel,
}: CourseFormProps) {
  // เติม: Hook ที่ใช้ประกาศตัวแปรสถานะภายใน Component
  const [draft, setDraft] = useState<CourseDraft>(toDraft(initialCourse));
  const [errors, setErrors] = useState<FormErrors>({});
  type FormErrors = Partial<Record<keyof CourseDraft, string>>;

  function validate(value: CourseDraft): FormErrors {
    const nextErrors: FormErrors = {};

    if (value.code.trim() === "") {
      nextErrors.code = "กรุณาระบุรหัสวิชา";
    }

    // เติม: เมธอดที่ตัดช่องว่างหัวท้ายของข้อความออก
    if (value.name.trim() === "") {
      nextErrors.name = "กรุณาระบุชื่อวิชา";
    }

    const credit = Number(value.credit);
    if (!Number.isInteger(credit) || credit < 1 || credit > 6) {
      nextErrors.credit = "หน่วยกิตต้องเป็นจำนวนเต็มตั้งแต่ 1 ถึง 6";
    }

    if (value.instructor.trim() === "") {
      nextErrors.instructor = "กรุณาระบุชื่อผู้สอน";
    }
    if (Object.keys(nextErrors).length > 0) {
      return nextErrors;
    }

    onSave(draft);
    setDraft(emptyDraft);
    setErrors({});

    return nextErrors;
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    //console.log(draft);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
      // เติม: เมธอดที่ยับยั้งพฤติกรรมเริ่มต้นของเบราว์เซอร์
      event.preventDefault();

      const nextErrors = validate(draft);
      setErrors(nextErrors);

      // เติม: เมธอดของ Object ที่คืนอาร์เรย์ของชื่อคีย์ทั้งหมด
      if (Object.keys(nextErrors).length > 0) {
        return;
      }

      setDraft(emptyDraft);
      setErrors({});
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor="code">รหัสวิชา</label>
      <input
        id="code"
        name="code"
        type="text"
        value={draft.code}
        onChange={handleChange}
        // !! ฟังก์ชันที่แปลงค่าใด ๆ ให้เป็นค่าตรรกะ
        aria-invalid={!!errors.code}
        aria-describedby={errors.code ? "code-error" : undefined}
      />
      {errors.code ? <p id="code-error">{errors.code}</p> : null}

      <label htmlFor="name">ชื่อวิชา</label>

      <input
        id="name"
        name="name"
        type="text"
        value={draft.name}
        onChange={handleChange}
        aria-invalid={!!errors.name}
        aria-describedby={errors.name ? "name-error" : undefined}
      />
      {errors.name ? <p id="name-error">{errors.name}</p> : null}

      <label htmlFor="credit">หน่วยกิต</label>
      <input
        id="credit"
        name="credit"
        type="number"
        inputMode="numeric"
        min="1"
        max="6"
        value={draft.credit}
        onChange={handleChange}
        aria-invalid={!!errors.credit}
        aria-describedby={errors.credit ? "credit-error" : undefined}
      />
      {errors.credit ? <p id="credit-error">{errors.credit}</p> : null}

      <label htmlFor="instructor">ผู้สอน</label>
      <input
        id="instructor"
        name="instructor"
        type="text"
        value={draft.instructor}
        onChange={handleChange}
        aria-invalid={!!errors.instructor}
        aria-describedby={errors.instructor ? "instructor-error" : undefined}
      />
      {errors.instructor ? (
        <p id="instructor-error">{errors.instructor}</p>
      ) : null}
      <button type="submit">บันทึก</button>
      {initialCourse ? (
        <button type="button" onClick={onCancel}>
          ยกเลิก
        </button>
      ) : null}
    </form>
  );
}
