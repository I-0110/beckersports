"use client";

import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface PublishConfirmModalProps {
  postTitle: string;
  onConfirm: (notifySubscribers: boolean) => void;
  onCancel: () => void;
}

export default function PublishConfirmModal({
  postTitle,
  onConfirm,
  onCancel,
}: PublishConfirmModalProps) {
  const [notify, setNotify] = useState(true);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6 relative shadow-xl">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        <h2 className="font-logo text-xl text-chiefs-dark mb-2">
          Publish post?
        </h2>
        <p className="font-post-content text-sm text-chiefs-3 dark:text-chiefs-5 mb-6 line-clamp-2">
          &quot;{postTitle}&quot;
        </p>

        {/* Notify toggle */}
        <div
          className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl mb-6 cursor-pointer"
          onClick={() => setNotify(!notify)}
        >
          <div
            className={`w-10 h-6 rounded-full transition-colors flex items-center px-1 ${
              notify ? "bg-chiefs-1" : "bg-gray-200"
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${
                notify ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </div>
          <div>
            <p className="font-nav text-sm font-medium text-chiefs-dark">
              Notify subscribers
            </p>
            <p className="font-post-content text-xs text-chiefs-3 dark:text-chiefs-5">
              Send email to matching subscribers
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 border border-gray-200 text-gray-700 text-sm font-medium py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm(notify)}
            className="flex-1 bg-chiefs-1 hover:bg-red-700 text-white text-sm font-medium py-2 rounded-lg transition-colors"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}