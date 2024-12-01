"use client";

import AdminSidebar from '@/app/_components/Admin/sidebar/AdminSidebar';
import Heading from '@/utils/Heading';
import React from 'react';

import DashBoardHeader from '@/app/_components/Admin/DashBoardHeader';
import Admin from '@/app/_hooks/AdminProt';
import ThemedAllUser from '../_components/ALLUser/AllUsers';
// import { useUpdateUserRoleMutation } from '../../../../redux/features/auth/authapi';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Props = {};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Page = (props: Props) => {

  return (
    <div>
      <Admin>
        <Heading title="LEARNING - Admin" description="learning" keywords="lal" />
        <div className="flex h-screen">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[84%]">
            <DashBoardHeader />
            {/* Correctly pass isTeam prop */}
            <ThemedAllUser isTeam={true} />
          </div>
        </div>
      </Admin>
    </div>
  );
};

export default Page;
