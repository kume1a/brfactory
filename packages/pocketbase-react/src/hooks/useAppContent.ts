'use client';

import { useContext, useEffect, useState } from 'react';
import { ContentContext } from '../context';
import { Record } from '../interfaces/record';
import { PagingMeta, useAppSelector } from '../store';
import { RecordListOptions } from 'pocketbase';

export type SubscribeType = () => Promise<void | undefined>;
export type UnsubscribeType = () => Promise<void | undefined>;
export type FetchType = (fetchOptions: {
  page?: number;
  perPage?: number;
  options?: RecordListOptions;
}) => Promise<void | undefined>;
export type CreateType = (record: {}) => Promise<void | Record | undefined>;
export type UpdateType = (id: string, record: {}) => Promise<void | Record | undefined>;
export type DeleteType = (id: string) => Promise<void | boolean | undefined>;

export interface Actions {
  subscribe: SubscribeType;
  unsubscribe: UnsubscribeType;
  fetch: FetchType;
  create: CreateType;
  update: UpdateType;
  delete: DeleteType;
}

export const useAppContent = <T extends Record>(
  collectionName: string
): {
  records: T[];
  actions: Actions;
  pagingMeta: PagingMeta;
  isSubscribed: boolean;
} => {
  const records = useAppSelector((state) => state.reducer.records[collectionName]) as T[];
  const pagingMeta = useAppSelector(
    (state) => state.reducer.records[`${collectionName}_pagingmeta`]
  );
  const subscriptions = useAppSelector((state) => state.reducer.subscriptions);
  const context = useContext(ContentContext);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    setIsSubscribed(subscriptions.includes(collectionName));
  }, [subscriptions]);

  const actions: Actions = {
    subscribe: async () => await context.subscribe(collectionName),
    unsubscribe: async () => await context.unsubscribe(collectionName),
    fetch: async (fetchOptions) => await context.fetch(collectionName, fetchOptions),
    create: async (record: {}) => await context.create(collectionName, record),
    update: async (id: string, record: {}) => await context.update(collectionName, id, record),
    delete: async (id: string) => await context.delete(collectionName, id),
  };

  return { records: records ?? [], pagingMeta, actions, isSubscribed };
};
