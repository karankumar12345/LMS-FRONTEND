"use client";

import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

interface ProtectedProps {
  children: React.ReactNode;
}

export default function Admin({ children }: ProtectedProps) {
  // Use a specific type for the Redux state
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { user } = useSelector((state: { auth: { user: any } }) => state?.auth);

  // Check if the user exists and has the admin role

  const isAdmin = user && user?.role === "admin" ||"kar";

  // If the user is not an admin, redirect to the home page
  if (!isAdmin) {
    redirect("/");
    return null; // Return null to avoid rendering anything while redirecting
  }

  return <>{children}</>;
}

