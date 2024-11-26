import Heading from '@/utils/Heading';
import React from 'react';

const page = () => {
  return (
    <div className="container mx-auto p-6">
           <Heading title='About   ' description={''} keywords={''} />
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">About LWS</h1>
        <p className="text-lg text-gray-600">
          Empowering developers to excel in technical interviews with hands-on practice, expert feedback, and community-driven content.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-700">
            At LWS, our mission is to help developers master the art of technical interviews. We believe that the right preparation is the key to success. 
            Whether you're just starting or a seasoned professional, our platform provides everything you need to boost your skills and confidence.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">What We Offer</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Mock interviews with real-world coding problems</li>
            <li>Expert feedback and personalized performance reviews</li>
            <li>Community-shared interview experiences and tips</li>
            <li>Comprehensive courses on data structures, algorithms, and system design</li>
            <li>Regularly updated articles with coding tutorials and industry trends</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Join Us Today!</h2>
        <p className="text-lg text-gray-600 mb-6">
          Start preparing for your next big interview with LWS. Whether you're aiming for your first job or preparing for senior-level positions, we've got you covered.
        </p>
        <a href="/" className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700">
          Get Started
        </a>
      </div>
    </div>
  );
};



export default page