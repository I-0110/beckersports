"use client";

import { useState } from "react";
import Link from "next/link";

const REASONS = [
  "General feedback",
  "Story tip / news lead",
  "Correction request",
  "Advertising / partnership inquiry",
  "Guest writer interest",
] as const;

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    reason: REASONS[0],
    message: "",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to send");

      setStatus("success");
      setForm({ name: "", email: "", reason: REASONS[0], message: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 text-center py-6">
        <p className="font-post-content text-chiefs-a text-sm">
          Thanks — your message is in. We&apos;ll get back to you soon.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-lg bg-chiefs-a px-5 py-2 text-sm font-semibold text-chiefs-dark hover:brightness-125 transition-all"
          >
            Back to home
          </Link>
          <Link
            href="/posts"
            className="rounded-lg border border-chiefs-a px-5 py-2 text-sm font-semibold text-chiefs-a hover:bg-chiefs-a/10 transition-all"
          >
            Read latest posts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="uppercase block text-sm font-medium text-chiefs-light mb-1.5">
          Your name
        </label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Patrick"
          className="font-post-content w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-chiefs-a focus:border-transparent"
        />
      </div>

      <div>
        <label className="uppercase block text-sm font-medium text-chiefs-light mb-1.5">
          Your email
        </label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="you@example.com"
          className="font-post-content w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-chiefs-a focus:border-transparent"
        />
      </div>

      <div>
        <label className="uppercase block text-sm font-medium text-chiefs-light mb-1.5">
          Reason
        </label>
        <select
          value={form.reason}
          onChange={(e) => setForm({ ...form, reason: e.target.value as typeof form.reason })}
          className="font-post-content text-xs px-3 py-2 rounded-full font-bold border transition-colors bg-chiefs-light/10 text-chiefs-light border-chiefs-3 hover:border-chiefs-1 hover:text-chiefs-a"
        >
          {REASONS.map((reason) => (
            <option key={reason} value={reason} className="bg-chiefs-dark">
              {reason}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="uppercase block text-sm font-medium text-chiefs-light mb-1.5">
          Message
        </label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="mt-1 w-full rounded-lg border border-chiefs-3 dark:border-chiefs-5 bg-black/30 px-3 py-2 text-sm text-chiefs-light font-post-content focus:outline-none focus:border-chiefs-a resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-chiefs-1 hover:bg-red-700 text-white font-nav font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
      >
        {status === "submitting" ? "Sending..." : "Send message"}
      </button>

      {status === "error" && (
        <p className="font-post-content text-xs text-red-500">
          Something went wrong — please try again.
        </p>
      )}
    </form>
  );
}