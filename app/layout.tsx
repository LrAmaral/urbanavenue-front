import { Kumbh_Sans as Kumbh } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

import type { Metadata } from "next";
import "./globals.css";
import ToastProvider from "@/providers/toast-providers";
import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from "@/providers/cart-context";

const kumbh = Kumbh({
  subsets: ["latin"],
  display: "swap",
  weight: "600",
  variable: "--font-kumbh",
});

export const metadata: Metadata = {
  title: "UrbanAvenue®",
  description: "Start Page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <CartProvider>
        <html lang="en">
          <body
            className={`${kumbh.className} font-sans overflow-x-hidden h-auto scrollbar-thin scrollbar-track-neutral-50 scrollbar-thumb-neutral-200`}
          >
            <ToastProvider />
            {children}
          </body>
        </html>
      </CartProvider>
    </ClerkProvider>
  );
}
