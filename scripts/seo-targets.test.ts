/**
 * Checks the search targets in src/content/seo/registry.ts (SEO-38). Run with `npm run seo:test`.
 * Ported from kreatli.com's targets.test.mjs, plus a check that every question matches a real heading on the page.
 */

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

import { getPageUrl } from '../src/content/seo/paths';
import { SEO_PAGES } from '../src/content/seo/registry';
import { SEO_APP_PAGE_OWNERS, SeoPage, SeoPageTargets, SeoSearchGroup } from '../src/content/seo/types';

const norm = (text: string) =>
  text
    .toLowerCase()
    .replace(/[‘’]/g, "'")
    .replace(/\s+/g, ' ')
    .trim();

const targeted = SEO_PAGES.filter((page): page is SeoPage & { targets: SeoPageTargets } => Boolean(page.targets));
const pathOf = (page: SeoPage) => getPageUrl(page.type, page.slug);
const pageByPath = new Map(SEO_PAGES.map((page) => [pathOf(page), page]));
const groupsOf = (targets: SeoPageTargets) => [targets.primary, ...targets.secondary];
const searchesOfGroup = (group: SeoSearchGroup) => [group.query, ...(group.variants ?? [])].map(norm);
/** Every search a page owns: its target groups, or just its primary keyword when it has no targets yet. */
const searchesOf = (page: SeoPage) => {
  if (!page.targets) return [norm(page.primaryKeyword)];
  return groupsOf(page.targets).flatMap(searchesOfGroup);
};

test('targets exist for the pages SEO-38 covers', () => {
  assert.ok(targeted.length >= 26, `only ${targeted.length} pages have targets`);
});

test('primary is the registry primaryKeyword', () => {
  targeted.forEach((page) => assert.equal(page.targets.primary.query, norm(page.primaryKeyword), pathOf(page)));
});

test('no search is targeted by two pages, or twice on one page', () => {
  const owners = new Map<string, string>();
  SEO_PAGES.forEach((page) => {
    searchesOf(page).forEach((search) => {
      assert.ok(!owners.has(search), `"${search}" is targeted by ${owners.get(search)} and ${pathOf(page)}`);
      owners.set(search, pathOf(page));
    });
  });
  Object.entries(SEO_APP_PAGE_OWNERS).forEach(([owner, searches]) => {
    searches.map(norm).forEach((search) => {
      assert.ok(!owners.has(search), `"${search}" is owned by ${owner} and targeted by ${owners.get(search)}`);
    });
  });
});

test('searches owned elsewhere point at the page that targets them', () => {
  targeted.forEach((page) => {
    page.targets.ownedElsewhere.forEach(({ query, owner }) => {
      const label = `${pathOf(page)}: "${query}" -> ${owner}`;
      assert.notEqual(owner, pathOf(page), label);
      assert.ok(!searchesOf(page).includes(norm(query)), `${label} is also targeted here`);
      const ownerPage = pageByPath.get(owner);
      if (ownerPage) {
        assert.ok(searchesOf(ownerPage).includes(norm(query)), `${label}, but the owner doesn't target it`);
      } else {
        assert.ok((SEO_APP_PAGE_OWNERS[owner] ?? []).map(norm).includes(norm(query)), `${label}: unknown owner`);
      }
    });
  });
});

test('entries are well formed', () => {
  targeted.forEach((page) => {
    const where = pathOf(page);
    groupsOf(page.targets).forEach((group) => {
      const validVolume = group.volume === null || (Number.isInteger(group.volume) && group.volume >= 0);
      assert.ok(validVolume, `${where}: ${group.query}`);
      [group.query, ...(group.variants ?? [])].forEach((text) => {
        assert.equal(text, norm(text), `${where}: write "${text}" in lower case`);
      });
    });
    const ids = page.targets.questions.map((question) => question.id);
    assert.equal(new Set(ids).size, ids.length, `${where}: duplicate question id`);
    page.targets.exceptions.forEach((exception) => {
      assert.ok(exception.rule && exception.reason && exception.ticket, `${where}: exception incomplete`);
    });
  });
});

test('every question matches a heading on the page', () => {
  targeted.forEach((page) => {
    const body = fs.readFileSync(path.join('src/content/seo/bodies', page.type, `${page.slug}.md`), 'utf8');
    const headings = body
      .split('\n')
      .filter((line) => /^#{1,3}\s/.test(line))
      .map((line) => norm(line.replace(/^#+\s*/, '')));
    page.targets.questions.forEach((question) => {
      assert.ok(question.headingPhrases.length, `${pathOf(page)}: ${question.id} has no heading phrases`);
      const inHeading = (phrase: string) => headings.some((heading) => heading.includes(norm(phrase)));
      const answered = question.headingPhrases.some(inHeading);
      assert.ok(answered, `${pathOf(page)}: no heading contains any of ${JSON.stringify(question.headingPhrases)}`);
    });
  });
});
