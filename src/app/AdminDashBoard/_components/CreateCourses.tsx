/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import AdminSidebar from "@/app/_components/Admin/sidebar/AdminSidebar";
import Heading from "@/utils/Heading";
import React, { useEffect, useState } from "react";
import CourseInfo from "./CourseInfo";
import CourseOption from "./CoursesOption";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import { useCreateCourseMutation } from "../../../../redux/features/courses/coursesapi";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

type Props = {
  isFlag:boolean
};

interface Thumbnail {
  public_id: string;
  url: string;
}

interface CourseInfo {
  name: string;
  description: string;
  price: string;
  estimatedPrice: string;
  tags: string;
  level: string;
  demoUrl: string;
  thumbnail: Thumbnail;
}

interface Link {
  title: string;
  url: string;
}


interface Content {
  id: number; // Unique identifier for the content
  subtitle: string; // Title of the video or content
  videoUrl: string; // URL for the video
  description: string; // Description of the content
  Links: Link[]; // Associated links
}

interface Section {
  title: string; // Title of the section
  description: string; // Description of the section
  components: Content[]; // Array of content within the section
}

const CreateCourses = (props: Props) => {
  const [CreateCourse, { isLoading, isSuccess, error }] = useCreateCourseMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course Created Successfully");
    }
    if (error && "data" in error) {
      const errorData = error as any;
      toast.error(errorData.data.message);
    }
  }, [isLoading, isSuccess, error]);

  const [active, setActive] = useState(0);
  const [courseInfo, setCoursesInfo] = useState<CourseInfo>({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: {
      public_id: "",
      url: "",
    },
  });

  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState<Section[]>([
    {
      title: "", // Initialize with a default section title
      description: "", // Initialize with a default description
      components: [
        {
          id: Date.now(), // Generate a unique ID
          subtitle: "", // Initialize with an empty subtitle
          videoUrl: "", // Initialize with an empty video URL
          description: "", // Initialize with an empty description
          Links: [{ title: "", url: "" }], // Initialize with one empty link
        },
      ],
    },
  ]);
  

  const handleSubmit = () => {
    // Ensure benefits and prerequisites are formatted as arrays of objects
    const formattedBenefits = benefits.map((item) => ({ title: item.title }));
    const formattedPrerequisites = prerequisites.map((item) => ({ title: item.title }));
  
    // Format course content to match the schema
    const formattedCourseContent = courseContentData.map((section) => ({
      title: section.title,
      description: section.description,
      subtitles: section.components.map((content) => ({
        subtitle: content.subtitle,
        description: content.description,
        videoUrl: content.videoUrl,
        videoThumbnail: {}, // Replace with actual thumbnail object if available
        videoLength: 0, // Replace with actual video length if available
        videoPlayer: "YouTube", // Replace with actual video player type if available
        links: content?.Links?.map((link) => ({ title: link.title, url: link.url })),
        suggestions: "karan", // Replace with actual suggestions if available
      })),
      questions: [], // Initialize with an empty array or populate with actual comments if available
    }));
  
    console.log("Formatted Course Content:", formattedCourseContent);
    // Prepare final data object for the API
    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: Number(courseInfo.price),
      estimatedPrice: Number(courseInfo.estimatedPrice),
      tags: courseInfo.tags,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      thumbnail: courseInfo.thumbnail,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseData: formattedCourseContent,
    };
  
    return data;
  };

  
    
  const handleCoursesCreate = async (e: any) => {

    const data = handleSubmit();
    if (!isLoading) {
      await CreateCourse(data);
    }
  };

  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[80%]">
        {active === 0 && (
          <CourseInfo courseInfo={courseInfo} setCourseInfo={setCoursesInfo} active={active} setActive={setActive} />
        )}
        {active === 1 && (
          <CourseData
            benefits={benefits}
            setBenefits={setBenefits}
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 2 && (
          <CourseContent
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            active={active}
            setActive={setActive} handleSubmit={function (e: any): void {
              throw new Error("Function not implemented.");
            } }          />
        )}
        {active === 3 && (
          <CoursePreview courseData={handleSubmit()} active={active} setActive={setActive} handleSubmit={handleCoursesCreate} setCourseData={function (courseData: any): void {
            throw new Error("Function not implemented.");
          } } />
        )}
      </div>

      <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
        <CourseOption active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default CreateCourses;
