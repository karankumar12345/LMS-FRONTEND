/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard'; // Ensure you have react-copy-to-clipboard installed

type Props = {
  articalData: any;
  subtitleIndex: number;
  setSubtitleIndex: React.Dispatch<React.SetStateAction<number>>;
  subsubtitleIndex: number;
  setSubsubtitleIndex: React.Dispatch<React.SetStateAction<number>>;
  bodySubTitleIndex: number;
  setBodySubTitleIndex: React.Dispatch<React.SetStateAction<number>>;
};

const ArticalContent = ({
  articalData,
  subtitleIndex,
  setSubtitleIndex,
  subsubtitleIndex,
  setSubsubtitleIndex,
  bodySubTitleIndex,
  setBodySubTitleIndex,
}: Props) => {
  const [isCopied, setIsCopied] = useState(false);

  // Get content details based on indices
  const Title=    articalData?.subtitles?.[subtitleIndex]?.subsubtitle?.[subsubtitleIndex].title
  const title =
    articalData?.subtitles?.[subtitleIndex]?.subsubtitle?.[subsubtitleIndex]?.bodySubtitle?.[bodySubTitleIndex]?.title ||
    'Title not available';
  const description =
    articalData?.subtitles?.[subtitleIndex]?.subsubtitle?.[subsubtitleIndex]?.bodySubtitle?.[bodySubTitleIndex]?.description ||
    'Description not available';
  const code =
    articalData?.subtitles?.[subtitleIndex]?.subsubtitle?.[subsubtitleIndex]?.bodySubtitle?.[bodySubTitleIndex]?.code ||
    'Code not available';

  // Handle copy action
  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  };

  return (
    <div className="ml-[10%] mt-[20%] px-8 py-6 bg-white shadow-lg rounded-lg max-w-3xl mx-auto">
      {/* Title and Description */}

      <h1 className='text-4xl font-semibold text-gray-800'>Welcome  Bro {articalData.title} 🥰🥰 </h1>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">{Title}</h1>
        <h2 className="text-3xl font-semibold text-gray-800">{title}</h2>
        <p className="text-lg text-gray-600 mt-2">{description}</p>
      </div>

      {/* Code Section */}
      <div className="bg-gray-100 p-4 rounded-md">
        <h3 className="text-xl font-medium text-gray-800 mb-4">Code Example</h3>
        <pre className="bg-gray-800 text-white p-4 rounded-md overflow-auto">{code}</pre>
        {/* Copy Button */}
        <div className="mt-2 text-right">
          <CopyToClipboard text={code} onCopy={handleCopy}>
            <button
              className={`${
                isCopied ? 'bg-green-500' : 'bg-blue-500'
              } text-white px-4 py-2 rounded-md transition-colors duration-300`}
            >
              {isCopied ? 'Copied!' : 'Copy Code'}
            </button>
          </CopyToClipboard>
        </div>
      </div>
      {/* next and prev button */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => {
            if (bodySubTitleIndex > 0) {
              setBodySubTitleIndex(bodySubTitleIndex - 1);
            } else if (subsubtitleIndex > 0) {
              setSubsubtitleIndex(subsubtitleIndex - 1);
              setBodySubTitleIndex(
                articalData.subtitles[subtitleIndex].subsubtitle[
                  subsubtitleIndex - 1
                ].bodySubtitle.length - 1
              );
            } else if (subtitleIndex > 0) {
              setSubtitleIndex(subtitleIndex - 1);
              setSubsubtitleIndex(
                articalData.subtitles[subtitleIndex - 1].subsubtitle.length - 1
              );
              setBodySubTitleIndex(
                articalData.subtitles[subtitleIndex - 1].subsubtitle[
                  articalData.subtitles[subtitleIndex - 1].subsubtitle.length - 1
                ].bodySubtitle.length - 1
              );
            }
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Previous
        </button>
        <button
          onClick={() => {
            if (
              bodySubTitleIndex <
              articalData.subtitles[subtitleIndex].subsubtitle[
                subsubtitleIndex
              ].bodySubtitle.length -
                1
            ) {
              setBodySubTitleIndex(bodySubTitleIndex + 1);
            } else if (
              subsubtitleIndex <
              articalData.subtitles[subtitleIndex].subsubtitle.length - 1
            ) {
              setSubsubtitleIndex(subsubtitleIndex + 1);
              setBodySubTitleIndex(0);
            } else if (
              subtitleIndex <
              articalData.subtitles.length - 1
            ) {
              setSubtitleIndex(subtitleIndex + 1);
              setSubsubtitleIndex(0);
              setBodySubTitleIndex(0);
            }
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ArticalContent;
