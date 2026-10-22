// Shared arithmetic for the clipping calculators. Months are 4 weeks, matching the worked examples
// in the pay guides (/guides/how-much-do-clippers-make, /guides/how-much-to-pay-clippers).
export const WEEKS_PER_MONTH = 4;

export const fixedPayPerWeek = (clipsPerWeek: number, ratePerClip: number) => clipsPerWeek * ratePerClip;

/** What one clip earns in a CPM campaign after the minimum view threshold and per-clip cap. */
export const cpmClipPayout = ({
  views,
  ratePer1k,
  minViews = 0,
  capPerClip = 0,
}: {
  views: number;
  ratePer1k: number;
  minViews?: number;
  capPerClip?: number;
}) => {
  if (views < minViews) {
    return 0;
  }

  const uncapped = (views / 1000) * ratePer1k;

  return capPerClip > 0 ? Math.min(uncapped, capPerClip) : uncapped;
};

export const toNumber = (value: string) => {
  const parsed = Number(value);

  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
};

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const preciseCurrencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatCurrency = (value: number, precise = false) =>
  (precise ? preciseCurrencyFormatter : currencyFormatter).format(value);

export const formatNumber = (value: number) => new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value);
