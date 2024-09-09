import { useAppContent } from '@repo/pocketbase-react';
import { IGAccount } from '../igAccount.type';

export const useIGAccounts = (): { data: IGAccount[]; refetch: VoidFunction } => {
  const { records, actions } = useAppContent(
    process.env.NEXT_PUBLIC_PB_IG_ACCOUNTS_COLLECTION ?? '',
    true
  );

  const refetch = () => actions.fetch();

  return { data: records as IGAccount[], refetch };
};
