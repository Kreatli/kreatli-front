import { Button, Chip, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, User } from '@nextui-org/react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React from 'react';

import { COUNTRY_LABELS } from '../../../constants/countries';
import { getUnverifiedUsers } from '../../../services/admin';
import { Api } from '../../../typings/api';
import { Common } from '../../../typings/common';
import { Icon } from '../../various/Icon';
import { AcceptVerificationModal } from './AcceptVerificationModal';
import { RejectVerificationModal } from './RejectVerificationModal';
import { ResendVerificationModal } from './ResendVerificationModal';

const LIMIT = 10;

export const UnverifiedUsers = () => {
  const [page, setPage] = React.useState(1);
  const [userId, setUserId] = React.useState<Common.Id | null>(null);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = React.useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = React.useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = React.useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  React.useEffect(() => {
    setPage(Number(searchParams.get('page')) || 1);
  }, [searchParams]);

  const { data, isLoading } = useQuery({
    placeholderData: keepPreviousData,
    queryKey: ['unverifiedUsers', page],
    queryFn: () => getUnverifiedUsers({ offset: (page - 1) * LIMIT, limit: LIMIT }),
  });

  const users = data?.users ?? [];
  const pages = Math.ceil((data?.total ?? 0) / LIMIT);

  const handleAccept = (id: Common.Id) => () => {
    setUserId(id);
    setIsAcceptModalOpen(true);
  };

  const handleReject = (id: Common.Id) => () => {
    setUserId(id);
    setIsRejectModalOpen(true);
  };

  const handleUpdate = (id: Common.Id) => () => {
    setUserId(id);
    setIsUpdateModalOpen(true);
  };

  const handleAcceptModalClose = () => {
    setUserId(null);
    setIsAcceptModalOpen(false);
  };

  const handleRejectModalClose = () => {
    setUserId(null);
    setIsRejectModalOpen(false);
  };

  const handleUpdateModalClose = () => {
    setUserId(null);
    setIsUpdateModalOpen(false);
  };

  const handlePageChange = (newPage: number) => {
    const currentSearchParams = new URLSearchParams(Array.from(searchParams.entries()));
    currentSearchParams.set('page', newPage.toString());

    const search = currentSearchParams.toString();
    router.replace({ search: `?${search}` });
  };

  const dateFormatter = new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'medium' }).format;

  const pagination = pages > 1 && (
    <Pagination
      isCompact
      showControls
      variant="flat"
      color="secondary"
      page={page}
      total={pages}
      onChange={handlePageChange}
    />
  );

  const getIsUpdateButtonDisabled = (user: Api.GetResponse['/unverified-users']['users'][number]) => {
    if (user.isEmailVerified) {
      return true;
    }

    const registrationDate = new Date(user.registrationDate);

    return (Date.now() - registrationDate.getTime()) < (3 * 1000 * 60 * 60 * 24);
  };

  return (
    <>
      <Table isHeaderSticky bottomContent={pagination}>
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>REGISTRATION DATE</TableColumn>
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
              <TableCell>{dateFormatter(new Date(user.registrationDate))}</TableCell>
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
                  <Button
                    size="sm"
                    variant="flat"
                    color="danger"
                    isIconOnly
                    isDisabled={!user.isEmailVerified}
                    aria-label="Reject verification"
                    onClick={handleReject(user._id)}
                  >
                    <Icon icon="cross" size={18} />
                  </Button>
                </Tooltip>
                <Tooltip content="Mark user as verified">
                  <Button
                    size="sm"
                    variant="flat"
                    color="success"
                    isIconOnly
                    isDisabled={!user.isEmailVerified}
                    aria-label="Mark user as verified"
                    onClick={handleAccept(user._id)}
                  >
                    <Icon icon="check" size={18} />
                  </Button>
                </Tooltip>
                <Tooltip content="Resend activation link">
                  <Button
                    size="sm"
                    variant="flat"
                    color="default"
                    isIconOnly
                    isDisabled={getIsUpdateButtonDisabled(user)}
                    aria-label="Resend verification email"
                    onClick={handleUpdate(user._id)}
                  >
                    <Icon icon="update" size={18} />
                  </Button>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AcceptVerificationModal isOpen={isAcceptModalOpen} userId={userId} onClose={handleAcceptModalClose} />
      <RejectVerificationModal isOpen={isRejectModalOpen} userId={userId} onClose={handleRejectModalClose} />
      <ResendVerificationModal isOpen={isUpdateModalOpen} userId={userId} onClose={handleUpdateModalClose} />
    </>
  );
};
