/* eslint-disable react-hooks/rules-of-hooks */

"use client";
import React from "react";
import Admin from "../_hooks/AdminProt";
import Heading from "@/utils/Heading";
import { useSelector } from "react-redux";

import AdminSidebar from "../_components/Admin/sidebar/AdminSidebar";
import DashBoardHero from "../_components/Admin/DashBoardHero";
; // Import useTheme

const Page = () => {
  // Get the `auth` state with better type handling
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { user } = useSelector((state: any) => state.auth); // Destructure user from auth

  // Define your theme-based colors


  return (
    <Admin>
      <Heading
        title={`${user?.name} Admin`}
        description="Manage your store"
        keywords={"admin"}
      />

      <div className="flex h-[200vh]">
        {/* Sidebar */}
        <div
          className="1500px:w-[16%] w-1/5"

        >
          <AdminSidebar />
        </div>

        {/* Main Content */}
        <div className="w-[85%] text-teal-500">
          <DashBoardHero/>
        </div>
      </div>
    </Admin>
  );
};

export default Page;
