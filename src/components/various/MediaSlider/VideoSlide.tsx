import React from 'react';

import { Media } from '../../../typings/media';

interface Props extends Media.Video {}

export const VideoSlide = ({ videoId }: Props) => {
  return (
    <iframe
      title={videoId}
      src={`https://www.youtube.com/embed/${videoId}`}
      loading="lazy"
      className="w-full h-full min-h-[200px] md:min-h-[320px]"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      sandbox="allow-same-origin allow-scripts allow-presentation"
    />
  );
};
