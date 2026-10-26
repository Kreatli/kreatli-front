import { initAmplitude } from './amplitude';

// Conversion events for the SEO loop: which landing pages bring in creators and clippers.
// Events carry the visitor's first-ever landing page and this session's landing page, so Amplitude can
// chart sign-ups and jobs by the SEO page that started the visit.

export type ConversionEvent =
  | 'signup_completed'
  | 'account_activated'
  | 'job_created'
  | 'clipper_applied';

interface Touch {
  path: string;
  referrer: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  at: string;
}

const FIRST_TOUCH_KEY = 'kreatli_first_touch';
const SESSION_TOUCH_KEY = 'kreatli_session_touch';

// URL sections that hold SEO content, mapped to a short label for charts.
const CONTENT_SECTIONS: Record<string, string> = {
  '/guides': 'guide',
  '/glossary': 'glossary',
  '/compare': 'compare',
  '/hire': 'hire',
  '/alternatives': 'alternatives',
  '/tools': 'tool',
  '/clipping-jobs': 'clipping-jobs',
  '/blog': 'blog',
};

const readStorage = (storage: Storage, key: string): Touch | null => {
  try {
    const raw = storage.getItem(key);
    return raw ? (JSON.parse(raw) as Touch) : null;
  } catch {
    return null;
  }
};

const writeStorage = (storage: Storage, key: string, touch: Touch) => {
  try {
    storage.setItem(key, JSON.stringify(touch));
  } catch {
    // Storage can be blocked (private mode, disabled cookies); attribution is best-effort.
  }
};

const externalReferrer = () => {
  if (!document.referrer) return '';
  try {
    const referrer = new URL(document.referrer);
    return referrer.host === window.location.host ? '' : referrer.host;
  } catch {
    return '';
  }
};

const currentTouch = (): Touch => {
  const params = new URLSearchParams(window.location.search);
  return {
    path: window.location.pathname,
    referrer: externalReferrer(),
    utmSource: params.get('utm_source') ?? undefined,
    utmMedium: params.get('utm_medium') ?? undefined,
    utmCampaign: params.get('utm_campaign') ?? undefined,
    at: new Date().toISOString(),
  };
};

export const contentTypeForPath = (path: string) => {
  const section = Object.keys(CONTENT_SECTIONS).find((prefix) => path === prefix || path.startsWith(`${prefix}/`));
  if (section) return CONTENT_SECTIONS[section];
  return path === '/' ? 'home' : 'app';
};

const touchProperties = (prefix: string, touch: Touch | null) =>
  (touch
    ? {
      [`${prefix}_landing_path`]: touch.path,
      [`${prefix}_landing_type`]: contentTypeForPath(touch.path),
      [`${prefix}_referrer`]: touch.referrer || 'direct',
      ...(touch.utmSource && { [`${prefix}_utm_source`]: touch.utmSource }),
      ...(touch.utmMedium && { [`${prefix}_utm_medium`]: touch.utmMedium }),
      ...(touch.utmCampaign && { [`${prefix}_utm_campaign`]: touch.utmCampaign }),
    }
    : {});

const withAmplitude = (callback: (amplitude: typeof import('@amplitude/unified')) => void) => {
  initAmplitude()
    .then(() => import('@amplitude/unified'))
    .then(callback)
    .catch(() => {
      // Analytics is best-effort; never break the app over it.
    });
};

/** Records the first-ever and per-session landing page. Call once on app load, before any navigation. */
export const captureLandingPage = () => {
  if (typeof window === 'undefined') return;

  const touch = currentTouch();
  const isFirstVisit = !readStorage(localStorage, FIRST_TOUCH_KEY);

  if (isFirstVisit) writeStorage(localStorage, FIRST_TOUCH_KEY, touch);
  if (!readStorage(sessionStorage, SESSION_TOUCH_KEY)) writeStorage(sessionStorage, SESSION_TOUCH_KEY, touch);

  if (isFirstVisit) {
    withAmplitude((amplitude) => {
      const identify = new amplitude.Identify();
      Object.entries(touchProperties('first', touch)).forEach(([key, value]) => identify.setOnce(key, value));
      amplitude.identify(identify);
    });
  }
};

/** Tracks a conversion with the visitor's landing-page attribution attached. */
export const trackConversion = (event: ConversionEvent, properties: Record<string, string | number | boolean> = {}) => {
  if (typeof window === 'undefined') return;

  const attribution = {
    ...touchProperties('first', readStorage(localStorage, FIRST_TOUCH_KEY)),
    ...touchProperties('session', readStorage(sessionStorage, SESSION_TOUCH_KEY)),
  };

  withAmplitude((amplitude) => amplitude.track(event, { ...attribution, ...properties }));
};

/** Ties events to the signed-in account so pre-sign-up visits and later conversions join up. */
export const identifyUser = (user: { _id: string; role?: string } | null | undefined) => {
  if (typeof window === 'undefined' || !user?._id) return;

  withAmplitude((amplitude) => {
    if (amplitude.getUserId() !== user._id) amplitude.setUserId(user._id);
    if (user.role) {
      const identify = new amplitude.Identify();
      identify.set('role', user.role);
      amplitude.identify(identify);
    }
  });
};
