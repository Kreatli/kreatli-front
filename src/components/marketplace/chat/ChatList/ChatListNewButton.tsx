import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Tooltip } from '@heroui/react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React from 'react';

import { COUNTRY_LABELS } from '../../../../constants/countries';
import { useSession } from '../../../../hooks/marketplace/useSession';
import { requestUsersByIds } from '../../../../services/marketplace/users';
import { Icon } from '../../../various/Icon';

export const ChatListNewButton = () => {
  const router = useRouter();
  const { currentUser } = useSession();

  const userIds = (currentUser?.connections ?? []).slice(0, 10);

  const { data: connections = [] } = useQuery({
    refetchOnMount: false,
    queryKey: ['users', ...userIds],
    queryFn: () => requestUsersByIds(userIds),
  });

  const handleAction = (key: React.Key) => {
    router.push(`/marketplace/chat/${key}`);
  };

  if (connections.length === 0) {
    return (
      <Tooltip content="You don't have any connections yet">
        <Button isIconOnly variant="flat" disabled>
          <Icon icon="edit" size={20} />
        </Button>
      </Tooltip>
    );
  }

  return (
    <Dropdown placement="bottom-end" backdrop="blur">
      <DropdownTrigger>
        <Button isIconOnly variant="flat" aria-label="Write message to">
          <Icon icon="edit" size={20} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="flat" onAction={handleAction}>
        {connections.map((user) => (
          <DropdownItem
            key={user._id}
            startContent={<Avatar src={user.avatarUrl} name={user.name} className="h-10 max-h-8" />}
            description={COUNTRY_LABELS[user.country]}
          >
            {user.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
