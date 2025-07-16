'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { generateAILoveNote } from '@/utils/loveNotes';
import { PartnerInfo, QuizResult } from '@/types/quiz';

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const [detailedNote, setDetailedNote] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (sessionId) {
      // In a real app, you'd fetch the session details from your backend
      // For now, we'll use localStorage to get the quiz data
      const storedPartnerInfo = localStorage.getItem('partnerInfo');
      const storedQuizResult = localStorage.getItem('quizResult');
      
      if (storedPartnerInfo && storedQuizResult) {
        const partnerInfo: PartnerInfo = JSON.parse(storedPartnerInfo);
        const quizResult: QuizResult = JSON.parse(storedQuizResult);
        
        // Generate AI-powered detailed love note
        generateAILoveNote(partnerInfo, quizResult, true)
          .then(detailed => {
            setDetailedNote(detailed);
            setLoading(false);
          })
          .catch(error => {
            console.error('Error generating detailed note:', error);
            setDetailedNote('Sorry, there was an error generating your detailed love note. Please contact support.');
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    }
  }, [searchParams]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Generating your detailed love note...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              🎉 Payment Successful!
            </h1>
            <p className="text-gray-600">
              Your detailed love note and analysis is ready!
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              💖 Your Detailed Love Note & Analysis
            </h2>
            
            <div className="bg-pink-50 p-6 rounded-lg border-2 border-pink-200 mb-6">
              <pre className="text-gray-700 leading-relaxed whitespace-pre-wrap font-sans">
                {detailedNote}
              </pre>
            </div>

            <div className="text-center space-y-4">
              <p className="text-sm text-pink-600 font-medium">
                📱 This message is perfect for sharing with your partner!
              </p>
              
              <div className="flex space-x-4 justify-center">
                <button
                  onClick={() => navigator.clipboard.writeText(detailedNote)}
                  className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors duration-200"
                >
                  📋 Copy to Clipboard
                </button>
                
                <button
                  onClick={() => window.print()}
                  className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors duration-200"
                >
                  🖨️ Print
                </button>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => window.location.href = '/'}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                >
                  ← Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </main>
    }>
      <SuccessPageContent />
    </Suspense>
  );
}