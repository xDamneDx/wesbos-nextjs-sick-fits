import { useUser } from './User';

// Components:
import SignIn from './SignIn';

export default function PleaseSignIn({ children }) {
  const { me } = useUser();

  if (!me) {
    return <SignIn />;
  }

  return children;
}
