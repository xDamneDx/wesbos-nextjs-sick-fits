import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import { ALL_PRODUCTS_QUERY } from './Products';

// Components:
import ErrorMessage from './ErrorMessage';

// Styled components:
import FormStyles from './styles/FormStyles';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # Which variables are getting passed in? And What types are they
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      price
      description
      name
    }
  }
`;

export default function CreateProduct() {
  const { inputs, handleChange, clearForm } = useForm({
    image: '',
    name: '',
    price: '',
    description: '',
  });
  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );

  return (
    <FormStyles
      onSubmit={async (e) => {
        e.preventDefault();

        // Submit the inputfields to the backend:
        await createProduct();
        clearForm();
      }}
    >
      <ErrorMessage error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          Image
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={inputs.name}
            autoComplete="off"
            required
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            value={inputs.price}
            required
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            onChange={handleChange}
            value={inputs.description}
          />
        </label>

        <button type="submit">+ Add Product</button>
      </fieldset>
    </FormStyles>
  );
}
