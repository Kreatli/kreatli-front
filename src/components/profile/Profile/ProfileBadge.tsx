import { Badge, Tooltip } from '@nextui-org/react';
import React from 'react';

import { Icon } from '../../various/Icon';

interface Props {
  isVerified: boolean;
  children: React.ReactNode;
}

export const ProfileBadge = ({ isVerified, children }: Props) => {
  return (
    <Tooltip
      content={isVerified ? 'Verified' : 'Unverified'}
      contentColor={isVerified ? 'success' : 'default'}
      hideArrow
    >
      <Badge
        content={isVerified ? <Icon icon="checkShield" size={14} /> : <Icon icon="timer" size={14} />}
        variant="flat"
        css={{ p: '0.1rem' }}
        color={isVerified ? 'success' : 'default'}
      >
        {children}
      </Badge>
    </Tooltip>
  );
};
