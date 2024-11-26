import React , {FC} from "react";
interface HeapProp{
    title:string,
    description:string,
   keywords:string
}


const Heading:FC <HeapProp> = ({title,description,keywords}) => {
  return (
    <div>
   <title>{title}</title>
   <meta name="viewport" content="initial-scale=1.0, width=device-width" />
   <meta name="description" content={description} />
   <meta name="keywords" content={keywords} />
    </div>
  )
}

export default Heading;