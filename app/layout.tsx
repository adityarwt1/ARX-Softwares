import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
