import { Avatar, Button, Card, CardBody, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { User } from '../../../../typings/marketplace/user';
import { getUserSkills } from '../../../../utils/marketplace/user';
import { Icon } from '../../../various/Icon';
import { TierImage } from '../../../various/TierImage';

interface Props {
  user: User.ShortInfo;
  isMyAccount?: boolean;
}

export const ConnectionCard = ({ user, isMyAccount }: Props) => {
  const router = useRouter();

  const handleAction = () => {
    router.push(`/marketplace/chat/${user._id}`);
  };

  return (
    <Card>
      {isMyAccount && (
        <Dropdown>
          <DropdownTrigger>
            <Button className="absolute top-2 right-2" size="sm" variant="light" radius="full" isIconOnly>
              <Icon icon="dots" size={20} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu variant="flat" onAction={handleAction}>
            <DropdownItem key="message" startContent={<Icon icon="chat" size={18} />}>
              Message
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
      <NextLink href={`/marketplace/profile/${user._id}`}>
        <CardBody className="p-4">
          <div className="flex gap-6 items-center">
            <Avatar name={user.name} src={user.avatarUrl} isBordered className="w-14 h-14" />
            <div className="flex-1">
              <p className="text-lg font-semibold">
                {user.name}
                <TierImage tier={user.tier} className="w-6 h-6" isInline />
              </p>
              {user.role === 'creator' && <p className="text-sm text-gray-400">{user.youtube.customUrl}</p>}
              <p className="text-sm">{getUserSkills(user)}</p>
            </div>
          </div>
        </CardBody>
      </NextLink>
    </Card>
  );
};
