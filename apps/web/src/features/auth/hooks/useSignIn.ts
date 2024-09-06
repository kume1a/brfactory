import { useAuth } from '@repo/pocketbase-react';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const useSignIn = (): {
  isExecuting: boolean;
  signInWithEmail: (email: string, password: string, onSuccess: VoidFunction) => Promise<void>;
} => {
  const { actions, isSignedIn } = useAuth();

  const [isExecuting, setIsExecuting] = useState(false);

  return {
    isExecuting,
    signInWithEmail: async (email, password, onSuccess) => {
      setIsExecuting(true);
      if (isSignedIn) {
        onSuccess();
        setIsExecuting(false);
        return;
      }

      try {
        await actions.signInWithEmail(email, password);

        onSuccess();
      } catch (e) {
        console.error(e);
        toast.error('Error signin in');
      } finally {
        setIsExecuting(false);
      }
    },
  };
};
