import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null> | null = null;

export function getStripe() {
  if (!stripePromise) {
    const pk = (import.meta as any).env?.VITE_STRIPE_PUBLISHABLE_KEY as string | undefined;
    if (!pk) {
      console.warn('VITE_STRIPE_PUBLISHABLE_KEY is not set. Stripe Checkout will be disabled.');
    }
    stripePromise = loadStripe(pk || '');
  }
  return stripePromise;
}
