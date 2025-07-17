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
      <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-pink-200/50 shadow-lg mb-4">
              <span className="text-sm font-medium bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">✨ AI-Powered Timing for {partnerInfo.partnerName}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
              When to Sex
            </h1>
            <p className="text-sm sm:text-base text-gray-600 font-medium">
              Science-backed relationship timing
            </p>
          </div>
          <Quiz partnerInfo={partnerInfo} />
        </div>
      </main>
    );
  }

  if (showPartnerForm) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-pink-200/50 shadow-lg mb-4">
              <span className="text-sm font-medium bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">✨ Science meets AI for perfect timing</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
              When to Sex
            </h1>
            <p className="text-sm sm:text-base text-gray-600 font-medium">
              Science-backed relationship timing
            </p>
          </div>
          <PartnerInfoForm onSubmit={handlePartnerInfoSubmit} />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-100/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-lg sm:text-xl font-bold">💕</span>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">When to Sex</h1>
              <span className="text-xs bg-gradient-to-r from-pink-500 to-purple-600 text-white px-2 py-0.5 rounded-full font-medium">AI-Powered</span>
            </div>
          </div>
          <div className="hidden sm:flex space-x-6 text-sm font-medium">
            <a href="#how-it-works" className="text-gray-600 hover:text-pink-600 transition-colors">How It Works</a>
            <a href="#features" className="text-gray-600 hover:text-pink-600 transition-colors">Features</a>
            <a href="/privacy" className="text-gray-600 hover:text-pink-600 transition-colors">Privacy</a>
          </div>
          {/* Mobile menu button */}
          <button className="sm:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="text-center">
          {/* Floating badges */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-pink-200/50 shadow-lg">
              <span className="text-sm font-medium bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">✨ Science meets AI for perfect timing</span>
            </div>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black mb-6 sm:mb-8 leading-[1.1]">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">Stop Guessing.</span>
            <br />
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 bg-clip-text text-transparent">Start Knowing.</span>
          </h2>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            The AI-powered app that reveals your perfect intimate moments using psychology and data ✨
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16">
            <button
              onClick={() => setShowPartnerForm(true)}
              className="w-full sm:w-auto bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 text-white text-lg sm:text-xl font-bold py-4 sm:py-5 px-8 sm:px-12 rounded-2xl hover:shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 transform hover:-translate-y-1 border-2 border-white/20"
            >
              Take the Quiz - FREE 🚀
            </button>
            <div className="flex items-center space-x-2 text-gray-600">
              <span className="text-2xl">💝</span>
              <span className="text-sm sm:text-base font-medium">AI love notes for $1.99</span>
            </div>
          </div>

          {/* Social proof badges */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm font-medium">
            <div className="flex items-center space-x-2 px-3 py-2 bg-white/40 backdrop-blur-sm rounded-full border border-green-200/50">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-700">100% Private</span>
            </div>
            <div className="flex items-center space-x-2 px-3 py-2 bg-white/40 backdrop-blur-sm rounded-full border border-blue-200/50">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-gray-700">Research-Based</span>
            </div>
            <div className="flex items-center space-x-2 px-3 py-2 bg-white/40 backdrop-blur-sm rounded-full border border-purple-200/50">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-gray-700">AI-Powered</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-4xl font-bold text-center text-gray-900 mb-16">
            How It Works
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-b from-pink-50 to-white border border-pink-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl">👫</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">1. Share Your Story</h4>
              <p className="text-gray-700 leading-relaxed">Tell us about your unique relationship dynamic and what makes you both special</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gradient-to-b from-blue-50 to-white border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl">🧠</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">2. Discover Your Timing</h4>
              <p className="text-gray-700 leading-relaxed">Answer 10 research-based questions about your current mood, energy, and connection</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gradient-to-b from-purple-50 to-white border border-purple-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl">💕</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">3. Connect Deeper</h4>
              <p className="text-gray-700 leading-relaxed">Receive personalized timing insights and heartfelt AI-crafted love notes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Why Couples Love Us
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
              <div className="text-pink-600 text-3xl mb-4">📊</div>
              <h4 className="font-semibold text-gray-900 mb-3 text-lg">Research-Backed</h4>
              <p className="text-gray-700 text-sm leading-relaxed">Built on psychology research and circadian rhythm science</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
              <div className="text-pink-600 text-3xl mb-4">🤖</div>
              <h4 className="font-semibold text-gray-900 mb-3 text-lg">AI-Crafted</h4>
              <p className="text-gray-700 text-sm leading-relaxed">Personalized love notes created by advanced GPT-4 technology</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
              <div className="text-pink-600 text-3xl mb-4">🔒</div>
              <h4 className="font-semibold text-gray-900 mb-3 text-lg">100% Private</h4>
              <p className="text-gray-700 text-sm leading-relaxed">Your intimate details stay completely secure and private</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
              <div className="text-pink-600 text-3xl mb-4">⚡</div>
              <h4 className="font-semibold text-gray-900 mb-3 text-lg">Instant Results</h4>
              <p className="text-gray-700 text-sm leading-relaxed">Get personalized insights in under 5 minutes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold text-gray-900 mb-16">
            Join Thousands of Happy Couples
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-b from-gray-50 to-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="text-4xl mb-6">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 italic mb-6 leading-relaxed">"This app transformed our intimacy! We finally understand each other's perfect timing."</p>
              <p className="text-sm text-gray-600 font-medium">- Sarah & Mike</p>
            </div>
            <div className="bg-gradient-to-b from-gray-50 to-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="text-4xl mb-6">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 italic mb-6 leading-relaxed">"The personalized love notes are magical. It's like having a relationship expert in your pocket."</p>
              <p className="text-sm text-gray-600 font-medium">- Jennifer & David</p>
            </div>
            <div className="bg-gradient-to-b from-gray-50 to-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="text-4xl mb-6">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 italic mb-6 leading-relaxed">"Research-backed but so much fun! We take the quiz together every week now."</p>
              <p className="text-sm text-gray-600 font-medium">- Alex & Taylor</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-pink-600 to-purple-600 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold text-white mb-8 leading-tight">
            Ready to Transform Your Relationship?
          </h3>
          <p className="text-xl text-pink-100 mb-10 leading-relaxed">
            Join thousands of couples who've discovered their perfect moments for connection
          </p>
          <button
            onClick={() => setShowPartnerForm(true)}
            className="bg-white text-pink-600 text-xl font-semibold py-4 px-10 rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Start Your Free Quiz Now
          </button>
          <p className="text-pink-100 text-sm mt-6 font-medium">
            No signup required • Results in 5 minutes • Personalized AI love notes for $1.99
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">When to Sex</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                Research-backed intimacy timing for modern couples
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Product</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><a href="#how-it-works" className="hover:text-pink-400 transition-colors">How it Works</a></li>
                <li><a href="#features" className="hover:text-pink-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Legal</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><a href="/privacy" className="hover:text-pink-400 transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-pink-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Research</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><a href="#" className="hover:text-pink-400 transition-colors">Scientific Basis</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Methodology</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Citations</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 When to Sex. All rights reserved. For entertainment purposes only.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
