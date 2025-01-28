'use client'
import React, { useEffect, useState } from 'react'
import { AiFillBuild } from 'react-icons/ai';
import { BiAnalyse, BiMoney, BiBlock, BiDollar } from 'react-icons/bi';
import { CgFormatLeft } from 'react-icons/cg';
import { SiGooglegemini } from 'react-icons/si';
import Pricing from './pricing/Pricing';
import { useRouter } from 'next/navigation';

export default function Payment() {
    const [currency, setCurrency] = useState("");
    const router = useRouter();

  useEffect(() => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (userTimeZone === "Asia/Calcutta" || userTimeZone === "Asia/Kolkata") {
      setCurrency("INR");
    } else {
      setCurrency("USD");
    }
  }, []);

  return (
    <section className='my-32 flex items-center justify-center flex-col gap-12'>
    <h1 className='font-bold text-4xl'>Pricing</h1>
    <div className="flex flex-row flex-wrap w-full items-center justify-center">
        
    <Pricing
      tier="Basic"
      price="0"
      currency={currency === "USD" ? "$" : "₹"}
      onClick={() => {}}
      Features={() => (
        <div className="flex flex-col gap-2 items-start justify-start w-full h-full">
          <div className="flex gap-3 font-medium text-base items-center">
            <AiFillBuild className="text-xl" /> Build your resume with{" "}
            <span className="underline -ml-2">watermark</span>
          </div>
          <div className="flex gap-3 font-medium text-base items-center">
            <BiAnalyse className="text-xl" /> Analyse and get scores
          </div>
        </div>
      )}
      button="Start building"
    />
    <Pricing
    onClick={() => {
        router.push("/signin")
    }}
      tier="Pro"
      price={currency === "USD" ? "24" : "999"}
      currency={currency === "USD" ? "$" : "₹"}
      Features={() => (
        <div className="flex flex-col gap-2 items-start justify-start w-full h-full">
          <div className="flex gap-3 font-medium text-base items-center">
            <BiMoney className="text-xl" /> Everything from Free
          </div>
          <div className="flex gap-3 font-medium text-base items-center">
            <CgFormatLeft className="text-xl" /> Rewrites your summary
          </div>
          <div className="flex gap-3 font-medium text-base items-center">
            <SiGooglegemini className="text-xl" /> AI Suggestions
          </div>
          <div className="flex gap-3 font-medium text-base items-center">
            <BiBlock className="text-xl" /> No watermark
          </div>
          <div className="flex gap-3 font-medium text-base items-center">
            <BiDollar className="text-xl" /> Support the developer
          </div>
        </div>
      )}
      button="Upgrade"
    />
  </div>
  </section>
  )
}
