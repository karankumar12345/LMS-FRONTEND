"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";
import { useActivateUserMutation } from "../../../../redux/features/auth/authapi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { user} = useSelector((state: any) => state.auth);
  const [activateUser, { isSuccess,error }] = useActivateUserMutation();
  const [otp, setOtp] = useState(["", "", "", ""]);

  useEffect(() => {
    if (isSuccess) {
      const message =  "Registration Successfully";
      toast.success(message);
      router.push("/");
    }
    if (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorData = error as any;
      toast.error(errorData.data.message);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, error]);

  // Handle OTP input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    if (value.match(/^[0-9]$/)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input if it's not the last one
      if (index < 3 && value) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  // Handle backspace key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const previousInput = document.getElementById(`otp-${index - 1}`);
      previousInput?.focus();
    }
  };

  // Submit OTP
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const otpCode = otp.join("");
    console.log("OTP Submitted:", otpCode);

    // Call the activation API
  
      await activateUser({
        activation_token:user.token,
        activation_code: otpCode,
      });
      
    
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-100 via-purple-200 to-indigo-300">
      <motion.div
        className="max-w-md w-full p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <h2 className="text-center text-xl font-bold text-gray-700 dark:text-gray-200 mb-4">
          Enter the 4-Digit OTP
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
          We&apos;ve sent a verification code to your email.
        </p>
        <form onSubmit={handleSubmit} className="flex justify-center space-x-4 mb-8">
          {otp.map((digit, index) => (
            <motion.div
              key={index}
              whileFocus={{ scale: 1.2, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Input
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center border-2 border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </motion.div>
          ))}
        </form>
        <button
          type="submit"
          onClick={handleSubmit}
          className="block w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition duration-300"
        >
          Verify
        </button>
      </motion.div>
    </div>
  );
};

export default Page;
