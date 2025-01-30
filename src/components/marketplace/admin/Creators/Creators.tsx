import {
  Button,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  User,
} from '@nextui-org/react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React from 'react';

import { COUNTRY_LABELS } from '../../../../constants/countries';
import { getCreators } from '../../../../services/marketplace/admin';
import { Common } from '../../../../typings/common';
import { Icon } from '../../../various/Icon';
import { SendEmailModal } from './SendEmailModal';

const LIMIT = 10;

export const Creators = () => {
  const [page, setPage] = React.useState(1);
  const [userId, setUserId] = React.useState<Common.Nullable<Common.Id>>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  React.useEffect(() => {
    setPage(Number(searchParams.get('page')) || 1);
  }, [searchParams]);

  const { data, isLoading } = useQuery({
    placeholderData: keepPreviousData,
    queryKey: ['creators', page],
    queryFn: () => getCreators({ offset: (page - 1) * LIMIT, limit: LIMIT }),
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
      <div className="text-foreground-400 text-sm pl-4 mb-2">{total} creators</div>
      <Table isHeaderSticky bottomContent={pagination}>
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>REGISTRATION DATE</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody isLoading={isLoading} emptyContent="There are no creators">
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
              <TableCell>
                <Tooltip content="Send email">
                  <Button
                    size="sm"
                    variant="flat"
                    isIconOnly
                    aria-label="Send email"
                    onClick={() => setUserId(user._id)}
                  >
                    <Icon icon="mail" size={18} />
                  </Button>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <SendEmailModal userId={userId} isOpen={!!userId} onClose={() => setUserId(null)} />
    </>
  );
};
