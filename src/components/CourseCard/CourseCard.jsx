import Image from "next/image";
import Link from "next/link";
import { BookOpen, Lock } from "lucide-react";
import styles from "./course-card.module.css";
import Button from "../atoms/Button/Button";

export default function CourseCard({ course }) {
  return (
    <div key={course.id} className={styles.card}>
      <div className={styles.thumbnailContainer}>
        {course.thumbnail ? (
          <Image
            src={course.thumbnail}
            alt={course.title}
            width={400}
            height={192}
            className={styles.thumbnailImage}
          />
        ) : (
          <BookOpen className={styles.defaultIcon} />
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{course.title}</h3>
          {course.isPremium && (
            <span className={styles.premiumBadge}>Premium</span>
          )}
        </div>

        <p className={styles.description}>{course.description}</p>

        <div className={styles.lessonInfo}>
          <span className={styles.lessonCount}>
            {course._count.lessons} lessons
          </span>
          {!course.hasAccess && course.isPremium && (
            <span className={styles.lockedMessage}>
              <Lock className={styles.lockIcon} />
              Premium Required
            </span>
          )}
        </div>

        <div className={styles.actions}>
          <Link href={`/courses/${course.id}`} className={styles.link}>
            <Button>
              {course.hasAccess ? "Start Learning" : "View Details"}
            </Button>
          </Link>
          {!course.hasAccess && course.isPremium && (
            <Link href="/subscription" className={styles.link}>
              <Button variant="secondary">Upgrade</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
