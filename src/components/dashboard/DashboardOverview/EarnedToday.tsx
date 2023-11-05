import { Card, CardBody, CircularProgress, Tooltip } from '@nextui-org/react';
import { Icon } from 'components/various/Icon';
import React from 'react';

const DAY_LIMIT = 200;
const EARNED_TODAY = 120;

export const EarnedToday = () => {
  return (
    <Card className="flex-1">
      <CardBody className="justify-center items-center">
        <CircularProgress
          size="lg"
          value={EARNED_TODAY}
          maxValue={DAY_LIMIT}
          classNames={{
            track: 'stroke-[4px]',
            indicator: 'stroke-[4px]',
          }}
          color="success"
        />
        <div className="mt-3 inline-flex gap-2 whitespace-nowrap text-small text-default-400 font-semibold">
          Earned today:{' '}
          <Tooltip content="Gosha I need copy here">
            <button type="button" aria-label="Show earned today explanation">
              <Icon icon="helpCircle" size={16} />
            </button>
          </Tooltip>
        </div>
        <div className="font-semibold">
          {EARNED_TODAY}/{DAY_LIMIT}
        </div>
      </CardBody>
    </Card>
  );
};
