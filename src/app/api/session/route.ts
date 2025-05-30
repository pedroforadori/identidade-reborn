import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { session_id } = req.query;

  if (typeof session_id !== 'string') {
    return res.status(400).json({ error: 'session_id inválido' });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao recuperar sessão' });
  }
}
