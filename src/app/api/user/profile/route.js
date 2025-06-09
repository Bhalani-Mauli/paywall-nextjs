import { NextResponse } from "next/server";
import { db } from "@/lib/server/db";
import { getUserFromToken } from "@/lib/server/auth";

export async function GET(request) {
  try {
    const user = await getUserFromToken(request);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userWithProgress = await db.user.findUnique({
      where: { id: user.id },
      include: {
        subscription: true,
        courseProgress: {
          include: {
            course: true,
          },
        },
      },
    });

    if (!userWithProgress) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        id: userWithProgress.id,
        name: userWithProgress.name,
        email: userWithProgress.email,
        subscription: userWithProgress.subscription,
        courseProgress: userWithProgress.courseProgress,
      },
    });
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
