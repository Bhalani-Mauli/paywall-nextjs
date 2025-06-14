import { NextResponse } from "next/server";
import { db } from "@/lib/server/db";
import { getUser } from "@/lib/server/auth";

export async function GET(request, { params }) {
  try {
    const user = await getUser(request);
    const { id } = await params;

    const course = await db.course.findUnique({
      where: { id },
      include: {
        lessons: {
          where: { isPublished: true },
          orderBy: { order: "asc" },
        },
        courseProgress: {
          where: { userId: user?.id },
          select: {
            completedLessons: true,
            totalLessons: true,
            isCompleted: true,
          },
        },
      },
    });

    if (!course || !course.isPublished) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const hasAccess =
      !course.isPremium ||
      (user?.subscription?.plan !== "free" &&
        user?.subscription?.status === "active");

    if (course.isPremium && !hasAccess) {
      return NextResponse.json({
        course: {
          ...course,
          hasAccess: false,
          lessons: course.lessons.filter((lesson) => !lesson.isPremium),
        },
      });
    }

    let progress = null;
    if (user) {
      progress = await db.courseProgress.findUnique({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId: course.id,
          },
        },
      });
    }

    return NextResponse.json({
      course: {
        ...course,
        hasAccess: true,
        progress,
      },
    });
  } catch (error) {
    console.error("Get course error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
