import React, { useState } from 'react';
import { useGetSingleCoursesContentQuery } from '../../../../redux/features/courses/coursesapi';
import Loading from '@/app/Loading';
import Heading from '@/utils/Heading';
import CourseContentMedia from './CourseContetnMedia';
import { CourseSections } from './Lession';

type Props = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    id: any;
};

const CoursesView: React.FC<Props> = ({ id }) => {
    const [activeVideo, setActiveVideo] = useState(0);
    const [activeSubtitle, setActiveSubtitle] = useState(0);
    const [activeSection, setActiveSection] = useState(0);
    const { data, isLoading } = useGetSingleCoursesContentQuery(id);
    
    const courseData = data?.course;
    console.log(data);

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <div className='w-full grid 800px:grid-cols-10'> {/* Corrected grid class name */}
                    <Heading 
                        title={courseData?.courseData[activeSection]?.title} 
                        description='anything' 
                        keywords='video here' 
                    />
                    <div className='col-span-7'>
                        <CourseContentMedia
                            data={courseData} 
                            id={id} 
                            activeVideo={activeVideo} 
                            setActiveVideo={setActiveVideo} 
                            activeSubtitle={activeSubtitle}
                            setActiveSubtitle={setActiveSubtitle}
                            activeSection={activeSection}
                            setActiveSection={setActiveSection}
                        />
                    </div>
                    <CourseSections 
                        data={courseData} 
                        setActiveVideo={setActiveVideo} 
                        setActiveSubtitle={setActiveSubtitle} 
                        setActiveSection={setActiveSection} 
                    />
                </div>
            )}
        </>
    );
};

export default CoursesView;
