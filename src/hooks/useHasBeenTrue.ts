import React from 'react';

/** Becomes true the first time `value` is true and stays true (e.g. keep a lazy modal mounted after it opens). */
export const useHasBeenTrue = (value: boolean) => {
  const [hasBeenTrue, setHasBeenTrue] = React.useState(value);

  React.useEffect(() => {
    if (value) {
      setHasBeenTrue(true);
    }
  }, [value]);

  return hasBeenTrue || value;
};
