/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/moving-border";
import React from "react";

interface Link {
  title: string;
  url: string;
}

interface Content {
  id: number;
  subtitle: string;
  videoUrl: string;
  description: string;


  Links: Link[];
}

interface Section {
  isOpen: any;
  id: number; // Unique identifier for the section
  title: string;
  description: string;
  components: Content[];
}

type Props = {
  courseContentData: Section[];
  setCourseContentData: React.Dispatch<React.SetStateAction<Section[]>>;
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
};

const CourseContent: React.FC<Props> = ({
  courseContentData,
  setCourseContentData,
  active,
  setActive,
}) => {
  const handleAddSection = () => {
    const newSection: Section = {
      id: Date.now(),
      title: "",
      description: "",
      components: [],
      isOpen: undefined
    };
    setCourseContentData([...courseContentData, newSection]);
  };

  const handleDeleteSection = (sectionId: number) => {
    setCourseContentData(
      courseContentData.filter((section) => section.id !== sectionId)
    );
  };

  const handleAddContent = (sectionId: number) => {
    const newContent: Content = {
      id: Date.now(),
      subtitle: "",
      videoUrl: "",
      description: "",
      Links: [{ title: "", url: "" }],
      
    };

    setCourseContentData(
      courseContentData.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              components: [...section.components, newContent],
            }
          : section
      )
    );
  };

  const handleDeleteContent = (sectionId: number, contentId: number) => {
    setCourseContentData(
      courseContentData.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              components: section.components.filter(
                (content) => content.id !== contentId
              ),
            }
          : section
      )
    );
  };

  const handleAddLink = (sectionId: number, contentId: number) => {
    setCourseContentData(
      courseContentData.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              components: section.components.map((content) =>
                content.id === contentId
                  ? {
                      ...content,
                      Links: [...content.Links, { title: "", url: "" }],
                    }
                  : content
              ),
            }
          : section
      )
    );
  };

  const handleDeleteLink = (
    sectionId: number,
    contentId: number,
    linkIndex: number
  ) => {
    setCourseContentData(
      courseContentData.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              components: section.components.map((content) =>
                content.id === contentId
                  ? {
                      ...content,
                      Links: content.Links.filter(
                        (_, index) => index !== linkIndex
                      ),
                    }
                  : content
              ),
            }
          : section
      )
    );
  };

  const handleToggleSection = (sectionId: number) => {
    setCourseContentData(
      courseContentData.map((section) =>
        section.id === sectionId
          ? { ...section, isOpen: !section.isOpen }
          : section
      )
    );
  };

  return (
    <div className="w-[55%] ml-[15%] mt-24">
      <h2 className="text-2xl font-bold mb-4">Course Content</h2>

      <div className="space-y-4">
        {courseContentData.map((section) => (
          <div
            key={section.id}
            className="border border-gray-300 rounded-lg p-4"
          >
            <div className="flex justify-between items-center">
              <div>
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) =>
                    setCourseContentData(
                      courseContentData.map((s) =>
                        s.id === section.id ? { ...s, title: e.target.value } : s
                      )
                    )
                  }
                  placeholder="Section Title"
                  className="text-xl font-semibold border rounded p-2 w-full mb-2"
                />
                <textarea
                  value={section.description}
                  onChange={(e) =>
                    setCourseContentData(
                      courseContentData.map((s) =>
                        s.id === section.id
                          ? { ...s, description: e.target.value }
                          : s
                      )
                    )
                  }
                  placeholder="Section Description"
                  className="border rounded p-2 w-full mb-2"
                />
              </div>
              <button
                onClick={() => handleDeleteSection(section.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete Section
              </button>
            </div>

            <button
              onClick={() => handleToggleSection(section.id)}
              className="text-blue-500 hover:text-blue-700"
            >
              {section.isOpen ? "Collapse" : "Expand"}
            </button>

            {section.isOpen && (
              <div className="ml-4 mt-4 space-y-4">
                {section.components.map((content) => (
                  <div key={content.id} className="border p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <input
                        type="text"
                        value={content.subtitle}
                        onChange={(e) =>
                          setCourseContentData(
                            courseContentData.map((s) =>
                              s.id === section.id
                                ? {
                                    ...s,
                                    components: s.components.map((c) =>
                                      c.id === content.id
                                        ? { ...c, subtitle: e.target.value }
                                        : c
                                    ),
                                  }
                                : s
                            )
                          )
                        }
                        placeholder="Content Subtitle"
                        className="text-lg font-medium border rounded p-2 w-full mb-2"
                      />
                      <button
                        onClick={() =>
                          handleDeleteContent(section.id, content.id)
                        }
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete Content
                      </button>
                    </div>
                    <textarea
                      value={content.description}
                      onChange={(e) =>
                        setCourseContentData(
                          courseContentData.map((s) =>
                            s.id === section.id
                              ? {
                                  ...s,
                                  components: s.components.map((c) =>
                                    c.id === content.id
                                      ? { ...c, description: e.target.value }
                                      : c
                                  ),
                                }
                              : s
                          )
                        )
                      }
                      placeholder="Content Description"
                      className="border rounded p-2 w-full mb-2"
                    />
                    <input
                      type="text"
                      value={content.videoUrl}
                      onChange={(e) =>
                        setCourseContentData(
                          courseContentData.map((s) =>
                            s.id === section.id
                              ? {
                                  ...s,
                                  components: s.components.map((c) =>
                                    c.id === content.id
                                      ? { ...c, videoUrl: e.target.value }
                                      : c
                                  ),
                                }
                              : s
                          )
                        )
                      }
                      placeholder="Video URL"
                      className="border rounded p-2 w-full mb-2"
                    />
              
            
                    {content.Links.map((link, index) => (
                      <div key={index} className="flex space-x-2 mb-2">
                        <input
                          type="text"
                          value={link.title}
                          onChange={(e) =>
                            setCourseContentData(
                              courseContentData.map((s) =>
                                s.id === section.id
                                  ? {
                                      ...s,
                                      components: s.components.map((c) =>
                                        c.id === content.id
                                          ? {
                                              ...c,
                                              Links: c.Links.map((l, i) =>
                                                i === index
                                                  ? { ...l, title: e.target.value }
                                                  : l
                                              ),
                                            }
                                          : c
                                      ),
                                    }
                                  : s
                              )
                            )
                          }
                          placeholder="Link Title"
                          className="border rounded p-2 w-1/2"
                        />
                        <input
                          type="text"
                          value={link.url}
                          onChange={(e) =>
                            setCourseContentData(
                              courseContentData.map((s) =>
                                s.id === section.id
                                  ? {
                                      ...s,
                                      components: s.components.map((c) =>
                                        c.id === content.id
                                          ? {
                                              ...c,
                                              Links: c.Links.map((l, i) =>
                                                i === index
                                                  ? { ...l, url: e.target.value }
                                                  : l
                                              ),
                                            }
                                          : c
                                      ),
                                    }
                                  : s
                              )
                            )
                          }
                          placeholder="Link URL"
                          className="border rounded p-2 w-1/2"
                        />
                        <button
                          onClick={() =>
                            handleDeleteLink(section.id, content.id, index)
                          }
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete Link
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => handleAddLink(section.id, content.id)}
                      className="text-green-500 hover:text-green-700"
                    >
                      Add Link
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => handleAddContent(section.id)}
                  className="text-green-500 hover:text-green-700"
                >
                  Add Content
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleAddSection}
        className="mt-4 text-blue-500 hover:text-blue-700"
      >
        Add Section
      </button>


      <div className="mt-8 flex justify-between">
<Button onClick={() => setActive(active - 1)} >
        Prev
      </Button>
      <Button onClick={() => setActive(active + 1)} >
        Next
      </Button>
</div>
    </div>
  );
};

export default CourseContent;
