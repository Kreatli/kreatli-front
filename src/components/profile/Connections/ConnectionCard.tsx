import { Avatar, Button, Card, CardBody, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import NextLink from 'next/link';
import React from 'react';

import { User } from '../../../typings/user';
import { getUserSkills } from '../../../utils/user';
import { ProfileBadge } from '../Profile/ProfileBadge';
import { Icon } from 'components/various/Icon';

interface Props {
  user: User.ShortInfo;
  isMyAccount?: boolean;
}

export const ConnectionCard = ({ user, isMyAccount }: Props) => {
  return (
    <Card isHoverable>
      {isMyAccount && (
        <Dropdown>
          <DropdownTrigger>
            <Button className="absolute top-2 right-2" size="sm" variant="light" isIconOnly><Icon icon="dots" size={20} /></Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem startContent={<Icon icon="chat" size={18} />}>Message</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
      <NextLink href={`/profile/${user._id}`}>
        <CardBody>
          <div className="flex gap-6 items-center">
            <ProfileBadge isVerified={user.isVerified}>
              <Avatar src={user.avatarUrl} isBordered className="w-16 h-16" />
            </ProfileBadge>
            <div className="flex-1">
              <p className="text-lg font-semibold">{user.name}</p>
              {user.role === 'creator' && <p className="text-sm text-gray-400">{user.youtube.customUrl}</p>}
              <p className="text-sm">{getUserSkills(user)}</p>
            </div>
          </div>
        </CardBody>
      </NextLink>
    </Card>
  );
};
