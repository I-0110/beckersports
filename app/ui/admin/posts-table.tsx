"use client";

import Link from "next/link";
import { useTransition } from "react";
import type { Post, Category } from "@prisma/client";
import { deletePost, togglePostPublished } from "@/app/lib/actions/post-actions";
// import { ClockIcon } from "@heroicons/react/24/outline";

type PostWithCategory = Post & { category: Category | null };

interface PostsTableProps {
  posts: PostWithCategory[];
}

export default function PostsTable({ posts }: PostsTableProps) {
  const [isPending, startTransition] = useTransition();

  function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This can't be undone.`)) return;
    startTransition(() => {
      deletePost(id);
    });
  }

  function handleToggle(id: string, published: boolean) {
    startTransition(() => {
      togglePostPublished(id, published);
    });
  }

  if (posts.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
        <p className="text-gray-400 text-sm">No posts yet.</p>
        <Link
          href="/admin/posts/new"
          className="mt-3 inline-block text-sm text-red-600 hover:underline"
        >
          Create your first post
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50">
            <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Title</th>
            <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Category</th>
            <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Status</th>
            <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Date</th>
            <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 font-medium text-gray-900 max-w-xs truncate">
                {post.title}
              </td>
              <td className="px-4 py-3 text-gray-500">
                {post.category?.name ?? "—"}
              </td>
              <td className="px-4 py-3">
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => handleToggle(post.id, post.published)}
                  className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium transition-opacity disabled:opacity-50 ${
                    post.published
                      ? "bg-green-100 text-green-800 hover:bg-green-200"
                      : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                  }`}
                >
                  {post.published ? "Published" : "Draft"}
                </button>
              </td>
              <td className="px-4 py-3 text-gray-500">
                {new Date(post.publishedAt ?? post.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </td>
              {/* <td className="px-4 py-3">
                {post.scheduledAt && !post.published ? (
                  <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Scheduled
                  </span>
                ) : (
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => handleToggle(post.id, post.published)}
                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium transition-opacity disabled:opacity-50 ${
                      post.published
                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                        : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                    }`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </button>
                )}
              </td>
              <td className="px-4 py-3 text-gray-500">
                {post.scheduledAt && !post.published ? (
                  <span className="text-blue-600 text-xs">
                    <ClockIcon className="w-3 h-3 mr-1" />
                    {new Date(post.scheduledAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </span>
                ) : (
                  new Date(post.publishedAt ?? post.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                )}
              </td> */}
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <Link
                    href={`/admin/posts/${post.id}/edit`}
                    className="text-xs border border-gray-200 rounded px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => handleDelete(post.id, post.title)}
                    className="text-xs border border-red-200 rounded px-2 py-1 text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}