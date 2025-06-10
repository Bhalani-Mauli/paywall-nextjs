"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/components/context/UserProvider";
import styles from "./dashboard.module.css";
import Spinner from "@/components/atoms/Spinner/Spinner";
import SubscriptionCard from "@/components/SubscriptionCard/SubscriptionCard";
import CourseProgress from "@/components/CourseProgress/CourseProgress";

export default function DashboardPage() {
  const [courseProgress, setCourseProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const progressResponse = await fetch("/api/progress/course");
        if (progressResponse.ok) {
          const progressData = await progressResponse.json();
          setCourseProgress(progressData.progress || []);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        router.push("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  if (loading) {
    return <Spinner />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.header}>
          <h2 className={styles.welcomeTitle}>Welcome back, {user.name}!</h2>
          <SubscriptionCard user={user} />
        </div>
        <CourseProgress courseProgress={courseProgress} />
      </main>
    </div>
  );
}
