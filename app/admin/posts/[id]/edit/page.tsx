import { db } from "@/app/lib/db";
import PostForm from "@/app/ui/admin/post-form";
import { notFound } from "next/navigation";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [post, categories] = await Promise.all([
    db.post.findUnique({ where: { id } }),
    db.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!post) notFound();

  return (
    <div className="p-8">
      <h1 className="text-xl font-medium text-gray-900 mb-6">Edit post</h1>
      <PostForm categories={categories} post={post} />
    </div>
  );
}