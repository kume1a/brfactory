'use client';

import { PropsWithChildren } from 'react';
import { getPocketbaseServerUrl } from '../util/getPocketbaseUrl';
import { Pocketbase } from '@repo/pocketbase-react';

type Props = PropsWithChildren;

export const DynamicServerUrlPBProvider = ({ children }: Props): JSX.Element => {
  const pocketbaseServerUrl = getPocketbaseServerUrl();

  return (
    <Pocketbase
      serverURL={pocketbaseServerUrl}
      webRedirectUrl={''}
      mobileRedirectUrl={''}
      // openURL={async () => {}}
    >
      {children}
    </Pocketbase>
  );
};
