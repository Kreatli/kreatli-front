import React from 'react';

import { Icon, IconType } from '../../../various/Icon';

interface Props {
  title: string;
  text: string;
  icon: IconType;
}

export const Feature = ({ title, text, icon }: Props) => {
  return (
    <article className="flex flex-col gap-4 items-center text-center max-w-md">
      <Icon icon={icon} size={32} className="text-secondary" />
      <h3 className="text-lg font-semibold whitespace-pre-wrap">{title}</h3>
      <p className="text-md text-foreground-500">{text}</p>
    </article>
  );
};
