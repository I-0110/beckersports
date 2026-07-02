import { notFound } from "next/navigation";
import PostHeader from "@/app/ui/post/post-header";
import PostContent from "@/app/ui/post/post-content";
import PostFooter from "@/app/ui/post/post-footer";
import { getPostBySlug, getNextPosts } from "@/app/lib/actions/post-queries";

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
        <PostContent content={post.content} />
        <PostFooter prev={prev} next={next} related={related} />
      </main>
    </div>
  );
}