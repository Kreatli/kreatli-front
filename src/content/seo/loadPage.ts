import fs from 'fs';
import { marked } from 'marked';
import path from 'path';

import { SeoPageType, SeoPageWithBody } from './types';
import { estimateReadTimeMinutes, getPageBySlug } from './utils';

const getBodyFilePath = (type: SeoPageType, slug: string) =>
  path.join(process.cwd(), 'src/content/seo/bodies', type, `${slug}.md`);

export const loadPageBody = (type: SeoPageType, slug: string): string | null => {
  const filePath = getBodyFilePath(type, slug);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  return fs.readFileSync(filePath, 'utf-8');
};

export const loadPublishedPage = (type: SeoPageType, slug: string): SeoPageWithBody | null => {
  const page = getPageBySlug(type, slug);

  if (!page || page.status !== 'published') {
    return null;
  }

  const rawBody = loadPageBody(type, slug);

  if (!rawBody) {
    return null;
  }

  const body = marked.parse(rawBody, { async: false }) as string;

  return {
    ...page,
    body,
    readTimeMinutes: estimateReadTimeMinutes(rawBody),
  };
};
