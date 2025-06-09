"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Link from "next/link";
import Spinner from "@/components/atoms/Spinner/Spinner";
import CourseHeader from "@/components/CourseHeader/CourseHeader";
import VideoPlayer from "@/components/VideoPlayer/VideoPlayer";
import LessonDetails from "@/components/LessonDetails/LessonDetails";
import LessonsSidebar from "@/components/LessonsSidebar/LessonsSidebar";
import styles from "./course-details-page.module.css";

export default function CourseDetailPage() {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [lessonProgress, setLessonProgress] = useState({});
  const [courseProgress, setCourseProgress] = useState(0);
  const router = useRouter();
  const params = useParams();
  const courseId = params.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/courses/${courseId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch course");
        }
        const data = await response.json();
        console.log("Course data:", data);
        setCourse(data.course);
        if (data.course.lessons.length > 0) {
          setSelectedLesson(data.course.lessons[0]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        router.push("/courses");
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchData();
    }
  }, [courseId, router]);

  useEffect(() => {
    if (course) {
      const completedLessons =
        Object.values(lessonProgress).filter(Boolean).length;
      const progress = Math.round(
        (completedLessons / course.lessons.length) * 100
      );
      setCourseProgress(progress);
    }
  }, [lessonProgress, course]);

  const handleLessonSelect = (lesson) => {
    const canAccess = course.hasAccess || !lesson.isPremium;
    if (canAccess) {
      setSelectedLesson(lesson);
    }
  };

  const handleMarkComplete = (lessonId) => {
    // TODO(mauli) - Implement API call to mark lesson as complete
    setLessonProgress((prev) => ({
      ...prev,
      [lessonId]: prev[lessonId] ? false : true,
    }));
  };

  if (loading) {
    return <Spinner />;
  }

  if (!course) {
    return (
      <div className={styles.notFound}>
        <div className={styles.notFoundContent}>
          <h2 className={styles.notFoundTitle}>Course not found</h2>
          <Link href="/courses" className={styles.backLink}>
            Back to courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <CourseHeader course={course} />

        <div className={styles.grid}>
          <div className={styles.videoSection}>
            <VideoPlayer
              selectedLesson={selectedLesson}
              hasAccess={course.hasAccess}
            />

            {selectedLesson && (
              <LessonDetails
                lesson={selectedLesson}
                hasAccess={course.hasAccess}
                isCompleted={lessonProgress[selectedLesson.id]}
                onMarkComplete={() => handleMarkComplete(selectedLesson.id)}
              />
            )}
          </div>

          <div className={styles.sidebarSection}>
            <LessonsSidebar
              lessons={course.lessons}
              selectedLesson={selectedLesson}
              lessonProgress={lessonProgress}
              courseProgress={courseProgress}
              hasAccess={course.hasAccess}
              onLessonSelect={handleLessonSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
