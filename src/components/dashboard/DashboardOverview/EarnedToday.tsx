import { Card, CardBody, CircularProgress, Tooltip } from '@nextui-org/react';
import { Icon } from 'components/various/Icon';
import { DashboardContext } from 'contexts/Dashboard';
import React from 'react';

export const EarnedToday = () => {
  const { earnedToday, earnedTomorrow, dailyLimit } = React.useContext(DashboardContext);

  const tooltipContent = React.useMemo(() => {
    if (earnedTomorrow > 0) {
      return 'You exceeded the daily limit, some of the points will be added to tomorrow\'s limit';
    }

    if (earnedToday === dailyLimit) {
      return 'You reached out the maximum, tasks are frozen until the end of the day';
    }

    return 'You can earn max 200 points in a day';
  }, [dailyLimit, earnedToday, earnedTomorrow]);

  return (
    <Card className="flex-1">
      <CardBody className="justify-center items-center">
        <CircularProgress
          size="lg"
          value={earnedToday}
          maxValue={dailyLimit}
          classNames={{
            track: 'stroke-[4px]',
            indicator: 'stroke-[4px]',
          }}
          color="success"
        />
        <div className="mt-3 inline-flex gap-2 whitespace-nowrap text-small text-default-400 font-semibold">
          Earned today:{' '}
          <Tooltip content={tooltipContent}>
            <button type="button" aria-label="Show earned today explanation">
              <Icon icon="helpCircle" size={16} />
            </button>
          </Tooltip>
        </div>
        <div className="font-semibold flex gap-1 items-center">
          <span>{earnedToday}/{dailyLimit}</span>
          {earnedTomorrow > 0 && <span className="text-small text-warning">(+{earnedTomorrow})</span>}
        </div>
      </CardBody>
    </Card>
  );
};
