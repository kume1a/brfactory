import { useAppContent } from '@repo/pocketbase-react';
import { IGAccount } from '../igAccount.type';

export const useIGAccounts = (): IGAccount[] => {
  const { records } = useAppContent(process.env.NEXT_PUBLIC_PB_IG_ACCOUNTS_COLLECTION ?? '', true);

  return records as IGAccount[];
};
