/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

type Props = {
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
  articlaInfo: {
    title: string;
    description: string;
    category: string;
    tags: string[];
    thumbnail: any;
  };
  subtitles: {
    title: string;
    subsubtitle: {
      title: string;
      bodySubtitle: { title: string; description: string; code: string }[];
    }[];
  }[];
  handleSubmit:any
};



const ArticalView = ({
  active,
  setActive,
  articlaInfo,
  subtitles,
  handleSubmit
}: Props) => {


  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold">{articlaInfo.title}</h1>
      <p className="text-lg mt-2">{articlaInfo.description}</p>
      <p className="text-sm mt-1">Category: {articlaInfo.category}</p>
      <p className="text-sm mt-1">Tags : {articlaInfo.tags}</p>
      <div className="mt-4">
        <h2 className="text-2xl font-semibold">Subtitles:</h2>
        {subtitles.map((subtitle, index) => (
          <div key={index} className="mt-2">
            <h3 className="text-xl font-semibold">{subtitle.title}</h3>
            {subtitle.subsubtitle.map((subSub, subIndex) => (
              <div key={subIndex} className="mt-4">
                <h4 className="text-lg font-semibold">{subSub.title}</h4>
                {subSub.bodySubtitle.map((body, bodyIndex) => (
                  <div key={bodyIndex} className="mt-2">
                    <h5 className="font-semibold">{body.title}</h5>
                    <p>{body.description}</p>
                    <pre className=" p-2 mt-2">{body.code}</pre>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Button to go back to editing */}
<div className="grid grid-cols-3 gap-4">
<button
        onClick={() => setActive(active+1)}
        className="mt-6 bg-blue-500  py-2 px-4 rounded"
      >
        next
      </button>
      <button
        onClick={() => setActive(active-1)}
        className="mt-6 bg-blue-500  py-2 px-4 rounded"
      >
        prev
      </button>
      <button
        onClick={handleSubmit}
        className="mt-6 bg-blue-500  py-2 px-4 rounded"
      >
    Submit
      </button>

</div>
    </div>
  );
};

export default ArticalView;
