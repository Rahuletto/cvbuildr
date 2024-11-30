import Link from 'next/link'
import React from 'react'
import { FaHouse } from 'react-icons/fa6'

export default function HomeButton() {
  return (
    <Link href="/" className='absolute rounded-xl top-6 left-6 hover:shadow-hover active:shadow-active transition-all duration-200 h-[50px] w-[50px] flex items-center justify-center bg-black text-white font-semibold font-mono'>
        <FaHouse />
    </Link>
  )
}
