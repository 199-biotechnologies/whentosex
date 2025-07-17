'use client';

import { QuizResult as QuizResultType, QuizCategory, PartnerInfo } from '@/types/quiz';
import { generateAILoveNote } from '@/utils/loveNotes';
import { useState } from 'react';

interface QuizResultProps {
  result: QuizResultType;
  partnerInfo: PartnerInfo;
  onRestart: () => void;
}

export default function QuizResult({ result, partnerInfo, onRestart }: QuizResultProps) {
  const [detailedNote, setDetailedNote] = useState<string>('');
  const [isGeneratingDetailed, setIsGeneratingDetailed] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const handleGenerateDetailed = async () => {
    setIsGeneratingDetailed(true);
    try {
      const detailed = await generateAILoveNote(partnerInfo, result, true);
      setDetailedNote(detailed);
    } catch (error) {
      console.error('Error generating detailed note:', error);
      alert('Sorry, there was an error generating your detailed note. Please try again.');
    } finally {
      setIsGeneratingDetailed(false);
    }
  };

  const handlePayment = async () => {
    setIsProcessingPayment(true);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          partnerName: partnerInfo.partnerName,
          relationshipType: partnerInfo.relationshipType,
        }),
      });

      const data = await response.json();
      
      if (response.ok && data.url) {
        // Redirect to Stripe checkout
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'Failed to create payment session');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Sorry, there was an error processing your payment. Please try again.');
    } finally {
      setIsProcessingPayment(false);
    }
  };

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
    <div className="max-w-2xl mx-auto p-6 sm:p-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50/30 via-white/50 to-purple-50/30 animate-pulse"></div>
      
      <div className="relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full mb-4 sm:mb-6 shadow-lg">
            <span className="text-sm font-bold">🎉 Your Results</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6 sm:mb-8">
            Perfect Timing Score
          </h2>
          <div className={`text-5xl sm:text-6xl lg:text-7xl font-black mb-6 sm:mb-8 ${getScoreColor(result.score)}`}>
            {result.score}%
          </div>
          <div className={`p-6 sm:p-8 rounded-2xl border-2 backdrop-blur-sm ${getCategoryColor(result.category)}`}>
            <p className="text-base sm:text-lg font-medium leading-relaxed whitespace-pre-line">
              {result.recommendation}
            </p>
          </div>
        </div>

        <div className="mb-8 sm:mb-12">
          <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6 sm:mb-8 text-center">
            🔍 Factor Breakdown
          </h3>
          <div className="space-y-4 sm:space-y-6">
            {Object.entries(result.factors).map(([category, score]) => (
              <div key={category} className="bg-white/60 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-white/30 shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-800 font-semibold text-base sm:text-lg">
                    {categoryNames[category as QuizCategory]}
                  </span>
                  <span className={`text-lg sm:text-xl font-black ${
                    score >= 80 ? 'text-green-600' : 
                    score >= 60 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {Math.round(score)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200/50 rounded-full h-3 sm:h-4 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-700 ease-out ${
                      score >= 80 ? 'bg-gradient-to-r from-green-500 to-green-600' : 
                      score >= 60 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' : 'bg-gradient-to-r from-red-500 to-red-600'
                    }`}
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {result.loveNote && (
          <div className="mb-8 sm:mb-12">
            <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-6 sm:mb-8 text-center">
              💕 Your Personalized Love Note
            </h3>
            <div className="bg-gradient-to-br from-pink-50/80 to-purple-50/80 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border-2 border-pink-200/50 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-100/20 to-purple-100/20 animate-pulse"></div>
              <div className="relative z-10">
                <p className="text-gray-800 leading-relaxed whitespace-pre-line text-base sm:text-lg font-medium">
                  {result.loveNote}
                </p>
                <div className="mt-6 pt-6 border-t border-pink-300/50">
                  <div className="flex items-center justify-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-3 border border-pink-200/50">
                    <span className="text-2xl">💝</span>
                    <p className="text-sm text-pink-700 font-bold">
                      Copy this message and send it to {partnerInfo.partnerName}!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mb-8 sm:mb-12 bg-gradient-to-br from-purple-50/80 to-pink-50/80 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border-2 border-purple-200/50 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 to-pink-100/20 animate-pulse"></div>
          <div className="relative z-10">
            <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 sm:mb-8 text-center">
              🌟 Want More?
            </h3>
            <div className="text-center mb-6 sm:mb-8">
              <p className="text-gray-800 mb-4 sm:mb-6 text-base sm:text-lg font-medium">
                Get a detailed AI-generated love note with complete relationship analysis - Only $1.99!
              </p>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/30">
                <ul className="text-sm sm:text-base text-gray-700 space-y-2 sm:space-y-3 font-medium">
                  <li className="flex items-center justify-center space-x-2">
                    <span className="text-purple-500">✨</span>
                    <span>Longer, more personalized AI-generated love note</span>
                  </li>
                  <li className="flex items-center justify-center space-x-2">
                    <span className="text-pink-500">📊</span>
                    <span>Detailed breakdown of all relationship factors</span>
                  </li>
                  <li className="flex items-center justify-center space-x-2">
                    <span className="text-purple-500">💡</span>
                    <span>Specific improvement suggestions</span>
                  </li>
                  <li className="flex items-center justify-center space-x-2">
                    <span className="text-pink-500">🎯</span>
                    <span>Personalized tips based on {partnerInfo.partnerName}&apos;s interests</span>
                  </li>
                  <li className="flex items-center justify-center space-x-2">
                    <span className="text-purple-500">🧠</span>
                    <span>Psychology-based relationship insights</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {detailedNote ? (
              <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border-2 border-pink-200/50 mb-4 shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-50/30 to-purple-50/30 animate-pulse"></div>
                <div className="relative z-10">
                  <h4 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4 sm:mb-6 text-center">
                    🎯 Your Detailed AI Love Note
                  </h4>
                  <div className="text-gray-800 leading-relaxed whitespace-pre-wrap text-base sm:text-lg font-medium">
                    {detailedNote}
                  </div>
                  <div className="mt-6 pt-6 border-t border-pink-300/50">
                    <div className="flex items-center justify-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-3 border border-pink-200/50">
                      <span className="text-2xl">💖</span>
                      <p className="text-sm text-pink-700 font-bold">
                        Copy this detailed message and send it to {partnerInfo.partnerName}!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={handlePayment}
                disabled={isProcessingPayment}
                className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 text-white py-4 sm:py-5 px-8 rounded-2xl font-bold hover:shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed text-lg sm:text-xl border-2 border-white/20"
              >
                {isProcessingPayment ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Payment...
                  </span>
                ) : (
                  <>
                    💳 Get Detailed AI Love Note - $1.99
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        <div className="text-center space-y-6 sm:space-y-8">
          <button
            onClick={onRestart}
            className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 text-white py-4 sm:py-5 px-8 rounded-2xl font-bold hover:shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 transform hover:-translate-y-1 text-lg sm:text-xl border-2 border-white/20"
          >
            🔄 Take Quiz Again
          </button>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/30 text-sm sm:text-base text-gray-700">
            <p className="mb-3 sm:mb-4 font-semibold">
              <strong>Disclaimer:</strong> This app is for entertainment purposes only.
            </p>
            <p className="leading-relaxed">
              Results are based on psychology research but should not replace professional advice.
              Research sources: Sexual communication correlation studies, circadian rhythm research, 
              stress hormone impacts on sexual function, and relationship satisfaction studies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}