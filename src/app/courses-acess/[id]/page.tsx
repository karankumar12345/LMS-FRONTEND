"use client";
import React, { useEffect } from 'react';
import { useLoadUserQuery } from '../../../../redux/features/apislice';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Loading from '@/app/Loading';
import CousesView from '@/app/_components/courses-acess/CousesView';

const Page: React.FC = () => {
  const router = useRouter();
  
  // Use useParams with type assertion and a guard check for `id`
  const params = useParams();
  const id = typeof params?.id === 'string' ? params.id : undefined;

  console.log("ID:", id); // Debugging log to check id

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

    // Ensure id is valid before using trim
    const trimmedId = id?.trim(); // Trim the id
    if (!trimmedId) {
      toast.error("Invalid course ID.");
      router.push('/');
      return;
    }

    // Check if user has purchased the course
    const isPurchased = Array.isArray(user.courses) && user.courses.some((course: { _id: string }) => course._id === trimmedId);

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
      <CousesView id={id} /> {/* Pass id to CousesView */}
    </div>
  );
};

export default Page;
