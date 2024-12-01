/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useState } from 'react'
import Protected from '../_hooks/useProtected'
import { useSelector } from "react-redux";
import Header from '../_components/Header';
import Heading from '@/utils/Heading';
import Profile from '../_components/Profile/Profile';

// Define the types for the Props and Auth state
type Props = object;



const Page = (props: Props) => {
  // Get the `auth` state with better type handling
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = useSelector((state:any) => state.auth)||"Guest";

  

  return (
    <>
    <Protected>
        <Heading title={`${user?.user?.name} "Karan"` }  description='Elearning Profile'  keywords='Profile Data' />
        
         <Profile user={user}/>
         </Protected>
    </>
  );
};

export default Page;
