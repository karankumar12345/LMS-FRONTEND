"use client";
import { redirect } from "next/navigation";
import useAuth from "./useAuth";

interface ProtectedProps {
  children: React.ReactNode;
}

export default function Protected({ children }: ProtectedProps) {
  const isAuthenticated = useAuth();

  if (isAuthenticated) {
    return <>{children}</>;
  } else {
    return redirect("/Auth/login");
  }
}
