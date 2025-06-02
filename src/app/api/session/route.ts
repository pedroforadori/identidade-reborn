import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get('session_id');

  if (!session_id) {
    return NextResponse.json({ error: 'session_id inválido' }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    return NextResponse.json(session);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao recuperar sessão' }, { status: 500 });
  }
}
