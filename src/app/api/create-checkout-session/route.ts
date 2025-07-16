import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-18.acacia',
});

export async function POST(request: NextRequest) {
  try {
    console.log('POST request received for checkout session');
    console.log('Stripe secret key exists:', !!process.env.STRIPE_SECRET_KEY);
    
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('Stripe secret key not configured');
      return NextResponse.json({ error: 'Stripe secret key not configured' }, { status: 500 });
    }

    const { partnerName, relationshipType } = await request.json();
    console.log('Request data:', { partnerName, relationshipType });
    
    const sessionParams = {
      line_items: [
        {
          price: 'price_1RlZy9AIMjLkaZ5kQ54TwmBr', // $1.99 price for When to Sex product
          quantity: 1,
        },
      ],
      mode: 'payment' as const,
      success_url: `${request.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/`,
      metadata: {
        partnerName: partnerName || 'unknown',
        relationshipType: relationshipType || 'unknown',
      },
    };

    console.log('Creating session with params:', sessionParams);
    const session = await stripe.checkout.sessions.create(sessionParams);
    console.log('Session created successfully:', session.id);

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    return NextResponse.json({ 
      error: 'Failed to create checkout session',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}