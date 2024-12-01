/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from 'next/image';
import React from 'react';

type Props = {};

const reviews = [
  {
    name: "Alice Johnson",
    avatar: "https://www.bhaktvatsal.com/public/uploads/13cae36fac5764844be2f3719326c112.webp",
    profession: "Software Engineer",
    comment: "This course helped me advance my skills significantly. Highly recommended!",
    rating: 5,
  },
  {
    name: "Bob Smith",
    avatar: "https://www.bhaktvatsal.com/public/uploads/13cae36fac5764844be2f3719326c112.webp",
    profession: "Data Scientist",
    comment: "The material was well-structured, and the instructor was knowledgeable.",
    rating: 5,
  },
  {
    name: "Charlie Brown",
    avatar: "https://www.bhaktvatsal.com/public/uploads/13cae36fac5764844be2f3719326c112.webp",
    profession: "Product Manager",
    comment: "I learned a lot and the projects were very engaging!",
    rating: 5,
  },
  {
    name: "Diana Prince",
    avatar: "https://www.bhaktvatsal.com/public/uploads/13cae36fac5764844be2f3719326c112.webp",
    profession: "UX Designer",
    comment: "Great course! The examples were very relatable to real-world scenarios.",
    rating: 5,
  },
  {
    name: "Ethan Hunt",
    avatar: "https://www.bhaktvatsal.com/public/uploads/13cae36fac5764844be2f3719326c112.webp",
    profession: "Full Stack Developer",
    comment: "The course content was fantastic. I feel much more confident now!",
    rating: 5,
  },
  {
    name: "Fiona Green",
    avatar: "https://www.bhaktvatsal.com/public/uploads/13cae36fac5764844be2f3719326c112.webp",
    profession: "DevOps Engineer",
    comment: "Excellent course with hands-on projects. I loved every minute!",
    rating: 5,
  },
  {
    name: "George Lucas",
    avatar: "https://www.bhaktvatsal.com/public/uploads/13cae36fac5764844be2f3719326c112.webp",
    profession: "Web Developer",
    comment: "A solid foundation for anyone looking to get into this field.",
    rating: 5,
  },
  {
    name: "Hannah Montana",
    avatar: "https://www.bhaktvatsal.com/public/uploads/13cae36fac5764844be2f3719326c112.webp",
    profession: "Data Analyst",
    comment: "The pacing of the course was perfect, and the support was great!",
    rating: 5,
  },
  {
    name: "Ian Malcolm",
    avatar: "https://www.bhaktvatsal.com/public/uploads/13cae36fac5764844be2f3719326c112.webp",
    profession: "Software Architect",
    comment: "Loved the project-based learning approach. Very practical!",
    rating: 5,
  },
  {
    name: "Jane Doe",
    avatar: "https://www.bhaktvatsal.com/public/uploads/13cae36fac5764844be2f3719326c112.webp",
    profession: "Machine Learning Engineer",
    comment: "This course exceeded my expectations. I would definitely recommend it!",
    rating: 5,
  },
];

const Reviews = (props: Props) => {
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <svg
          key={index}
          className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.288 3.964a1 1 0 00.95.69h4.17c.969 0 1.371 1.24.588 1.81l-3.374 2.455a1 1 0 00-.364 1.118l1.288 3.965c.3.92-.755 1.688-1.538 1.117L10 13.011l-3.374 2.455c-.783.57-1.837-.197-1.538-1.117l1.288-3.965a1 1 0 00-.364-1.118L2.638 9.39c-.783-.57-.38-1.81.588-1.81h4.17a1 1 0 00.95-.69l1.288-3.964z" />
        </svg>
      ));
  };

  return (
    <div className="w-[90%] 800px:w-[85%] mx-auto my-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="relative w-full p-6 bg-white rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="flex items-center mb-4">
              <img
                className="w-14 h-14 rounded-full border-2 border-blue-500 shadow-sm"
                src={review.avatar}
                alt="Avatar"
               // Specify height
            
              />
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800">{review.name}</h3>
                <p className="text-sm text-blue-500">{review.profession}</p>
              </div>
            </div>
            <div className="flex mb-2">{renderStars(review.rating)}</div>
            <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Reviews;