/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import React from 'react'

type Props = {
    active:number,
    setActive:(value:number)=>void,
    interviewInfo:any,
    setInterviewInfo:(value:any)=>void
}

const ExperienceInfo = ({active,setActive,interviewInfo,setInterviewInfo}: Props) => {
    const handleSubmit =(e:React.FormEvent)=>{
        e.preventDefault()
        setActive(active+1)
    }
    const handleChange =(e:React.ChangeEvent<HTMLInputElement>)=>{
        setInterviewInfo({...interviewInfo, [e.target.id]:e.target.value})
    }
  return (
    <div className='w-[55%] mt-24'>
        <form onSubmit={handleSubmit}>
            <div className='mb-4'>
                <Label htmlFor='companyName' />
                <Input type="text" value={interviewInfo.companyName} id="companyName" onChange={handleChange} placeholder='Enter Company Name ' required/>
            </div>
            <div className='mb-4'>
                <Label htmlFor='jobPosition' />
                <Input type="text" value={interviewInfo.jobPosition} id="jobPosition" onChange={handleChange} placeholder='Enter Your Job Position ' required/>
            </div>
            <div className='mb-4'>
                <Label htmlFor='finalOutcome' />
                <Input type="text" value={interviewInfo.finalOutcome} id="finalOutcome" onChange={handleChange} placeholder='Eg -reject Select ' required/>
            </div>
            <div className='w-full flex items-center justify-end'>
                    <input type="submit" value="Next" className='w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-[#fff] rounded mt-8'/>
                </div>
        </form>
    </div>
  )
}

export default ExperienceInfo