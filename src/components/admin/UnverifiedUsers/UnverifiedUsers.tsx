import { Button, Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, User } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';
import { useQuery } from 'react-query';

import { COUNTRY_LABELS } from '../../../constants/countries';
import { getUnverifiedUsers } from '../../../services/admin';
import { Common } from '../../../typings/common';
import { Icon } from '../../various/Icon';
import { AcceptVerificationModal } from './AcceptVerificationModal';
import { RejectVerificationModal } from './RejectVerificationModal';

export const UnverifiedUsers = () => {
  const [userId, setUserId] = React.useState<Common.Id | null>(null);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = React.useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = React.useState(false);

  const { data, isLoading } = useQuery('unverifiedUsers', getUnverifiedUsers);
  const users = data?.users ?? [];

  const handleAccept = (id: Common.Id) => () => {
    setUserId(id);
    setIsAcceptModalOpen(true);
  };

  const handleReject = (id: Common.Id) => () => {
    setUserId(id);
    setIsRejectModalOpen(true);
  };

  const handleAcceptModalClose = () => {
    setUserId(null);
    setIsAcceptModalOpen(false);
  };

  const handleRejectModalClose = () => {
    setUserId(null);
    setIsRejectModalOpen(false);
  };

  return (
    <>
      <Table isHeaderSticky>
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>ROLE</TableColumn>
          <TableColumn>IS EMAIL VERIFIED</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody isLoading={isLoading} emptyContent="There are no unverified users">
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>
                <Link href={`/profile/${user._id}`}>
                  <User
                    name={user.name}
                    description={COUNTRY_LABELS[user.country]}
                    avatarProps={{ src: user.avatarUrl, radius: 'sm' }}
                  />
                </Link>
              </TableCell>
              <TableCell>
                {user.role}
              </TableCell>
              <TableCell>
                <Chip variant="flat" color={user.isEmailVerified ? 'success' : 'danger'}>
                  {user.isEmailVerified ? 'Yes' : 'No'}
                </Chip>
              </TableCell>
              <TableCell className="flex gap-2">
                <Tooltip content="Reject verification">
                  <Button size="sm" variant="flat" isIconOnly aria-label="Reject verification" onClick={handleReject(user._id)}>
                    <Icon icon="update" size={18} />
                  </Button>
                </Tooltip>
                <Tooltip content="Mark user as verified">
                  <Button size="sm" variant="flat" color="success" isIconOnly aria-label="Mark user as verified" onClick={handleAccept(user._id)}>
                    <Icon icon="check" size={18} />
                  </Button>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AcceptVerificationModal isOpen={isAcceptModalOpen} userId={userId} onClose={handleAcceptModalClose} />
      <RejectVerificationModal isOpen={isRejectModalOpen} userId={userId} onClose={handleRejectModalClose} />
    </>
  );
};
