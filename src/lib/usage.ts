import { RateLimiterPrisma } from "rate-limiter-flexible";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

const FREE_POINTS = 1;
const PRO_POINTS = 2;
const DURATION = 30 * 24 * 60 * 60; // 30 days
const GENERATE_FRAGMENT_POINTS = 1;

export async function getUsageTracker() {
  const { has } = await auth();
  const hasProAccess = has({ plan: "pro" });

  const usageTracker = new RateLimiterPrisma({
    storeClient: db,
    tableName: "Usage",
    points: hasProAccess ? PRO_POINTS : FREE_POINTS,
    duration: DURATION,
  });

  return usageTracker;
}

export async function consumeCredits() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const usageTracker = await getUsageTracker();
  const result = await usageTracker.consume(userId, GENERATE_FRAGMENT_POINTS);

  return result;
}

export async function getUsageStatus() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const usageTracker = await getUsageTracker();
  const result = await usageTracker.get(userId);

  return result;
}
