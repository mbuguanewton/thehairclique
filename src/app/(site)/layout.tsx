import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const script = localFont({
  src: "../../../public/fonnts.com-BrittanySignature.ttf",
  variable: "--font-script",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { getSettings } from "@/sanity/lib/settings";
import { urlForImage } from "@/sanity/lib/image";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  return {
    title: settings?.title || "The Hair Clique",
    description:
      settings?.description ||
      "Professional hair dressing services for wigs and styling.",
    keywords: settings?.keywords,
    openGraph: {
      images: settings?.ogImage
        ? [{ url: urlForImage(settings.ogImage).url() }]
        : [],
    },
  };
}

import SmoothScroll from "@/components/layout/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="" />
        <link
          rel="icon"
          href="/thc-fav2.svg"
          type="image/svg+xml"
          sizes="32x32"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${script.variable} antialiased`}
      >
        <SmoothScroll />
        <Navbar />
        <div className="min-h-screen pt-24">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
