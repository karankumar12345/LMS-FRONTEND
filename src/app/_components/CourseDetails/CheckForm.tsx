/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react'
import { useCreateOrderMutation } from '../../../../redux/features/orderApi/OrderApi';
import { useLoadUserQuery } from '../../../../redux/features/apislice';

type Props = {
    setOpen:any;
    data:any
}

const CheckForm = ({setOpen,data}: Props) => {
    const stripe =useStripe()
    const element=useElements();
    const [message,setMessage]=useState<any>("")
    const [createOrder,{data:orderData,error}]=useCreateOrderMutation();
    const [loaduser,setLoadUser]=useState(false);
    const {} =useLoadUserQuery({skip:loaduser?false:true})
    const [isLoading,setIsLoading]=useState(false)
const handleSubmit=async(e:any)=>{
    e.preventDefault();

}
  return (
    <div>
<form onSubmit={handleSubmit}>
    
</form>
    </div>
  )
}

export default CheckForm