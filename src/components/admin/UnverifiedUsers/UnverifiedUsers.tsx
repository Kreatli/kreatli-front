import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
} from '@nextui-org/react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { uniq } from 'ramda';
import React from 'react';

import { COUNTRY_LABELS } from '../../../constants/countries';
import { useUsersTable } from '../../../hooks/useUsersTable';
import { getUnverifiedUsers } from '../../../services/admin';
import { Api } from '../../../typings/api';
import { Common } from '../../../typings/common';
import { Icon } from '../../various/Icon';
import { AcceptVerificationModal } from './AcceptVerificationModal';
import { RejectVerificationModal } from './RejectVerificationModal';
import { RemoveUserModal } from './RemoveUserModal';
import { ResendVerificationModal } from './ResendVerificationModal';

const LIMIT = 10;

export const UnverifiedUsers = () => {
  const [page, setPage] = React.useState(1);
  const [userId, setUserId] = React.useState<Common.Id | null>(null);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = React.useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = React.useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = React.useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = React.useState(false);

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

  const users = React.useMemo(() => data?.users ?? [], [data?.users]);
  const total = React.useMemo(() => data?.total ?? 0, [data?.total]);
  const pages = React.useMemo(() => Math.ceil((total ?? 0) / LIMIT), [total]);

  const {
    selectedUsers,
    selectedUsersCount,
    hasSelectedUsers,
    handleSelectionChange,
    setUsersWithUnverifiedEmails,
    shouldEnableBulkRejection,
  } = useUsersTable({ users, total });

  React.useEffect(() => {
    setUsersWithUnverifiedEmails(
      (currentUsers) =>
        uniq([...currentUsers, ...users.filter((user) => !user.isEmailVerified).map((user) => user._id)]),
      // eslint-disable-next-line function-paren-newline
    );
  }, [setUsersWithUnverifiedEmails, users]);

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

  const handleRemove = (id: Common.Id) => () => {
    setUserId(id);
    setIsRemoveModalOpen(true);
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

  const handleRemoveModalClose = () => {
    setUserId(null);
    setIsRemoveModalOpen(false);
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

    return Date.now() - registrationDate.getTime() < 3 * 1000 * 60 * 60 * 24;
  };

  const getDisabledActionKeys = (user: Api.GetResponse['/unverified-users']['users'][number]) => {
    return [
      ...(getIsUpdateButtonDisabled(user) ? ['resend'] : []),
      ...(!user.isEmailVerified ? ['accept', 'reject'] : []),
    ];
  };

  const selectedUsersArray = React.useMemo(() => {
    if (userId) {
      return [];
    }

    if (selectedUsers === 'all') {
      return users.map((user) => user._id);
    }

    return Array.from(selectedUsers) as Common.Id[];
  }, [selectedUsers, userId, users]);

  return (
    <>
      <div className="text-foreground-400 text-sm pl-4 mb-2">
        {selectedUsersCount} of {total} selected
      </div>
      <Table
        isHeaderSticky
        aria-label="Unverified users"
        selectionMode="multiple"
        selectedKeys={selectedUsers}
        onSelectionChange={handleSelectionChange}
        bottomContent={pagination}
      >
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>REGISTRATION DATE</TableColumn>
          <TableColumn>ROLE</TableColumn>
          <TableColumn>IS EMAIL VERIFIED</TableColumn>
          <TableColumn className="w-1">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="light"
                  size="sm"
                  isDisabled={selectedUsersCount === 0}
                  className="text-foreground-500"
                  isIconOnly
                >
                  <Icon icon="dots" className="rotate-90" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu variant="flat" disabledKeys={!shouldEnableBulkRejection ? new Set(['reject']) : undefined}>
                <DropdownItem
                  key="reject"
                  color="danger"
                  className="text-danger"
                  startContent={<Icon icon="cross" size={16} />}
                  onClick={() => setIsRejectModalOpen(true)}
                >
                  {selectedUsersCount > 1 ? `Reject selected users (${selectedUsersCount})` : 'Reject selected user'}
                </DropdownItem>
                <DropdownItem
                  key="remove"
                  color="danger"
                  className="text-danger"
                  startContent={<Icon icon="trash" size={16} />}
                  onClick={() => setIsRemoveModalOpen(true)}
                >
                  {selectedUsersCount > 1 ? `Delete selected users (${selectedUsersCount})` : 'Delete selected user'}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </TableColumn>
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
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Chip variant="flat" color={user.isEmailVerified ? 'success' : 'danger'}>
                  {user.isEmailVerified ? 'Yes' : 'No'}
                </Chip>
              </TableCell>
              <TableCell className="text-right">
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      variant="light"
                      className="text-foreground-500"
                      isDisabled={hasSelectedUsers}
                      size="sm"
                      isIconOnly
                    >
                      <Icon icon="dots" className="rotate-90" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu variant="flat" disabledKeys={getDisabledActionKeys(user)}>
                    <DropdownItem
                      key="accept"
                      color="success"
                      className="text-success"
                      startContent={<Icon icon="check" size={16} />}
                      onClick={handleAccept(user._id)}
                    >
                      Mark as verified
                    </DropdownItem>
                    <DropdownItem
                      key="reject"
                      color="danger"
                      className="text-danger"
                      startContent={<Icon icon="cross" size={16} />}
                      onClick={handleReject(user._id)}
                    >
                      Reject verification
                    </DropdownItem>
                    <DropdownItem
                      key="resend"
                      startContent={<Icon icon="update" size={16} />}
                      onClick={handleUpdate(user._id)}
                    >
                      Resend activation link
                    </DropdownItem>
                    <DropdownItem
                      key="remove"
                      color="danger"
                      className="text-danger"
                      startContent={<Icon icon="trash" size={16} />}
                      onClick={handleRemove(user._id)}
                    >
                      Delete user
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AcceptVerificationModal isOpen={isAcceptModalOpen} userId={userId} onClose={handleAcceptModalClose} />
      <RejectVerificationModal
        isOpen={isRejectModalOpen}
        userId={userId}
        userIds={selectedUsersArray}
        onClose={handleRejectModalClose}
        onSuccess={() => handleSelectionChange(new Set([]))}
      />
      <ResendVerificationModal isOpen={isUpdateModalOpen} userId={userId} onClose={handleUpdateModalClose} />
      <RemoveUserModal
        isOpen={isRemoveModalOpen}
        userId={userId}
        userIds={selectedUsersArray}
        userName={users.find((user) => user._id === userId)?.name}
        onClose={handleRemoveModalClose}
        onSuccess={() => handleSelectionChange(new Set([]))}
      />
    </>
  );
};
