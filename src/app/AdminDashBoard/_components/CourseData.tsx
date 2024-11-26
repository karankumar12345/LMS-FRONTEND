/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import toast from 'react-hot-toast';
import { IoMdAddCircle } from 'react-icons/io';

type Props = {
    benefits: { title: string }[];
    setBenefits: (benefits: { title: string }[]) => void;
    prerequisites: { title: string }[];
    setPrerequisites: (prerequisites: { title: string }[]) => void;
    active: number;
    setActive: (active: number) => void;
};

const CourseData = ({ benefits, setBenefits, prerequisites, setPrerequisites, active, setActive }: Props) => {
    const handleBenefitChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const newBenefits = [...benefits];
        newBenefits[index] = { title: e.target.value };
        setBenefits(newBenefits);
    };

    const handleAddBenefit = () => {
        setBenefits([...benefits, { title: '' }]);
    };

    const handleAddPreRequire = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPrerequisites = [...prerequisites];
        newPrerequisites[index] = { title: e.target.value };
        setPrerequisites(newPrerequisites);
    };

    const handleAddPreRequisites = () => {
        setPrerequisites([...prerequisites, { title: '' }]);
    };

    const prevButton = () => {
        if (active > 0) {
            setActive(active - 1);
        }
    };

    const nextButton = () => {
        if (benefits[benefits.length - 1]?.title === "") {
            toast.error("Please fill in all benefit fields.");
        } else if (prerequisites[prerequisites.length - 1]?.title === "") {
            toast.error("Please fill in all prerequisite fields.");
        } else {
            setActive(active + 1);
        }
    };

    return (
        <div className="w-[55%] ml-[15%] mt-24">
            <div>
                <label htmlFor="benefits" className="block text-sm font-medium text-gray-700">
                    What are the benefits for students in this course?
                </label>
                <br />
                {benefits.map((benefit, index) => (
                    <input
                        required
                        type="text"
                        key={index}
                        name="benefits"
                        value={benefit.title}
                        onChange={handleBenefitChange(index)}
                        placeholder='Write Benefits of this'
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                ))}
                <IoMdAddCircle
                    style={{ margin: '10px 0px', cursor: 'pointer', width: '30px' }}
                    onClick={handleAddBenefit}
                />
            </div>
            <div>
                <label htmlFor="prerequisites" className="block text-sm font-medium text-gray-700">
                    What are the Prerequisites?
                </label>
                <br />
                {prerequisites.map((prerequisite, index) => (
                    <input
                        required
                        type="text"
                        key={index}
                        name="prerequisites"
                        value={prerequisite.title}
                        onChange={handleAddPreRequire(index)}
                        placeholder='Write Prerequisites'
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                ))}
                <IoMdAddCircle
                    style={{ margin: '10px 0px', cursor: 'pointer', width: '30px' }}
                    onClick={handleAddPreRequisites}
                />
            </div>
            <div className='w-full flex items-center justify-between'>
                <div
                    className='w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] mt-8 cursor-pointer'
                    onClick={prevButton}
                >
                    Prev
                </div>
                <div
                    className='w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] mt-8 ml-4 cursor-pointer'
                    onClick={nextButton}
                >
                    Next
                </div>
            </div>
        </div>
    );
};

export default CourseData;
