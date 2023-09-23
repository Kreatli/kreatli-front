import { Image } from '@nextui-org/react';
import { Icon } from 'components/various/Icon';
import React from 'react';

interface Props {
  videoId: string;
  onRemove?: () => void;
}

export const VideoPreview = ({ videoId, onRemove }: Props) => {
  const thumbnailSrc = `https://img.youtube.com/vi/${videoId}/default.jpg`;

  return (
    <button type="button" className="relative w-12 h-12" onClick={onRemove}>
      <Image src={thumbnailSrc} removeWrapper className="w-full h-full object-cover shadow-small" />
      <div className="absolute inset-0 flex items-center justify-center bg-red-500/30 text-red-500 z-10 rounded-xl opacity-0 hover:opacity-100 transition-all">
        <Icon icon="cross" />
      </div>
    </button>
  );
};
