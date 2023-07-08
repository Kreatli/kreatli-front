import { Badge, Tooltip } from '@nextui-org/react';
import React from 'react';

import { Icon } from '../../various/Icon';

interface Props {
  isVerified: boolean;
  children: React.ReactNode;
  size?: 'sm' | 'md';
}

export const ProfileBadge = ({ size = 'md', isVerified, children }: Props) => {
  const iconSizes = {
    md: 18,
    sm: 14,
  };

  return (
    <Tooltip
      content={isVerified ? 'Verified' : 'Unverified'}
      contentColor={isVerified ? 'success' : 'default'}
      hideArrow
    >
      <Badge
        content={isVerified ? <Icon icon="checkShield" size={iconSizes[size]} /> : <Icon icon="timer" size={iconSizes[size]} />}
        variant="flat"
        css={{ p: '2px' }}
        color={isVerified ? 'success' : 'default'}
      >
        {children}
      </Badge>
    </Tooltip>
  );
};
