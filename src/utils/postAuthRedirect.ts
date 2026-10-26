// Remembers where a signed-out visitor was heading (e.g. /jobs/create) so they can be sent back there
// after signing up, activating their account from the email link and signing in.
// Stored in localStorage so it survives the trip through the activation email in the same browser.

const STORAGE_KEY = 'postAuthRedirect';
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

// Paths professionals can't use (they get a 404 there), so don't send them back to these.
const NOT_FOR_PROFESSIONALS = ['/jobs/create'];

interface StoredRedirect {
  path: string;
  savedAt: number;
}

const isSafePath = (path: string) => path.startsWith('/') && !path.startsWith('//');

export const setPostAuthRedirect = (path: string) => {
  if (!isSafePath(path)) {
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ path, savedAt: Date.now() } satisfies StoredRedirect));
  } catch {
    // Storage can be unavailable (private mode, blocked site data); the redirect is a convenience only.
  }
};

export const getPostAuthRedirect = (): string | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return null;
    }

    const { path, savedAt } = JSON.parse(raw) as StoredRedirect;

    if (typeof path !== 'string' || !isSafePath(path) || Date.now() - savedAt > MAX_AGE_MS) {
      localStorage.removeItem(STORAGE_KEY);

      return null;
    }

    return path;
  } catch {
    return null;
  }
};

export const clearPostAuthRedirect = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore unavailable storage.
  }
};

/** Returns (and clears) the remembered destination for this user, or the given fallback. */
export const consumePostAuthRedirect = (role: string | undefined, fallback: string) => {
  const path = getPostAuthRedirect();

  clearPostAuthRedirect();

  if (!path || (role === 'professional' && NOT_FOR_PROFESSIONALS.includes(path))) {
    return fallback;
  }

  return path;
};
