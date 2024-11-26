"use client"
import AdminSidebar from '@/app/_components/Admin/sidebar/AdminSidebar'
import Heading from '@/utils/Heading'
import React from 'react'

import DashBoardHeader from '@/app/_components/Admin/DashBoardHeader'
import Admin from '@/app/_hooks/AdminProt'
import AllCourses from '../_components/AllCourses/AllCourses'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Props = {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Page = (props: Props) => {
  return (

      
        <Admin>
<Heading title='LEARNING -Admin' description='learning' keywords='lal'/>
<div className="flex h-screen">
    <div className='1500px:w-[16%] w-1/5'>
    <AdminSidebar/>

    </div>
    <div className='w-[84%] '>
        <DashBoardHeader/>

      <AllCourses/>
    </div>
  
</div> 
</Admin>


  )
}

export default Page