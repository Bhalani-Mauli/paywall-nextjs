import { Play, Lock } from "lucide-react";
import styles from "./video-player.module.css";

export default function VideoPlayer({ selectedLesson, hasAccess }) {
  const formatDuration = (seconds) => {
    if (!seconds) return "N/A";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className={styles.container}>
      {selectedLesson && hasAccess ? (
        <div className={styles.playerContent}>
          <Play className={styles.playIcon} />
          <p className={styles.lessonTitle}>{selectedLesson.title}</p>
          <p className={styles.duration}>
            Duration: {formatDuration(selectedLesson.duration)}
          </p>
          <p className={styles.mockText}>
            Mock video player - In a real app, this would show the actual video
          </p>
        </div>
      ) : (
        <div className={styles.lockedContent}>
          <Lock className={styles.lockIcon} />
          <p className={styles.lockedText}>
            {hasAccess
              ? "Select a lesson to start"
              : "Premium subscription required"}
          </p>
        </div>
      )}
    </div>
  );
}
