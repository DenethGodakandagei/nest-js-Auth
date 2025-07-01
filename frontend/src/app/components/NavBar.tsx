"use client";

import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const NavBar = () => {
  const { data: session } = useSession();

  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-white shadow-md">
      <div className="flex items-center gap-6">
        <Link href="/" className="text-lg font-semibold text-gray-700 hover:text-green-600 transition">
          Home
        </Link>
        {session?.user?.id && (
          <Link
            href="/dashboard"
            className="text-lg font-semibold text-gray-700 hover:text-green-600 transition"
          >
            Dashboard
          </Link>
        )}
      </div>

      <div>
        {session?.user ? (
          <>
            <span className="mr-4">Hello, {session.user.name || "User"}</span>
            <button
              onClick={() => signOut()}
              className="text-red-600 hover:text-red-800 font-semibold"
            >
              Sign Out
            </button>
          </>
        ) : (
          <Link
            href="/api/auth/signin"
            className="text-green-600 hover:text-green-800 font-semibold"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
