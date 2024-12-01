/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Button, IconButton } from '@mui/material';
import React, { useState } from 'react';

import Link from 'next/link';

type Props = {};

const navItems = [
  { label: "Add Interview Experience", href: "/interviewexperience/Add-interview-exp" },
  { label: "ALL Interview Experience", href: "/interviewexperience/All-interview-experience" }
];

const InterviewExperienceDashBoard = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
   

      {/* Sidebar */}
      <aside
        className={`fixed top-[8%] left-0 h-screen bg-gray-900 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 w-64 md:w-1/5 p-4 z-40 shadow-lg`}
        aria-hidden={!isOpen}
      >
        <div className="flex flex-col space-y-4 gap-4">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                className="w-full text-left h-auto bg-gray-800 border border-gray-700 rounded-md text-white hover:bg-gray-700 hover:scale-105 transition-all gap-4"
                aria-label={item.label}
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </div>
      </aside>

      
   {/* Add this line to ensure content doesn't overlap sidebar */}
    </div>
  );
};

export default InterviewExperienceDashBoard;
