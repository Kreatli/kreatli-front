import { Card, CardBody } from '@nextui-org/react';
import cx from 'classnames';
import React from 'react';

import { TIER_OPTIONS } from '../../../../constants/tier';
import { TierImage } from '../../../various/TierImage';

export const TierLegend = () => {
  return (
    <Card>
      <CardBody className="p-5 flex-row flex-wrap justify-around gap-5">
        {TIER_OPTIONS.map(({ value, label }) => {
          const valueAsNumber = parseInt(value, 10);
          const isSubscriptionOnly = valueAsNumber === 4 || valueAsNumber === 5;

          return (
            <div
              key={value}
              className={cx(
                'relative flex flex-col justify-center text-center px-4 py-2 rounded-large border-1 border-secondary overflow-hidden',
                {
                  'border-none': !isSubscriptionOnly,
                },
              )}
            >
              <TierImage tier={valueAsNumber} className="w-24 h-24" />
              <div className="text-xs font-semibold text-default-400">Tier {value}</div>
              <div className="text-md font-semibold">{label}</div>
              {isSubscriptionOnly && (
                <span className="text-[0.625rem] absolute top-0 left-0 px-2 py-0.5 bg-secondary rounded-br-large text-white">
                  Subscription only
                </span>
              )}
            </div>
          );
        })}
      </CardBody>
    </Card>
  );
};
