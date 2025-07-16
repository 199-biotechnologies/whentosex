'use client';

import { useState } from 'react';
import { quizQuestions } from '@/data/questions';
import { QuizResponse, PartnerInfo } from '@/types/quiz';
import { calculateQuizResult } from '@/utils/scoring';
import { generateAILoveNote } from '@/utils/loveNotes';
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
  const [isGeneratingNote, setIsGeneratingNote] = useState(false);
  const [aiLoveNote, setAiLoveNote] = useState<string>('');

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;

  const handleOptionSelect = (value: number) => {
    setSelectedOption(value);
  };

  const handleNext = async () => {
    if (selectedOption === null) return;

    const newResponse: QuizResponse = {
      questionId: currentQuestion.id,
      selectedOption,
      category: currentQuestion.category
    };

    const newResponses = [...responses, newResponse];
    setResponses(newResponses);

    if (isLastQuestion) {
      setIsGeneratingNote(true);
      try {
        const result = calculateQuizResult(newResponses, partnerInfo);
        const aiNote = await generateAILoveNote(partnerInfo, result, false);
        setAiLoveNote(aiNote);
      } catch (error) {
        console.error('Error generating AI love note:', error);
        // Will fall back to static generation in the result component
      }
      setIsGeneratingNote(false);
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
    setAiLoveNote('');
  };

  if (showResult) {
    const result = calculateQuizResult(responses, partnerInfo);
    if (aiLoveNote) {
      result.loveNote = aiLoveNote;
    }
    return <QuizResult result={result} partnerInfo={partnerInfo} onRestart={handleRestart} />;
  }

  if (isGeneratingNote) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Creating Your Personalized Love Note
          </h2>
          <p className="text-gray-600">
            Our AI is crafting the perfect message for {partnerInfo.partnerName}...
          </p>
        </div>
      </div>
    );
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