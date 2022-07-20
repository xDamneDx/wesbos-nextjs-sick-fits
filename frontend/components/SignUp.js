import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

// Hooks:
import useForm from '../lib/useForm';

// Components:
import ErrorMessage from './ErrorMessage';

// Styled components:
import FormStyles from './styles/FormStyles';

export const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    createUser(data: { name: $name, email: $email, password: $password }) {
      id
      name
      email
    }
  }
`;

export default function SignUp() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    name: '',
    password: '',
  });

  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
  });

  const handleSubmit = async (e) => {
    // Stop the form from submitting:
    e.preventDefault();

    // Send the email and password to the graphqlAPI:
    await signup().catch(console.error);
    resetForm();
  };

  return (
    <FormStyles method="POST" onSubmit={handleSubmit}>
      <h2>Sign Up For an Account</h2>
      <ErrorMessage error={error} />
      <fieldset>
        {data?.createUser && (
          <p>
            Signed up with {data.createUser.email} - Please Go Ahead and Sign
            In!
          </p>
        )}
        <label htmlFor="email">
          Your Name
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            autoComplete="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="email">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sign Up!</button>
      </fieldset>
    </FormStyles>
  );
}
