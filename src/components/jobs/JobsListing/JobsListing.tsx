import { Button, Input } from '@nextui-org/react';
import cx from 'classnames';
import NextLink from 'next/link';
import React from 'react';
import { useInfiniteQuery } from 'react-query';

import { useBodyScroll } from '../../../hooks/useBodyScroll';
import { useBreakpointValue } from '../../../hooks/useBreakpointValue';
import { useDebounce } from '../../../hooks/useDebounce';
import { useSession } from '../../../hooks/useSession';
import { requestJobOffers } from '../../../services/job';
import { Api } from '../../../typings/api';
import { EmptyState } from '../../various/EmptyState';
import { Icon } from '../../various/Icon';
import { LazyList } from '../../various/LazyList';
import { JobCard } from '../JobCard';
import styles from './JobsListing.module.scss';
import { JobsListingFilters } from './JobsListingFilters';
import { JobsListingSkeleton } from './JobsListingSkeleton';

const MINUTE_IN_MILLISECONDS = 60 * 1000;
const LIMIT = 10;

export const JobsListing = () => {
  const [selectedFilters, setSelectedFilters] = React.useState<Api.GetParams['/job-offers']>({});
  const [search, setSearch] = React.useState('');
  const [isFiltersOpen, setIsFilersOpen] = React.useState(false);

  const searchDebounced = useDebounce(search);

  const requestJobOffersQuery = {
    limit: LIMIT,
    ...selectedFilters,
    ...(searchDebounced && { search: searchDebounced }),
  };

  const { data, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery({
    keepPreviousData: true,
    refetchOnMount: true,
    staleTime: 5 * MINUTE_IN_MILLISECONDS,
    queryKey: ['job-offers', requestJobOffersQuery],
    queryFn: ({ pageParam = 1 }) => requestJobOffers({ ...requestJobOffersQuery, offset: (pageParam - 1) * LIMIT }),
    getNextPageParam: (lastPage, allPages) => (
      lastPage.jobOffersCount > allPages.length * LIMIT
        ? allPages.length + 1
        : undefined
    ),
  });

  const cards = React.useMemo(() => {
    return data?.pages.flatMap((page) => page.jobOffers) ?? [];
  }, [data?.pages]);

  const { setIsScrollDisabled } = useBodyScroll();
  const { currentUser } = useSession();
  const isCreator = currentUser?.role === 'creator';
  const isMobile = useBreakpointValue({ LG: false }, true);

  React.useEffect(() => () => {
    setIsScrollDisabled(false);
  }, [setIsScrollDisabled]);

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

  const handleCloseFilters = React.useCallback(() => {
    setIsFilersOpen(false);
    setIsScrollDisabled(false);
  }, [setIsScrollDisabled]);

  React.useEffect(() => {
    if (!isMobile) {
      handleCloseFilters();
    }
  }, [handleCloseFilters, isMobile]);

  const shouldShowSkeleton = isFetching && !cards.length;
  const shouldShowLoader = isFetching && !isFetchingNextPage && cards.length;
  const shouldShowEmptyState = !isFetching && !cards.length;

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
            onChange={handleSearchChange}
          />
          {isCreator && (
            <div className="flex-initial">
              <Button
                as={NextLink}
                isIconOnly={isMobile}
                href="/jobs/create"
                color="secondary"
                radius="full"
                startContent={<Icon icon="plus" size={18} />}
                aria-label="Create job offer"
              >
                {!isMobile ? 'Create job offer' : null}
              </Button>
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
        {shouldShowEmptyState
          ? <EmptyState title="No results" text="Oops! No results found. Try different criteria or check back later, we\'re growing 🚀" />
          : (
            <LazyList isLoading={isFetchingNextPage} hasMore={hasNextPage} onLoadMore={fetchNextPage}>
              <div className={cx(styles.cards, { [styles.loading]: shouldShowLoader })}>
                {cards.map((card) => (
                  <JobCard key={card._id} jobOffer={card} />
                ))}
                {shouldShowSkeleton && <JobsListingSkeleton />}
              </div>
            </LazyList>
          )}
      </div>
    </div>
  );
};
