"use client";

import { useState } from "react";
import { subscribe } from "@/app/lib/actions/subscribe-actions";

const CATEGORIES = [
  { label: "Chiefs", slug: "KC" },
  { label: "Fantasy", slug: "fantasy" },
  { label: "Draft", slug: "draft" },
  { label: "Hall of Fame", slug: "hof" },
  { label: "SNF", slug: "snf" },
  { label: "101", slug: "101" },
  { label: "Podcast", slug: "podcast" },
];

interface SubscribeFormProps {
  onSuccess?: () => void;
}

export default function SubscribeForm({ onSuccess }: SubscribeFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function toggleCategory(slug: string) {
    setSelectedCategories((prev) =>
      prev.includes(slug)
        ? prev.filter((c) => c !== slug)
        : [...prev, slug]
    );
  }

  async function handleSubmit() {
    if (!name.trim() || !email.trim()) {
      setError("Name and email are required.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await subscribe({ name, email, categories: selectedCategories });
      setSuccess(true);
      onSuccess?.();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="text-center py-6">
        <div className="text-4xl mb-3">🏈</div>
        <h3 className="font-logo text-xl text-chiefs-dark mb-2">
          You&apos;re in!
        </h3>
        <p className="font-post-content text-sm text-chiefs-3">
          Check your inbox for a welcome email from Becker Sports.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-chiefs-light mb-1.5">
          Your name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Patrick"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-chiefs-1 focus:border-transparent"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-chiefs-light mb-1.5">
          Your email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-chiefs-1 focus:border-transparent"
        />
      </div>

      {/* Categories */}
      <div>
        <label className="block text-sm font-medium text-chiefs-light mb-2">
          Topics you care about
        </label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const active = selectedCategories.includes(cat.slug);
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => toggleCategory(cat.slug)}
                className={`font-nav text-xs px-3 py-1.5 rounded-full font-bold border transition-colors ${
                  active
                    ? "bg-chiefs-1 text-chiefs-light border-chiefs-1"
                    : "bg-white text-chiefs-2 border-gray-200 hover:border-chiefs-1 hover:text-chiefs-1"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
        <p className="font-post-content text-xs text-chiefs-3 mt-1.5">
          Leave all unselected to receive everything.
        </p>
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      {/* Submit */}
      <button
        type="button"
        disabled={loading}
        onClick={handleSubmit}
        className="w-full bg-chiefs-1 hover:bg-red-700 text-white font-nav font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
      >
        {loading ? "Subscribing..." : "Subscribe 🏈"}
      </button>

      <p className="font-post-content text-xs text-chiefs-3 text-center">
        No spam, ever. Unsubscribe anytime.
      </p>
    </div>
  );
}