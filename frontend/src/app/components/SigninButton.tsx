"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const SigninButton = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-gray-700 font-medium">
          {session.user.name}
        </span>
        <button
          onClick={() => signOut()}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Link
        href="/api/auth/signin"
        className="px-4 py-2 border border-green-600 text-green-600 rounded hover:bg-green-600 hover:text-white transition"
      >
        Sign In
      </Link>
    </div>
  );
};

export default SigninButton;
