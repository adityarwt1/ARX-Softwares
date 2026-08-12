import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar_Main_Wrapper from "@/components/Navbar/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arxsoftwares.com"

export const metadata: Metadata = {
  title: "ARX Softwares — Sustainable, unbeatable software products",
  description:
    "ARX Softwares ships sustainable software products with relentless focus on quality, performance, and long-term value.",
  icons: {
    icon: `${SITE_URL}/Arx_svg_WithoutBackground.svg`,
  },
  openGraph: {
    title: "ARX Softwares",
    description:
      "We build and ship unbeatable, sustainable software products designed for long-term success.",
    type: "website",
    url: SITE_URL,
    images: [`${SITE_URL}/Arx_svg_WithoutBackground.svg`],
  },
  twitter: {
    card: "summary_large_image",
    title: "ARX Softwares",
    description: "Shipping sustainable software products with unbeatable focus.",
  },
  authors: [
    {
      name: "ARX Softwares",
      url: SITE_URL,
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const isLive =
    process.env.NEXT_PUBLIC_IS_LIVE === "true" &&
    process.env.NEXT_PUBLIC_IS_PRODUCTION === "true";

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {isLive ? (
          <>
            <Navbar_Main_Wrapper />
            {children}
          </>
        ) : (
          <div className="w-full h-screen text-center flex justify-center items-center text-white"><div>Comming soon....</div></div>
        )}
      </body>
    </html>
  );
}