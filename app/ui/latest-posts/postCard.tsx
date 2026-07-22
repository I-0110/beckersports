import Link from 'next/link';
import { HeroPost } from '@/app/lib/post/interfaces';
import { getCategoryConfig, readTime, formatDate, excerpt } from '@/app/lib/post/functions';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function PostCard({ post }: { post: HeroPost }) {
  const cat = getCategoryConfig(post.category?.name ?? null);
  const mins = readTime(post.content);
  const createdAt = post.createdAt instanceof Date ? post.createdAt : new Date(post.createdAt);
  const href = `/posts/${post.slug ?? post.id}`;
  const hrefCat = `/category/${post.category?.slug ?? ""}`;
  return (
    <div className="
      flex w-60 sm:w-70 flex-col border border-chiefs-2 dark:border-chiefs-4 rounded-xl overflow-hidden bg-chiefs-light dark:bg-chiefs-2 snap-start">
        {/* Category top border */}
        <div className={`h-1 ${cat.bg}`} />

        <div className="p-4 flex flex-col flex-1">
            {/* Tag */}
            <Link 
                href={hrefCat} 
                className={`
                self-start font-nav text-xs px-3 py-1 rounded-full font-bold mb-3
                ${cat.bg} ${cat.text}
            `}>
              {cat.label}
            </Link>

            <Link href={href}>
                {/* Title */}
                <h2 className="mt-1 text-lg font-bold group-hover:text-chiefs-1 dark:group-hover:text-chiefs-a">
                    {post.title}
                </h2>

                {/* Excerpt */}
                <p className="font-post-content mt-2 line-clamp-3 text-sm text-chiefs-2 dark:text-chiefs-4">
                    {excerpt(post.content, 100)}
                </p>
            </Link>

            {/* Meta row */}
            <div className="flex justify-between items-center mt-auto pt-2 border-t border-chiefs-2 dark:border-chiefs-4">
                <span className="font-post-content text-[10px] italic text-chiefs-3 dark:text-chiefs-5">
                    {formatDate(createdAt)} · {mins} min read
                </span>
                <Link
                    href={href}
                    className="font-nav text-base lg:text-lg inline-flex items-center gap-2 text-chiefs-1 dark:text-chiefs-a hover:text-chiefs-3 dark:hover:text-chiefs-light transition-all"
                >
                    Read more
                    <ArrowRightIcon className="w-4 h-4" />
                </Link>
            </div>
        </div>
    </div>
  );
}