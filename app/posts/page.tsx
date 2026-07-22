import PostsList from "@/app/ui/latest-posts/postsList";
import { getAllPublishedPosts } from "@/app/lib/actions/post-queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Latest Posts | Becker Sports",
  description: "Browse latest posts on Becker Sports.",
};

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  const { posts, totalPages } = await getAllPublishedPosts(currentPage);

  return (
    <div>
        <main className="max-w-5xl mx-auto px-6 py-12">
            <PostsList posts={posts} currentPage={currentPage} totalPages={totalPages} />
        </main>
    </div>
  );
}