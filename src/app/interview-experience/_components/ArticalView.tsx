"use client";
import React from 'react';
import Loading from '@/app/Loading';
import Heading from '@/utils/Heading';
import { useGetSingleInterviewApiQuery } from '../../../../redux/features/Exper/api';
import InterviewContet from './InterviewContet';

type Props = {
    id: string;
};

const InterviewView: React.FC<Props> = ({ id }) => {
    const { data, isLoading } = useGetSingleInterviewApiQuery(id);
    const interviewData = data?.singleExperience;
    console.log(interviewData);

    return (
        <>
            <Heading
                title={interviewData?.companyName}
                description="See Interview Experience"
                keywords="KaranArticle"
            />
            {isLoading ? (
                <Loading />
            ) : (
                <div className="w-full">
                    {/* Pass interview data to InterviewContet */}
                    <InterviewContet interviewData={interviewData} />
                </div>
            )}
        </>
    );
};

export default InterviewView;
