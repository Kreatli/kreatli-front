import React from 'react';

import { BREAKPOINTS } from '../constants/breakpoints';
import { useScreenResize } from './useScreenResize';

type Breakpoints = keyof typeof BREAKPOINTS;

export const useBreakpointValue = <T>(values: { [bp in Breakpoints]?: T }, defaultValue: T) => {
  const [clientWidth, setClientWidth] = React.useState(0);

  const handleResize = () => {
    setClientWidth(document.documentElement.clientWidth);
  };

  useScreenResize(handleResize);

  React.useEffect(handleResize, []);

  return React.useMemo(() => {
    const breakpoints = Object.keys(values) as Breakpoints[];

    const breakpoint = [...breakpoints]
      .sort((a, b) => BREAKPOINTS[a] - BREAKPOINTS[b])
      .find(
        (bp, index, arr) =>
          BREAKPOINTS[bp] <= clientWidth && (index + 1 === arr.length || BREAKPOINTS[arr[index + 1]] > clientWidth),
      );

    return breakpoint ? values[breakpoint] : defaultValue;
  }, [values, defaultValue, clientWidth]) as T;
};
