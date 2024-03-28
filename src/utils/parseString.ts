import { Common } from '../typings/common';

export const parseString = (item: Common.Nullable<string>) => {
  if (item === null) {
    return null;
  }

  try {
    return JSON.parse(item);
  } catch {
    return null;
  }
};
