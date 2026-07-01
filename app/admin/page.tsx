import Link from "next/link";
import { db } from "@/app/lib/db";
import StatCards from "@/app/ui/admin/stat-cards";
import PostsTable from "@/app/ui/admin/posts-table";
import { PlusIcon } from "@heroicons/react/24/solid";

export default async function AdminDashboard() {
  const posts = await db.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });

  const published = posts.filter((p) => p.published).length;
  const drafts = posts.filter((p) => !p.published).length;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-post-title font-medium text-chiefs-dark">Posts</h1>
        <Link
          href="/admin/posts/new"
          className="flex items-center gap-2 bg-chiefs-1 hover:bg-chiefs-a text-chiefs-light hover:text-chiefs-dark text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <PlusIcon className="w-4 h-4" />
          New post
        </Link>
      </div>

      {/* Stats */}
      <StatCards total={posts.length} published={published} drafts={drafts} />

      {/* Table */}
      <PostsTable posts={posts} />
    </div>
  );
}