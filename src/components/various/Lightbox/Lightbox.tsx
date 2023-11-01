import { Image, Modal, ModalContent } from '@nextui-org/react';
import React from 'react';
import { Media } from 'typings/media';

interface Props {
  isOpen: boolean;
  image: Media.Image | null;
  onOpenChange: (isOpen: boolean) => void;
}

export const Lightbox = ({ image, isOpen, onOpenChange }: Props) => {
  if (!image) {
    return null;
  }

  return (
    <Modal size="5xl" placement="center" isOpen={isOpen} hideCloseButton backdrop="blur" onOpenChange={onOpenChange}>
      <ModalContent className="bg-transparent shadow-large">
        <a href={image.src} target="_blank" rel="noreferrer">
          <Image src={image.src} height={500} removeWrapper className="max-h-[80vh] object-contain object-center mx-auto" />
        </a>
      </ModalContent>
    </Modal>
  );
};
