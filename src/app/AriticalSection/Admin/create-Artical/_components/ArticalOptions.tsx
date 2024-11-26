/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { IoMdCheckmark } from 'react-icons/io';

type Props = {
    active: number;
    setActive: (value: number) => void;
}


const ArticalOptions = ({active,setActive}:Props) => {
    const options = [
        "Artical Information",
        "Artical Content",
        "Artical Preview"
    ]
  return (
    <div>
        {options?.map((item,index)=>(
            <div key={index} className={`w-full flex py-5`}>
                <div className={`w-[35px] h-[35px] rounded-full flex items-center justify-center ${active+1>index?"bg-blue-500":"bg-[#384766]"} relative`}>
                    <IoMdCheckmark className='text-[25px] '/>
                    {index!==options.length-1 && (
                        <div className={`absolute h-[30px] w-1 ${active+1>index?"bg-blue-500":"bg-[#384766]"} bottom-[-100%]`}/>
                    )}
                </div>
                <div className={`pl-3 ${active===index ? "dark:text-white": "text-black"} text-[20px] `} >
                    {item}
                </div>
            </div>
        ))}
    </div>
  )
}

export default ArticalOptions