"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password.");
      setLoading(false);
    } else {
      router.push("/admin");
    }
  }

  return (
     <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/steak.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Glowing card */}
      <form
        onSubmit={handleSubmit}
        className="
          relative z-20
          bg-black/60 backdrop-blur-md
          border border-red-600
          shadow-[0_0_40px_4px_rgba(220,38,38,0.5)]
          p-10 rounded-2xl
          w-full max-w-sm
          flex flex-col gap-5
        "
      >
        <h1 className="text-chiefs-a text-2xl font-bold mb-2">Becker Sports</h1>
        <p className="text-chiefs-light dark:text-chiefs-dark font-post-content text-lg mb-4">Admin login</p>

        {error && <p className="text-yellow-400 text-sm">{error}</p>}

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="bg-chiefs-2 hover:bg-chiefs-a font-post-content text-chiefs-a hover:text-chiefs-2 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-chiefs-a"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="bg-chiefs-2 hover:bg-chiefs-a font-post-content text-chiefs-a hover:text-chiefs-2 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-chiefs-a"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-chiefs-a hover:brightness-125 font-post-content text-lg text-chiefs-dark font-semibold py-2 rounded-lg transition-all disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}