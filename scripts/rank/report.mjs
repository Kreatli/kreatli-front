/**
 * marketplace.kreatli.com weekly ranking check (SEO-41), ported from kreatli.com's locked method (KRE-82). Search
 * Console only (owner decision, 26 Nov 2026): no live rank checks. Read-only on every data source; writes only under
 * .seo-reports/rank/ and, with --post, Linear comments through seo:linear. Runs under tsx.
 *
 * Usage:
 *   npm run seo:rank                         # last full week (Mon-Sun) before today
 *   npm run seo:rank -- --end 2026-11-22     # a given Sunday
 *   npm run seo:rank -- --post               # also comment on SEO-41 and on each rewritten page's ticket
 *   npm run seo:rank -- --repost             # post a week again (--post refuses a week that was already posted)
 *   npm run seo:rank -- --verify             # only check the lock
 *   npm run seo:rank -- --lock v1            # snapshot the method files (owner's OK only)
 *
 * Method (see scripts/rank/METHOD.md):
 * - Searches and volumes come from the locked keyword map (built from the registry's `targets`). A search counts a Search Console
 *   query when the query equals the label or one of its variants (case, punctuation and spacing ignored).
 * - Position: Search Console query x device, aggregated by property (per-search, never summed across pages). All
 *   devices plus desktop. Worldwide.
 * - Week over week holds the country mix at the earlier week's shares and names the country that drove a move.
 * - A move is flagged when it's at least max(0.5, 2 x that search's median weekly move over final weeks). It's
 *   confirmed when the week before moved the same way past the threshold.
 * - Seen in = weekly impressions / (monthly volume / 4.345), for searches with 200+ a month.
 * - Alerts: lost visibility, first impressions, Google showing another URL than the target, clicks halving on a page.
 *   (kreatli.com's "mixed with the marketplace" alert is dropped: this property has only the marketplace.)
 */
import { execFileSync } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

import { SEO_PAGES } from '../../src/content/seo/registry.ts';
import { GSC_SITE, runComposio } from '../lib/gsc.ts';
import { normalize } from '../onpage/text.mjs';
import { mapFromRegistry } from './build-map.mjs';

const ROOT = process.cwd();
const HERE = path.join(ROOT, 'scripts/rank');
const MAP_FILE = path.join(HERE, 'keyword-map.json');
const LOCK_DIR = path.join(HERE, 'lock');
const LOCKED_FILES = [
  'scripts/rank/report.mjs',
  'scripts/rank/build-map.mjs',
  'scripts/rank/keyword-map.json',
  'scripts/rank/METHOD.md',
];
const OUT = path.join(ROOT, '.seo-reports/rank');
const CACHE = path.join(OUT, 'cache');
const SITE = 'marketplace.kreatli.com';
const SUMMARY_TICKET = 'SEO-41';
// Marketplace sign-ups (Composio account kreatli-com is the marketplace's Amplitude project, despite its name).
const AMPLITUDE_ACCOUNT = 'kreatli-com';
const SIGNUP_EVENT = 'signup_completed';
const LINEAR = ['tsx', 'scripts/seo-linear.ts'];
const DAY = 86_400_000;

const iso = (date) => date.toISOString().slice(0, 10);
const addDays = (isoDate, n) => iso(new Date(Date.parse(`${isoDate}T00:00:00Z`) + n * DAY));
const short = (isoDate) =>
  new Date(`${isoDate}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' });

// ---------- lock ----------

const sha256 = (file) =>
  crypto
    .createHash('sha256')
    .update(fs.readFileSync(path.join(ROOT, file)))
    .digest('hex');

const currentLock = () => {
  if (!fs.existsSync(LOCK_DIR)) return null;
  const versions = fs
    .readdirSync(LOCK_DIR)
    .filter((name) => fs.existsSync(path.join(LOCK_DIR, name, 'MANIFEST.sha256')))
    .sort();
  return versions.at(-1) ?? null;
};

/** Files that differ from the newest locked snapshot. Empty when everything matches. */
export const verifyLock = () => {
  const version = currentLock();
  if (!version) return { version: null, drift: ['no lock yet'] };
  const manifest = fs
    .readFileSync(path.join(LOCK_DIR, version, 'MANIFEST.sha256'), 'utf8')
    .trim()
    .split('\n');
  const drift = manifest
    .map((line) => line.split(/\s+/))
    .filter(([sum, file]) => !fs.existsSync(path.join(ROOT, file)) || sha256(file) !== sum)
    .map(([, file]) => file);
  return { version, drift };
};

const writeLock = (version) => {
  const dir = path.join(LOCK_DIR, version);
  if (fs.existsSync(dir)) throw new Error(`Lock ${version} already exists. Locks are never overwritten.`);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, 'MANIFEST.sha256'),
    `${LOCKED_FILES.map((file) => `${sha256(file)}  ${file}`).join('\n')}\n`,
  );
  console.log(`Locked ${LOCKED_FILES.length} files as ${version}.`);
};

// ---------- Search Console ----------

const gsc = (body) => {
  const rows = [];
  for (let startRow = 0; ; startRow += 25000) {
    const data = runComposio('GOOGLE_SEARCH_CONSOLE_SEARCH_ANALYTICS_QUERY', {
      site_url: GSC_SITE,
      row_limit: 25000,
      start_row: startRow,
      ...body,
    });
    const page = data.rows ?? [];
    rows.push(...page);
    if (page.length < 25000) return rows;
  }
};

const pagePath = (url) => {
  const u = new URL(url.split('#')[0]);
  return { host: u.host.replace(/^www\./, ''), path: u.pathname.replace(/\/$/, '') || '/' };
};

/** One week's raw rows, cached once the week is final (its Sunday is 6+ days old). */
const weekData = (monday, today) => {
  const sunday = addDays(monday, 6);
  const file = path.join(CACHE, `week_${monday}.json`);
  if (fs.existsSync(file)) {
    const cached = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (cached.final) return cached;
  }
  const base = { start_date: monday, end_date: sunday, data_state: 'all' };
  const data = {
    qd: gsc({ ...base, dimensions: ['query', 'device'], aggregation_type: 'byProperty' }),
    qc: gsc({ ...base, dimensions: ['query', 'country'], aggregation_type: 'byProperty' }),
    qp: gsc({ ...base, dimensions: ['query', 'page'] }),
    pg: gsc({ ...base, dimensions: ['page'] }),
    final: (Date.parse(today) - Date.parse(sunday)) / DAY >= 6,
    pulled: today,
  };
  fs.mkdirSync(CACHE, { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data));
  return data;
};

/** Index a week by normalized query. */
const indexWeek = (raw) => {
  const byQuery = (rows, fn) => {
    const out = new Map();
    rows.forEach((row) => {
      const key = normalize(row.keys[0]);
      out.set(key, fn(out.get(key), row));
    });
    return out;
  };
  const qd = byQuery(raw.qd, (acc = {}, row) => {
    const device = row.keys[1];
    const a = acc[device] ?? { clicks: 0, impressions: 0, posSum: 0 };
    a.clicks += row.clicks;
    a.impressions += row.impressions;
    a.posSum += row.position * row.impressions;
    return { ...acc, [device]: a };
  });
  const qc = byQuery(raw.qc, (acc = {}, row) => {
    const a = acc[row.keys[1]] ?? { impressions: 0, posSum: 0 };
    a.impressions += row.impressions;
    a.posSum += row.position * row.impressions;
    return { ...acc, [row.keys[1]]: a };
  });
  const qp = byQuery(raw.qp, (acc = {}, row) => {
    const { host, path: p } = pagePath(row.keys[1]);
    const key = host === SITE ? p : `${host}${p}`;
    return { ...acc, [key]: (acc[key] ?? 0) + row.impressions };
  });
  const pg = new Map();
  raw.pg.forEach((row) => {
    const { host, path: p } = pagePath(row.keys[0]);
    if (host !== SITE) return;
    const a = pg.get(p) ?? { clicks: 0, impressions: 0 };
    a.clicks += row.clicks;
    a.impressions += row.impressions;
    pg.set(p, a);
  });
  return { qd, qc, qp, pg };
};

// ---------- per-search numbers ----------

const groupStats = (week, variants, target) => {
  let impressions = 0;
  let clicks = 0;
  let posSum = 0;
  let dImpr = 0;
  let dPos = 0;
  const pages = {};
  variants.forEach((v) => {
    Object.entries(week.qd.get(v) ?? {}).forEach(([device, a]) => {
      impressions += a.impressions;
      clicks += a.clicks;
      posSum += a.posSum;
      if (device === 'DESKTOP') {
        dImpr += a.impressions;
        dPos += a.posSum;
      }
    });
    Object.entries(week.qp.get(v) ?? {}).forEach(([p, n]) => (pages[p] = (pages[p] ?? 0) + n));
  });
  const ranked = Object.entries(pages).sort((a, b) => b[1] - a[1]);
  const total = ranked.reduce((n, [, x]) => n + x, 0);
  return {
    pos: impressions ? +(posSum / impressions).toFixed(1) : null,
    dpos: dImpr ? +(dPos / dImpr).toFixed(1) : null,
    impressions,
    clicks,
    top: ranked[0]?.[0] ?? null,
    targetShare: total && target ? Math.round((100 * (pages[target] ?? 0)) / total) : null,
  };
};

const countryPos = (week, variants) => {
  const acc = {};
  variants.forEach((v) =>
    Object.entries(week.qc.get(v) ?? {}).forEach(([c, a]) => {
      acc[c] = acc[c] ?? { impressions: 0, posSum: 0 };
      acc[c].impressions += a.impressions;
      acc[c].posSum += a.posSum;
    }),
  );
  return Object.fromEntries(
    Object.entries(acc)
      .filter(([, a]) => a.impressions)
      .map(([c, a]) => [c, [a.impressions, a.posSum / a.impressions]]),
  );
};

/**
 * Position change with the country mix held at the earlier week's shares (countries with 3+ impressions both weeks).
 */
export const fixedMixDelta = (A, B, minImpr = 3) => {
  const common = Object.keys(A).filter((c) => B[c] && A[c][0] >= minImpr && B[c][0] >= minImpr);
  const weight = common.reduce((n, c) => n + A[c][0], 0);
  if (!weight) return null;
  return +(common.reduce((n, c) => n + A[c][0] * (B[c][1] - A[c][1]), 0) / weight).toFixed(2);
};

const COUNTRY = {
  usa: 'US',
  gbr: 'UK',
  ind: 'India',
  can: 'Canada',
  aus: 'Australia',
  deu: 'Germany',
  phl: 'Philippines',
  pak: 'Pakistan',
  bra: 'Brazil',
  nga: 'Nigeria',
  fra: 'France',
  idn: 'Indonesia',
};

/** The country behind most of a fixed-mix move, if it explains more than half of it. */
export const mainDriver = (A, B, minImpr = 3) => {
  const common = Object.keys(A).filter((c) => B[c] && A[c][0] >= minImpr && B[c][0] >= minImpr);
  const weight = common.reduce((n, c) => n + A[c][0], 0);
  if (!weight) return null;
  const contrib = Object.fromEntries(common.map((c) => [c, (A[c][0] * (B[c][1] - A[c][1])) / weight]));
  const total = Object.values(contrib).reduce((n, x) => n + x, 0);
  const top = Object.keys(contrib).sort((a, b) => Math.abs(contrib[b]) - Math.abs(contrib[a]))[0];
  if (total && Math.abs(contrib[top]) > 0.5 * Math.abs(total) && contrib[top] > 0 === total > 0) {
    return `${COUNTRY[top] ?? top.toUpperCase()} ${A[top][1].toFixed(1)} → ${B[top][1].toFixed(1)}`;
  }
  return null;
};

/** Median absolute weekly move over consecutive final weeks with 20+ impressions both weeks; null under 3 pairs. */
export const noiseOf = (weeks, mondays, variants) => {
  const deltas = [];
  for (let i = 1; i < mondays.length; i += 1) {
    const A = countryPos(weeks[mondays[i - 1]], variants);
    const B = countryPos(weeks[mondays[i]], variants);
    const sum = (x) => Object.values(x).reduce((n, [impr]) => n + impr, 0);
    if (sum(A) >= 20 && sum(B) >= 20) {
      const d = fixedMixDelta(A, B);
      if (d !== null) deltas.push(Math.abs(d));
    }
  }
  if (deltas.length < 3) return null;
  deltas.sort((a, b) => a - b);
  return +deltas[Math.floor(deltas.length / 2)].toFixed(2);
};

export const seenIn = (impressions, volume) =>
  volume && volume >= 200 ? Math.min(100, Math.round((100 * impressions) / (volume / 4.345))) : null;

// ---------- context ----------

const googleUpdates = async (start, end) => {
  try {
    const incidents = await (
      await fetch('https://status.search.google.com/incidents.json', { signal: AbortSignal.timeout(30_000) })
    ).json();
    return incidents
      .filter((x) => x.begin.slice(0, 10) <= end && (!x.end || x.end.slice(0, 10) >= start))
      .map(
        (x) =>
          `${x.external_desc ?? 'Update'} (${short(x.begin.slice(0, 10))} to ${x.end ? short(x.end.slice(0, 10)) : 'still rolling out'})`,
      );
  } catch (error) {
    return [`Google status feed not reachable (${error.message})`];
  }
};

const siteChanges = (start, end) => {
  try {
    const out = execFileSync(
      'git',
      [
        'log',
        'origin/main',
        '--no-merges',
        `--since=${start} 00:00`,
        `--until=${end} 23:59`,
        '--format=%ad %s',
        '--date=format:%d %b',
        '--',
        'src/pages',
        'src/content/seo',
        'src/components',
        'next.config.js',
      ],
      { cwd: ROOT, encoding: 'utf8' },
    );
    const lines = out.split('\n').filter(Boolean);
    return lines.slice(0, 15).concat(lines.length > 15 ? [`…and ${lines.length - 15} more`] : []);
  } catch {
    return ['git log failed'];
  }
};

/** Sign-ups by first landing path (marketplace Amplitude). Null when Amplitude isn't reachable. */
const signups = (monday) => {
  try {
    const body = {
      e: JSON.stringify({
        event_type: SIGNUP_EVENT,
        group_by: [{ type: 'event', value: 'first_landing_path' }],
      }),
      start: monday.replace(/-/g, ''),
      end: addDays(monday, 6).replace(/-/g, ''),
      m: 'totals',
      i: '1',
    };
    let d = runComposio('AMPLITUDE_GET_EVENT_SEGMENTATION', body, { account: AMPLITUDE_ACCOUNT });
    // Composio nests the segmentation result; unwrap until the series is found.
    while (d && !d.seriesLabels && d.data) d = d.data;
    if (!d?.seriesLabels) return null;
    const labels = d.seriesLabels ?? [];
    return Object.fromEntries(
      labels.map((label, i) => [
        Array.isArray(label) ? label.at(-1) : label,
        (d.series?.[i] ?? []).reduce((n, x) => n + (typeof x === 'object' ? x.value : x), 0),
      ]),
    );
  } catch {
    return null;
  }
};

/**
 * Tickets to comment on: rewrite tickets In Progress (from seo:linear), and pages the writer published or rewrote in
 * the last 8 weeks. A writer commit is "feat(seo): ... (SEO-n)"; its page is the markdown body it changed most, since
 * the same commit also adds one-line links back on other pages.
 */
const BODY_FILE = /^src\/content\/seo\/bodies\/(guide|glossary|compare|hire|alternatives)\/([a-z0-9-]+)\.md$/;
const SECTION_OF = { guide: '/guides', glossary: '/glossary', compare: '/compare', hire: '/hire', alternatives: '/alternatives' };

const ticketPages = (sections, end) => {
  const targets = new Set(sections.map((s) => s.target));
  const out = new Map();
  const addPage = (ticket, pagePath) => {
    if (!targets.has(pagePath) || ticket === SUMMARY_TICKET) return;
    out.set(ticket, new Set([...(out.get(ticket) ?? []), pagePath]));
  };
  try {
    execFileSync('npx', [...LINEAR, 'list'], { cwd: ROOT, encoding: 'utf8' })
      .split('\n')
      .filter((line) => /\[P\d In Progress rewrite/.test(line))
      .forEach((line) => {
        (line.match(/\/[a-z0-9][a-z0-9\-/]*/g) ?? []).forEach((p) => addPage(line.split(' ')[0], p.replace(/\/$/, '')));
      });
  } catch {
    // Linear unreachable: fall back to the writer's commits only.
  }
  try {
    const log = execFileSync(
      'git',
      ['log', 'origin/main', '--no-merges', `--since=${addDays(end, -56)} 00:00`, '--format=@@%s', '--numstat'],
      { cwd: ROOT, encoding: 'utf8' },
    );
    log
      .split('@@')
      .filter(Boolean)
      .forEach((entry) => {
        const [subject, ...lines] = entry.split('\n').filter(Boolean);
        const ticket = subject.match(/^feat\(seo\):.*\((SEO-\d+)\)\s*$/)?.[1];
        if (!ticket) return;
        const bodies = lines
          .map((line) => line.split('\t'))
          .map(([added, deleted, file]) => ({ changed: Number(added) + Number(deleted), match: file?.match(BODY_FILE) }))
          .filter(({ match }) => match)
          .sort((x, y) => y.changed - x.changed);
        if (bodies[0]) addPage(ticket, `${SECTION_OF[bodies[0].match[1]]}/${bodies[0].match[2]}`);
      });
  } catch {
    // git unreachable: In Progress tickets only.
  }
  return out;
};

// ---------- report ----------

const lastSunday = (today) => {
  const d = new Date(`${today}T00:00:00Z`);
  const back = d.getUTCDay() === 0 ? 7 : d.getUTCDay();
  return iso(new Date(d.getTime() - back * DAY));
};

const parseArgs = () => {
  const args = process.argv.slice(2).filter((a) => a !== '--');
  const options = { end: null, post: false, repost: false, verify: false, lock: null };
  for (let i = 0; i < args.length; i += 1) {
    if (args[i] === '--end') options.end = args[++i];
    else if (args[i] === '--post') options.post = true;
    else if (args[i] === '--repost') options.post = options.repost = true;
    else if (args[i] === '--verify') options.verify = true;
    else if (args[i] === '--lock') options.lock = args[++i];
    else throw new Error(`Unknown option ${args[i]}`);
  }
  return options;
};

const BANDS = [
  [3.5, '🟩'],
  [6.5, '🟦'],
  [10.5, '🟨'],
  [20.5, '🟧'],
  [Infinity, '🟥'],
];
const sq = (p) => (p === null ? '⬜' : BANDS.find(([lim]) => p <= lim)[1]);
const cell = (s) => (s.pos === null ? '⬜ –' : `${sq(s.pos)} ${s.pos.toFixed(1)}`);
const wowCell = (r) => {
  if (r.wow === null) return '–';
  const arrow = r.wow < 0 ? `▲ ${Math.abs(r.wow).toFixed(1)}` : r.wow > 0 ? `▼ ${r.wow.toFixed(1)}` : '0.0';
  return `${arrow}${r.beyond ? ' ‼' : ''}`;
};

const run = async () => {
  const options = parseArgs();
  if (options.lock) return writeLock(options.lock);
  const { version, drift } = verifyLock();
  if (options.verify) {
    console.log(
      drift.length
        ? `DRIFT from ${version ?? 'no lock'}: ${drift.join(', ')}`
        : `Method files match the lock (${version}).`,
    );
    process.exitCode = drift.length ? 1 : 0;
    return;
  }
  if (!version && options.post) {
    console.error(
      "Stopped: nothing is posted before the method is locked (npm run seo:rank -- --lock v1, owner's OK).",
    );
    process.exitCode = 1;
    return;
  }
  if (version && drift.length) {
    console.error(
      `Stopped: the method differs from the lock (${version}): ${drift.join(', ')}. A method change needs the owner's OK and a new lock version.`,
    );
    process.exitCode = 1;
    return;
  }
  if (!version) console.warn('No lock yet: test run, nothing will be posted.');

  const map = JSON.parse(fs.readFileSync(MAP_FILE, 'utf8'));
  const today = iso(new Date());
  const end = options.end ?? lastSunday(today);
  if (new Date(`${end}T00:00:00Z`).getUTCDay() !== 0) throw new Error('--end must be a Sunday');
  const mondays = [];
  for (let m = map.historyStart; addDays(m, 6) <= end; m = addDays(m, 7)) mondays.push(m);
  const weeks = Object.fromEntries(mondays.map((m) => [m, indexWeek(weekData(m, today))]));
  const [prev, last] = mondays.slice(-2);
  const finals = mondays.filter((m) => (Date.parse(today) - Date.parse(addDays(m, 6))) / DAY >= 6);
  const provisional = !finals.includes(last);
  const show = mondays.slice(-6);

  // Sync check: the locked map against today's registry targets (reported, never fixed here).
  const live = JSON.stringify(mapFromRegistry(SEO_PAGES));
  const syncNote =
    live === JSON.stringify(map.sections)
      ? null
      : "Registry targets changed since the map was locked. Rebuild the map with the owner's OK and re-lock as a new version.";

  const outDir = path.join(OUT, end);
  const prevReport = path.join(OUT, addDays(end, -7), 'data.json');
  const reported = fs.existsSync(prevReport) ? JSON.parse(fs.readFileSync(prevReport, 'utf8')).rows : [];
  const alerts = [];
  const revisions = [];
  const rows = [];

  map.sections.forEach((section) => {
    section.queries.forEach(([label, rawVariants, volume]) => {
      const variants = [...new Set(rawVariants.map(normalize))];
      const series = Object.fromEntries(
        mondays.map((m) => [m, groupStats(weeks[m], variants, section.brand ? null : section.target)]),
      );
      const L = series[last];
      const P = series[prev];
      const P2 = series[mondays.at(-3)];
      const CL = countryPos(weeks[last], variants);
      const CP = countryPos(weeks[prev], variants);
      const fm = fixedMixDelta(CP, CL);
      const raw = L.pos !== null && P.pos !== null ? +(L.pos - P.pos).toFixed(1) : null;
      const wow = fm !== null ? +fm.toFixed(1) : raw;
      const noise = noiseOf(
        weeks,
        finals.filter((m) => m < last),
        variants,
      );
      const threshold = noise !== null ? Math.max(0.5, 2 * noise) : 1.5;
      const beyond = wow !== null && Math.abs(wow) >= threshold && L.impressions >= 20 && P.impressions >= 20;
      const row = {
        section: section.key,
        label,
        volume,
        target: section.brand ? null : section.target,
        brand: Boolean(section.brand),
        series,
        wow,
        noise,
        threshold,
        beyond,
        seen: seenIn(L.impressions, volume),
        seenPrev: seenIn(P.impressions, volume),
      };
      rows.push(row);

      const before = reported.find((r) => r.label === label);
      const settled = before?.series?.[prev]?.pos;
      if (before && settled != null && P.pos !== null && Math.abs(settled - P.pos) >= 0.5 && P.impressions >= 10) {
        revisions.push(`"${label}", week of ${short(prev)}: reported ${settled}, settled at ${P.pos}`);
      }
      if (row.brand) return;
      const d2 =
        P2 && P.pos !== null && P2.pos !== null
          ? (fixedMixDelta(countryPos(weeks[mondays.at(-3)], variants), CP) ?? P.pos - P2.pos)
          : null;
      let tag = null;
      const normal = noise !== null ? `normal weekly move ${noise}` : 'too little history; default threshold 1.5';
      if (beyond) {
        const same = d2 !== null && Math.abs(d2) >= threshold && d2 > 0 === wow > 0;
        tag = `${normal}; ${same ? 'confirmed: second week the same way' : 'not yet confirmed; check next week'}`;
        row.confirmed = same;
      } else if (
        wow !== null &&
        d2 !== null &&
        P.impressions >= 10 &&
        P2.impressions >= 10 &&
        L.impressions >= 10 &&
        Math.abs(wow) >= threshold &&
        Math.abs(d2) >= threshold &&
        wow > 0 === d2 > 0
      ) {
        tag = `${normal}; 2 weeks running at lower volume`;
        row.confirmed = true;
      }
      if (tag) {
        const driver = mainDriver(CP, CL);
        alerts.push(
          `${wow > 0 ? 'Slipped' : 'Gained'} ${Math.abs(wow).toFixed(1)} with the country mix held fixed: "${label}" on ${section.target} (raw ${P.pos} → ${L.pos}${driver ? `; mostly ${driver}` : ''}; ${tag})`,
        );
      }
      if (P.impressions >= 10 && L.impressions === 0)
        alerts.push(`Lost visibility: "${label}" (${P.impressions} impressions the week before, 0 last week)`);
      if (P.impressions === 0 && L.impressions >= 5)
        alerts.push(`First impressions: "${label}" ${L.impressions} at ${L.pos}`);
      if (L.top && L.top !== section.target && L.impressions >= 5 && P.top === section.target)
        alerts.push(`URL switch: Google now shows ${L.top} instead of ${section.target} for "${label}"`);
    });
  });

  const targetPages = [...new Set(map.sections.filter((s) => !s.brand).map((s) => s.target))];
  const pageTotals = Object.fromEntries(
    targetPages.map((p) => [
      p,
      Object.fromEntries(show.map((m) => [m, weeks[m].pg.get(p) ?? { clicks: 0, impressions: 0 }])),
    ]),
  );
  targetPages.forEach((p) => {
    const a = pageTotals[p][prev];
    const b = pageTotals[p][last];
    if (a.clicks >= 10 && b.clicks <= a.clicks / 2) alerts.push(`Clicks halved on ${p}: ${a.clicks} → ${b.clicks}`);
  });
  const amp = { [prev]: signups(prev), [last]: signups(last) };
  const changed = { google: await googleUpdates(last, end), site: siteChanges(last, end) };

  fs.mkdirSync(outDir, { recursive: true });
  fs.readdirSync(outDir)
    .filter((f) => f.startsWith('linear_'))
    .forEach((f) => fs.rmSync(path.join(outDir, f)));
  fs.writeFileSync(
    path.join(outDir, 'data.json'),
    JSON.stringify({ end, lock: version, weeks: mondays, rows, pageTotals, signups: amp, alerts, revisions, changed }),
  );

  // ---------- markdown ----------
  const head = `**Weekly ranking check (${short(today)} ${today.slice(0, 4)}), week of ${short(last)} to ${short(end)}** · method ${version}, Search Console only${provisional ? ' · last week is provisional (*)' : ''}`;
  const legend =
    "Bands: 🟩 1–3 · 🟦 4–6 · 🟨 7–10 · 🟧 11–20 · 🟥 21+ · ⬜ not shown. Positions are Search Console per-search averages (all devices, worldwide), only for searches where marketplace.kreatli.com appeared. **WoW** = change from the week before with the country mix held fixed (▲ up, ▼ down); ‼ = bigger than that search's own normal weekly move. **Seen in** = last week's impressions ÷ (monthly volume ÷ 4.345), shown from 200 searches a month. Volumes: exact Keyword Planner, worldwide English. Most searches have under 20 impressions a week, so ‼ needs 20+ both weeks; thin rows show impressions only." +
    (provisional ? " (*) Sunday's data is still coming in; next week's report lists revisions of 0.5 or more." : '');
  const table = (sectionRows) => {
    const cols = [
      'Search',
      '/mo',
      ...show.map((m) => `${short(m)}${m === last && provisional ? '*' : ''}`),
      'Seen in',
      'Impr',
      'Clicks',
      'WoW',
      'Google shows',
    ];
    const lines = [`| ${cols.join(' | ')} |`, `|${'---|'.repeat(cols.length)}`];
    sectionRows.forEach((r) => {
      const L = r.series[last];
      const P = r.series[prev];
      const shows = !L.top ? '–' : L.top === r.target || !r.target ? L.top : `${L.top} (target ${L.targetShare ?? 0}%)`;
      lines.push(
        `| ${[r.label, r.volume ?? '–', ...show.map((m) => cell(r.series[m])), r.seen === null ? '–' : `${r.seen}%`, `${P.impressions} → ${L.impressions}`, `${P.clicks} → ${L.clicks}`, wowCell(r), shows].join(' | ')} |`,
      );
    });
    return lines.join('\n');
  };
  const pagesTable = (pages) =>
    [
      `| Page | ${show.map(short).join(' | ')} | Sign-ups (prev → last) |`,
      `|${'---|'.repeat(show.length + 2)}`,
      ...pages.map(
        (p) =>
          `| ${p} | ${show.map((m) => `${pageTotals[p][m].clicks} · ${pageTotals[p][m].impressions}`).join(' | ')} | ${amp[prev] ? (amp[prev][p] ?? 0) : '–'} → ${amp[last] ? (amp[last][p] ?? 0) : '–'} |`,
      ),
    ].join('\n');
  const sectionBlock = (key) => {
    const s = map.sections.find((x) => x.key === key);
    return `### ${s.title}\n${table(rows.filter((r) => r.section === key))}`;
  };

  const moves = rows.filter((r) => r.beyond && !r.brand);
  const summary = [
    head,
    legend,
    `### Alerts\n${alerts.length ? alerts.map((a) => `- ${a}`).join('\n') : '- None this week.'}`,
    `### Moves past their own threshold\n${moves.length ? moves.map((r) => `- "${r.label}" (${r.target}): ${wowCell(r)}, ${r.confirmed ? 'confirmed' : 'not yet confirmed'}`).join('\n') : '- None.'}`,
    `### What changed that week\n**Google:** ${changed.google.length ? changed.google.join('; ') : 'no confirmed ranking update.'}\n**Our site (merged to main):** ${changed.site.length ? `\n${changed.site.map((l) => `- ${l}`).join('\n')}` : 'no page changes.'}`,
    ...(revisions.length ? [`### Revised after the data settled\n${revisions.map((r) => `- ${r}`).join('\n')}`] : []),
    ...(syncNote ? [`### Keyword map\n${syncNote}`] : []),
    ...(rows.some((r) => r.brand) ? [`### Brand\n${table(rows.filter((r) => r.brand))}`] : []),
    `### Page totals (clicks · impressions, all queries) and sign-ups by first landing page\n${amp[last] ? '' : "Amplitude wasn't reachable: sign-ups missing this week.\n\n"}${pagesTable(targetPages)}`,
    `### Every target search\n${map.sections
      .filter((s) => !s.brand)
      .map((s) => sectionBlock(s.key))
      .join('\n\n')}`,
  ].join('\n\n');
  fs.writeFileSync(path.join(outDir, `linear_${SUMMARY_TICKET}.md`), summary);

  const tickets = ticketPages(map.sections, end);
  const files = { [SUMMARY_TICKET]: summary };
  tickets.forEach((pages, ticket) => {
    const mine = alerts.filter((a) =>
      [...pages].some((p) => a.includes(p) || rows.some((r) => r.target === p && a.includes(`"${r.label}"`))),
    );
    const body = [
      head,
      legend,
      ...[...pages].map((p) => `${sectionBlock(p)}\n\n${pagesTable([p])}`),
      ...(mine.length ? [`### Alerts\n${mine.map((a) => `- ${a}`).join('\n')}`] : []),
    ].join('\n\n');
    files[ticket] = body;
    fs.writeFileSync(path.join(outDir, `linear_${ticket}.md`), body);
  });

  const postedFile = path.join(outDir, 'posted.json');
  if (options.post && fs.existsSync(postedFile) && !options.repost) {
    const posted = JSON.parse(fs.readFileSync(postedFile, 'utf8'));
    console.error(
      `Not posting: the week ending ${end} was already posted at ${posted.postedAt}. Use --repost to post again.`,
    );
    process.exitCode = 1;
  } else if (options.post) {
    Object.keys(files).forEach((ticket) => {
      execFileSync('npx', [...LINEAR, 'comment', ticket, '--file', path.join(outDir, `linear_${ticket}.md`)], {
        cwd: ROOT,
        stdio: 'inherit',
      });
    });
    fs.writeFileSync(postedFile, JSON.stringify({ postedAt: new Date().toISOString(), tickets: Object.keys(files) }));
  }
  console.log(
    JSON.stringify(
      {
        outDir: path.relative(ROOT, outDir),
        lock: version,
        weeks: mondays.length,
        lastWeek: last,
        provisional,
        searches: rows.length,
        alerts: alerts.length,
        moves: moves.length,
        tickets: Object.keys(files),
        synced: !syncNote,
      },
      null,
      1,
    ),
  );
};

if (import.meta.url === `file://${process.argv[1]}`) {
  run().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
