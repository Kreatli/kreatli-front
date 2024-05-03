import { sendGTMEvent } from '@next/third-parties/google';
import { Button, Input, Tooltip } from '@nextui-org/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import NextLink from 'next/link';
import React from 'react';

import { useBodyScroll } from '../../../hooks/useBodyScroll';
import { useBreakpointValue } from '../../../hooks/useBreakpointValue';
import { useDebounce } from '../../../hooks/useDebounce';
import { useSession } from '../../../hooks/useSession';
import { requestJobOffers } from '../../../services/job';
import { Api } from '../../../typings/api';
import { ProfileUnverifiedTooltip } from '../../profile/Profile/ProfileUnverifiedTooltip';
import { EmptyState } from '../../various/EmptyState';
import { Icon } from '../../various/Icon';
import { LazyList } from '../../various/LazyList';
import { JobCard } from '../JobCard';
import styles from './JobsListing.module.scss';
import { JobsListingFilters } from './JobsListingFilters';
import { JobsListingSkeleton } from './JobsListingSkeleton';

const LIMIT = 10;

export const JobsListing = () => {
  const [selectedFilters, setSelectedFilters] = React.useState<Api.GetParams['/job-offers']>({});
  const [search, setSearch] = React.useState('');
  const [isFiltersOpen, setIsFilersOpen] = React.useState(false);

  const searchDebounced = useDebounce(search);

  const requestJobOffersQuery = {
    ...selectedFilters,
    ...(searchDebounced && { search: searchDebounced }),
  };

  const { data, isFetching, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ['job-offers', requestJobOffersQuery],
    queryFn: ({ pageParam = 1 }) => requestJobOffers({ ...requestJobOffersQuery, offset: (pageParam - 1) * LIMIT }),
    getNextPageParam: (lastPage, allPages) =>
      (lastPage.jobOffersCount > allPages.length * LIMIT ? allPages.length + 1 : undefined), // prettier-ignore
  });

  const cards = React.useMemo(() => {
    return data?.pages.flatMap((page) => page.jobOffers) ?? [];
  }, [data?.pages]);

  const { setIsScrollDisabled } = useBodyScroll();
  const { currentUser, currentUserId } = useSession();
  const isCreator = currentUser?.role === 'creator';
  const isMobile = useBreakpointValue({ LG: false }, true);

  React.useEffect(
    () => () => {
      setIsScrollDisabled(false);
    },
    [setIsScrollDisabled],
  );

  const handleFiltersChange = (filters: Api.GetParams['/job-offers']) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedFilters(filters);
  };

  const handleOpenFilters = () => {
    setIsFilersOpen(true);
    setIsScrollDisabled(true);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSearch(event.target.value);
  };

  const handleSearchClear = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSearch('');
  };

  const handleCloseFilters = React.useCallback(() => {
    setIsFilersOpen(false);
    setIsScrollDisabled(false);
  }, [setIsScrollDisabled]);

  const onCreateJobPostingClicked = () => {
    sendGTMEvent({
      event: 'create-job-posting-clicked',
      userId: currentUserId,
    });
  };

  React.useEffect(() => {
    if (!isMobile) {
      handleCloseFilters();
    }
  }, [handleCloseFilters, isMobile]);

  const shouldShowEmptyState = !isFetching && !cards.length;

  const isExceededLimits = currentUser?.role === 'creator' && currentUser?.exceededLimits.jobOffers;

  return (
    <div className={styles.wrapper}>
      <JobsListingFilters
        isMobile={isMobile}
        isOpen={isFiltersOpen}
        filters={selectedFilters}
        onClose={handleCloseFilters}
        onChange={handleFiltersChange}
      />
      <div className={styles.cardsWrapper}>
        <div className="flex gap-4 mb-6">
          <Input
            value={search}
            startContent={<Icon icon="search" size={20} />}
            aria-label="Search"
            fullWidth
            isClearable
            placeholder="Type here to search..."
            labelPlacement="outside"
            onChange={handleSearchChange}
            onClear={handleSearchClear}
          />
          {isCreator && (
            <div className="flex-initial">
              <Tooltip
                isDisabled={!isExceededLimits}
                content="You've reached your job posting limit. Get to the next tier to increase the limit"
              >
                <div>
                  <ProfileUnverifiedTooltip>
                    <Button
                      as={NextLink}
                      isIconOnly={isMobile}
                      isDisabled={isExceededLimits || !currentUser?.isVerified}
                      href="/jobs/create"
                      color="secondary"
                      radius="full"
                      startContent={<Icon icon="plus" size={18} />}
                      aria-label="Create a job posting"
                      onClick={onCreateJobPostingClicked}
                    >
                      {!isMobile ? 'Create a job posting' : null}
                    </Button>
                  </ProfileUnverifiedTooltip>
                </div>
              </Tooltip>
            </div>
          )}
          {isMobile && (
            <div className="flex-initial">
              <Button
                isIconOnly
                radius="full"
                variant="flat"
                color="secondary"
                aria-label="Filters"
                onClick={handleOpenFilters}
              >
                <Icon icon="filter" />
              </Button>
            </div>
          )}
        </div>
        {shouldShowEmptyState ? (
          <EmptyState
            title="No results"
            text="Oops! No results found. Try different criteria or check back later, we're growing 🚀"
          />
        ) : (
          <LazyList isLoading={isFetchingNextPage} hasMore={hasNextPage} onLoadMore={fetchNextPage}>
            <div className={styles.cards}>
              {cards.map((card) => (
                <JobCard key={card._id} jobOffer={card} />
              ))}
              {(isLoading || isFetchingNextPage) && <JobsListingSkeleton />}
            </div>
          </LazyList>
        )}
      </div>
    </div>
  );
};
