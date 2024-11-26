/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
"use client";

import { Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import React, { useState } from "react";

const navItems = [
  { label: "Create Article", href: "/AriticalSection/Admin/create-Artical" },
  { label: "All Articles", href: "/AriticalSection/Admin/all-articles" },
];


const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative md:w-1/5 mt-[8%]">
      {/* Mobile Menu Toggle */}
      <IconButton
        onClick={() => setIsOpen(!isOpen)}
        className="block md:hidden absolute top-4 left-4 z-50"
        color="inherit"
        aria-label="Toggle Menu"
      >
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </IconButton>

      {/* Sidebar */}
      <aside
        className={`fixed top-[10%] left-0 h-screen bg-gray-900 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 w-64 md:w-1/5 p-4 z-40 shadow-lg`}
        aria-hidden={!isOpen}
      >
        <div className="flex flex-col space-y-4">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                className="w-full text-left h-10 bg-gray-800 border border-gray-700 rounded-md text-white hover:bg-gray-700 hover:scale-105 transition-all"
                aria-label={item.label}
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default AdminDashboard;
