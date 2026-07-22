import Link from "next/link";
import PostCard from "@/app/ui/latest-posts/postCard";
import { HeroPost } from "@/app/lib/post/interfaces";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

type PostsListProps = {
  posts: HeroPost[];
  currentPage: number;
  totalPages: number;
};

export default function PostsList({ posts, currentPage, totalPages }: PostsListProps) {
  return (
    <main>
      {/* Heading */}
      <div className="mb-8 border-b border-chiefs-2 dark:border-chiefs-4 pb-4">
        <h1 className="mb-8 text-4xl font-extrabold text-chiefs-1 dark:text-chiefs-a">
          Latest Posts
        </h1>
        <p className="font-post-content text-sm text-chiefs-3 dark:text-chiefs-5 mt-1">
          {posts.length === 0 ? "No posts yet" : `Page ${currentPage} of ${totalPages}`}
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="py-20 text-center">
          <p className="font-post-content text-chiefs-3 dark:text-chiefs-5 text-base">
            No posts yet — check back soon!
          </p>
          <Link
            href="/"
            className="mt-4 inline-block font-nav text-sm text-chiefs-1 dark:text-chiefs-a hover:underline"
          >
            <ArrowLeftIcon className="h-4 w-4" /> Back to home
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-chiefs-2 dark:border-chiefs-4 pt-6">
              {currentPage > 1 ? (
                <Link
                  href={`/posts?page=${currentPage - 1}`}
                  className="font-nav text-sm text-chiefs-1 hover:underline flex items-center gap-1"
                >
                  <ArrowLeftIcon className="h-4 w-4" /> Previous
                </Link>
              ) : (
                <div />
              )}

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Link
                    key={page}
                    href={`/posts?page=${page}`}
                    className={`font-nav text-sm w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
                      page === currentPage
                        ? "bg-chiefs-1 dark:bg-chiefs-a text-chiefs-light dark:text-chiefs-dark font-bold"
                        : "text-chiefs-2 dark:text-chiefs-4 hover:bg-chiefs-2/10 dark:hover:bg-chiefs-4/10"
                    }`}
                  >
                    {page}
                  </Link>
                ))}
              </div>

              {currentPage < totalPages ? (
                <Link
                  href={`/posts?page=${currentPage + 1}`}
                  className="font-nav text-sm text-chiefs-1 dark:text-chiefs-a hover:underline flex items-center gap-1"
                >
                  Next <ArrowRightIcon className="h-4 w-4" />
                </Link>
              ) : (
                <div />
              )}
            </div>
          )}
        </>
      )}
    </main>
  );
}