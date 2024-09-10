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

type PBRepositoryOptions = {
  collectionName: string;
  formData?: boolean;
};

export const usePBCollectionRepository = <T, CREATE_INPUT, UPDATE_INPUT>({
  collectionName,
  formData,
}: PBRepositoryOptions): PBRepository<
  T,
  CREATE_INPUT extends Record<string, any> ? CREATE_INPUT : never,
  UPDATE_INPUT extends Record<string, any> ? UPDATE_INPUT : never
> => {
  const client: Pocketbase | null = useClientContext();

  return {
    getAll: () => {
      if (!client) {
        return Promise.resolve([]);
      }

      return client?.collection<T>(collectionName).getFullList();
    },
    getById: async id => {
      if (!client) {
        return null;
      }

      try {
        return client.collection<T>(collectionName).getOne(id);
      } catch (e) {
        console.error(e);
      }
      return null;
    },
    create: input => {
      if (!client) {
        return Promise.resolve({} as T);
      }

      const data = formData ? new FormData() : input;

      if (formData) {
        Object.entries(input).forEach(([key, value]) => {
          if (value instanceof File) {
            data.append(key, value);
          } else {
            data.append(key, JSON.stringify(value));
          }
        });
      }

      return client.collection<T>(collectionName).create(data);
    },
    updateById: (id, input) => {
      if (!client) {
        return Promise.resolve({} as T);
      }

      const data = formData ? new FormData() : input;

      if (formData) {
        Object.entries(input).forEach(([key, value]) => {
          if (value instanceof File) {
            data.append(key, value);
          } else {
            data.append(key, JSON.stringify(value));
          }
        });
      }

      return client.collection<T>(collectionName).update(id, input);
    },
    deleteById: id => {
      if (!client) {
        return Promise.resolve(false);
      }

      return client.collection<T>(collectionName).delete(id);
    },
  };
};
