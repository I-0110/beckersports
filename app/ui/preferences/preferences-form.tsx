"use client";

import { useState } from "react";
import { updatePreferences } from "@/app/lib/actions/preferences-actions";
import { PreferencesFormProps } from "@/app/lib/post/interfaces";

export default function PreferencesForm({
  subscriber,
  token,
  categories,
}: PreferencesFormProps) {
  const [name, setName] = useState(subscriber.name);
  const [email, setEmail] = useState(subscriber.email);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    subscriber.categories
  );
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
      await updatePreferences({
        email: subscriber.email,
        token,
        name,
        newEmail: email,
        categories: selectedCategories,
      });
      setSuccess(true);
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-3">✅</div>
        <h3 className="font-logo text-xl text-chiefs-dark mb-2">
          Preferences updated!
        </h3>
        <p className="font-post-content text-sm text-chiefs-3 dark:text-chiefs-5">
          Your subscription has been updated successfully.
        </p>
      </div>
    );
  }

  return (
<div className="flex flex-col gap-4">
      {/* Name */}
      <div>
        <label className="uppercase block text-sm font-medium text-chiefs-light mb-1.5">
          Your name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Patrick"
          className="font-nav w-full border border-gray-200 rounded-lg px-3 py-2 text-2xl outline-none focus:ring-2 focus:ring-chiefs-a focus:border-transparent"
        />
      </div>

      {/* Email */}
      <div>
        <label className="uppercase block text-sm font-medium text-chiefs-light mb-1.5">
          Your email
        </label>
        <input
          type="email"
          className="font-nav w-full border border-gray-200 rounded-lg px-3 py-2 text-2xl outline-none focus:ring-2 focus:ring-chiefs-a focus:border-transparent"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
      </div>

      {/* Categories */}
      <div>
        <label className="uppercase block text-sm font-medium text-chiefs-light mb-1.5">
          Topics you would like to add, remove, or modify.
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const active = selectedCategories.includes(cat.slug);
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => toggleCategory(cat.slug)}
                className={`font-nav text-xs px-3 py-1.5 rounded-full font-bold border transition-colors ${
                  active
                    ? "bg-chiefs-1 text-chiefs-light border-chiefs-1"
                    : "bg-white/10 text-chiefs-light border-chiefs-3 hover:border-chiefs-1 hover:text-chiefs-a"
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
        <p className="font-post-content text-xs text-chiefs-3 dark:text-chiefs-5 mt-1.5">
          Leave all unselected to receive everything.
        </p>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="button"
        disabled={loading}
        onClick={handleSubmit}
        className="w-full bg-chiefs-1 hover:bg-red-700 text-white font-nav font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save preferences"}
      </button>
    </div>
  );
}