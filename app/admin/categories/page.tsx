import { db } from "@/app/lib/db";
import CategoriesTable from "@/app/ui/admin/categories-table";

export default async function CategoriesPage() {
  const categories = await db.category.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: { select: { posts: true } },
    },
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-medium text-gray-900">Categories</h1>
      </div>
      <CategoriesTable categories={categories} />
    </div>
  );
}