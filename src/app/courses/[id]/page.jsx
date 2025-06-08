"use client";

import { useParams } from "next/navigation";

export default function CoursesPage() {
  const params = useParams();
  const courseId = params.id;

  return (
    <div>
      <p>course id {courseId}</p>
    </div>
  );
}
