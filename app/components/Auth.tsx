// app/auth/page.tsx (Server Component)

import { getServerSession } from 'next-auth';
import { authOptions } from "@/types/AuthOptions";

import UserDropdown from './UserDropdown';
import Link from 'next/link';

export default async function Auth() {
    const session = await getServerSession(authOptions);
    
    if (!session) return (
        <Link
      className="absolute transition-all duration-200 hover:shadow-hover active:shadow-active top-[3.25rem] right-[3.25rem] h-[50px] flex items-center justify-center w-[150px] text-md font-semibold text-white font-mono bg-black"
      href="/signin"
    >
      Sign in
    </Link>
    )

    return (
        <div className='absolute top-[3.25rem] right-[3.25rem]'>
            <UserDropdown user={session.user} />
        </div>
    );
}
