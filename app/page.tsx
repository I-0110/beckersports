import Nav from "./ui/nav";
import Hero, { HeroEmpty } from "./ui/hero";
import { featuredPosts } from "./lib/post/post-data";
import CardCarousel from "./ui/latest-posts/cardCarousel";
import VideoSection from "./ui/latest-snfb-videos/videoSection";

export default function Home() {

  return (
    <div className="flex flex-col flex-1">
      <Nav />
      <main>
        {/* Hero — newest post */}
        {featuredPosts.length > 0 ? (
          <Hero posts={featuredPosts} />
        ) : (
          <HeroEmpty />
        )}

        {/* Latest Posts */}
        <CardCarousel posts={featuredPosts.slice(1)} />

                {/*
          When you connect Neon, replace featuredPosts with:
 
          const posts = await db.post.findMany({
            orderBy: { createdAt: 'desc' },
            take: 7,
            select: { id, title, content, category, createdAt, slug },
          });
 
          Then pass:
            <Hero posts={posts} />
            <CardCarousel posts={posts.slice(1)} />
        */}

         {/* Latest YouTube videos — auto-updates from RSS */}
        <VideoSection />
      </main>
    </div>
  );
}
