import { Tooltip } from '@heroui/react';
import React from 'react';

import { useSession } from '../../../../hooks/marketplace/useSession';

interface Props {
  children: React.ReactNode;
}

export const ProfileUnverifiedTooltip = ({ children }: Props) => {
  const { currentUser } = useSession();
  const isVerified = currentUser?.isVerified ?? false;

  if (isVerified) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return children;
  }

  return (
    <Tooltip
      content={
        <>
          You cannot perform this action - your profile is being verified. <br />
          You will have full access to the platform once it&apos;s completed.
        </>
      }
    >
      <span>{children}</span>
    </Tooltip>
  );
};
