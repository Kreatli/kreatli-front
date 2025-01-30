/* eslint-disable @typescript-eslint/indent */
import { sendGTMEvent } from '@next/third-parties/google';
import { Button, Pagination, Tab, Tabs, Tooltip } from '@nextui-org/react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import cx from 'classnames';
import NextLink from 'next/link';
import React from 'react';

import { useBreakpointValue } from '../../../../hooks/useBreakpointValue';
import { useSession } from '../../../../hooks/marketplace/useSession';
import { requestCurrentCreatorJobs } from '../../../../services/marketplace/creator';
import { Job } from '../../../../typings/marketplace/job';
import { ProfileUnverifiedTooltip } from '../../profile/Profile/ProfileUnverifiedTooltip';
import { EmptyState } from '../../../various/EmptyState';
import { Icon } from '../../../various/Icon';
import styles from './MyJobs.module.scss';
import { MyJobsOffer } from './MyJobsOffer';
import { MyJobsSkeleton } from './MyJobsSkeleton';

const PAGE_LIMIT = 5;

export const MyJobsOffers = () => {
  const [page, setPage] = React.useState(1);
  const [selectedTab, setSelectedTab] = React.useState<Job.Offer['status']>('posted');

  const { currentUser, currentUserId } = useSession();
  const isMobile = useBreakpointValue({ SM: false }, true);
  const isExceededLimits = currentUser?.role === 'creator' && currentUser?.exceededLimits.jobOffers;

  const getCurrentCreatorJobs = () => {
    return requestCurrentCreatorJobs({ status: selectedTab, offset: (page - 1) * PAGE_LIMIT });
  };

  const query = { selectedTab, page };

  const { data, isFetching, refetch } = useQuery({
    queryKey: ['creator', 'job-offers', query],
    queryFn: getCurrentCreatorJobs,
    meta: {
      showErrorNotification: true,
    },
    placeholderData: keepPreviousData,
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

  const onCreateJobPostingClicked = React.useCallback(() => {
    sendGTMEvent({
      event: 'create-job-posting-clicked',
      userId: currentUserId,
    });
  }, [currentUserId]);

  const emptyStateProps = React.useMemo(() => {
    if (selectedTab === 'ongoing') {
      return {
        title: 'No ongoing job postings',
        text: "You don't have any ongoing job postings yet. Let's fix this!",
        ...(!isExceededLimits &&
          currentUser?.isVerified && {
            link: {
              href: '/marketplace/jobs/create',
              label: 'Create a job posting',
            },
          }),
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
      text: "You don't have any job postings yet. Let's fix this!",
      ...(!isExceededLimits &&
        currentUser?.isVerified && {
          link: {
            href: '/marketplace/jobs/create',
            label: 'Create a job posting',
            onClick: onCreateJobPostingClicked,
          },
        }),
    };
  }, [currentUser?.isVerified, isExceededLimits, onCreateJobPostingClicked, selectedTab]);

  const totalPages = Math.ceil((data?.jobOffersCount ?? 0) / PAGE_LIMIT);
  const shouldShowSkeleton = (!data || data.jobOffers.length === 0) && isFetching;
  const shouldShowLoader = data && data.jobOffers.length > 0 && isFetching;
  const shouldShowEmptyState = data && data.jobOffers.length === 0 && !isFetching;

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-semibold">My job postings</h3>
        <Tooltip
          isDisabled={!isExceededLimits}
          content="You've reached your job posting limit. Get to the next tier to increase the limit"
        >
          <div>
            <ProfileUnverifiedTooltip>
              <Button
                as={NextLink}
                isDisabled={isExceededLimits || !currentUser?.isVerified}
                isIconOnly={isMobile}
                startContent={<Icon icon="plus" size={18} />}
                radius="full"
                color="secondary"
                href="/marketplace/jobs/create"
                onClick={onCreateJobPostingClicked}
              >
                {!isMobile && 'Create a job posting'}
              </Button>
            </ProfileUnverifiedTooltip>
          </div>
        </Tooltip>
      </div>
      <Tabs
        aria-label="My job postings"
        selectedKey={selectedTab}
        className="mb-4"
        onSelectionChange={handleSelectionChange}
      >
        <Tab key="posted" title="Posted" />
        <Tab key="ongoing" title="Ongoing" />
        <Tab key="completed" title="Completed" />
        <Tab key="canceled" title="Cancelled" />
      </Tabs>
      {shouldShowEmptyState && <EmptyState {...emptyStateProps} />}
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
      {totalPages > 1 && (
        <Pagination className="mt-4" page={page} total={totalPages} color="secondary" onChange={handlePagination} />
      )}
    </>
  );
};
