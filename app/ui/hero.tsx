'use client';

import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { HeroPost } from '../lib/post/interfaces';
import { getCategoryConfig, readTime, formatDate, excerpt } from '../lib/post/functions';

/* Empty state */

export function HeroEmpty() {
  return (
    <section className="bg-chiefs-dark py-14 px-6">
      <p className="font-nav text-2xl text-chiefs-a">
        No posts yet — check back soon!
      </p>
    </section>
  );
}

/* Hero */

export default function Hero({ posts }: { posts: HeroPost[] }) {
  if (!posts || posts.length === 0) return <HeroEmpty />;

  // Always show the newest post (first in the array)
  const post = posts[0];
  const cat  = getCategoryConfig(post.category?.name ?? "Uncategorized");
  const mins = readTime(post.content);
  const href = `/posts/${post.slug ?? post.id}`;

  return (
    <section className="bg-chiefs-dark px-6 sm:px-8 lg:px-12 pt-10 pb-10">

      {/* Category tag and meta */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <span
          className={`
            flex items-center gap-1
            font-nav text-sm px-3 py-1 rounded-full font-bold
            ${cat.bg} ${cat.text}
          `}
        >
          {cat.label}
        </span>
        <span className="font-post-content text-xs italic text-chiefs-3">
          {formatDate(post.publishedAt ?? post.createdAt)} · {mins} min read
        </span>
      </div>

      {/* Headline */}
      <h1 className="font-logo text-3xl lg:text-4xl xl:text-5xl text-chiefs-light leading-tight mb-4 max-w-3xl">
        {post.title}
      </h1>

      {/* Excerpt */}
      <p className="font-post-content text-sm lg:text-base text-chiefs-3 leading-relaxed mb-6 max-w-xl line-clamp-2">
        {excerpt(post.content)}
      </p>

      {/* CTA */}
      <Link
        href={href}
        className="font-nav text-base lg:text-lg inline-flex items-center gap-2 text-chiefs-a hover:brightness-150 transition-all"
      >
        Read more
        <ArrowRightIcon className="w-4 h-4" />
      </Link>

    </section>
  );
}