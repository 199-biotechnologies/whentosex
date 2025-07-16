import { QuizResponse, QuizResult, QuizCategory, PartnerInfo } from '@/types/quiz';
import { generateLoveNote } from './loveNotes';

export const calculateQuizResult = (responses: QuizResponse[], partnerInfo?: PartnerInfo): QuizResult => {
  const totalScore = responses.reduce((sum, response) => sum + response.selectedOption, 0);
  const maxScore = responses.length * 5;
  const percentage = (totalScore / maxScore) * 100;

  // Calculate category scores
  const categoryScores: { [key in QuizCategory]: number } = {
    [QuizCategory.COMMUNICATION]: 0,
    [QuizCategory.PHYSICAL_STATE]: 0,
    [QuizCategory.EMOTIONAL_STATE]: 0,
    [QuizCategory.TIMING]: 0,
    [QuizCategory.STRESS]: 0,
    [QuizCategory.RELATIONSHIP]: 0
  };

  const categoryCounts: { [key in QuizCategory]: number } = {
    [QuizCategory.COMMUNICATION]: 0,
    [QuizCategory.PHYSICAL_STATE]: 0,
    [QuizCategory.EMOTIONAL_STATE]: 0,
    [QuizCategory.TIMING]: 0,
    [QuizCategory.STRESS]: 0,
    [QuizCategory.RELATIONSHIP]: 0
  };

  responses.forEach(response => {
    categoryScores[response.category] += response.selectedOption;
    categoryCounts[response.category]++;
  });

  // Normalize category scores
  const normalizedFactors: { [key in QuizCategory]: number } = {} as { [key in QuizCategory]: number };
  for (const category in categoryScores) {
    const cat = category as QuizCategory;
    normalizedFactors[cat] = categoryCounts[cat] > 0 
      ? (categoryScores[cat] / categoryCounts[cat] / 5) * 100
      : 0;
  }

  let recommendation: string;
  let category: 'green' | 'yellow' | 'red';

  if (percentage >= 80) {
    category = 'green';
    recommendation = getGreenRecommendation(normalizedFactors);
  } else if (percentage >= 60) {
    category = 'yellow';
    recommendation = getYellowRecommendation(normalizedFactors);
  } else {
    category = 'red';
    recommendation = getRedRecommendation(normalizedFactors);
  }

  const result: QuizResult = {
    score: Math.round(percentage),
    recommendation,
    category,
    factors: normalizedFactors
  };

  // Generate love note if partner info is provided
  if (partnerInfo) {
    result.loveNote = generateLoveNote(partnerInfo, result);
  }

  return result;
};

const getGreenRecommendation = (_factors: { [key in QuizCategory]: number }): string => {
  const recommendations = [
    "🔥 GREEN LIGHT! The stars (and hormones) are aligned. Your communication is on point, energy levels are good, and you're both feeling connected. This is prime time!",
    "✨ GO TIME! Everything's looking good - you're both in sync, stress levels are manageable, and the timing couldn't be better. The research says this is optimal!",
    "🌟 PERFECT STORM! Great communication, good energy, emotional connection - all the psychology research points to this being an ideal moment for intimacy.",
    "🎯 BULLSEYE! You've hit the sweet spot - low stress, good timing, strong connection. Your circadian rhythms and relationship factors are all aligned!"
  ];
  return recommendations[Math.floor(Math.random() * recommendations.length)];
};

const getYellowRecommendation = (factors: { [key in QuizCategory]: number }): string => {
  const lowestFactor = Object.entries(factors).reduce((min, [category, score]) => 
    score < min.score ? { category: category as QuizCategory, score } : min, 
    { category: QuizCategory.COMMUNICATION, score: 100 }
  );

  const improvements: { [key in QuizCategory]: string[] } = {
    [QuizCategory.COMMUNICATION]: [
      "Maybe start with some honest conversation about what you both want right now?",
      "A little communication goes a long way - research shows it's the #1 predictor of satisfaction!",
      "Quick check-in: Are you both on the same page about tonight?"
    ],
    [QuizCategory.PHYSICAL_STATE]: [
      "Maybe grab a quick snack or take a power nap first?",
      "Your energy levels could use a boost - hydrate and get comfortable!",
      "Consider waiting until you're both feeling more physically ready."
    ],
    [QuizCategory.EMOTIONAL_STATE]: [
      "Take a few minutes to connect emotionally first - it's scientifically proven to help!",
      "Some quality time together might help you both get in the right headspace.",
      "Research shows emotional intimacy is a precursor to sexual desire."
    ],
    [QuizCategory.TIMING]: [
      "The timing isn't perfect, but it's not terrible either. Maybe set the mood?",
      "Consider your circadian rhythms - morning might be better for hormones!",
      "Create a more romantic environment to make up for less-than-ideal timing."
    ],
    [QuizCategory.STRESS]: [
      "Take a few deep breaths together and try to decompress first.",
      "Stress hormones can mess with your natural rhythms - maybe try some relaxation?",
      "Consider addressing whatever's causing stress before getting intimate."
    ],
    [QuizCategory.RELATIONSHIP]: [
      "Maybe spend some quality time together first to reconnect?",
      "Research shows relationship satisfaction directly impacts sexual satisfaction.",
      "A little relationship maintenance might go a long way right now."
    ]
  };

  const suggestion = improvements[lowestFactor.category][Math.floor(Math.random() * improvements[lowestFactor.category].length)];
  
  return `🟡 YELLOW LIGHT! Not bad, but could be better. ${suggestion} You're at ${Math.round(factors[lowestFactor.category])}% in the ${lowestFactor.category.replace('_', ' ')} department.`;
};

const getRedRecommendation = (_factors: { [key in QuizCategory]: number }): string => {
  const recommendations = [
    "🔴 RED LIGHT! Maybe tonight isn't the night. One of you is stressed, tired, or just not in the right headspace. The research says timing matters!",
    "🛑 PUMP THE BRAKES! The psychological conditions aren't optimal right now. Maybe focus on connecting in other ways first?",
    "⚠️ NOT TONIGHT! Your stress levels, energy, or emotional connection need some work first. Science says these factors really matter for satisfaction!",
    "🚫 MAYBE LATER! The timing, energy, or emotional state isn't right. Better to wait for a moment when you're both more ready.",
    "❌ SLOW DOWN! Multiple factors are working against you right now. Focus on reducing stress and improving connection first."
  ];
  return recommendations[Math.floor(Math.random() * recommendations.length)];
};