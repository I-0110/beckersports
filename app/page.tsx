import Nav from "./ui/nav";
import Hero, { HeroEmpty } from "./ui/hero";
import CardCarousel from "./ui/latest-posts/cardCarousel";
import VideoSection from "./ui/latest-snfb-videos/videoSection";
import { db } from '@/app/lib/db'

export default async function Home() {
  const posts = await db.post.findMany({
  where: { published: true },
  orderBy: { publishedAt: 'desc' },
  take: 7,
  include: { category: true },
});

  return (
    <div>
      <Nav />
      <main>
        {/* Hero — newest post */}
        {posts.length > 0 ? (
          <Hero posts={posts} />
        ) : (
          <HeroEmpty />
        )}

        {/* Latest Posts */}
        <CardCarousel posts={posts.slice(1)} />

         {/* Latest YouTube videos — auto-updates from RSS */}
        <VideoSection />
      </main>
    </div>
  );
}
