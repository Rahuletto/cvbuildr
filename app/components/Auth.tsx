// app/auth/page.tsx (Server Component)

import { getServerSession } from 'next-auth';
import { authOptions } from "@/types/AuthOptions";

import UserDropdown from './UserDropdown';
import Link from 'next/link';

export default async function Auth() {
  const session = await getServerSession(authOptions);

  if (!session) return (
    <Link
      className="transition-all z-50 duration-200 hover:shadow-hover active:shadow-active flex items-center justify-center text-md font-semibold text-white px-4 py-2 rounded-xl bg-black"
      href="/signin"
    >
      Sign in
    </Link>
  )

  return (

    <UserDropdown user={session.user} />

  );
}
