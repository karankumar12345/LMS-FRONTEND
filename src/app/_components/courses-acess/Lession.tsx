/* eslint-disable @typescript-eslint/no-explicit-any */
import { VideoIcon } from '@radix-ui/react-icons';
import React, { useState } from 'react';

// Define the data structure for the Subtitle and CourseSection interfaces

interface Subtitle {
  subtitle: string;
  description: string;
  videoUrl: string;
  videoLength: number;
  videoPlayer: string;
  links: any[];
  suggestions: string;
  _id: string;
}

interface CourseSection {
  title: string; // This will be the title of the section
  description: string;
  subtitles: Subtitle[];
  questions: any[];
  _id: string;
}

interface CoursesData {
  courseData: CourseSection[];
}

// Update props to include state setters
export const CourseSections: React.FC<{
  data: CoursesData;
  setActiveVideo: React.Dispatch<React.SetStateAction<number>>;
  setActiveSubtitle: React.Dispatch<React.SetStateAction<number>>;
  setActiveSection: React.Dispatch<React.SetStateAction<number>>;
}> = ({ data, setActiveVideo, setActiveSubtitle, setActiveSection }) => {
  const [expandedSectionIndex, setExpandedSectionIndex] = useState<number | null>(null);
  const [expandedSubtitleIndex, setExpandedSubtitleIndex] = useState<number | null>(null);

  const handleSectionToggle = (index: number) => {
    setExpandedSectionIndex(expandedSectionIndex === index ? null : index);
    setExpandedSubtitleIndex(null); // Reset subtitle index when section toggled
  };

  const handleSubtitleToggle = (sectionIndex: number, subtitleIndex: number) => {
    setExpandedSubtitleIndex(expandedSubtitleIndex === subtitleIndex ? null : subtitleIndex);
    setActiveSubtitle(subtitleIndex); // Set the active subtitle
    setActiveSection(sectionIndex); // Set the active section
    setActiveVideo(subtitleIndex); // Set the active video to match the clicked subtitle
  };

  return (
    <div style={{ padding: '20px' }}>
      {data?.courseData?.map((section, sectionIndex) => {
        // Calculate the total number of links in the section
        const totalSubtitlesCount = section.subtitles.length;
   
        return (
          <div
            key={section._id}
            style={{
              borderBottom: '1px solid #333',
              padding: '15px 0',
              cursor: 'pointer',
            }}
          >
            <div onClick={() => handleSectionToggle(sectionIndex)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: '0', fontSize: '18px' }}>{section.title}</h3>
                <p style={{ margin: '5px 0', fontSize: '14px', color: '#b3b3b3' }}>
                  {totalSubtitlesCount} Lession
                </p>
              </div>
              <span style={{ transform: expandedSectionIndex === sectionIndex ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s' }}>
                ▼
              </span>
            </div>
            {expandedSectionIndex === sectionIndex && (
              <div style={{ marginTop: '10px', paddingLeft: '20px' }}>
                {section.subtitles.map((subtitle, subtitleIndex) => (
                  <div key={subtitle._id}>
                  <div
  onClick={() => handleSubtitleToggle(sectionIndex, subtitleIndex)}
  style={{
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5px 0',
    borderTop: '1px solid #444',
    alignItems: 'center',
    cursor: 'pointer',
  }}
>
  <div style={{ display: 'flex', alignItems: 'center' }}>

    <h4 style={{ margin: '0', fontSize: '16px', display: 'flex', alignItems: 'center' }}>
      <VideoIcon style={{ marginRight: '5px' }} /> 
      {subtitle.subtitle}
    </h4>
  </div>
</div>

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
