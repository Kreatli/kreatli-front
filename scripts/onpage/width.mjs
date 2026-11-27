/**
 * Approximate rendered widths for the on-page SEO check (SEO-39, ported from kreatli.com's KRE-77).
 *
 * Google cuts titles by pixels (about 600px at 20px Arial), so titles are measured in Arial. Meta descriptions are
 * checked by characters (Google shows about 155 to 160). Widths are Arial advance widths per 1,000 units. Phone
 * headings use the site's own font, measured below.
 */
// prettier-ignore
const ARIAL = {
  a: 556, b: 556, c: 500, d: 556, e: 556, f: 278, g: 556, h: 556, i: 222, j: 222, k: 500, l: 222, m: 833,
  n: 556, o: 556, p: 556, q: 556, r: 333, s: 500, t: 278, u: 556, v: 500, w: 722, x: 500, y: 500, z: 500,
  A: 667, B: 667, C: 722, D: 722, E: 667, F: 611, G: 778, H: 722, I: 278, J: 500, K: 667, L: 556, M: 833,
  N: 722, O: 778, P: 667, Q: 778, R: 722, S: 667, T: 611, U: 722, V: 667, W: 944, X: 667, Y: 667, Z: 611,
  ' ': 278, '.': 278, ',': 278, ':': 278, ';': 278, "'": 191, '’': 222, '"': 355, '-': 333, '–': 556, '—': 1000,
  '(': 333, ')': 333, '!': 278, '?': 556, '&': 667, '+': 584, '/': 278, '|': 260, '%': 889, '@': 1015, '×': 584,
};

/** Width in ems. Digits and anything unlisted use Arial's standard 556 units. */
export const emWidth = (text) => {
  let units = 0;
  for (const ch of text) units += ARIAL[ch] ?? 556;
  return units / 1000;
};

export const TITLE_MAX_PX = 600;
export const META_MAX_CHARS = 160;
export const META_SOFT_CHARS = 155;

export const titlePx = (text) => Math.round(emWidth(text) * 20);

// Phone headings on marketplace.kreatli.com use Source Sans 3 at weight 600 (next/font). Advance widths per 1,000
// units, measured with canvas measureText on the live font, 27 Nov 2026 (SEO-39).
// prettier-ignore
const SOURCE_SANS_600 = {
  a: 516, b: 563, c: 462, d: 564, e: 507, f: 317, g: 520, h: 558, i: 262, j: 263, k: 522, l: 271, m: 843,
  n: 560, o: 549, p: 564, q: 564, r: 373, s: 431, t: 361, u: 556, v: 495, w: 748, x: 481, y: 495, z: 443,
  A: 558, B: 597, C: 576, D: 625, E: 538, F: 510, G: 628, H: 663, I: 282, J: 494, K: 597, L: 502, M: 745,
  N: 657, O: 674, P: 582, Q: 674, R: 592, S: 545, T: 546, U: 655, V: 536, W: 800, X: 541, Y: 501, Z: 540,
  ' ': 200, '.': 275, ',': 275, ':': 275, ';': 275, "'": 275, '’': 275, '"': 482, '-': 322, '–': 480, '—': 800,
  '(': 324, ')': 324, '!': 315, '?': 444, '&': 639, '+': 513, '/': 344, '|': 255, '%': 841, '@': 875, '×': 513,
  $: 513, '#': 513,
};
// Fitted against 421 H1, H2 and H3 headings measured at 375px on 25 pages: 1.02 predicts 420 exactly. The miss is a
// 2px boundary case (a third line at 331 of 333px), so a heading right at the line limit can read one line long.
const SOURCE_SANS_FACTOR = 1.02;
// A 375px phone minus the 21px side padding (px-6 at the site's 14px root font size).
export const PHONE_TEXT_WIDTH = 333;

const headingEm = (text) => {
  let units = 0;
  for (const ch of text) units += SOURCE_SANS_600[ch] ?? 513;
  return units / 1000;
};

/**
 * Lines a heading wraps to on a 375px phone, breaking like the browser does: between words, and after a hyphen
 * inside a word ("Per-" / "Clip").
 */
export const phoneLines = (text, fontPx, widthPx = PHONE_TEXT_WIDTH) => {
  const scale = fontPx * SOURCE_SANS_FACTOR;
  const space = headingEm(' ') * scale;
  let lines = 1;
  let current = 0;
  for (const word of text.trim().split(/\s+/)) {
    word.split(/(?<=-)(?=.)/).forEach((part, index) => {
      const width = headingEm(part) * scale;
      const gap = index === 0 ? space : 0;
      if (current === 0) current = width;
      else if (current + gap + width <= widthPx) current += gap + width;
      else {
        lines += 1;
        current = width;
      }
    });
  }
  return lines;
};

// The site's root font size is 14px, so Tailwind's rem sizes render at 0.875 of their usual pixels.
const ROOT_SCALE = 0.875;
const TAILWIND_SIZES = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
  '6xl': 60,
};
// Body headings without a size class render in `prose prose-lg` (18px base): H2 at 1.667em, H3 at 1.333em.
const PROSE_SIZES = { 1: 36 * ROOT_SCALE, 2: 30 * ROOT_SCALE, 3: 24 * ROOT_SCALE };

/**
 * Phone font size from the heading's classes: the unprefixed `text-*` size (the `sm:` and larger ones apply above
 * 640px). Headings without one are markdown body headings in the prose-lg style.
 */
export const phoneFontPx = (className = '', level = 2) => {
  const size = className
    .split(/\s+/)
    .map((name) => name.match(/^text-(xs|sm|base|lg|xl|[2-6]xl)$/)?.[1])
    .find(Boolean);
  return size ? TAILWIND_SIZES[size] * ROOT_SCALE : PROSE_SIZES[level] ?? PROSE_SIZES[2];
};
