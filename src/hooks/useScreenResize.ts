import React from 'react';

export const useScreenResize = (callback: (e: UIEvent) => void) => {
  React.useEffect(() => {
    const handleResize = (event: UIEvent) => callback(event);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [callback]);
};
