/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import ExperienceInfo from "./ExperienceInfo";
import ExperienceOption from "./ExperienceOption";
import ExperienceContent from "./ExperienceContent";
import ExperienceView from "./ExperienceView";
import { useCreateInterviewApiMutation, useGetSingleInterviewApiQuery, useUpdateInterviewApiMutation } from "../../../../../redux/features/Exper/api";
import toast from "react-hot-toast";
import { useLoadUserQuery } from "../../../../../redux/features/apislice";
import { useParams } from "next/navigation";
import ExperienceContentEdit from "./EditSection";

type Props = {};

interface InterviewInfo {
  user: any;
  companyName: string;
  jobPosition: string;
  finalOutcome: string;
}

interface InterviewQuestion {
  question: string;
  difficulty: string;
  questionType: string;
  questionTopic: string;
}

interface Round {
  roundNumber: number;
  interviewType: string;
  interviewDate: Date;
  experience: string;
  interviewDifficulty: string;
  interviewFeedback: string;
  outcome: string;
  preparationMaterials: string[];
  interviewQuestion: InterviewQuestion[];
}

const EditExper = (props: Props) => {
    const { id } = useParams();
  const [active, setActive] = useState(0);
  const {  data } = useGetSingleInterviewApiQuery(id || "");

  const { data: userData } = useLoadUserQuery({});

  const [CreateInterview, { isLoading, isSuccess, error }] = useUpdateInterviewApiMutation();

  const [interviewInfo, setInterviewInfo] = useState<InterviewInfo>({
    user: "",
    companyName: "",
    jobPosition: "",
    finalOutcome: "",
  });

   

  const [round, setRound] = useState<Round[]>([
    {
      roundNumber: 1,
      interviewType: "",
      interviewDate: new Date(),
      experience: "",
      interviewDifficulty: "",
      interviewFeedback: "",
      outcome: "",
      preparationMaterials: [],
      interviewQuestion: [
        {
          question: "",
          difficulty: "",
          questionType: "",
          questionTopic: "",
        },
      ],
    },
  ]);

  useEffect(()=>{
    if(data){
      setInterviewInfo({
        user: data.SingleExperience.user,
        companyName: data.SingleExperience.companyName,
        jobPosition: data.SingleExperience.jobPosition,
        finalOutcome: data.SingleExperience.finalOutcome,
      });
      setRound(data.SingleExperience.rounds);
    }
  })

  useEffect(() => {
    if (isSuccess) {
      toast.success("Interview Experience Created Successfully");
    }
    if (error && "data" in error) {
      const errorData = error as any;
      toast.error(errorData.data.message);
    }
  }, [isLoading, isSuccess, error]);

  const handelSubmit=async()=>{
    const data={
      companyName:interviewInfo.companyName,
      jobPosition:interviewInfo.jobPosition,
      finalOutcome:interviewInfo.finalOutcome,
      user:userData.user._id,
     
    rounds:  round
    }

    console.log(data);
    await CreateInterview(data);
    
    }
  

  return (
    <div className="flex w-full min-h-screen">
      {/* Main Content */}
      <div className="w-[84%] px-4">
        {active === 0 && (
          <ExperienceInfo
            active={active}
            setActive={setActive}
            interviewInfo={interviewInfo}
            setInterviewInfo={setInterviewInfo}
          />
        )}
        {active === 1 && (
          <ExperienceContentEdit
            active={active}
            setActive={setActive}
            round={round}
            setRound={setRound}

          />


        )}
        {active===2 &&(
          <ExperienceView active={active} setActive={setActive}  round={round} interviewInfo={interviewInfo} handleSubmit={handelSubmit}/>
        )}
      </div>

      {/* Sidebar */}
      <div
        className="w-[16%] h-screen fixed top-0 right-0 shadow-lg"
        style={{ zIndex: 50 }}
      >
        <div className="mt-24">
          <ExperienceOption active={active} setActive={setActive}   />
        </div>
      </div>
    </div>
  );
};

export default EditExper;
