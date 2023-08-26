import { Pagination, Tab, Tabs } from '@nextui-org/react';
import React from 'react';
import cx from 'classnames';
import { useQuery } from 'react-query';

import { requestCurrentCreatorJobs } from '../../../services/creator';
import styles from './MyJobs.module.scss';
import { MyJobsSkeleton } from './MyJobsSkeleton';
import { EmptyState } from '../../various/EmptyState';
import { MyJobsOffer } from './MyJobsOffer';
import { Job } from '../../../typings/job';

const PAGE_LIMIT = 5;

export const MyJobsOffers = () => {
  const [page, setPage] = React.useState(1);
  const [selectedTab, setSelectedTab] = React.useState<Job.Offer['status']>('posted');

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
        title: 'No ongoing jobs yet',
        text: 'You don\'t have any ongoing jobs. Let\'s fix that!',
        link: { href: '/jobs/create', label: 'Create job offer' },
      };
    }

    if (selectedTab === 'completed') {
      return {
        title: 'No completed jobs yet',
      };
    }

    if (selectedTab === 'canceled') {
      return {
        icon: 'emojiHappy' as const,
        title: 'No cancelled jobs yet',
      };
    }

    return {
      title: 'No jobs yet',
      text: 'You don\'t have any posted jobs. Let\'s fix that!',
      link: { href: '/jobs/create', label: 'Create job offer' },
    };
  }, [selectedTab]);

  const totalPages = Math.ceil((data?.jobOffersCount ?? 0) / PAGE_LIMIT);
  const shouldShowSkeleton = (!data || data.jobOffers.length === 0) && isFetching;
  const shouldShowLoader = data && data.jobOffers.length > 0 && isFetching;
  const shouldShowEmptyState = data && data.jobOffers.length === 0 && !isFetching;

  return (
    <>
      <h3 className="text-2xl font-semibold mb-4">My job offers</h3>
      <Tabs aria-label="My job offers" selectedKey={selectedTab} className="mb-4" onSelectionChange={handleSelectionChange}>
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
