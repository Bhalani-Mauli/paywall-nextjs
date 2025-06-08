"use client";

import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
import Spinner from "@/components/atoms/Spinner/Spinner";
import CourseCard from "@/components/CourseCard/CourseCard";
import styles from "./courses.module.css";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const coursesResponse = await fetch("/api/courses");
        if (!coursesResponse.ok) {
          throw new Error("Failed to fetch courses");
        }
        const coursesData = await coursesResponse.json();
        setCourses(coursesData.courses);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className={styles.pageContainer}>
      <main className={styles.main}>
        <div className={styles.header}>
          <h2 className={styles.heading}>All Courses</h2>
          <p className={styles.subheading}>
            Discover and enroll in our comprehensive courses
          </p>
        </div>

        <div className={styles.courseGrid}>
          {courses.map((course) => (
            <CourseCard course={course} key={course.id} />
          ))}
        </div>

        {courses.length === 0 && (
          <div className={styles.emptyState}>
            <BookOpen className={styles.emptyIcon} />
            <h3 className={styles.emptyTitle}>No courses available</h3>
            <p className={styles.emptyMessage}>
              Check back later for new courses!
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
