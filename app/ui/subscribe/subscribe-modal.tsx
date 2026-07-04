"use client";

import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import SubscribeForm from "./subscribe-form";

export default function SubscribeModal() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  // Trigger entrance animation after modal mounts
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => setVisible(true));
    }
  }, [open]);

  function handleClose() {
    setVisible(false);
    setTimeout(() => setOpen(false), 300); // wait for exit animation
  }

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="font-nav font-bold text-chiefs-dark bg-chiefs-a rounded-md hover:brightness-125 transition-all
          text-sm py-1.5 px-2
          lg:text-xl lg:py-3 lg:px-3"
      >
        Subscribe
      </button>

      {/* Modal */}
      {open && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-all duration-300 ${
            visible ? "bg-black/50" : "bg-black/0"
          }`}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          {/* Background video */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src="/steak.mp4" type="video/mp4" />
          </video>

          {/* Dark overlay on top of video */}
          <div className="absolute inset-0 bg-black/50 z-10" />

          {/* Glowing card — same style as login */}
          <div
            className={`
              relative z-20
              bg-black/60 backdrop-blur-md
              border border-chiefs-1
              shadow-[0_0_40px_4px_rgba(220,38,38,0.5)]
              p-8 rounded-2xl
              w-full max-w-md
              transition-all duration-300
              ${visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"}
            `}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-1 text-chiefs-light hover:text-chiefs-a transition-colors"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <h2 className="font-logo text-2xl text-chiefs-a mb-1">
                Stay in the game
              </h2>
              <p className="font-post-content text-sm text-chiefs-light">
                Get Chiefs coverage and NFL analysis delivered to your inbox.
              </p>
            </div>

            <SubscribeForm onSuccess={() => setTimeout(() => handleClose(), 3000)} />
          </div>
        </div>
      )}
    </>
  );
}