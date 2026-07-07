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

  console.log("Subscribe action started:", { name, email });

  if (!name.trim() || !email.trim()) {
    throw new Error("Name and email are required.");
  }

  try {
    const existing = await db.subscriber.findUnique({ where: { email } });
    console.log("Existing check done:", existing ? "found" : "not found");

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
    console.log("Subscriber created successfully");

    try {
      console.log("Attempting to send email via Resend...");
      console.log("FROM:", process.env.RESEND_FROM_EMAIL);
      console.log("API KEY starts with:", process.env.RESEND_API_KEY?.slice(0, 6));
      
      const result = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: email,
        subject: "You're in! Welcome to Becker Sports 🏈",
        html: welcomeEmailHtml({ name, categories, email }),
      });
      console.log("Email sent:", result);
    } catch {
      console.error("Email failed:", JSON.stringify({
        message: "Failed to send welcome email.",
        statusCode: 500,
        name: "EmailError",
      }));
    }

  } catch {
    console.error("Subscribe action error:")
    throw new Error("Subscription failed.");
  }
}