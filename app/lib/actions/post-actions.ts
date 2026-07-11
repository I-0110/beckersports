"use server";

import { db } from "@/app/lib/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { resend } from "@/app/lib/resend";
import { postNotificationEmailHtml } from "@/app/lib/emails/post-notification-email";

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

export async function publishPost(id: string, notifySubscribers: boolean) {
  const post = await db.post.update({
    where: { id },
    data: { published: true },
    include: { category: true },
  });

  revalidatePath("/admin");
  revalidatePath(`/posts/${post.slug}`);
  revalidatePath("/");

  if (!notifySubscribers) return;

  // Find matching subscribers
  const subscribers = await db.subscriber.findMany({
    where: {
      active: true,
      OR: [
        { categories: { isEmpty: true } },
        ...(post.category
          ? [{ categories: { has: post.category.slug } }]
          : []),
      ],
    },
  });

  if (subscribers.length === 0) return;

  // Send emails in parallel
  await Promise.allSettled(
    subscribers.map((subscriber) =>
      resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: subscriber.email,
        subject: `New post: ${post.title}`,
        html: postNotificationEmailHtml({
          subscriberName: subscriber.name,
          subscriberEmail: subscriber.email,
          postTitle: post.title,
          postExcerpt: post.excerpt,
          postSlug: post.slug,
          categoryName: post.category?.name ?? null,
          categoryColor: "#dc2626",
        }),
      })
    )
  );
}