import { Check, Crown, Lock } from "lucide-react";
import styles from "./lesson-sidebar.module.css";

export default function LessonsSidebar({
  lessons,
  selectedLesson,
  lessonProgress = {},
  courseProgress,
  hasAccess,
  onLessonSelect,
}) {
  const formatDuration = (seconds) => {
    if (!seconds) return "N/A";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Course Content</h3>

      <div className={styles.lessonsList}>
        {lessons.map((lesson) => {
          const canAccess = hasAccess || !lesson.isPremium;
          const isSelected = selectedLesson?.id === lesson.id;

          return (
            <div
              key={lesson.id}
              className={`${styles.lessonItem} ${
                isSelected
                  ? styles.selected
                  : canAccess
                  ? styles.accessible
                  : styles.locked
              }`}
              onClick={() => onLessonSelect(lesson)}
            >
              <div className={styles.lessonContent}>
                <div className={styles.lessonInfo}>
                  <h4 className={styles.lessonTitle}>{lesson.title}</h4>
                  <p className={styles.lessonDuration}>
                    {formatDuration(lesson.duration)}
                  </p>
                </div>

                <div className={styles.lessonIcons}>
                  {lessonProgress[lesson.id] && (
                    <Check className={styles.completedIcon} />
                  )}
                  {lesson.isPremium && <Crown className={styles.premiumIcon} />}
                  {!canAccess && <Lock className={styles.lockIcon} />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.progressSection}>
        <h4 className={styles.progressTitle}>Progress</h4>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${courseProgress}%` }}
          />
        </div>
        <p className={styles.progressText}>
          lessons completed ({courseProgress}%)
        </p>
      </div>
    </div>
  );
}
