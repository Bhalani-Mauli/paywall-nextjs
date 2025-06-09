import { NextResponse } from "next/server";
import { db } from "@/lib/server/db";
import { getUserFromToken } from "@/lib/server/auth";

export async function POST(request) {
  try {
    const user = await getUserFromToken(request);

    if (!user) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const { plan, paymentData } = await request.json(); // extract lowercase plan
    const planLower = plan.toLowerCase();

    if (!["premium", "pro"].includes(planLower)) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    if (
      !paymentData?.cardNumber ||
      !paymentData?.expiryDate ||
      !paymentData?.cvv
    ) {
      return NextResponse.json(
        { error: "Invalid payment data" },
        { status: 400 }
      );
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + (planLower === "premium" ? 1 : 12));

    const subscription = await db.subscription.upsert({
      where: { userId: user.id },
      update: {
        planLower,
        status: "active",
        startDate,
        endDate,
      },
      create: {
        userId: user.id,
        planLower,
        status: "active",
        startDate,
        endDate,
      },
    });

    return NextResponse.json({
      message: "Subscription upgraded successfully",
      subscription,
    });
  } catch (error) {
    console.error("Upgrade subscription error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
