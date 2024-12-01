/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import axios from "axios"
type Props = {
  videoUrl:string,
  title:string
}

const CoursesPlayer = ({videoUrl}:Props) => {
  const [videoData,setVideoData]=useState({
    otp:"",
    playbackInfo:"",
  }
)
useEffect(()=>{
axios.post('http://localhost:8000/api/v1/course/getvideourl',{
  videoId:videoUrl,

}).then((res)=>{
  setVideoData(res.data)
})
},[videoUrl])
  return (
    <div style={{paddingTop:"40%",position:"relative"}}>
      {
        videoData.otp&& videoData.playbackInfo!==""&&(
          <iframe src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData.playbackInfo}`}
          style={{
            border:0,
            width:"90%",
            height:"100%",
            position:"absolute",
            top:0,
            left:0,
          }}
          allowFullScreen={true}
          allow='encrypted-media'></iframe>
        )
      }
    </div>
  )
}
export default CoursesPlayer