/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"
import React, { useState, useEffect } from "react";
import { SunIcon, MoonIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";

import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import { useLogoutUserMutation } from "../../../redux/features/auth/authapi";


type Props = {
  activeItem: number;
  setActiveItem: (item: number) => void;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
 // add user prop to determine login status (null if not logged in)
};

//take user from a redux

const Header = ({ activeItem, setActiveItem }: Props) => {
    
  
  const [openSidebar, setOpenSidebar] = useState(false);
  const [logoutus]=useLogoutUserMutation()
  const { theme, setTheme, systemTheme } = useTheme(); // use systemTheme to handle OS-based themes
  const [mounted, setMounted] = useState(false); // to ensure correct rendering
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user=useSelector((state:any)=>state.auth)
const {data} =useSession()
console.log(user);
console.log(data)
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  useEffect(() => {
    setMounted(true); // setting mounted to true ensures the component is rendered on the client-side
  }, []);

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const toggleTheme = () => {
    const currentTheme = theme === "system" ? systemTheme : theme;
    setTheme(currentTheme === "light" ? "dark" : "light");
  };

  const isActive = (item: number) => activeItem === item;

  // Close sidebar and set active item
  const handleLinkClick = (item: number) => {
    setActiveItem(item);
    setOpenSidebar(false); // Close sidebar
  };

  // Render nothing while SSR to avoid mismatches
  if (!mounted) return null;
const handleLogout =async()=>{
  await logoutus({}).unwrap()
  
}
  return (
    <header className="w-full bg-gray-800 dark:bg-gray-900 text-white p-4 flex items-center justify-between">
      {/* Logo Section */}
      <div className="text-xl font-bold">My Website</div>

      {/* Navigation Links */}
      <nav className="hidden md:flex space-x-6 items-center">
        <a
          href="/"
          onClick={() => handleLinkClick(1)}
          className={`px-3 py-2 rounded-md ${
            isActive(1) ? "bg-blue-500" : "hover:bg-gray-700"
          } transition-colors duration-300`}
        >
          Home
        </a>
        <a
          href="/about"
          onClick={() => handleLinkClick(2)}
          className={`px-3 py-2 rounded-md ${
            isActive(2) ? "bg-blue-500" : "hover:bg-gray-700"
          } transition-colors duration-300`}
        >
          About
        </a>
        <a
          href="/services"
          onClick={() => handleLinkClick(3)}
          className={`px-3 py-2 rounded-md ${
            isActive(3) ? "bg-blue-500" : "hover:bg-gray-700"
          } transition-colors duration-300`}
        >
          Services
        </a>
        <a
          href="/Contact"
          onClick={() => handleLinkClick(4)}
          className={`px-3 py-2 rounded-md ${
            isActive(4) ? "bg-blue-500" : "hover:bg-gray-700"
          } transition-colors duration-300`}
        >
          Contact
        </a>

        {/* Conditional rendering for User Icon / Login */}
        {user.user ? (
        <div>
          <Avatar
         
        
            className="h-8 w-8  ml-4 cursor-pointer hover:text-blue-400 rounded-full"
            onClick={toggleDropdown}
          />
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48  rounded-md shadow-lg py-2 z-10">
              <a
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-400"
              >
                View Profile
              </a>
        
            </div>
          )}
        </div>
      ) : (
        <a
          href="/login"
          className="px-3 py-2 rounded-md bg-blue-500 hover:bg-blue-400 transition-colors duration-300"
        >
          Login
        </a>
      )}

        {/* Dark/Light Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="ml-4 p-2 rounded-full bg-gray-700 dark:bg-gray-800 hover:bg-gray-600 dark:hover:bg-gray-700 transition-colors duration-300"
        >
          {theme === "light" ||
          (theme === "system" && systemTheme === "light") ? (
            <MoonIcon className="h-6 w-6 text-yellow-500" />
          ) : (
            <SunIcon className="h-6 w-6 text-yellow-300" />
          )}
        </button>
      </nav>

      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden">
        <button onClick={toggleSidebar} className="text-2xl">
          ☰
        </button>
      </div>

      {/* Sidebar (for mobile) */}
      {openSidebar && (
        <div className="fixed top-0 left-0 h-full w-64 bg-gray-900 dark:bg-gray-800 text-white p-6 z-50 overflow-auto">
          <button onClick={toggleSidebar} className="text-2xl mb-4">
            ×
          </button>
          <nav className="flex flex-col space-y-4">
            <a
              href="/"
              onClick={() => handleLinkClick(1)}
              className={`px-3 py-2 rounded-md ${
                isActive(1) ? "bg-blue-500" : "hover:bg-gray-700"
              } transition-colors duration-300`}
            >
              Home
            </a>
            <a
              href="/about"
              onClick={() => handleLinkClick(2)}
              className={`px-3 py-2 rounded-md ${
                isActive(2) ? "bg-blue-500" : "hover:bg-gray-700"
              } transition-colors duration-300`}
            >
              About
            </a>
            <a
              href="/services"
              onClick={() => handleLinkClick(3)}
              className={`px-3 py-2 rounded-md ${
                isActive(3) ? "bg-blue-500" : "hover:bg-gray-700"
              } transition-colors duration-300`}
            >
              Services
            </a>
            <a
              href="/contact"
              onClick={() => handleLinkClick(4)}
              className={`px-3 py-2 rounded-md ${
                isActive(4) ? "bg-blue-500" : "hover:bg-gray-700"
              } transition-colors duration-300`}
            >
              Contact
            </a>
          </nav>

          {/* Conditional rendering for User Icon / Login in Sidebar */}
          {user ? (
            <UserCircleIcon className="h-8 w-8 text-white mt-4 cursor-pointer hover:text-blue-400" />
          ) : (
            <a
              href="/login"
              className="px-3 py-2 mt-4 rounded-md bg-blue-500 hover:bg-blue-400 transition-colors duration-300"
            >
              Login
            </a>
          )}

          {/* Dark/Light Mode Toggle in Sidebar */}
          <button
            onClick={toggleTheme}
            className="mt-4 p-2 rounded-full bg-gray-700 dark:bg-gray-800 hover:bg-gray-600 dark:hover:bg-gray-700 transition-colors duration-300"
          >
            {theme === "light" ||
            (theme === "system" && systemTheme === "light") ? (
              <MoonIcon className="h-6 w-6 text-yellow-500" />
            ) : (
              <SunIcon className="h-6 w-6 text-yellow-300" />
            )}
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
