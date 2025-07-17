'use client';

import { QuizQuestion as QuizQuestionType } from '@/types/quiz';

interface QuizQuestionProps {
  question: QuizQuestionType;
  selectedOption: number | null;
  onOptionSelect: (value: number) => void;
  questionNumber: number;
  totalQuestions: number;
}

export default function QuizQuestion({
  question,
  selectedOption,
  onOptionSelect,
  questionNumber,
  totalQuestions
}: QuizQuestionProps) {
  return (
    <div className="max-w-2xl mx-auto p-6 sm:p-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 via-white/50 to-purple-50/50 animate-pulse"></div>
      
      <div className="relative z-10">
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <span className="text-xs sm:text-sm font-bold bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1 rounded-full">
                {questionNumber}/{totalQuestions}
              </span>
              <span className="text-sm text-gray-600 font-medium">Question</span>
            </div>
            <div className="w-full sm:w-32 lg:w-48 bg-gray-200 rounded-full h-3 shadow-inner">
              <div 
                className="bg-gradient-to-r from-pink-500 to-purple-600 h-3 rounded-full transition-all duration-500 shadow-lg"
                style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
              />
            </div>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 mb-3 sm:mb-4 leading-tight">
            {question.question}
          </h2>
          <div className="inline-flex items-center px-3 py-1 bg-blue-50 rounded-full border border-blue-200">
            <span className="text-xs sm:text-sm text-blue-700 font-medium">
              🧠 {question.researchBasis}
            </span>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => onOptionSelect(option.value)}
              className={`w-full p-4 sm:p-5 text-left rounded-2xl border-2 transition-all duration-300 transform ${
                selectedOption === option.value
                  ? 'border-transparent bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-2xl shadow-pink-500/25 scale-[1.02]'
                  : 'border-gray-200/50 bg-white/60 backdrop-blur-sm hover:border-pink-300 hover:bg-white/80 hover:shadow-lg hover:scale-[1.01]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center text-sm sm:text-base font-bold transition-all duration-300 ${
                    selectedOption === option.value
                      ? 'bg-white/20 text-white'
                      : 'bg-gradient-to-br from-pink-100 to-purple-100 text-gray-700'
                  }`}>
                    {index + 1}
                  </div>
                  <span className={`text-base sm:text-lg font-medium leading-relaxed ${
                    selectedOption === option.value ? 'text-white' : 'text-gray-800'
                  }`}>
                    {option.text}
                  </span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <span className={`text-xs sm:text-sm font-bold px-2 py-1 rounded-full ${
                    selectedOption === option.value
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {option.value}/5
                  </span>
                  {selectedOption === option.value && (
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center animate-pulse">
                      <svg className="w-4 h-4 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
        
        <div className="mt-6 sm:mt-8 p-4 bg-gray-50/80 backdrop-blur-sm rounded-2xl border border-gray-200/50">
          <p className="text-xs sm:text-sm text-gray-600 text-center font-medium">
            ⚡ Pro tip: Use <kbd className="px-2 py-1 bg-white rounded-lg shadow text-xs font-bold">1-5</kbd> to select, <kbd className="px-2 py-1 bg-white rounded-lg shadow text-xs font-bold">Enter</kbd> to continue, <kbd className="px-2 py-1 bg-white rounded-lg shadow text-xs font-bold">←</kbd> to go back
          </p>
        </div>
      </div>
    </div>
  );
}