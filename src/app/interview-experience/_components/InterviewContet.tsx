/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

type Props = {
    interviewData: any;
};

const InterviewContet: React.FC<Props> = ({ interviewData }) => {
    return (
        <div className="w-full mt-10 px-4">
            {/* Company Name and Job Position */}
            <h1 className="text-3xl font-semibold text-gray-800">{interviewData?.companyName}</h1>
            <h2 className="text-xl text-gray-600 mt-2">{interviewData?.jobPosition}</h2>

            {/* Interview Rounds */}
            {interviewData?.rounds?.map((round: any, index: number) => (
                <div key={round._id} className="mt-8 border-t pt-4">
                    <h3 className="text-2xl font-semibold text-gray-800">Round {round?.roundNumber}</h3>
                    <p className="text-lg text-gray-600 mt-2">{round?.interviewType}</p>
                    <p className="text-gray-600">Interview Date: {new Date(round?.interviewDate).toLocaleDateString()}</p>

                    {/* Interview Questions */}
                    {round?.interviewQuestion && round?.interviewQuestion.length > 0 && (
                        <div className="mt-4">
                            <h4 className="text-lg font-semibold text-gray-700">Interview Questions:</h4>
                            <ul className="list-disc pl-5">
                                {round?.interviewQuestion?.map((question: any, idx: number) => (
                                    <li key={question._id} className="text-gray-600">
                                        <strong>{question.question}</strong> - <em>{question.difficulty}</em>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Interview Feedback */}
                    <div className="mt-4">
                        <h4 className="text-lg font-semibold text-gray-700">Feedback:</h4>
                        <p className="text-gray-600">{round.interviewFeedback}</p>
                    </div>

                    {/* Preparation Materials */}
                    {round.preparationMaterials && round.preparationMaterials.length > 0 && (
                        <div className="mt-4">
                            <h4 className="text-lg font-semibold text-gray-700">Preparation Materials:</h4>
                            <ul className="list-disc pl-5">
                                {round.preparationMaterials.map((material: string, idx: number) => (
                                    <li key={idx} className="text-gray-600">{material}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ))}

            {/* Final Outcome */}
            <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-800">Final Outcome:</h3>
                <p className="text-gray-600">{interviewData?.finalOutcome}</p>
            </div>
        </div>
    );
};

export default InterviewContet;
