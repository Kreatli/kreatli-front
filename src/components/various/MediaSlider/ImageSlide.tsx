import { Image } from '@nextui-org/react';
import React from 'react';

import { Media } from '../../../typings/marketplace/media';

interface Props extends Media.Image {
  onClick: () => void;
}

export const ImageSlide = ({ src, onClick }: Props) => {
  return (
    <Image
      classNames={{ wrapper: 'h-full !max-w-full cursor-pointer', img: 'w-full h-full object-contain' }}
      loading="lazy"
      radius="none"
      isBlurred
      src={src}
      onClick={onClick}
    />
  );
};
