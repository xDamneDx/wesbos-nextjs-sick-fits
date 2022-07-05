import useForm from '../lib/useForm';

// Styled components:
import FormStyles from './styles/FormStyles';

export default function CreateProduct() {
  const { inputs, handleChange } = useForm({
    image: '',
    name: '',
    price: '',
    description: '',
  });

  return (
    <FormStyles
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <fieldset>
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
