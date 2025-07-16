export interface QuizQuestion {
  id: string;
  question: string;
  options: {
    text: string;
    value: number;
    category: QuizCategory;
  }[];
  category: QuizCategory;
  researchBasis: string;
}

export enum QuizCategory {
  COMMUNICATION = 'communication',
  PHYSICAL_STATE = 'physical_state',
  EMOTIONAL_STATE = 'emotional_state',
  TIMING = 'timing',
  STRESS = 'stress',
  RELATIONSHIP = 'relationship'
}

export interface QuizResult {
  score: number;
  recommendation: string;
  category: 'green' | 'yellow' | 'red';
  factors: {
    [key in QuizCategory]: number;
  };
  loveNote?: string;
}

export interface PartnerInfo {
  partnerName: string;
  relationshipType: 'wife' | 'girlfriend' | 'partner';
  relationshipLength: string;
  favoriteThings: string;
  loveLanguage: string;
  scheduleType: 'morning' | 'evening' | 'flexible';
  stressLevel: 'low' | 'moderate' | 'high';
  communicationStyle: 'direct' | 'subtle' | 'romantic';
  specialOccasions: string;
  // User info
  userAge: string;
  partnerAge: string;
  livingTogether: boolean;
  relationshipGoals: string;
}

export interface QuizResponse {
  questionId: string;
  selectedOption: number;
  category: QuizCategory;
}