import { NextRequest, NextResponse } from 'next/server';
import openai from '@/lib/openai';
import { PartnerInfo, QuizResult } from '@/types/quiz';

export async function POST(request: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 });
    }

    const { partnerInfo, quizResult, isDetailed = false } = await request.json();

    const prompt = createLoveNotePrompt(partnerInfo, quizResult, isDetailed);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o", // Using GPT-4o as GPT-4.1 may not be available yet
      messages: [
        {
          role: "system",
          content: "You are an expert psychologist, writer, and relationship specialist who deeply understands the psychology of intimacy and persuasion. You know how subtle wording, emotional triggers, and psychological principles can influence receptivity and openness. Your goal, as you write personalized messages, is to craft content that psychologically primes the recipient to be more open to intimacy and connection. You understand that the right words at the right time can dramatically improve a partner's willingness to engage romantically. Use proven psychological techniques like validation, anticipation, emotional connection, and subtle suggestion to make your messages irresistibly compelling while maintaining authenticity and love."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: isDetailed ? 750 : 400,
    });

    const loveNote = completion.choices[0]?.message?.content;

    if (!loveNote) {
      throw new Error('Failed to generate love note');
    }

    return NextResponse.json({ loveNote });
  } catch (error) {
    console.error('Error generating love note:', error);
    return NextResponse.json({ 
      error: 'Failed to generate love note',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

function createLoveNotePrompt(partnerInfo: PartnerInfo, quizResult: QuizResult, isDetailed: boolean): string {
  const { partnerName, relationshipType, relationshipLength, favoriteThings } = partnerInfo;
  const { score, category, factors } = quizResult;
  
  const relationshipTerm = relationshipType === 'wife' ? 'wife' : 
                          relationshipType === 'girlfriend' ? 'girlfriend' : 'partner';
  
  const timeReference = relationshipLength ? ` for ${relationshipLength}` : '';
  
  let promptType = '';
  if (category === 'green') {
    promptType = 'Tonight looks perfect for intimacy! Create a psychologically compelling message that builds anticipation, validates their desirability, and uses subtle persuasion techniques to maximize their openness to physical connection. Use emotional triggers and create irresistible romantic momentum.';
  } else if (category === 'yellow') {
    promptType = 'Tonight has potential but needs strategic approach. Create a message that psychologically reduces barriers, builds emotional safety, and gently guides them toward intimacy through validation and subtle suggestion. Focus on building receptivity through emotional connection.';
  } else {
    promptType = 'Tonight requires a softer psychological approach. Create a message that maintains romantic connection while strategically planting seeds for future intimacy. Use validation and emotional bonding to keep romantic potential alive without pressure.';
  }

  const basePrompt = `
Create a personalized love note for someone to send to their ${relationshipTerm} ${partnerName}. 

Context:
- Partner's name: ${partnerName}
- Relationship: ${relationshipTerm}${timeReference}
- Favorite things: ${favoriteThings || 'not specified'}
- Quiz score: ${score}% (${category} category)
- Communication level: ${Math.round(factors.communication)}%
- Emotional connection: ${Math.round(factors.emotional_state)}%
- Physical readiness: ${Math.round(factors.physical_state)}%
- Stress level: ${Math.round(100 - factors.stress)}% relaxed
- Timing: ${Math.round(factors.timing)}%

Instructions:
${promptType}

Psychological Strategy Requirements:
- Use ${partnerName}'s name to create personal connection and psychological ownership
- Reference their ${relationshipType} relationship${timeReference} to activate commitment psychology
- ${favoriteThings ? `Incorporate their interests (${favoriteThings}) to trigger positive emotional associations` : ''}
- Use validation language to boost their self-esteem and receptivity
- Apply psychological principles like reciprocity, anticipation, and emotional mirroring
- Include subtle suggestions that increase openness without creating pressure
- Build emotional momentum through carefully chosen romantic language
- End with an irresistible but gentle invitation that feels natural and desired
- Use psychological triggers like scarcity ("tonight"), validation ("you're incredible"), and anticipation ("I've been thinking about you")
- Make them feel desired, valued, and psychologically safe to say yes
  `;

  if (isDetailed) {
    return basePrompt + `
    
For this detailed version, also include:
- Psychological analysis of each relationship factor with strategic insights
- Advanced persuasion techniques and subtle influence strategies
- Deeper psychological triggers for intimacy receptivity
- More sophisticated emotional manipulation (positive and loving)
- Strategic timing advice based on psychology and circadian rhythms
- Specific psychological "moves" they can make to increase success
- Advanced relationship psychology and behavioral triggers
- Create maximum psychological impact while maintaining authenticity

Length: Make this a strategically focused, psychologically powerful love note (500-600 words).
    `;
  }

  return basePrompt + `
Length: Create a concise but heartfelt love note (200-300 words).
  `;
}