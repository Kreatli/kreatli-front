import { Selection } from '@nextui-org/react';
import React from 'react';

import { Common } from '../../typings/common';
import { Api } from '../../typings/marketplace/api';

interface UseUsersTableProps {
  users: Api.GetResponse['/unverified-users']['users'];
  total: number;
}

export const useUsersTable = ({ users, total }: UseUsersTableProps) => {
  const [selectedUsers, setSelectedUsers] = React.useState<Selection>(new Set([]));
  const [usersWithUnverifiedEmails, setUsersWithUnverifiedEmails] = React.useState<Common.Id[]>([]);

  const shouldEnableBulkRejection = React.useMemo(() => {
    if (selectedUsers === 'all') {
      return usersWithUnverifiedEmails.length === 0;
    }

    if (selectedUsers.size === 0) {
      return false;
    }

    return !usersWithUnverifiedEmails.some((id) => selectedUsers.has(id));
  }, [selectedUsers, usersWithUnverifiedEmails]);

  const selectedUsersCount = React.useMemo(() => {
    if (selectedUsers === 'all') {
      return total;
    }

    return selectedUsers.size;
  }, [selectedUsers, total]);

  const hasSelectedUsers = React.useMemo(() => {
    return selectedUsersCount > 0;
  }, [selectedUsersCount]);

  const handleSelectionChange = (keys: Selection) => {
    if (keys === 'all') {
      setSelectedUsers((selection) => {
        if (selection !== 'all') {
          return new Set([...Array.from(selection), ...users.map((user) => user._id)]);
        }

        return selection;
      });

      return;
    }

    setSelectedUsers((selection) => {
      if (keys.size === 0) {
        return new Set(
          Array.from(selection).filter((key) => !users.map((user) => user._id as React.Key).includes(key)),
        );
      }

      return keys;
    });
  };

  return {
    selectedUsersCount,
    selectedUsers,
    hasSelectedUsers,
    handleSelectionChange,
    setUsersWithUnverifiedEmails,
    shouldEnableBulkRejection,
  };
};
