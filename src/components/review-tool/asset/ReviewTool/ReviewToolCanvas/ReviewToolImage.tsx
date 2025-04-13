import { Image } from '@nextui-org/react';
import React from 'react';

import { useReviewToolContext } from '../../../../../contexts/review-tool/ReviewTool';
import { FileDto } from '../../../../../services/review-tool/types';

interface Props {
  imageFile: FileDto;
  onLoad: (event: React.SyntheticEvent<HTMLImageElement>) => void;
}

export const ReviewToolImage = ({ imageFile, onLoad }: Props) => {
  const { fileRef } = useReviewToolContext();

  return (
    <>
      <div className="absolute -inset-12">
        <Image
          src={imageFile.url}
          removeWrapper
          radius="none"
          className="absolute inset-0 h-full w-full blur-xl grayscale pointer-events-none select-none"
        />
      </div>
      <Image
        src={imageFile.url}
        // @ts-ignore
        ref={fileRef}
        radius="sm"
        shadow="lg"
        classNames={{ wrapper: 'max-h-full max-w-full h-auto overflow-hidden' }}
        className="pointer-events-none select-none h-full"
        alt={imageFile.name}
        onLoad={onLoad}
      />
    </>
  );
};
