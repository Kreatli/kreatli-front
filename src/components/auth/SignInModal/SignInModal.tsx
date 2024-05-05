import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { useSession } from '../../../hooks/useSession';
import { ResetPasswordForm } from './ResetPasswordForm';
import { SignInForm } from './SignInForm';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const SignInModal = ({ isOpen, onClose }: Props) => {
  const { t } = useTranslation(['signIn']);
  const [mode, setMode] = React.useState<'signIn' | 'resetPassword'>('signIn');
  const {
    signInMutation: { isPending },
  } = useSession();

  const handleSignInChange = React.useCallback(() => {
    setMode('resetPassword');
  }, []);

  const handleResetPasswordChange = React.useCallback(() => {
    setMode('signIn');
  }, []);

  return (
    <Modal backdrop="blur" placement="center" isDismissable={!isPending} isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <h3>
            {mode === 'signIn' && t('signIn:sign_in_to_account')}
            {mode === 'resetPassword' && t('signIn:reset_password')}
          </h3>
        </ModalHeader>
        <ModalBody>
          {mode === 'signIn' && <SignInForm onSuccess={onClose} onClick={handleSignInChange} />}
          {mode === 'resetPassword' && <ResetPasswordForm onSuccess={onClose} onClick={handleResetPasswordChange} />}
        </ModalBody>
        <ModalFooter className="py-2" />
      </ModalContent>
    </Modal>
  );
};
