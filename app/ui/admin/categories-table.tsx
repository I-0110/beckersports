"use client";

import { useState, useTransition } from "react";
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/app/lib/actions/category-actions";

interface Category {
  id: string;
  name: string;
  slug: string;
  _count: { posts: number };
}

interface CategoriesTableProps {
  categories: Category[];
}

export default function CategoriesTable({ categories }: CategoriesTableProps) {
  const [isPending, startTransition] = useTransition();
  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [error, setError] = useState("");

  function handleAdd() {
    if (!newName.trim()) return;
    setError("");
    startTransition(async () => {
      try {
        await createCategory(newName.trim());
        setNewName("");
      } catch {
        setError("A category with that name already exists.");
      }
    });
  }

  function startEdit(cat: Category) {
    setEditingId(cat.id);
    setEditingName(cat.name);
    setError("");
  }

  function handleUpdate(id: string) {
    if (!editingName.trim()) return;
    setError("");
    startTransition(async () => {
      try {
        await updateCategory(id, editingName.trim());
        setEditingId(null);
      } catch {
        setError("Something went wrong updating the category.");
      }
    });
  }

  function handleDelete(id: string, name: string, postCount: number) {
    if (postCount > 0) {
      setError(
        `"${name}" can't be deleted — ${postCount} post${postCount > 1 ? "s are" : " is"} still using it. Reassign them first.`
      );
      return;
    }
    if (!confirm(`Delete "${name}"? This can't be undone.`)) return;
    setError("");
    startTransition(async () => {
      try {
        await deleteCategory(id);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      }
    });
  }

  return (
    <div className="max-w-2xl">
      {/* Add new category */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="New category name..."
          className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
        <button
          type="button"
          disabled={isPending || !newName.trim()}
          onClick={handleAdd}
          className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
        >
          Add
        </button>
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-500 text-sm mb-4">{error}</p>
      )}

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {categories.length === 0 ? (
          <p className="text-gray-400 text-sm text-center p-12">
            No categories yet — add one above.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Name</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Slug</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Posts</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr
                  key={cat.id}
                  className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3">
                    {editingId === cat.id ? (
                      <input
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleUpdate(cat.id);
                          if (e.key === "Escape") setEditingId(null);
                        }}
                        autoFocus
                        className="border border-gray-200 rounded px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-red-500 w-full"
                      />
                    ) : (
                      <span className="font-medium text-gray-900">{cat.name}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-500 font-mono text-xs">
                    {cat.slug}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {cat._count.posts}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      {editingId === cat.id ? (
                        <>
                          <button
                            type="button"
                            disabled={isPending}
                            onClick={() => handleUpdate(cat.id)}
                            className="text-xs border border-green-200 rounded px-2 py-1 text-green-700 hover:bg-green-50 transition-colors disabled:opacity-50"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingId(null)}
                            className="text-xs border border-gray-200 rounded px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => startEdit(cat)}
                            className="text-xs border border-gray-200 rounded px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            disabled={isPending}
                            onClick={() => handleDelete(cat.id, cat.name, cat._count.posts)}
                            className="text-xs border border-red-200 rounded px-2 py1 text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}