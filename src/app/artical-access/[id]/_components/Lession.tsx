/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { FaChevronDown, FaChevronRight, FaBars, FaTimes } from "react-icons/fa";

type SidebarProps = {
  articalData: any; // Replace `any` with the specific structure of `articalData`
  subtitleIndex: number;
  setSubtitleIndex: React.Dispatch<React.SetStateAction<number>>;
  subsubtitleIndex: number;
  setSubsubtitleIndex: React.Dispatch<React.SetStateAction<number>>;
  bodySubTitleIndex: number;
  setBodySubTitleIndex: React.Dispatch<React.SetStateAction<number>>;
};

const Sidebar: React.FC<SidebarProps> = ({
  articalData,
  subtitleIndex,
  setSubtitleIndex,
  subsubtitleIndex,
  setSubsubtitleIndex,
  bodySubTitleIndex,
  setBodySubTitleIndex,
}) => {
  const [expandedSubtitles, setExpandedSubtitles] = useState<Record<number, boolean>>({});
  const [expandedSubSubtitles, setExpandedSubSubtitles] = useState<Record<number, boolean>>({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Controls sidebar visibility on mobile

  const toggleSubtitle = (subIndex: number) => {
    setExpandedSubtitles((prev) => ({
      ...prev,
      [subIndex]: !prev[subIndex],
    }));
  };

  const toggleSubSubtitle = (subSubIndex: number) => {
    setExpandedSubSubtitles((prev) => ({
      ...prev,
      [subSubIndex]: !prev[subSubIndex],
    }));
  };

  return (
    <div>
      {/* Menu Icon for Mobile */}
      <div className="md:hidden p-4">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-white text-2xl focus:outline-none"
        >
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={` bg-gray-800 h-screen p-4 overflow-y-auto transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:w-64`}
      >
        <div className="text-2xl text-red-500 font-bold mb-6">
          {articalData?.title || "Main Title"}
        </div>
        <ul className="space-y-4">
          {articalData?.subtitles?.map((subtitle: any, subIndex: number) => (
            <li key={subIndex}>
              <div
                onClick={() => {
                  setSubtitleIndex(subIndex);
                  toggleSubtitle(subIndex); // Toggle subtitle section
                  setSubsubtitleIndex(0); // Reset subsubtitle index
                  setBodySubTitleIndex(0); // Reset body index
                }}
                className={`flex items-center justify-between cursor-pointer p-2 rounded ${
                  subtitleIndex === subIndex ? "bg-red-500 text-white" : "text-gray-200 hover:bg-gray-700"
                }`}
              >
                <span>{subtitle.title}</span>
                {expandedSubtitles[subIndex] ? (
                  <FaChevronDown className="text-sm" />
                ) : (
                  <FaChevronRight className="text-sm" />
                )}
              </div>
              {expandedSubtitles[subIndex] && (
                <ul className="pl-6 mt-2 space-y-2">
                  {subtitle?.subsubtitle?.map((sub: any, subSubIndex: number) => (
                    <li key={subSubIndex}>
                      <div
                        onClick={() => {
                          setSubsubtitleIndex(subSubIndex);
                          toggleSubSubtitle(subSubIndex); // Toggle subsubtitle section
                          setBodySubTitleIndex(0); // Reset body index
                        }}
                        className={`flex items-center justify-between cursor-pointer p-2 rounded ${
                          subsubtitleIndex === subSubIndex
                            ? "bg-red-400 text-white"
                            : "text-gray-200 hover:bg-gray-700"
                        }`}
                      >
                        <span>{sub.title}</span>
                        {expandedSubSubtitles[subSubIndex] ? (
                          <FaChevronDown className="text-sm" />
                        ) : (
                          <FaChevronRight className="text-sm" />
                        )}
                      </div>
                      {expandedSubSubtitles[subSubIndex] && (
                        <ul className="pl-6 mt-2 space-y-1">
                          {sub?.bodySubtitle?.map((body: any, bodyIndex: number) => (
                            <li key={bodyIndex}>
                              <div
                                onClick={() => setBodySubTitleIndex(bodyIndex)}
                                className={`cursor-pointer p-2 rounded ${
                                  bodySubTitleIndex === bodyIndex
                                    ? "bg-red-300 text-black"
                                    : "text-gray-200 hover:bg-gray-700"
                                }`}
                              >
                                {body.title}
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
