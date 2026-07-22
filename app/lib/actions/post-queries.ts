import { db } from "@/app/lib/db";

export async function getPostBySlug(slug: string) {
  return db.post.findUnique({
    where: { slug, published: true },
    include: { category: true },
  });
}

export async function getNextPosts(publishedAt: Date, categoryId: string | null) {
  const [prev, next] = await Promise.all([
    db.post.findFirst({
      where: {
        published: true,
        publishedAt: { lt: publishedAt },
      },
      orderBy: { publishedAt: "desc" },
      select: { title: true, slug: true },
    }),
    db.post.findFirst({
      where: {
        published: true,
        publishedAt: { gt: publishedAt },
      },
      orderBy: { publishedAt: "asc" },
      select: { title: true, slug: true },
    }),
  ]);

  const related = categoryId
    ? await db.post.findMany({
        where: {
          published: true,
          categoryId,
          publishedAt: { not: publishedAt },
        },
        orderBy: { publishedAt: "desc" },
        take: 3,
        select: { title: true, slug: true, excerpt: true, publishedAt: true },
      })
    : [];

  return { prev, next, related };
}

export async function getAllPublishedPosts(page: number = 1, perPage: number = 12) {
  const [posts, totalPosts] = await Promise.all([
    db.post.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
      include: { category: true },
    }),
    db.post.count({ where: { published: true } }),
  ]);

  return { 
    posts, 
    totalPages: Math.ceil(totalPosts / perPage),
  };
}