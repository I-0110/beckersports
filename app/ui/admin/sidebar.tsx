"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { 
    // Cog8ToothIcon, 
    ListBulletIcon, TagIcon, PowerIcon 
} from "@heroicons/react/24/outline";

const navItems = [
    {
        label: "Posts",
        href: "/admin",
        icon: ListBulletIcon
    },
    {
        label: "Categories",
        href: "/admin/categories",
        icon: TagIcon
    },
    // {
    //     label: "Settings",
    //     href: "/admin/settings",
    //     icon: Cog8ToothIcon
    // }
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-48 min-h-screen bg-chiefs-light border-r border-chiefs-2 flex flex-col">
            {/* Logo */}
            <div className="bg-chiefs-1 h-14 flex items-center px-4 border-b border-gray-200">
                <span className="font-logo text-chiefs-a font-bold tracking-wide text-md uppercase">
                Becker Sports
                </span>
            </div>

            {/* Navigation */}
            <nav className="font-nav flex-1 p-3 flex flex-col gap-1">
                {navItems.map((item) => {
                    const isActive =
                        item.href === "/admin"
                            ? pathname === "/admin"
                            : pathname.startsWith(item.href);
                    return (
                        <Link 
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                                isActive
                                    ? "bg-chiefs-2 text-chiefs-1"
                                    : "text-chiefs-dark hover:bg-chiefs-3 hover:text-chiefs-light"
                            }`}
                        >
                            <item.icon className="h-5 w-5" />
                            <span className="ml-3">{item.label}</span>
                        </Link>
                    )
                })}
            </nav>

            {/* Sign out */}
            <div className="p-3 border-t border-chiefs-3">
                <button
                    onClick={() => signOut()}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-chiefs-dark hover:bg-chiefs-1 hover:text-chiefs-light"
                >
                    <PowerIcon className="h-5 w-5" />
                    <span>Sign out</span>
                </button>
            </div>

        </aside>
    )
} 