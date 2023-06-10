import { Badge } from '@nextui-org/react';
import React from 'react';

interface Props {
  isVerified: boolean;
  children: React.ReactNode;
}

export const ProfileBadge = ({ isVerified, children }: Props) => {
  return (
    <Badge
      content={isVerified ? 'verified' : 'unverified'}
      variant={isVerified ? 'flat' : 'bordered'}
      color={isVerified ? 'success' : 'default'}
      size="xs"
    >
      {children}
    </Badge>
  );
};
