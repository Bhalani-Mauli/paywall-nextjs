import { NextResponse } from "next/server";
import { db } from "@/lib/server/db";
import { getUserFromToken } from "@/lib/server/auth";

export async function POST(request) {
  try {
    const user = await getUserFromToken(request);

    if (!user) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const { plan, paymentData } = await request.json();

    if (!["premium", "pro"].includes(plan.toLowerCase())) {
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
    endDate.setMonth(endDate.getMonth() + (plan === "premium" ? 1 : 12));

    const subscription = await db.subscription.upsert({
      where: { userId: user.id },
      update: {
        plan,
        status: "active",
        startDate,
        endDate,
      },
      create: {
        userId: user.id,
        plan,
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
