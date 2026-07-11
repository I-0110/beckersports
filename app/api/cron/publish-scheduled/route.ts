import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { resend } from "@/app/lib/resend";
import { postNotigicationEmailHtml } from "@/app/lib/emails/post-notification";

export const runtime = "nodejs";

export async function GET(request: Request) {
    // Verify this is called by Vercel Cron Jobs
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find all posts scheduled for now or earlier that aren't published yet
    const duePosts = await db.post.findMany({
        where: {
            published: false,
            scheduledAt: { lte: new Date() },
        },
        include: { category: true },
    });

    if (duePosts.length === 0) {
        return NextResponse.json({ message: "No posts to publish", published: 0 });
    }

    const results = await Promise.allSettled(
        duePosts.map(async (post) => {
            // Publish the post
            await db.post.update({
                where: { id: post.id },
                data: {
                    published: true,
                    publishedAt: post.scheduledAt ?? new Date(),
                    scheduledAt: null,
                },
            });

            // Find matching subscribers for the post's category
            const subscribers = await db.subscriber.findMany({
                where: {
                    active: true,
                    OR: [
                        { categories: { isEmpty: true } },
                        ...(post.category
                            ? [{ categories: { has: post.category.slug} }]
                            : []),
                    ],
                },
            });

            // Send emails
            await Promise.allSettled(
                subscribers.map((subscriber) =>
                    resend.emails.send({
                        from: process.env.RESEND_FROM_EMAIL!,
                        to: subscriber.email,
                        subject: `New post: ${post.title}`,
                        html: postNotigicationEmailHtml({
                            subscriberName: subscriber.name ?? "there",
                            subscriberEmail: subscriber.email,
                            postTitle: post.title,
                            postExcerpt: post.excerpt ?? "",
                            postSlug: post.slug,
                            categoryName: post.category?.name ?? null,
                            categoryColor: "dc2626",
                        }),
                    })
                )
            );

            return post.title;
        })
    );

    const published = results.filter((result) => result.status === "fulfilled").length;
    console.log(`Cron: published ${published} post(s)`);

    return NextResponse.json({ message: "Posts published", published });
};