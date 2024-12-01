/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

type Props = {
  active: number;
  setActive: (value: number) => void;
  round: any;
  interviewInfo: any;
  handleSubmit: (value: any) => void;
};

const ExperienceView = ({ active, setActive, round, interviewInfo, handleSubmit }: Props) => {
  return (
    <div className="w-full max-w-5xl mx-auto p-6  rounded-lg shadow-md">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-blue-700">{interviewInfo.companyName}</h1>
        <h2 className="text-2xl font-semibold text-gray-700">{interviewInfo.jobPosition}</h2>
        <h3
          className={`mt-2 text-xl font-medium ${
            interviewInfo.finalOutcome === 'Selected'
              ? 'text-green-500'
              : 'text-red-500'
          }`}
        >
          Outcome: {interviewInfo.finalOutcome}
        </h3>
      </div>

      {/* Interview Rounds */}
      <div className="mt-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Interview Rounds</h2>
        {round?.map((subtitle:any, index:number) => (
          <div
            key={index}
            className="mb-6 p-4 border border-gray-300 rounded-lg shadow-sm"
          >
            {/* Round Details */}
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Round {subtitle.roundNumber}: {subtitle.interviewType}
            </h3>
            <p className="text-gray-600 mb-1">
  Date: {subtitle.interviewDate instanceof Date ? subtitle.interviewDate.toLocaleDateString() : subtitle.interviewDate}
</p>

            <p className="text-gray-600 mb-1">Time: {subtitle.roundTime}</p>
            <p className="text-gray-600 mb-1">
              Difficulty: <span className="font-medium">{subtitle.interviewDifficulty}</span>
            </p>
            <p className="text-gray-600 mb-1">Feedback: {subtitle.interviewFeedback}</p>
            <p className="text-gray-600 mb-1">Outcome: {subtitle.outcome}</p>
            <p className="text-gray-600 mb-1">
              Preparation Materials: {subtitle.preparationMaterials}
            </p>
            <p className="text-gray-600 mt-2">Experience: {subtitle.experience}</p>

            {/* Questions */}
            <div className="mt-4">
              <h4 className="text-lg font-semibold text-gray-800">Questions</h4>
              {subtitle.interviewQuestion.map((subSub:any, subIndex:number) => (
                <div key={subIndex} className="mt-4">
                  <h5 className="text-lg font-medium text-gray-700">{subSub.title}</h5>
                  {subSub?.interviewQuestion?.map((body:any, bodyIndex:number) => (
                    <div
                      key={bodyIndex}
                      className="mt-2 p-3 bg-gray-50 border rounded-md shadow-sm"
                    >
                      <h6 className="font-semibold text-gray-800">{body.question}</h6>
                      <p className="text-gray-600">
                        <span className="font-medium">Difficulty:</span> {body.difficulty}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Type:</span> {body.questionType}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Topic:</span> {body.questionTopic}
                      </p>
                      {body.code && (
                        <pre className="p-3 mt-2 bg-gray-100 rounded-md text-sm overflow-x-auto">
                          {body.code}
                        </pre>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => setActive(active - 1)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded"
        >
          Previous
        </button>
        <button
          onClick={() => setActive(active + 1)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Next
        </button>
        <button
          onClick={handleSubmit}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ExperienceView;
