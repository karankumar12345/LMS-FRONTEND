"use client";

import "./globals.css";
import { Poppins, Josefin_Sans } from "next/font/google";
import { ThemeProvider } from "@/utils/theme-provider";
import { Toaster } from "react-hot-toast";
import AppProvider from "./Provider";
import { SessionProvider } from "next-auth/react"; 
import { useLoadUserQuery } from "../../redux/features/apislice";
import Loading from "./Loading";
import Header from "./_components/Header";
import { useState } from "react";

// Load Google Fonts
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
  // Manage active item state
  const [activeItem, setActiveItem] = useState<string>("");

  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${josefinSans.variable} !bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`}
      >
        {/* Wrap the session provider to manage session state */}
        <SessionProvider>
          <AppProvider>
            {/* Theme management for light/dark mode */}
       
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Header activeItem={activeItem} setActiveItem={setActiveItem} />
              <ContentWrapper>{children}</ContentWrapper>
              <Toaster position="top-center" />

            </ThemeProvider>
          </AppProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

const ContentWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading } = useLoadUserQuery({});

  // Avoid client-server mismatch by rendering loading component consistently
  if (isLoading) return <Loading />;

  return <>{children}</>;
};
