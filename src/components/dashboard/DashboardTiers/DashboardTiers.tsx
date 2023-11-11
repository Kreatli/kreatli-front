import { Card, CardBody, Divider, Tooltip } from '@nextui-org/react';
import { Icon } from 'components/various/Icon';
import { useTiersModal } from 'hooks/useTiersModal';
import React from 'react';

import { DashboardTier } from './DashboardTier';

const CURRENT_USER_CURRENT_TIER = 5;

export const DashboardTiers = React.forwardRef<HTMLDivElement>((_, ref) => {
  const { openModal } = useTiersModal();

  return (
    <Card ref={ref}>
      <CardBody>
        <DashboardTier tier={CURRENT_USER_CURRENT_TIER} label="Current tier" />
        {CURRENT_USER_CURRENT_TIER < 5 && (
          <>
            <Divider className="bg-default-100 my-4" />
            <DashboardTier tier={CURRENT_USER_CURRENT_TIER + 1} label="Next tier" />
          </>
        )}
      </CardBody>
      <Tooltip content="More information">
        <button type="button" aria-label="Open tiers modal" className="absolute top-4 right-4 text-default-400" onClick={openModal}>
          <Icon icon="helpCircle" size={20} />
        </button>
      </Tooltip>
    </Card>
  );
});
