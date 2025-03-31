/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"; // ✅ Keep this for client-side behavior

import "./globals.css";
import { Poppins, Josefin_Sans } from "next/font/google";
import { ThemeProvider } from "@/utils/theme-provider";
import { Toaster } from "react-hot-toast";
import AppProvider from "./Provider";
import { SessionProvider } from "next-auth/react";
import Header from "./_components/Header";
import RouterWrapper from "./RouterWrapper";

// ✅ Import fonts correctly
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const josefinSans = Josefin_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-josefin-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Canonical URL */}
        <link rel="canonical" href="https://learning-bac.vercel.app/" />

        {/* ✅ Google Site Verification */}
        <meta name="google-site-verification" content="your-google-verification-code" />

        {/* ✅ Favicon for Branding */}
        <link rel="icon" href="/karankumar.jpg" sizes="any" />
        <link rel="apple-touch-icon" href="/karankumar.jpg" />

        {/* ✅ Open Graph Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Karan Kumar LMS | Learning Management System" />
        <meta property="og:description" content="Experienced MERN Stack Developer skilled in React, Next.js, and AI solutions." />
        <meta property="og:url" content="https://learning-bac.vercel.app/" />
        <meta property="og:image" content="https://learning-bac.vercel.app/karankumar.jpg" />

        {/* ✅ Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Karan Kumar LMS | Learning Management System" />
        <meta name="twitter:description" content="Experienced MERN Stack Developer skilled in React, Next.js, and AI solutions." />
        <meta name="twitter:image" content="https://learning-bac.vercel.app/karankumar.jpg" />

        {/* ✅ JSON-LD Schema Markup for SEO */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Karan Kumar",
          "url": "https://learning-bac.vercel.app/",
          "image": "https://learning-bac.vercel.app/karankumar.jpg",
          "jobTitle": "Full-Stack Developer",
          "sameAs": [
            "https://www.linkedin.com/in/karan-kumar-823190256/",
            "https://github.com/karankumar12345",
            "https://leetcode.com/Karan1_2"
          ]
        })}} />
      </head>

      <body
        className={`${poppins.variable} ${josefinSans.variable} !bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`}
      >
        <SessionProvider>
          <AppProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Header activeItem={0} setActiveItem={function (item: number): void {
                throw new Error("Function not implemented.");}} />
              <RouterWrapper>{children}</RouterWrapper>
              <Toaster position="top-center" />
            </ThemeProvider>
          </AppProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
