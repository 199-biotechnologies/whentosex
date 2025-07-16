import { QuizQuestion, QuizCategory } from '@/types/quiz';

export const quizQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: 'How well did you and your partner communicate about desires today?',
    category: QuizCategory.COMMUNICATION,
    researchBasis: 'Sexual communication correlates positively with relationship satisfaction (r = .37) and sexual satisfaction (r = .43)',
    options: [
      { text: 'We had deep, honest conversations about what we both want', value: 5, category: QuizCategory.COMMUNICATION },
      { text: 'We talked openly but briefly about our needs', value: 4, category: QuizCategory.COMMUNICATION },
      { text: 'Some hints were dropped, but nothing explicit', value: 3, category: QuizCategory.COMMUNICATION },
      { text: 'We barely talked about anything intimate', value: 2, category: QuizCategory.COMMUNICATION },
      { text: 'Communication? What communication?', value: 1, category: QuizCategory.COMMUNICATION }
    ]
  },
  {
    id: '2',
    question: 'What time is it right now?',
    category: QuizCategory.TIMING,
    researchBasis: 'Circadian rhythms affect hormone release including testosterone and other sex hormones',
    options: [
      { text: 'Early morning (6-9 AM) - testosterone peaks!', value: 5, category: QuizCategory.TIMING },
      { text: 'Late morning (9-12 PM) - still riding the hormone wave', value: 4, category: QuizCategory.TIMING },
      { text: 'Afternoon (12-6 PM) - decent energy levels', value: 3, category: QuizCategory.TIMING },
      { text: 'Evening (6-9 PM) - winding down but still good', value: 4, category: QuizCategory.TIMING },
      { text: 'Late night (9 PM+) - you\'re both probably tired', value: 2, category: QuizCategory.TIMING }
    ]
  },
  {
    id: '3',
    question: 'How stressed are you both feeling right now?',
    category: QuizCategory.STRESS,
    researchBasis: 'Stress hormones disrupt circadian rhythms and can shift peripheral oscillators, affecting sexual function',
    options: [
      { text: 'Totally zen and relaxed', value: 5, category: QuizCategory.STRESS },
      { text: 'Mostly calm with minor worries', value: 4, category: QuizCategory.STRESS },
      { text: 'Moderate stress but manageable', value: 3, category: QuizCategory.STRESS },
      { text: 'Pretty stressed about work/life stuff', value: 2, category: QuizCategory.STRESS },
      { text: 'Completely overwhelmed and anxious', value: 1, category: QuizCategory.STRESS }
    ]
  },
  {
    id: '4',
    question: 'How physically energetic do you both feel?',
    category: QuizCategory.PHYSICAL_STATE,
    researchBasis: 'Sleep deprivation impairs hormone release and reduces libido and energy levels',
    options: [
      { text: 'Energetic and well-rested', value: 5, category: QuizCategory.PHYSICAL_STATE },
      { text: 'Good energy, maybe a bit tired', value: 4, category: QuizCategory.PHYSICAL_STATE },
      { text: 'Moderate energy levels', value: 3, category: QuizCategory.PHYSICAL_STATE },
      { text: 'Pretty tired but not exhausted', value: 2, category: QuizCategory.PHYSICAL_STATE },
      { text: 'Absolutely exhausted', value: 1, category: QuizCategory.PHYSICAL_STATE }
    ]
  },
  {
    id: '5',
    question: 'How emotionally connected do you feel right now?',
    category: QuizCategory.EMOTIONAL_STATE,
    researchBasis: 'Intimacy acts as a precursor to sexual desire and increases likelihood of partnered sexual activity',
    options: [
      { text: 'Deeply connected and in sync', value: 5, category: QuizCategory.EMOTIONAL_STATE },
      { text: 'Close and affectionate', value: 4, category: QuizCategory.EMOTIONAL_STATE },
      { text: 'Neutral - not disconnected but not super close', value: 3, category: QuizCategory.EMOTIONAL_STATE },
      { text: 'Slightly distant or distracted', value: 2, category: QuizCategory.EMOTIONAL_STATE },
      { text: 'Feeling disconnected or having relationship tension', value: 1, category: QuizCategory.EMOTIONAL_STATE }
    ]
  },
  {
    id: '6',
    question: 'How long has it been since you last had quality time together?',
    category: QuizCategory.RELATIONSHIP,
    researchBasis: 'Sexual satisfaction predicts future changes in relationship satisfaction, and intimacy enhances sexual desire',
    options: [
      { text: 'We just spent meaningful time together', value: 5, category: QuizCategory.RELATIONSHIP },
      { text: 'Earlier today or yesterday', value: 4, category: QuizCategory.RELATIONSHIP },
      { text: 'A few days ago', value: 3, category: QuizCategory.RELATIONSHIP },
      { text: 'About a week ago', value: 2, category: QuizCategory.RELATIONSHIP },
      { text: 'Can\'t remember when we last really connected', value: 1, category: QuizCategory.RELATIONSHIP }
    ]
  },
  {
    id: '7',
    question: 'Have you eaten recently and how do you feel physically?',
    category: QuizCategory.PHYSICAL_STATE,
    researchBasis: 'Food intake affects circadian rhythms, and physical comfort impacts sexual desire',
    options: [
      { text: 'Satisfied but not overly full, feeling good', value: 5, category: QuizCategory.PHYSICAL_STATE },
      { text: 'Lightly satisfied and comfortable', value: 4, category: QuizCategory.PHYSICAL_STATE },
      { text: 'Neutral - not hungry, not too full', value: 3, category: QuizCategory.PHYSICAL_STATE },
      { text: 'Either quite hungry or quite full', value: 2, category: QuizCategory.PHYSICAL_STATE },
      { text: 'Extremely hungry or uncomfortably stuffed', value: 1, category: QuizCategory.PHYSICAL_STATE }
    ]
  },
  {
    id: '8',
    question: 'What\'s your current environment like?',
    category: QuizCategory.TIMING,
    researchBasis: 'Environmental factors like light, temperature, and social environment affect circadian rhythms',
    options: [
      { text: 'Private, comfortable, and romantic', value: 5, category: QuizCategory.TIMING },
      { text: 'Private and comfortable', value: 4, category: QuizCategory.TIMING },
      { text: 'Reasonably private but could be better', value: 3, category: QuizCategory.TIMING },
      { text: 'Not very private or comfortable', value: 2, category: QuizCategory.TIMING },
      { text: 'Terrible timing - people around, distractions everywhere', value: 1, category: QuizCategory.TIMING }
    ]
  },
  {
    id: '9',
    question: 'How has your sleep been lately?',
    category: QuizCategory.PHYSICAL_STATE,
    researchBasis: 'Sleep deprivation impairs hormone release including testosterone and reduces libido',
    options: [
      { text: 'Great sleep consistently', value: 5, category: QuizCategory.PHYSICAL_STATE },
      { text: 'Pretty good sleep most nights', value: 4, category: QuizCategory.PHYSICAL_STATE },
      { text: 'Okay sleep, some good nights and bad nights', value: 3, category: QuizCategory.PHYSICAL_STATE },
      { text: 'Poor sleep recently', value: 2, category: QuizCategory.PHYSICAL_STATE },
      { text: 'Terrible sleep - barely sleeping', value: 1, category: QuizCategory.PHYSICAL_STATE }
    ]
  },
  {
    id: '10',
    question: 'How would you describe your mood right now?',
    category: QuizCategory.EMOTIONAL_STATE,
    researchBasis: 'Mood disorders have bidirectional relationship with circadian rhythms and affect sexual desire',
    options: [
      { text: 'Happy, playful, and positive', value: 5, category: QuizCategory.EMOTIONAL_STATE },
      { text: 'Good mood, feeling upbeat', value: 4, category: QuizCategory.EMOTIONAL_STATE },
      { text: 'Neutral - not bad, not great', value: 3, category: QuizCategory.EMOTIONAL_STATE },
      { text: 'Slightly down or irritable', value: 2, category: QuizCategory.EMOTIONAL_STATE },
      { text: 'Feeling sad, angry, or depressed', value: 1, category: QuizCategory.EMOTIONAL_STATE }
    ]
  }
];