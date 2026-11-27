// On-page SEO check tests (SEO-39, ported from kreatli.com's KRE-77). Run with: npm run seo:test
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { extractPage } from './page.mjs';
import { auditGsc, auditLinks, auditPage, toPageTargets } from './checks.mjs';
import { countExact, matchPhrase, normalize, queryMatches, similarity, standsAlone } from './text.mjs';
import { phoneFontPx, phoneLines, titlePx } from './width.mjs';

describe('matcher', () => {
  it('finds exact phrases regardless of case and punctuation', () => {
    assert.equal(matchPhrase('Frame.io Pricing (2026): Plans & Real Cost', 'frame.io pricing'), 'exact');
    assert.equal(normalize('Frame.io & Filestage'), 'frame io and filestage');
  });

  it('splits compounds people write both ways', () => {
    assert.equal(matchPhrase('TikTok safe zone overlay', 'tiktok safezone'), 'exact');
    assert.equal(matchPhrase('Best Frame.io alternatives', 'frameio alternative'), 'exact');
  });

  it('treats reordered words and small words as a near match', () => {
    assert.equal(matchPhrase('Proofing software online for clients', 'online proofing software'), 'near');
    assert.equal(matchPhrase('How do you review a video online?', 'how to review a video online'), 'near');
  });

  it('matches simple plurals but keeps fps, status and series whole', () => {
    assert.equal(matchPhrase('Best video review tools', 'video review tool'), 'exact');
    assert.equal(matchPhrase('60 fps converter', '60 fps converter'), 'exact');
    assert.equal(matchPhrase('Custom approval statuses', 'approval status'), 'exact');
  });

  it('does not match words scattered far apart', () => {
    const text =
      'Review your cut. Many other things happen here, and much later on, far along, software shows up for video.';
    assert.equal(matchPhrase(text, 'video review software'), null);
  });

  it('uses a tight window for titles and meta descriptions', () => {
    assert.equal(
      matchPhrase('Frame.io has a free plan, but pricing changes with seats', 'frame.io pricing', true),
      null,
    );
    assert.equal(matchPhrase('Pricing for Frame.io', 'frame.io pricing', true), 'near');
  });

  it('counts exact occurrences without overlap', () => {
    assert.equal(countExact('fps converter. An fps converter! fps', ['fps converter']), 2);
  });

  it('scores near-duplicate text', () => {
    const a = 'one two three four five six seven eight nine ten';
    assert.equal(similarity(a, a), 1);
    assert.equal(similarity(a, 'eleven twelve thirteen fourteen fifteen sixteen'), 0);
  });

  it('only counts an owned search that stands on its own', () => {
    const own = ['tiktok safe zone', 'tiktok safe zone checker'];
    assert.equal(standsAlone('TikTok safe zone checker', ['safe zone checker'], own), false);
    assert.equal(standsAlone('Safe zone checker for TikTok', ['safe zone checker'], own), true);
  });
});

describe('search query matching', () => {
  it('allows reordering and up to two extra words', () => {
    assert.equal(queryMatches('safe zone tiktok', ['tiktok safe zone']), true);
    assert.equal(queryMatches('tiktok safe zone png 2026', ['tiktok safe zone']), true);
    assert.equal(queryMatches('tiktok safe zone png template 2026', ['tiktok safe zone']), false);
  });

  it('keeps small words that change the intent', () => {
    assert.equal(queryMatches('file to link', ['link to file']), true);
    assert.equal(queryMatches('how to turn a file into a link', ['file to link converter']), false);
  });
});

describe('page reader', () => {
  const html = `<!doctype html><html lang="en"><head><title>Frame.io Pricing (2026) | Kreatli</title>
    <meta name="description" content="Frame.io pricing for teams of 3 to 15.">
    <meta property="og:title" content="x"><meta property="og:description" content="y">
    <link rel="canonical" href="https://kreatli.com/comparisons/frame-io-pricing"></head>
    <body><nav class="flex"><a href="/pricing">Pricing</a></nav><header><a href="/">Home</a></header>
    <svg><title>icon</title></svg>
    <h1 class="text-3xl font-bold sm:text-4xl">Frame.io Pricing (2026)</h1>
    <p>Short hero line.</p>
    <ul><li><a href="#plans">Frame.io plans and prices</a></li><li><a href="#faq">FAQ</a></li></ul>
    <section><h2 class="text-2xl">What Frame.io costs</h2>
    <p id="answer">Frame.io pricing starts at $15 per seat a month.</p>
    <p>Same block.</p><p>Same block.</p></section>
    <h2><button>Does Frame.io have a free plan?</button></h2><div><p>Yes, with limits.</p></div>
    <nav aria-label="Related pages"><a href="/comparisons">Comparisons</a></nav>
    <nav aria-label="Breadcrumb"><a href="/">Home</a></nav>
    <p>See <a href="/comparisons/frame-io-free-plan-limits">Frame.io free plan limits</a>.</p>
    <footer><a href="/terms">Terms</a></footer>
    <script type="application/ld+json">
      {"@type":"FAQPage","mainEntity":[{"name":"Does Frame.io have a free plan?"}]}
    </script>
    </body></html>`;
  const page = extractPage(html);

  it('reads title, meta, canonical and lang', () => {
    assert.equal(page.title, 'Frame.io Pricing (2026) | Kreatli');
    assert.equal(page.canonical, 'https://kreatli.com/comparisons/frame-io-pricing');
    assert.equal(page.lang, 'en');
  });

  it('leaves out chrome and tables of contents, and counts repeated blocks once', () => {
    assert.ok(!page.mainText.includes('Frame.io plans and prices'), 'table of contents leaked into the copy');
    assert.ok(!page.mainText.includes('Terms'));
    assert.equal(page.mainText.split('Same block.').length - 1, 1);
  });

  it('reads the answer from id="answer", else the first real paragraph after the H1', () => {
    assert.equal(page.answer, 'Frame.io pricing starts at $15 per seat a month.');
    const fallback = extractPage(
      '<body><h1>Hi</h1><p>Too short.</p><p>This paragraph has more than eight words in it.</p></body>',
    );
    assert.equal(fallback.answer, 'This paragraph has more than eight words in it.');
  });

  it('keeps related-page links, drops site navigation, breadcrumbs, header and footer', () => {
    assert.deepEqual(
      page.links.map((link) => link.href),
      ['/comparisons', '/comparisons/frame-io-free-plan-limits'],
    );
  });

  it('collects headings with classes, accordion FAQ questions and JSON-LD', () => {
    assert.deepEqual(page.h1s, [{ text: 'Frame.io Pricing (2026)', className: 'text-3xl font-bold sm:text-4xl' }]);
    assert.ok(page.headings.some((h) => h.level === 2 && h.isAccordion));
    assert.deepEqual(page.faqVisible, ['Does Frame.io have a free plan?']);
    assert.equal(page.jsonLd.length, 1);
  });

  it('keeps words apart in card links', () => {
    const card = extractPage('<body><a href="/x"><h3>Agency Review Tool</h3><p>For agencies</p></a></body>');
    assert.equal(card.links[0].text, 'Agency Review Tool For agencies');
  });

  it('reads a title Next.js streamed into the body, not an SVG title', () => {
    const streamed = extractPage(
      '<html><head></head><body><svg><title>icon</title></svg><title>Real title</title></body></html>',
    );
    assert.equal(streamed.title, 'Real title');
  });
});

describe('widths', () => {
  it('measures titles in pixels', () => {
    assert.ok(titlePx('Hire a Kick Clipper | Kreatli') < 600);
    assert.ok(titlePx('Freelance Clipper vs. In-House Editor: Which Should You Hire for Short-Form Clips? | Kreatli') > 600);
  });

  // Measured at 375px on marketplace.kreatli.com, 27 Nov 2026 (H1 31.5px, body H2 26.25px, H3 21px).
  it('predicts heading lines on a phone', () => {
    assert.equal(phoneLines('Hire a Kick Clipper', 31.5), 1);
    assert.equal(phoneLines('How Much Does Video Editing Cost? Rates by Video Type in 2026', 31.5), 3);
    assert.equal(phoneLines('Freelance Clipper vs. In-House Editor: Which Should You Hire for Short-Form Clips?', 31.5), 4);
    assert.equal(phoneLines('Kick clipper vs Twitch clipper', 26.25), 2);
    assert.equal(phoneLines('Free Nexus Clips alternatives', 26.25), 1);
    assert.equal(phoneLines('Why Twitch clipping is different from regular editing', 26.25), 3);
    assert.equal(phoneLines('What is the difference between a freelance video editor and a clipper?', 21), 3);
  });

  it('reads the phone font size from the class, else the prose heading size, at the 14px root', () => {
    assert.equal(phoneFontPx('text-4xl font-semibold mb-4', 1), 31.5);
    assert.equal(phoneFontPx('text-2xl font-semibold sm:text-3xl', 2), 21);
    assert.equal(phoneFontPx('', 2), 26.25);
    assert.equal(phoneFontPx('', 3), 21);
  });
});

describe('rules', () => {
  const targets = toPageTargets('/hire/hire-a-kick-clipper', {
    kind: 'content',
    primary: { query: 'hire a kick clipper', volume: null },
    secondary: [{ query: 'kick clipper', variants: ['kick clippers'], volume: 320 }],
    questions: [{ id: 'cost', label: 'How much does a Kick clipper cost?', headingPhrases: ['cost to hire a kick clipper'] }],
    ownedElsewhere: [{ query: 'hire clippers', owner: '/hire' }],
    exceptions: [],
  });
  const html = (title, h1s) => `<html lang="en"><head><title>${title}</title>
    <meta name="description"
      content="Hire a Kick clipper to turn streams into Shorts and TikToks. What a Kick clipper costs and how to post a job.">
    <meta property="og:title" content="x"><meta property="og:description" content="y">
    <link rel="canonical" href="https://marketplace.kreatli.com/hire/hire-a-kick-clipper"></head><body><main>${h1s}
    <p id="answer">To hire a Kick clipper, post a clipping job and choose from editors who turn streams into clips.</p>
    <h2>How much does it cost to hire a Kick clipper?</h2><p>A Kick clipper costs $15 to $35 a clip.</p>
    <p>${'Clippers watch the stream, cut the best moments and caption them for each platform you post on. '.repeat(40)}</p>
    <script type="application/ld+json">{"@type":"BreadcrumbList"}</script></main></body></html>`;
  const run = (title, h1s) =>
    auditPage(
      extractPage(html(title, h1s)),
      targets,
      { status: 200, finalPath: targets.path, allowNoindex: false },
      'https://marketplace.kreatli.com',
    );

  it('passes a page that follows the rules', () => {
    const findings = run('Hire a Kick Clipper | Kreatli', '<h1 class="text-4xl">Hire a Kick Clipper</h1>');
    assert.deepEqual(
      findings.filter((f) => f.severity !== 'info').map((f) => f.rule),
      [],
    );
  });

  it('fails a title without the primary search and a page with two H1s', () => {
    const rules = run('Twitch clips | Kreatli', '<h1>Hire a Kick Clipper</h1><h1>Again</h1>').map((f) => f.rule);
    assert.ok(rules.includes('title-primary'));
    assert.ok(rules.includes('h1-count'));
  });

  it('flags a search owned by another page in the title', () => {
    const rules = run('Hire Clippers: Hire a Kick Clipper | Kreatli', '<h1>Hire a Kick Clipper</h1>').map((f) => f.rule);
    assert.ok(rules.includes('owned-elsewhere'));
  });

  it('marks approved exceptions', () => {
    const excepted = toPageTargets(targets.path, {
      kind: 'content',
      primary: { query: 'hire a kick clipper', volume: null },
      secondary: [],
      questions: [],
      ownedElsewhere: [],
      exceptions: [{ rule: 'title-primary', reason: 'Brand-led title', ticket: 'SEO-0' }],
    });
    const page = extractPage(html('Something else | Kreatli', '<h1>Hire a Kick Clipper</h1>'));
    const finding = auditPage(
      page,
      excepted,
      { status: 200, finalPath: targets.path, allowNoindex: false },
      'https://marketplace.kreatli.com',
    ).find((f) => f.rule === 'title-primary');
    assert.equal(finding.excepted, 'Brand-led title (SEO-0)');
  });

  it('checks incoming links and the link up to the section hub', () => {
    const rules = auditLinks(targets, [{ from: '/a', text: 'read more' }], new Set()).map((f) => f.rule);
    assert.ok(rules.includes('inbound-count'));
    assert.ok(rules.includes('anchor-match'));
    assert.ok(rules.includes('parent-link'));
  });

  it('flags cannibalization from Search Console rows, and skips brand queries', () => {
    const page = extractPage(html('Hire a Kick Clipper | Kreatli', '<h1>Hire a Kick Clipper</h1>'));
    const rows = [
      { query: 'kick clipper', page: '/guides/get-paid-to-clip-kick-streams', impressions: 60, clicks: 0, position: 40 },
      { query: 'kick clippers', page: targets.path, impressions: 10, clicks: 0, position: 30 },
      { query: 'kreatli kick clipper', page: '/', impressions: 500, clicks: 9, position: 1 },
    ];
    const finding = auditGsc(targets, page, rows).find((f) => f.rule === 'cannibalization');
    assert.match(finding.message, /get-paid-to-clip-kick-streams more for "kick clipper".*60 vs 10/);
  });
});
