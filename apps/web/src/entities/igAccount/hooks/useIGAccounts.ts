import { PagingMeta, useAppContent } from '@repo/pocketbase-react';
import { IGAccount } from '../igAccount.type';
import { useEffect, useState } from 'react';

export const useIGAccounts = (): {
  data: IGAccount[];
  refetch: VoidFunction;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pagingMeta: PagingMeta;
} => {
  const [page, setPage] = useState(1);

  const { records, actions, pagingMeta } = useAppContent(
    process.env.NEXT_PUBLIC_PB_IG_ACCOUNTS_COLLECTION ?? ''
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

  return { data: records as IGAccount[], refetch, setPage, pagingMeta };
};
