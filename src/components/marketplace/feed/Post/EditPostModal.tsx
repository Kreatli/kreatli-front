import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import React from 'react';

import { Feed } from '../../../../typings/marketplace/feed';
import { CreatePost } from '../CreatePost';

interface Props {
  isOpen: boolean;
  post: Feed.Post;
  onClose: () => void;
}

export const EditPostModal = ({ isOpen, post, onClose }: Props) => {
  return (
    <Modal size="2xl" backdrop="blur" scrollBehavior="inside" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Edit post</ModalHeader>
        <ModalBody className="pt-0 pb-4">
          <CreatePost defaultValue={post} onEdit={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
