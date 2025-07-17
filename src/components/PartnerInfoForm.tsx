'use client';

import { useState } from 'react';
import { PartnerInfo } from '@/types/quiz';

interface PartnerInfoFormProps {
  onSubmit: (partnerInfo: PartnerInfo) => void;
}

export default function PartnerInfoForm({ onSubmit }: PartnerInfoFormProps) {
  const [partnerInfo, setPartnerInfo] = useState<PartnerInfo>({
    partnerName: '',
    relationshipType: 'partner',
    relationshipLength: '',
    favoriteThings: '',
    loveLanguage: '',
    scheduleType: 'flexible',
    stressLevel: 'moderate',
    communicationStyle: 'romantic',
    specialOccasions: '',
    userAge: '',
    partnerAge: '',
    livingTogether: false,
    relationshipGoals: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (partnerInfo.partnerName.trim()) {
      onSubmit(partnerInfo);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && partnerInfo.partnerName.trim()) {
      handleSubmit(e);
    }
  };

  const handleChange = (field: keyof PartnerInfo, value: string | boolean) => {
    setPartnerInfo(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50/30 via-white/50 to-purple-50/30 animate-pulse"></div>
      
      <div className="relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full mb-4 sm:mb-6 shadow-lg">
            <span className="text-sm font-bold">✨ Step 1 of 2</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4 sm:mb-6">
            Let's Get Personal 💕
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-medium max-w-2xl mx-auto">
            The more we understand your unique connection, the better we can craft personalized insights and love notes!
          </p>
        </div>

      <form onSubmit={handleSubmit} onKeyPress={handleKeyPress} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-pink-50 p-8 rounded-xl border border-pink-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">👫 Basic Information</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="partnerName" className="block text-sm font-medium text-gray-700 mb-2">
                Partner's Name *
              </label>
              <input
                type="text"
                id="partnerName"
                value={partnerInfo.partnerName}
                onChange={(e) => handleChange('partnerName', e.target.value)}
                placeholder="What do you call your partner?"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
                required
                autoFocus
              />
            </div>

            <div>
              <label htmlFor="relationshipType" className="block text-sm font-medium text-gray-700 mb-2">
                Relationship Type
              </label>
              <select
                id="relationshipType"
                value={partnerInfo.relationshipType}
                onChange={(e) => handleChange('relationshipType', e.target.value as 'wife' | 'girlfriend' | 'partner')}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
              >
                <option value="partner">Partner</option>
                <option value="girlfriend">Girlfriend</option>
                <option value="wife">Wife</option>
              </select>
            </div>

            <div>
              <label htmlFor="relationshipLength" className="block text-sm font-medium text-gray-700 mb-2">
                How long together?
              </label>
              <input
                type="text"
                id="relationshipLength"
                value={partnerInfo.relationshipLength}
                onChange={(e) => handleChange('relationshipLength', e.target.value)}
                placeholder="e.g., 2 years, 6 months, just started dating..."
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Living Together?
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="livingTogether"
                    checked={partnerInfo.livingTogether}
                    onChange={(e) => handleChange('livingTogether', true)}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="livingTogether"
                    checked={!partnerInfo.livingTogether}
                    onChange={(e) => handleChange('livingTogether', false)}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Age Information */}
        <div className="bg-blue-50 p-8 rounded-xl border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">📅 Age Information</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="userAge" className="block text-sm font-medium text-gray-700 mb-2">
                Your Age Range
              </label>
              <select
                id="userAge"
                value={partnerInfo.userAge}
                onChange={(e) => handleChange('userAge', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
              >
                <option value="">Select your age range</option>
                <option value="18-24">18-24</option>
                <option value="25-30">25-30</option>
                <option value="31-35">31-35</option>
                <option value="36-40">36-40</option>
                <option value="41-45">41-45</option>
                <option value="46-50">46-50</option>
                <option value="51+">51+</option>
              </select>
            </div>

            <div>
              <label htmlFor="partnerAge" className="block text-sm font-medium text-gray-700 mb-2">
                Partner's Age Range
              </label>
              <select
                id="partnerAge"
                value={partnerInfo.partnerAge}
                onChange={(e) => handleChange('partnerAge', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
              >
                <option value="">Select partner's age range</option>
                <option value="18-24">18-24</option>
                <option value="25-30">25-30</option>
                <option value="31-35">31-35</option>
                <option value="36-40">36-40</option>
                <option value="41-45">41-45</option>
                <option value="46-50">46-50</option>
                <option value="51+">51+</option>
              </select>
            </div>
          </div>
        </div>

        {/* Personality & Preferences */}
        <div className="bg-purple-50 p-8 rounded-xl border border-purple-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">💜 Personality & Preferences</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="loveLanguage" className="block text-sm font-medium text-gray-700 mb-2">
                Partner's Love Language
              </label>
              <select
                id="loveLanguage"
                value={partnerInfo.loveLanguage}
                onChange={(e) => handleChange('loveLanguage', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
              >
                <option value="">How do they feel most loved?</option>
                <option value="words_of_affirmation">Words of Affirmation</option>
                <option value="physical_touch">Physical Touch</option>
                <option value="quality_time">Quality Time</option>
                <option value="acts_of_service">Acts of Service</option>
                <option value="receiving_gifts">Receiving Gifts</option>
              </select>
            </div>

            <div>
              <label htmlFor="communicationStyle" className="block text-sm font-medium text-gray-700 mb-2">
                Communication Style
              </label>
              <select
                id="communicationStyle"
                value={partnerInfo.communicationStyle}
                onChange={(e) => handleChange('communicationStyle', e.target.value as 'direct' | 'subtle' | 'romantic')}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
              >
                <option value="romantic">Romantic & Poetic</option>
                <option value="direct">Direct & Straightforward</option>
                <option value="subtle">Subtle & Playful</option>
              </select>
            </div>

            <div>
              <label htmlFor="scheduleType" className="block text-sm font-medium text-gray-700 mb-2">
                When Are You Usually Most Connected?
              </label>
              <select
                id="scheduleType"
                value={partnerInfo.scheduleType}
                onChange={(e) => handleChange('scheduleType', e.target.value as 'morning' | 'evening' | 'flexible')}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
              >
                <option value="flexible">Flexible / Varies</option>
                <option value="morning">Morning Person</option>
                <option value="evening">Evening Person</option>
              </select>
            </div>

            <div>
              <label htmlFor="stressLevel" className="block text-sm font-medium text-gray-700 mb-2">
                Current Stress Level (Both of You)
              </label>
              <select
                id="stressLevel"
                value={partnerInfo.stressLevel}
                onChange={(e) => handleChange('stressLevel', e.target.value as 'low' | 'moderate' | 'high')}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
              >
                <option value="low">Low - Pretty relaxed</option>
                <option value="moderate">Moderate - Normal stress</option>
                <option value="high">High - Quite stressed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="bg-green-50 p-8 rounded-xl border border-green-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">✨ Additional Details</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="favoriteThings" className="block text-sm font-medium text-gray-700 mb-2">
                What does your partner love? (hobbies, interests, activities)
              </label>
              <textarea
                id="favoriteThings"
                value={partnerInfo.favoriteThings}
                onChange={(e) => handleChange('favoriteThings', e.target.value)}
                placeholder="e.g., morning coffee, weekend hikes, cooking together, reading, music..."
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
              />
            </div>

            <div>
              <label htmlFor="specialOccasions" className="block text-sm font-medium text-gray-700 mb-2">
                Any special occasions or memories you'd like referenced?
              </label>
              <textarea
                id="specialOccasions"
                value={partnerInfo.specialOccasions}
                onChange={(e) => handleChange('specialOccasions', e.target.value)}
                placeholder="e.g., anniversary next month, recent vacation memories, inside jokes, special places..."
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
              />
            </div>

            <div>
              <label htmlFor="relationshipGoals" className="block text-sm font-medium text-gray-700 mb-2">
                What are your relationship goals right now?
              </label>
              <textarea
                id="relationshipGoals"
                value={partnerInfo.relationshipGoals}
                onChange={(e) => handleChange('relationshipGoals', e.target.value)}
                placeholder="e.g., deeper connection, more quality time, planning our future together, growing stronger..."
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 sm:pt-6">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 text-white py-4 sm:py-5 px-8 rounded-2xl font-bold hover:shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 transform hover:-translate-y-1 text-lg sm:text-xl border-2 border-white/20"
          >
            Continue to Science Quiz 🧠✨
          </button>
          <p className="text-center text-sm text-gray-500 mt-3 font-medium">
            Step 2: Answer 10 quick questions
          </p>
        </div>
      </div>
      </form>
    </div>
  );
}