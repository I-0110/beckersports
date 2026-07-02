import { notFound } from "next/navigation";
import CategoryPosts from "@/app/ui/category/category-posts";
import { db } from "@/app/lib/db";

const POSTS_PER_PAGE = 10;

export async function generateStaticParams() {
  const categories = await db.category.findMany({
    select: { slug: true },
  });
  return categories.map((cat) => ({ slug: cat.slug }));
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const { page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page ?? "1"));

  // Find the category
  const category = await db.category.findUnique({
    where: { slug },
  });

  if (!category) notFound();

  // Count total posts for pagination
  const totalPosts = await db.post.count({
    where: { published: true, categoryId: category.id },
  });

  const totalPages = Math.max(1, Math.ceil(totalPosts / POSTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  // Fetch posts for current page
  const rawPosts = await db.post.findMany({
    where: { published: true, categoryId: category.id },
    orderBy: { publishedAt: "desc" },
    take: POSTS_PER_PAGE,
    skip: (safePage - 1) * POSTS_PER_PAGE,
    include: { category: true },
  });

  // Map to HeroPost shape
  const posts = rawPosts.map((post) => ({
    ...post,
    publishedAt: post.publishedAt ?? post.createdAt,
  }));

  return (
    <div>
      <main className="max-w-5xl mx-auto px-6 py-12">
        <CategoryPosts
          posts={posts}
          categoryName={category.name}
          currentPage={safePage}
          totalPages={totalPages}
          slug={slug}
        />
      </main>
    </div>
  );
}