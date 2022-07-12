import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import styled from 'styled-components';
import nProgress from 'nprogress';

// Styled components:
import SickButtonStyles from './styles/SickButtonStyles';

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

function CheckoutForm() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    // 1. Stop the form from submitting & turn the loader on:
    e.preventDefault();
    setLoading(true);
    console.log('We Gotta Do Some Work!');
    // 2. Start the page transition:
    nProgress.start();
    // 3. Create the payment method via stripe: (if successful - token comes here.)
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    console.log(paymentMethod);
    // 4. Handle any errors from stripe:
    if (error) {
      setError(error);
    }
    // 5. Send the token from step 3 to our keystone server via custom mutation.
    // 6. Change the page to view the order.
    // 7. Close the cart.
    // 8. Turn the loader off.
    setLoading(false);
    nProgress.done();
  };

  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error && <p style={{ fontSize: 12 }}>{error.message}</p>}
      <CardElement />
      <SickButtonStyles>Check Out Now</SickButtonStyles>
    </CheckoutFormStyles>
  );
}

export default function Checkout() {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutForm />
    </Elements>
  );
}
