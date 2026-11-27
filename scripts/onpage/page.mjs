/**
 * Reads a rendered marketplace.kreatli.com page the way the SEO checks need it (ported from kreatli.com, SEO-39).
 * Shared by `seo:qa` and `seo:onpage`, so both see the same page copy.
 *
 * Page copy: `<main>` when there is one (marketplace pages have one), else `<body>`, without site chrome
 * (header, footer, navigation), code and anything marked `data-seo-ignore`. Each text block counts once, because
 * responsive layouts render some blocks twice.
 */
import { parse } from 'node-html-parser';

const CHROME = 'header, footer, nav, script, style, noscript, svg, template, [data-seo-ignore]';
const BLOCKS = 'p, li, td, h2, h3, h4, blockquote, figcaption';
const clean = (text) => text.replace(/\s+/g, ' ').trim();

export const parsePage = (html) => parse(html);

/** Page copy without site chrome: `{ content, blocks, text }`. `content` is a detached copy, safe to change. */
export const readContent = (root) => {
  const content = (root.querySelector('main') ?? root.querySelector('body') ?? root).clone();
  content.querySelectorAll(CHROME).forEach((node) => node.remove());
  // Tables of contents: lists made only of in-page links. They repeat the headings and aren't page copy.
  content
    .querySelectorAll('ul, ol')
    .filter((list) => {
      const links = list.querySelectorAll('a');
      return links.length > 1 && links.every((a) => (a.getAttribute('href') ?? '').startsWith('#'));
    })
    .forEach((list) => list.remove());
  const seen = new Set();
  const blocks = content
    .querySelectorAll(BLOCKS)
    .map((node) => clean(node.text))
    .filter((block) => block && !seen.has(block) && seen.add(block));
  return { content, blocks, text: blocks.join('\n') };
};

// Navigation inside the page copy that still counts for links (an aria-labelled "Related pages" list). The site
// navbar has no aria-label; breadcrumbs are navigation, not body links.
const isChromeNav = (nav) => !nav.getAttribute('aria-label') || /breadcrumb/i.test(nav.getAttribute('aria-label'));
const inChrome = (node) =>
  Boolean(node.closest('header, footer, [data-seo-ignore]')) ||
  (node.closest('nav') ? isChromeNav(node.closest('nav')) : false);

const parseJsonLd = (root) =>
  root
    .querySelectorAll('script[type="application/ld+json"]')
    .map((node) => {
      try {
        return JSON.parse(node.text);
      } catch {
        return null;
      }
    })
    .filter((data) => data !== null);

/** Flatten JSON-LD (top-level arrays and @graph) into typed nodes. */
export const jsonLdNodes = (jsonLd) => {
  const out = [];
  const add = (value) => {
    if (Array.isArray(value)) value.forEach(add);
    else if (value && typeof value === 'object') {
      if (Array.isArray(value['@graph'])) add(value['@graph']);
      else out.push(value);
    }
  };
  jsonLd.forEach(add);
  return out;
};

/**
 * Everything the on-page check reads. The answer is the element with id="answer" (the first paragraph of the
 * markdown body, marked in loadPage.ts), or the first paragraph of 8+ words after the H1.
 */
export const extractPage = (html) => {
  const root = parsePage(html);
  const meta = (key) =>
    root
      .querySelectorAll('meta')
      .find((node) => node.getAttribute('name') === key || node.getAttribute('property') === key)
      ?.getAttribute('content')
      ?.trim() ?? '';
  const body = root.querySelector('body') ?? root;
  const { content, blocks, text } = readContent(root);

  const h1s = body
    .querySelectorAll('h1')
    .filter((node) => !inChrome(node))
    .map((node) => ({ text: clean(node.text), className: node.getAttribute('class') ?? '' }))
    .filter((heading) => heading.text);

  const headings = content
    .querySelectorAll('h1, h2, h3, h4, h5, h6')
    .map((node) => ({
      level: Number(node.tagName[1]),
      text: clean(node.text),
      className: node.getAttribute('class') ?? '',
      // FAQ questions render as accordion buttons inside headings.
      isAccordion: Boolean(node.querySelector('button')),
    }))
    .filter((heading) => heading.text);

  let answer = clean(content.querySelector('#answer')?.text ?? '');
  if (!answer) {
    const ordered = content.querySelectorAll('h1, p').map((node) => ({ tag: node.tagName, text: clean(node.text) }));
    const start = Math.max(
      0,
      ordered.findIndex((node) => node.tag === 'H1'),
    );
    answer = ordered.slice(start).find((node) => node.tag === 'P' && node.text.split(' ').length >= 8)?.text ?? '';
  }

  const links = body
    .querySelectorAll('a[href]')
    .filter((node) => !inChrome(node) && !node.getAttribute('href').startsWith('#'))
    .map((node) => ({ href: node.getAttribute('href'), text: clean(node.structuredText) }));

  const faqVisible = Array.from(
    new Set(
      content
        .querySelectorAll('summary, h2, h3, h4')
        .map((node) => clean(node.text))
        .filter((question) => question.endsWith('?')),
    ),
  );

  return {
    // The head first; Next.js can stream metadata into the body, where SVG icons also have <title>s.
    title: clean(
      (root.querySelector('head title') ?? root.querySelectorAll('title').find((node) => !node.closest('svg')))?.text ??
        '',
    ),
    metaDescription: meta('description'),
    robots: meta('robots'),
    canonical: root.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '',
    lang: root.querySelector('html')?.getAttribute('lang') ?? '',
    ogTitle: meta('og:title'),
    ogDescription: meta('og:description'),
    h1s,
    headings,
    blocks,
    mainText: text,
    answer,
    links,
    faqVisible,
    jsonLd: parseJsonLd(root),
  };
};
