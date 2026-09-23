"use client";

import { useState, type ChangeEvent } from "react";
import type { Course } from "@/types/course";
import CourseCard from "./CourseCard";
import CourseForm, { type CourseDraft } from "./CourseForm";

type CourseExplorerProps = {
  initialCourses: Course[];
};

export default function CourseExplorer({
  initialCourses,
}: CourseExplorerProps) {
  const [keyword, setKeyword] = useState("");
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [editingId, setEditingId] = useState<string | null>(null);

  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  function handleCreate(draft: CourseDraft) {
    const newCourse: Course = {
      id: crypto.randomUUID(),
      code: draft.code.trim(),
      name: draft.name.trim(),
      credit: Number(draft.credit),
      instructor: draft.instructor.trim(),
    };

    setCourses([...courses, newCourse]);
  }

  function handleDelete(id: string) {
    setCourses(courses.filter((course) => course.id !== id));

    if (editingId === id) {
      setEditingId(null);
    }
  }

  function handleUpdate(id: string, draft: CourseDraft) {
    setCourses(
      courses.map((course) =>
        course.id === id
          ? {
              ...course,
              code: draft.code.trim(),
              name: draft.name.trim(),
              credit: Number(draft.credit),
              instructor: draft.instructor.trim(),
            }
          : course,
      ),
    );

    setEditingId(null);
  }

  function handleSave(draft: CourseDraft) {
    if (editingId === null) {
      handleCreate(draft);
      return;
    }

    handleUpdate(editingId, draft);
  }

  const editingCourse = courses.find(
    (course) => course.id === editingId,
  );

  function handleToggleFavorite(id: string) {
    setFavoriteIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((favoriteId) => favoriteId !== id)
        : [...prevIds, id],
    );
  }

  function handleToggleShowFavorites() {
    setShowFavoritesOnly((prev) => !prev);
  }

  const searchText = keyword.trim().toLowerCase();

  const visibleCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchText) ||
      course.code.toLowerCase().includes(searchText);

    const matchesFavorite =
      !showFavoritesOnly || favoriteIds.includes(course.id);

    return matchesSearch && matchesFavorite;
  });

  return (
    <div className="courseExplorer">
      <CourseForm
        key={editingId ?? "new"}
        initialCourse={editingCourse}
        onSave={handleSave}
        onCancel={() => setEditingId(null)}
      />

      <div className="searchBox">
        <input
          type="search"
          aria-label="ค้นหารายวิชา"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="ค้นหาชื่อวิชาหรือรหัสวิชา"
        />

        <button
          type="button"
          className="favoriteFilterButton"
          aria-pressed={showFavoritesOnly}
          onClick={handleToggleShowFavorites}
        >
          {showFavoritesOnly
            ? "แสดงทั้งหมด"
            : "แสดงเฉพาะรายการโปรด"}
        </button>

        <p>รายการโปรด: {favoriteIds.length} รายการ</p>
      </div>

      {visibleCourses.length === 0 ? (
        <p className="noCourse">
          ไม่พบรายวิชาที่ตรงกับเงื่อนไข
        </p>
      ) : (
        <section className="courseGrid">
          {visibleCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isFavorite={favoriteIds.includes(course.id)}
              onToggleFavorite={handleToggleFavorite}
              onEdit={() => setEditingId(course.id)}
              onDelete={() => handleDelete(course.id)}
            />
          ))}
        </section>
      )}
    </div>
  );
}