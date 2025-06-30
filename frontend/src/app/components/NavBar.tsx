"use client";

import React from "react";
import Link from "next/link";
import SigninButton from "./SigninButton";

const NavBar = () => {
  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-white shadow-md">
      <div className="flex items-center gap-6">
        <Link
          href="/"
          className="text-lg font-semibold text-gray-700 hover:text-green-600 transition"
        >
          Home
        </Link>
        <Link
          href="/dashboard"
          className="text-lg font-semibold text-gray-700 hover:text-green-600 transition"
        >
          Dashboard
        </Link>
      </div>

      <SigninButton />
    </nav>
  );
};

export default NavBar;
