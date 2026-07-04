'use client'

import { useState } from 'react';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import {
  Bars3Icon,
  XMarkIcon,
  PencilSquareIcon,
  BuildingOfficeIcon,
  PowerIcon,
} from '@heroicons/react/24/outline';
import { NavProps } from '@/app/lib/post/interfaces';
import SubscribeModal from "@/app/ui/subscribe/subscribe-modal";

export default function Nav({ categories }: NavProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 z-50 w-full bg-chiefs-1 border-b border-chiefs-3 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-chiefs-light hover:text-chiefs-a"
            aria-label="Toggle menu"
          >
            {open ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="font-logo font-bold text-chiefs-a text-xl lg:text-3xl lg:shrink-0"
          >
            Becker Sports
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex flex-1 justify-center">
            <div className="flex space-x-8">
              <Link
                href="/"
                className="text-chiefs-light text-xl hover:text-chiefs-a font-nav transition-colors"
              >
                Home
              </Link>

              {/* Dynamic categories */}
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="text-chiefs-light text-xl hover:text-chiefs-a font-nav transition-colors"
                >
                  {cat.name}
                </Link>
              ))}

              <Link
                href="/about"
                className="text-chiefs-light text-xl hover:text-chiefs-a font-nav transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-chiefs-light text-xl hover:text-chiefs-a font-nav transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-1 lg:space-x-4">
            {session && (
              <>
                <button
                  onClick={() => router.push("/admin/posts/new")}
                  className="hidden lg:block p-2 text-chiefs-light hover:text-chiefs-a"
                  aria-label="New post"
                >
                  <PencilSquareIcon className="w-6 h-6" />
                </button>
                <button
                  onClick={() => router.push("/admin")}
                  className="hidden lg:block p-2 text-chiefs-light hover:text-chiefs-a"
                  aria-label="Admin dashboard"
                >
                  <BuildingOfficeIcon className="w-6 h-6" />
                </button>
                <button
                  onClick={() => signOut({ callbackUrl: "/admin/login" })}
                  className="hidden lg:block p-2 text-chiefs-light hover:text-chiefs-a"
                  aria-label="Sign out"
                >
                  <PowerIcon className="w-6 h-6" />
                </button>
              </>
            )}

            <SubscribeModal />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-1 bg-chiefs-dark border-t border-chiefs-3">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="block px-3 py-3 text-chiefs-light hover:text-chiefs-a rounded-md font-nav text-xl transition-colors"
          >
            Home
          </Link>

          {/* Dynamic categories on mobile */}
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              onClick={() => setOpen(false)}
              className="block px-3 py-3 text-chiefs-light hover:text-chiefs-a rounded-md font-nav text-xl transition-colors"
            >
              {cat.name}
            </Link>
          ))}

          <Link
            href="/about"
            onClick={() => setOpen(false)}
            className="block px-3 py-3 text-chiefs-light hover:text-chiefs-a rounded-md font-nav text-xl transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="block px-3 py-3 text-chiefs-light hover:text-chiefs-a rounded-md font-nav text-xl transition-colors"
          >
            Contact
          </Link>

          {session && (
            <>
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="block px-3 py-3 text-chiefs-light hover:text-chiefs-a rounded-md font-nav text-xl transition-colors"
              >
                Writer&apos;s Dashboard
              </Link>
              <Link
                href="/admin/posts/new"
                onClick={() => setOpen(false)}
                className="block px-3 py-3 text-chiefs-light hover:text-chiefs-a rounded-md font-nav text-xl transition-colors"
              >
                New Post
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/admin/login" })}
                className="block w-full text-left px-3 py-3 text-chiefs-light hover:text-chiefs-a rounded-md font-nav text-xl transition-colors"
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}