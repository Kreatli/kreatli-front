/**
 * Text matching for the on-page SEO check (KRE-77, ported from AniDachi's ANI-81 check).
 *
 * Google treats reordered words, small connecting words and simple plurals as the same search, so a "near" match
 * is enough almost everywhere. Titles, H1s and meta descriptions use a tighter window, because a phrase spread
 * across a sentence there doesn't read as the search. Exact-match density is never rewarded.
 */

/** Small words that don't change what a search means ("how do you" vs "how to"). */
// prettier-ignore
const STOPWORDS = new Set([
  'a', 'an', 'the', 'to', 'do', 'does', 'you', 'your', 'i', 'can', 'is', 'are', 'of', 'for',
  'on', 'in', 'and', 'with', 'or', 'it', 'how',
]);

// Brand and product words people write as one word or two. Both count as the same search.
const COMPOUNDS = { frameio: 'frame io', safezone: 'safe zone', safezones: 'safe zones', safearea: 'safe area' };

/** Lowercase, spell out "&" and "+", drop apostrophes, keep letters and digits, split known compounds. */
export const normalize = (text) =>
  text
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/\+/g, ' plus ')
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .split(' ')
    .map((word) => COMPOUNDS[word] ?? word)
    .join(' ');

/** Words ending in "ie"/"ies" whose singular keeps the "ie" ("movies" -> "movie", not "movy"). */
const IE_PLURALS = new Set(['movies', 'cookies', 'zombies', 'selfies', 'rookies', 'hoodies', 'smoothies', 'goalies']);
// Words ending in "s" that aren't plurals here.
const KEEP_S = new Set([
  'series',
  'species',
  'canvas',
  'status',
  'analysis',
  'process',
  'yes',
  'news',
  'fps',
  'gps',
  'ads',
  'saas',
  'aws',
  'ios',
  'mbps',
  'kbps',
]);

/** Light stemming so "apps"/"app" and "parties"/"party" match; nothing smarter on purpose. */
export const stem = (token) => {
  if (KEEP_S.has(token)) return token;
  if (IE_PLURALS.has(token)) return token.slice(0, -1);
  if (token.length > 4 && token.endsWith('ies')) return `${token.slice(0, -3)}y`;
  // statuses -> status, processes -> process, buses -> bus.
  if (token.length > 5 && (token.endsWith('uses') || token.endsWith('sses'))) return token.slice(0, -2);
  if (token.length > 3 && token.endsWith('s') && !token.endsWith('ss')) return token.slice(0, -1);
  return token;
};

export const tokens = (text) => {
  const normalized = normalize(text);
  return normalized ? normalized.split(' ').map(stem) : [];
};

const contentTokens = (phrase) => {
  const all = tokens(phrase);
  const content = all.filter((token) => !STOPWORDS.has(token));
  return content.length > 0 ? content : all;
};

/**
 * "exact": the phrase's words appear in order, side by side (small words included).
 * "near": every meaningful word appears within a short window, in any order.
 * Body text uses a loose window (2 x content words + 2); titles, H1s and meta descriptions use a tight one
 * (content words + 3). Returns "exact", "near" or null.
 */
export const matchPhrase = (text, phrase, tight = false) => {
  const hay = tokens(text);
  const needle = tokens(phrase);
  if (needle.length === 0 || hay.length === 0) return null;
  for (let i = 0; i + needle.length <= hay.length; i += 1) {
    if (needle.every((token, j) => hay[i + j] === token)) return 'exact';
  }
  const want = contentTokens(phrase);
  const window = tight ? want.length + 3 : want.length * 2 + 2;
  for (let start = 0; start < hay.length; start += 1) {
    const slice = new Set(hay.slice(start, start + window));
    if (want.every((token) => slice.has(token))) return 'near';
  }
  return null;
};

/** Best match of any phrase in a search group. */
export const matchGroup = (text, phrases, tight = false) => {
  let best = null;
  for (const phrase of phrases) {
    const kind = matchPhrase(text, phrase, tight);
    if (kind === 'exact') return 'exact';
    if (kind === 'near') best = 'near';
  }
  return best;
};

/**
 * Does a search query belong to a search group? Stricter than page matching: words may be reordered, but small
 * words still count, and the query may add at most two words of its own.
 */
export const queryMatches = (query, phrases) => {
  const drop = new Set(['a', 'an', 'the']);
  const q = tokens(query).filter((token) => !drop.has(token));
  return phrases.some((phrase) => {
    const pool = [...q];
    for (const token of tokens(phrase).filter((t) => !drop.has(t))) {
      const index = pool.indexOf(token);
      if (index === -1) return false;
      pool.splice(index, 1);
    }
    return pool.length <= 2;
  });
};

/**
 * Is an owned search named on its own in the text? An exact occurrence doesn't count when a word next to it is one
 * of the page's own topic words: "TikTok safe zone checker" is its own search, not the hub's "safe zone checker".
 */
export const standsAlone = (text, ownedPhrases, ownPhrases) => {
  const hay = tokens(text);
  return ownedPhrases.some((phrase) => {
    const needle = tokens(phrase);
    const qualifiers = new Set(ownPhrases.flatMap(contentTokens).filter((token) => !needle.includes(token)));
    for (let i = 0; i + needle.length <= hay.length; i += 1) {
      if (!needle.every((token, j) => hay[i + j] === token)) continue;
      if (!qualifiers.has(hay[i - 1]) && !qualifiers.has(hay[i + needle.length])) return true;
    }
    return false;
  });
};

/** Exact, non-overlapping occurrences of any phrase in the group. */
export const countExact = (text, phrases) => {
  const hay = tokens(text);
  let count = 0;
  for (const phrase of phrases) {
    const needle = tokens(phrase);
    if (needle.length === 0) continue;
    for (let i = 0; i + needle.length <= hay.length; ) {
      if (needle.every((token, j) => hay[i + j] === token)) {
        count += 1;
        i += needle.length;
      } else {
        i += 1;
      }
    }
  }
  return count;
};

export const wordCount = (text) => tokens(text).length;

/** The first n words of a text, for "answer early" checks. */
export const firstWords = (text, n) => text.trim().split(/\s+/).slice(0, n).join(' ');

/** Jaccard similarity of 5-word shingles, for near-duplicate pages. */
export const similarity = (a, b) => {
  const shingles = (text) => {
    const t = tokens(text);
    const out = new Set();
    for (let i = 0; i + 5 <= t.length; i += 1) out.add(t.slice(i, i + 5).join(' '));
    return out;
  };
  const sa = shingles(a);
  const sb = shingles(b);
  if (sa.size === 0 || sb.size === 0) return 0;
  let shared = 0;
  for (const s of sa) if (sb.has(s)) shared += 1;
  return shared / (sa.size + sb.size - shared);
};
