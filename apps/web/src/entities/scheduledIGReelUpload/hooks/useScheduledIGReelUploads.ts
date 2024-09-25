import { useAppContent } from '@repo/pocketbase-react';
import { ScheduledIGReelUpload } from '../scheduledIGReelUpload.type';

export const useScheduledIGReelUploads = (): {
  data: ScheduledIGReelUpload[];
  refetch: VoidFunction;
} => {
  const { records, actions } = useAppContent(
    process.env.NEXT_PUBLIC_PB_SCHEDULED_IG_REEL_UPLOADS_COLLECTION ?? '',
    true
  );

  const refetch = () => actions.fetch();

  return { data: records as ScheduledIGReelUpload[], refetch };
};
