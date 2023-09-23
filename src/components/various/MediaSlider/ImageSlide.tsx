import React from 'react';
import { Image } from '@nextui-org/react';
import { Media } from 'typings/media';

interface Props extends Media.Image {}

export const ImageSlide = ({ src }: Props) => {
  return (
    <Image
      classNames={{ wrapper: 'h-full !max-w-full', img: 'w-full h-full object-cover' }}
      loading="lazy"
      src={src}
    />
  );
};
