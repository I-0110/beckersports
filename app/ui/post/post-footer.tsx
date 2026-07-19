import Link from "next/link";
import { formatDate } from "@/app/lib/post/functions";
import { PostFooterProps } from "@/app/lib/post/interfaces";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function PostFooter({ prev, next, related }: PostFooterProps) {
    return (
    <footer className="mt-12 border-t border-chiefs-2 dark:border-chiefs-4 pt-8 space-y-10">

      {/* Prev / Next */}
      {(prev || next) && (
        <div className="flex justify-between gap-4">
          {prev ? (
            <Link
              href={`/posts/${prev.slug}`}
              className="group flex flex-col max-w-xs"
            >
              <span className="flex font-post-content text-xs text-chiefs-3 dark:text-chiefs-5 mb-1 gap-2">
                <ArrowLeftIcon className="w-4 h-4" /> 
                Previous
              </span>
              <span className="font-post-content text-sm text-chiefs-2 dark:text-chiefs-4 group-hover:text-chiefs-1 dark:group-hover:text-chiefs-a transition-colors line-clamp-2">
                {prev.title}
              </span>
            </Link>
          ) : <div />}

          {next ? (
            <Link
              href={`/posts/${next.slug}`}
              className="group flex flex-col max-w-xs text-right"
            >
              <span className="flex font-post-content text-xs text-chiefs-3 dark:text-chiefs-5 mb-1 gap-2">
                Next
                <ArrowRightIcon className="w-4 h-4" /> 
              </span>
              <span className="font-post-content text-sm text-chiefs-2 dark:text-chiefs-4 group-hover:text-chiefs-1 dark:group-hover:text-chiefs-a transition-colors line-clamp-2">
                {next.title}
              </span>
            </Link>
          ) : <div />}
        </div>
      )}

      {/* Related posts */}
      {related.length > 0 && (
        <div>
          <h2 className="font-logo text-xl text-chiefs-dark dark:text-chiefs-light mb-4">
            Related posts
          </h2>
          <div className="flex flex-col gap-4">
            {related.map((post) => (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                className="group flex flex-col"
              >
                <span className="font-logo text-base text-chiefs-2 dark:text-chiefs-4 group-hover:text-chiefs-1 dark:group-hover:text-chiefs-a transition-colors">
                  {post.title}
                </span>
                {post.excerpt && (
                  <p className="font-post-content text-sm text-chiefs-3 dark:text-chiefs-5 text-line-clamp-2 mt-0.5">
                    {post.excerpt}
                  </p>
                )}
                <span className="font-post-content text-xs italic text-chiefs-3 mt-1">
                  {formatDate(post.publishedAt ?? new Date())}
                </span>
                <span className="font-post-content self-end text-sm text-chiefs-1 dark:text-chiefs-a group-hover:underline">
                  Read more...
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

    </footer>
  );
}

