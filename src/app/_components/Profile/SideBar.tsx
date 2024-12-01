"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaLock, FaBook, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useUpdatePasswordUserMutation, useUpdateProfileAvatarMutation, useUpdateProfileUserMutation } from "../../../../redux/features/auth/authapi";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/moving-border";
import Link from "next/link";
import { Avatar } from "@mui/material";
import { useRouter } from "next/navigation";
import ThemedAllCourses from "./EnroleedCourses";

type Props = {
    user: any; // eslint-disable-line @typescript-eslint/no-explicit-any
};

const SideBar: React.FC<Props> = ({ user }) => {
  
    const router = useRouter();

    const [registerProfile, { isSuccess: isProfileUpdated, error: profileError }] = useUpdateProfileUserMutation();
    const [updateAvatar, { isSuccess: isAvatarUpdated, error: avatarError }] = useUpdateProfileAvatarMutation();
    const [updatePassword, { isSuccess: isPasswordUpdated, error: PasswordError }] = useUpdatePasswordUserMutation();

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [updateError, setUpdateError] = useState("");
    const [name, setName] = useState(user?.user?.name);
    const [email, setEmail] = useState(user?.user?.email);
    const [file, setFile] = useState(user?.user?.avatar?.url);
    const [avatarPreview, setAvatarPreview] = useState(user?.user?.avatar?.url); // Preview for new avatar
    const [activeSection, setActiveSection] = useState<string>("My Account");
    const [isSidebarOpen, setSidebarOpen] = useState(false); // State for mobile sidebar visibility

    useEffect(() => {
        if (isProfileUpdated) {
            toast.success("User information updated successfully");
            setEmail(user.user.email); // Reset email if needed
            setName(user.user.name); // Reset name if needed
        }
        if (profileError) {
            toast.error("Failed to update profile. Please try again.");
        }
        if (isAvatarUpdated) {
            toast.success("Avatar updated successfully");
        }
        if (avatarError) {
            toast.error("Failed to update avatar. Please try again.");
        }
        if (isPasswordUpdated) {
            toast.success("Password updated successfully");
        }
        if (PasswordError) {
            toast.error("Failed to update avatar. Please try again.");
        }
    }, [isProfileUpdated, profileError, isAvatarUpdated, avatarError,PasswordError,isPasswordUpdated]);

    const handleSubmitProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        await registerProfile({ email, name }); // Pass all required fields
    };

    const handleSubmitPassword = async(e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setUpdateError("New password and confirmation do not match.");
            return;
        }
        await updatePassword({ oldPassword, newPassword });
    };

    const renderContent = () => {
        switch (activeSection) {
            case "My Account":
                return (
                    <div className="  shadow-lg rounded-lg">
                        <h2 className="text-2xl font-semibold mb-6 text-center">Update Profile</h2>
                        <form onSubmit={handleSubmitProfile} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-gray-700">Name</label>
                                <input
                                    type="text"
                                    id="name"

                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-auto px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                    required
                                />
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                                >
                                    Update Profile
                                </button>
                            </div>
                        </form>
                    </div>
                );
            case "Change Password":
                return (
                    <div className="max-w-md mx-auto p-8 shadow-lg rounded-lg">
                        <h2 className="text-xl font-semibold mb-6">Change Password</h2>
                        {updateError && <div className="text-red-600 p-3 rounded mb-4">{updateError}</div>}
                        <form onSubmit={handleSubmitPassword} className="space-y-6">
                            <div>
                                <label htmlFor="currentPassword" className="block">Current Password</label>
                                <Input
                                    type="password"
                                    id="currentPassword"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="newPassword" className="block text-gray-700">New Password</Label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="confirmPassword" className="block text-gray-700">Confirm New Password</Label>
                                <Input
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                    required
                                />
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                                >
                                    Change Password
                                </button>
                            </div>
                        </form>
                    </div>
                );
            case "Enrolled Courses":
                return (
                    <div className="w-auto">
                     <ThemedAllCourses/>
                    </div>
                );
     
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <div
        className={`fixed inset-y-0 z-20 w-[250px]  text-white transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:block`}
      >
                <div className="flex flex-col items-center">
                    <h2 className="text-lg font-semibold mb-2">{user.name}</h2>
                    <p className="text-sm">{user.email}</p>
                </div>
                <nav className="mt-10 space-y-4">
                    <Button onClick={() => setActiveSection("My Account")} className={`flex items-center space-x-2 hover:bg-slate-700 p-2 rounded-md ${activeSection === "My Account" ? "bg-slate-700" : ""}`}>
                        <FaUserCircle />
                        <span>My Account</span>
                    </Button>
                    <Button onClick={() => setActiveSection("Change Password")} className={`flex items-center space-x-2 hover:bg-slate-700 p-2 rounded-md ${activeSection === "Change Password" ? "bg-slate-700" : ""}`}>
                        <FaLock />
                        <span>Change Password</span>
                    </Button>
                    <Button onClick={() => setActiveSection("Enrolled Courses")} className={`flex items-center space-x-2 hover:bg-slate-700 p-2 rounded-md ${activeSection === "Enrolled Courses" ? "bg-slate-700" : ""}`}>
                        <FaBook />
                        <span>Enrolled Courses</span>
                    </Button>
                    <Button onClick={() => {
                        setActiveSection("ArticalSection");
                        router.push("/"); // replace with your logout logic
                    }} className={`flex items-center space-x-2 hover:bg-slate-700 p-2 rounded-md`}>
                       
                        <span>Artical Section DB</span>
                    </Button>
                    <Button onClick={() => {
                        setActiveSection("ArticalSection");
                        router.push("/"); // replace with your logout logic
                    }} className={`flex items-center space-x-2 hover:bg-slate-700 p-2 rounded-md`}>
                       
                        <span>InterView Exper DB</span>
                    </Button>
                </nav>
            </div>

            {/* Content area */}
            <div className="ml-0 md:ml-[250px] flex-1 p-6">
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="md:hidden text-lg mb-4"
        >
          {isSidebarOpen ? "Close Menu" : "Open Menu"}
        </button>
                    {renderContent()}
                </div>
            </div>
      
    );
};

export default SideBar;
