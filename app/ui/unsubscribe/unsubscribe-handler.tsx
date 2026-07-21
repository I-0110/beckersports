"use client";

import { useEffect, useState } from "react";
import { unsubscribe } from "@/app/lib/actions/unsubscribe-actions";
import Link from "next/link";

interface UnsubscribeHandlerProps {
  email: string;
  token: string;
}

export default function UnsubscribeHandler({ email, token }: UnsubscribeHandlerProps) {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function run() {
      try {
        await unsubscribe(email, token);
        setStatus("success");
      } catch {
        setStatus("error");
        setMessage("Something went wrong.");
      }
    }
    run();
  }, [email, token]);

  if (status === "loading") {
    return (
      <div className="text-center py-20">
        <p className="font-post-content text-chiefs-3 dark:text-chiefs-5 text-base animate-pulse">
          Processing your request...
        </p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="text-center py-20">
        <div className="text-5xl mb-4">👋</div>
        <h2 className="font-logo text-2xl text-chiefs-dark mb-3">
          You&apos;ve been unsubscribed
        </h2>
        <p className="font-post-content text-sm text-chiefs-3 dark:text-chiefs-5 mb-6">
          You won&apos;t receive any more emails from Becker Sports.
        </p>
        <Link
          href="/"
          className="font-nav text-sm text-chiefs-1 hover:underline"
        >
          ← Back to Becker Sports
        </Link>
      </div>
    );
  }

  return (
    <div className="text-center py-20">
      <div className="text-5xl mb-4">⚠️</div>
      <h2 className="font-logo text-2xl text-chiefs-dark mb-3">
        Something went wrong
      </h2>
      <p className="font-post-content text-sm text-red-500 mb-6">
        {message}
      </p>
      <Link
        href="/"
        className="font-nav text-sm text-chiefs-1 hover:underline"
      >
        ← Back to Becker Sports
      </Link>
    </div>
  );
}