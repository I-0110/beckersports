import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect, notFound } from "next/navigation";
import { db } from "@/app/lib/db";
import PostHeader from "@/app/ui/post/post-header";
import PostContent from "@/app/ui/post/post-content";
import Nav from "@/app/ui/nav";
import { ChevronDownIcon, EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const { id } = await params;

  const post = await db.post.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!post) notFound();

  return (
    <div>
      <Nav />

      {/* Draft preview banner */}
      <div className="bg-yellow-50 border-b border-yellow-200 px-6 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-yellow-700 text-sm font-medium">
            <EyeIcon className="w-4 h-4" />
            Draft preview
          </span>
          <span className="text-yellow-600 text-xs">
            — this post is {post.published ? "published" : "not visible to readers yet"}
          </span>
        </div>
        <Link
          href={`/admin/posts/${post.id}/edit`}
          className="text-xs text-yellow-700 border border-yellow-300 rounded px-3 py-1 hover:bg-yellow-100 transition-colors"
        >
            <ChevronDownIcon className="w-3 h-3" />
            Back to editor
        </Link>
      </div>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <PostHeader
          title={post.title}
          content={post.content}
          publishedAt={post.publishedAt}
          createdAt={post.createdAt}
          category={post.category}
        />
        <PostContent content={post.content} />
      </main>
    </div>
  );
}