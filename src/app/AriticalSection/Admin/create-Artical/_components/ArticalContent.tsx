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
  active:number
  articalContent:any;
  setArticalContent: (content:any) => void;
  setActive: (step: number) => void;
}

const ArticalContent: React.FC<ArticalContentProps> = ({
  articalContent,
  setArticalContent,
  active,setActive
}) => {
  const addSection = () => {
    const newSection: Subtitles = {
      title: "New Section",
     
      subsubtitle: [],
    };
    setArticalContent([...articalContent, newSection]);
  };

  const addSubSubtitle = (sectionIndex: number) => {
    const updatedContent = articalContent.map((section:any, sIndex:number) => {
      if (sIndex === sectionIndex) {
        return {
          ...section,
          subsubtitle: [
            ...section.subsubtitle,
            {
              title: "",
              bodySubtitle: [],
            },
          ],
        };
      }
      return section;
    });
  
    setArticalContent(updatedContent);
  };
  
  const addBodySubtitle = (sectionIndex: number, subSubtitleIndex: number) => {
    const updatedContent = articalContent.map((section:any, sIndex:number) => {
      if (sIndex === sectionIndex) {
        return {
          ...section,
          subsubtitle: section.subsubtitle.map((sub:any, subIndex:number) => {
            if (subIndex === subSubtitleIndex) {
              return {
                ...sub,
                bodySubtitle: [
                  ...sub.bodySubtitle,
                  {
                    title: "",
                    description: "",
                    code: "",
                  },
                ],
              };
            }
            return sub;
          }),
        };
      }
      return section;
    });
  
    setArticalContent(updatedContent);
  };
  


  const handleNext=()=>{
    setActive(active+1)
  }
  const handlePrev=()=>{
setActive(active-1)
  }
  return (
    <>
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Article Content</h2>
      {articalContent.map((section:any, sectionIndex:number) => (
        <div key={sectionIndex} className="mb-6 p-4 border rounded">
          <input
            type="text"
            placeholder="Enter Your Title"
            value={section.title}
            onChange={(e) => {
              const updated = [...articalContent];
              updated[sectionIndex].title = e.target.value;
              setArticalContent(updated);
            }}
            className="w-full mb-2 p-2 border rounded"
          />
          
          {/* SubSubtitle Management */}
          {section.subsubtitle.map((sub:any, subIndex:number) => (
            <div
              key={subIndex}
              className="mb-4 ml-4 p-4 border-l-2 border-gray-300"
            >
              <input
                type="text"
                placeholder="Enter Your SubTitle"
                value={sub.title}
                onChange={(e) => {
                  const updated = [...articalContent];
                  updated[sectionIndex].subsubtitle[subIndex].title =
                    e.target.value;
                  setArticalContent(updated);
                }}
                className="w-full mb-2 p-2 border rounded"
              />
              {/* BodySubtitle Management */}
              {sub.bodySubtitle.map((body:any, bodyIndex:number) => (
                <div key={bodyIndex} className="mb-2 ml-4">
                  <input
                    type="text"
                    placeholder="Enter Your topic name "
                    value={body.title}
                    onChange={(e) => {
                      const updated = [...articalContent];
                      updated[sectionIndex].subsubtitle[subIndex].bodySubtitle[
                        bodyIndex
                      ].title = e.target.value;
                      setArticalContent(updated);
                    }}
                    className="w-full mb-2 p-2 border rounded"
                  />
                  <textarea
                    placeholder="Topic Description"
                    value={body.description}
                    onChange={(e) => {
                      const updated = [...articalContent];
                      updated[sectionIndex].subsubtitle[subIndex].bodySubtitle[
                        bodyIndex
                      ].description = e.target.value;
                      setArticalContent(updated);
                    }}
                    className="w-full mb-2 p-2 border rounded"
                  />
                  <textarea
                    placeholder="Code Or Eg "
                    value={body.code}
                    onChange={(e) => {
                      const updated = [...articalContent];
                      updated[sectionIndex].subsubtitle[subIndex].bodySubtitle[
                        bodyIndex
                      ].code = e.target.value;
                      setArticalContent(updated);
                    }}
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
    <Button onClick={handlePrev}>Prev</Button>
     
    <Button className="" onClick={handleNext}>Next</Button>
    </>
  );
};

export default ArticalContent;
