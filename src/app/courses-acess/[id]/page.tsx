/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect } from 'react';
import { useLoadUserQuery } from '../../../../redux/features/apislice';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Loading from '@/app/Loading';
import CousesView from '@/app/_components/courses-acess/CousesView';


type Props = {
  params: {
    id: string; // Ensure id is of type string
  };
};

const Page: React.FC<Props> = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const { isLoading, error, data } = useLoadUserQuery({});

  useEffect(() => {
    if (isLoading) return; // Wait for loading to finish

    if (error) {
      toast.error("An error occurred while loading user data.");
      router.push('/'); // Redirect on error
      return;
    }

    if (!data?.user) {
      router.push('/');
      toast.error("User data not found.");
      return;
    }

    const user = data.user;
    console.log("Courses array:", user.courses);
    console.log("Target course ID:", id);

    // Check if user has purchased the course
    const isPurchased = user.courses.some((course: { _id: string; }) => course._id === id.trim());
    
    if (!isPurchased) {
      toast.error("Course not purchased.");
      router.push('/');
      return;
    }
  }, [isLoading, error, data, id, router]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <CousesView  id={id}/> 
    </div>
  );
};

export default Page;
