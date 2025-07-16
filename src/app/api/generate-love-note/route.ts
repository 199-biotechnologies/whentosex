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
          content: "You are a relationship expert who creates personalized, romantic, and scientifically-informed love notes. Your notes should be warm, encouraging, and help couples connect meaningfully."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: isDetailed ? 1500 : 800,
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
    promptType = 'Tonight looks perfect for intimacy! Create an encouraging and romantic message.';
  } else if (category === 'yellow') {
    promptType = 'Tonight has potential but needs some adjustment. Create a supportive message with gentle suggestions.';
  } else {
    promptType = 'Tonight might be better for other forms of connection. Create a loving message about alternative intimacy.';
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

Requirements:
- Use ${partnerName}'s name naturally throughout
- Reference their ${relationshipType} relationship${timeReference}
- ${favoriteThings ? `Subtly incorporate their interests: ${favoriteThings}` : ''}
- Be romantic but not overly explicit
- Include psychology-based insights about timing and connection
- Make it feel personal and heartfelt
- End with a clear, loving invitation or suggestion
  `;

  if (isDetailed) {
    return basePrompt + `
    
For this detailed version, also include:
- Specific analysis of each relationship factor
- Personalized suggestions for improvement
- Deeper psychological insights about intimacy timing
- More elaborate romantic language
- References to relationship research and circadian rhythms
- Specific next steps they can take together

Length: Make this a comprehensive, detailed love note (1000-1200 words).
    `;
  }

  return basePrompt + `
Length: Create a concise but heartfelt love note (300-500 words).
  `;
}