import dynamic from 'next/dynamic';
import React from 'react';

import { useHasBeenTrue } from '../../hooks/useHasBeenTrue';
import { useSignUpCreatorModal } from '../../hooks/useSignUpCreatorModal';
import { useTiersModal } from '../../hooks/useTiersModal';

// App-wide modals load their code the first time they open instead of shipping in every page's bundle.
const SignUpCreatorModal = dynamic(() => import('../auth/SignUpCreator').then((mod) => mod.SignUpCreatorModal), {
  ssr: false,
});
const DashboardTiersModal = dynamic(
  () => import('../dashboard/DashboardTiers').then((mod) => mod.DashboardTiersModal),
  { ssr: false },
);

export const LazySignUpCreatorModal = () => {
  const { isOpen } = useSignUpCreatorModal();
  const shouldRender = useHasBeenTrue(isOpen);

  return shouldRender ? <SignUpCreatorModal /> : null;
};

export const LazyDashboardTiersModal = () => {
  const { isOpen } = useTiersModal();
  const shouldRender = useHasBeenTrue(isOpen);

  return shouldRender ? <DashboardTiersModal /> : null;
};
