'use client';

import { useState } from 'react';
import stripePromise from '@/lib/stripe';
import { PartnerInfo, QuizResult } from '@/types/quiz';

interface PaymentButtonProps {
  partnerInfo: PartnerInfo;
  quizResult: QuizResult;
  onPaymentSuccess?: (sessionId: string) => void;
}

export default function PaymentButton({ partnerInfo, quizResult, onPaymentSuccess }: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      // Store data in localStorage for the success page
      localStorage.setItem('partnerInfo', JSON.stringify(partnerInfo));
      localStorage.setItem('quizResult', JSON.stringify(quizResult));

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

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId } = await response.json();
      
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe failed to initialize. Please check your configuration.');
      }

      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        console.error('Stripe checkout error:', error);
        alert('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 px-8 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
    >
      {loading ? (
        <span className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </span>
      ) : (
        <>
          💕 Get Detailed Love Note + Analysis - $1.99
        </>
      )}
    </button>
  );
}