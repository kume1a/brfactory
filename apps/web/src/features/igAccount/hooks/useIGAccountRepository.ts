import { CreateIGAccountInput, IGAccount, UpdateIGAccountInput } from '../igAccount.type';
import { usePBCollectionRepository } from '../../../shared/hooks/usePBCollectionRepository';

const collectionName = process.env.NEXT_PUBLIC_PB_IG_ACCOUNTS_COLLECTION ?? '';

export const useIGAccountRepository = () => {
  return usePBCollectionRepository<IGAccount, CreateIGAccountInput, UpdateIGAccountInput>(
    collectionName
  );
};
