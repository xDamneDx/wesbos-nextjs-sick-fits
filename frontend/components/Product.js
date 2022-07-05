import Link from 'next/link';
import formatMoney from '../lib/formatMoney';

// Styled components:
import ItemStyles from './styles/ItemStyles';
import TitleStyles from './styles/TitleStyles';
import PriceTagStyles from './styles/PriceTagStyles';

function Product({ product }) {
  return (
    <ItemStyles>
      <img src={product.photo.image.publicUrlTransformed} alt={product.name} />
      <TitleStyles>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </TitleStyles>
      <PriceTagStyles>{formatMoney(product.price)}</PriceTagStyles>
      <p>{product.description}</p>
      {/* TODO: Add buttons to edit & delete item */}
    </ItemStyles>
  );
}

export default Product;
