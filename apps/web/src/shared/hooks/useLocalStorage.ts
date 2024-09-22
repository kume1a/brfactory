'use client';

import { useCallback, useEffect, useState } from 'react';

import { getLocalStorage } from '../util/storage';

const useLocalStorage = <V>(
  key: string,
  initialDefaultValue: V,
  storageHandler?: (storedValue: V) => void
): [V, (arg: V) => void, () => void] => {
  const localStorage = getLocalStorage();
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      const item = localStorage?.getItem(key);
      return item ? JSON.parse(item) : initialDefaultValue;
    } catch (e) {
      console.error(e);
      return initialDefaultValue;
    }
  });

  const setValue = (value: V): void => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      localStorage?.setItem(key, JSON.stringify(valueToStore));
      setStoredValue(valueToStore);

      dispatchEvent(new Event('storageUpdate'));
    } catch (e) {
      console.error(e);
    }
  };

  const listener = useCallback(() => {
    if (!storageHandler) {
      return;
    }
    try {
      const initialValue = localStorage?.getItem(key);
      const storedValue = initialValue ? JSON.parse(initialValue) : initialDefaultValue;
      storageHandler?.(storedValue);
    } catch (e) {
      console.error(e);
    }
  }, [storageHandler]);

  const removeKey = (): void => {
    localStorage?.removeItem(key);
    setStoredValue(null);
  };

  useEffect(() => {
    if (!storageHandler) {
      return;
    }
    window.addEventListener('storageUpdate', listener);
    return () => {
      window.removeEventListener('storageUpdate', listener);
    };
  }, [listener, storageHandler]);

  useEffect(() => {
    const isLocalStorageHasKey = Boolean(localStorage?.getItem(key));
    if (!isLocalStorageHasKey) {
      localStorage?.setItem(key, JSON.stringify(storedValue));
    }
  }, [storedValue]);

  return [storedValue, setValue, removeKey];
};

export default useLocalStorage;
