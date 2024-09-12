import { toast } from 'react-toastify';
import { useScheduledIGReelRepository } from './useScheduledIGReelRepository';
import { CreateScheduledIGReelInput, UpdateScheduledIGReelInput } from '../scheduledIGReel.type';
import { Truculenta } from 'next/font/google';

export const useMutateScheduledIGReel = (): {
  createScheduledIGReel: (data: CreateScheduledIGReelInput) => Promise<boolean>;
  updateScheduledIGReel: (id: string, data: UpdateScheduledIGReelInput) => Promise<boolean>;
  deleteScheduledIGReel: (id: string) => Promise<boolean>;
} => {
  const { create, updateById, deleteById } = useScheduledIGReelRepository();

  return {
    createScheduledIGReel: async data => {
      try {
        await create(data);

        toast.success('Scheduled IG Reel created successfully');

        return true;
      } catch (e) {
        toast.error('Error creating scheduled IG reel');
        console.error(e);
      }

      return false;
    },
    updateScheduledIGReel: async (id, data) => {
      try {
        await updateById(id, data);

        toast.success('Scheduled IG reel updated successfully');

        return true;
      } catch (e) {
        toast.error('Error updating scheduled IG reel');
        console.error(e);
      }

      return false;
    },
    deleteScheduledIGReel: async id => {
      try {
        await deleteById(id);

        toast.success('Scheduled IG reel deleted successfully');

        return true;
      } catch (e) {
        toast.error('Error deleting scheduled IG reel');
        console.error(e);
      }

      return false;
    },
  };
};
