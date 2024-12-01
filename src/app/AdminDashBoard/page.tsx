/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import React from "react";
import Admin from "../_hooks/AdminProt";
import Heading from "@/utils/Heading";
import { useSelector } from "react-redux";

import AdminSidebar from "../_components/Admin/sidebar/AdminSidebar";
import DashBoardHero from "../_components/Admin/DashBoardHero";

interface User {
  name: string;
}

interface AuthState {
  user: User | null;
}

const Page = () => {
  // Correctly typed `auth` state
  const { user } = useSelector((state: { auth: AuthState }) => state.auth);

  return (
    <Admin>
      <Heading
        title={`${user?.name || "Admin"} Admin`}
        description="Manage your store"
        keywords="admin"
      />

      <div className="flex h-[200vh]">
        {/* Sidebar */}
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>

        {/* Main Content */}
        <div className="w-[85%] text-teal-500">
          <DashBoardHero />
        </div>
      </div>
    </Admin>
  );
};

export default Page;
