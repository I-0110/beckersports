import { notFound } from "next/navigation";
import PostHeader from "@/app/ui/post/post-header";
import PostContent from "@/app/ui/post/post-content";
import PostFooter from "@/app/ui/post/post-footer";
import { getPostBySlug, getNextPosts } from "@/app/lib/actions/post-queries";
import type { Metadata } from "next";
import ShareButtons from "@/app/ui/post/share-buttons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return { title: "Post not found" };

  const baseUrl = "https://beckersports.com";

  return {
    title: `${post.title} | Becker Sports`,
    description: post.excerpt ?? `Read ${post.title} on Becker Sports.`,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? `Read ${post.title} on Becker Sports.`,
      url: `${baseUrl}/posts/${post.slug}`,
      siteName: "Becker Sports",
      type: "article",
      publishedTime: post.publishedAt?.toISOString() ?? post.createdAt.toISOString(),
      tags: post.category ? [post.category.name] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt ?? `Read ${post.title} on Becker Sports.`,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const { prev, next, related } = await getNextPosts(
        post.publishedAt ?? post.createdAt,
        post.categoryId
    );

    return (
    <div>
      <main className="max-w-3xl mx-auto px-6 py-12">
        <PostHeader
          title={post.title}
          content={post.content}
          publishedAt={post.publishedAt}
          createdAt={post.createdAt}
          category={post.category}
        />
        <ShareButtons title={post.title} slug={post.slug} />
        <br />
        <PostContent content={post.content} />
        <ShareButtons title={post.title} slug={post.slug} />
        <PostFooter prev={prev} next={next} related={related} />
      </main>
    </div>
  );
}