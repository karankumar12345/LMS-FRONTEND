/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import Heading from '@/utils/Heading';
import React from 'react';
import AdminDashboard from '../_component/ArticalDashBoard';


type Props = {};

const Page: React.FC<Props> = () => {
  // Navigation items for the admin dashboard


  return (
    <div>
      {/* Page Heading */}
      <Heading
        title="Admin Dashboard"
        description="Manage articles efficiently"
        keywords="articles, admin, dashboard"
      />

      {/* Embedded Admin Dashboard */}
      <div className='mt-[10%]'>
      <AdminDashboard  />
      </div>
      
     
    </div>
  );
};

export default Page;
