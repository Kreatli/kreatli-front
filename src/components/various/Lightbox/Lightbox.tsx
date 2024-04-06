import { Image, Modal, ModalContent } from '@nextui-org/react';
import React from 'react';

import { Media } from '../../../typings/media';

interface Props {
  isOpen: boolean;
  image: Media.Image | null;
  onClose: () => void;
}

export const Lightbox = ({ image, isOpen, onClose }: Props) => {
  if (!image) {
    return null;
  }

  return (
    <Modal
      size="5xl"
      placement="center"
      className="w-auto"
      isOpen={isOpen}
      hideCloseButton
      backdrop="blur"
      onClose={onClose}
    >
      <ModalContent className="bg-transparent shadow-large">
        <a href={image.src} target="_blank" rel="noreferrer">
          <Image
            src={image.src}
            height={500}
            removeWrapper
            className="max-h-[80vh] object-contain object-center mx-auto"
          />
        </a>
      </ModalContent>
    </Modal>
  );
};
