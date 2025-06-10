import { NextResponse } from "next/server";
import { db } from "@/lib/server/db";

export async function GET(request) {
  try {
    const userId = request.headers.get("x-user-id");

    const courseProgressList = await db.courseProgress.findMany({
      where: {
        userId: userId,
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            _count: {
              select: { lessons: true },
            },
          },
        },
      },
    });

    const progressData = courseProgressList.map((progress) => {
      const totalLessons = progress.course._count.lessons || 0;
      const completedLessons = progress.completedLessons || 0;
      const progressPercentage =
        totalLessons > 0
          ? Math.round((completedLessons / totalLessons) * 100)
          : 0;

      return {
        courseId: progress.course.id,
        title: progress.course.title,
        totalLessons,
        completedLessons,
        progressPercentage,
      };
    });

    return NextResponse.json({ progress: progressData });
  } catch (error) {
    console.error("Get course progress error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const userId = request.headers.get("x-user-id");

    const {
      courseId,
      completedLessons: completedLessonsStr,
      totalLessons: totalLessonsStr,
    } = await request.json();
    const completedLessons = Number(completedLessonsStr) || 0;
    const totalLessons = Number(totalLessonsStr) || 0;
    if (!courseId) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    const courseProgress = await db.courseProgress.upsert({
      where: {
        userId_courseId: {
          userId: userId,
          courseId: courseId,
        },
      },
      update: {
        completedLessons,
        totalLessons,
      },
      create: {
        userId: userId,
        courseId,
        completedLessons,
        totalLessons,
      },
    });

    return NextResponse.json({ courseProgress });
  } catch (error) {
    console.error("Update course progress error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
