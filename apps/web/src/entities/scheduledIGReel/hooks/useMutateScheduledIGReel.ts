import { useState } from 'react';
import { toast } from 'react-toastify';
import { useScheduledIGReelRepository } from './useScheduledIGReelRepository';
import { CreateScheduledIGReelInput, UpdateScheduledIGReelInput } from '../scheduledIGReel.type';

export const useMutateScheduledIGReel = (): {
  createScheduledIGReel: (data: CreateScheduledIGReelInput) => Promise<void>;
  updateScheduledIGReel: (id: string, data: UpdateScheduledIGReelInput) => Promise<void>;
  deleteScheduledIGReel: (id: string) => Promise<void>;
  isExecuting: boolean;
} => {
  const { create, updateById, deleteById } = useScheduledIGReelRepository();

  const [isExecuting, setIsExecuting] = useState(false);

  const createScheduledIGReel = async (data: CreateScheduledIGReelInput) => {
    try {
      setIsExecuting(true);
      await create(data);

      toast.success('Scheduled IG Reel created successfully');
    } catch (e) {
      toast.error('Error creating scheduled IG reel');
      console.error(e);
    } finally {
      setIsExecuting(false);
    }
  };

  const updateScheduledIGReel = async (id: string, data: UpdateScheduledIGReelInput) => {
    try {
      setIsExecuting(true);
      await updateById(id, data);

      toast.success('Scheduled IG reel updated successfully');
    } catch (e) {
      toast.error('Error updating scheduled IG reel');
      console.error(e);
    } finally {
      setIsExecuting(false);
    }
  };

  const deleteScheduledIGReel = async (id: string) => {
    try {
      setIsExecuting(true);
      await deleteById(id);

      toast.success('Scheduled IG reel deleted successfully');
    } catch (e) {
      toast.error('Error deleting scheduled IG reel');
      console.error(e);
    } finally {
      setIsExecuting(false);
    }
  };

  return { createScheduledIGReel, updateScheduledIGReel, deleteScheduledIGReel, isExecuting };
};
