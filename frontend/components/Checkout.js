import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement } from '@stripe/react-stripe-js';
import styled from 'styled-components';

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

export default function Checkout() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('We Gotta Do Some Work!');
  };

  return (
    <Elements stripe={stripeLib}>
      <CheckoutFormStyles onSubmit={handleSubmit}>
        <CardElement />
        <SickButtonStyles>Check Out Now</SickButtonStyles>
      </CheckoutFormStyles>
    </Elements>
  );
}
