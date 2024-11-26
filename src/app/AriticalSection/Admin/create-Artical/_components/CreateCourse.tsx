/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import ArticalOptions from "./ArticalOptions";
import ArticalInfo from "./ArticalInfo";
import ArticalContent from "./ArticalContent";
import ArticalView from "./ArticalView"; // Import ArticalView
import { useCreateArticalMutation } from "../../../../../../redux/features/Artical/ArticalApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useLoadUserQuery } from "../../../../../../redux/features/apislice";

type Props = {};
interface ArticalInfo {
  title: string;
  description: string;
  category: string;
  tags: string[];
  thumbnail: any;
  author:string,
  
}

interface BodySubtitleSchema {
  title: string;
  description: string;
  code: string;
}

interface SubSubTitleSchema {
  title: string;
  bodySubtitle: [BodySubtitleSchema];
}

interface Subtitles {
  title: string;
  subsubtitle: [SubSubTitleSchema];
}

const CreateArtical = (props: Props) => {

  const { data: userData } = useLoadUserQuery({});

  console.log(userData)

  const [CreateCourse, { isLoading, isSuccess, error }] = useCreateArticalMutation();

  const [active, setActive] = useState(0);
  const [articlaInfo, setArticalInfo] = useState<ArticalInfo>({
    title: "",
    description: "",
    category: "",
    tags: [],
    author:"",
    thumbnail: {
      public_id: "",
      url: "",
    },
  });

  const [subtitles, setSubtitles] = useState<Subtitles[]>([
    {
      title: "",
      subsubtitle: [
        {
          title: "",
          bodySubtitle: [
            {
              title: "",
              description: "",
              code: "",
            },
          ],
        },
      ],
    },
  ]);


  useEffect(() => {
    if (isSuccess) {
      toast.success("Course Created Successfully");
    }
    if (error && "data" in error) {
      const errorData = error as any;
      toast.error(errorData.data.message);
    }
  }, [isLoading, isSuccess, error]);

  const handleSubmit = async() => {
    const data = {
      title: articlaInfo.title,
      description: articlaInfo.description,
      category: articlaInfo.category,
      tags: articlaInfo.tags,
      thumbnail: articlaInfo.thumbnail,
      author:userData.user.email,
      subtitles: subtitles,
    };
    await CreateCourse(data)
    // Log the article data when submitted
  };

  return (
    <div className="flex w-full min-h-screen">
      {/* Main Content */}
      <div className="w-[84%] px-4">
        {active === 0 && (
          <ArticalInfo
            active={active}
            setActive={setActive}
            articlaInfo={articlaInfo}
            setArticalInfo={setArticalInfo}
          />
        )}
        {active === 1 && (
          <ArticalContent
            active={active}
            setActive={setActive}
            articalContent={subtitles}
            setArticalContent={setSubtitles}
          />
        )}

        {active === 2 && (
          <ArticalView
            active={active}
            setActive={setActive}
            articlaInfo={articlaInfo}
            subtitles={subtitles}
            handleSubmit={handleSubmit}
          />
        )}
      </div>

      {/* Sidebar */}
      <div
        className="w-[16%] h-screen fixed top-0 right-0 shadow-lg"
        style={{ zIndex: 50 }}
      >
        <div className="mt-24">
          <ArticalOptions active={active} setActive={setActive} />
        </div>
      </div>
    </div>
  );
};

export default CreateArtical;
