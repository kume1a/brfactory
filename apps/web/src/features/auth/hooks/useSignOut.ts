import { useAuth } from '@repo/pocketbase-react';
import { useRouter } from 'next/navigation';
import { routes } from '../../../shared/constant/routes';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const useSignOut = (): {
  isExecuting: boolean;
  signOut: VoidFunction;
} => {
  const router = useRouter();
  const { actions } = useAuth();
  const [isExecuting, setIsExecuting] = useState(false);

  const signOut = async () => {
    setIsExecuting(true);

    try {
      actions.signOut();

      router.replace(routes.signIn);
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

  return { isExecuting, signOut };
};
