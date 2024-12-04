/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import CoursesPlayer from '@/app/AdminDashBoard/_components/CoursesPlayer'
import Rating from '@/app/AdminDashBoard/_components/Rating'
import { Button } from '@/components/ui/moving-border'
import Link from 'next/link'

import React from 'react'
import { IoCheckmarkDoneOutline, IoCloseOutline } from 'react-icons/io5'

import CourseContentList from './CourseContentList'


import { useLoadUserQuery } from '../../../../redux/features/apislice'
import { useParams } from 'next/navigation'
import { useCreateOrderbyuserMutation } from '../../../../redux/features/courses/coursesapi'
import { useRouter } from 'next/navigation'

type Props = {
  [x: string]: any
  data: any,
  

}

const CoursesPage = ({ data }: Props) => {
const router=useRouter()
  
  const id =useParams()
const {data:userData}=useLoadUserQuery(undefined,{})
const [createOrder] =useCreateOrderbyuserMutation()
const user=userData?.user
 

  const discountPercentage = ((data?.course?.estimatedPrice - data?.course?.price) / data?.course?.estimatedPrice) * 100
  const discountPercentageRounded = discountPercentage ? discountPercentage.toFixed(0) : '0'

  const isPurchased = user?.courses?.some((course: any) => course._id === data?.course?._id)

  const handleOrder =async (e: any) => {
       
    data={
      coursesID:id?.id,
      userId:user?._id
    }
 
    await createOrder(data)

    router.push(`/courses-acess/${data?.course?._id}`)
    

  }

  return (
    <>
    <div className="w-[90%] 800px:w-[90%] m-auto py-5">
      <div className="w-full flex flex-col-reverse 800px:flex-row">
        <div className="800px:w-[65%] w-full 800px:pr-5">
          <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
            {data?.course?.name || "Course Name"}
          </h1>

          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center">
              <Rating rating={data?.course?.ratings || 0} />
              <h5 className="text-black dark:text-white">{data?.course?.reviews?.length || 0} Reviews</h5>
            </div>
            <h5 className="text-black dark:text-white">{data?.course?.purchased || 0} students</h5>
          </div>

          <section>
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              What We Learn from This Course
            </h1>
            <div>
              {data?.course?.benefits?.map((item: any, index: number) => (
                <div key={index} className="w-full flex 800px:items-center py-2">
                  <IoCheckmarkDoneOutline size={20} className="text-black dark:text-white" />
                  <p className="pl-2 text-black dark:text-white">{item.title}</p>
                </div>
              )) || <p>No benefits listed for this course.</p>}

              <br />
              <br />
              <div>
                <h1 className='text-[25px] font-Poppins font-[600] text-black dark:text-white'>Courses Overview</h1>
                <CourseContentList data={data?.course?.courseData} isDemo={true}/>
              </div>
            </div>
          </section>

          <section>
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              Prerequisites for Starting This Course
            </h1>
            <div>
              {data?.course?.prerequisites?.map((item: any, index: number) => (
                <div key={index} className="w-full flex 800px:items-center py-2">
                  <IoCheckmarkDoneOutline size={20} className="text-black dark:text-white" />
                  <p className="pl-2 text-black dark:text-white">{item.title}</p>
                </div>
              )) || <p>No prerequisites listed for this course.</p>}
            </div>
          </section>

          <section>
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">Course Overview</h1>
            <p className="text-black dark:text-white">{data?.course?.description || "No description available."}</p>
          </section>

          <section>
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">Course Ratings</h1>
            <div className="800px:flex items-center">
              <Rating rating={data?.course?.ratings || 0} />
              <h5 className="text-[25px] font-Poppins text-black dark:text-white">
                {(data?.course?.ratings ?? 0).toFixed(2)} Rating{data?.course?.reviews?.length > 1 ? "s" : ""}
              </h5>
            </div>
          </section>

          <section>
            {data?.course?.reviews?.map((item: any, index: number) => (
              <div key={index} className="w-full flex pb-4">
                <div className="flex">
                  <div className="w-[50px] h-[50px] bg-slate-600 rounded-full flex items-center justify-center cursor-pointer">
                    <h1 className="uppercase text-[18px] text-black dark:text-white">
                      {item.user?.name ? item.user.name.slice(0, 2) : 'KA'}
                    </h1>
                  </div>
                  <div className="hidden 800px:block pl-2">
                    <div className="flex items-center">
                      <h5 className="text-[18px] pr-2 text-black dark:text-white">{item.user?.name || "Anonymous"}</h5>
                      <Rating rating={item?.rating || 0} />
                    </div>
                    <p className="text-black dark:text-white">{item?.comment || "No comment provided."}</p>
                  </div>
                </div>
              </div>
            )) || <p>No reviews yet.</p>}
          </section>
        </div>
        
        <div className="w-full 800px:w-[35%] relative">
          <CoursesPlayer videoUrl={data?.course?.demoUrl || ""} title={data?.course?.title || "Course Preview"} />
          <div className="flex items-center">
            <h1 className="pt-5 text-[25px] text-black dark:text-white">
              {data?.course?.price ? `₹${data.course.price}` : 'Free'}{' '}
              {data?.course?.estimatedPrice && (
                <span className="line-through text-[#00000061] dark:text-[#ffffff61]">
                  ₹{data.course.estimatedPrice}
                </span>
              )}{' '}
              {data?.course?.estimatedPrice && (
                <span className="text-[#00cc00]">({discountPercentageRounded}% off)</span>
              )}
            </h1>
          </div>
          <div className='flex items-center'>
            {isPurchased?(
              <Button>
                <Link className = 'inline-block' href={`/courses-acess/${data?.course?._id}`} >
                 Already Access </Link>
                 </Button>

            ):
            (
                <Button  onClick={handleOrder}> Free Access</Button>
            )}
          </div>
          <br />
          <p className="pb-1 text-black dark:text-white"> Source Code Included</p>
          <p className="pb-1 text-black dark:text-white"> Full Life Time Access</p>

          <p className="pb-1 text-black dark:text-white"> Certificate of Completion </p>
          <p className="pb-1 text-black dark:text-white"> Premium Support </p>
        </div>
      </div>
    </div>

    </>

  )
}

export default CoursesPage
