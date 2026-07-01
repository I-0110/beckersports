import Link from "next/link";
import PostCard from "@/app/ui/latest-posts/postCard";
import { CategoryPostProps } from "@/app/lib/post/interfaces";

export default function CategoryPosts({ 
    posts,
    categoryName,
    currentPage,
    totalPages,
    slug,
}: CategoryPostProps) {

    return (
    <div>
      {/* Heading */}
      <div className="mb-8 border-b border-chiefs-2 pb-4">
        <h1 className="font-logo text-3xl lg:text-4xl text-chiefs-dark">
          {categoryName}
        </h1>
        <p className="font-post-content text-sm text-chiefs-3 mt-1">
          {posts.length === 0 ? "No posts yet" : `Page ${currentPage} of ${totalPages}`}
        </p>
      </div>

      {/* Posts grid */}
      {posts.length === 0 ? (
        <div className="py-20 text-center">
          <p className="font-post-content text-chiefs-3 text-base">
            No posts in this category yet — check back soon!
          </p>
          <Link
            href="/"
            className="mt-4 inline-block font-nav text-sm text-chiefs-1 hover:underline"
          >
            ← Back to home
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
            <div className="flex items-center justify-between border-t border-chiefs-2 pt-6">
              {currentPage > 1 ? (
                <Link
                  href={`/category/${slug}?page=${currentPage - 1}`}
                  className="font-nav text-sm text-chiefs-1 hover:underline flex items-center gap-1"
                >
                  ← Previous
                </Link>
              ) : (
                <div />
              )}

              {/* Page numbers */}
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Link
                    key={page}
                    href={`/category/${slug}?page=${page}`}
                    className={`font-nav text-sm w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
                      page === currentPage
                        ? "bg-chiefs-1 text-chiefs-light font-bold"
                        : "text-chiefs-2 hover:bg-chiefs-2/10"
                    }`}
                  >
                    {page}
                  </Link>
                ))}
              </div>

              {currentPage < totalPages ? (
                <Link
                  href={`/category/${slug}?page=${currentPage + 1}`}
                  className="font-nav text-sm text-chiefs-1 hover:underline flex items-center gap-1"
                >
                  Next →
                </Link>
              ) : (
                <div />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
