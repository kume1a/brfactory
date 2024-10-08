import { ServerUrlOrigin } from '../dynamicServer.type';
import { createServerUrlOriginStore } from './serverUrlOrigin.store';

export const getPocketbaseServerUrl = (): string => {
  const { read } = createServerUrlOriginStore();

  const serverUrlOrigin = read();

  switch (serverUrlOrigin) {
    case ServerUrlOrigin.LOCAL:
      return process.env.NEXT_PUBLIC_PB_URL_LOCAL ?? '';
    case ServerUrlOrigin.REMOTE:
      return process.env.NEXT_PUBLIC_PB_URL_REMOTE ?? '';
  }
};
