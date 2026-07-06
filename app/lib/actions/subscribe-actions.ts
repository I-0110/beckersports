"use server";

import { db } from "@/app/lib/db";
import { resend } from "@/app/lib/resend";
import { welcomeEmailHtml } from "@/app/lib/emails/welcome-email";

interface SubscribeInput {
  name: string;
  email: string;
  categories: string[];
}

export async function subscribe(input: SubscribeInput) {
  const { name, email, categories } = input;

  if (!name.trim() || !email.trim()) {
    throw new Error("Name and email are required.");
  }

  const existing = await db.subscriber.findUnique({ where: { email } });
  if (existing) {
    throw new Error("This email is already subscribed!");
  }

  await db.subscriber.create({
    data: {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      categories,
      active: true,
    },
  });

  // Send welcome email separately — don't let email failure block subscription
  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: email,
      subject: "You're in! Welcome to Becker Sports 🏈",
      html: welcomeEmailHtml({ name, categories }),
    });
  } catch (emailErr) {
    console.error("Welcome email failed:", emailErr);
    // Don't throw — subscriber is saved, just log the email failure
  }
}