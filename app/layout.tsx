import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Script from "next/script";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "cvbuildr",
  description: "Build your resume and analyse in no time",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      
        <body
          className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
        >
          <Script
            id="razorpay-checkout-js"
            src="https://checkout.razorpay.com/v1/checkout.js"
          />
          {children}
        </body>

    </html>
  );
}
