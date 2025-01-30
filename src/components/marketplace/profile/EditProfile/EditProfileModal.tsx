import { Modal } from '@nextui-org/react';
import React from 'react';

import { useSession } from '../../../../hooks/marketplace/useSession';
import { EditCreatorProfileForm } from './EditCreatorProfileForm';
import { EditProfessionalProfileForm } from './EditProfessionalProfileForm';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const EditProfileModal = ({ isOpen, onClose }: Props) => {
  const { currentUser } = useSession();

  if (!currentUser) {
    return null;
  }

  return (
    <Modal backdrop="blur" size="5xl" scrollBehavior="inside" isOpen={isOpen} onClose={onClose}>
      {currentUser.role === 'creator' && (
        <EditCreatorProfileForm user={currentUser} onSuccess={onClose} onCancel={onClose} />
      )}
      {currentUser.role === 'professional' && (
        <EditProfessionalProfileForm user={currentUser} onSuccess={onClose} onCancel={onClose} />
      )}
    </Modal>
  );
};
