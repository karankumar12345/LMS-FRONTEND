import React from 'react'
import InterviewView from '../_components/ArticalView';


type Props = {
    params: {
      id: string; // Ensure id is of type string
    };
  };
  

  const Page: React.FC<Props> = ({ params }) => {
  
    const { id } = params;
  return (
    <div>
        <InterviewView id={id}/>
    </div>
  )
}

export default Page