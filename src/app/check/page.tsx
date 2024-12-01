/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client"
import React, { useState } from 'react';
import { useUpdateProfileUserMutation } from '../../../redux/features/auth/authapi';
// import { useUpdateProfileAvatarMutation } from '../redux/apiSlice';

const ProfilePictureUpload = () => {
  const [file, setFile] = useState(null);
  const [updateProfileAvatar, { isLoading, isError, isSuccess, error }] = useUpdateProfileUserMutation();

  const handleFileChange = (e:any) => {
    setFile(e.target.files[0]); // Get the selected file
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file!');
      return;
    }

    try {
      await updateProfileAvatar(file).unwrap();
      alert('Profile picture updated successfully!');
    } catch (err) {
      alert(`Failed to upload profile picture:  Unkonow Erre`);
    }
  };

  return (
    <div>
      <h1>Upload Profile Picture</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={isLoading}>
        {isLoading ? 'Uploading...' : 'Upload'}
      </button>
      {isError && <p style={{ color: 'red' }}>Error: Something went wrong</p>}
      {isSuccess && <p style={{ color: 'green' }}>Profile picture updated successfully!</p>}
    </div>
  );
};

export default ProfilePictureUpload;
