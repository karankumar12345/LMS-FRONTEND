/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Head from "next/head";


import "./globals.css";
import { Poppins, Josefin_Sans } from "next/font/google";
import { ThemeProvider } from "@/utils/theme-provider";
import { Toaster } from "react-hot-toast";
import AppProvider from "./Provider";
import { SessionProvider } from "next-auth/react";


import Header from "./_components/Header";

import RouterWrapper from "./RouterWrapper"; // New component

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
export const metadata = {  
  title: "LMS | Create Courses, Collaborate & Manage Learning",  
  description: "LMS is a powerful platform for creating courses and lessons where users can share resources, participate in discussions, manage assignments and quizzes, and collaborate on learning content.",  
  keywords: [
    "LMS",

    "Artical",
    "Documenation",
    "LMS Karan",
    "Learning Management System",
    "Course Creation",
    "Lesson Management",
    "Discussion Forums",
    "Assignments Management",
    "Quizzes",
    "Collaboration Tools",
    "Educational Content",
    "Online Learning",
    "E-Learning",
    "Student Engagement",
    "Instructor Tools",
    "MERN Stack",
    "Next.js",
    "JavaScript",
    "Tech Education",
  ],  
  openGraph: {
    title: "LMS | Create Courses, Collaborate & Manage Learning",
    description: "An advanced LMS platform for course creation, discussions, assignments, collaboration, and interactive learning.",
    url: "https://learning-bac.vercel.app/",  // Update with the actual project URL
    type: "website",
    images: [
      {
        url: "https://photos.fife.usercontent.google.com/pw/AP1GczP3DE3kpLXWFTYZfHzGYDysfdnCrjctV91nNg-PQ_ftJl74EJhsV_lI=w958-h539-s-no-gm?authuser=0", // Replace with your actual image URL
        width: 1200,
        height: 630,
        alt: "LMS Platform - Courses, Collaboration & Learning",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LMS | Create Courses, Collaborate & Manage Learning",
    description: "A Next.js-powered LMS platform for course creation, discussions, assignments, and collaboration in online learning.",
    images: ["https://photos.fife.usercontent.google.com/pw/AP1GczP3DE3kpLXWFTYZfHzGYDysfdnCrjctV91nNg-PQ_ftJl74EJhsV_lI=w958-h539-s-no-gm?authuser=0"], // Ensure it's a valid absolute URL
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 

  return (
    <html lang="en">
   <Head>
  <meta name="google-site-verification" content="EMRmOscRW_F2FevSrX3DYYlXCsXA5A80jolVHKYJG8Y" />
</Head>

      <body
        className={`${poppins.variable} ${josefinSans.variable} !bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`}
      >
        <SessionProvider>
          <AppProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Header activeItem={0} setActiveItem={function (item: number): void {
                throw new Error("Function not implemented.");
              } } />
              <RouterWrapper>{children}</RouterWrapper>
              <Toaster position="top-center" />
            </ThemeProvider>
          </AppProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
