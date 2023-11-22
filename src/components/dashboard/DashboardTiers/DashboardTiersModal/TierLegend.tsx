import { Card, CardBody } from '@nextui-org/react';
import cx from 'classnames';
import { TierImage } from 'components/various/TierImage';
import { TIER_OPTIONS } from 'constants/tier';
import React from 'react';

export const TierLegend = () => {
  return (
    <Card>
      <CardBody className="p-5 flex-row flex-wrap justify-around gap-5">
        {TIER_OPTIONS.map(({ value, label }) => {
          const isSubscriptionOnly = value === 4 || value === 5;

          return (
            <div
              className={cx('relative flex flex-col justify-center text-center px-4 py-2 rounded-large border-1 border-secondary overflow-hidden', {
                'border-none': !isSubscriptionOnly,
              })}
            >
              <TierImage tier={value} className="w-24 h-24" />
              <div className="text-xs font-semibold text-default-400">Tier {value}</div>
              <div className="text-md font-semibold">{label}</div>
              {isSubscriptionOnly && <span className="text-[0.625rem] absolute top-0 left-0 px-2 py-0.5 bg-secondary rounded-br-large text-white">Subscription only</span>}
            </div>
          );
        })}
      </CardBody>
    </Card>
  );
};
