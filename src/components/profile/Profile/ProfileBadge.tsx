import { Badge, Tooltip } from '@nextui-org/react';
import React from 'react';

import { Icon } from '../../various/Icon';

interface Props {
  isVerified: boolean;
  children: React.ReactNode;
  shape?: 'circle' | 'rectangle';
  size?: 'sm' | 'md' | 'lg';
}

export const ProfileBadge = ({ size = 'md', shape = 'circle', isVerified, children }: Props) => {
  const iconSizes = {
    lg: 16,
    md: 14,
    sm: 10,
  };

  return (
    <Tooltip content={isVerified ? 'Verified' : 'Unverified'}>
      <Badge
        isOneChar
        shape={shape}
        className={isVerified ? 'bg-green-200' : 'bg-gray-200'}
        content={isVerified ? <Icon icon="checkShield" size={iconSizes[size]} /> : <Icon icon="timer" size={iconSizes[size]} />}
        variant="flat"
        size={size}
        color={isVerified ? 'success' : 'default'}
      >
        {children}
      </Badge>
    </Tooltip>
  );
};
