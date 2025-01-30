import { Link } from '@nextui-org/react';
import React from 'react';

interface Props {
  isActive: boolean;
  label: string;
  count: number;
  onClick: () => void;
}

export const ListController = ({ isActive, label, count, onClick }: Props) => {
  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <Link
      as="button"
      size="sm"
      className="font-semibold"
      color={isActive
        ? 'secondary'
        : 'foreground'}
      onClick={onClick}
    >
      {label} ({count})
    </Link>
  );
};
