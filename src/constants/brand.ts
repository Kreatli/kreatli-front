export const BRAND_NAME = 'Kreatli Marketplace';

export const BRAND_NAME_PREMIUM = 'Kreatli Marketplace Premium';

export const DEFAULT_META_DESCRIPTION =
  'Kreatli Marketplace connects creators with skilled clippers. Post clipping jobs, browse editor profiles, and hire for short-form video work.';

const TITLE_SUFFIX = ' | Kreatli';
const MAX_TITLE_LENGTH = 60;

/**
 * Appends a short brand suffix when it fits in ~60 characters (what search results show) and the
 * title doesn't already name the brand.
 */
export const getPageTitle = (title: string) => {
  if (title.includes('Kreatli') || title.length + TITLE_SUFFIX.length > MAX_TITLE_LENGTH) {
    return title;
  }

  return `${title}${TITLE_SUFFIX}`;
};
