import { Common } from '../typings/common';

export const dispatchStorageEvent = (
  key: Common.Maybe<string>,
  newValue: Common.Maybe<string>,
  oldValue: Common.Maybe<string>,
) => {
  const storageEvent = new StorageEvent('storage', {
    key,
    newValue,
    oldValue,
    url: window.location.href,
  });

  window.dispatchEvent(storageEvent);
};
