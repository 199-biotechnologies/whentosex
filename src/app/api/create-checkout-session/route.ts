import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Use a more stable API version - 2024-12-18 might be too new
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20',
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
    
    // Validate price ID format
    if (!stripePrice.startsWith('price_')) {
      console.error('Invalid price ID format:', stripePrice);
      return NextResponse.json({ 
        error: 'Invalid price ID format',
        details: 'Price ID must start with "price_"'
      }, { status: 500 });
    }

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
    
    // Enhanced Stripe error logging
    if (error && typeof error === 'object' && 'type' in error) {
      const stripeError = error as any;
      console.error('Stripe error type:', stripeError.type);
      console.error('Stripe error code:', stripeError.code);
      console.error('Stripe error param:', stripeError.param);
      console.error('Stripe error raw:', stripeError.raw);
    }
    
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      
      // Check for specific Stripe errors
      if (error.message.includes('price') || error.message.includes('Price')) {
        return NextResponse.json({ 
          error: 'Invalid Stripe price configuration',
          details: error.message,
          priceId: process.env.STRIPE_PRICE_ID || 'price_1RlZy9AIMjLkaZ5kQ54TwmBr'
        }, { status: 500 });
      }
      
      if (error.message.includes('key') || error.message.includes('authentication')) {
        return NextResponse.json({ 
          error: 'Stripe authentication failed',
          details: 'Please check Stripe API keys configuration',
          keyFormat: process.env.STRIPE_SECRET_KEY?.substring(0, 7) + '...'
        }, { status: 500 });
      }
      
      // Check for invalid request errors
      if (error.message.includes('invalid_request_error')) {
        return NextResponse.json({ 
          error: 'Invalid Stripe request',
          details: error.message,
          suggestion: 'Check if price ID exists and is active in Stripe Dashboard'
        }, { status: 500 });
      }
    }
    
    return NextResponse.json({ 
      error: 'Failed to create checkout session',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
      apiVersion: '2024-06-20'
    }, { status: 500 });
  }
}