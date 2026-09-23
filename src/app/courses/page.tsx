//"use client";
//import CoursesCard from "@/components/CourseCard";
import { courses } from "@/data/coursedata";
import CourseExplorer from "@/components/CourseExplorer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "รายวิชาทั้งหมด",
};

export default function CoursesPage() {
  return (
    <>

      <CourseExplorer initialCourses={courses} />
      

      {/*<div className="p-4">
        {courses.map((course, index) => (
          <CoursesCard key={index} course={course}
           />
        ))}
      </div>*/}
    </>
  );
}