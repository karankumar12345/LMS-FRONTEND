/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import React, { useEffect, useState } from 'react';
import { useGetAllInterviewApiQuery } from '../../../../redux/features/Exper/api';
import {  CardContent, Typography } from '@mui/material';
import Link from 'next/link';
import { CardContainer } from '@/components/ui/3d-card';

type Props = {};

const Interview = (props: Props) => {
  const { data, isLoading } = useGetAllInterviewApiQuery({});
  const [interviews, setInterviews] = useState<any[]>([]);
console.log(data)
  useEffect(() => {
    setInterviews(data?.allInterviewExperience || []);
    console.log(data?.AllInterviewExperience);
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4  ">
      {interviews?.map((interview) => (
        <CardContainer
          key={interview._id}
          className="shadow-lg rounded-lg bg-red-300 transition-all duration-200 h-[300px] w-[200px]"
        > 
          <CardContent>
            <Typography variant="h5" component="div" className="font-semibold text-gray-800">
              {interview.companyName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Position: {interview.jobPosition}
            </Typography>

            <Typography variant="body2" color="text.secondary" className="mt-2">
              Final Outcome: {interview.finalOutcome}
            </Typography>

            <Link
              href={`/interview-experience/${interview._id}`}
              className="mt-4 text-blue-600 hover:underline"
            >
              View Details
            </Link>
          </CardContent>
        </CardContainer>
      ))}
    </div>
  );
};

export default Interview;
