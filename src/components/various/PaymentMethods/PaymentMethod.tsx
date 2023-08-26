import React from 'react';

import { Icon, IconType } from '../Icon';

interface Props {
  icon: IconType;
  children: string;
}

export const PaymentMethod = ({ icon, children }: Props) => {
  return (
    <p className="flex items-center gap-1 whitespace-nowrap">
      <Icon icon={icon} />
      {children}
    </p>
  );
};
