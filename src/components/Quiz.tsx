'use client';

import { useState } from 'react';
import { quizQuestions } from '@/data/questions';
import { QuizResponse, PartnerInfo } from '@/types/quiz';
import { calculateQuizResult } from '@/utils/scoring';
import QuizQuestion from './QuizQuestion';
import QuizResult from './QuizResult';

interface QuizProps {
  partnerInfo: PartnerInfo;
}

export default function Quiz({ partnerInfo }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<QuizResponse[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;

  const handleOptionSelect = (value: number) => {
    setSelectedOption(value);
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    const newResponse: QuizResponse = {
      questionId: currentQuestion.id,
      selectedOption,
      category: currentQuestion.category
    };

    const newResponses = [...responses, newResponse];
    setResponses(newResponses);

    if (isLastQuestion) {
      setShowResult(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setResponses([]);
    setShowResult(false);
    setSelectedOption(null);
  };

  if (showResult) {
    const result = calculateQuizResult(responses, partnerInfo);
    return <QuizResult result={result} partnerInfo={partnerInfo} onRestart={handleRestart} />;
  }

  return (
    <div className="space-y-6">
      <QuizQuestion
        question={currentQuestion}
        selectedOption={selectedOption}
        onOptionSelect={handleOptionSelect}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={quizQuestions.length}
      />
      
      <div className="max-w-2xl mx-auto px-6">
        <div className="flex justify-between">
          <button
            onClick={() => {
              setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1));
              setSelectedOption(null);
            }}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <button
            onClick={handleNext}
            disabled={selectedOption === null}
            className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isLastQuestion ? 'Get Results' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}