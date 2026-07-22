import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export default function NotFoundContent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-chiefs-a">
      <span className="text-sm font-semibold uppercase tracking-widest text-chiefs-dark">
        Penalty Flag
      </span>

      <h1 className="text-8xl font-extrabold tracking-tight text-chiefs-dark">
        404
      </h1>

      <p className="max-w-md text-lg text-chiefs-dark">
        Looks like this play didn&apos;t make it downfield. The page you&apos;re
        looking for doesn&apos;t exist — or got called back for a fumble.
      </p>

      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 rounded-lg bg-chiefs-a border border-chiefs-dark px-6 py-3 font-semibold text-chiefs-1 transition hover:bg-chiefs-1 hover:text-chiefs-a"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to home
        </Link>
        <Link
          href="/posts"
          className="flex items-center justify-center gap-2 rounded-lg bg-chiefs-a border border-chiefs-dark px-6 py-3 font-semibold text-chiefs-1 transition hover:bg-chiefs-1 hover:text-chiefs-a"
        >
          Latest posts
          <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}