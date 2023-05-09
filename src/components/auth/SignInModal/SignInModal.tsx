import { Modal, Text } from '@nextui-org/react';
import React from 'react';

import { useSession } from '../../../hooks/useSession';
import { ResetPasswordForm } from './ResetPasswordForm';
import { SignInForm } from './SignInForm';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

export const SignInModal: React.FC<Props> = ({ isVisible, onClose }) => {
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
      closeButton
      blur
      aria-labelledby="modal-title"
      preventClose={isLoading}
      open={isVisible}
      onClose={onClose}
    >
      <Modal.Header>
        <Text h3>
          {mode === 'signIn' && 'Sign in to your account'}
          {mode === 'resetPassword' && 'Reset your password'}
        </Text>
      </Modal.Header>
      <Modal.Body>
        {mode === 'signIn' && <SignInForm onSuccess={onClose} onClick={handleSignInChange} />}
        {mode === 'resetPassword' && <ResetPasswordForm onSuccess={onClose} onClick={handleResetPasswordChange} />}
      </Modal.Body>
    </Modal>
  );
};
