import { Button, Grid, Input, Spacer } from '@nextui-org/react';
import cx from 'classnames';
import React from 'react';
import { useQuery } from 'react-query';

import { useBodyScroll } from '../../../hooks/useBodyScroll';
import { useBreakpointValue } from '../../../hooks/useBreakpointValue';
import { useDebounce } from '../../../hooks/useDebounce';
import { requestProfessionals } from '../../../services/users';
import { Api } from '../../../typings/api';
import { User } from '../../../typings/user';
import { EmptyState } from '../../various/EmptyState';
import { Icon } from '../../various/Icon';
import styles from './ProfessionalListing.module.scss';
import { ProfessionalListingCards } from './ProfessionalListingCards';
import { ProfessionalListingFilters } from './ProfessionalListingFilters';
import { ProfessionalListingSkeleton } from './ProfessionalListingSkeleton';

export const ProfessionalListing = () => {
  const [cards, setCards] = React.useState<User.Professional[]>([]);
  const [selectedFilters, setSelectedFilters] = React.useState<Api.GetParams['/professionals']>({});
  const [search, setSearch] = React.useState('');
  const [isFiltersOpen, setIsFilersOpen] = React.useState(false);

  const searchDebounced = useDebounce(search);

  const requestProfessionalsQuery = React.useMemo(() => ({
    ...selectedFilters,
    ...(searchDebounced && { search: searchDebounced }),
  }), [searchDebounced, selectedFilters]);

  const { data, isFetched, isFetching } = useQuery(['professionals', requestProfessionalsQuery], () => requestProfessionals(requestProfessionalsQuery));
  const { setIsScrollDisabled } = useBodyScroll();
  const isMobile = useBreakpointValue({ SM: false }, true);

  React.useEffect(() => {
    if (isFetched) {
      setCards(data ?? []);
    }
  }, [data, isFetched]);

  const handleOpenFilters = () => {
    setIsFilersOpen(true);
    setIsScrollDisabled(true);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const shouldShowSkeleton = isFetching && cards.length === 0;
  const shouldShowEmptyState = !isFetching && cards.length === 0;

  return (
    <div className={styles.wrapper}>
      <ProfessionalListingFilters
        isMobile={isMobile}
        isOpen={isFiltersOpen}
        filters={selectedFilters}
        onClose={handleCloseFilters}
        onChange={setSelectedFilters}
      />
      <div className={styles.cardsWrapper}>
        <Grid.Container css={{ gap: '$8' }}>
          <Grid xs>
            <Input
              value={search}
              labelLeft={<Icon icon="search" />}
              fullWidth
              clearable
              placeholder="Type here to search..."
              onChange={handleSearchChange}
            />
          </Grid>
          {isMobile && (
            <Grid>
              <Button icon={<Icon icon="filter" />} rounded auto color="primary" onClick={handleOpenFilters} />
            </Grid>
          )}
        </Grid.Container>
        <Spacer y={1} />
        {shouldShowEmptyState
          ? <EmptyState />
          : (
            <div className={cx(styles.cards, { [styles.loading]: isFetching && !shouldShowSkeleton })}>
              <ProfessionalListingCards cards={cards} />
              {shouldShowSkeleton && <ProfessionalListingSkeleton />}
            </div>
          )}
      </div>
    </div>
  );
};
