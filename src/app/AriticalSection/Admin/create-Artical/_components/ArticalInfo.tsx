 /* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Action } from "@reduxjs/toolkit";
import Image from "next/image";
import React, { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";

type Props = {
  active: number;
  setActive: (value: number) => void;
  articlaInfo: any;
  setArticalInfo: (articlaInfo: any) => void;
};

const ArticalInfo = ({
  active,
  setActive,
  articlaInfo,
  setArticalInfo,
}: Props) => {

  
    const [dragging, setDragging] = useState(false);
    // Initialize router
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        setActive(active+1)
        // Validation logic here (if needed)
        console.log(articlaInfo)
    };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArticalInfo({ ...articlaInfo, [e.target.id]: e.target.value });
  };
  
  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            if (reader.readyState === 2) {
                setArticalInfo({ ...articlaInfo, thumbnail: reader.result });
            }
        };
        reader.readAsDataURL(file);
    }
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
                setArticalInfo({ ...articlaInfo, thumbnail: reader.result });
            }
        };
        reader.readAsDataURL(file);
    }
};
  return (
    <div className="w-[55%] mt-24 ml-[10%]  ">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title:
          </Label>

          <Input
            type="text"
            value={articlaInfo.title}
            id="title"
            onChange={handleChange}
            placeholder="Enter Your Artical Title"
            required
          />
        </div>
        <div className="mb-4">
          <Label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Description:
          </Label>

          <Input
            type="text"
            value={articlaInfo.description}
            id="description"
            onChange={handleChange}
            placeholder="Enter Your Artical Description"
            required
          />
        </div>
        <div className="mb-4">
          <Label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Category:
          </Label>

          <Input
            type="text"
            value={articlaInfo.category}
            id="category"
            onChange={handleChange}
            placeholder="Enter Your Artical Description"
       
          />
          
        </div>
        <div className="mb-4">
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                        Tags:
                    </label>
                    <input
                        type="text"
                        id="tags"
                        value={articlaInfo.tags}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Add Some Tags"
                        required
                    />
                </div>
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

                {articlaInfo.thumbnail && (
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Thumbnail Preview:</label>
        <Image
            src={typeof articlaInfo.thumbnail === "string" ? articlaInfo.thumbnail : articlaInfo.thumbnail.url}
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

export default ArticalInfo;
