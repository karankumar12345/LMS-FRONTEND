"use client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import useAuth from "./useAuth";

interface ProtectedProps {
  children: React.ReactNode;
}

export default function Protected({ children }: ProtectedProps) {
  const [loading, setLoading] = useState(true);
  const isAuthenticated = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      if (!isAuthenticated) {
        redirect("/Auth/login");
      }
    }, 5000); // 5-second delay

    return () => clearTimeout(timer); // Cleanup the timer
  }, [isAuthenticated]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="ml-4 text-lg font-medium">Checking authentication...</p>
      </div>
    );
  }

  return <>{children}</>;
}
