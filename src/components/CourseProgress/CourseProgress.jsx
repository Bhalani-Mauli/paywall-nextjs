import Link from "next/link";
import styles from "./course-progress.module.css";
import CourseSmallCard from "../CourseSmallCard/CourseSmallCard";

export default function CourseProgress({ courseProgress }) {
  if (courseProgress.length === 0) {
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>Your Courses</h3>
        <div className={styles.emptyCourses}>
          <p className={styles.emptyText}>
            You haven&apos;t enrolled in any courses yet.
          </p>
          <Link href="/courses" className={styles.browseButton}>
            Browse Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Your Courses</h3>
      <div className={styles.courseGrid}>
        {courseProgress.map((progress) => (
          <CourseSmallCard key={progress.id} progress={progress} />
        ))}
      </div>
    </div>
  );
}
