/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ArticalInfo from "./ArticalInfo";
import ArticalContentEdit from "./ArticalEdit";
import ArticalView from "./ArticalView";
import {
  useGetSingleArticalQuery,
  useUpdateArticalMutation,
} from "../../../../../../redux/features/Artical/ArticalApi";
import ArticalOptions from "./ArticalOptions";

type Props = {};

interface Thumbnail {
  public_id: string;
  url: string;
}

interface ArticalInfo {
  title: string;
  description: string;
  category: string;
  tags: string[];
  thumbnail: Thumbnail;
  author: string;
}

interface BodySubtitleSchema {
  title: string;
  description: string;
  code: string;
}

interface SubSubTitleSchema {
  title: string;
  bodySubtitle: BodySubtitleSchema[];
}

interface Subtitles {
  title: string;
  subsubtitle: SubSubTitleSchema[];
}

const EditArtical: React.FC<Props> = ({}) => {

  const  id  = useParams();
  
  
  const { data, isLoading, error } = useGetSingleArticalQuery(id?.id || "");
  const [updateArtical] = useUpdateArticalMutation();

  const [active, setActive] = useState(0);
  const [articleInfo, setArticleInfo] = useState<ArticalInfo>({
    title: "",
    description: "",
    category: "",
    tags: [],
    author: "",
    thumbnail: {
      public_id: "",
      url: "",
    },
  });

  const [subtitles, setSubtitles] = useState<Subtitles[]>([]);

  useEffect(() => {
    if (data?.success) {
      const article = data.article;
      setArticleInfo({
        title: article.title || "",
        description: article.description || "",
        category: article.category || "",
        tags: article.tags || [],
        thumbnail: article.thumbnail || { public_id: "", url: "" },
        author: article.author || "",
      });
      setSubtitles(article.subtitles || []);
    }
  }, [data]);

  const handleSubmit = async () => {
    const payload = {
      title: articleInfo.title,
      description: articleInfo.description,
      category: articleInfo.category,
      tags: articleInfo.tags,
      thumbnail: articleInfo.thumbnail,
      author: articleInfo.author,
      subtitles,
    };

    try {
        await updateArtical({ id:id?.id, data: payload }).unwrap();
      alert("Article updated successfully!");
    } catch (err: any) {
      console.error("Failed to update article:", err);
      alert("An error occurred while updating the article.");
    }
  };

  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[80%]">
        {active === 0 && (
          <ArticalInfo
            active={active}
            setActive={setActive}
            articlaInfo={articleInfo}
            setArticalInfo={setArticleInfo}
          />
        )}
        {active === 1 && (
          <ArticalContentEdit
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
            articlaInfo={articleInfo}
            subtitles={subtitles}
            handleSubmit={handleSubmit}
          />
        )}
      </div>

      <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
        <ArticalOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default EditArtical;
