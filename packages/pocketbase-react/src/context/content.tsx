'use client';

import * as store from '../store/store';
import * as React from 'react';
import { createContext } from 'react';
import { useClientContext } from '../hooks/useClientContext';
import { Record } from '../interfaces/record';
import { recordsAction } from '../store/actions';
import { subscriptionsAction } from '../store/actions';
import { RecordListOptions } from 'pocketbase';

type SubscribeType = (collectionName: string) => Promise<void>;
type UnsubscribeType = (collectionName?: string) => Promise<void>;
type FetchType = (
  collectionName: string,
  params: {
    page?: number;
    perPage?: number;
    options?: RecordListOptions;
  }
) => Promise<void>;
type CreateType = (collectionName: string, record: {}) => Promise<void | Record | undefined>;
type UpdateType = (
  collectionName: string,
  recordId: string,
  record: {}
) => Promise<void | Record | undefined>;
type DeleteType = (collectionName: string, recordId: string) => Promise<void | boolean | undefined>;

interface ContentActions {
  subscribe: SubscribeType;
  unsubscribe: UnsubscribeType;
  fetch: FetchType;
  create: CreateType;
  update: UpdateType;
  delete: DeleteType;
}

export const ContentContext = createContext<ContentActions>({} as ContentActions);

export type ContentProviderProps = {
  children: React.ReactNode;
};

interface MessageData {
  action: string;
  record: Record;
}

export const ContentProvider = (props: ContentProviderProps) => {
  const client = useClientContext();
  const dispatch = store.useAppDispatch;

  function tempErrorHandler(error: any) {
    // TODO: Handle error
    // IDEA: Create new ErrorContext and Update it with error
    if (error?.originalError?.name !== 'AbortError') {
      console.log('Error in content provider', JSON.stringify(error));
    }
  }
  const actions: ContentActions = {
    subscribe: async (collectionName: string) => {
      await client?.realtime
        .subscribe(collectionName, (event: MessageData) => {
          switch (event.action) {
            case 'create':
              dispatch(recordsAction.addRecord(collectionName, event.record));
              break;
            case 'update':
              dispatch(recordsAction.updateRecord(collectionName, event.record));
              break;
            case 'delete':
              dispatch(recordsAction.deleteRecord(collectionName, event.record));
              break;
            default:
              break;
          }
        })
        .then(() => {
          dispatch(subscriptionsAction.addSubscription(collectionName));
        })
        .catch(tempErrorHandler);
    },
    unsubscribe: async (collectionName?: string) => {
      if (collectionName) {
        await client?.realtime
          .unsubscribe(collectionName)
          .then(() => {
            dispatch(subscriptionsAction.deleteSubscription(collectionName));
          })
          .catch(tempErrorHandler);
      } else {
        await client?.realtime
          .unsubscribe()
          .then(() => {
            dispatch(subscriptionsAction.setSubscriptions([]));
          })
          .catch(tempErrorHandler);
      }
    },
    fetch: async (collectionName, params) => {
      await client
        ?.collection(collectionName)
        .getList(params.page, params.perPage, params.options)
        .then((records) => {
          dispatch(recordsAction.setRecords(collectionName, records.items as Record[]));
          dispatch(
            recordsAction.setPagingMeta(collectionName, {
              page: records.page,
              perPage: records.perPage,
              totalPages: records.totalPages,
              totalItems: records.totalItems,
            })
          );
        })
        .catch(tempErrorHandler);
    },
    create: async (collectionName: string, record: {}) => {
      return client?.collection(collectionName).create(record).catch(tempErrorHandler);
    },
    update: async (collectionName: string, recordId: string, record: {}) => {
      return client?.collection(collectionName).update(recordId, record).catch(tempErrorHandler);
    },
    delete: async (collectionName: string, recordId: string) => {
      return client?.collection(collectionName).delete(recordId).catch(tempErrorHandler);
    },
  };

  return <ContentContext.Provider value={actions}>{props.children}</ContentContext.Provider>;
};
