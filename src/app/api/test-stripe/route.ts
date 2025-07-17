import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function GET(request: NextRequest) {
  try {
    console.log('Testing Stripe configuration...');
    
    // Check environment variables
    const hasSecretKey = !!process.env.STRIPE_SECRET_KEY;
    const keyLength = process.env.STRIPE_SECRET_KEY?.length || 0;
    const keyPrefix = process.env.STRIPE_SECRET_KEY?.substring(0, 10) || 'none';
    const isValidKey = process.env.STRIPE_SECRET_KEY?.startsWith('sk_') || false;
    
    console.log('Environment check:', { hasSecretKey, keyLength, keyPrefix, isValidKey });
    
    if (!hasSecretKey || !isValidKey) {
      return NextResponse.json({
        status: 'error',
        message: 'Invalid Stripe configuration',
        details: {
          hasSecretKey,
          keyLength,
          keyPrefix,
          isValidKey
        }
      }, { status: 500 });
    }
    
    // Initialize Stripe
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2024-06-20',
    });
    
    // Test 1: List prices to verify API connection
    console.log('Testing Stripe API connection...');
    const prices = await stripe.prices.list({ limit: 1 });
    console.log('API connection successful, found prices:', prices.data.length);
    
    // Test 2: Validate specific price ID
    const priceId = process.env.STRIPE_PRICE_ID || 'price_1RlZy9AIMjLkaZ5kQ54TwmBr';
    console.log('Testing price ID:', priceId);
    
    let priceValid = false;
    let priceDetails = null;
    try {
      const price = await stripe.prices.retrieve(priceId);
      priceValid = true;
      priceDetails = {
        id: price.id,
        active: price.active,
        currency: price.currency,
        unit_amount: price.unit_amount,
        type: price.type
      };
      console.log('Price validation successful:', priceDetails);
    } catch (priceError) {
      console.error('Price validation failed:', priceError);
      priceDetails = priceError instanceof Error ? priceError.message : 'Unknown error';
    }
    
    // Test 3: Test minimal checkout session creation
    console.log('Testing checkout session creation...');
    let sessionTest = { success: false, error: null };
    try {
      const testSession = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'https://example.com/success',
        cancel_url: 'https://example.com/cancel',
      });
      sessionTest.success = true;
      console.log('Test session created successfully:', testSession.id);
      
      // Clean up test session
      await stripe.checkout.sessions.expire(testSession.id);
      console.log('Test session expired');
    } catch (sessionError) {
      sessionTest.error = sessionError instanceof Error ? sessionError.message : 'Unknown error';
      console.error('Session test failed:', sessionError);
    }
    
    return NextResponse.json({
      status: 'success',
      timestamp: new Date().toISOString(),
      tests: {
        environment: {
          hasSecretKey,
          keyLength,
          keyPrefix,
          isValidKey
        },
        apiConnection: {
          success: true,
          pricesFound: prices.data.length
        },
        priceValidation: {
          priceId,
          valid: priceValid,
          details: priceDetails
        },
        sessionCreation: sessionTest
      }
    });
    
  } catch (error) {
    console.error('Stripe test error:', error);
    
    return NextResponse.json({
      status: 'error',
      message: 'Stripe test failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}