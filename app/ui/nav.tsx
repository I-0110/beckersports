'use client'

import { useState } from 'react';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { 
  Bars3Icon, 
  XMarkIcon,  
  // PowerIcon,
  // MagnifyingGlassIcon,  
  // ChevronRightIcon,
  // ChevronLeftIcon,
  // UserGroupIcon,
  PencilSquareIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';

// import { signOut, useSession } from 'next-auth/react';

export default function Nav() {
    const [open, setOpen] = useState(false);

    // const { data: session, status } = useSession();
    const router = useRouter();

    // if (status === "loading") return null;

    const navLinks = [
        { 
            href: '/', 
            label: 'Home' 
        },
        { 
          href: '/hof', 
          label: 'Hall of Fame' 
        },
        // { 
        //   href: '/fantasy',  
        //   label: 'Fantasy'      
        // },
        // { 
        //   href: '/draft',    
        //   label: 'Draft'        
        // },
        // { 
        //   href: '/chiefs',   
        //   label: 'Chiefs'       
        // },
        // { 
        //   href: '/snfb',      
        //   label: 'Sunday Night Food Ball'          
        // },
        // { 
        //   href: '/101',      
        //   label: '101'          
        // },
        // { 
        //   href: '/podcast',  
        //   label: 'Podcast'      
        // },
        {
          href: '/about',
          label: 'About'
        },
        {
          href: '/contact',
          label: 'Contact'
        },
    ]

    return (
    <nav className="sticky top-0 z-50 w-full bg-chiefs-1 border-b border-chiefs-3 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile hamburger - left side */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-chiefs-light hover:text-chiefs-a"
            aria-label="Toggle menu"
          >
            {open ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>

          {/* Logo - centered on mobile, left on desktop */}
          <Link 
            href="/" 
            className="font-logo font-bold text-chiefs-a text-xl lg:text-3xl lg:shrink-0"
          >
            Becker Sports
          </Link>

          {/* Desktop Navigation - center */}
          <div className="hidden lg:flex flex-1 justify-center">
            <div className="flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-chiefs-light text-xl hover:text-chiefs-a font-nav transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side icons: TODO uncomment when buttons are working */}
          <div className="flex items-center space-x-1 lg:space-x-4">
            {/* <button className="p-2 text-chiefs-200 hover:text-thyme-100" aria-label="Search">
              <MagnifyingGlassIcon className="w-6 h-6" />
            </button> */}
            {/* {session ? ( */}
              <>
                {/* Special button for Teachers and Admin
                {(session.user?.role === "TEACHER" || session.user?.role === "ADMIN") && (
                  <button
                    onClick={() => router.push("/teacher")}
                    className="p-2 text-thyme-200 hover:text-thyme-100" 
                    aria-label="Students"
                  >
                    <UserGroupIcon className="w-6 h-6" />
                  </button>
                )} */}
                {/* Writer log and signout for everyone logged */}
                <button 
                  onClick={() => router.push("/post")}
                  className="hidden lg:block p-2 text-chiefs-light hover:text-chiefs-a"
                >
                  <PencilSquareIcon className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => router.push("/dashboard")}
                  className="hidden lg:block p-2 text-chiefs-light hover:text-chiefs-a"
                >
                  <BuildingOfficeIcon className="w-6 h-6" />
                </button>
                {/* <button 
                  onClick={() => signOut({ callbackUrl: "/login" })} 
                  className="p-2 text-thyme-200 hover:text-thyme-100" aria-label="Sign Out"
                >
                  <PowerIcon className="w-6 h-6" />
                </button> */}
              </>
            {/* ) : ( */}
              {/* // Not logged in — show Subscribe only */}
              <button
                onClick={() => router.push("/subscribe")}
                className="font-nav font-bold text-chiefs-dark bg-chiefs-a rounded-md hover:brightness-125 transition-all
                  text-sm py-1.5 px-2
                  lg:text-xl lg:py-3 lg:px-3"
              >
                Subscribe
              </button>
            {/* )} */}
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-1 bg-chiefs-dark border-t border-chiefs-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block px-3 py-3 text-chiefs-light hover:text-chiefs-a rounded-md font-nav text-xl transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            key='/dashboard'
            href='/dashboard'
            onClick={() => setOpen(false)}
            className="block px-3 py-3 text-chiefs-light hover:text-chiefs-a rounded-md font-nav text-xl transition-colors"
          >
            Writer&apos;s Dashboard 
          </Link>
          <Link
            key='/post'
            href='/post'
            onClick={() => setOpen(false)}
            className="block px-3 py-3 text-chiefs-light hover:text-chiefs-a rounded-md font-nav text-xl transition-colors"
          >
            Post 
          </Link>
        </div>
      </div>
    </nav>
)};