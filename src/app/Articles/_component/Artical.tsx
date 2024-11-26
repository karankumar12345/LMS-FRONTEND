/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
"use client"
import React, { useEffect, useState } from 'react';

import ArticalCard from './ArticalCard';
import { useGetAllArticalQuery } from '../../../../redux/features/Artical/ArticalApi';

type Props = {};

const Articals = (props: Props) => {
    const { data, isLoading } = useGetAllArticalQuery({});
    const [courses, setCourses] = useState<any[]>([]);

    useEffect(() => {
        setCourses(data?.articles || []);
    }, [data]);

    return (
        <div className={`w-[90%] 800px:w-[80%] m-auto`}>
            <h1 className='text-center font-Poppins text-[25px] leading-[35px] sm:text-4xl dark:text-white 800px:!leading-[60px] text-[#000] font-[700] tracking-tighter'>
                Expand Your Career <span className='text-gradient'>Opportunity</span> <br />
                Opportunity with Our Documentation
            </h1>
            <br />
            <br />
            <br />
            <div className='grid grid-cols-1 gap-[20px] md:grid-cols-1 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] 1500px:grid-col-3 1500px:gap-[35px] mb-12 border-0'>
                {
                    courses && courses.map((item: any, index: number) => (
                        <ArticalCard item={item} key={index} /> 
                    ))
                }
            </div>
        </div>
    );
};

export default Articals;
