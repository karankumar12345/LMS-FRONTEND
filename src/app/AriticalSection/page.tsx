/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import Heading from '@/utils/Heading'
import React from 'react'
import AdminDashboard from './_component/ArticalDashBoard'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
        <Heading title='Admin DashBoard ' description='This are Artical DashBoard' keywords='Artical ' />
        <div>
        <AdminDashboard/>
        </div>
    </div>
  )
}

export default page