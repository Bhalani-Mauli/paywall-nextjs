import { NextResponse } from "next/server";
import { db } from "@/lib/server/db";
import { getUserFromToken } from "@/lib/server/auth";

export async function GET(request) {
  try {
    const user = await getUserFromToken(request);
    const courses = await db.course.findMany({
      where: { isPublished: true },
      include: {
        lessons: {
          where: { isPublished: true },
          orderBy: { order: "asc" },
        },
        _count: {
          select: { lessons: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const filteredCourses = courses.map((course) => {
      const hasAccess =
        !course.isPremium ||
        (user?.subscription?.plan !== "free" &&
          user?.subscription?.status === "active");

      return {
        ...course,
        hasAccess,
        lessons: hasAccess
          ? course.lessons
          : course.lessons.filter((lesson) => !lesson.isPremium),
      };
    });

    return NextResponse.json({ courses: filteredCourses });
  } catch (error) {
    console.error("Get courses error:", error.message);
    return NextResponse.json(
      { error: error.message ?? "Internal server error" },
      { status: 500 }
    );
  }
}
