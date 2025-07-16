'use client';

import { QuizResult as QuizResultType, QuizCategory, PartnerInfo } from '@/types/quiz';
import PaymentButton from './PaymentButton';

interface QuizResultProps {
  result: QuizResultType;
  partnerInfo: PartnerInfo;
  onRestart: () => void;
}

export default function QuizResult({ result, partnerInfo, onRestart }: QuizResultProps) {
  const getCategoryColor = (category: 'green' | 'yellow' | 'red') => {
    switch (category) {
      case 'green':
        return 'bg-green-100 border-green-500 text-green-800';
      case 'yellow':
        return 'bg-yellow-100 border-yellow-500 text-yellow-800';
      case 'red':
        return 'bg-red-100 border-red-500 text-red-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const categoryNames: { [key in QuizCategory]: string } = {
    [QuizCategory.COMMUNICATION]: 'Communication',
    [QuizCategory.PHYSICAL_STATE]: 'Physical State',
    [QuizCategory.EMOTIONAL_STATE]: 'Emotional State',
    [QuizCategory.TIMING]: 'Timing',
    [QuizCategory.STRESS]: 'Stress Level',
    [QuizCategory.RELATIONSHIP]: 'Relationship Connection'
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Your Result
        </h2>
        <div className={`text-6xl font-bold mb-4 ${getScoreColor(result.score)}`}>
          {result.score}%
        </div>
        <div className={`p-6 rounded-lg border-2 ${getCategoryColor(result.category)}`}>
          <p className="text-lg font-medium whitespace-pre-line">
            {result.recommendation}
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Factor Breakdown
        </h3>
        <div className="space-y-3">
          {Object.entries(result.factors).map(([category, score]) => (
            <div key={category} className="flex items-center justify-between">
              <span className="text-gray-700">
                {categoryNames[category as QuizCategory]}
              </span>
              <div className="flex items-center space-x-3">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      score >= 80 ? 'bg-green-500' : 
                      score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${score}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-600 w-12">
                  {Math.round(score)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {result.loveNote && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            💕 Your Personalized Love Note
          </h3>
          <div className="bg-pink-50 p-6 rounded-lg border-2 border-pink-200">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {result.loveNote}
            </p>
            <div className="mt-4 pt-4 border-t border-pink-200">
              <p className="text-sm text-pink-600 font-medium">
                💝 Copy this message and send it to {partnerInfo.partnerName}!
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8 bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border-2 border-purple-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          🌟 Want More?
        </h3>
        <div className="text-center mb-4">
          <p className="text-gray-700 mb-2">
            Get a detailed love note with complete relationship analysis!
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Longer, more personalized love note</li>
            <li>• Detailed breakdown of all relationship factors</li>
            <li>• Specific improvement suggestions</li>
            <li>• Personalized tips based on {partnerInfo.partnerName}&apos;s interests</li>
          </ul>
        </div>
        <PaymentButton 
          partnerInfo={partnerInfo} 
          quizResult={result}
          onPaymentSuccess={(sessionId) => {
            console.log('Payment successful:', sessionId);
            // Handle payment success
          }}
        />
      </div>

      <div className="text-center space-y-4">
        <button
          onClick={onRestart}
          className="w-full bg-pink-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-pink-600 transition-colors duration-200"
        >
          Take Quiz Again
        </button>
        
        <div className="text-sm text-gray-600">
          <p className="mb-2">
            <strong>Disclaimer:</strong> This app is for entertainment purposes only. 
            Results are based on psychology research but should not replace professional advice.
          </p>
          <p>
            Research sources: Sexual communication correlation studies, circadian rhythm research, 
            stress hormone impacts on sexual function, and relationship satisfaction studies.
          </p>
        </div>
      </div>
    </div>
  );
}