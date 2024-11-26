import React, { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is LWS?",
      answer:
        "LWS is a platform designed to help developers prepare for interviews through mock interview sessions, including coding problems, system design, and behavioral questions.",
    },
    {
      question: "How do I start with a mock interview?",
      answer:
        "To start a mock interview, log in to your account, select a topic (such as Data Structures or System Design), and begin answering questions. Feedback is provided after each interview.",
    },
    {
      question: "Can I get personalized feedback after my mock interview?",
      answer:
        "Yes, after completing each mock interview, you'll receive personalized feedback highlighting your strengths and areas for improvement.",
    },
    {
      question: "How do I share my interview experience?",
      answer:
        "You can share your own interview experience by going to the 'Interview Experience' section and clicking 'Add Experience'. Your experience will be published for others to learn from.",
    },
    {
      question: "What types of courses are offered on LWS?",
      answer:
        "LWS offers a variety of courses focusing on different aspects of interview preparation, including coding, system design, problem-solving, and soft skills for interviews.",
    },
    {
      question: "Are the courses free?",
      answer:
        "We offer both free and premium courses. Free courses include basic tutorials and problems, while premium courses provide in-depth lessons, projects, and additional interview preparation content.",
    },
    {
      question: "How do I access the articles on LWS?",
      answer:
        "To access articles, simply go to the 'Articles' section on the main menu. You'll find resources on coding tips, interview preparation, industry trends, and more.",
    },
    {
      question: "Can I contribute to the articles section?",
      answer:
        "Yes! If you'd like to contribute an article, you can submit it through the 'Submit Article' form in the Articles section. We encourage community-driven content.",
    },
    {
      question: "How do I track my progress in courses?",
      answer:
        "Your progress in each course is automatically tracked and displayed in your 'Dashboard'. You can see your completed modules, scores, and areas where you need improvement.",
    },
    {
      question: "Do you offer interview coaching?",
      answer:
        "Yes, LWS offers personalized coaching sessions with industry experts. These are available as part of the premium membership, where you can schedule 1-on-1 sessions.",
    },
    {
      question: "Can I download course materials?",
      answer:
        "Yes, all premium course materials, including slides, code examples, and practice problems, can be downloaded for offline use.",
    },
  ];

  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle open/close on click
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className=" shadow-md rounded-lg">
            <div
              className="p-4 cursor-pointer flex justify-between items-center  rounded-t-lg hover:bg-gray-900"
              onClick={() => toggleAnswer(index)}
            >
              <h2 className="text-lg font-semibold">{faq.question}</h2>
              <span className="text-xl">{openIndex === index ? "-" : "+"}</span>
            </div>
            {openIndex === index && (
              <div className="p-4  rounded-b-lg">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
