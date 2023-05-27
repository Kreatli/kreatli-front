import { Card, User } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';

import { User as UserType } from '../../../typings/user';

interface Props {
  user: UserType.Base;
}

export const ConnectionCard = ({ user }: Props) => {
  return (
    <Card variant="bordered" isHoverable>
      <Card.Header css={{ justifyContent: 'space-between' }}>
        <Link href={`/profile/${user._id}`} style={{ maxWidth: '100%' }}>
          <User
            src={user.avatarUrl}
            description={user.description}
            size="xl"
            bordered
            name={user.name}
          />
        </Link>
      </Card.Header>
    </Card>
  );
};
