"use client"
import {useSelector} from "react-redux"




export default function  UserAuth() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const {user} =useSelector((state:any)=>state.auth)

    if(user){
        return true;
    }
    else{
        return false;
    }
}