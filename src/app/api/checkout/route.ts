import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

export async function POST(req: NextRequest) {
  const { nome, nascimento, rg } = await req.json();

  console.log('Dados recebidos:', { nome, nascimento, rg });
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [{
      price_data: {
        currency: 'brl',
        product_data: {
          name: `RG do bebê reborn: ${nome}`,
        },
        unit_amount: 990,
      },
      quantity: 1,
    }],
    metadata: { nome, nascimento, rg },
    success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.get('origin')}/`,
  });

  return NextResponse.json({ id: session.id });
}