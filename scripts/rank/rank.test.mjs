// Weekly ranking check method tests (SEO-41, ported from kreatli.com's KRE-82). Run with: npm run seo:test
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { fixedMixDelta, mainDriver, seenIn } from './report.mjs';

describe('ranking method', () => {
  it('holds the country mix at the earlier week', () => {
    // Same per-country positions; only the mix moved towards the better country: no real change.
    const before = { usa: [100, 10], ind: [100, 20] };
    const after = { usa: [300, 10], ind: [10, 20] };
    assert.equal(fixedMixDelta(before, after), 0);
  });

  it('weights each country by its earlier share', () => {
    const before = { usa: [300, 10], ind: [100, 20] };
    const after = { usa: [300, 8], ind: [100, 24] };
    assert.equal(fixedMixDelta(before, after), -0.5); // (300 x -2 + 100 x 4) / 400
  });

  it('ignores countries under 3 impressions in either week', () => {
    assert.equal(fixedMixDelta({ bra: [2, 1] }, { bra: [2, 9] }), null);
  });

  it('names the country behind most of a move', () => {
    assert.equal(mainDriver({ usa: [300, 20], ind: [100, 10] }, { usa: [300, 10], ind: [100, 10] }), 'US 20.0 → 10.0');
    assert.equal(mainDriver({ usa: [100, 10], ind: [100, 10] }, { usa: [100, 12], ind: [100, 8] }), null);
  });

  it('shows "seen in" only from 200 searches a month, capped at 100%', () => {
    assert.equal(seenIn(100, 150), null);
    assert.equal(seenIn(46, 200), 100);
    assert.equal(seenIn(23, 1000), 10);
  });
});
