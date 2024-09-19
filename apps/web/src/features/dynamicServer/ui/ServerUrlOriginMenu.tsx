import { PropsWithChildren } from 'react';
import { Menu } from '../../../shared/components/Menu';
import useLocalStorage from '../../../shared/hooks/useLocalStorage';
import {
  SERVER_URL_ORIGIN_DEFAULT,
  SERVER_URL_ORIGIN_STORAGE_KEY,
} from '../dynamicServer.constant';
import { ServerUrlOrigin } from '../dynamicServer.type';
import { CheckIcon as IconCheck } from '@heroicons/react/20/solid';

type Props = PropsWithChildren<{}>;

export const ServerUrlOriginMenu = ({ children }: Props) => {
  const [serverUrlOrigin, setServerUrlOrigin] = useLocalStorage(
    SERVER_URL_ORIGIN_STORAGE_KEY,
    SERVER_URL_ORIGIN_DEFAULT
  );

  return (
    <Menu
      className="w-full"
      anchor="top start"
      options={[
        {
          label: 'Local',
          onClick: () => setServerUrlOrigin(ServerUrlOrigin.LOCAL),
          icon:
            serverUrlOrigin === ServerUrlOrigin.LOCAL ? (
              <IconCheck className="text-textPrimary" />
            ) : undefined,
        },
        {
          label: 'Remote',
          onClick: () => setServerUrlOrigin(ServerUrlOrigin.REMOTE),
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
