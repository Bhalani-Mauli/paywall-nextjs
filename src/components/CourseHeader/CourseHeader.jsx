import Link from "next/link";
import { Lock } from "lucide-react";
import styles from "./course-header.module.css";

export default function CourseHeader({ course }) {
  return (
    <div className={styles.container}>
      <Link href="/courses" className={styles.backLink}>
        ← Back to courses
      </Link>

      <h1 className={styles.title}>{course.title}</h1>
      <p className={styles.description}>{course.description}</p>

      {course.isPremium && !course.hasAccess && (
        <div className={styles.premiumBanner}>
          <div className={styles.premiumContent}>
            <Lock className={styles.premiumIcon} />
            <div>
              <h3 className={styles.premiumTitle}>Premium Course</h3>
              <p className={styles.premiumText}>
                This course requires a premium subscription to access all
                content.
              </p>
              <a href="/subscription" className={styles.upgradeButton}>
                Upgrade to Premium
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
