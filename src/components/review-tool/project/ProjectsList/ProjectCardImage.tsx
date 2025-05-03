import { Image } from '@heroui/react';
import React from 'react';

import { InterfaceImageDto } from '../../../../services/review-tool/types';
import { Icon } from '../../../various/Icon';

interface Props {
  image?: InterfaceImageDto;
}

export const ProjectCardImage = ({ image }: Props) => {
  if (!image) {
    return (
      <div className="aspect-video rounded-2xl flex items-center justify-center bg-foreground-100">
        <Icon icon="slides" size={36} className="text-foreground-400" />
      </div>
    );
  }

  const { url } = image;

  return <Image src={url} removeWrapper className="aspect-video object-cover w-full" />;
};
