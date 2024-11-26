
import AdminDashboard from '@/app/AriticalSection/_component/ArticalDashBoard'
import Heading from '@/utils/Heading'
import React from 'react'
import EditArtical from '../../create-Artical/_components/editArtical'


// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Props = {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Page = (props: Props) => {
  return (

    <div>

        <Heading title=' Update Artical' description='learning' keywords='lal'/>
        <div className="flex">
            <div className='1500px:w-[16%] w-1/5'>
          <AdminDashboard/>

            </div>
            <div className='w-[84%] '>
               

         <EditArtical/>
            </div>
          
        </div> 
    </div>

  )
}

export default Page