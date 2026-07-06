import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const categories = await db.category.findMany({
    where: {
      posts: {
        some: { published: true },
      },
    },
    orderBy: { name: "asc" },
    select: { name: true, slug: true },
  });

  return NextResponse.json(categories);
}