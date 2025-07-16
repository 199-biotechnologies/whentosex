import { PartnerInfo, QuizResult } from '@/types/quiz';

export const generateLoveNote = (partnerInfo: PartnerInfo, result: QuizResult): string => {
  const { partnerName, relationshipType, relationshipLength, favoriteThings } = partnerInfo;
  
  const relationshipTerm = relationshipType === 'wife' ? 'wife' : 
                          relationshipType === 'girlfriend' ? 'girlfriend' : 'love';
  
  const timeReference = relationshipLength ? ` for ${relationshipLength}` : '';
  
  let loveNote = '';
  
  if (result.category === 'green') {
    const greenNotes = [
      `Hey beautiful ${partnerName}, according to science (and my heart), tonight might be perfect for us. I've been thinking about you all day, and everything feels right. ${favoriteThings ? `I know how much you love ${favoriteThings}, and I love how happy those things make you.` : ''} You mean everything to me, my amazing ${relationshipTerm}${timeReference}. What do you think? 💕`,
      
      `My dearest ${partnerName}, the stars are aligned tonight! I took this silly quiz and it confirmed what I already knew - you're incredible and I'm so lucky to have you as my ${relationshipTerm}${timeReference}. ${favoriteThings ? `Just like how you light up when you talk about ${favoriteThings}, you light up my entire world.` : ''} Feeling like tonight could be special for us. Love you endlessly! ✨`,
      
      `${partnerName}, my love, I've been thinking about us and how amazing our connection is${timeReference}. ${favoriteThings ? `You know how much I adore watching you enjoy ${favoriteThings}?` : ''} Well, I adore everything about you. According to this fun quiz I took, all signs point to tonight being perfect for some quality time together. You're the best ${relationshipTerm} in the world! 💖`
    ];
    loveNote = greenNotes[Math.floor(Math.random() * greenNotes.length)];
  } else if (result.category === 'yellow') {
    const yellowNotes = [
      `Hey gorgeous ${partnerName}, I took this quiz about us and while tonight might not be perfect, every moment with you is precious. ${favoriteThings ? `Just like how you find joy in ${favoriteThings}, you bring joy to my life every single day.` : ''} Maybe we can just cuddle and connect? Being your ${relationshipTerm}${timeReference} is the best thing that ever happened to me. Love you so much! 💛`,
      
      `My sweet ${partnerName}, tonight might call for some gentle connection rather than fireworks, but honestly? I just love being close to you${timeReference}. ${favoriteThings ? `Whether we're enjoying ${favoriteThings} together or just talking,` : ''} Every quiet moment with you is perfect. You're an amazing ${relationshipTerm} and I'm so grateful for you. 🌙`,
      
      `${partnerName}, my beautiful ${relationshipTerm}, I'm thinking tonight might be better for some cozy time together. ${favoriteThings ? `Maybe we could enjoy some ${favoriteThings} and just be present with each other.` : ''} After ${relationshipLength ? relationshipLength : 'all this time'} together, I still get butterflies when I think about you. You're everything to me! 💕`
    ];
    loveNote = yellowNotes[Math.floor(Math.random() * yellowNotes.length)];
  } else {
    const redNotes = [
      `My darling ${partnerName}, tonight might be a night for taking care of each other in different ways. ${favoriteThings ? `How about we enjoy some ${favoriteThings} together and just relax?` : ''} I love you so much, my wonderful ${relationshipTerm}${timeReference}, and sometimes the best intimacy is just being present with each other. You're perfect just as you are. 💙`,
      
      `Hey love ${partnerName}, I'm thinking tonight calls for some gentle self-care for both of us. ${favoriteThings ? `Maybe we could indulge in some ${favoriteThings} and just enjoy each other's company.` : ''} Being your ${relationshipTerm}${timeReference} has taught me that love isn't just about passion - it's about caring for each other every single day. Love you endlessly! 🌺`,
      
      `${partnerName}, my incredible ${relationshipTerm}, tonight feels like a perfect night for just being close and taking care of ourselves. ${favoriteThings ? `Want to enjoy some ${favoriteThings} and just be cozy together?` : ''} After ${relationshipLength ? relationshipLength : 'all our time'} together, I know that our connection is about so much more than just physical intimacy. You're my everything! 💜`
    ];
    loveNote = redNotes[Math.floor(Math.random() * redNotes.length)];
  }
  
  return loveNote;
};

export const generateDetailedLoveNote = (partnerInfo: PartnerInfo, result: QuizResult): string => {
  const basicNote = generateLoveNote(partnerInfo, result);
  
  const detailedAddition = `

🌟 DETAILED RELATIONSHIP ANALYSIS 🌟

Based on tonight's assessment, here's what makes our connection special:

• Communication Score: ${Math.round(result.factors.communication)}% - ${result.factors.communication >= 80 ? 'You two are in perfect sync!' : result.factors.communication >= 60 ? 'Good communication with room to grow' : 'Worth investing more time in deep conversation'}

• Emotional Connection: ${Math.round(result.factors.emotional_state)}% - ${result.factors.emotional_state >= 80 ? 'Deeply bonded and in tune' : result.factors.emotional_state >= 60 ? 'Strong foundation with moments of beautiful connection' : 'Perfect opportunity to focus on emotional intimacy'}

• Physical Readiness: ${Math.round(result.factors.physical_state)}% - ${result.factors.physical_state >= 80 ? 'Both feeling energized and ready' : result.factors.physical_state >= 60 ? 'Good energy levels overall' : 'Time to prioritize rest and self-care'}

• Timing & Environment: ${Math.round(result.factors.timing)}% - ${result.factors.timing >= 80 ? 'Perfect romantic atmosphere' : result.factors.timing >= 60 ? 'Good conditions with minor adjustments needed' : 'Consider creating a more intimate setting'}

• Stress Levels: ${Math.round(100 - result.factors.stress)}% relaxed - ${result.factors.stress <= 20 ? 'Both completely at ease' : result.factors.stress <= 40 ? 'Mostly relaxed and comfortable' : 'Some stress present - perfect time for mutual support'}

• Relationship Harmony: ${Math.round(result.factors.relationship)}% - ${result.factors.relationship >= 80 ? 'Incredibly strong bond' : result.factors.relationship >= 60 ? 'Solid relationship with great potential' : 'Beautiful opportunity to reconnect and strengthen your bond'}

${partnerInfo.favoriteThings ? `\n💕 Remember: ${partnerInfo.partnerName} loves ${partnerInfo.favoriteThings}. Small gestures around these interests always make them smile!` : ''}

${partnerInfo.relationshipLength ? `\n🎉 After ${partnerInfo.relationshipLength} together, you're still choosing each other every day. That's the real magic!` : ''}

This detailed analysis is worth every penny - use it to deepen your connection! 💖`;

  return basicNote + detailedAddition;
};