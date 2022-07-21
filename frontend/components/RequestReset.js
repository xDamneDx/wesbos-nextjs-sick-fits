import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

// Hooks:
import useForm from '../lib/useForm';

// Components:
import ErrorMessage from './ErrorMessage';

// Styled components:
import FormStyles from './styles/FormStyles';

export const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

export default function RequestReset() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    name: '',
    password: '',
  });

  const [signup, { data, loading, error }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
    }
  );

  const handleSubmit = async (e) => {
    // Stop the form from submitting:
    e.preventDefault();

    // Send the email and password to the graphqlAPI:
    await signup().catch(console.error);
    resetForm();
  };

  return (
    <FormStyles method="POST" onSubmit={handleSubmit}>
      <h2>Request a Password Reset</h2>
      <ErrorMessage error={error} />
      <fieldset>
        {data?.sendUserPasswordResetLink === null && (
          <p>Success! Check your email for a link!</p>
        )}
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Request Reset!</button>
      </fieldset>
    </FormStyles>
  );
}
