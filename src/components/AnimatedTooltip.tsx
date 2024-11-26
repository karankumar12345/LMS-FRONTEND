'use client'

import { AnimatedTooltip } from "../components/ui/animated-tooltip";

const instructors = [
    {
        id: 1,
        name: 'Elena Briggs',
        designation: 'Vocal Coach',
        image: 'https://i.pinimg.com/736x/10/b1/e2/10b1e28cce00d6a85dc1a55518ce586c.jpg',
    },
    {
        id: 2,
        name: 'Marcus Reid',
        designation: 'Guitar Instructor',
        image: 'https://i.pinimg.com/736x/10/b1/e2/10b1e28cce00d6a85dc1a55518ce586c.jpg',
    },
    {
        id: 3,
        name: 'Julia Zhang',
        designation: 'Piano Teacher',
        image: 'https://i.pinimg.com/736x/10/b1/e2/10b1e28cce00d6a85dc1a55518ce586c.jpg',
    },
    {
        id: 4,
        name: 'Andre Gomez',
        designation: 'Drumming Expert',
        image: 'https://i.pinimg.com/736x/10/b1/e2/10b1e28cce00d6a85dc1a55518ce586c.jpg',
    },
];

function StudentList() {
    return (
 
           
              

                    <AnimatedTooltip items={instructors} />
            
          
     
    );
}

export default StudentList;
