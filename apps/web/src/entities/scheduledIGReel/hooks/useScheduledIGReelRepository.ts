import {
  CreateScheduledIGReelInput,
  ScheduledIGReel,
  UpdateScheduledIGReelInput,
} from '../scheduledIGReel.type';
import { usePBCollectionRepository } from '../../../shared/hooks/usePBCollectionRepository';

const collectionName = process.env.NEXT_PUBLIC_PB_SCHEDULED_IG_REELS_COLLECTION ?? '';

export const useScheduledIGReelRepository = () => {
  return usePBCollectionRepository<
    ScheduledIGReel,
    CreateScheduledIGReelInput,
    UpdateScheduledIGReelInput
  >({ collectionName, formData: true });
};
