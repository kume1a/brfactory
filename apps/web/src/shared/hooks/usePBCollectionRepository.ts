import { useClientContext } from '@repo/pocketbase-react';
import Pocketbase from 'pocketbase';

type PBRepository<
  T,
  CREATE_INPUT extends Record<string, any>,
  UPDATE_INPUT extends Record<string, any>,
> = {
  getAll: () => Promise<T[]>;
  getById: (id: string) => Promise<T | null>;
  create: (input: CREATE_INPUT) => Promise<T>;
  updateById: (id: string, input: UPDATE_INPUT) => Promise<T>;
  deleteById: (id: string) => Promise<boolean>;
};

export const usePBCollectionRepository = <T, CREATE_INPUT, UPDATE_INPUT>(
  collectionName: string
): PBRepository<
  T,
  CREATE_INPUT extends Record<string, any> ? CREATE_INPUT : never,
  UPDATE_INPUT extends Record<string, any> ? UPDATE_INPUT : never
> => {
  const client: Pocketbase = useClientContext();

  return {
    getAll: () => {
      return client.collection<T>(collectionName).getFullList();
    },
    getById: async id => {
      try {
        return client.collection<T>(collectionName).getOne(id);
      } catch (e) {
        console.error(e);
      }
      return null;
    },
    create: input => {
      return client.collection<T>(collectionName).create(input);
    },
    updateById: (id, input) => {
      return client.collection<T>(collectionName).update(id, input);
    },
    deleteById: id => {
      return client.collection<T>(collectionName).delete(id);
    },
  };
};
