import React from 'react';

export const useBodyScroll = () => {
  const setIsScrollDisabled = React.useCallback((disabled: boolean) => {
    document.body.style.overflow = disabled ? 'hidden' : '';
  }, []);

  return {
    setIsScrollDisabled,
  };
};
