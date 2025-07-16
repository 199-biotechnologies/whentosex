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
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-gray-500">
            Question {questionNumber} of {totalQuestions}
          </span>
          <div className="w-48 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {question.question}
        </h2>
        <p className="text-sm text-gray-600 italic">
          Research basis: {question.researchBasis}
        </p>
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onOptionSelect(option.value)}
            className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
              selectedOption === option.value
                ? 'border-pink-500 bg-pink-50 text-pink-800'
                : 'border-gray-200 hover:border-pink-300 hover:bg-pink-25'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-lg">{option.text}</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">
                  {option.value}/5
                </span>
                {selectedOption === option.value && (
                  <div className="w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}