import { getLocalStorage } from '../../../shared/util/storage';
import {
  SERVER_URL_ORIGIN_DEFAULT,
  SERVER_URL_ORIGIN_STORAGE_KEY,
} from '../dynamicServer.constant';
import { ServerUrlOrigin } from '../dynamicServer.type';

export type ServerUrlOriginStore = {
  read: () => ServerUrlOrigin;
  write: (value: ServerUrlOrigin) => void;
};

export const createServerUrlOriginStore = (): ServerUrlOriginStore => {
  const localStorage = getLocalStorage();

  return {
    read: () => {
      const value = localStorage?.getItem(SERVER_URL_ORIGIN_STORAGE_KEY) as ServerUrlOrigin | null;

      return value ? JSON.parse(value) : SERVER_URL_ORIGIN_DEFAULT;
    },
    write: newValue => {
      localStorage?.setItem(SERVER_URL_ORIGIN_STORAGE_KEY, JSON.stringify(newValue));
    },
  };
};
