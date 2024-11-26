import StudentList from "@/components/AnimatedTooltip";
import { MovingBorderDemo } from "@/components/border-moving";
import Link from "next/link";

import React from "react";

const Hero: React.FC = () => {
  return (
    <section className=" text-white min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Crack the Code to Success with ELearning 
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Elevate your programming skills, and unlock the world of coding possibilities.
        </p>
        <div className="flex flex-wrap justify-center space-x-4 mb-6">
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full">
            View Courses
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-full">
            Watch Video <span className="text-sm text-gray-300 ml-2">Live →</span>
          </button>
        </div>
        <div className="flex justify-center items-center mb-8">
          <div className="flex space-x-2">
            {/* Icons representing students, using avatars */}
         <StudentList/>
          </div>
          <p className="text-lg ml-4">70,000+ Happy Students</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mt-8">

  <Link href="/interview-practice">
    <MovingBorderDemo text="Interview Practice" />
  </Link>
  <Link href="/Articles">
    <MovingBorderDemo text="Article" />
  </Link>
  <Link href="/interviewexperience/Add-interview-exp">
    <MovingBorderDemo text="AddInterviewExper" />
  </Link>
  <Link href="/interviewExper">
    <MovingBorderDemo text="Interview Experience" />
  </Link>
  <Link href="/AriticalSection/admin">
    <MovingBorderDemo text="Artical Section DashBoard" />
  </Link>
</div>

    </section>
  );
};



export default Hero;