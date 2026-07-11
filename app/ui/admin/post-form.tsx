"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TiptapEditor from "./tiptap-editor";
import { createPost, updatePost, publishPost } from "@/app/lib/actions/post-actions";
import type { Category, Post } from "@prisma/client";
import Link from "next/link";
import PublishConfirmModal from "./publish-confirm-modal";


interface PostFormProps {
  categories: Category[];
  post?: Post; // if provided, form runs in edit mode
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function toDateInputValue(date: Date | null | undefined) {
  const d = date ? new Date(date) : new Date();
  return d.toISOString().split("T")[0];
}

export default function PostForm({ categories, post }: PostFormProps) {
  const router = useRouter();
  const isEditMode = Boolean(post);

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [categoryId, setCategoryId] = useState(post?.categoryId ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [publishedAt, setPublishedAt] = useState(
    toDateInputValue(post?.publishedAt)
  );
  const [saving, setSaving] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);

  function handleTitleChange(value: string) {
    setTitle(value);
    setSlug(slugify(value));
  }

  async function handleSubmit(published: boolean) {
    if (!title.trim()) {
      alert("Title is required.");
      return;
    }
    if (published) {
      setShowPublishModal(true);
      return;
    }
    await savePost(false);
  }

  async function savePost(published: boolean, notifySubscribers = false) {
    setSaving(true);
    try {
      const input = {
        title,
        slug: slug || slugify(title),
        categoryId,
        excerpt,
        content,
        published,
        publishedAt,
      };

      if (published && isEditMode && post) {
        await publishPost(post.id, notifySubscribers);
      } else if (isEditMode && post) {
        await updatePost(post.id, input);
      } else {
        await createPost(input);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong saving the post.");
      setSaving(false);
    }
  }

  return (
    <div className="font-post-title text-chiefs-2 max-w-3xl">
      {/* Title */}
      <div className="mb-5">
        <label className="block text-sm font-medium mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="Enter post title..."
          className="font-post-title text-chiefs-dark w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-chiefs-1 focus:border-transparent"
        />
      </div>

      {/* Category */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Category
        </label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Published date */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Published date
        </label>
        <input
          type="date"
          value={publishedAt}
          onChange={(e) => setPublishedAt(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
      </div>

      {/* Excerpt */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Excerpt
        </label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={2}
          placeholder="A short summary shown on the homepage and post previews"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
        />
      </div>

      {/* Content */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Content
        </label>
        <TiptapEditor content={content} onChange={setContent} />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pb-12">
        <button
          type="button"
          disabled={saving}
          onClick={() => handleSubmit(false)}
          className="border border-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          Save as draft
        </button>
        <button
          type="button"
          disabled={saving}
          onClick={() => handleSubmit(true)}
          className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : isEditMode ? "Update & Publish" : "Publish"}
        </button>

        {/* Preview — only available in edit mode since we need the post ID */}
        {isEditMode || post && (
          <Link
              href={`/admin/posts/${post.id}/preview`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 border border-green-200 text-green-700 bg-green-50 hover:bg-green-100 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              <i className="ti ti-eye text-base" aria-hidden="true" />
              Preview
            </Link>
        )}

        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="text-gray-500 text-sm px-4 py-2 hover:text-gray-700 transition-colors"
        >
          Cancel
        </button>
      </div>

      {showPublishModal && (
        <PublishConfirmModal
          postTitle={title}
          onConfirm={(notify) => {
            setShowPublishModal(false);
            savePost(true, notify);
          }}
          onCancel={() => setShowPublishModal(false)}
        />
      )}
    </div>
  );
}