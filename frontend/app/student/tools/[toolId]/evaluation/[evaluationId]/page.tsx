'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface Question {
  id: string;
  text: string;
  type: 'rating';
}

export default function EvaluationPage() {
  const params = useParams();
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const toolName = "Web Development";
  const totalQuestions = 15;
  const timeRemaining = 7;
  const progress = (currentQuestion / totalQuestions) * 100;

  const questions: Question[] = Array.from({ length: totalQuestions }, (_, i) => ({
    id: `q${i + 1}`,
    text: 'How would you rate this?',
    type: 'rating' as const,
  }));

  const ratings = [
    { value: 1, label: 'Very Poor', icon: '😟', score: '1/5' },
    { value: 2, label: 'Poor', icon: '🙁', score: '2/5' },
    { value: 3, label: 'Average', icon: '😐', score: '3/5' },
    { value: 4, label: 'Good', icon: '🙂', score: '4/5' },
    { value: 5, label: 'Excellent', icon: '⭐', score: '5/5' },
  ];

  const handleRatingClick = (value: number) => {
    setSelectedRating(value);
    setAnswers({ ...answers, [currentQuestion]: value });

    setTimeout(() => {
      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedRating(answers[currentQuestion + 1] || null);
      }
    }, 300);
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedRating(answers[currentQuestion - 1] || null);
    }
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedRating(answers[currentQuestion + 1] || null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {toolName}
              </h1>
              <p className="text-sm text-gray-500">{Math.round(progress)}% Complete</p>
            </div>
            <div className="text-right">
              <div className="text-2xl md:text-3xl font-bold text-gray-900">
                {currentQuestion + 1}/{totalQuestions}
              </div>
              <p className="text-sm text-gray-500">~{timeRemaining} min remaining</p>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-teal-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 text-center mb-8">
            {questions[currentQuestion].text}
          </h2>

          <div className="grid grid-cols-2 gap-4 mb-8 max-w-lg mx-auto">
            {ratings.slice(0, 4).map((rating) => (
              <button
                key={rating.value}
                onClick={() => handleRatingClick(rating.value)}
                className={`
                  relative p-6 rounded-2xl border-2 transition-all duration-200
                  hover:border-gray-300 hover:shadow-md
                  ${selectedRating === rating.value
                    ? 'border-teal-500 bg-teal-50'
                    : 'border-gray-200 bg-white'
                  }
                `}
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className="text-4xl">
                    {rating.icon === '😟' && (
                      <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                        <path strokeLinecap="round" strokeWidth="2" d="M8 15c1 1 4 1 8 0M9 9h.01M15 9h.01"/>
                      </svg>
                    )}
                    {rating.icon === '🙁' && (
                      <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                        <path strokeLinecap="round" strokeWidth="2" d="M8 15c.5.5 2 1 4 1s3.5-.5 4-1M9 9h.01M15 9h.01"/>
                      </svg>
                    )}
                    {rating.icon === '😐' && (
                      <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                        <path strokeLinecap="round" strokeWidth="2" d="M8 15h8M9 9h.01M15 9h.01"/>
                      </svg>
                    )}
                    {rating.icon === '🙂' && (
                      <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                        <path strokeLinecap="round" strokeWidth="2" d="M8 14c1 1 4 2 8 0M9 9h.01M15 9h.01"/>
                      </svg>
                    )}
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-gray-700">{rating.label}</div>
                    <div className="text-sm text-gray-400">{rating.score}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-center mb-8">
            <button
              onClick={() => handleRatingClick(5)}
              className={`
                relative p-6 rounded-2xl border-2 transition-all duration-200 w-full max-w-[calc(50%-0.5rem)]
                hover:border-gray-300 hover:shadow-md
                ${selectedRating === 5
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-gray-200 bg-white'
                }
              `}
            >
              <div className="flex flex-col items-center space-y-3">
                <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                <div className="text-center">
                  <div className="font-medium text-gray-700">Excellent</div>
                  <div className="text-sm text-gray-400">5/5</div>
                </div>
              </div>
            </button>
          </div>

          <div className="flex items-center justify-between mb-6">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2 px-4 py-2 text-gray-400 disabled:opacity-30 disabled:cursor-not-allowed hover:text-gray-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Previous</span>
            </button>

            <div className="flex gap-1">
              {Array.from({ length: totalQuestions }).map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentQuestion
                      ? 'w-8 bg-teal-500'
                      : idx < currentQuestion
                      ? 'w-2 bg-teal-500'
                      : 'w-2 bg-gray-200'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={currentQuestion === totalQuestions - 1}
              className="flex items-center gap-2 px-4 py-2 text-gray-400 disabled:opacity-30 disabled:cursor-not-allowed hover:text-gray-600 transition-colors"
            >
              <span>Next</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <p className="text-center text-sm text-gray-500">
            Press a rating to automatically continue to the next question
          </p>
        </div>
      </div>
    </div>
  );
}
