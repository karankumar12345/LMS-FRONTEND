/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import CoursesPlayer from "./CoursesPlayer";
import { Button } from "@/components/ui/moving-border";
import { Input } from "@/components/ui/input";
import Rating from "./Rating";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

type Props = {
  courseData: any;
  setCourseData: (courseData: any) => void;
  active: number;
  setActive: (active: number) => void;
  handleSubmit:any
};


const CoursePreview = ({
  courseData,
  setCourseData,
  active,
  setActive,
  handleSubmit,
}: Props) => {
  const prevButton=()=>{
    setActive(active-1);
  }
  const CreateCourse =()=>{
    handleSubmit()
  }
  const discountPercentage =
    ((courseData?.estimatedPrice - courseData?.price) * 100) /
    courseData?.estimatedPrice;
  const discountPercentagePrice = discountPercentage.toFixed(0);
  return (
    <>
      <div className="w-[55%] ml-[15%] mt-24">
        <div className="w-full relative">
          <div className="w-full mt-10">
            <CoursesPlayer
              videoUrl={courseData?.demoUrl}
              title={courseData?.title}
            />
          </div>
          <div className="flex items-center">
            <h1 className="pt-5 text-[25px]">
              {courseData?.price === 0 ? "FREE" : courseData?.price + "$"}
            </h1>
            <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80">
              {courseData?.estimatedPrice}$
            </h5>
            <h4 className="pl-5 pt-4 text-[22px]">{discountPercentagePrice}</h4>
          </div>

          <div className="flex items-center">
            <Button>Buy Now {courseData?.price}</Button>
          </div>

          <div className="flex items-center">
            <Input
              type="text"
              name=""
              id=""
              placeholder="Discount Coupon"
              className="1500px:!w-[50%] "
            />
            <div className="w-[100px] ml-4">
              <Button>Apply</Button>
            </div>
          </div>
          <p className="pb-1">Source Code included</p>
          <p className="pb-1">Full Lifetime Access</p>
          <p className="pb-1">Certificate of Completion</p>
          <p className="pb-1">Premium Support</p>
        </div>
        <div className="w-full">
          <div className="w-full 800px:pr-5">
            <h1 className="text-25px font-Poppins font-[600]">
              {courseData?.name}
            </h1>
            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center">
                <Rating rating={0} />
                <h5>0 Rating</h5>
              </div>
              <h5>O Student</h5>
            </div>
            <br />
            <h1 className="text-[25px] font-Poppins font-[600]">
              What You Will Learn From This Courses?
            </h1>
          </div>
          {courseData.benefits?.map((item: any, index: number) => {
            <div className="w-full flex 800px:items-center py-2" key={index}>
              <div className="w-[15px] mr-1">
                <IoCheckmarkDoneOutline size={20} />
              </div>
              <p className="pl-2">{item.title}</p>
            </div>;
          })}

          <br />
          <br />
             <h1 className="text-[25px] font-Poppins font-[600]">
              What are the prerequisites for starting this course?
             </h1>
             {courseData?.prerequisites?.map((item: any, index: number) => {
            <div className="w-full flex 800px:items-center py-2" key={index}>
              <div className="w-[15px] mr-1">
                <IoCheckmarkDoneOutline size={20} />
              </div>
              <p className="pl-2">{item.title}</p>
            </div>;
          })
          }
          <br />
          <br />

          <div className="w-full">
            <h1 className="text-[25px] font-Poppins font-[600]">
              Course Details
            </h1>
            {courseData?.description}
          </div>

<div className="w-full flex items-center justify-between">

  <div className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] mt-8 cursor-pointer" onClick={()=>prevButton()}> Prev </div>
  <div className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] mt-8 cursor-pointer" onClick={()=>CreateCourse()}> Next </div>
</div>

        </div>
      </div>
    </>
  );
};

export default CoursePreview;
