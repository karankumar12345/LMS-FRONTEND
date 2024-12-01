"use client"
import AdminSidebar from '@/app/_components/Admin/sidebar/AdminSidebar'
import Heading from '@/utils/Heading'
import React from 'react'
// import CreateCourses from '../../_components/CreateCourses'
import DashBoardHeader from '@/app/_components/Admin/DashBoardHeader'
import Admin from '@/app/_hooks/AdminProt'
import EditCourses from '../../_components/EditCourses'
// import { useParams } from 'next/navigation'

type Props = {
  params: {
    id: string; // Ensure id is of type string
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Page: React.FC<Props> =({ params }) => {
   
  const { id } = params;

  return (
    <Admin>
    <div>

        <Heading title='LEARNING -Admin' description='learning' keywords='lal'/>
        <div className="flex">
            <div className='1500px:w-[16%] w-1/5'>
            <AdminSidebar/>

            </div>
            <div className='w-[84%] '>
                <DashBoardHeader/>

         <EditCourses isFlag={true} id={id}/>
            </div>
          
        </div> 
    </div>
    </Admin>
  )
}

export default Page