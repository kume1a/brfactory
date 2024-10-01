import { PagingMeta, useAppContent } from '@repo/pocketbase-react';
import { ScheduledIGReelUpload } from '../scheduledIGReelUpload.type';
import { useEffect, useState } from 'react';

export const useScheduledIGReelUploads = (): {
  data: ScheduledIGReelUpload[];
  refetch: VoidFunction;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pagingMeta: PagingMeta;
} => {
  const [page, setPage] = useState(1);

  const { records, actions, pagingMeta } = useAppContent(
    process.env.NEXT_PUBLIC_PB_SCHEDULED_IG_REEL_UPLOADS_COLLECTION ?? ''
  );

  const refetch = () => {
    if (page !== 1) {
      setPage(1);
    } else {
      actions.fetch({ page: 1, perPage: 1 });
    }
  };

  useEffect(() => {
    actions.fetch({ page, perPage: 10 });
  }, [page]);

  return { data: records as ScheduledIGReelUpload[], refetch, setPage, pagingMeta };
};
