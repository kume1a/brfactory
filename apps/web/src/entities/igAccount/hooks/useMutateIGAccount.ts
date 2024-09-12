import { useAuth } from '@repo/pocketbase-react';
import { toast } from 'react-toastify';
import { useIGAccountRepository } from './useIGAccountRepository';
import { CreateIGAccountInput, UpdateIGAccountInput } from '../igAccount.type';

export const useMutateIGAccount = (): {
  createIGAccount: (data: Omit<CreateIGAccountInput, 'user'>) => Promise<boolean>;
  updateIGAccount: (id: string, data: UpdateIGAccountInput) => Promise<boolean>;
  deleteIGAccount: (id: string) => Promise<boolean>;
} => {
  const { user: authUser } = useAuth();
  const { create, updateById, deleteById } = useIGAccountRepository();

  return {
    createIGAccount: async (data: Omit<CreateIGAccountInput, 'user'>) => {
      try {
        await create({ ...data, user: authUser?.id });

        toast.success('IG Account created successfully');

        return true;
      } catch (e) {
        toast.error('Error creating IG Account');
        console.error(e);
      }

      return false;
    },
    updateIGAccount: async (id: string, data: UpdateIGAccountInput) => {
      try {
        await updateById(id, data);

        toast.success('IG Account updated successfully');

        return true;
      } catch (e) {
        toast.error('Error updating IG Account');
        console.error(e);
      }

      return false;
    },
    deleteIGAccount: async (id: string) => {
      try {
        await deleteById(id);

        toast.success('IG Account deleted successfully');

        return true;
      } catch (e) {
        toast.error('Error deleting IG Account');
        console.error(e);
      }

      return false;
    },
  };
};
