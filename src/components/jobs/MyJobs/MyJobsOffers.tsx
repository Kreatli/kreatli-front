import { Button, Pagination, Tab, Tabs } from '@nextui-org/react';
import React from 'react';
import NextLink from 'next/link';
import cx from 'classnames';
import { useQuery } from 'react-query';

import { requestCurrentCreatorJobs } from '../../../services/creator';
import styles from './MyJobs.module.scss';
import { MyJobsSkeleton } from './MyJobsSkeleton';
import { EmptyState } from '../../various/EmptyState';
import { MyJobsOffer } from './MyJobsOffer';
import { Job } from '../../../typings/job';
import { useBreakpointValue } from '../../../hooks/useBreakpointValue';
import { Icon } from 'components/various/Icon';

const PAGE_LIMIT = 5;

export const MyJobsOffers = () => {
  const [page, setPage] = React.useState(1);
  const [selectedTab, setSelectedTab] = React.useState<Job.Offer['status']>('posted');

  const isMobile = useBreakpointValue({ SM: false }, true);

  const getCurrentCreatorJobs = () => {
    return requestCurrentCreatorJobs({ status: selectedTab, offset: (page - 1) * PAGE_LIMIT });
  };

  const query = { selectedTab, page };

  const { data, isFetching, refetch } = useQuery(['creator', 'job-offers', query], getCurrentCreatorJobs, {
    keepPreviousData: true,
    onError: () => {
      // TODO: handle error
    },
  });

  const handleSelectionChange = (key: React.Key) => {
    setPage(1);
    setSelectedTab(key as Job.Offer['status']);
  };

  const handlePagination = (index: number) => {
    setPage(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleJobOfferComplete = () => {
    setPage(1);
    setSelectedTab('completed');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleJobOfferHire = () => {
    setPage(1);
    setSelectedTab('ongoing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const emptyStateProps = React.useMemo(() => {
    if (selectedTab === 'ongoing') {
      return {
        title: 'No ongoing job postings',
        text: 'You don\'t have any ongoing job postings yet. Let\'s fix this!',
        link: { href: '/jobs/create', label: 'Create a job posting' },
      };
    }

    if (selectedTab === 'completed') {
      return {
        title: 'No completed collaborations yet',
      };
    }

    if (selectedTab === 'canceled') {
      return {
        icon: 'emojiHappy' as const,
        title: 'No cancelled collaborations',
      };
    }

    return {
      title: 'No job posting',
      text: 'You don\'t have any job postings yet. Let\'s fix this!',
      link: { href: '/jobs/create', label: 'Create a job posting' },
    };
  }, [selectedTab]);

  const totalPages = Math.ceil((data?.jobOffersCount ?? 0) / PAGE_LIMIT);
  const shouldShowSkeleton = (!data || data.jobOffers.length === 0) && isFetching;
  const shouldShowLoader = data && data.jobOffers.length > 0 && isFetching;
  const shouldShowEmptyState = data && data.jobOffers.length === 0 && !isFetching;

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-semibold">My job postings</h3>
        <Button as={NextLink} isIconOnly={isMobile} startContent={<Icon icon="plus" size={18} />} radius="full" color="secondary" href="/jobs/create">
          {!isMobile && 'Create job posting'}
        </Button>
      </div>
      <Tabs aria-label="My job postings" selectedKey={selectedTab} className="mb-4" onSelectionChange={handleSelectionChange}>
        <Tab key="posted" title="Posted" />
        <Tab key="ongoing" title="Ongoing" />
        <Tab key="completed" title="Completed" />
        <Tab key="canceled" title="Cancelled" />
      </Tabs>
      {shouldShowEmptyState && (
        <EmptyState {...emptyStateProps} />
      )}
      <div className={cx(styles.cards, { [styles.loading]: shouldShowLoader })}>
        {shouldShowSkeleton && <MyJobsSkeleton />}
        {data?.jobOffers.map((jobOffer) => (
          <MyJobsOffer
            key={jobOffer._id}
            jobOffer={jobOffer}
            onCancel={refetch}
            onComplete={handleJobOfferComplete}
            onHire={handleJobOfferHire}
            onReject={refetch}
          />
        ))}
      </div>
      {totalPages > 1 && <Pagination className="mt-4" page={page} total={totalPages} color="secondary" onChange={handlePagination} />}
    </>
  );
};
