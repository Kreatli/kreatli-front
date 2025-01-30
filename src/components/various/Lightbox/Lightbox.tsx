import { Image, Modal, ModalContent } from '@nextui-org/react';
import React from 'react';

import { Media } from '../../../typings/marketplace/media';

interface Props {
  isOpen: boolean;
  media: Media.Any[];
  defaultIndex?: number;
  onClose: () => void;
}

export const Lightbox = ({ media, isOpen, defaultIndex = 0, onClose }: Props) => {
  const [activeIndex, setActiveIndex] = React.useState(defaultIndex);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const paginationRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!containerRef.current || !isOpen) {
      return;
    }

    setActiveIndex(defaultIndex);
    containerRef.current.scrollTo({ left: containerRef.current.offsetWidth * defaultIndex });
  }, [defaultIndex, isOpen]);

  if (media.length === 0) {
    return null;
  }

  const scrollToSlide = (index: number) => {
    if (!containerRef.current) {
      return;
    }

    containerRef.current.scrollTo({ left: containerRef.current.offsetWidth * index, behavior: 'smooth' });
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollLeft, offsetWidth } = event.target as HTMLElement;

    setActiveIndex(Math.round(scrollLeft / offsetWidth));
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (paginationRef.current?.contains(event.target as Node)) {
      return;
    }

    const { tagName } = event.target as HTMLElement;

    if (tagName !== 'IMG' && tagName !== 'IFRAME') {
      onClose();
    }
  };

  return (
    <Modal
      ref={containerRef}
      size="full"
      placement="center"
      className="w-auto"
      isOpen={isOpen}
      hideCloseButton
      backdrop="blur"
      onClick={handleClick}
    >
      <ModalContent
        className="bg-transparent shadow-none flex-row items-center gap-x-16 p-8 overflow-x-auto no-scrollbar snap-x snap-mandatory"
        onScroll={handleScroll}
      >
        {media.map((mediaItem) => (
          <div className="min-w-full snap-center snap-always" key={mediaItem._id}>
            {mediaItem.type === 'image' ? (
              <Image
                src={mediaItem.src}
                height={500}
                removeWrapper
                className="max-h-[80vh] object-contain object-center mx-auto"
              />
            ) : (
              <iframe
                title={mediaItem._id}
                src={`https://www.youtube.com/embed/${mediaItem.videoId}`}
                loading="lazy"
                className="w-full h-full max-h-[80vh] aspect-video rounded-large"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                sandbox="allow-same-origin allow-scripts allow-presentation"
              />
            )}
          </div>
        ))}
        <div ref={paginationRef} className="fixed bottom-8 z-50 left-1/2 -translate-x-1/2 flex justify-center mt-4">
          {media.map((mediaItem, index) => (
            <button key={mediaItem._id} type="button" className="px-1" onClick={() => scrollToSlide(index)}>
              <div
                className={`w-2 h-2 bg-default-50 rounded-full transition-all ${
                  index === activeIndex ? 'w-8 bg-default-700' : ''
                }`}
              />
            </button>
          ))}
        </div>
      </ModalContent>
    </Modal>
  );
};
