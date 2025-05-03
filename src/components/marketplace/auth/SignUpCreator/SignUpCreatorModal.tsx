import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { useSession } from '../../../../hooks/marketplace/useSession';
import { useSignUpCreatorModal } from '../../../../hooks/marketplace/useSignUpCreatorModal';
import { SignUpCreatorForm } from './SignUpCreatorForm';
import { SignUpCreatorSSO } from './SignUpCreatorSSO';

export const SignUpCreatorModal = () => {
  const { t } = useTranslation(['common', 'signUp']);
  const { isSignedIn } = useSession();
  const { isOpen, close } = useSignUpCreatorModal();

  if (isSignedIn) {
    return null;
  }

  return (
    <Modal placement="center" isOpen={isOpen} onClose={close}>
      <ModalContent>
        <ModalHeader>{t('signUp:join_as_creator')}</ModalHeader>
        <ModalBody className="gap-6">
          <SignUpCreatorForm onSuccess={close} />
          <div className="flex items-center text-foreground-500 after:flex-1 after:content-[''] after:p-[0.5px] after:bg-foreground-200 after:m-2 before:flex-1 before:content-[''] before:p-[0.5px] before:bg-foreground-200 before:m-2">
            {t('common:or')}
          </div>
          <SignUpCreatorSSO onSuccess={close} />
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};
