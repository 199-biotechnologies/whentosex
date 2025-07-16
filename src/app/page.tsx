'use client';

import { useState } from 'react';
import Quiz from '@/components/Quiz';
import PartnerInfoForm from '@/components/PartnerInfoForm';
import { PartnerInfo } from '@/types/quiz';

export default function Home() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [showPartnerForm, setShowPartnerForm] = useState(false);
  const [partnerInfo, setPartnerInfo] = useState<PartnerInfo | null>(null);

  const handlePartnerInfoSubmit = (info: PartnerInfo) => {
    setPartnerInfo(info);
    setShowPartnerForm(false);
    setShowQuiz(true);
  };

  if (showQuiz && partnerInfo) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              When to Sex
            </h1>
            <p className="text-gray-600">
              Science-backed relationship timing for you and {partnerInfo.partnerName}
            </p>
          </div>
          <Quiz partnerInfo={partnerInfo} />
        </div>
      </main>
    );
  }

  if (showPartnerForm) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              When to Sex
            </h1>
            <p className="text-gray-600">
              Science-backed relationship timing
            </p>
          </div>
          <PartnerInfoForm onSubmit={handlePartnerInfoSubmit} />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            When to Sex
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            The scientifically-backed quiz with AI-powered personalized love notes
          </p>
          
          <div className="text-left mb-8 bg-blue-50 p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Based on Psychology Research:
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>• Sexual communication strongly correlates with satisfaction (r = .43)</li>
              <li>• Circadian rhythms affect hormone release and sexual function</li>
              <li>• Stress hormones disrupt natural intimacy patterns</li>
              <li>• Emotional intimacy acts as a precursor to sexual desire</li>
              <li>• Sleep quality impacts libido and energy levels</li>
            </ul>
          </div>

          <div className="text-center mb-8">
            <p className="text-gray-600 mb-4">
              Answer 10 evidence-based questions to get your personalized recommendation and AI-generated love note
            </p>
            <p className="text-sm text-gray-500">
              Results include custom love notes powered by GPT-4, tailored to your relationship
            </p>
          </div>

          <button
            onClick={() => setShowPartnerForm(true)}
            className="bg-pink-500 text-white text-xl font-semibold py-4 px-8 rounded-lg hover:bg-pink-600 transition-colors duration-200 shadow-lg"
          >
            Start the Quiz
          </button>

          <div className="mt-8 text-sm text-gray-500">
            <p>
              <strong>Disclaimer:</strong> This app is for entertainment purposes only. 
              Results are based on psychology research but should not replace professional advice.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
