import { Button, Grid, Input, Spacer } from '@nextui-org/react';
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
    limit: LIMIT,
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
  const isMobile = useBreakpointValue({ SM: false }, true);

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
        <Grid.Container css={{ gap: '$8' }}>
          <Grid xs>
            <Input
              value={search}
              labelLeft={<Icon icon="search" />}
              aria-label="Search"
              fullWidth
              clearable
              placeholder="Type here to search..."
              onChange={handleSearchChange}
            />
          </Grid>
          {isMobile && (
            <Grid>
              <Button
                icon={<Icon icon="filter" />}
                rounded
                auto
                color="primary"
                aria-label="Filters"
                onClick={handleOpenFilters}
              />
            </Grid>
          )}
        </Grid.Container>
        <Spacer y={1} />
        {shouldShowEmptyState
          ? <EmptyState />
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
