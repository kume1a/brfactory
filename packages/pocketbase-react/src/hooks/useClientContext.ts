import { useContext } from 'react';
import { ClientContext } from '../context/client';
import Pocketbase from 'pocketbase';

export const useClientContext = (): Pocketbase | null => {
  return useContext(ClientContext);
};
