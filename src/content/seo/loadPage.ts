import fs from 'fs';
import { marked } from 'marked';
import path from 'path';

import { SeoFaq, SeoPageType, SeoPageWithBody } from './types';
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

// Bodies start with "# Title" for readability, but the layout already renders the page H1.
const stripLeadingH1 = (markdown: string) => markdown.replace(/^\s*#\s+[^\n]*\n+/, '');

const toPlainText = (markdown: string) =>
  markdown
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`]+/g, '')
    .replace(/^\s*[-+]\s+/gm, '')
    .replace(/^\s*>\s?/gm, '')
    .replace(/\s+/g, ' ')
    .trim();

/** Extracts "## FAQ" → "### Question" pairs so they can be published as FAQPage structured data. */
export const extractFaqs = (markdown: string): SeoFaq[] => {
  const faqHeading = markdown.match(/^##\s+(FAQ|FAQs|Frequently asked questions)\b.*$/im);

  if (!faqHeading || faqHeading.index === undefined) {
    return [];
  }

  const afterHeading = markdown.slice(faqHeading.index + faqHeading[0].length);
  const nextSection = afterHeading.search(/^##\s/m);
  const section = nextSection === -1 ? afterHeading : afterHeading.slice(0, nextSection);

  return section
    .split(/^###\s+/m)
    .slice(1)
    .map((block) => {
      const [questionLine, ...answerLines] = block.split('\n');

      return {
        question: toPlainText(questionLine),
        answer: toPlainText(answerLines.join('\n')),
      };
    })
    .filter(({ question, answer }) => question && answer);
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

  const markdown = stripLeadingH1(rawBody);
  const body = marked.parse(markdown, { async: false }) as string;

  return {
    ...page,
    body,
    readTimeMinutes: estimateReadTimeMinutes(markdown),
    faqs: extractFaqs(markdown),
  };
};
