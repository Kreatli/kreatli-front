import React from 'react';
import { Media } from 'typings/media';

import { Icon } from '../Icon';
import { ImageSlide } from './ImageSlide';
import { VideoSlide } from './VideoSlide';

interface Props {
  media: Media.Any[];
}

export const MediaSlider = ({ media }: Props) => {
  const slidesRef = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { target } = event;
    const { scrollLeft, clientWidth } = target as HTMLDivElement;
    setActiveIndex(Math.max(Math.floor((scrollLeft + clientWidth / 2) / clientWidth), 0));
  };

  const scrollToSlide = (index: number) => {
    if (!slidesRef.current) {
      return;
    }

    const slide = slidesRef.current.children[index];
    slide.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  const shouldShowLeftArrow = activeIndex !== 0;
  const shouldShowRightArrow = activeIndex !== media.length - 1;

  return (
    <div className="relative">
      <div ref={slidesRef} className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory" onScroll={handleScroll}>
        {media.map((mediaItem) => (
          <div key={mediaItem._id} className="min-w-full h-56 md:h-80 overflow-hidden snap-center snap-always">
            {mediaItem.type === 'image' && <ImageSlide {...mediaItem} />}
            {mediaItem.type === 'video' && <VideoSlide {...mediaItem} />}
          </div>
        ))}
      </div>
      {shouldShowLeftArrow && (
        <button
          type="button"
          aria-label="Scroll to previous slide"
          className="absolute top-1/2 -translate-y-1/2 left-2 z-10 border-1 border-default-400 rounded-xl p-0.5 bg-white/30 backdrop-blur-sm"
          onClick={() => scrollToSlide(activeIndex - 1)}
        >
          <Icon icon="arrowLeft" fill="white" size={20} className="mix-blend-difference" />
        </button>
      )}
      {shouldShowRightArrow && (
        <button
          type="button"
          aria-label="Scroll to next slide"
          className="absolute top-1/2 -translate-y-1/2 right-2 z-10 border-1 border-default-400 rounded-xl p-0.5 bg-white/30 backdrop-blur-sm"
          onClick={() => scrollToSlide(activeIndex + 1)}
        >
          <Icon icon="arrowRight" fill="white" size={20} className="mix-blend-difference" />
        </button>
      )}
      <div className="flex justify-center mt-4">
        {media.map((mediaItem, index) => (
          <button key={mediaItem._id} type="button" className="px-1" onClick={() => scrollToSlide(index)}>
            <div className={`w-1.5 h-1.5 bg-default-300 rounded-full transition-all ${index === activeIndex ? 'w-6 bg-default-600' : ''}`} />
          </button>
        ))}
      </div>
    </div>
  );
};
