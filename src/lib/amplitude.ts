let initPromise: Promise<void> | null = null;

export function initAmplitude(): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.resolve();
  }

  if (!initPromise) {
    initPromise = (async () => {
      const amplitude = await import('@amplitude/unified');

      amplitude.initAll('b450929af7a312a78bfcc10bbd844ed9', {
        analytics: {
          autocapture: true,
          fetchRemoteConfig: true,
        },
        sessionReplay: { sampleRate: 1 },
      });
    })();
  }

  return initPromise;
}
