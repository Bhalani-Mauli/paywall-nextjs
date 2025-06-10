import { NextResponse } from "next/server";
import { db } from "@/lib/server/db";

export async function POST(request) {
  try {
    const userId = request.headers.get("x-user-id");

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
      where: { userId: userId },
      update: {
        plan: planLower,
        status: "active",
        startDate,
        endDate,
      },
      create: {
        userId: userId,
        plan: planLower,
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
