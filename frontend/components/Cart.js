import styled from 'styled-components';
import { useUser } from './User';
import formatMoney from '../lib/formatMoney';
import calcTotalPrice from '../lib/calcTotalPrice';

// Styled component:
import CartStyles from './styles/CartStyles';
import SupremeStyles from './styles/SupremeStyles';

const CartItemStyles = styled.div`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;

function CartItem({ cartItem }) {
  const { product } = cartItem;

  if (!product) return null;

  return (
    <CartItemStyles>
      <img
        width="100"
        src={product.photo.image.publicUrlTransformed}
        alt={product.name}
      />
      <dir>
        <h3>{product.name}</h3>
        <p>
          {formatMoney(product.price * cartItem.quantity)} -{' '}
          <em>
            {cartItem.quantity} &times; {formatMoney(product.price)} each
          </em>{' '}
        </p>
      </dir>
    </CartItemStyles>
  );
}

export default function Cart() {
  const me = useUser();

  if (!me) return null;

  return (
    <CartStyles open>
      <header>
        <SupremeStyles>{me.name}'s cart</SupremeStyles>
      </header>
      <ul>
        {me.cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(me.cart))}</p>
      </footer>
    </CartStyles>
  );
}
