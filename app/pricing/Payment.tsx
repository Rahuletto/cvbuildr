"use client";
import { SupabaseClient } from "@supabase/supabase-js";
import { useSession } from "next-auth/react";
import React, { FormEvent, useEffect, useState } from "react";
import Pricing from "./Pricing";
import { SiGooglegemini } from "react-icons/si";
import UserDropdown from "../components/UserDropdown";
import { AiFillBuild } from "react-icons/ai";
import { BiAnalyse, BiBlock, BiDollar, BiMoney } from "react-icons/bi";
import { CgFormatLeft } from "react-icons/cg";

declare global {
  interface Window {
    Razorpay: any;
  }
}

function Payment({ supabase }: { supabase: SupabaseClient }) {
  const { data: session } = useSession();
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");

  useEffect(() => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (userTimeZone === "Asia/Calcutta" || userTimeZone === "Asia/Kolkata") {
      setCurrency("INR");
    } else {
      setCurrency("USD");
    }
  }, []);

  const createOrderId = async () => {
    try {
      const response = await fetch("/api/payment/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: parseFloat(amount) * 100,
          currency: currency,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data.orderId;
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };

  const processPayment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const orderId: string = await createOrderId();
      const options = {
        amount: parseFloat(amount) * 100,
        currency: currency,
        name: session?.user?.name,
        description: "Purchase in cvbuildr",
        order_id: orderId,
        handler: async function (response: any) {
          const data = {
            orderCreationId: orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          const result = await fetch("/api/payment/verify", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
          });
          const res = await result.json();
          if (res.success) {
            supabase
              .from("Resume")
              .update({
                subscribed: res.success,
                subscribed_date: new Date().toISOString(),
              }) // @ts-expect-error idk
              .eq("uuid", session?.user?.id)
              .then((a) => {
                console.log(a);
                alert("Payment success!");
              });
          } else {
            alert(res.message);
          }
        },
        prefill: {
          name: session?.user?.name,
          email: session?.user?.email,
        },
        theme: {
          color: "#000000",
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.on("payment.failed", function (response: any) {
        alert(response.error.description);
      });
      paymentObject.open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="min-h-[screen] w-screen">
      <header className="md:py-6 py-3 px-7 md:px-14 flex justify-between items-center">
        <h1 className="font-semibold text-xl animate-fadeIn">cvbuildr</h1>
        <UserDropdown user={session?.user} />
      </header>
      <section className="flex p-12 items-center overflow-auto justify-center flex-col">
        <h1 className="text-4xl font-semibold">Pricing</h1>
        <form
          className="flex flex-col items-center justify-center gap-6 w-full mt-12"
          onSubmit={processPayment}
        >
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
              tier="Pro"
              price={currency === "USD" ? "24" : "999"}
              currency={currency === "USD" ? "$" : "₹"}
              onClick={() => setAmount(currency === "USD" ? "24" : "999")}
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
        </form>
      </section>
    </main>
  );
}

export default Payment;
