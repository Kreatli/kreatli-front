import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import React from 'react';

import { useSession } from '../../../hooks/useSession';
import { ResetPasswordForm } from './ResetPasswordForm';
import { SignInForm } from './SignInForm';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const SignInModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [mode, setMode] = React.useState<'signIn' | 'resetPassword'>('signIn');
  const { signInMutation: { isLoading } } = useSession();

  const handleSignInChange = React.useCallback(() => {
    setMode('resetPassword');
  }, []);

  const handleResetPasswordChange = React.useCallback(() => {
    setMode('signIn');
  }, []);

  return (
    <Modal
      placement="center"
      backdrop="blur"
      size="sm"
      isDismissable={!isLoading}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalContent>
        <ModalHeader>
          <h3>
            {mode === 'signIn' && 'Sign in to your account'}
            {mode === 'resetPassword' && 'Reset your password'}
          </h3>
        </ModalHeader>
        <ModalBody>
          {mode === 'signIn' && <SignInForm onSuccess={onClose} onClick={handleSignInChange} />}
          {mode === 'resetPassword' && <ResetPasswordForm onSuccess={onClose} onClick={handleResetPasswordChange} />}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
