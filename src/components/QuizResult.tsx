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
            Get a detailed AI-generated love note with complete relationship analysis - Only $1.99!
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Longer, more personalized AI-generated love note</li>
            <li>• Detailed breakdown of all relationship factors</li>
            <li>• Specific improvement suggestions</li>
            <li>• Personalized tips based on {partnerInfo.partnerName}&apos;s interests</li>
            <li>• Psychology-based relationship insights</li>
          </ul>
        </div>
        
        {detailedNote ? (
          <div className="bg-white p-6 rounded-lg border-2 border-pink-200 mb-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              🎯 Your Detailed AI Love Note
            </h4>
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {detailedNote}
            </div>
            <div className="mt-4 pt-4 border-t border-pink-200">
              <p className="text-sm text-pink-600 font-medium">
                💖 Copy this detailed message and send it to {partnerInfo.partnerName}!
              </p>
            </div>
          </div>
        ) : (
          <button
            onClick={handlePayment}
            disabled={isProcessingPayment}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 px-8 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
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