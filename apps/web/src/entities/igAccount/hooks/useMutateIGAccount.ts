import { useAuth } from '@repo/pocketbase-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useIGAccountRepository } from './useIGAccountRepository';
import { CreateIGAccountInput, UpdateIGAccountInput } from '../igAccount.type';

export const useMutateIGAccount = (): {
  createIGAccount: (data: Omit<CreateIGAccountInput, 'user'>) => Promise<void>;
  updateIGAccount: (id: string, data: UpdateIGAccountInput) => Promise<void>;
  deleteIGAccount: (id: string) => Promise<void>;
  isExecuting: boolean;
} => {
  const { user: authUser } = useAuth();
  const { create, updateById, deleteById } = useIGAccountRepository();

  const [isExecuting, setIsExecuting] = useState(false);

  const createIGAccount = async (data: Omit<CreateIGAccountInput, 'user'>) => {
    try {
      setIsExecuting(true);
      await create({ ...data, user: authUser?.id });

      toast.success('IG Account created successfully');
    } catch (e) {
      toast.error('Error creating IG Account');
      console.error(e);
    } finally {
      setIsExecuting(false);
    }
  };

  const updateIGAccount = async (id: string, data: UpdateIGAccountInput) => {
    try {
      setIsExecuting(true);
      await updateById(id, data);

      toast.success('IG Account updated successfully');
    } catch (e) {
      toast.error('Error updating IG Account');
      console.error(e);
    } finally {
      setIsExecuting(false);
    }
  };

  const deleteIGAccount = async (id: string) => {
    try {
      setIsExecuting(true);
      await deleteById(id);

      toast.success('IG Account deleted successfully');
    } catch (e) {
      toast.error('Error deleting IG Account');
      console.error(e);
    } finally {
      setIsExecuting(false);
    }
  };

  return { createIGAccount, updateIGAccount, deleteIGAccount, isExecuting };
};
