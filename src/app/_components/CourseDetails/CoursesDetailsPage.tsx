/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useGetSingleCoursesQuery } from '../../../../redux/features/courses/coursesapi';
import Loading from '@/app/Loading';
import Heading from '@/utils/Heading';
import Header from '../Header';
import CoursesPage from './CoursesPage';
import { loadStripe } from '@stripe/stripe-js';
import { useCreateOrderMutation, useGetStripePaymentMutation, useGetStripePublishableKeyQuery } from '../../../../redux/features/orderApi/OrderApi';

interface StripeConfig {
  publishableKey: string;
}

type Props = {
  id: string;
};

const CoursesDetailsPage = ({ id }: Props) => {

  
  // Fetch course details
  const { data, isLoading, error } = useGetSingleCoursesQuery(id);





  // Handle loading state
  if (isLoading) {
    return <Loading />;
  }

  // Handle error state for course data
  if (error) {
    return <div>Error loading course details.</div>;
  }

  // Handle error state for payment mutation


  return (
    <div>
      <Heading
        title={`${data?.course.name} - E-LEARNING`}
        description="E-Learning is a programming community developed by Karan Kumar."
        keywords={data?.course?.tags}
      />
  
    
        <CoursesPage data={data}   />
     
    </div>
  );
};

export default CoursesDetailsPage;
