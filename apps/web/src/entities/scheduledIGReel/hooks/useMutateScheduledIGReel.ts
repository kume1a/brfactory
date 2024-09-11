import { toast } from 'react-toastify';
import { useScheduledIGReelRepository } from './useScheduledIGReelRepository';
import { CreateScheduledIGReelInput, UpdateScheduledIGReelInput } from '../scheduledIGReel.type';

export const useMutateScheduledIGReel = (): {
  createScheduledIGReel: (data: CreateScheduledIGReelInput) => Promise<void>;
  updateScheduledIGReel: (id: string, data: UpdateScheduledIGReelInput) => Promise<void>;
  deleteScheduledIGReel: (id: string) => Promise<void>;
} => {
  const { create, updateById, deleteById } = useScheduledIGReelRepository();

  const createScheduledIGReel = async (data: CreateScheduledIGReelInput) => {
    try {
      await create(data);

      toast.success('Scheduled IG Reel created successfully');
    } catch (e) {
      toast.error('Error creating scheduled IG reel');
      console.error(e);
    }
  };

  const updateScheduledIGReel = async (id: string, data: UpdateScheduledIGReelInput) => {
    try {
      await updateById(id, data);

      toast.success('Scheduled IG reel updated successfully');
    } catch (e) {
      toast.error('Error updating scheduled IG reel');
      console.error(e);
    }
  };

  const deleteScheduledIGReel = async (id: string) => {
    try {
      await deleteById(id);

      toast.success('Scheduled IG reel deleted successfully');
    } catch (e) {
      toast.error('Error deleting scheduled IG reel');
      console.error(e);
    }
  };

  return { createScheduledIGReel, updateScheduledIGReel, deleteScheduledIGReel };
};
