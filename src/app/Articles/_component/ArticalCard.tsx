/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Link from 'next/link';
import { ThreeDCardDemo } from '@/components/ThreeCard';

type Props = {
    item: any;
  
};


const ArticalCard = ({ item }: Props) => {
    console.log(item.thumbnail.url)
  return (
    <Link href={`/artical-access/${item._id}`}>
        
  <ThreeDCardDemo item={item}/>

    </Link>
  );
};

export default ArticalCard;
