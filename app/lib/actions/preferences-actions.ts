"use server";

import { db } from "@/app/lib/db";
import { verifyUnsubscribeToken } from "@/app/lib/emails/unsubscribe-token";
import { revalidatePath } from "next/cache";

export async function getSubscriberByToken(email: string, token: string) {
  const valid = verifyUnsubscribeToken(email, token);
  if (!valid) throw new Error("Invalid or expired link.");

  const subscriber = await db.subscriber.findUnique({ where: { email } });
  if (!subscriber) throw new Error("Subscriber not found.");

  return subscriber;
}

export async function updatePreferences({
  email,
  token,
  name,
  newEmail,
  categories,
}: {
  email: string;
  token: string;
  name: string;
  newEmail: string;
  categories: string[];
}) {
  const valid = verifyUnsubscribeToken(email, token);
  if (!valid) throw new Error("Invalid or expired link.");

  const subscriber = await db.subscriber.findUnique({ where: { email } });
  if (!subscriber) throw new Error("Subscriber not found.");

  // If email is changing, make sure the new one isn't already taken
  if (newEmail !== email) {
    const existing = await db.subscriber.findUnique({ where: { email: newEmail } });
    if (existing) throw new Error("That email is already subscribed.");
  }

  await db.subscriber.update({
    where: { email },
    data: {
      name: name.trim(),
      email: newEmail.trim().toLowerCase(),
      categories,
    },
  });

  revalidatePath("/preferences");
}