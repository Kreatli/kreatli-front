/**
 * On-page SEO rules for marketplace.kreatli.com (SEO-39, ported from kreatli.com's KRE-77 check). Every finding has a stable key, so a baseline
 * can separate new problems from known ones. Severities: "must" fails the gate, "warn" needs a note in the PR,
 * "info" is advice. Reading level, em dashes, claims, CTAs and images stay in `seo:qa`.
 */
import { jsonLdNodes } from './page.mjs';
import {
  countExact,
  firstWords,
  matchGroup,
  normalize,
  queryMatches,
  similarity,
  standsAlone,
  wordCount,
} from './text.mjs';
import { META_MAX_CHARS, META_SOFT_CHARS, phoneFontPx, phoneLines, TITLE_MAX_PX, titlePx } from './width.mjs';

const SITE_HOSTS = /^marketplace\.kreatli\.com$|^localhost$|^127\.0\.0\.1$/;
const BRAND = /\bkreat(li|ly|il)\b/i;

/** Headings that don't describe a topic, so they never count as covering one. */
const GENERIC_HEADINGS = new Set(
  [
    'short answer',
    'faq',
    'frequently asked questions',
    'related',
    'related pages',
    'related guides',
    'sources',
    'more resources',
    'related terms',
    'get started',
    'how it works',
    'on this page',
    'introduction',
    'still have questions',
  ].map(normalize),
);
const isGeneric = (text) => GENERIC_HEADINGS.has(normalize(text)) || /^faq\b/.test(normalize(text));

// Each SEO section's hub page: the parent a page should link up to.
const SECTION_HUBS = {
  guides: '/guides',
  glossary: '/glossary',
  compare: '/compare',
  hire: '/hire',
  alternatives: '/alternatives',
};

/**
 * Turns a registry entry's `targets` (src/content/seo/types.ts) into what the rules read: each group as `phrases`
 * (query first, then variants), and the section hub as the parent page. `entry.kind` is "buyer" for pages that quote
 * prices or competitor facts (compare, alternatives), else "content".
 */
export const toPageTargets = (path, entry) => {
  const group = ({ query, variants = [], volume, brand }) => ({
    phrases: [query, ...variants],
    volume,
    brand: Boolean(brand),
  });
  const section = path.split('/')[1] ?? '';
  const parent = SECTION_HUBS[section] !== path ? SECTION_HUBS[section] : undefined;
  return {
    path,
    kind: entry.kind,
    primary: group(entry.primary),
    secondary: entry.secondary.map(group),
    questions: entry.questions,
    ownedElsewhere: entry.ownedElsewhere.map(({ query, owner }) => ({ phrases: [query], owner })),
    exceptions: entry.exceptions ?? [],
    parentLinks: parent && parent !== path ? [parent] : [],
  };
};

const label = (group) => `"${group.phrases[0]}"${group.volume ? ` (${group.volume.toLocaleString('en-US')}/mo)` : ''}`;

export const pathOf = (href, base) => {
  try {
    const url = new URL(href, base);
    if (!SITE_HOSTS.test(url.hostname) && url.origin !== new URL(base).origin) return null;
    return url.pathname.replace(/\/$/, '') || '/';
  } catch {
    return null;
  }
};

const findingFactory =
  (targets, out) =>
  (group, rule, severity, message, fix, detail = '') => {
    const exception = targets.exceptions?.find((entry) => entry.rule === rule);
    out.push({
      path: targets.path,
      group,
      rule,
      severity,
      message,
      fix,
      key: `${targets.path}|${rule}${detail ? `|${detail}` : ''}`,
      excepted: exception ? `${exception.reason} (${exception.ticket})` : undefined,
    });
  };

/** Technical, targeting, structure, content, structured data and phone rules for one rendered page. */
export const auditPage = (page, targets, fetched, base) => {
  const out = [];
  const add = findingFactory(targets, out);
  const { primary } = targets;
  const allGroups = [primary, ...targets.secondary];
  const h1Text = page.h1s.map((h) => h.text);

  // Technical
  if (fetched.status !== 200)
    add('technical', 'status', 'must', `Returned HTTP ${fetched.status}.`, 'Serve the page with status 200.');
  if (fetched.finalPath !== targets.path)
    add(
      'technical',
      'redirect',
      'must',
      `Redirects to ${fetched.finalPath}.`,
      'Check the final URL or fix the redirect.',
    );
  const canonicalPath = page.canonical ? pathOf(page.canonical, base) : null;
  if (!page.canonical)
    add('technical', 'canonical-missing', 'warn', 'No canonical link.', 'Add a self-referencing canonical.');
  else if (canonicalPath !== targets.path)
    add(
      'technical',
      'canonical-other',
      'must',
      `Canonical points to ${page.canonical}.`,
      'Point the canonical at the page itself.',
    );
  if (/noindex/i.test(page.robots) && !fetched.allowNoindex)
    add(
      'technical',
      'noindex',
      'must',
      `Robots meta says "${page.robots}".`,
      'Remove noindex from a page meant to rank.',
    );
  if (!page.lang) add('technical', 'lang', 'warn', 'No lang attribute on <html>.', 'Set lang="en".');
  if (!page.ogTitle || !page.ogDescription)
    add(
      'technical',
      'open-graph',
      'warn',
      'Open Graph title or description is missing.',
      'Add og:title and og:description.',
    );

  // Targeting
  if (!matchGroup(page.title, primary.phrases, true))
    add(
      'targeting',
      'title-primary',
      'must',
      `Title "${page.title}" lacks the primary search ${label(primary)}.`,
      'Put the primary search near the start of the title.',
    );
  const width = titlePx(page.title);
  if (width > TITLE_MAX_PX)
    add(
      'targeting',
      'title-width',
      'warn',
      `Title is about ${width}px wide; Google cuts at about ${TITLE_MAX_PX}px.`,
      'Shorten the title or move the key words to the front.',
    );
  if (!primary.brand && (normalize(page.title).match(/\bkreatli\b/g) ?? []).length > 1)
    add(
      'targeting',
      'title-brand',
      'warn',
      'Brand appears more than once in the title.',
      'Keep "Kreatli" once, at the end.',
    );
  if (page.h1s.length !== 1)
    add('structure', 'h1-count', 'must', `Found ${page.h1s.length} H1s.`, 'Use exactly one H1.');
  // A brand primary (the homepage) belongs in the title; the H1 and opening answer describe the product.
  if (page.h1s.length > 0 && !primary.brand && !matchGroup(h1Text.join(' '), primary.phrases, true))
    add(
      'targeting',
      'h1-primary',
      'must',
      `H1 "${h1Text[0]}" lacks ${label(primary)}.`,
      'Include the primary search in the H1.',
    );
  const intro = firstWords(page.answer || page.mainText, 100);
  if (!primary.brand && !matchGroup(intro, primary.phrases))
    add(
      'targeting',
      'intro-primary',
      'must',
      `The first 100 words of the answer don't mention ${label(primary)}.`,
      'Answer the primary search in the first paragraph of the markdown body (it gets id="answer"), using its words.',
    );
  if (!page.metaDescription)
    add(
      'targeting',
      'meta-missing',
      'must',
      'No meta description.',
      'Write a meta description with the primary and one secondary search.',
    );
  else {
    if (!matchGroup(page.metaDescription, primary.phrases, true))
      add(
        'targeting',
        'meta-primary',
        'warn',
        `Meta description lacks ${label(primary)}.`,
        'Add the primary search to the meta description.',
      );
    else if (!matchGroup(page.metaDescription.slice(0, 120), primary.phrases, true))
      add(
        'targeting',
        'meta-front',
        'info',
        'The primary search comes after the first 120 characters of the meta.',
        'Move it forward; phones cut meta descriptions near 120 characters.',
      );
    if (
      targets.secondary.length > 0 &&
      !targets.secondary.some((group) => matchGroup(page.metaDescription, group.phrases, true))
    ) {
      const top = [...targets.secondary].sort((a, b) => (b.volume ?? 0) - (a.volume ?? 0))[0];
      add(
        'targeting',
        'meta-secondary',
        'warn',
        'Meta description has no secondary search.',
        `Add one, for example ${label(top)}.`,
      );
    }
    const chars = page.metaDescription.length;
    if (chars > META_MAX_CHARS)
      add(
        'targeting',
        'meta-length',
        'warn',
        `Meta description is ${chars} characters; Google shows about ${META_SOFT_CHARS} to ${META_MAX_CHARS}.`,
        'Shorten it to about 155 characters.',
      );
    else if (chars > META_SOFT_CHARS)
      add(
        'targeting',
        'meta-length',
        'info',
        `Meta description is ${chars} characters, at the edge of what Google shows.`,
        'Keep the important words in the first 120 characters.',
      );
  }
  targets.ownedElsewhere.forEach((owned) => {
    const ownPhrases = allGroups.flatMap((group) => group.phrases);
    const inTitleOrH1 = [page.title, ...h1Text].some((text) => standsAlone(text, owned.phrases, ownPhrases));
    if (inTitleOrH1)
      add(
        'targeting',
        'owned-elsewhere',
        'warn',
        `"${owned.phrases[0]}" is in the title or H1 but belongs to ${owned.owner}.`,
        'Remove it from the title and H1 so the pages stop competing.',
        owned.phrases[0],
      );
  });

  // Structure
  const topical = page.headings.filter((heading) => !isGeneric(heading.text));
  let previous = 0;
  page.headings.forEach((heading) => {
    if (previous && heading.level > previous + 1)
      add(
        'structure',
        'heading-skip',
        'warn',
        `"${heading.text}" is an H${heading.level} after an H${previous}.`,
        "Don't skip heading levels.",
        `${heading.level}:${normalize(heading.text)}`,
      );
    previous = heading.level;
  });
  const counts = new Map();
  page.headings
    .filter((heading) => heading.level <= 2)
    .forEach((heading) => {
      const text = normalize(heading.text);
      counts.set(text, (counts.get(text) ?? 0) + 1);
    });
  counts.forEach((n, text) => {
    if (n > 1)
      add(
        'structure',
        'heading-duplicate',
        'warn',
        `Heading "${text}" appears ${n} times.`,
        'Give each section a distinct heading.',
        text,
      );
  });
  targets.questions.forEach((question) => {
    const covered = topical.some(
      (heading) => heading.level >= 2 && question.headingPhrases.some((phrase) => matchGroup(heading.text, [phrase])),
    );
    if (!covered)
      add(
        'structure',
        'question-uncovered',
        'warn',
        `No heading covers: ${question.label}`,
        'Add a section or FAQ question whose heading names it.',
        question.id,
      );
  });
  const coveredSecondary = targets.secondary.filter((group) =>
    topical.some((heading) => heading.level >= 2 && heading.level <= 3 && matchGroup(heading.text, group.phrases)),
  ).length;
  if (targets.secondary.length > 0 && coveredSecondary === 0)
    add(
      'structure',
      'headings-no-secondary',
      'warn',
      'No H2 or H3 contains any secondary search.',
      'Name at least one section after a secondary search, where it reads naturally.',
    );

  // Content
  // The answer is usually part of the page copy already; count it once.
  const fullText = page.mainText.includes(page.answer) ? page.mainText : [page.answer, page.mainText].join('\n');
  const words = wordCount(fullText);
  targets.secondary.forEach((group) => {
    if (!matchGroup(fullText, group.phrases))
      add(
        'content',
        'secondary-missing',
        'warn',
        `The page never mentions ${label(group)}.`,
        'Use it once in natural wording, in a heading, paragraph or FAQ answer.',
        group.phrases[0],
      );
  });
  allGroups.forEach((group) => {
    const n = countExact(fullText, group.phrases);
    const share = words ? (n * group.phrases[0].split(' ').length) / words : 0;
    if (share > 0.025)
      add(
        'content',
        'repetition',
        'warn',
        `${label(group)} makes up ${(share * 100).toFixed(1)}% of the words (${n} times).`,
        'Use it less often; vary the wording.',
        group.phrases[0],
      );
  });
  if (targets.kind === 'buyer' && !/\b(checked|updated)\b|\b20\d\d\b/i.test(page.mainText))
    add(
      'content',
      'sources-dates',
      'info',
      'No visible check date or year for facts.',
      'Show when pricing or competitor facts were checked.',
    );

  // Structured data
  const nodes = jsonLdNodes(page.jsonLd);
  const types = (node) => [node['@type']].flat();
  const faqNode = nodes.find((node) => types(node).includes('FAQPage'));
  if (faqNode) {
    const schemaQuestions = [faqNode.mainEntity ?? []].flat().map((q) => normalize(q?.name ?? ''));
    const visible = new Set(page.faqVisible.map(normalize));
    const missing = schemaQuestions.filter((q) => q && !visible.has(q));
    if (missing.length > 0)
      add(
        'schema',
        'faq-mismatch',
        'warn',
        `${missing.length} FAQ question(s) in the structured data aren't visible on the page.`,
        'Keep the FAQ JSON-LD and the visible FAQ identical.',
      );
  }
  const howTo = nodes.find((node) => types(node).includes('HowTo'));
  if (howTo) {
    const hidden = [howTo.step ?? []]
      .flat()
      .map((step) => step?.name ?? '')
      .filter((name) => name && !matchGroup(fullText, [name]));
    if (hidden.length > 0)
      add(
        'schema',
        'howto-mismatch',
        'warn',
        `HowTo steps not visible: ${hidden.join('; ')}.`,
        'Show the same steps on the page.',
      );
  }
  if (targets.kind !== 'home' && !nodes.some((node) => types(node).includes('BreadcrumbList')))
    add('schema', 'breadcrumb-missing', 'info', 'No BreadcrumbList structured data.', 'Add breadcrumbs.');

  // Phones
  const h1 = page.h1s[0];
  if (h1) {
    const lines = phoneLines(h1.text, phoneFontPx(h1.className, 1));
    if (lines > 3) add('phones', 'h1-lines', 'warn', `H1 runs about ${lines} lines on a phone.`, 'Shorten the H1.');
  }
  page.headings
    .filter((heading) => heading.level === 2 && !heading.isAccordion && !isGeneric(heading.text))
    .forEach((heading) => {
      const lines = phoneLines(heading.text, phoneFontPx(heading.className, 2));
      if (lines > 3)
        add(
          'phones',
          'h2-lines',
          'warn',
          `"${heading.text}" runs about ${lines} lines on a phone.`,
          'Shorten the heading.',
          normalize(heading.text),
        );
    });

  return out;
};

/** Links rules. `inbound`: body links from other pages, found by crawling the sitemap. */
export const auditLinks = (targets, inbound, outboundPaths) => {
  const out = [];
  const add = (rule, severity, message, fix, detail = '') =>
    findingFactory(targets, out)('links', rule, severity, message, fix, detail);
  const others = inbound.filter((link) => link.from !== targets.path);
  const sources = new Set(others.map((link) => link.from));
  if (sources.size === 0)
    add('orphan', 'warn', 'No body links from other pages.', "Link it from related pages' body text.");
  else if (sources.size < 2)
    add(
      'inbound-count',
      'warn',
      `Only ${sources.size} page links to it in body text.`,
      'Add contextual links from at least two related pages.',
    );
  const groups = [targets.primary, ...targets.secondary];
  const anchors = others.map((link) => normalize(link.text)).filter(Boolean);
  if (anchors.length > 0 && !anchors.some((anchor) => groups.some((group) => matchGroup(anchor, group.phrases)))) {
    add(
      'anchor-match',
      'warn',
      "No incoming anchor uses one of the page's searches.",
      `Use "${targets.primary.phrases[0]}" (or a secondary search) as anchor text on at least one page.`,
    );
  }
  if (anchors.length >= 5) {
    const counts = new Map();
    anchors.forEach((anchor) => counts.set(anchor, (counts.get(anchor) ?? 0) + 1));
    const [top, n] = [...counts.entries()].sort((a, b) => b[1] - a[1])[0];
    // Exact-match internal anchors are fine for Google; this is advice only.
    if (n / anchors.length > 0.8)
      add(
        'anchor-diversity',
        'info',
        `${Math.round((100 * n) / anchors.length)}% of incoming anchors are "${top}".`,
        'Vary the anchor text naturally.',
      );
  }
  targets.parentLinks.forEach((parent) => {
    if (!outboundPaths.has(parent))
      add('parent-link', 'info', `No body link up to ${parent}.`, `Link ${parent} once from the page copy.`, parent);
  });
  return out;
};

/** Near-duplicate pages in one section: 5-word shingle similarity above 60%. */
export const auditDuplicates = (pages) => {
  const out = [];
  for (let i = 0; i < pages.length; i += 1) {
    for (let j = i + 1; j < pages.length; j += 1) {
      if (pages[i].path.split('/')[1] !== pages[j].path.split('/')[1]) continue;
      const score = similarity(pages[i].text, pages[j].text);
      if (score > 0.6) {
        out.push({
          path: pages[i].path,
          group: 'content',
          rule: 'near-duplicate',
          severity: 'warn',
          message: `${Math.round(score * 100)}% similar to ${pages[j].path}.`,
          fix: "Make each page's content specific to its own search.",
          key: `${pages[i].path}|near-duplicate|${pages[j].path}`,
        });
      }
    }
  }
  return out;
};

/**
 * Search Console rules. `rows`: { query, page (path), impressions, clicks, position }, query x page, marketplace only.
 * Cannibalization: another of our pages gets at least 1.5 times this page's impressions for a target search.
 */
export const auditGsc = (targets, page, rows) => {
  const out = [];
  const add = (rule, severity, message, fix, detail) =>
    findingFactory(targets, out)('data', rule, severity, message, fix, detail);
  const ours = rows.filter((row) => !BRAND.test(row.query));
  [targets.primary, ...targets.secondary].forEach((group) => {
    const impressions = new Map();
    ours.forEach((row) => {
      if (queryMatches(row.query, group.phrases))
        impressions.set(row.page, (impressions.get(row.page) ?? 0) + row.impressions);
    });
    const mine = impressions.get(targets.path) ?? 0;
    const [topPath, topImpressions] = [...impressions.entries()].sort((a, b) => b[1] - a[1])[0] ?? ['', 0];
    if (topPath && topPath !== targets.path && topImpressions >= mine * 1.5 && topImpressions >= 20) {
      add(
        'cannibalization',
        'warn',
        `Google shows ${topPath} more for ${label(group)} (${topImpressions} vs ${mine} impressions).`,
        'Decide which page owns this search; align titles, H1s and internal anchors.',
        group.phrases[0],
      );
    }
  });
  const topical = page.headings.filter((heading) => !isGeneric(heading.text));
  const targetPhrases = [targets.primary, ...targets.secondary].flatMap((group) => group.phrases);
  const perQuery = new Map();
  ours
    .filter((row) => row.page === targets.path)
    .forEach((row) => {
      const entry = perQuery.get(row.query) ?? { impressions: 0, position: 0 };
      entry.position =
        (entry.position * entry.impressions + row.position * row.impressions) /
        (entry.impressions + row.impressions || 1);
      entry.impressions += row.impressions;
      perQuery.set(row.query, entry);
    });
  [...perQuery.entries()]
    .filter(
      ([query, v]) =>
        v.impressions >= 10 &&
        v.position >= 4 &&
        v.position <= 20 &&
        !queryMatches(query, targetPhrases) &&
        !topical.some((heading) => matchGroup(heading.text, [query])),
    )
    .sort((a, b) => b[1].impressions - a[1].impressions)
    .slice(0, 5)
    .forEach(([query, v]) =>
      add(
        'gsc-opportunity',
        'info',
        `"${query}" brings ${v.impressions} impressions at position ${v.position.toFixed(1)}, with no heading for it.`,
        "Consider a section or FAQ answer for it, if it fits the page's intent.",
        query,
      ),
    );
  return out;
};
