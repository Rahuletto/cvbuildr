"use client";

import React, { useState } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface UserDropdownProps {
  user?: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };
}

const UserDropdown: React.FC<UserDropdownProps> = ({ user }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter()

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleSignOut = () => {
    signOut();
  };

  return user ? (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 bg-white h-[50px] border-2 border-black w-[250px] focus:outline-none"
      >
        <Image
          width={46}
          height={46}
          src={user.image || ""}
          alt="Profile"
        />
        <h1 className="pl-2 text-ellipsis max-w-[200px] font-semibold font-mono">{user.name}</h1>
      </button>
      {isDropdownOpen && (
        <div className="absolute opacity-0 animate-fadeIn left-0 mt-2 w-[200px] bg-white border-black border-2 shadow-lg">
          <div className="">
            <button onClick={() => router.push('/edit')} className="px-4 py-4 font-medium hover:bg-slate-100 w-full text-left text-sm text-gray-700">Update details</button>
            <button
              onClick={handleSignOut}
              className="block px-4 py-4 text-sm bg-red-500 hover:bg-red-600 text-white font-semibold w-full text-left"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  ) : (
    <button
      className="h-[50px] w-[300px] text-xl font-semibold text-white font-mono bg-black"
      onClick={() => router.push("/signin")}
    >
      Sign in
    </button>
  );
};

export default UserDropdown;
