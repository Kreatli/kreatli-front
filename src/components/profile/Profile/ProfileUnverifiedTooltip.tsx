import { Tooltip } from '@nextui-org/react';
import React from 'react';

import { useSession } from '../../../hooks/useSession';

interface Props {
  children: React.ReactNode;
}

export const ProfileUnverifiedTooltip = ({ children }: Props) => {
  const { currentUser } = useSession();
  const isVerified = currentUser?.isVerified ?? false;

  if (isVerified) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
  }

  return (
    <Tooltip content={<>Your profile is under verification<br />No actions are allowed until it&apos;s verified</>}>
      {children}
    </Tooltip>
  );
};
