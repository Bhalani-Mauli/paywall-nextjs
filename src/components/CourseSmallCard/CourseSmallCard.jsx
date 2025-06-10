import styles from "./course-small-card.module.css";

export default function CourseSmallCard({ progress }) {
  return (
    <div className={styles.card}>
      <h4 className={styles.title}>{progress.title}</h4>
      <div className={styles.progressSection}>
        <div className={styles.progressHeader}>
          <span className={styles.progressLabel}>Progress</span>
          <span className={styles.progressPercentage}>
            {progress.progressPercentage}%
          </span>
        </div>
        <div className={styles.progressBarContainer}>
          <div
            className={styles.progressBar}
            style={{
              width: `${progress.progressPercentage}%`,
            }}
          />
        </div>
        <p className={styles.lessonCount}>
          {progress.totalLessons} lessons total
        </p>
      </div>
      <a href={`/courses/${progress.courseId}`} className={styles.continueLink}>
        Continue Learning →
      </a>
    </div>
  );
}
