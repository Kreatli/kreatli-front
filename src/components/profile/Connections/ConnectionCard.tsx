import { Avatar, Button, Card, CardBody, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { User } from '../../../typings/user';
import { getUserSkills } from '../../../utils/user';
import { Icon } from '../../various/Icon';
import { TierImage } from '../../various/TierImage';

interface Props {
  user: User.ShortInfo;
  isMyAccount?: boolean;
}

export const ConnectionCard = ({ user, isMyAccount }: Props) => {
  const router = useRouter();

  const handleAction = () => {
    router.push(`/chat/${user._id}`);
  };

  return (
    <Card isHoverable>
      {isMyAccount && (
        <Dropdown>
          <DropdownTrigger>
            <Button className="absolute top-2 right-2" size="sm" variant="light" radius="full" isIconOnly><Icon icon="dots" size={20} /></Button>
          </DropdownTrigger>
          <DropdownMenu variant="flat" onAction={handleAction}>
            <DropdownItem startContent={<Icon icon="chat" size={18} />}>Message</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
      <NextLink href={`/profile/${user._id}`}>
        <CardBody className="p-4">
          <div className="flex gap-6 items-center">
            <Avatar src={user.avatarUrl} isBordered className="w-14 h-14" />
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
