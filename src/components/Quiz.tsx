'use client';

import { useState, useEffect } from 'react';
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
        
        // Store data in localStorage for payment success page
        localStorage.setItem('partnerInfo', JSON.stringify(partnerInfo));
        localStorage.setItem('quizResult', JSON.stringify(result));
        
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

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(null);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (showResult || isGeneratingNote) return;
      
      // Numbers 1-5 for option selection
      if (e.key >= '1' && e.key <= '5') {
        const optionIndex = parseInt(e.key) - 1;
        if (optionIndex < currentQuestion.options.length) {
          const optionValue = currentQuestion.options[optionIndex].value;
          handleOptionSelect(optionValue);
        }
      }
      
      // Enter to proceed to next question
      if (e.key === 'Enter' && selectedOption !== null) {
        handleNext();
      }
      
      // Backspace to go to previous question
      if (e.key === 'Backspace' && currentQuestionIndex > 0) {
        e.preventDefault();
        handlePrevious();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedOption, currentQuestionIndex, showResult, isGeneratingNote, currentQuestion.options, handleNext]);

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
      <div className="max-w-2xl mx-auto p-6 sm:p-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 via-purple-50/50 to-pink-50/50 animate-pulse"></div>
        
        <div className="relative z-10 text-center">
          {/* Modern spinner */}
          <div className="relative mx-auto mb-8 w-20 h-20">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-pink-500 border-r-purple-500 animate-spin"></div>
            <div className="absolute inset-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
              <span className="text-2xl">✨</span>
            </div>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            Crafting Your Love Note ✨
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6 font-medium">
            Our AI is creating the perfect message for <span className="font-bold text-pink-600">{partnerInfo.partnerName}</span>...
          </p>
          
          {/* Modern loading dots */}
          <div className="flex justify-center space-x-2 mb-6">
            <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full animate-bounce delay-100"></div>
            <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full animate-bounce delay-200"></div>
          </div>
          
          <div className="text-sm text-gray-500 font-medium">
            This usually takes 10-15 seconds...
          </div>
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
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="order-2 sm:order-1 px-6 py-3 text-gray-600 hover:text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 font-medium rounded-2xl hover:bg-gray-50"
          >
            ← Previous
          </button>
          
          <button
            onClick={handleNext}
            disabled={selectedOption === null}
            className="order-1 sm:order-2 w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl hover:shadow-2xl hover:shadow-pink-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-300 font-bold text-lg transform hover:-translate-y-0.5 disabled:transform-none"
          >
            {isLastQuestion ? 'Get Results 🎉' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
}