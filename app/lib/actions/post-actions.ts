"use server";

import { db } from "@/app/lib/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

interface PostInput {
  title: string;
  slug: string;
  categoryId: string;
  excerpt: string;
  content: string;
  published: boolean;
  publishedAt: string;
}

export async function createPost(input: PostInput) {
  await db.post.create({
    data: {
      title: input.title,
      slug: input.slug,
      excerpt: input.excerpt || null,
      content: input.content,
      published: input.published,
      publishedAt: new Date(input.publishedAt),
      categoryId: input.categoryId || null,
    },
  });

  revalidatePath("/admin");
  redirect("/admin");
}

export async function updatePost(id: string, input: PostInput) {
  await db.post.update({
    where: { id },
    data: {
      title: input.title,
      slug: input.slug,
      excerpt: input.excerpt || null,
      content: input.content,
      published: input.published,
      publishedAt: new Date(input.publishedAt),
      categoryId: input.categoryId || null,
    },
  });

  revalidatePath("/admin");
  redirect("/admin");
}

export async function deletePost(id: string) {
  await db.post.delete({ where: { id } });
  revalidatePath("/admin");
  redirect("/admin");
}

export async function togglePostPublished(id: string, currentState: boolean) {
  await db.post.update({
    where: { id },
    data: { published: !currentState },
  });

  revalidatePath("/admin");
  redirect("/admin");
}
