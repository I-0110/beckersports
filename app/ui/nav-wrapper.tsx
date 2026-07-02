import { db } from "@/app/lib/db";
import Nav from "@/app/ui/nav";

export default async function NavWrapper() {
  const categories = await db.category.findMany({
    where: {
      posts: {
        some: { published: true },
      },
    },
    orderBy: { name: "asc" },
    select: { name: true, slug: true },
  });

  return <Nav categories={categories} />; 
}