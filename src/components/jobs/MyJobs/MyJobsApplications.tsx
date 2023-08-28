import { Pagination, Tab, Tabs } from '@nextui-org/react';
import React from 'react';
import cx from 'classnames';
import { useQuery } from 'react-query';

import { requestCurrentProfessionalJobs } from '../../../services/professional';
import styles from './MyJobs.module.scss';
import { MyJobsSkeleton } from './MyJobsSkeleton';
import { EmptyState } from '../../various/EmptyState';
import { MyJobsApplication } from './MyJobsApplication';
import { Job } from '../../../typings/job';

const PAGE_LIMIT = 5;

export const MyJobsApplications = () => {
  const [page, setPage] = React.useState(1);
  const [selectedTab, setSelectedTab] = React.useState<Job.Application['status']>('pending');

  const getCurrentProfessionalJobs = () => {
    return requestCurrentProfessionalJobs({ status: selectedTab, offset: (page - 1) * PAGE_LIMIT });
  };

  const query = { selectedTab, page };

  const { data, isFetching, refetch } = useQuery(['professional', 'job-applications', query], () => getCurrentProfessionalJobs(), {
    keepPreviousData: true,
    onError: () => {
      // TODO: handle error
    },
  });

  const handleSelectionChange = (key: React.Key) => {
    setPage(1);
    setSelectedTab(key as Job.Application['status']);
  };

  const handlePagination = (index: number) => {
    setPage(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const emptyStateProps = React.useMemo(() => {
    if (selectedTab === 'canceled') {
      return {
        icon: 'emojiHappy' as const,
        title: 'No cancelled applications',
      };
    }

    if (selectedTab === 'hired') {
      return {
        title: 'No applications',
        text: 'You weren\'t hired for any job yet. Let\'s fix this',
        link: { href: '/jobs', label: 'Browse jobs' },
      };
    }

    if (selectedTab === 'rejected') {
      return {
        icon: 'emojiHappy' as const,
        title: 'No rejected applications',
      };
    }

    return {
      title: 'No pending applications',
      text: 'You haven\'t applied for any job yet. Let\'s fix this',
      link: { href: '/jobs', label: 'Browse jobs' },
    };
  }, [selectedTab]);

  const totalPages = Math.ceil((data?.jobApplicationsCount ?? 0) / PAGE_LIMIT);
  const shouldShowSkeleton = (!data || data.jobApplications.length === 0) && isFetching;
  const shouldShowLoader = data && data.jobApplications.length > 0 && isFetching;
  const shouldShowEmptyState = data && data.jobApplications.length === 0 && !isFetching;

  return (
    <>
      <h3 className="text-2xl font-semibold mb-4">My job applications</h3>
      <Tabs selectedKey={selectedTab} aria-label="My job applications" className="mb-4" onSelectionChange={handleSelectionChange}>
        <Tab key="pending" title="Pending" />
        <Tab key="hired" title="Hired" />
        <Tab key="rejected" title="Rejected" />
        <Tab key="canceled" title="Cancelled" />
      </Tabs>
      {shouldShowEmptyState && (
        <EmptyState {...emptyStateProps} />
      )}
      <div className={cx(styles.cards, { [styles.loading]: shouldShowLoader })}>
        {shouldShowSkeleton && <MyJobsSkeleton />}
        {data?.jobApplications.map((jobOffer) => (
          <MyJobsApplication key={jobOffer._id} jobOffer={jobOffer} onCancel={refetch} onComplete={refetch} />
        ))}
      </div>
      {totalPages > 1 && <Pagination className="mt-4" page={page} total={totalPages} color="secondary" onChange={handlePagination} />}
    </>
  );
};
