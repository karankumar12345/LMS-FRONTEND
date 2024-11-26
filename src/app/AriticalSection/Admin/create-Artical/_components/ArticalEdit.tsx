/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/moving-border";
import React from "react";

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

interface ArticalContentProps {
  active: number;
  articalContent: Subtitles[];
  setArticalContent: (content: Subtitles[]) => void;
  setActive: (step: number) => void;
}

const ArticalContentEdit: React.FC<ArticalContentProps> = ({
  articalContent,
  setArticalContent,
  active,
  setActive,
}) => {
  const addSection = () => {
    const newSection: Subtitles = {
      title: "New Section",
      subsubtitle: [],
    };
    setArticalContent([...articalContent, newSection]);
  };

  const addSubSubtitle = (sectionIndex: number) => {
    const updatedContent = structuredClone(articalContent); // Deep copy
    const newSubSubTitle: SubSubTitleSchema = {
      title: "",
      bodySubtitle: [],
    };
    updatedContent[sectionIndex].subsubtitle.push(newSubSubTitle);
    setArticalContent(updatedContent);
  };

  const addBodySubtitle = (sectionIndex: number, subSubtitleIndex: number) => {
    const updatedContent = structuredClone(articalContent); // Deep copy
    const newBodySubtitle: BodySubtitleSchema = {
      title: "",
      description: "",
      code: "",
    };
    updatedContent[sectionIndex].subsubtitle[subSubtitleIndex].bodySubtitle.push(newBodySubtitle);
    setArticalContent(updatedContent);
  };

  const handleNext = () => {
    setActive(active + 1);
  };

  const handlePrev = () => {
    setActive(active - 1);
  };

  const handleInputChange = (
    sectionIndex: number,
    subIndex: number | null,
    bodyIndex: number | null,
    field: keyof BodySubtitleSchema | "title",
    value: string
  ) => {
    const updatedContent = structuredClone(articalContent); // Deep copy
    if (subIndex === null && bodyIndex === null) {
      updatedContent[sectionIndex][field as "title"] = value; // Update section title
    } else if (bodyIndex === null) {
      updatedContent[sectionIndex].subsubtitle[subIndex!][field as "title"] = value; // Update subsubtitle title
    } else {
      updatedContent[sectionIndex].subsubtitle[subIndex!].bodySubtitle[bodyIndex!][
        field as keyof BodySubtitleSchema
      ] = value; // Update bodySubtitle field
    }
    setArticalContent(updatedContent);
  };

  return (
    <>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Article Content</h2>
        {articalContent.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-6 p-4 border rounded">
            <input
              type="text"
              placeholder="Enter Section Title"
              value={section.title}
              onChange={(e) =>
                handleInputChange(sectionIndex, null, null, "title", e.target.value)
              }
              className="w-full mb-2 p-2 border rounded"
            />

            {section.subsubtitle.map((sub, subIndex) => (
              <div
                key={subIndex}
                className="mb-4 ml-4 p-4 border-l-2 border-gray-300"
              >
                <input
                  type="text"
                  placeholder="Enter Subtitle Title"
                  value={sub.title}
                  onChange={(e) =>
                    handleInputChange(sectionIndex, subIndex, null, "title", e.target.value)
                  }
                  className="w-full mb-2 p-2 border rounded"
                />

                {sub.bodySubtitle.map((body, bodyIndex) => (
                  <div key={bodyIndex} className="mb-2 ml-4">
                    <input
                      type="text"
                      placeholder="Enter Topic Title"
                      value={body.title}
                      onChange={(e) =>
                        handleInputChange(
                          sectionIndex,
                          subIndex,
                          bodyIndex,
                          "title",
                          e.target.value
                        )
                      }
                      className="w-full mb-2 p-2 border rounded"
                    />
                    <textarea
                      placeholder="Enter Description"
                      value={body.description}
                      onChange={(e) =>
                        handleInputChange(
                          sectionIndex,
                          subIndex,
                          bodyIndex,
                          "description",
                          e.target.value
                        )
                      }
                      className="w-full mb-2 p-2 border rounded"
                    />
                    <textarea
                      placeholder="Enter Code or Example"
                      value={body.code}
                      onChange={(e) =>
                        handleInputChange(
                          sectionIndex,
                          subIndex,
                          bodyIndex,
                          "code",
                          e.target.value
                        )
                      }
                      className="w-full p-2 border rounded"
                    />
                  </div>
                ))}
                <button
                  className="text-blue-500"
                  onClick={() => addBodySubtitle(sectionIndex, subIndex)}
                >
                  Add BodySubtitle
                </button>
              </div>
            ))}
            <button
              className="text-blue-500 mb-2"
              onClick={() => addSubSubtitle(sectionIndex)}
            >
              Add SubSubtitle
            </button>
          </div>
        ))}
        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={addSection}
        >
          Add Section
        </button>
      </div>
      <div className="flex justify-between mt-4">
        <Button onClick={handlePrev}>Prev</Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </>
  );
};

export default ArticalContentEdit;
