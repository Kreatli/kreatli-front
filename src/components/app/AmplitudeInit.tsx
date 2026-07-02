import React from 'react';

import { initAmplitude } from '../../lib/amplitude';

export const AmplitudeInit = () => {
  React.useEffect(() => {
    initAmplitude().catch(() => {
      // Amplitude init is best-effort; avoid unhandled rejection in the console.
    });
  }, []);

  return null;
};
