'use client'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import Payment from './Payment'
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Page() {
  return (
    <SessionProvider>
        <Payment supabase={supabase} />
    </SessionProvider>
  )
}
