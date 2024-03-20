import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import React from 'react';

import { useSession } from '../../../hooks/useSession';
import { useSignUpCreatorModal } from '../../../hooks/useSignUpCreatorModal';
import { SignUpCreatorForm } from './SignUpCreatorForm';

export const SignUpCreatorModal = () => {
  const { isSignedIn } = useSession();
  const { isOpen, close } = useSignUpCreatorModal();

  if (isSignedIn) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={close}>
      <ModalContent>
        <ModalHeader>Join Kreatli as YouTube creator</ModalHeader>
        <ModalBody className="gap-6">
          <SignUpCreatorForm onSuccess={close} />
          {/* eslint-disable-next-line max-len */}
          {/* <div className="flex items-center text-foreground-500 after:flex-1 after:content-[''] after:p-[0.5px] after:bg-foreground-200 after:m-2 before:flex-1 before:content-[''] before:p-[0.5px] before:bg-foreground-200 before:m-2">or</div> */}
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};
