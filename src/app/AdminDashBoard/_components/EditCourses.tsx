/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";

import CourseInfo from "./CourseInfo";
import CourseOption from "./CoursesOption";
import CourseData from "./CourseData";

import CoursePreview from "./CoursePreview";
import { useGetSingleCoursesQuery, useUpdateCourseMutation } from "../../../../redux/features/courses/coursesapi";
import toast from "react-hot-toast";

import CourseContentEdit from "./CoursesContetData";
import { useParams } from 'react-router-dom';
type Props = {
  isFlag: boolean;
  id:string
};

interface Thumbnail {
  public_id: string;
  url: string;
}

interface CourseInfoData {
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
  videoThumbnail: string;
  videoLength: string | number | readonly string[] | undefined;
  videoPlayer: string | number | readonly string[] | undefined;
  suggestions: string | number | readonly string[] | undefined;
  id: number; // Unique identifier for the content
  subtitle: string; // Title of the video or content
  videoUrl: string; // URL for the video
  description: string; // Description of the content
  links: Link[]; // Associated links
}

interface Section {
  id: number;
  isOpen: any;
  title: string; // Title of the section
  description: string; // Description of the section
  subtitles: Content[]; // Array of content within the section
}
interface RouteParams extends Record<string, string | undefined> {
  id: string; // Type as string if it's always a string
}
const EditCourses: React.FC<Props> = ({isFlag,id}) => {

  

  const { data, isLoading, error } = useGetSingleCoursesQuery(id || "");
  const [UpdateCourses] = useUpdateCourseMutation();

  const [active, setActive] = useState(0);
  const [courseInfo, setCourseInfo] = useState<CourseInfoData>({
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
      title: "Untitled Section",
      description: "Write Description",
      subtitles: [
        {
          id: Date.now(),
          subtitle: "",
          videoUrl: "",
          description: "",
          links: [{ title: "", url: "" }],
          videoLength: undefined,
          videoPlayer: undefined,
          suggestions: undefined,
          videoThumbnail: ""
        },
      ],
      id: 0,
      isOpen: undefined,
    },
  ]);

  useEffect(() => {
    if (data && data.success) {
      const course = data.course;

      setCourseInfo({
        name: course.name,
        description: course.description,
        price: course.price.toString(),
        estimatedPrice: "", // You might want to set this as per your logic
        tags: course.tags,
        level: course.level,
        demoUrl: course.demoUrl,
        thumbnail: course.thumbnail,
      });

      setBenefits(course.benefits || []);
      setPrerequisites(course.prerequisites || []);
      setCourseContentData(course.courseData || []);
    }
  }, [data]);

  const handleSubmit = () => {
    const formattedBenefits = benefits.map((item) => ({ title: item.title }));
    const formattedPrerequisites = prerequisites.map((item) => ({ title: item.title }));

    const formattedCourseContent = courseContentData.map((section) => ({
      title: section.title,
      description: section.description,
      subtitles: section.subtitles.map((content) => ({
        subtitle: content.subtitle,
        description: content.description,
        videoUrl: content.videoUrl,
        videoThumbnail: content.videoThumbnail || {}, // Replace with actual thumbnail if available
        videoLength: content.videoLength || 0, // Ensure video length is set properly
        videoPlayer: content.videoPlayer || "YouTube", // Default to YouTube if not provided
        links: content.links.map((link) => ({ title: link.title, url: link.url })),
        suggestions: content.suggestions || "karan", // Replace with actual suggestions if available
      })),
      questions: [], // Initialize with an empty array or populate if applicable
    }));

    const finalData = {
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

    return finalData;
  };

  const handleCoursesCreate = async (e: any) => {
    const data = handleSubmit();

    if (!isLoading) {
      try {
        await UpdateCourses({id,data});
        toast.success("Course updated successfully!");
      } catch (err) {
        toast.error("Error updating course.");
      }
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
          <CourseContentEdit
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
            handleSubmit={handleCoursesCreate}
            setCourseData={() => {}}
          />
        )}
      </div>

      <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
        <CourseOption active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default EditCourses;
