import { Button, Input } from '@nextui-org/react';
import cx from 'classnames';
import React from 'react';
import { useInfiniteQuery } from 'react-query';

import { useBodyScroll } from '../../../hooks/useBodyScroll';
import { useBreakpointValue } from '../../../hooks/useBreakpointValue';
import { useDebounce } from '../../../hooks/useDebounce';
import { requestProfessionals } from '../../../services/users';
import { Api } from '../../../typings/api';
import { EmptyState } from '../../various/EmptyState';
import { Icon } from '../../various/Icon';
import { LazyList } from '../../various/LazyList';
import styles from './ProfessionalListing.module.scss';
import { ProfessionalListingCards } from './ProfessionalListingCards';
import { ProfessionalListingFilters } from './ProfessionalListingFilters';
import { ProfessionalListingSkeleton } from './ProfessionalListingSkeleton';

const MINUTE_IN_MILLISECONDS = 60 * 1000;
const LIMIT = 12;

export const ProfessionalListing = () => {
  const [selectedFilters, setSelectedFilters] = React.useState<Api.GetParams['/professionals']>({});
  const [search, setSearch] = React.useState('');
  const [isFiltersOpen, setIsFilersOpen] = React.useState(false);

  const searchDebounced = useDebounce(search);

  const requestProfessionalsQuery = {
    ...selectedFilters,
    ...(searchDebounced && { search: searchDebounced }),
  };

  const { data, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery({
    keepPreviousData: true,
    refetchOnMount: true,
    staleTime: 5 * MINUTE_IN_MILLISECONDS,
    queryKey: ['professionals', requestProfessionalsQuery],
    queryFn: ({ pageParam = 1 }) => (
      requestProfessionals({ ...requestProfessionalsQuery, offset: (pageParam - 1) * LIMIT })
    ),
    getNextPageParam: (lastPage, allPages) => (
      lastPage.professionalsCount > allPages.length * LIMIT
        ? allPages.length + 1
        : undefined
    ),
  });

  const cards = React.useMemo(() => {
    return data?.pages.flatMap((page) => page.professionals) ?? [];
  }, [data?.pages]);

  const { setIsScrollDisabled } = useBodyScroll();
  const isMobile = useBreakpointValue({ LG: false }, true);

  React.useEffect(() => () => {
    setIsScrollDisabled(false);
  }, [setIsScrollDisabled]);

  const handleFiltersChange = (filters: Api.GetParams['/professionals']) => {
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

  const handleClear = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSearch('');
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
      <ProfessionalListingFilters
        isMobile={isMobile}
        isOpen={isFiltersOpen}
        filters={selectedFilters}
        onClose={handleCloseFilters}
        onChange={handleFiltersChange}
      />
      <div className={styles.cardsWrapper}>
        <div className="flex gap-6 mb-6">
          <div className="flex-1">
            <Input
              value={search}
              startContent={<Icon icon="search" size={20} />}
              aria-label="Search"
              fullWidth
              isClearable
              placeholder="Type here to search..."
              onClear={handleClear}
              onChange={handleSearchChange}
            />
          </div>
          {isMobile && (
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
          )}
        </div>
        {shouldShowEmptyState
          ? <EmptyState title="No results" text="Oops! No results found. Try different criteria or check back later, we're growing 🚀" />
          : (
            <LazyList isLoading={isFetchingNextPage} hasMore={hasNextPage} onLoadMore={fetchNextPage}>
              <div className={cx(styles.cards, { [styles.loading]: shouldShowLoader })}>
                <ProfessionalListingCards cards={cards} />
                {shouldShowSkeleton && <ProfessionalListingSkeleton />}
              </div>
            </LazyList>
          )}
      </div>
    </div>
  );
};
