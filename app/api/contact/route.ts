import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, email, reason, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const { data, error } = await resend.emails.send({
    from: "Becker Sports <noreply@beckersports.com>",
    to: ["ivelisbecker@gmail.com", "alexbecker101@gmail.com"],
    replyTo: email,
    subject: `[Contact] ${reason} — ${name}`,
    text: `From: ${name} (${email})\nReason: ${reason}\n\n${message}`,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, id: data?.id });
}