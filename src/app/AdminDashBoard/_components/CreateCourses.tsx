/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

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

type Props = {
  isFlag: boolean;
};

interface Thumbnail {
  public_id: string;
  url: string;
}

interface CourseInfoType {
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
  id: number;
  subtitle: string;
  videoUrl: string;
  description: string;
 

  Links: Link[];
}

interface Section {
  isOpen: any;
  id: number; // Unique identifier for the section
  title: string;
  description: string;
  components: Content[];
}

const CreateCourses = (props: Props) => {
  const [createCourse, { isLoading, isSuccess, error }] = useCreateCourseMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course Created Successfully");
    }
    if (error && "data" in error) {
      toast.error((error as any).data.message);
    }
  }, [isLoading, isSuccess, error]);

  const [active, setActive] = useState(0);
  const [courseInfo, setCourseInfo] = useState<CourseInfoType>({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: { public_id: "", url: "" },
  });

  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
 const [courseContentData, setCourseContentData] = useState<Section[]>([
  {
    title: "",
    description: "",
    components: [
      {
        id: Date.now(),
        subtitle: "",
        videoUrl: "",
        description: "",
        Links: [{ title: "", url: "" }],
       
      },
    ],
    isOpen: false,
    id: 0
  },
]);

const formatCourseContent = () => {
  return courseContentData.map((section) => ({
    title: section.title,
    description: section.description,
    subtitles: section.components.map((content) => ({
      subtitle: content.subtitle,
      description: content.description,
      videoUrl: content.videoUrl,
      videoThumbnail: {}, // Replace with actual thumbnail
      videoLength: 0, // Replace with actual length
      videoPlayer: "YouTube", // Replace with actual player
      links: content.Links.map((link) => ({ title: link.title, url: link.url })), // Corrected to 'Links'
      suggestions: "karan",
    })),
    questions: [], // Replace if required
  }));
};

  const handleSubmit = () => {
    const formattedBenefits = benefits.map((item) => ({ title: item.title }));
    const formattedPrerequisites = prerequisites.map((item) => ({ title: item.title }));

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
      courseData: formatCourseContent(),
    };

    return data;
  };

  const handleCoursesCreate = async () => {
    try {
      const data = handleSubmit();
      if (!isLoading) {
        await createCourse(data).unwrap();
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create course");
    }
  };

  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[80%]">
        {active === 0 && (
          <CourseInfo
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
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
            setActive={setActive}
          />
        )}
        {active === 3 && (
          <CoursePreview
            courseData={handleSubmit()}
            active={active}
            setActive={setActive}
            handleSubmit={handleCoursesCreate} setCourseData={function (courseData: any): void {
              throw new Error("Function not implemented.");
            } }          />
        )}
      </div>

      <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
        <CourseOption active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default CreateCourses;
