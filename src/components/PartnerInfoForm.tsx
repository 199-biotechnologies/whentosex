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
    favoriteThings: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (partnerInfo.partnerName.trim()) {
      onSubmit(partnerInfo);
    }
  };

  const handleChange = (field: keyof PartnerInfo, value: string) => {
    setPartnerInfo(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Tell us about your partner
      </h2>
      <p className="text-gray-600 mb-6 text-center">
        This will help us create a personalized love note for you!
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="partnerName" className="block text-sm font-medium text-gray-700 mb-2">
            Partner&apos;s Name *
          </label>
          <input
            type="text"
            id="partnerName"
            value={partnerInfo.partnerName}
            onChange={(e) => handleChange('partnerName', e.target.value)}
            placeholder="Enter your partner's name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            required
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
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          >
            <option value="partner">Partner</option>
            <option value="girlfriend">Girlfriend</option>
            <option value="wife">Wife</option>
          </select>
        </div>

        <div>
          <label htmlFor="relationshipLength" className="block text-sm font-medium text-gray-700 mb-2">
            How long have you been together?
          </label>
          <input
            type="text"
            id="relationshipLength"
            value={partnerInfo.relationshipLength}
            onChange={(e) => handleChange('relationshipLength', e.target.value)}
            placeholder="e.g., 2 years, 6 months, etc."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          />
        </div>

        <div>
          <label htmlFor="favoriteThings" className="block text-sm font-medium text-gray-700 mb-2">
            What are some things they love? (Optional)
          </label>
          <textarea
            id="favoriteThings"
            value={partnerInfo.favoriteThings}
            onChange={(e) => handleChange('favoriteThings', e.target.value)}
            placeholder="e.g., coffee, hiking, romantic comedies, cooking together..."
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-pink-600 transition-colors duration-200"
        >
          Continue to Quiz
        </button>
      </form>
    </div>
  );
}