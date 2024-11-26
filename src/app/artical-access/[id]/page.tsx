import React from 'react'
import ArticalView from './_components/ArticalView'

type Props = {
    params: {
      id: string; // Ensure id is of type string
    };
  };
  

  const Page: React.FC<Props> = ({ params }) => {
  
    const { id } = params;
  return (
    <div>
        <ArticalView id={id}/>
    </div>
  )
}

export default Page