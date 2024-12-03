"use client";

import React, { FC, useState } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

interface UserDropdownProps {
  user?: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };
}

const UserDropdown: FC<UserDropdownProps> = ({ user }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleSignOut = () => {
    signOut();
  };

  return user ? (
    <div className="relative inline-block text-left z-50">
      <button
        onClick={toggleDropdown}
        className={`flex items-center rounded-full space-x-2 bg-white border-2 border-black hover:shadow-active active:shadow-active ${isDropdownOpen ? "shadow-active" : ""} transition-all focus:outline-none`}
      >
        <Image
          width={46}
          height={46}
          src={user.image || ""}
          alt="Profile"
          className="rounded-full"
        />
      </button>
      {isDropdownOpen && (
        <div className="absolute opacity-0 animate-fadeIn right-0 mt-4 w-[200px] rounded-xl bg-white border-black border-2 shadow-lg">
          <div className="">
            <button className="px-4 py-4 font-medium hover:bg-slate-100 w-full rounded-t-[10px] text-left text-sm text-gray-700">{user.name}</button>
            <button
              onClick={handleSignOut}
              className="block px-4 py-4 text-sm bg-red-500 hover:bg-red-600 rounded-b-[10px] text-white font-semibold w-full text-left cursor-pointer "
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  ) : (
    <Link
      className="transition-all z-50 duration-200 hover:shadow-hover active:shadow-active flex items-center justify-center text-md font-semibold text-white px-4 py-2 rounded-xl bg-black"
      href="/signin"
    >
      Sign in
    </Link>
  );
};

export default UserDropdown;
