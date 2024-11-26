import AdminSidebar from '@/app/_components/Admin/sidebar/AdminSidebar'
import Heading from '@/utils/Heading'
import React from 'react'
// import CreateCourses from '../../_components/CreateCourses'
import DashBoardHeader from '@/app/_components/Admin/DashBoardHeader'
import Admin from '@/app/_hooks/AdminProt'
import EditHero from '../_components/customization/EditHero'


// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Props = {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Page = (props: Props) => {
  return (
    <Admin>
    <div>

        <Heading title='Hero ' description='learning' keywords='lal'/>
        <div className="flex">
            <div className='1500px:w-[16%] w-1/5'>
            <AdminSidebar/>

            </div>
            <div className='w-[84%] '>
                <DashBoardHeader/>

                <EditHero/>
            </div>
    
        </div> 
    </div>
    </Admin>
  )
}

export default Page