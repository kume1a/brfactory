import { useAuth } from '@repo/pocketbase-react';
import { useRouter } from 'next/navigation';
import { routes } from '../../../shared/constant/routes';
import { useState } from 'react';
import { toast } from 'react-toastify';

type SignIn = (email: string, password: string) => void;

export const useSignIn = (): {
  isExecuting: boolean;
  signIn: SignIn;
} => {
  const router = useRouter();
  const { actions } = useAuth();
  const [isExecuting, setIsExecuting] = useState(false);

  const signIn: SignIn = async (email, password) => {
    setIsExecuting(true);

    try {
      await actions.signInWithEmail(email, password);

      router.replace(routes.dashboard);
    } catch (e: unknown) {
      if (e && typeof e === 'object' && 'message' in e && typeof e['message'] === 'string') {
        toast.error(e['message']);
      } else {
        toast.error('Invalid email or password');
      }
    } finally {
      setIsExecuting(false);
    }
  };

  return { isExecuting, signIn };
};
