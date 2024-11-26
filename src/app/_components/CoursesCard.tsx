/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Link from 'next/link';
import { ThreeDCardDemo } from '@/components/ThreeCard';

type Props = {
    item: any;
    isProfile?: boolean;
};

const CoursesCard = ({ item, isProfile }: Props) => {
    console.log(item)
  return (
    <Link href={!isProfile ? `/courses/${item._id}` : `/course-access/${item._id}`}>
        
  <ThreeDCardDemo item={item}/>
    </Link>
  );
};

export default CoursesCard;
