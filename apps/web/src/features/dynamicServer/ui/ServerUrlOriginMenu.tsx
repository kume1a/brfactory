'use client';

import { PropsWithChildren } from 'react';
import { Menu } from '../../../shared/components/Menu';
import useLocalStorage from '../../../shared/hooks/useLocalStorage';
import {
  SERVER_URL_ORIGIN_DEFAULT,
  SERVER_URL_ORIGIN_STORAGE_KEY,
} from '../dynamicServer.constant';
import { ServerUrlOrigin } from '../dynamicServer.type';
import { CheckIcon as IconCheck } from '@heroicons/react/20/solid';
import { useRouter } from 'next/navigation';

type Props = PropsWithChildren<{
  className?: string;
}>;

export const ServerUrlOriginMenu = ({ children, className }: Props) => {
  const router = useRouter();

  const [serverUrlOrigin, setServerUrlOrigin] = useLocalStorage(
    SERVER_URL_ORIGIN_STORAGE_KEY,
    SERVER_URL_ORIGIN_DEFAULT
  );

  return (
    <Menu
      className={className}
      anchor="top start"
      options={[
        {
          label: 'Local',
          onClick: () => {
            setServerUrlOrigin(ServerUrlOrigin.LOCAL);
            router.refresh();
          },
          icon:
            serverUrlOrigin === ServerUrlOrigin.LOCAL ? (
              <IconCheck className="text-textPrimary" />
            ) : undefined,
        },
        {
          label: 'Remote',
          onClick: () => {
            setServerUrlOrigin(ServerUrlOrigin.REMOTE);
            router.refresh();
          },
          icon:
            serverUrlOrigin === ServerUrlOrigin.REMOTE ? (
              <IconCheck className="text-textPrimary" />
            ) : undefined,
        },
      ]}
    >
      {children}
    </Menu>
  );
};
