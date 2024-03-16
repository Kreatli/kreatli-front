import { Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, User } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';
import { useQuery } from 'react-query';

import { COUNTRY_LABELS } from '../../../constants/countries';
import { getCreators } from '../../../services/admin';

const LIMIT = 10;

export const Creators = () => {
  const [page, setPage] = React.useState(1);

  const { data, isLoading } = useQuery({
    keepPreviousData: true,
    queryKey: ['creators', page],
    queryFn: () => getCreators({ offset: (page - 1) * LIMIT, limit: LIMIT }),
  });

  const users = data?.users ?? [];
  const pages = Math.ceil((data?.total ?? 0) / LIMIT);

  const dateFormatter = new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'medium' }).format;

  const pagination = pages > 1 && (
    <Pagination
      isCompact
      showControls
      variant="flat"
      color="secondary"
      page={page}
      total={pages}
      onChange={setPage}
    />
  );

  return (
    <Table isHeaderSticky bottomContent={pagination}>
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>REGISTRATION DATE</TableColumn>
      </TableHeader>
      <TableBody isLoading={isLoading} emptyContent="There are creators">
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
