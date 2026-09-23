//"use client";
//import CoursesCard from "@/components/CourseCard";
import { courses } from "@/data/corsedata";
import CourseExplorer from "@/components/CourseExplorer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "รายวิชาทั้งหมด",
};

export default function CoursesPage() {
  return (
    <>

      < CourseExplorer courses={courses} /><br/>
      

      {/*<div className="p-4">
        {courses.map((course, index) => (
          <CoursesCard key={index} course={course}
           />
        ))}
      </div>*/}
    </>
  );
}