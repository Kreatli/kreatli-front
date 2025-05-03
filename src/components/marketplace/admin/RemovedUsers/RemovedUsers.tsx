import { Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, User } from '@heroui/react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React from 'react';

import { COUNTRY_LABELS } from '../../../../constants/countries';
import { getRemovedUsers } from '../../../../services/marketplace/admin';

const LIMIT = 10;

export const RemovedUsers = () => {
  const [page, setPage] = React.useState(1);

  const searchParams = useSearchParams();
  const router = useRouter();

  React.useEffect(() => {
    setPage(Number(searchParams.get('page')) || 1);
  }, [searchParams]);

  const { data, isLoading } = useQuery({
    placeholderData: keepPreviousData,
    queryKey: ['removedUsers', page],
    queryFn: () => getRemovedUsers({ offset: (page - 1) * LIMIT, limit: LIMIT }),
  });

  const users = data?.users ?? [];
  const total = data?.total ?? 0;
  const pages = Math.ceil(total / LIMIT);

  const handlePageChange = (newPage: number) => {
    const currentSearchParams = new URLSearchParams(Array.from(searchParams.entries()));
    currentSearchParams.set('page', newPage.toString());

    const search = currentSearchParams.toString();
    router.replace({ search: `?${search}` });
  };

  const dateFormatter = new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'medium',
  }).format;

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

  return (
    <>
      <div className="text-foreground-400 text-sm pl-4 mb-2">{total} deleted users</div>
      <Table isHeaderSticky bottomContent={pagination}>
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>REGISTRATION DATE</TableColumn>
        </TableHeader>
        <TableBody isLoading={isLoading} emptyContent="There are no deleted users">
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>
                <Link href={`/marketplace/profile/${user._id}`}>
                  <User
                    name={user.name}
                    description={COUNTRY_LABELS[user.country]}
                    avatarProps={{ src: user.avatarUrl, radius: 'sm' }}
                  />
                </Link>
              </TableCell>
              <TableCell>{dateFormatter(new Date(user.registrationDate))}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
