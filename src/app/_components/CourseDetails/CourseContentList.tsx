/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { BsChevronUp } from 'react-icons/bs';
import { MdOutlineOndemandVideo } from 'react-icons/md';

type Props = {
    data: any[];
    activeVideo?: number;
    setActiveVideo?: (video: number) => void;
    isDemo?: boolean;
};

const CourseContentList = ({ data, activeVideo, setActiveVideo, isDemo }: Props) => {


    const [visibleSections, setVisibleSection] = useState<Set<string>>(
        new Set<string>()
    );

    // Extract unique video sections
    // const videoSections: string[] = [
    //     ...new Set<string>(data?.map((section: any) => section?._id))
    // ];

    const totalCount = 0;
    const toggleSection = (sectionId: string) => {
        const newVisibleSections = new Set(visibleSections);
        if (newVisibleSections.has(sectionId)) {
            newVisibleSections.delete(sectionId);
        } else {
            newVisibleSections.add(sectionId);
        }
        setVisibleSection(newVisibleSections);
    };

    return (
        <div className={`mt-[15px] w-full ${!isDemo ? 'ml-[-30px] min-h-screen sticky top-24 left-0 z-30' : ''}`}>
            {data.map((section: any) => {
                const isSectionVisible = visibleSections.has(section._id);

                // Get subtitles from the section
                const sectionSubtitles = section.subtitles || [];
                const sectionVideoCount = sectionSubtitles.length;

                return (
                    <div className={`${!isDemo && 'border-b border-[#ffffff8e] pb-2'}`} key={section._id}>
                        <div className="w-full flex">
                            <div className='w-full flex justify-between items-center'>
                                <h2 className='w-full flex justify-between items-center'>{section.title}</h2>
                                <button className='mr-4 cursor-pointer text-black dark:text-white' onClick={() => toggleSection(section._id)}>
                                    {isSectionVisible ? (
                                        <BsChevronUp size={20} />
                                    ) : (
                                        <BsChevronUp className='rotate-180' size={20} />
                                    )}
                                </button>
                            </div>
                        </div>
                        <h5 className='text-black dark:text-white '>
                            {sectionVideoCount} Lessons
                        </h5>
                        <br />
                        {isSectionVisible && (
                            <div className='w-full '>
                                {sectionSubtitles.map((item: any, index: number) => (
                                    <div
                                        className={`w-full ${totalCount === activeVideo ? "bg-slate-800" : ""} cursor-pointer transition-all p-2`}
                                        key={item._id}
                                        onClick={() => !isDemo && setActiveVideo?.(totalCount)}
                                    >
                                        <div className='flex item-start'>
                                            <div>
                                                <MdOutlineOndemandVideo size={25} className='mr-2' color='#1cdada'/>
                                            </div>
                                            <h1 className='text-[18px] inline-block break-words text-black dark:text-white'>{item.subtitle}</h1>
                                        </div>
                                        <h5 className='pl-8 text-black dark:text-white'>
                                            {item.videoLength > 60 ? (item.videoLength / 60).toFixed(2) : item.videoLength}{" "}
                                            {item.videoLength > 60 ? "Hours" : "Minutes"}
                                        </h5>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default CourseContentList;
