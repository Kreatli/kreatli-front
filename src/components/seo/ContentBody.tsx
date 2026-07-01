import React from 'react';

interface Props {
  html: string;
}

export const ContentBody = ({ html }: Props) => (
  <div
    className="prose prose-lg max-w-none text-foreground-700 dark:prose-invert prose-headings:font-semibold prose-a:text-secondary"
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{ __html: html }}
  />
);
