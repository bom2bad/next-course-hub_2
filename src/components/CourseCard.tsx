import type { Course } from "@/types/course";

type CourseCardProps = {
  course: Course;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
};


export default function CourseCard({
  course,
  isFavorite,
  onToggleFavorite,
}: CourseCardProps) {
  return (
    <article className="courseCard">
      <h2>{course.title}</h2>

      <p>รหัสวิชา: {course.code}</p>

      <p>{course.credits} หน่วยกิต</p>

      <p className={course.isOpen ? "open" : "closed"}>
        {course.isOpen
          ? "เปิดลงทะเบียน"
          : "ปิดลงทะเบียน"}
      </p>
<p>
<button 
  type="button"
  className="favoriteButton"
  aria-pressed={isFavorite}
  onClick={() => onToggleFavorite(course.id)}>
  {isFavorite ? "♥ อยู่ในรายการโปรด" : "♡ เพิ่มเป็นรายการโปรด"}
</button>
</p>
    </article>
  );
}