'use client';
import { signIn } from 'next-auth/react'
import React from 'react'

export default function SigninButton() {
  return (
    <button className="h-[50px] active:shadow-active transition-all duration-200 hover:shadow-hover w-[300px] text-xl font-semibold text-white font-mono bg-black" onClick={() => signIn("google")}>Sign in with Google</button>
  )
}
