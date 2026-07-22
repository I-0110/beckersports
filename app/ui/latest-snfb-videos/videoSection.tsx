import { fetchLatestVideos } from "@/app/lib/snfb-video/functions";
import Link from 'next/link';
import VideoGrid from '@/app/ui/latest-snfb-videos/videoGrid';
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default async function VideoSection() {
  const channelId = process.env.YOUTUBE_CHANNEL_ID ?? '';
  const videos    = await fetchLatestVideos(channelId, 7);
 
  if (!videos.length) return null;
 
  return (
    <section className="bg-chiefs-dark py-6 px-6 sm:px-8 lg:px-12">
 
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-chiefs-light">
        <h2 className="font-logo tracking-wider uppercase text-2xl lg:text-3xl xl:text-4xl text-chiefs-a leading-tight">
          Sunday Night Foodball Videos
        </h2>
        <Link
          href="https://www.youtube.com/@sundaynightfoodball"
          target="_blank"
          rel="noopener noreferrer"
          className="font-nav text-base lg:text-lg inline-flex items-center gap-2 text-chiefs-a hover:brightness-150 transition-all"
        >
          Watch more on YouTube
          <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </div>
 
      {/* Grid */}
      <VideoGrid videos={videos} />
    </section>
  );
}