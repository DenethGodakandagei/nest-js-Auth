"use client";

import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const NavBar = () => {
  const { data: session } = useSession();

  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-white shadow-md border-b border-gray-200">
      {/* Logo / Brand */}
      <div className="flex items-center gap-6">
        <Link href="/" className="text-xl font-bold text-blue-700 hover:text-blue-800 transition">
          MyApp
        </Link>
        {session?.user?.id && (
          <Link
            href="/dashboard"
            className="text-base font-medium text-gray-700 hover:text-blue-600 transition"
          >
            Dashboard
          </Link>
        )}
      </div>

      {/* Auth Actions */}
      <div className="flex items-center gap-4">
        {session?.user ? (
          <>
            <span className="text-gray-600">Hello, {session.user.name || "User"}</span>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 text-sm font-semibold text-red-600 hover:text-red-800 transition"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link
              href="api/auth/signin"
              className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 transition"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
