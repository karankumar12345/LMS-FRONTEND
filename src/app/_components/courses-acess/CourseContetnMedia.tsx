import CoursesPlayer from '@/app/AdminDashBoard/_components/CoursesPlayer';
import React, { useState, ReactNode, useEffect } from 'react';
import { useAddQuestionMutation, useAddReplyMutation, useAddReviewMutation } from '../../../../redux/features/courses/coursesapi';
import toast from 'react-hot-toast';
import axios from 'axios';

type VideoLink = {
    title: string;
    url: string;
};

type Reply = {
    userId: string; // Assuming you want to track who replied
    content: string;
};

type Question = {
    [x: string]: any;
    _id: string; // Added ID for question
    question: string;
    answer: string;
    replies: Reply[]; // Adding replies to the question
};

type Subtitle = {
    description: string;
    videoUrl: string;
    links: VideoLink[];
};

type CourseSection = {
    title: ReactNode;
    questions: Question[]; // Updated to use the new Question type
    description: string;
    subtitles: Subtitle[];
    reviews: { user: string; comment: string; rating: number; _id: string; commentReplies: Reply[] }[]; // Array to store reviews with replies
};

type CourseData = {
    courseData: CourseSection[];
};

type Props = {
    data: CourseData;
    id: string;
    activeVideo: number;
    setActiveVideo: (activeVideo: number) => void;
    activeSubtitle: number;
    setActiveSubtitle: (activeSubtitle: number) => void;
    activeSection: number;
    setActiveSection: (activeSection: number) => void;
};

const CourseContentMedia: React.FC<Props> = ({
    data,
    id,
    activeVideo,
    setActiveVideo,
    activeSubtitle,
    setActiveSubtitle,
    activeSection,
    setActiveSection,
}) => {
    const [addQuestion, { isLoading: isLoadingQuestion, isSuccess: isSuccessQuestion, error: questionError }] = useAddQuestionMutation();
    const [addReply, { isLoading: isLoadingReply, isSuccess: isSuccessReply, error: replyError }] = useAddReplyMutation();
const [addReview] =useAddReviewMutation()
    
    useEffect(() => {
        if (isSuccessQuestion) {
            toast.success("Question added successfully");
        }
        if (isSuccessReply) {
            toast.success("Reply added successfully");
        }
        if (questionError) {
            toast.error("Failed to add question");
        }
        if (replyError) {
            toast.error("Failed to add reply");
        }
    }, [isSuccessQuestion, isSuccessReply, questionError, replyError]);

    const [activeTab, setActiveTab] = useState('Overview');
    const [newQuestion, setNewQuestion] = useState('');
    const [newReply, setNewReply] = useState('');
    const [newReview, setNewReview] = useState(''); // New state for the review input
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number | null>(null);
    const [newRating, setNewRating] = useState<number>(0);
    const [replyContent, setReplyContent] = useState<{ [key: string]: string }>({});
  

    const tabs = ['Overview', 'Resources', 'Q&A', 'Reviews'];

    if (!data || !data.courseData || data.courseData.length === 0) {
        return <div>No video available.</div>;
    }

    const currentSection = data.courseData[activeSection];
    const subtitles = currentSection?.subtitles || [];
    const currentSubtitle = subtitles[activeSubtitle];
    const currentVideoUrl = currentSubtitle.videoUrl;

    const handleAddQuestion = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addQuestion({
                question: newQuestion,
                courseId: id,
                contentId: currentSection._id,
                userId: "6712649e51279ccf6b9d25a7",
            }).unwrap();
            toast.success("Question added successfully!");
            setNewQuestion('');
        } catch (err) {
            console.error('Failed to add question:', err);
        }
    };

    const handleAddReply = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newReply && selectedQuestionIndex !== null) {
            try {
                await addReply({
                    answer: newReply,
                    courseId: id,
                    contentId: currentSection._id,
                    questionId: currentSection.questions[selectedQuestionIndex]._id,
                    userId: "6712649e51279ccf6b9d25a7",
                }).unwrap();
                toast.success("Reply added successfully!")
                setNewReply('');
                setSelectedQuestionIndex(null);
            } catch (err) {
                console.error('Failed to add reply:', err);
            }
        }
    };
    const handleAddReview = async () => {
        if (!newReview || !newRating) {
            return alert("Please provide both a review and a rating.");
        }
    
        const data={
            courseId: id, // Pass the actual `courseId` here
            review: newReview,
            rating: newRating,
        }
        try {
            const response = await addReview(data).unwrap();
    
            console.log("Review added successfully:", response);
            toast.success("Review added successfully!");
        } catch (error) {
            console.error("Failed to add review:", error);
            alert("Failed to add review. Please try again.");
        }
    };
    

    const handlePrevious = () => {
        if (activeSubtitle > 0) {
            setActiveSubtitle(activeSubtitle - 1);
            setActiveVideo(0);
        } else if (activeSection > 0) {
            const previousSection = data.courseData[activeSection - 1];
            const lastSubtitleIndex = previousSection.subtitles.length - 1;

            setActiveSection(activeSection - 1);
            setActiveSubtitle(lastSubtitleIndex);
            setActiveVideo(0);
        }
    };

    const handleNext = () => {
        if (activeSubtitle < subtitles.length - 1) {
            setActiveSubtitle(activeSubtitle + 1);
            setActiveVideo(0);
        } else if (activeSection < data.courseData.length - 1) {
            setActiveSection(activeSection + 1);
            setActiveSubtitle(0);
            setActiveVideo(0);
        }
    };

    const renderActiveTabContent = () => {
        switch (activeTab) {
            case 'Overview':
                return (
                    <div>
                        <h1>{currentSection?.description}</h1>
                        <h2>{currentSubtitle?.description}</h2>
                    </div>
                );
            case 'Resources':
                return (
                    <div className="p-4 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">All Resources for title-{currentSection.title}</h2>
                        <div className="space-y-4">
                            {currentSubtitle.links.map((link, index) => (
                                <div key={index} className="p-4 border border-gray-300 rounded-lg shadow-md">
                                    <h3 className="text-lg font-medium text-gray-800 mb-2">📘 {link.title}</h3>
                                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">
                                        Open Resource
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'Q&A':
                return (
                    <div className="p-4  rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Q&A</h2>
                        <div className="space-y-4">
                            {currentSection.questions.length > 0 ? (
                                currentSection.questions.map((item, index) => (
                                    <div key={index} className="p-4 border border-gray-300 rounded-lg  shadow-md">
                                        <h3 className="font-medium text-gray-800">Q: {item.question}</h3>
                                        <p className="mt-2 text-gray-600">A: {item.answer}</p>
                                        <button
                                            onClick={() => {
                                                setSelectedQuestionIndex(index);
                                                setNewReply('');
                                            }}
                                            className="text-blue-500 mt-2"
                                        >
                                            Reply
                                        </button>
                                        {selectedQuestionIndex === index && (
                                            <form onSubmit={handleAddReply} className="mt-2">
                                                <input
                                                    type="text"
                                                    placeholder="Type your reply here..."
                                                    value={newReply}
                                                    onChange={(e) => setNewReply(e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                                />
                                                <button
                                                    type="submit"
                                                    className={`mt-2 px-4 py-2 rounded-lg hover:bg-blue-600 ${isLoadingReply ? 'bg-gray-400' : 'bg-blue-500 text-white'}`}
                                                    disabled={isLoadingReply}
                                                >
                                                    {isLoadingReply ? 'Submitting...' : 'Submit Reply'}
                                                </button>
                                                {replyError && <p className="text-red-500">{replyError.message}</p>}
                                            </form>
                                        )}
                                        {item?.questionReplies && item?.questionReplies.length > 0 && (
                                            <div className="mt-2 pl-4 border-l-2 border-gray-300">
                                                <h4 className="font-semibold">Replies:</h4>
                                                {item?.questionReplies.map((reply, replyIndex) => (
                                                    <p key={replyIndex} className="text-gray-600">- {reply.answer}</p>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p>No questions yet. Be the first to ask!</p>
                            )}
                            <form onSubmit={handleAddQuestion} className="mt-4">
                                <input
                                    type="text"
                                    placeholder="Ask a question..."
                                    value={newQuestion}
                                    onChange={(e) => setNewQuestion(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                />
                                <button
                                    type="submit"
                                    className={`mt-2 px-4 py-2 rounded-lg hover:bg-blue-600 ${isLoadingQuestion ? 'bg-gray-900' : 'bg-blue-500 text-white'}`}
                                    disabled={isLoadingQuestion}
                                >
                                    {isLoadingQuestion ? 'Submitting...' : 'Add Question'}
                                </button>
                                {questionError && <p className="text-red-500">{questionError.message}</p>}
                            </form>
                        </div>
                    </div>
                );
                case 'Reviews':
                    return (
                        <div className="p-4  rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold mb-4 text-gray-700">Reviews</h2>
                            <div className="space-y-4">
                                {data?.reviews?.length > 0 ? (
                                    data?.reviews?.map((review) => (
                                        <div key={review._id} className="p-4 border border-gray-300 rounded-lg  shadow-md">
                                            <h3 className="font-medium text-gray-800">{review.user}</h3>
                                            <p className="text-gray-600">{review.comment}</p>
                                            <p className="text-gray-600">Rating: {review.rating} ⭐</p>
                                            {review.commentReplies.length > 0 && (
                                                <div className="mt-2 pl-4 border-l-2 border-gray-300">
                                                    <h4 className="font-semibold">Replies:</h4>
                                                    {review.commentReplies.map((reply, replyIndex) => (
                                                        <p key={replyIndex} className="text-gray-600">- {reply.content}</p>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <p>No reviews yet. Be the first to review!</p>
                                )}
                                <div className="mt-4 flex items-center">
                                    <i className="fa fa-pencil-alt text-blue-500 mr-2" aria-hidden="true"></i>
                                    <input
                                        type="text"
                                        placeholder="Write a review..."
                                        value={newReview}
                                        onChange={(e) => setNewReview(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <input
                                    type="number"
                                    min={1}
                                    max={5}
                                    placeholder="Rating (1-5)"
                                    value={newRating}
                                    onChange={(e) => setNewRating(Number(e.target.value))}
                                    className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                                />
                                <button
                                    onClick={handleAddReview}
                                    className="mt-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                                >
                                    Add Review
                                </button>
                            </div>
                        </div>
                    );
                
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col h-full">
            <CoursesPlayer videoUrl={currentVideoUrl}  title='hello'/>
            <div className="flex justify-between mt-4">
                <button onClick={handlePrevious} className=" px-4 py-2 rounded-lg ">Previous</button>
                <button onClick={handleNext} className=" px-4 py-2 rounded-lg ">Next</button>
            </div>
            <div className="flex space-x-4 mt-4">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-lg ${activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-900 hover:bg-gray-900'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <div className="mt-4">{renderActiveTabContent()}</div>
        </div>
    );
};

export default CourseContentMedia;
