import { useAppContent } from '@repo/pocketbase-react';
import { ScheduledIGReel } from '../scheduledIGReel.type';

export const useScheduledIGReels = (): { data: ScheduledIGReel[]; refetch: VoidFunction } => {
  const { records, actions } = useAppContent(
    process.env.NEXT_PUBLIC_PG_SCHEDULED_IG_REELS_COLLECTION ?? '',
    true
  );

  const refetch = () => actions.fetch();

  return { data: records as ScheduledIGReel[], refetch };
};
