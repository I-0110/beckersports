"use server";

import { db } from "@/app/lib/db";
import { revalidatePath } from "next/cache";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function createCategory(name: string) {
  const slug = slugify(name);
  await db.category.create({
    data: { name, slug },
  });
  revalidatePath("/admin/categories");
}

export async function updateCategory(id: string, name: string) {
  const slug = slugify(name);
  await db.category.update({
    where: { id },
    data: { name, slug },
  });
  revalidatePath("/admin/categories");
}

export async function deleteCategory(id: string) {
  const postCount = await db.post.count({
    where: { categoryId: id },
  });

  if (postCount > 0) {
    throw new Error(
      `Cannot delete — ${postCount} post${postCount > 1 ? "s are" : " is"} still using this category.`
    );
  }

  await db.category.delete({ where: { id } });
  revalidatePath("/admin/categories");
}