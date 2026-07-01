import Link from "next/link";
import { getCategoryConfig, readTime, formatDate } from "@/app/lib/post/functions";
import { PostHeaderProps } from "@/app/lib/post/interfaces";

export default function PostHeader({
    title,
    content,
    publishedAt,
    createdAt,
    category,
}: PostHeaderProps) {
    const cat = getCategoryConfig(category?.name ?? null);
    const mins = readTime(content);
    const date = formatDate(publishedAt ?? createdAt);

    return (
    <header className="mb-8">
      {/* Category badge */}
      {category && (
        <Link
          href={`/category/${category.slug}`}
          className={`inline-block font-nav text-xs px-3 py-1 rounded-full font-bold mb-4 ${cat.bg} ${cat.text}`}
        >
          {cat.label}
        </Link>
      )}

      {/* Title */}
      <h1 className="font-logo text-3xl lg:text-4xl xl:text-5xl text-chiefs-dark leading-tight mb-4">
        {title}
      </h1>

      {/* Meta */}
      <p className="font-post-content text-sm italic text-chiefs-3">
        {date} · {mins} min read
      </p>

      {/* Divider */}
      <div className="mt-6 border-t border-chiefs-2" />
    </header>
  );
}


