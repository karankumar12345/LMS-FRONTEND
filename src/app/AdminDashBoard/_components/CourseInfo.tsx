/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
// Import Next.js router

type Props = {
    courseInfo: any;
    setCourseInfo: (courseInfo: any) => void;
    active: number;
    setActive: (active: number) => void;
};

const CourseInfo = ({ courseInfo, setCourseInfo, active, setActive }: Props) => {
    const [dragging, setDragging] = useState(false);
    // Initialize router

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validation logic here (if needed)
        setActive(active+1)
    };

    const handleFileChange = (e: any) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                if (reader.readyState === 2) {
                    setCourseInfo({ ...courseInfo, thumbnail: reader.result });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setCourseInfo((prevState: any) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDropLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                if (reader.readyState === 2) {
                    setCourseInfo({ ...courseInfo, thumbnail: reader.result });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='w-[55%] ml-[15%] mt-24'>
            <form onSubmit={handleSubmit}>
                {/* Name Input */}
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={courseInfo.name}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your name"
                        required
                    />
                </div>

                {/* Course Description */}
                <div className="mb-6">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Course Description:
                    </label>
                    <textarea
                        id="description"
                        cols={30}
                        rows={8}
                        value={courseInfo.description}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Amazing Something"
                        required
                    ></textarea>
                </div>

                {/* Price Inputs */}
                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        Price:
                    </label>
                    <input
                        type="number"
                        id="price"
                        value={courseInfo.price}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter Your Price"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="estimatedPrice" className="block text-sm font-medium text-gray-700">
                        Estimated Price:
                    </label>
                    <input
                        type="number"
                        id="estimatedPrice"
                        value={courseInfo.estimatedPrice}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter Your Estimated Price"
                        required
                    />
                </div>

                {/* Tags Input */}
                <div className="mb-4">
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                        Tags:
                    </label>
                    <input
                        type="text"
                        id="tags"
                        value={courseInfo.tags}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Add Some Tags"
                        required
                    />
                </div>

                {/* Level Input */}
                <div className="mb-4">
                    <label htmlFor="level" className="block text-sm font-medium text-gray-700">
                        Course Level:
                    </label>
                    <input
                        type="text"
                        id="level"
                        value={courseInfo.level}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Beginner, Intermediate, Advanced"
                        required
                    />
                </div>

                {/* Demo URL */}
                <div className="mb-4">
                    <label htmlFor="demoUrl" className="block text-sm font-medium text-gray-700">
                        Demo URL:
                    </label>
                    <input
                        type="text"
                        id="demoUrl"
                        value={courseInfo.demoUrl}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Add Demo URL"
                        required
                    />
                </div>

                {/* Thumbnail Image Upload */}
                <div
                    className={`mb-4 p-4 border border-dashed ${dragging ? 'border-blue-500' : 'border-gray-300'} rounded-md`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDropLeave}
                    onDrop={handleDrop}
                >
                    <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                        Thumbnail Image:
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        id="file"
                        onChange={handleFileChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="mt-2 text-sm text-gray-500">Drag and drop an image or click to upload.</p>
                </div>

                {/* Image Preview */}
                {courseInfo.thumbnail && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Thumbnail Preview:</label>
                        <img
                            src={courseInfo.thumbnail}
                            alt="Thumbnail preview"
                            className="mt-2 w-full h-64 object-cover border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                )}

                {/* Submit Button */}
                <div className='w-full flex items-center justify-end'>
                    <input type="submit" value="Next" className='w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-[#fff] rounded mt-8'/>
                </div>
            </form>
        </div>
    );
};

export default CourseInfo;
