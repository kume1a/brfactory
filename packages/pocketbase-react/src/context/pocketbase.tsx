'use client';

import React, { useEffect } from 'react';

import { createContext } from 'react';
import PocketBase from 'pocketbase';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../store/store';
import { ClientProvider } from './client';
import { ContentProvider } from './content';
import { AuthProvider } from './auth';
import { StorageService } from '../service/storage';

export const PocketbaseContext = createContext<PocketBase | null>(null);

export type PocketbaseProviderProps = React.PropsWithChildren<{
  serverURL: string;
  webRedirectUrl: string;
  mobileRedirectUrl: string;
  // openURL: (url: string) => Promise<void>;
  initialCollections?: string[];
}>;

export const Pocketbase = (props: PocketbaseProviderProps) => {
  const [client, setClient] = React.useState<PocketBase | null>(null);
  const [initialCollections, setInitialCollections] = React.useState<string[]>();
  useEffect(() => {
    const client = new PocketBase(props.serverURL);
    client.autoCancellation(false);
    client.authStore.onChange(async () => {
      await StorageService.set(StorageService.Constants.COOKIE, client.authStore.exportToCookie());
      setInitialCollections([]);
      setInitialCollections(props.initialCollections);
    });
    StorageService.get(StorageService.Constants.COOKIE).then((cookie) => {
      if (cookie) {
        client.authStore.loadFromCookie(cookie);
        setInitialCollections([]);
        setInitialCollections(props.initialCollections);
      }
      setClient(client);
    });
  }, [props.serverURL]);

  return client ? (
    <ClientProvider client={client}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AuthProvider
            webRedirectUrl={props.webRedirectUrl}
            mobileRedirectUrl={props.mobileRedirectUrl}
            // openURL={props.openURL}
          >
            <ContentProvider collections={initialCollections}>{props.children}</ContentProvider>
          </AuthProvider>
        </PersistGate>
      </Provider>
    </ClientProvider>
  ) : null;
};
