import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import NextLink from 'next/link';
import React from 'react';

import { useSession } from '../../../../hooks/review-tool/useSession';

export const UserWidget = () => {
  const { user, signOut } = useSession();

  if (!user) {
    return null;
  }

  const handleLogoutClick = () => {
    signOut();
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar
          src={user.avatar?.url ?? ''}
          size="sm"
          isBordered
          className="cursor-pointer"
          fallback={
            <div className="text-lg text-foreground-500 select-none">{user.name.slice(0, 1).toUpperCase()}</div>
          }
        />
      </DropdownTrigger>
      <DropdownMenu variant="flat">
        <DropdownItem as={NextLink} href="/marketplace" key="marketplace">
          Kreatli marketplace
        </DropdownItem>
        <DropdownItem key="log-out" onClick={handleLogoutClick}>
          Log out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
