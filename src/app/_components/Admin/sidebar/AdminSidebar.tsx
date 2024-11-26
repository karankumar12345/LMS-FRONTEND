
"use client"
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";  // Importing icons

const AdminSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const links = [
    { name: "Dashboard", path: "/AdminDashBoard" },
    { name: "Users", path: "/AdminDashBoard/users" },
    { name: "Courses", path: "/AdminDashBoard/courses" },
    { name: "createCourses", path: "/AdminDashBoard/create-course" },
 
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-gray-800 text-white transition-width duration-300 ease-in-out h-screen fixed md:relative flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {isSidebarOpen && (
            <h2 className="text-2xl font-bold">Admin Panel</h2>
          )}
          <button
            onClick={toggleSidebar}
            className="text-2xl md:hidden block p-2 hover:bg-gray-700 rounded"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-grow">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.path}
              className="block py-2.5 px-4 hover:bg-gray-700"
            >
              {isSidebarOpen ? link.name : link.name[0]}
            </a>
          ))}
        </nav>

       
      </div>

     
    </div>
  );
};

export default AdminSidebar;
