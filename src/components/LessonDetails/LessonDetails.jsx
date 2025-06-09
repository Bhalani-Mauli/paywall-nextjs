import { Check } from "lucide-react";
import styles from "./lesson-details.module.css";

export default function LessonDetails({
  lesson,
  hasAccess,
  isCompleted,
  onMarkComplete,
}) {
  const formatDuration = (seconds) => {
    if (!seconds) return "N/A";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{lesson.title}</h2>

      {lesson.description && (
        <p className={styles.description}>{lesson.description}</p>
      )}

      <div className={styles.detailsRow}>
        <div className={styles.lessonInfo}>
          <span className={styles.infoItem}>Lesson {lesson.order}</span>
          <span className={styles.infoItem}>
            {formatDuration(lesson.duration)}
          </span>
          {lesson.isPremium && (
            <span className={styles.premiumBadge}>Premium</span>
          )}
        </div>

        {hasAccess && (
          <button
            onClick={onMarkComplete}
            className={`${styles.completeButton} ${
              isCompleted ? styles.completed : styles.notCompleted
            }`}
          >
            {isCompleted ? (
              <span className={styles.completedContent}>
                <Check className={styles.checkIcon} />
                Completed
              </span>
            ) : (
              "Mark Complete"
            )}
          </button>
        )}
      </div>
    </div>
  );
}
