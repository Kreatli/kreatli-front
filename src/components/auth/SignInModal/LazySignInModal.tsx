import dynamic from 'next/dynamic';
import React from 'react';

import { useHasBeenTrue } from '../../../hooks/useHasBeenTrue';

const SignInModal = dynamic(() => import('./SignInModal').then((mod) => mod.SignInModal), { ssr: false });

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

/** Loads the sign-in form (and its form libraries) only once someone opens it. */
export const LazySignInModal = ({ isOpen, onClose }: Props) => {
  const shouldRender = useHasBeenTrue(isOpen);

  return shouldRender ? <SignInModal isOpen={isOpen} onClose={onClose} /> : null;
};
