import { db } from "@/app/lib/db";
import PostForm from "@/app/ui/admin/post-form";

export default async function NewPostPage() {
  const categories = await db.category.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="p-8">
      <h1 className="text-xl font-medium text-gray-900 mb-6">New post</h1>
      <PostForm categories={categories} />
    </div>
  );
}