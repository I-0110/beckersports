import Link from 'next/link';
import PostCard from './postCard';
import { HeroPost, CardCarouselProps } from '@/app/lib/post/interfaces';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import DraggableScroll from '../draggableScroll';

export default function CardCarousel({ 
    posts, 
    title = 'Latest Posts', 
    viewAllHref = '/posts',
}: CardCarouselProps) {
    
    if (!posts || posts.length === 0) return null;

    return (
        <section className="bg-chiefs-light py-6 px-6 sm:px-8 lg:px-12">

            {/* Section Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-chiefs-2">
                <h2 className='font-logo text-sm tracking-wider uppercase text-chiefs-2'>{title}</h2>
                <Link
                    href={viewAllHref}
                    className="font-nav text-base lg:text-lg inline-flex items-center gap-2 text-chiefs-1 hover:brightness-150 transition-all"
                >
                    View all
                    <ArrowRightIcon className="w-4 h-4" />
                </Link>
            </div>

            {/* How the Horizontal Scrollable card row works:
                *   grid-flow-col  --> grid flows left to right (horizontal)
                *   auto-cols-[260px] --> each column is 260px wide
                *   overflow-x-auto   --> enables horizontal scroll
                *   snap-x snap-mandatory --> snaps to each card on scroll
            */}
            <DraggableScroll className="
                grid grid-flow-col auto-cols-70
                gap-4 overflow-x-auto scroll-smooth
                snap-x snap-mandatory pb-2
                scrollbar-width:none [&::-webkit-scrollbar]:hidden
                "
            >
                    {posts.map((post: HeroPost) => (
                        <PostCard key={post.id} post={post} />
                    ))}
            </DraggableScroll>
        </section>
    );
}