"use client";

import { useEffect, useState } from "react";
import { getSubscriberByToken } from "@/app/lib/actions/preferences-actions";
import PreferencesForm from "./preferences-form";
import Link from "next/link";
import { PreferencesLoaderProps, Subscriber } from "@/app/lib/post/interfaces";

export default function PreferencesLoader({
  email,
  token,
  availableCategories,
}: PreferencesLoaderProps) {
  const [subscriber, setSubscriber] = useState<Subscriber | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await getSubscriberByToken(email, token);
        setSubscriber(data);
      } catch {
        setError("Invalid link.");
      }
    }
    load();
  }, [email, token]);

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-3">⚠️</div>
        <h3 className="font-logo text-xl text-chiefs-dark mb-2">Invalid link</h3>
        <p className="font-post-content text-sm text-red-500 mb-4">{error}</p>
        <Link href="/" className="font-nav text-sm text-chiefs-1 hover:underline">
          ← Back to Becker Sports
        </Link>
      </div>
    );
  }

  if (!subscriber) {
    return (
      <p className="font-post-content text-sm text-chiefs-3 text-center py-8 animate-pulse">
        Loading your preferences...
      </p>
    );
  }

  return (
    <PreferencesForm
      subscriber={subscriber}
      token={token}
      availableCategories={availableCategories}
    />
  );
}