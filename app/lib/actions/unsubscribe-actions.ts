"use server";

import { db } from "@/app/lib/db";
import { verifyUnsubscribeToken } from "@/app/lib/emails/unsubscribe-token";

export async function unsubscribe(email: string, token: string) {
  if (!email || !token) {
    throw new Error("Invalid unsubscribe link.");
  }

  const valid = verifyUnsubscribeToken(email, token);
  if (!valid) {
    throw new Error("Invalid or expired unsubscribe link.");
  }

  const subscriber = await db.subscriber.findUnique({ where: { email } });
  if (!subscriber) {
    throw new Error("This email is not subscribed.");
  }

  await db.subscriber.delete({ where: { email } });
}