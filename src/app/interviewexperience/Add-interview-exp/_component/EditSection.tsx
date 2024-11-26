import React from "react";
import { Button, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

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
  interviewDate: string; // Use string for date inputs
  experience: string;
  interviewDifficulty: string;
  interviewFeedback: string;
  outcome: string;
  preparationMaterials: string[];
  interviewQuestion: InterviewQuestion[];
}

const ExperienceContentEdit = ({ active, setActive, round, setRound }: Props) => {
    const handleInputChange = (
   
      };
      
      const handleQuestionChange = (
      
      };
      
      const addSubQuestion = (sectionIndex: number) => {
       
      };
      
      const deleteSubQuestion = (sectionIndex: number, questionIndex: number) => {
        
      };
      
      const addSubRound = () => {
        
      };
      
      const deleteSubRound = (sectionIndex: number) => {
        setRound((prev) => prev.filter((_, idx) => idx !== sectionIndex));
      };
      
  const NextView = () => {
    setActive(active + 1);
  };

  return (
    <div className="p-4">
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
            placeholder="Enter Round Number"
            value={section.roundNumber || ""}
            onChange={(e) => handleInputChange(e, sectionIndex, "roundNumber")}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Enter Interview Type"
            value={section.interviewType || ""}
            onChange={(e) => handleInputChange(e, sectionIndex, "interviewType")}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="date"
            value={section.interviewDate}
            onChange={(e) => handleInputChange(e, sectionIndex, "interviewDate")}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Enter Experience"
            value={section.experience || ""}
            onChange={(e) => handleInputChange(e, sectionIndex, "experience")}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Enter Interview Difficulty"
            value={section.interviewDifficulty || ""}
            onChange={(e) =>
              handleInputChange(e, sectionIndex, "interviewDifficulty")
            }
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Enter Interview Feedback"
            value={section.interviewFeedback || ""}
            onChange={(e) =>
              handleInputChange(e, sectionIndex, "interviewFeedback")
            }
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Enter Outcome"
            value={section.outcome || ""}
            onChange={(e) => handleInputChange(e, sectionIndex, "outcome")}
            className="w-full mb-2 p-2 border rounded"
          />

          {section.interviewQuestion.map((sub, questionIndex) => (
            <div key={questionIndex} className="mb-4 relative">
              <input
                type="text"
                placeholder="Enter Interview Question"
                value={sub.question || ""}
                onChange={(e) =>
                  handleQuestionChange(e, sectionIndex, questionIndex, "question")
                }
                className="w-full mb-2 p-2 border rounded"
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
          <Button onClick={() => addSubQuestion(sectionIndex)}>
            Add Another Question
          </Button>
        </div>
      ))}
      <Button onClick={addSubRound}>Add Round</Button>

      <div>
        <Button variant="outlined" onClick={() => setActive(active - 1)}>
          Previous
        </Button>
        <Button variant="contained" onClick={NextView}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default ExperienceContentEdit;
