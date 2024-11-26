/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import React from "react";
import toast from "react-hot-toast";

type Props = {
  active: number;
  setActive: (step: number) => void;
  round: Round[];
  setRound: (content: Round[]) => void;
};

interface InterviewQuestion {
  question: string;
  difficulty: string;
  questionType: string;
  questionTopic: string;
}

interface Round {
  roundNumber: number;
  interviewType: string;
  interviewDate: Date | string;
  experience: string;
  interviewDifficulty: string;
  interviewFeedback: string;
  outcome: string;
  preparationMaterials: string[];
  interviewQuestion: InterviewQuestion[];
}

const ExperienceContent = ({ active, setActive, round, setRound }: Props) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    sectionIndex: number,
    key: keyof Round
  ) => {
    const newRound = [...round];
    newRound[sectionIndex][key] = e.target.value;
    setRound(newRound);
  };

  const handleQuestionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    sectionIndex: number,
    questionIndex: number,
    key: keyof InterviewQuestion
  ) => {
    const newRound = [...round];
    newRound[sectionIndex].interviewQuestion[questionIndex][key] = e.target.value;
    setRound(newRound);
  };

  const addSubQuestion = (sectionIndex: number) => {
    const newRound = [...round];
    newRound[sectionIndex].interviewQuestion.push({
      question: "",
      difficulty: "",
      questionType: "",
      questionTopic: "",
    });
    setRound(newRound);
  };

  const deleteSubQuestion = (sectionIndex: number, questionIndex: number) => {
    const newRound = [...round];
    newRound[sectionIndex].interviewQuestion.splice(questionIndex, 1);
    setRound(newRound);
  };

  const addSubRound = () => {
    setRound([
      ...round,
      {
        roundNumber: round.length + 1,
        interviewType: "",
        interviewDate: new Date().toISOString().split("T")[0],
        experience: "",
        interviewDifficulty: "",
        interviewFeedback: "",
        outcome: "",
        preparationMaterials: [],
        interviewQuestion: [],
      },
    ]);
  };

  const deleteSubRound = (sectionIndex: number) => {
    const newRound = [...round];
    newRound.splice(sectionIndex, 1);
    setRound(newRound);
  };

  const NextView = () => {

    setActive(active + 1);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Interview Content</h2>

      {round.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-6 p-4 border rounded relative">
          <IconButton
            aria-label="delete round"
            className="absolute top-2 right-2"
            onClick={() => deleteSubRound(sectionIndex)}
          >
            <Delete />
          </IconButton>
          <input
            type="number"
            placeholder="Enter Your Round Number"
            value={section.roundNumber || ""}
            onChange={(e) => handleInputChange(e, sectionIndex, "roundNumber")}
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Enter Your Interview Type"
            value={section.interviewType || ""}
            onChange={(e) => handleInputChange(e, sectionIndex, "interviewType")}
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <input
            type="date"
            placeholder="Enter Your Interview Date"
            value={
              typeof section.interviewDate === "string"
                ? section.interviewDate
                : new Date(section.interviewDate).toISOString().split("T")[0]
            }
            onChange={(e) => handleInputChange(e, sectionIndex, "interviewDate")}
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Enter Your Experience"
            value={section.experience || ""}
            onChange={(e) => handleInputChange(e, sectionIndex, "experience")}
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Enter Your diffult level of interview"
            value={section.interviewDifficulty || ""}
            onChange={(e) => handleInputChange(e, sectionIndex, "interviewDifficulty")}
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Enter Your interview Feedback"
            value={section.interviewFeedback || ""}
            onChange={(e) => handleInputChange(e, sectionIndex, "interviewFeedback")}
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Enter Your Outcome"
            value={section.outcome || ""}
            onChange={(e) => handleInputChange(e, sectionIndex, "outcome")}
            className="w-full mb-2 p-2 border rounded"
            required
          />

          {/* Additional Inputs */}
          {section.interviewQuestion.map((sub, questionIndex) => (
            <div key={questionIndex} className="mb-4 relative">
     
              <input
                type="text"
                placeholder="Enter Your Interview Question"
                value={sub.question || ""}
                onChange={(e) =>
                  handleQuestionChange(e, sectionIndex, questionIndex, "question")
                }
                className="w-full mb-2 p-2 border rounded"
                required
              />
              {/* Additional Question Inputs */}

              <input
                type="text"
                placeholder="Enter Your Question Difficulty"
                value={sub.difficulty || ""}
                onChange={(e) =>
                  handleQuestionChange(e, sectionIndex, questionIndex, "difficulty")
                }
                className="w-full mb-2 p-2 border rounded"
                required
              />
              <input
                type="text"
                placeholder="Enter Your Question Type"
                value={sub.questionType || ""}
                onChange={(e) =>
                  handleQuestionChange(e, sectionIndex, questionIndex, "questionType")
                }
                className="w-full mb-2 p-2 border rounded"
                required
              />
              <input
                type="text"
                placeholder="Enter Your Question Topic"
                value={sub.questionTopic || ""}
                onChange={(e) =>
                  handleQuestionChange(e, sectionIndex, questionIndex, "questionTopic")
                }
                className="w-full mb-2 p-2 border rounded"
                required
              />

<IconButton
                aria-label="delete question"
                className="absolute top-2 right-2"
                onClick={() => deleteSubQuestion(sectionIndex, questionIndex)}
              >
                <Delete />
              </IconButton>
            </div>
          ))}
          <Button
            className="text-blue-500"
            onClick={() => addSubQuestion(sectionIndex)}
          >
            Add Another Question
          </Button>
        </div>
      ))}
      <button className="text-blue-500 mb-2" onClick={addSubRound}>
        Add SubRound
      </button>

      <div>
        <Button variant="outlined" onClick={() => setActive(active - 1)}>
          Previous
        </Button>
        <Button
          variant="contained"
          color="primary"
          className="left-[30%]"
          onClick={NextView}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ExperienceContent;

