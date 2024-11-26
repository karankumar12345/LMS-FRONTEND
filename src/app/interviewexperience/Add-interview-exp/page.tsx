/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import Heading from '@/utils/Heading';
import React from 'react';
import InterviewExperienceDashBoard from './_component/InterviewExperienceDashBoard';
import AddInteviewExpe from './_component/AddInteviewExpe';


type Props = {};

const Page = (props: Props) => {
  return (
    <>
      {/* Page Metadata */}
      <Heading
        title="Article Section"
        description="This is the Article section created by any user"
        keywords="Article"
      />

      <div className="flex w-full min-h-screen">
        {/* Sidebar */}
        <div className="w-[5%] sm:w-[20%] md:w-[20%] lg:w-[20%] xl:w-[20%]">
          <InterviewExperienceDashBoard />
        </div>

        {/* Main Content */}
        <div className="w-[95%] sm:w-[80%] md:w-[80%] lg:w-[80%] xl:w-[80%] p-6">
          <AddInteviewExpe />
        </div>
      </div>
    </>
  );
};

export default Page;
