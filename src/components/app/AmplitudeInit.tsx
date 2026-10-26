import React from 'react';

import { initAmplitude } from '../../lib/amplitude';
import { captureLandingPage } from '../../lib/analytics';

export const AmplitudeInit = () => {
  React.useEffect(() => {
    captureLandingPage();
    initAmplitude().catch(() => {
      // Amplitude init is best-effort; avoid unhandled rejection in the console.
    });
  }, []);

  return null;
};
