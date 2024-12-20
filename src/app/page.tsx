"use client"
import Heading from "@/utils/Heading";


import Hero from "./_components/Hero";

import Courses from "./_components/Courses";
import Reviews from "./_components/Reviews";
import FAQ from "./_components/FAQ";
import Articals from "./Articles/_component/Artical";
import Chatbot from "./_components/ChatBot";



export default function Home() {

    return (
        <>
            <Heading title="😍😍LEARNING😍😍🥰" description="This is the home page" keywords="LEARNING, mern, redux, ml" />
            {/* Pass setActiveItem to Header */}

          <Hero/>
      
          <Courses/>
          <Articals/>
          <Reviews/>
          <FAQ/>
          <Chatbot/>
        </>
    );
}
