"use client"
import React, { useState } from 'react'
import { useGetSingleArticalQuery } from '../../../../../redux/features/Artical/ArticalApi';
import Loading from '@/app/Loading';
import Heading from '@/utils/Heading';
import Sidebar from './Lession';
import ArticalContent from './ArticalContent';

type Props = {
    id: string;
};

const ArticalView: React.FC<Props> = ({ id }) => {
    const [subtitleIndex, setSubtitleIndex] = useState(0); // start from 0 instead of 1
    const [subsubtitleIndex, setSubsubtitleIndex] = useState(0); // start from 0 instead of 1
    const [bodySubTitleIndex, setBodySubTitleIndex] = useState(0); // start from 0 instead of 1

    const { data, isLoading } = useGetSingleArticalQuery(id);
    const articalData = data?.article;

    // Handle the case where data is unavailable or incorrect indices are used
    const title = articalData?.subtitles?.[subtitleIndex]?.subsubtitle?.[subsubtitleIndex]?.bodySubtitle?.[bodySubTitleIndex]?.title || "Title not available";
    const description = articalData?.subtitles?.[subtitleIndex]?.subsubtitle?.[subsubtitleIndex]?.bodySubtitle?.[bodySubTitleIndex]?.description || "Description not available";

    return (
        <>
                     <Heading
                            title={title}
                            description={description}
                            keywords='KaranArtical'
                        />
            {isLoading ? (
                <Loading />
            ) : (

    <div className="w-full grid grid-cols-1 md:grid-cols-5 gap-4">

  <div className="md:col-span-1 col-span-full">
    <Sidebar
      articalData={articalData}
      subtitleIndex={subtitleIndex}
      setSubtitleIndex={setSubtitleIndex}
      subsubtitleIndex={subsubtitleIndex}
      setSubsubtitleIndex={setSubsubtitleIndex}
      bodySubTitleIndex={bodySubTitleIndex}
      setBodySubTitleIndex={setBodySubTitleIndex}
    />
  </div>


  <div className="md:col-span-4 col-span-full">
    <ArticalContent
      articalData={articalData}
      subtitleIndex={subtitleIndex}
      setSubtitleIndex={setSubtitleIndex}
      subsubtitleIndex={subsubtitleIndex}
      setSubsubtitleIndex={setSubsubtitleIndex}
      bodySubTitleIndex={bodySubTitleIndex}
      setBodySubTitleIndex={setBodySubTitleIndex}
    />
  </div>
</div>


            )}
        </>
    );
}

export default ArticalView;
