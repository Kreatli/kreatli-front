import React from 'react';

import { getIsTouchScreen } from '../utils/getIsTouchScreen';

export const useIsTouchScreen = () => {
  const [isTouched, setIsTouched] = React.useState(false);

  React.useEffect(() => {
    setIsTouched(getIsTouchScreen());
  }, []);

  return isTouched;
};
