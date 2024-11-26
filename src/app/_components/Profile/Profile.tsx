"use client"
import React, { useState, useEffect } from 'react';
import SideBar from './SideBar';

type Props = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user: any; // Adjust the type according to your `user` structure
};

const Profile = ({ user }: Props) => {
    const [scroll, setScroll] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScroll(true);
            } else {
                setScroll(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll); // Cleanup listener on unmount
        };
    }, []);

    return (
        <div className='w-[85%] flex mx-auto h-fit'>
            <div className={`w-[60px] 800px:w-[310px] h-[450px]  bg-opacity-90 border-red-900  border-r-2 rounded-sm mt-[80px] mb-[80px] sticky ${scroll ? "top-[120px]" : "top-[130px]"} left-[30px]`}>
                {/* You can use the `user` prop here if needed */}
             <SideBar user={user}/>
            </div>
        
        </div>
    );
};

export default Profile;
