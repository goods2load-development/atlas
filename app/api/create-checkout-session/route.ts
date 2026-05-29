import { NextRequest, NextResponse } from 'next/server';

// TODO (Sufian): Add these to .env.local when ready for real payments:
//   STRIPE_SECRET_KEY=sk_live_...   (or sk_test_... for testing)
//   NEXT_PUBLIC_APP_URL=https://goods2load.com
//
// Once STRIPE_SECRET_KEY is set, clicking "Pay now" in the onboarding will
// redirect to a real Stripe Checkout page. Without it, the demo simulation runs.

export async function POST(req: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeKey) {
    // Stripe not yet configured — tell the client to run the simulation
    return NextResponse.json({ url: null, demo: true });
  }

  try {
    // Dynamic import so the build doesn't fail when stripe isn't configured
    const Stripe = (await import('stripe')).default;
    const stripe = new Stripe(stripeKey, { apiVersion: '2026-05-27.dahlia' });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            unit_amount: 69900, // $699.00
            product_data: {
              name: 'Goods2Load — Freight Forwarder Annual Membership',
              description:
                'Verified badge · Shipper matching · Analytics dashboard · Priority support',
              images: [`${appUrl}/g2l-logo-circle.png`],
            },
          },
        },
      ],
      success_url: `${appUrl}/agent/onboarding?payment=success`,
      cancel_url: `${appUrl}/agent/onboarding?payment=cancelled`,
      // Metadata lets the backend webhook identify this application
      metadata: {
        product: 'freight_forwarder_annual',
        source: 'agentic_onboarding',
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    return NextResponse.json(
      { url: null, error: 'Stripe error — falling back to demo mode' },
      { status: 200 }, // Return 200 so the client gracefully falls back
    );
  }
}
