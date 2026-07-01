import Link from "next/link";
import { formatDate } from "@/app/lib/post/functions";
import { PostFooterProps } from "@/app/lib/post/interfaces";

export default function PostFooter({ prev, next, related }: PostFooterProps) {
    return (
    <footer className="mt-12 border-t border-chiefs-2 pt-8 space-y-10">

      {/* Prev / Next */}
      {(prev || next) && (
        <div className="flex justify-between gap-4">
          {prev ? (
            <Link
              href={`/posts/${prev.slug}`}
              className="group flex flex-col max-w-xs"
            >
              <span className="font-nav text-xs text-chiefs-3 mb-1">
                ← Previous
              </span>
              <span className="font-post-content text-sm text-chiefs-2 group-hover:text-chiefs-1 transition-colors line-clamp-2">
                {prev.title}
              </span>
            </Link>
          ) : <div />}

          {next ? (
            <Link
              href={`/posts/${next.slug}`}
              className="group flex flex-col max-w-xs text-right"
            >
              <span className="font-nav text-xs text-chiefs-3 mb-1">
                Next →
              </span>
              <span className="font-post-content text-sm text-chiefs-2 group-hover:text-chiefs-1 transition-colors line-clamp-2">
                {next.title}
              </span>
            </Link>
          ) : <div />}
        </div>
      )}

      {/* Related posts */}
      {related.length > 0 && (
        <div>
          <h2 className="font-logo text-xl text-chiefs-dark mb-4">
            Related posts
          </h2>
          <div className="flex flex-col gap-4">
            {related.map((post) => (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                className="group flex flex-col"
              >
                <span className="font-logo text-base text-chiefs-2 group-hover:text-chiefs-1 transition-colors">
                  {post.title}
                </span>
                {post.excerpt && (
                  <span className="font-post-content text-sm text-chiefs-3 line-clamp-1 mt-0.5">
                    {post.excerpt}
                  </span>
                )}
                <span className="font-post-content text-xs italic text-chiefs-3 mt-1">
                  {formatDate(post.publishedAt ?? new Date())}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

    </footer>
  );
}

