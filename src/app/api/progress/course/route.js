import { NextResponse } from "next/server";
import { db } from "@/lib/server/db";
import { getUserFromToken } from "@/lib/server/auth";

export async function GET(request) {
  try {
    let user = await getUserFromToken(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get("courseId");

    if (courseId) {
      const courseProgress = await db.courseProgress.findUnique({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId: courseId,
          },
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

      return NextResponse.json({
        courseProgress,
        totalLessons: courseProgress?.course._count.lessons || 0,
        completedLessons: courseProgress?.completedLessons || 0,
        progressPercentage: courseProgress
          ? Math.round(
              (courseProgress.completedLessons /
                courseProgress.course._count.lessons) *
                100
            )
          : 0,
      });
    }
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
    console.log("Update course progress request received");
    let user = await getUserFromToken(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
    }

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
          userId: user.id,
          courseId: courseId,
        },
      },
      update: {
        completedLessons,
        totalLessons,
      },
      create: {
        userId: user.id,
        courseId,
        completedLessons,
        totalLessons,
      },
    });
    console.log("Course progress updated:", courseProgress);

    return NextResponse.json({ courseProgress });
  } catch (error) {
    console.error("Update course progress error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
