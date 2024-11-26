import React from 'react';
import './Loading.css';

const Loading: React.FC = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <h1 className="loading-text">Loading...</h1>
    </div>
  );
};

export default Loading;
