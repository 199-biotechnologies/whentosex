import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-18.acacia',
});

export async function POST(request: NextRequest) {
  try {
    console.log('POST request received for checkout session');
    console.log('Stripe secret key exists:', !!process.env.STRIPE_SECRET_KEY);
    console.log('Stripe secret key length:', process.env.STRIPE_SECRET_KEY?.length || 0);
    console.log('Stripe secret key prefix:', process.env.STRIPE_SECRET_KEY?.substring(0, 10) || 'none');
    
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('Stripe secret key not configured');
      return NextResponse.json({ error: 'Stripe secret key not configured' }, { status: 500 });
    }

    if (!process.env.STRIPE_SECRET_KEY.startsWith('sk_')) {
      console.error('Invalid Stripe secret key format');
      return NextResponse.json({ error: 'Invalid Stripe secret key format' }, { status: 500 });
    }

    const { partnerName, relationshipType } = await request.json();
    console.log('Request data:', { partnerName, relationshipType });
    
    // Check if required environment variables exist
    const stripePrice = process.env.STRIPE_PRICE_ID || 'price_1RlZy9AIMjLkaZ5kQ54TwmBr';
    console.log('Using Stripe price ID:', stripePrice);

    const sessionParams = {
      line_items: [
        {
          price: stripePrice, // $1.99 price for When to Sex product
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
      
      // Check for specific Stripe errors
      if (error.message.includes('price') || error.message.includes('Price')) {
        return NextResponse.json({ 
          error: 'Invalid Stripe price configuration',
          details: error.message
        }, { status: 500 });
      }
      
      if (error.message.includes('key') || error.message.includes('authentication')) {
        return NextResponse.json({ 
          error: 'Stripe authentication failed',
          details: 'Please check Stripe API keys configuration'
        }, { status: 500 });
      }
    }
    
    return NextResponse.json({ 
      error: 'Failed to create checkout session',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}