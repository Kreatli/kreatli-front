import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Tooltip } from '@nextui-org/react';
import { Icon } from 'components/various/Icon';
import { COUNTRY_LABELS } from 'constants/countries';
import { useSession } from 'hooks/useSession';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import { requestUsersByIds } from 'services/users';

export const ChatListNewButton = () => {
  const router = useRouter();
  const { currentUser } = useSession();

  const userIds = (currentUser?.connections ?? []).slice(0, 10);
  const { data: connections = [] } = useQuery(['users', ...userIds], () => requestUsersByIds(userIds), {
    refetchOnMount: false,
  });

  const handleAction = (key: React.Key) => {
    router.push(`/chat/${key}`);
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
            startContent={<Avatar src={user.avatarUrl} className="h-10 max-h-8" />}
            description={COUNTRY_LABELS[user.country]}
          >
            {user.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
