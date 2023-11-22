import { Card, CardBody, Divider, Tooltip } from '@nextui-org/react';
import { Icon } from 'components/various/Icon';
import { DashboardContext } from 'contexts/Dashboard';
import { useTiersModal } from 'hooks/useTiersModal';
import React from 'react';

import { DashboardTier } from './DashboardTier';

export const DashboardTiers = React.forwardRef<HTMLDivElement>((_, ref) => {
  const { userTier } = React.useContext(DashboardContext);
  const { openModal } = useTiersModal();

  return (
    <Card ref={ref}>
      <CardBody className="p-5">
        <DashboardTier tier={userTier} label="Current tier" />
        {userTier < 5 && (
          <>
            <Divider className="bg-default-100 my-4" />
            <DashboardTier tier={userTier + 1} label="Next tier" />
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
