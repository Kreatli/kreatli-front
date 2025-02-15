import React from 'react';

import { dispatchStorageEvent } from '../utils/dispatchStorageEvent';
import { parseString } from '../utils/parseString';

interface Options<T> {
  key: string;
  defaultValue: T;
  asJson?: boolean;
}

export const useLocalStorage = <T>({ key, defaultValue, asJson = false }: Options<T>): [T, (value: T) => void] => {
  const returnValueRef = React.useRef<{
    storageValue: string | null;
    parsedValue: T;
  }>({ parsedValue: defaultValue, storageValue: null });

  const subscribe = React.useCallback(
    (onStoreChange: () => void) => {
      const handleChange = (event: StorageEvent) => {
        if (event.key === key) {
          onStoreChange();
        }
      };

      window.addEventListener('storage', handleChange);

      return () => window.removeEventListener('storage', handleChange);
    },
    [key],
  );

  const getSnapshot = React.useCallback(() => {
    const storageValue = localStorage.getItem(key);

    if (storageValue === null || storageValue === undefined) {
      returnValueRef.current = {
        parsedValue: defaultValue,
        storageValue,
      };

      return returnValueRef.current.parsedValue;
    }

    if (storageValue !== returnValueRef.current.storageValue) {
      const parsed = asJson ? (parseString(storageValue) ?? defaultValue) : storageValue;

      returnValueRef.current = {
        parsedValue: parsed as T,
        storageValue,
      };
    }

    return returnValueRef.current.parsedValue;
  }, [asJson, defaultValue, key]);

  const getServerSnapshot = React.useCallback(() => {
    return defaultValue;
  }, [defaultValue]);

  const setValue = React.useCallback(
    (value: unknown) => {
      const oldValue = localStorage.getItem(key);
      const newValue = asJson ? JSON.stringify(value) : (value as string);

      localStorage.setItem(key, newValue);

      if (oldValue === newValue) {
        return;
      }

      dispatchStorageEvent(key, newValue, oldValue);
    },
    [asJson, key],
  );

  const value = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return [value, setValue];
};
