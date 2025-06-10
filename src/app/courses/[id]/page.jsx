"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
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
  const [completedLessons, setCompletedLessons] = useState(0);
  const [courseProgress, setCourseProgress] = useState(0);
  const router = useRouter();
  const params = useParams();
  const courseId = params.id;

  useEffect(() => {
    // Mocking behaviour for showing progress bar
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/courses/${courseId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch course");
        }
        const data = await response.json();

        setCourse(data.course);
        if (data.course.lessons.length > 0) {
          setSelectedLesson(data.course.lessons[0]);
        }
        const completed = data.course?.progress?.completedLessons || 0;
        const progressPercent = Math.round(
          (completed / data.course.lessons.length) * 100
        );
        setCompletedLessons(completed);
        setCourseProgress(progressPercent <= 100 ? progressPercent : 100);
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

  const handleLessonSelect = (lesson) => {
    const canAccess = course.hasAccess || !lesson.isPremium;
    if (canAccess) {
      setSelectedLesson(lesson);
    }
  };

  const handleMarkComplete = async () => {
    const newCompleted = completedLessons + 1;
    // TODO(mauli) - Implement API call to mark lesson as complete
    const totalCompleted =
      newCompleted > course.lessons.length
        ? course.lessons.length
        : newCompleted;
    const response = await fetch(`/api/progress/course`, {
      method: "POST",
      body: JSON.stringify({
        courseId,
        completedLessons: totalCompleted,
        totalLessons: course.lessons.length,
      }),
    });

    if (!response.ok) {
      console.error("Failed to update lesson progress");
      return;
    }

    setCompletedLessons(newCompleted);
    const newProgress = Math.round(
      (newCompleted / course.lessons.length) * 100
    );
    if (newProgress <= 100) {
      setCourseProgress(newProgress);
    }
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
                onMarkComplete={handleMarkComplete}
              />
            )}
          </div>
          <div className={styles.sidebarSection}>
            <LessonsSidebar
              lessons={course.lessons}
              selectedLesson={selectedLesson}
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
